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
        const response=await service.fetch(new Request(ORIGIN+route,{method:body===undefined?'GET':'POST',headers,body:body===undefined?undefined:globalThis.CasinoMoney.stringify(body)}),{DB});
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
test('database persists one hundred players across service reloads with administrator-only creation',async()=>{
    const t=await fixture();await t.enroll();let last;
    for(let i=3;i<100;i++){
        const response=await t.cmd('addUser',['Database player '+i]);assert.equal(response.status,200);
        last=(await response.json()).result;
    }
    const {createService}=await import('../worker/service.mjs'),restarted=createService();
    const response=await restarted.fetch(new Request(t.ORIGIN+'/api/state',{headers:{'oai-authenticated-user-id':'owner-site-user'}}),{DB:t.DB});
    const state=await response.json();assert.equal(state.data.users.length,100);
    assert.equal(state.data.users.find(player=>player.id===last.id).balance,1000);
    assert.equal(JSON.parse(t.sql.prepare('SELECT snapshot FROM casino_state WHERE id=?').get('club').snapshot).users.length,100);
    const gift=await t.cmd('gift',['alex',100],{playerId:last.id});assert.equal(gift.status,200);
    const after=(await gift.json()).data;
    assert.equal(after.users.find(player=>player.id===last.id).balance,900);assert.equal(after.users[0].balance,1100);
    await t.request('/api/admin/logout',{body:{}});assert.equal((await t.cmd('addUser',['Unauthorized'])).status,403);
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
    const t=await fixture();await t.enroll();const legacyEngine=new globalThis.CasinoEngine(null);
    for(let i=3;i<30;i++)legacyEngine.addUser('Imported player '+i);
    const legacy=legacyEngine.data;legacy.users[0].balance=12345;
    const imported=await t.cmd('import',[legacy]);assert.equal(imported.status,200);const data=(await imported.json()).data;
    assert.equal(data.users[0].balance,12345);assert.equal(data.users.length,30);
    assert.equal((await (await t.request('/api/state')).json()).data.users.length,30);
    assert.equal((await t.cmd('import',[legacy])).status,409);
});
test('server persists the new bank and shark interest once at their respective real-time boundaries',async()=>{
    const t=await fixture();await t.cmd('borrow',[100000]);
    let row=t.sql.prepare('SELECT snapshot FROM casino_state WHERE id=?').get('club'),data=JSON.parse(row.snapshot);
    data.users[0].balance=0;t.sql.prepare('UPDATE casino_state SET snapshot=? WHERE id=?').run(JSON.stringify(data),'club');
    assert.equal((await t.cmd('borrowShark',[1000])).status,200);
    row=t.sql.prepare('SELECT snapshot FROM casino_state WHERE id=?').get('club');data=JSON.parse(row.snapshot);
    data.users[0].bankInterestAt=Date.now()-10*60000;data.users[0].sharkInterestAt=Date.now()-3*60000;
    t.sql.prepare('UPDATE casino_state SET snapshot=? WHERE id=?').run(JSON.stringify(data),'club');
    for(let i=0;i<2;i++){
        const state=await (await t.request('/api/state')).json();assert.equal(state.data.users[0].debt,115000);assert.equal(state.data.users[0].sharkDebt,2250);
    }
    const persisted=JSON.parse(t.sql.prepare('SELECT snapshot FROM casino_state WHERE id=?').get('club').snapshot);
    assert.equal(persisted.users[0].debt,115000);assert.equal(persisted.users[0].sharkDebt,2250);
});

