import '../src/club-core.js';
import '../src/blackjack-core.js';
import { generateRegistrationOptions, verifyRegistrationResponse, generateAuthenticationOptions, verifyAuthenticationResponse } from '@simplewebauthn/server';

const Engine = globalThis.CasinoEngine, Blackjack = globalThis.CasinoBlackjack;
export const ORIGIN = 'https://roulette-club-777-oct15.lonivxy.chatgpt.site';
const RP = new URL(ORIGIN).hostname, SESSION = '__Host-club-admin', CHALLENGE = '__Host-club-challenge';
const SESSION_MS = 15 * 60000;
const json = (value, status = 200, headers = {}) => Response.json(value, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers } });
const fail = (message, status = 400) => { throw Object.assign(new Error(message), { status }); };
const bytesToB64 = value => btoa(String.fromCharCode(...value)).replaceAll('+','-').replaceAll('/','_').replaceAll('=','');
const fromB64 = value => Uint8Array.from(atob(value.replaceAll('-','+').replaceAll('_','/')), c => c.charCodeAt(0));
const token = () => bytesToB64(crypto.getRandomValues(new Uint8Array(32)));
const hash = async value => bytesToB64(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))));
const cookie = (name, value, seconds) => `${name}=${value}; Path=/; Max-Age=${seconds}; Secure; HttpOnly; SameSite=Strict`;
function getCookie(request, name) { return request.headers.get('cookie')?.split(';').map(s=>s.trim()).find(s=>s.startsWith(name+'='))?.slice(name.length+1) || ''; }
function actor(request) { return request.headers.get('oai-authenticated-user-id') || fail('请先使用本站所属账号登录。', 401); }
function engineFrom(snapshot) {
    const engine = new Engine({getItem:()=>snapshot,setItem(){}}, undefined, () => Date.now(), {recoverRoulette:false});
    if (engine.storageWarning) fail('服务器账户数据校验失败。', 500);
    return engine;
}
function bestRoulette(bets) {
    let number=0,payout=-1;
    for(let n=0;n<24;n++){const p=roulettePayout(bets,n);if(p>payout){payout=p;number=n;}}
    return number;
}
function roulettePayout(bets,n) { return (bets.numbers[n]||0)*24+(n===0?bets.GREEN*24:n%2?(bets.RED+bets.ODD)*2:(bets.BLACK+bets.EVEN)*2); }
function rouletteBet(engine, [kind, value]) {
    engine.ensureIdle();const user=engine.active,amount=engine.amount(value);
    if(amount>user.balance)fail('钱包余额不足。');
    if(typeof kind==='number'&&Number.isInteger(kind)&&kind>=0&&kind<24)user.bets.numbers[kind]=(user.bets.numbers[kind]||0)+amount;
    else if(['RED','BLACK','GREEN','ODD','EVEN'].includes(kind))user.bets[kind]+=amount;
    else fail('无效的轮盘下注。');
    user.balance-=amount;
}
function rouletteSpin(engine, jackpot) {
    engine.ensureIdle();const user=engine.active,wager=Engine.sumBets(user.bets);
    if(!wager)fail('请先放置筹码。');
    const bets=structuredClone(user.bets),number=jackpot?bestRoulette(bets):Math.floor(engine.random()*24),payout=roulettePayout(bets,number);
    if(user.balance+payout>1000000000)fail('钱包已接近上限。');
    const recoveryBefore=structuredClone(user.recovery||null);
    user.balance+=payout;user.lastBets=bets;user.bets=Engine.emptyBets();user.pendingRoulette=false;
    const result={roundId:crypto.randomUUID(),number,index:number,wager,payout,bets,rigged:Boolean(jackpot)};
    engine.completeRound(payout-wager);
    result.recoveryBefore=recoveryBefore;
    result.settlement={balance:user.balance,recovery:structuredClone(user.recovery||null)};
    user.lastRoulette=result;user.history.unshift({num:number,colorTag:number===0?'GREEN':number%2?'RED':'BLACK'});user.history=user.history.slice(0,10);
    engine.record(`${user.name} · Roulette ${number}: wager ${wager.toLocaleString()}, payout ${payout.toLocaleString()}.`);
    return result;
}
export async function applyCommand(engine, command, args, admin) {
    if(!Array.isArray(args)||args.length>5)fail('无效的操作参数。');
    const game=new Blackjack(engine);
    const playerCommands={gift:'transfer',offerLoan:'offerLoan',respondLoan:'respondLoan',cancelLoan:'cancelLoan',repayLoan:'repayLoan',repayAll:'repayAll',borrow:'borrow',repay:'repay',borrowShark:'borrowShark',repayShark:'repayShark',buyCard:'buyCard',armCard:'armCard'};
    if(Object.hasOwn(playerCommands,command))return engine[playerCommands[command]](...args);
    if(['addUser','deletePlayer','adminAdjust','import'].includes(command)&&!admin)fail('请先通过 Windows Hello 管理验证。',403);
    if(['addUser','deletePlayer','adminAdjust'].includes(command))return engine[command](...args);
    if(command==='slots'){
        if(args[1]&&typeof args[1]!=='object')fail('无效的下注选项。');
        return engine.spinSlots(args[0],null,{allIn:Boolean(args[1]?.allIn),jackpot:Boolean(args[1]?.jackpot)});
    }
    if(command==='blackjack'){
        const [move,wager]=args;
        if(!['start','hit','stand','double','split','dealerStep','forceJackpot'].includes(move))fail('无效的二十一点操作。');
        return game[move](wager);
    }
    if(command==='roulette.bet'){rouletteBet(engine,args);return null;}
    if(command==='roulette.clear'){
        engine.ensureIdle();engine.active.balance+=Engine.sumBets(engine.active.bets);engine.active.bets=Engine.emptyBets();return null;
    }
    if(command==='roulette.rebet'){
        engine.ensureIdle();const user=engine.active;if(!user.lastBets)fail('没有上一轮下注。');
        const total=Engine.sumBets(user.lastBets),available=user.balance+Engine.sumBets(user.bets);
        if(total>available)fail('余额不足以重复下注。');user.balance=available-total;user.bets=structuredClone(user.lastBets);return null;
    }
    if(command==='roulette.spin')return rouletteSpin(engine,Boolean(args[0]));
    if(command==='roulette.rig'){
        engine.ensureIdle();const user=engine.active,last=user.lastRoulette;
        if(!last||last.roundId!==args[0])fail('这轮轮盘已经结束。');
        const number=bestRoulette(last.bets),payout=roulettePayout(last.bets,number),delta=payout-last.payout;
        if(!delta)return last;
        if(last.settlement&&(user.balance!==last.settlement.balance||JSON.stringify(user.recovery||null)!==JSON.stringify(last.settlement.recovery)))fail('账户已发生其他变动，不能再调整这轮结果。');
        if(user.balance+delta>1000000000)fail('钱包已接近上限。');
        if(!last.recoveryBefore&&last.settlement?.recovery){user.recovery=null;user.balance-=10;}
        user.balance+=delta;last.number=last.index=number;last.payout=payout;last.rigged=true;
        engine.completeRound(delta);last.settlement={balance:user.balance,recovery:structuredClone(user.recovery||null)};
        if(user.history[0])user.history[0]={num:number,colorTag:number===0?'GREEN':number%2?'RED':'BLACK'};
        if(delta)engine.record(`${user.name} · Roulette jackpot adjustment +${delta.toLocaleString()}.`);return last;
    }
    fail('未知操作。',404);
}

