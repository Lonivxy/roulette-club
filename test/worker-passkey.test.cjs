const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {DatabaseSync}=require('node:sqlite');
const {generateKeyPairSync,createHash,randomBytes,sign}=require('node:crypto');
const b64=value=>Buffer.from(value).toString('base64url');
function database() {
    const sql=new DatabaseSync(':memory:');sql.exec(fs.readFileSync(path.join(__dirname,'../drizzle/0000_sloppy_sasquatch.sql'),'utf8'));
    const DB={prepare(query){
        let args=[];const result={bind(...values){args=values;return result;},execute(){const value=sql.prepare(query).run(...args);return {meta:{changes:Number(value.changes)}};},async run(){return result.execute();},async first(){return sql.prepare(query).get(...args)||null;},async all(){return {results:sql.prepare(query).all(...args)};}};return result;
    },async batch(statements){sql.exec('BEGIN IMMEDIATE');try{const results=statements.map(statement=>statement.execute());sql.exec('COMMIT');return results;}catch(error){sql.exec('ROLLBACK');throw error;}}};return {DB,sql};
}
async function fixture() {
    const {createService,ORIGIN}=await import('../worker/service.mjs'),{DB,sql}=database(),service=createService({page:'<script>/* SERVER_BOOTSTRAP */</script>'});
    const jar=new Map();
    async function request(route,{body,actor='owner-site-user',origin=ORIGIN,cookies=true}={}) {
        const headers={};if(actor)headers['oai-authenticated-user-id']=actor;
        if(body!==undefined){headers['Content-Type']='application/json';headers.Origin=origin;}
        if(cookies)headers.Cookie=[...jar].map(([key,value])=>key+'='+value).join('; ');
        const response=await service.fetch(new Request(ORIGIN+route,{method:body===undefined?'GET':'POST',headers,body:body===undefined?undefined:JSON.stringify(body)}),{DB});
        const set=response.headers.get('Set-Cookie');if(set&&cookies){const pair=set.split(';')[0],index=pair.indexOf('=');jar.set(pair.slice(0,index),pair.slice(index+1));}
        return response;
    }
    async function cmd(command,args=[],extra={}) {return request('/api/command',{body:{id:crypto.randomUUID(),command,args,playerId:'alex',...extra}});}
    const keys=generateKeyPairSync('ec',{namedCurve:'prime256v1'}),jwk=keys.publicKey.export({format:'jwk'}),credentialId=randomBytes(16);
    async function registration(options,{origin=ORIGIN,uv=true}={}) {
        const {encodeCBOR}=await import('@levischuck/tiny-cbor');
        const cose=encodeCBOR(new Map([[1,2],[3,-7],[-1,1],[-2,Buffer.from(jwk.x,'base64url')],[-3,Buffer.from(jwk.y,'base64url')]]));
        const authData=Buffer.concat([createHash('sha256').update(new URL(ORIGIN).hostname).digest(),Buffer.from([uv?0x45:0x41]),Buffer.alloc(4),Buffer.alloc(16),Buffer.from([0,credentialId.length]),credentialId,cose]);
        const clientData=Buffer.from(JSON.stringify({type:'webauthn.create',challenge:options.challenge,origin,crossOrigin:false}));
        return {id:b64(credentialId),rawId:b64(credentialId),type:'public-key',authenticatorAttachment:'platform',clientExtensionResults:{},response:{clientDataJSON:b64(clientData),attestationObject:b64(encodeCBOR(new Map([['fmt','none'],['attStmt',new Map()],['authData',authData]]))),transports:['internal']}};
    }
    async function assertion(options,{origin=ORIGIN,uv=true,counter=1,badSignature=false}={}) {
        const clientData=Buffer.from(JSON.stringify({type:'webauthn.get',challenge:options.challenge,origin,crossOrigin:false})),count=Buffer.alloc(4);count.writeUInt32BE(counter);
        const authData=Buffer.concat([createHash('sha256').update(new URL(ORIGIN).hostname).digest(),Buffer.from([uv?5:1]),count]);
        const signature=sign('sha256',Buffer.concat([authData,createHash('sha256').update(clientData).digest()]),keys.privateKey);if(badSignature)signature[signature.length-1]^=1;
        return {id:b64(credentialId),rawId:b64(credentialId),type:'public-key',authenticatorAttachment:'platform',clientExtensionResults:{},response:{clientDataJSON:b64(clientData),authenticatorData:b64(authData),signature:b64(signature),userHandle:b64('club-owner')}};
    }
    async function enroll(){const options=await (await request('/api/admin/register/options',{body:{}})).json();const response=await request('/api/admin/register/verify',{body:await registration(options)});assert.equal(response.status,200,JSON.stringify(await response.clone().json()));return response;}
    return {request,cmd,enroll,registration,assertion,sql,jar,DB,ORIGIN};
}
test('server rejects anonymous identity, foreign origins and all unverified management commands',async()=>{
    const t=await fixture();assert.equal((await t.request('/api/state',{actor:''})).status,401);
    assert.equal((await t.request('/api/admin/register/options',{body:{},origin:'https://evil.example'})).status,403);
    for(const [command,args] of [['addUser',['Intruder']],['deletePlayer',['alex']],['adminAdjust',['alex','add',1000]],['import',[{}]]])assert.equal((await t.cmd(command,args)).status,403);
    const state=await (await t.request('/api/state')).json();assert.equal(state.data.users.length,3);assert.equal(state.data.users[0].balance,1000);
    assert.equal((await t.cmd('save',[{balance:999999999}])).status,404);
});
test('genuine ES256 WebAuthn enrollment unlocks HttpOnly admin session; logout relocks management',async()=>{
    const t=await fixture(),response=await t.enroll();assert.match(response.headers.get('set-cookie'),/HttpOnly/);assert.match(response.headers.get('set-cookie'),/Secure/);assert.match(response.headers.get('set-cookie'),/SameSite=Strict/);
    assert.equal((await (await t.request('/api/admin/status')).json()).admin,true);
    let result=await t.cmd('adminAdjust',['jamie','add',500,'reward']);assert.equal(result.status,200);assert.equal((await result.json()).data.users[1].balance,1500);
    result=await t.cmd('adminAdjust',['jamie','remove',200]);assert.equal(result.status,200);assert.equal((await result.json()).data.users[1].balance,1300);
    assert.notEqual((await t.cmd('adminAdjust',['jamie','remove',2000])).status,200);
    assert.equal((await t.cmd('addUser',['New player'])).status,200);
    await t.request('/api/admin/logout',{body:{}});assert.equal((await t.cmd('adminAdjust',['jamie','add',1])).status,403);
});
test('passkey login verifies real signatures, consumes the challenge and binds sessions to the platform identity',async()=>{
    const t=await fixture();await t.enroll();await t.request('/api/admin/logout',{body:{}});
    const options=await (await t.request('/api/admin/authenticate/options',{body:{}})).json(),assertion=await t.assertion(options);
    assert.equal((await t.request('/api/admin/authenticate/verify',{body:assertion})).status,200);
    assert.equal((await t.request('/api/admin/authenticate/verify',{body:assertion})).status,401);
    assert.equal((await t.request('/api/command',{actor:'different-visitor',body:{id:crypto.randomUUID(),command:'adminAdjust',args:['alex','add',1],playerId:'alex'}})).status,403);
    t.sql.prepare('UPDATE admin_sessions SET expires_at=0').run();assert.equal((await t.cmd('adminAdjust',['alex','add',1])).status,403);
});
test('wrong origins, missing local user verification, invalid signatures and expired challenges never unlock admin',async()=>{
    const t=await fixture();let options=await (await t.request('/api/admin/register/options',{body:{}})).json();
    assert.notEqual((await t.request('/api/admin/register/verify',{body:await t.registration(options,{uv:false})})).status,200);
    await t.enroll();await t.request('/api/admin/logout',{body:{}});
    for(const bad of [{origin:'https://evil.example'},{uv:false},{badSignature:true}]){
        options=await (await t.request('/api/admin/authenticate/options',{body:{}})).json();
        assert.notEqual((await t.request('/api/admin/authenticate/verify',{body:await t.assertion(options,bad)})).status,200);
        assert.equal((await t.cmd('adminAdjust',['alex','add',1])).status,403);
    }
    options=await (await t.request('/api/admin/authenticate/options',{body:{}})).json();t.sql.prepare('UPDATE admin_challenges SET expires_at=0').run();
    assert.equal((await t.request('/api/admin/authenticate/verify',{body:await t.assertion(options)})).status,401);
});
test('server commands are idempotent and concurrent gifts preserve the total chips',async()=>{
    const t=await fixture(),id=crypto.randomUUID(),body={id,command:'gift',args:['jamie',100],playerId:'alex'};
    const first=await t.request('/api/command',{body});assert.equal(first.status,200);const before=await first.json();
    const again=await t.request('/api/command',{body});assert.equal(again.status,200);const replay=await again.json();assert.deepEqual(replay.data,before.data);assert.deepEqual(replay.result,before.result);
    const results=await Promise.all([t.cmd('gift',['jamie',10]),t.cmd('gift',['taylor',20]),t.cmd('gift',['jamie',30])]);assert.ok(results.every(r=>r.status===200));
    const data=(await (await t.request('/api/state')).json()).data;assert.equal(data.users.reduce((sum,user)=>sum+user.balance,0),3000);assert.equal(data.users[0].balance,840);
});
test('server keeps roulette stakes until play, chooses the outcome and credits a jackpot only once',async()=>{
    const t=await fixture();assert.equal((await t.cmd('roulette.bet',[7,137])).status,200);
    let data=(await (await t.request('/api/state')).json()).data;assert.equal(data.users[0].balance,863);assert.equal(data.users[0].bets.numbers[7],137);
    const spin=await (await t.cmd('roulette.spin',[true])).json();assert.equal(spin.result.number,7);assert.equal(spin.result.payout,3288);assert.equal(spin.data.users[0].balance,4151);
    const rig=await (await t.cmd('roulette.rig',[spin.result.roundId])).json();assert.equal(rig.data.users[0].balance,4151);
    assert.equal((await t.cmd('roulette.rig',['not-a-round'])).status,400);
});
test('legacy import requires passkey admin and refuses to overwrite subsequent server activity',async()=>{
    const t=await fixture();await t.enroll();const legacy=new globalThis.CasinoEngine(null).data;legacy.users[0].balance=12345;
    const imported=await t.cmd('import',[legacy]);assert.equal(imported.status,200);assert.equal((await imported.json()).data.users[0].balance,12345);
    assert.equal((await t.cmd('import',[legacy])).status,409);
});
test('PLAYER contains player finance while management forms are confined to ADMIN',async()=>{
    const html=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8'),start=html.indexOf('<section id="players-view"'),end=html.indexOf('<section id="bank-view"');
    assert.ok(start>=0&&end>start);const players=html.slice(start,end);
    assert.ok(!players.includes('club-player-list'));assert.ok(!players.includes('player-form'));assert.ok(players.includes('peer-loan-form'));
    assert.ok(html.includes('id="admin-view"'));assert.ok(html.includes('id="admin-adjust-form"'));assert.ok(html.includes('href="/player"'));assert.ok(html.includes('href="/admin"'));
});