test('negative-mode balances persist in D1, never refill an unfinished stake and never settle a replay twice',async()=>{
    const t=await fixture();await t.request('/api/state');
    const row=t.sql.prepare('SELECT snapshot FROM casino_state WHERE id=?').get('club'),data=JSON.parse(row.snapshot);
    data.users[0].sharkDebt=100;data.users[0].balance=0;data.users[0].sharkInterestPolicy=2;data.users[0].sharkInterestAt=Date.now();
    t.sql.prepare('UPDATE casino_state SET snapshot=? WHERE id=?').run(JSON.stringify(data),'club');
    let state=await (await t.request('/api/state')).json();assert.equal(state.data.users[0].balance,10);assert.equal(state.data.users[0].recovery.deficit,0);
    state.data.users[0].recovery.deficit=200;
    t.sql.prepare('UPDATE casino_state SET snapshot=? WHERE id=?').run(JSON.stringify(state.data),'club');
    assert.equal((await t.cmd('gift',['jamie',1])).status,400);
    assert.equal((await t.cmd('roulette.bet',['RED',10])).status,200);
    state=await (await t.request('/api/state')).json();assert.equal(state.data.users[0].balance,0);assert.equal(state.data.users[0].recovery.deficit,200);
    const id=crypto.randomUUID();const spin=await t.cmd('roulette.spin',[true],{id});assert.equal(spin.status,200);
    const once=await spin.json();assert.equal(once.data.users[0].balance,10);assert.equal(once.data.users[0].recovery.deficit,190);
    const replay=await (await t.cmd('roulette.spin',[true],{id})).json();assert.equal(replay.data.users[0].balance,10);assert.equal(replay.data.users[0].recovery.deficit,190);
    const persisted=JSON.parse(t.sql.prepare('SELECT snapshot FROM casino_state WHERE id=?').get('club').snapshot);
    assert.equal(persisted.users[0].recovery.deficit,190);assert.equal(persisted.users[0].sharkDebt,100);
});

test('one-click repayment settles latest bank and shark interest and ignores duplicate requests',async()=>{
    const t=await fixture();assert.equal((await t.cmd('borrow',[1000])).status,200);
    let data=JSON.parse(t.sql.prepare('SELECT snapshot FROM casino_state WHERE id=?').get('club').snapshot);
    data.users[0].bankInterestAt=Date.now()-10*60000;t.sql.prepare('UPDATE casino_state SET snapshot=? WHERE id=?').run(JSON.stringify(data),'club');
    const id=crypto.randomUUID();let response=await t.cmd('repayAll',['bank'],{id});assert.equal(response.status,200);
    let state=await response.json();assert.equal(state.data.users[0].debt,0);assert.equal(state.data.users[0].balance,850);
    const replay=await (await t.cmd('repayAll',['bank'],{id})).json();assert.equal(replay.data.users[0].balance,850);
    assert.equal((await t.cmd('repayAll',['bank'])).status,400);
    data=JSON.parse(t.sql.prepare('SELECT snapshot FROM casino_state WHERE id=?').get('club').snapshot);
    Object.assign(data.users[0],{balance:3000,sharkDebt:1000,sharkInterestPolicy:2,sharkInterestAt:Date.now()-3*60000});
    t.sql.prepare('UPDATE casino_state SET snapshot=? WHERE id=?').run(JSON.stringify(data),'club');
    response=await t.cmd('repayAll',['shark']);assert.equal(response.status,200);state=await response.json();
    assert.equal(state.data.users[0].sharkDebt,0);assert.equal(state.data.users[0].sharkInterestAt,null);assert.equal(state.data.users[0].balance,750);
    data=JSON.parse(t.sql.prepare('SELECT snapshot FROM casino_state WHERE id=?').get('club').snapshot);
    Object.assign(data.users[0],{sharkDebt:500,sharkInterestPolicy:2,sharkInterestAt:Date.now()-3*60000});
    t.sql.prepare('UPDATE casino_state SET snapshot=? WHERE id=?').run(JSON.stringify(data),'club');
    assert.equal((await t.cmd('repayAll',['shark'])).status,400);
    state=await (await t.request('/api/state')).json();assert.equal(state.data.users[0].balance,750);assert.equal(state.data.users[0].sharkDebt,1125);
});

test('one-click peer repayment validates its borrower and preserves the lender transfer in D1',async()=>{
    const t=await fixture(),offer=await (await t.cmd('offerLoan',['jamie',100,2,1])).json(),loan=offer.result;
    assert.equal((await t.cmd('respondLoan',[loan.id,true],{playerId:'jamie'})).status,200);
    const data=JSON.parse(t.sql.prepare('SELECT snapshot FROM casino_state WHERE id=?').get('club').snapshot);
    data.loans[0].interestAt=Date.now()-60000;t.sql.prepare('UPDATE casino_state SET snapshot=? WHERE id=?').run(JSON.stringify(data),'club');
    assert.equal((await t.cmd('repayAll',['peer',loan.id])).status,400);
    const id=crypto.randomUUID(),response=await t.cmd('repayAll',['peer',loan.id],{playerId:'jamie',id});assert.equal(response.status,200);
    const state=await response.json();assert.equal(state.data.users[0].balance,1002);assert.equal(state.data.users[1].balance,998);assert.equal(state.data.loans[0].status,'repaid');
    const replay=await (await t.cmd('repayAll',['peer',loan.id],{playerId:'jamie',id})).json();assert.equal(replay.data.users[0].balance,1002);
});