export function createService({page='',webauthn={generateRegistrationOptions,verifyRegistrationResponse,generateAuthenticationOptions,verifyAuthenticationResponse}}={}) {
    async function readState(db) {
        let row=await db.prepare('SELECT snapshot, revision FROM casino_state WHERE id = ?').bind('club').first();
        if(!row){const e=engineFrom(JSON.stringify(new Engine(null).data));await db.prepare('INSERT OR IGNORE INTO casino_state (id,snapshot,revision,last_op) VALUES (?,?,0,?)').bind('club',JSON.stringify(e.data),'initial').run();row=await db.prepare('SELECT snapshot, revision FROM casino_state WHERE id = ?').bind('club').first();}
        return row;
    }
    async function adminSession(request,db) {
        const raw=getCookie(request,SESSION);if(!raw)return false;
        const row=await db.prepare('SELECT actor,expires_at FROM admin_sessions WHERE id = ?').bind(await hash(raw)).first();
        return Boolean(row&&row.actor===actor(request)&&row.expires_at>Date.now());
    }
    async function status(request,db) {
        const credential=await db.prepare('SELECT actor FROM admin_credential WHERE id = ?').bind('owner').first();
        return {enrolled:Boolean(credential),admin:await adminSession(request,db),canEnroll:!credential};
    }
    async function session(request,db) {
        const raw=token();await db.prepare('INSERT INTO admin_sessions (id,actor,expires_at) VALUES (?,?,?)').bind(await hash(raw),actor(request),Date.now()+SESSION_MS).run();
        return json({ok:true},200, {'Set-Cookie':cookie(SESSION,raw,SESSION_MS/1000)});
    }
    async function command(request,db,body) {
        const who=actor(request),admin=await adminSession(request,db);
        const {id,command:operation,args=[],playerId}=body;
        if(typeof id!=='string'||id.length<16||id.length>80||typeof operation!=='string')fail('无效的操作编号。');
        const digest=await hash(JSON.stringify({operation,args,playerId}));
        for(let attempt=0;attempt<4;attempt++){
            const prior=await db.prepare('SELECT actor,payload,response FROM casino_operations WHERE id = ?').bind(id).first();
            if(prior){
                if(prior.actor!==who||prior.payload!==digest)fail('操作编号已被使用。',409);
                const current=await state(request,db);if(current.data.users.some(user=>user.id===playerId))current.data.activeId=playerId;
                return json({...current,result:JSON.parse(prior.response).result});
            }
            const row=await readState(db);let engine=engineFrom(row.snapshot);
            if(typeof playerId!=='string'||!engine.data.users.some(user=>user.id===playerId))fail('请选择有效玩家。');
            engine.data.activeId=playerId;
            const pending=engine.data.users.find(user=>user.blackjack&&user.blackjack.phase!=='settled');
            if(pending&&pending.id!==playerId)fail('请先完成 '+pending.name+' 的二十一点牌局。',409);
            let result;
            if(operation==='import'){
                if(!admin)fail('需要管理验证。',403);if(row.revision!==0)fail('服务器已有新记录，不能覆盖导入。',409);
                if(!args[0]||typeof args[0]!=='object')fail('旧存档无效。');
                const legacy=JSON.stringify(args[0]);const imported=new Engine({getItem:()=>legacy,setItem(){}});
                if(imported.storageWarning)fail('旧存档校验失败，已保留原文件。');
                engine=imported;engine.record('管理员导入了此前浏览器的玩家存档。');result=null;
            }else {
                try { result=await applyCommand(engine,operation,args,admin); }
                catch(error){ if(error.status)throw error;fail(error.message||'操作未完成。'); }
            }
            engine.save();const snapshot=JSON.stringify(engine.data),response={data:engine.data,revision:row.revision+1,result:result??null,now:Date.now()};
            const encoded=JSON.stringify({result:response.result,revision:response.revision});
            const batch=await db.batch([
                db.prepare('UPDATE casino_state SET snapshot=?,revision=revision+1,last_op=? WHERE id=? AND revision=?').bind(snapshot,id,'club',row.revision),
                db.prepare('INSERT INTO casino_operations (id,actor,payload,response,created_at) SELECT ?,?,?,?,? WHERE EXISTS (SELECT 1 FROM casino_state WHERE id=? AND last_op=?)').bind(id,who,digest,encoded,Date.now(),'club',id)
            ]);
            if(batch[0].meta.changes===1)return json(response);
        }
        fail('其他操作正在更新账户，请重试。',409);
    }
    async function state(request,db) {
        for(let attempt=0;attempt<4;attempt++){
            const row=await readState(db),engine=engineFrom(row.snapshot),snapshot=JSON.stringify(engine.data);
            if(snapshot!==row.snapshot){const result=await db.prepare('UPDATE casino_state SET snapshot=?,revision=revision+1 WHERE id=? AND revision=?').bind(snapshot,'club',row.revision).run();if(!result.meta.changes)continue;row.revision++;}
            const selected=new URL(request.url).searchParams.get('playerId');if(selected&&engine.data.users.some(user=>user.id===selected))engine.data.activeId=selected;
            return {data:engine.data,revision:row.revision,now:Date.now(),auth:await status(request,db)};
        }
        fail('账户正在更新，请重试。',409);
    }
    async function passkey(request,db,path,body) {
        const who=actor(request),stored=await db.prepare('SELECT * FROM admin_credential WHERE id = ?').bind('owner').first();
        if(path==='/api/admin/status')return json(await status(request,db));
        if(path==='/api/admin/logout'){
            await db.prepare('DELETE FROM admin_sessions WHERE id = ?').bind(await hash(getCookie(request,SESSION))).run();return json({ok:true},200,{'Set-Cookie':cookie(SESSION,'',0)});
        }
        const kind=path.includes('/register/')?'register':'authenticate';
        if(kind==='register'&&stored)fail('管理通行密钥已设置，请使用已有密钥登录。',403);
        if(stored&&stored.actor!==who)fail('当前账号不是此站点管理员。',403);
        if(path.endsWith('/options')){
            await db.prepare('DELETE FROM admin_challenges WHERE expires_at <= ?').bind(Date.now()).run();
            await db.prepare('DELETE FROM admin_sessions WHERE expires_at <= ?').bind(Date.now()).run();
            if(kind==='authenticate'&&!stored)fail('请先设置管理通行密钥。');
            const recent=await db.prepare('SELECT COUNT(*) AS count FROM admin_challenges WHERE actor=? AND expires_at>?').bind(who,Date.now()).first();
            if(recent.count>=10)fail('验证请求过于频繁，请五分钟后重试。',429);
            const options=kind==='register'?await webauthn.generateRegistrationOptions({rpName:'Roulette Club Admin',rpID:RP,userName:'Club Administrator',userID:new TextEncoder().encode('club-owner'),attestationType:'none',authenticatorSelection:{authenticatorAttachment:'platform',residentKey:'required',userVerification:'required'},supportedAlgorithmIDs:[-7,-257]})
                :await webauthn.generateAuthenticationOptions({rpID:RP,userVerification:'required',allowCredentials:[{id:stored.credential_id,transports:JSON.parse(stored.transports)}]});
            const id=token();await db.prepare('INSERT INTO admin_challenges (id,actor,kind,challenge,expires_at) VALUES (?,?,?,?,?)').bind(await hash(id),who,kind,options.challenge,Date.now()+5*60000).run();
            return json(options,200,{'Set-Cookie':cookie(CHALLENGE,id,300)});
        }
        if(!path.endsWith('/verify'))fail('无效的验证路径。',404);
        const challenge=await db.prepare('DELETE FROM admin_challenges WHERE id=? AND actor=? AND kind=? AND expires_at>? RETURNING challenge').bind(await hash(getCookie(request,CHALLENGE)),who,kind,Date.now()).first();
        if(!challenge)fail('验证已过期或已使用，请重新开始。',401);
        if(kind==='register'){
            const verification=await webauthn.verifyRegistrationResponse({response:body,expectedChallenge:challenge.challenge,expectedOrigin:ORIGIN,expectedRPID:RP,requireUserVerification:true,supportedAlgorithmIDs:[-7,-257]});
            if(!verification.verified)fail('通行密钥验证失败。',401);
            const c=verification.registrationInfo.credential;
            await db.prepare('INSERT INTO admin_credential (id,actor,credential_id,public_key,counter,transports) VALUES (?,?,?,?,?,?)').bind('owner',who,c.id,bytesToB64(c.publicKey),c.counter,JSON.stringify(c.transports||['internal'])).run();
        }else{
            if(!stored)fail('未设置通行密钥。',401);
            const verification=await webauthn.verifyAuthenticationResponse({response:body,expectedChallenge:challenge.challenge,expectedOrigin:ORIGIN,expectedRPID:RP,requireUserVerification:true,credential:{id:stored.credential_id,publicKey:fromB64(stored.public_key),counter:stored.counter,transports:JSON.parse(stored.transports)}});
            if(!verification.verified)fail('通行密钥验证失败。',401);
            const updated=await db.prepare('UPDATE admin_credential SET counter=? WHERE id=? AND counter=?').bind(verification.authenticationInfo.newCounter,'owner',stored.counter).run();
            if(!updated.meta.changes)fail('验证计数已更新，请重试。',409);
        }
        return session(request,db);
    }
    return {async fetch(request,env){
        try{
            const url=new URL(request.url),path=url.pathname;actor(request);
            if(!env.DB)fail('账户数据库尚未连接。',503);
            if(request.method==='POST'){
                if(request.headers.get('origin')!==ORIGIN||!request.headers.get('content-type')?.startsWith('application/json'))fail('请求来源校验失败。',403);
                const text=await request.text();if(text.length>1000000)fail('请求过大。',413);let body;try{body=JSON.parse(text);}catch{fail('请求内容无效。');}
                if(path==='/api/command')return await command(request,env.DB,body);
                if(/^\/api\/admin\/(register|authenticate)\/(options|verify)$/.test(path)||path==='/api/admin/logout')return await passkey(request,env.DB,path,body);
                fail('不存在的接口。',404);
            }
            if(request.method!=='GET')fail('不支持的请求方式。',405);
            if(path==='/api/state')return json(await state(request,env.DB));
            if(path==='/api/admin/status')return await passkey(request,env.DB,path);
            if(path.startsWith('/api/'))fail('不存在的接口。',404);
            if(!['/','/player','/admin','/index.html'].includes(path))return new Response('Not found',{status:404});
            const boot=await state(request,env.DB),encoded=JSON.stringify(boot).replaceAll('<','\\u003c');
            return new Response(page.replace('/* SERVER_BOOTSTRAP */',`window.__CASINO_BOOTSTRAP__=${encoded};`),{headers:{'Content-Type':'text/html;charset=utf-8','Cache-Control':'private, no-store','Permissions-Policy':'publickey-credentials-create=(self), publickey-credentials-get=(self)','X-Frame-Options':'SAMEORIGIN','X-Content-Type-Options':'nosniff'}});
        }catch(error){return json({error:error.status?error.message:'操作未完成，请刷新后重试。'},error.status||400);}
    }};
}