test('built Worker serves PLAYER and ADMIN with server bootstrap and denies management without authentication',async()=>{
    const t=await fixture(),worker=(await import('../dist/server/index.js')).default;
    for(const route of ['/player','/admin']){
        const response=await worker.fetch(new Request(t.ORIGIN+route,{headers:{'oai-authenticated-user-id':'owner-site-user'}}),{DB:t.DB});
        assert.equal(response.status,200);const page=await response.text();assert.ok(page.includes('window.__CASINO_BOOTSTRAP__='));assert.ok(!page.includes('/* SERVER_BOOTSTRAP */'));
        assert.equal(response.headers.get('Cache-Control'),'private, no-store');
    }
    assert.equal((await worker.fetch(new Request(t.ORIGIN+'/api/command',{method:'POST',headers:{'oai-authenticated-user-id':'owner-site-user',Origin:t.ORIGIN,'Content-Type':'application/json'},body:JSON.stringify({id:crypto.randomUUID(),command:'adminAdjust',args:['alex','add',1],playerId:'alex'})}),{DB:t.DB})).status,403);
});

test('remote browser engine uses server state for game, gifts and administrator balances',async()=>{
    const t=await fixture();await t.enroll();const bootstrap=await (await t.request('/api/state')).json();
    const vm=require('node:vm'),window={__CASINO_BOOTSTRAP__:bootstrap},sandbox={window,CasinoEngine:globalThis.CasinoEngine,CasinoBlackjack:globalThis.CasinoBlackjack,
        crypto,AbortSignal,Date,sessionStorage:{getItem(){},setItem(){}},localStorage:{getItem(){return null;}},fetch:async(url,options={})=>t.request(url,options.body?{body:JSON.parse(options.body)}:{})};
    vm.createContext(sandbox);vm.runInContext(fs.readFileSync(path.join(__dirname,'../src/remote-engine.js'),'utf8'),sandbox);
    const engine=new window.CasinoEngine();await engine.transfer('jamie',137);assert.equal(engine.active.balance,863);assert.equal(engine.data.users[1].balance,1137);
    await engine.adminAdjust('alex','add',1000,'test');assert.equal(engine.active.balance,1863);
    const slots=await engine.spinSlots(137,null,{jackpot:true});assert.equal(slots.payout,6850);assert.equal(engine.active.balance,8576);
    const game=new window.CasinoBlackjack(engine);await game.forceJackpot(100);assert.equal(engine.active.balance,8726);assert.equal(engine.lock,null);
    await engine.rouletteBet(0,100);const result=await engine.rouletteSpin(true);assert.equal(result.payout,2400);assert.equal(engine.active.balance,11026);
    await t.request('/api/admin/logout',{body:{}});await assert.rejects(engine.adminAdjust('alex','add',1));assert.equal(engine.active.balance,11026);
});