test('Plinko and dice settle in D1 once, retain their server results and reject invalid wagers',async()=>{
    const t=await fixture(),id=crypto.randomUUID();
    let response=await t.cmd('plinko',[137,'high','center',{jackpot:true}],{id});assert.equal(response.status,200);
    let state=await response.json();assert.equal(state.result.payout,13700);assert.equal(state.result.path.length,12);assert.equal(state.data.users[0].balance,14563);
    const replay=await (await t.cmd('plinko',[137,'high','center',{jackpot:true}],{id})).json();assert.equal(replay.data.users[0].balance,14563);assert.equal(replay.data.users[0].arcadeHistory.length,1);
    response=await t.cmd('dice',[137,'sum',4,{jackpot:true}]);assert.equal(response.status,200);state=await response.json();assert.equal(state.result.total,4);assert.equal(state.result.payout,8357);assert.equal(state.data.users[0].balance,22783);
    assert.equal((await t.cmd('plinko',[1,'invalid','center'])).status,400);assert.equal((await t.cmd('dice',[1,'sum',99])).status,400);
    const saved=JSON.parse(t.sql.prepare('SELECT snapshot FROM casino_state WHERE id=?').get('club').snapshot);assert.equal(saved.users[0].arcadeHistory.length,2);assert.equal(saved.users[0].balance,22783);assert.equal(saved.users[1].balance,1000);
});

test('new arcade commands cannot bypass a pending blackjack hand or spend more than the recovery allowance',async()=>{
    const t=await fixture();await t.request('/api/state');let data=JSON.parse(t.sql.prepare('SELECT snapshot FROM casino_state WHERE id=?').get('club').snapshot);
    data.users[0].recovery={deficit:200};data.users[0].balance=10;t.sql.prepare('UPDATE casino_state SET snapshot=? WHERE id=?').run(JSON.stringify(data),'club');
    assert.equal((await t.cmd('plinko',[11,'high','center'])).status,400);assert.equal((await t.cmd('dice',[11,'small',null])).status,400);
    const result=await (await t.cmd('dice',[10,'small',null,{jackpot:true}])).json();assert.equal(result.data.users[0].recovery.deficit,190);assert.equal(result.data.users[0].balance,10);
    const engine=new globalThis.CasinoEngine(null,()=>.5),shoe=globalThis.CasinoBlackjack.makeShoe(()=>.5);
    const cards=[10,10,7,9].map(rank=>shoe.splice(shoe.findIndex(card=>card.rank===rank),1)[0]);
    engine.active.balance=10;new globalThis.CasinoBlackjack(engine,{shoeFactory:()=>[...shoe,...cards.toReversed()]}).start(1);
    data=JSON.parse(t.sql.prepare('SELECT snapshot FROM casino_state WHERE id=?').get('club').snapshot);data.users[0].blackjack=engine.active.blackjack;data.users[0].balance=9;
    t.sql.prepare('UPDATE casino_state SET snapshot=? WHERE id=?').run(JSON.stringify(data),'club');
    assert.equal((await t.cmd('plinko',[1,'low','center'])).status,400);assert.equal((await t.cmd('dice',[1,'small',null])).status,400);
});