test('remote browser preserves old local data until an authenticated import completes',async()=>{
    const t=await fixture(),bootstrap=await (await t.request('/api/state')).json(),vm=require('node:vm'),legacy=new globalThis.CasinoEngine(null).data;
    legacy.users[0].balance=4321;const window={__CASINO_BOOTSTRAP__:bootstrap},sandbox={window,CasinoEngine:globalThis.CasinoEngine,CasinoBlackjack:globalThis.CasinoBlackjack,
        crypto,AbortSignal,Date,sessionStorage:{getItem(){},setItem(){}},localStorage:{getItem(){return JSON.stringify(legacy);}},fetch:async(url,options={})=>t.request(url,options.body?{body:JSON.parse(options.body)}:{})};
    vm.createContext(sandbox);vm.runInContext(fs.readFileSync(path.join(__dirname,'../src/remote-engine.js'),'utf8'),sandbox);
    const engine=new window.CasinoEngine();assert.equal(engine.legacyPending,true);await assert.rejects(engine.borrow(100));
    await t.enroll();await engine.importLegacy(legacy);assert.equal(engine.legacyPending,false);assert.equal(engine.active.balance,4321);assert.equal(JSON.parse(sandbox.localStorage.getItem()).users[0].balance,4321);
});

test('ADMIN screen enrolls through WebAuthn, adjusts a chosen player only after verification and locks on logout',async()=>{
    const t=await fixture(),bootstrap=await (await t.request('/api/state')).json(),vm=require('node:vm');
    class Element {
        constructor(){this.value='';this.children=[];this.events={};}
        addEventListener(type,fn){(this.events[type]??=[]).push(fn);}async fire(type){for(const fn of this.events[type]??[])await fn({preventDefault(){}});}
        replaceChildren(...children){this.children=children;}
    }
    const nodes=new Map(),get=id=>{if(!nodes.has(id))nodes.set(id,new Element());return nodes.get(id);};
    const window={__CASINO_BOOTSTRAP__:bootstrap,location:{pathname:'/admin'},PublicKeyCredential:function(){}},sandbox={window,CasinoEngine:globalThis.CasinoEngine,CasinoBlackjack:globalThis.CasinoBlackjack,
        crypto,AbortSignal,Date,navigator:{credentials:{}},sessionStorage:{getItem(){},setItem(){}},localStorage:{getItem(){return null;}},
        document:{getElementById:get,createElement:()=>new Element(),querySelectorAll:()=>[]},
        ClubPasskeys:{startRegistration:({optionsJSON})=>t.registration(optionsJSON),startAuthentication:({optionsJSON})=>t.assertion(optionsJSON)},
        fetch:async(url,options={})=>t.request(url,options.body?{body:JSON.parse(options.body)}:{})};
    vm.createContext(sandbox);vm.runInContext(fs.readFileSync(path.join(__dirname,'../src/remote-engine.js'),'utf8')+'\n'+fs.readFileSync(path.join(__dirname,'../src/admin-ui.js'),'utf8'),sandbox);
    const engine=new window.CasinoEngine();let controller;
    controller=sandbox.createAdminUI(engine,{locked:()=>!!engine.lock,changed(){controller.render();},async transact(action){try{await action();controller.render();return true;}catch{return false;}}});
    engine.onChange=()=>controller.render();controller.render();assert.equal(get('admin-panel').hidden,true);assert.equal(get('admin-enroll').hidden,false);
    await get('admin-enroll').fire('click');assert.equal(get('admin-panel').hidden,false);assert.equal(controller.unlocked,true);
    get('admin-adjust-player').value='jamie';get('admin-adjust-mode').value='add';get('admin-adjust-amount').value='500';get('admin-adjust-reason').value='bonus';
    await get('admin-adjust-form').fire('submit');assert.equal(engine.data.users[1].balance,1500);
    await get('admin-lock').fire('click');assert.equal(get('admin-panel').hidden,true);assert.equal(controller.unlocked,false);
});