test('PLAYER contains player finance while management forms are confined to ADMIN',async()=>{
    const html=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8'),start=html.indexOf('<section id="players-view"'),end=html.indexOf('<section id="bank-view"');
    assert.ok(start>=0&&end>start);const players=html.slice(start,end);
    assert.ok(!players.includes('club-player-list'));assert.ok(!players.includes('player-form'));assert.ok(players.includes('peer-loan-form'));
    assert.ok(html.includes('id="admin-view"'));assert.ok(html.includes('id="admin-adjust-form"'));assert.ok(html.includes('href="/player"'));assert.ok(html.includes('href="/admin"'));
    for(const id of ['directory-search','directory-sort','directory-rows','forecast-minutes','bank-repay-all','shark-repay-all','activity-search','activity-export','admin-player-search'])assert.ok(html.includes('id="'+id+'"'));
    for(const id of ['tab-plinko','tab-dice','plinko-view','dice-view','plinko-wager','dice-wager','plinko-mount','dice-mount'])assert.ok(html.includes('id="'+id+'"'));
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


test('100-digit admin adjustments, roulette wins, gifts and receipts persist exactly through D1 and Worker reload',async()=>{
    const t=await fixture();await t.enroll();const M=globalThis.CasinoMoney,H=10n**100n+137n;
    const read=async response=>{assert.equal(response.status,200);return M.hydrate(await response.json());};
    let data=await read(await t.cmd('adminAdjust',['alex','add',String(H)]));assert.equal(data.data.users[0].balance,H+1000n);
    await read(await t.cmd('roulette.bet',[0,String(H)]));data=await read(await t.cmd('roulette.spin',[true]));assert.equal(data.result.payout,H*24n);assert.equal(data.data.users[0].balance,H*24n+1000n);
    const id=crypto.randomUUID(),args=['jamie',H*20n];
    data=await read(await t.cmd('gift',args,{id}));assert.equal(data.data.users[0].balance,H*4n+1000n);assert.equal(data.data.users[1].balance,H*20n+1000n);
    const replay=await read(await t.cmd('gift',args,{id}));assert.equal(replay.revision,data.revision);assert.equal(replay.data.users[1].balance,H*20n+1000n);
    const raw=t.sql.prepare('SELECT snapshot FROM casino_state WHERE id=?').get('club').snapshot;assert.equal(M.parseJSON(raw).users[1].balance,H*20n+1000n);
    const built=(await import('../dist/server/index.js')).default;
    const response=await built.fetch(new Request(t.ORIGIN+'/api/state',{headers:{'oai-authenticated-user-id':'owner-site-user'}}),{DB:t.DB});
    data=await read(response);assert.equal(data.data.users[0].balance,H*4n+1000n);
    const page=await built.fetch(new Request(t.ORIGIN+'/player',{headers:{'oai-authenticated-user-id':'owner-site-user'}}),{DB:t.DB});
    assert.equal(page.status,200);assert.ok((await page.text()).includes(String(H*20n+1000n)));
    await t.request('/api/admin/logout',{body:{}});assert.equal((await t.cmd('adminAdjust',['alex','add',String(H)])).status,403);
});

test('remote engine hydrates 100-digit bootstrap and API results and sends exact All In without duplicate credit',async()=>{
    const t=await fixture();await t.enroll();const H=10n**80n+7n,M=globalThis.CasinoMoney;
    assert.equal((await t.cmd('adminAdjust',['alex','add',String(H)])).status,200);
    const bootstrap=await (await t.request('/api/state')).json(),vm=require('node:vm');
    const window={__CASINO_BOOTSTRAP__:bootstrap},sandbox={window,CasinoEngine:globalThis.CasinoEngine,CasinoBlackjack:globalThis.CasinoBlackjack,
        crypto,AbortSignal,Date,sessionStorage:{getItem(){},setItem(){}},localStorage:{getItem(){return null;}},fetch:async(url,options={})=>t.request(url,options.body?{body:JSON.parse(options.body)}:{})};
    vm.createContext(sandbox);vm.runInContext(fs.readFileSync(path.join(__dirname,'../src/remote-engine.js'),'utf8'),sandbox);
    const engine=new window.CasinoEngine();assert.equal(engine.active.balance,H+1000n);
    const result=await engine.spinSlots(engine.active.balance,null,{allIn:true,jackpot:true});assert.equal(result.payout,(H+1000n)*50n);assert.equal(engine.active.balance,result.payout);
    engine.lock=null;await engine.sync();assert.equal(engine.active.balance,result.payout);
    await engine.transfer('jamie',H);assert.equal(engine.data.users[1].balance,H+1000n);
    await engine.playPlinko(H,'high','center',{jackpot:true});assert.equal(engine.active.balance,(H+1000n)*50n+98n*H);
    engine.lock=null;await engine.playDice(H,'sum',4,{jackpot:true});assert.equal(engine.active.balance,(H+1000n)*50n+158n*H);
    engine.lock=null;const game=new window.CasinoBlackjack(engine);const round=await game.forceJackpot(H);
    assert.equal(round.result.payout,H*5n/2n);assert.equal(M.valid(engine.active.balance),true);
});


test('lottery purchases are saved in D1 once, preserve fixed prices and cannot inject a payout',async()=>{
    const t=await fixture();await t.enroll();const M=globalThis.CasinoMoney;
    assert.equal((await t.cmd('adminAdjust',['alex','add','10000000000000000000000000000000000000000'])).status,200);
    let balance=M.hydrate(await (await t.request('/api/state')).json()).data.users[0].balance;
    for(const price of [1000,10000,1000000]){
        const id=crypto.randomUUID(),response=await t.cmd('lottery',[price,{jackpot:true,payout:999999999999} ],{id});assert.equal(response.status,200);
        const data=M.hydrate(await response.json());balance=M.add(balance,price*99);
        assert.equal(data.result.payout,price*100);assert.equal(data.data.users[0].balance,balance);assert.equal(data.data.users[0].lotteryHistory.length,[1000,10000,1000000].indexOf(price)+1);
        const replay=M.hydrate(await (await t.cmd('lottery',[price,{jackpot:true,payout:999999999999}],{id})).json());
        assert.equal(replay.result.id,data.result.id);assert.equal(replay.revision,data.revision);assert.equal(replay.data.users[0].balance,balance);
    }
    for(const args of [[1001],[0],[1.5],[1000001],[1000,null],[1000,[]],[1000,true],[1000,{},{}]])assert.equal((await t.cmd('lottery',args)).status,400);
    const snapshot=M.parseJSON(t.sql.prepare('SELECT snapshot FROM casino_state WHERE id=?').get('club').snapshot);assert.equal(snapshot.users[0].balance,balance);assert.equal(snapshot.users[0].lotteryHistory.length,3);
    const saved=snapshot.users[0].lotteryHistory[0];assert.equal(globalThis.CasinoLottery.validHistory(saved),true);
    const {createService}=await import('../worker/service.mjs'),service=createService();
    const loaded=await service.fetch(new Request(t.ORIGIN+'/api/state',{headers:{'oai-authenticated-user-id':'owner-site-user'}}),{DB:t.DB});
    assert.equal(M.hydrate(await loaded.json()).data.users[0].balance,balance);
});

test('lottery draws retain server-determined outcomes and respect funds, player isolation and pending blackjack',async()=>{
    const t=await fixture(),M=globalThis.CasinoMoney;
    assert.equal((await t.cmd('lottery',[10000])).status,400);
    const response=await t.cmd('lottery',[1000]);assert.equal(response.status,200);const data=M.hydrate(await response.json());
    assert.equal(globalThis.CasinoLottery.validHistory(data.result),true);assert.equal(data.data.users[0].balance,data.result.payout);assert.equal(data.data.users[1].lotteryHistory,undefined);
    const e=new globalThis.CasinoEngine(null,()=>.5),shoe=globalThis.CasinoBlackjack.makeShoe(()=>.5),sequence=[10,10,7,9].map(rank=>shoe.splice(shoe.findIndex(c=>c.rank===rank),1)[0]);
    new globalThis.CasinoBlackjack(e,{shoeFactory:()=>[...shoe,...sequence.toReversed()]}).start(1);
    const snapshot=data.data;snapshot.users[0].blackjack=e.active.blackjack;snapshot.users[0].balance=10000;
    t.sql.prepare('UPDATE casino_state SET snapshot=? WHERE id=?').run(M.stringify(snapshot),'club');
    assert.equal((await t.cmd('lottery',[1000])).status,400);assert.equal((await t.cmd('lottery',[1000],{playerId:'jamie'})).status,409);
});

test('remote lottery bootstrap, paid jackpot and server history survive browser synchronization',async()=>{
    const t=await fixture(),bootstrap=await (await t.request('/api/state')).json(),vm=require('node:vm');
    const window={__CASINO_BOOTSTRAP__:bootstrap},sandbox={window,CasinoEngine:globalThis.CasinoEngine,CasinoBlackjack:globalThis.CasinoBlackjack,
        crypto,AbortSignal,Date,sessionStorage:{getItem(){},setItem(){}},localStorage:{getItem(){return null;}},fetch:async(url,options={})=>t.request(url,options.body?{body:JSON.parse(options.body)}:{})};
    vm.createContext(sandbox);vm.runInContext(fs.readFileSync(path.join(__dirname,'../src/remote-engine.js'),'utf8'),sandbox);
    const e=new window.CasinoEngine(),ticket=await e.buyLottery(1000,{jackpot:true});assert.equal(ticket.payout,100000);assert.equal(e.active.balance,100000);
    await e.sync();assert.equal(e.active.lotteryHistory[0].id,ticket.id);assert.equal(e.active.balance,100000);
    const worker=(await import('../dist/server/index.js')).default,page=await worker.fetch(new Request(t.ORIGIN+'/player',{headers:{'oai-authenticated-user-id':'owner-site-user'}}),{DB:t.DB});
    assert.equal(page.status,200);const html=await page.text();for(const id of ['tab-lottery','lottery-view','lottery-buy','lottery-odds','lottery-history'])assert.ok(html.includes('id="'+id+'"'));
});
