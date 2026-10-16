import '../../src/club-core.js';
import {authorize,privateState,publicPlayer,fail} from './identity.mjs';
import {loadPlatform,platformWrites,emptyPlatform,rows} from './repository.mjs';
import {initialPlatform,ensurePlayer,settledRound,questViews,periods} from './progression.mjs';
import {platformAction,isAdminCommand} from './actions.mjs';
const M=globalThis.CasinoMoney,E=globalThis.CasinoEngine;
const json=(body,status=200,headers={})=>new Response(M.stringify(body),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff',...headers}});
const digest=async text=>{const bytes=new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text)));return btoa(String.fromCharCode(...bytes)).replaceAll('+','-').replaceAll('/','_').replaceAll('=','');};
const cookie=request=>request.headers.get('cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith('__Host-club-admin='))?.slice(18)||'';
const who=request=>request.headers.get('oai-authenticated-user-id')||fail('请先登录。',401);
function engine(snapshot,now){const e=new E({getItem:()=>snapshot,setItem(){}},undefined,()=>now,{recoverRoulette:false});if(e.storageWarning)fail('存档校验失败，未修改旧数据。',500);e.isolatedPlayer=true;return e;}
function fields(user){return {cash:user.balance,bank:user.debt,shark:user.sharkDebt,negative:user.recovery?.deficit||0};}
function accountJournal(p,before,after,operation,actor,kind,now,reason=''){
 for(const user of after.users){const old=before.users.find(x=>x.id===user.id),a=old?fields(old):{cash:0,bank:0,shark:0,negative:0},b=fields(user);
  for(const asset of Object.keys(b))if(!old||M.compare(a[asset],b[asset])!==0)p.journal.push({id:operation+':'+user.id+':'+asset,playerId:user.id,operationId:operation,actor,kind,asset,before:String(a[asset]),after:String(b[asset]),delta:String(M.sub(b[asset],a[asset])),createdAt:now,reason});
 }
 for(const user of before.users)if(!after.users.some(u=>u.id===user.id))fail('不能物理删除有历史的玩家。');
}
function indexes(p,data){for(const user of data.users){if(!p.profiles[user.id])continue;const amount=user.recovery?0:user.balance,negative=amount<0,digits=String(M.abs(amount));p.wallets[user.id]={id:user.id,visible:p.profiles[user.id].walletVisible&&!p.profiles[user.id].archived?1:0,sign:amount===0?0:negative?-1:1,magnitude:digits.length,digits,name:user.name};}}
export function createV2Service({page='',applyCommand,legacyFactory,bootstrapOwnerPrivate=false,clock=()=>Date.now(),origin,extensions={}}){
 async function play(e,operation,args,admin){try{return await applyCommand(e,operation,args,admin);}catch(error){if(error.status)throw error;fail(error.message||'游戏操作无效。');}}
 async function wallet(db){let row=await db.prepare('SELECT snapshot,revision FROM casino_state WHERE id=?').bind('club').first();if(!row){const e=new E(null);await db.prepare('INSERT OR IGNORE INTO casino_state (id,snapshot,revision,last_op) VALUES (?,?,0,?)').bind('club',M.stringify(e.data),'initial').run();row=await db.prepare('SELECT snapshot,revision FROM casino_state WHERE id=?').bind('club').first();}return row;}
 async function stepUp(request,db){const raw=cookie(request);if(!raw)return false;const found=await db.prepare('SELECT actor,expires_at FROM admin_sessions WHERE id=?').bind(await digest(raw)).first();return Boolean(found&&found.actor===who(request)&&found.expires_at>clock());}
 async function initialize(request,db){
  for(let attempt=0;attempt<8;attempt++){
   const row=await wallet(db),previous=await loadPlatform(db),now=clock();let next=structuredClone(previous);
   if(!next.meta){const old=await db.prepare('SELECT actor FROM admin_credential WHERE id=?').bind('owner').first();const owner=old?.actor||(bootstrapOwnerPrivate?who(request):null);if(!owner)fail('请先由所有者完成初始化。',503);
    next=initialPlatform(owner,now);next.accounts[owner]={id:owner,actor:owner,playerId:null,email:owner===who(request)?request.headers.get('oai-authenticated-user-email')||'':'',role:'owner',status:'active',createdAt:now};
    next.backups.push({id:'pre-v2:'+crypto.randomUUID(),createdAt:now,kind:'pre-v2',legacy:{snapshot:row.snapshot,revision:row.revision}});
   }
   const data=M.parseJSON(row.snapshot),missing=data.users.filter(u=>!next.profiles[u.id]).slice(0,5);
   for(const user of missing){ensurePlayer(next,user.id,now);accountJournal(next,{users:[]},{users:[user]},'opening:'+user.id,'system','opening',now);}
   if(!next.accounts[who(request)])next.accounts[who(request)]={id:who(request),actor:who(request),playerId:null,email:request.headers.get('oai-authenticated-user-email')||'',role:'member',status:'pending',createdAt:now};
   indexes(next,data);next.meta.ready=data.users.every(u=>next.profiles[u.id]);
   const changes=platformWrites(db,previous,next,'initializing');if(!changes.length)return {p:previous,row};
   const operation=crypto.randomUUID(),writes=platformWrites(db,previous,next,operation);
   const result=await db.batch([db.prepare('UPDATE casino_state SET revision=revision+1,last_op=? WHERE id=? AND revision=?').bind(operation,'club',row.revision),...writes]);
   if(result[0].meta.changes){row.revision++;if(!next.meta.ready)fail('正在安全导入旧玩家，请稍后刷新继续。',503);return {p:await loadPlatform(db),row};}
  }fail('初始化正忙，请重试。',409);
 }
 async function snapshot(request,db,p,row,mode='formal'){
  const account=p.accounts[who(request)];if(account?.status==='suspended')fail('账号已停用。',403);
  const elevated=await stepUp(request,db),data=M.parseJSON(row.snapshot);
  const directory=data.users.filter(u=>!p.profiles[u.id]?.archived&&Object.values(p.accounts).some(a=>a.playerId===u.id&&a.status==='active')).map(u=>publicPlayer(u,p));
  const auth={role:account?.role||'member',admin:elevated&&['owner','admin'].includes(account?.role),actor:who(request),enrolled:Boolean(await db.prepare('SELECT id FROM admin_credential WHERE id=?').bind(account?.role==='owner'?'owner':'admin:'+who(request)).first()),canEnroll:['owner','admin'].includes(account?.role)};
  auth.canEnroll=auth.canEnroll&&!auth.enrolled;
  let value=privateState(data,p,account),progress=account.playerId?p.progress[account.playerId]:null;
  if(mode==='sandbox'){authorize(p,who(request),null,true,elevated);value=p.sandbox[who(request)]?.data||sandboxData();progress=null;}
  if(account.playerId&&mode==='formal')value.ledger=(await rows(db,'v2_journal','WHERE player_id=?',[account.playerId],100)).map(e=>({time:new Date(e.createdAt).toISOString(),text:`${e.kind} · ${e.asset}: ${e.before} → ${e.after}${e.reason?' · '+e.reason:''}`}));
  const platform={protocol:2,mode,account:{role:account.role,status:account.status,playerId:account.playerId},maintenance:p.meta.maintenance,startedAt:p.meta.startedAt,
   profile:account.playerId?p.profiles[account.playerId]:null,progress,definitions:Object.values(p.definitions),items:Object.values(p.items),
   inventory:Object.values(p.inventory).filter(i=>i.playerId===account.playerId),quests:account.playerId?questViews(p,account.playerId,clock()):[],periods:periods(clock()),
   club:extensions.clubView?.(p,account.playerId,clock())||null};
  return {data:value,directory,revision:row.revision,now:clock(),auth,platform};
 }
 function sandboxData(){const e=new E(null);e.data.users=[e.data.users[0]];e.data.activeId=e.active.id;e.active.name='Sandbox';e.active.balance=100000;return e.data;}
 async function command(request,db,body){
  if(!body||typeof body!=='object'||Array.isArray(body))fail('请求格式无效。');
  const {id,command:operation,args=[],playerId,mode='formal'}=body;
  if(request.headers.get('X-Club-Protocol')!=='2')fail('站点已升级，请刷新页面。',409);
  if(typeof id!=='string'||id.length<16||id.length>80||typeof operation!=='string'||!Array.isArray(args)||args.length>5||!['formal','sandbox'].includes(mode))fail('操作参数无效。');
  const payload=await digest(M.stringify({operation,args,playerId,mode}));
  for(let attempt=0;attempt<6;attempt++){
   const {p:before,row}=await initialize(request,db),p=structuredClone(before),now=clock(),elevated=await stepUp(request,db),privileged=isAdminCommand(operation)||mode==='sandbox';
   const account=authorize(p,who(request),playerId,privileged,elevated);
   if(p.meta.maintenance&&operation!=='admin.maintenance'&&operation!=='admin.bind')fail('维护期间暂停状态修改。',503);
   if(mode==='formal'&&!privileged&&!account.playerId)fail('请先绑定自己的玩家。',403);
   const prior=await db.prepare('SELECT actor,payload,response FROM casino_operations WHERE id=?').bind(id).first();
   if(prior){if(prior.actor!==who(request)||prior.payload!==payload)fail('操作编号已被使用。',409);return json({...await snapshot(request,db,p,row,mode),result:M.parseJSON(prior.response).result});}
   const original=M.parseJSON(row.snapshot),e=engine(mode==='sandbox'?M.stringify(p.sandbox[who(request)]?.data||sandboxData()):row.snapshot,now);
   if(mode==='formal'&&account.playerId)e.data.activeId=account.playerId;
   let result;
   if(mode==='sandbox'){
    if(!['slots','lottery','plinko','dice','blackjack','roulette.bet','roulette.clear','roulette.rebet','roulette.spin','roulette.rig','sandbox.reset'].includes(operation))fail('沙盒只支持游戏和重置，不能操作正式资产。',403);
    if(operation==='sandbox.reset'){e.active.balance=args.length?e.amount(args[0]):100000;e.active.blackjack=null;e.active.bets=E.emptyBets();e.lock=null;result=null;}
    else result=await play(e,operation,args,true);p.sandbox[who(request)]={id:who(request),data:e.data};
   }else{
    if(operation==='roulette.rig'||operation==='blackjack'&&args[0]==='forceJackpot'||args.some(arg=>arg&&typeof arg==='object'&&arg.jackpot)||operation==='roulette.spin'&&args[0])fail('特殊开奖仅限管理员沙盒。',403);
    if(['gift','offerLoan'].includes(operation)&&!Object.values(p.accounts).some(a=>a.status==='active'&&a.playerId===args[0]))fail('目标玩家尚未绑定有效成员。');
    if(operation==='adminAdjust'&&(typeof args[3]!=='string'||args[3].trim().length<3))fail('余额调整必须填写至少三个字符的原因。');
    if(operation==='admin.compensate'){
     const entry=await db.prepare('SELECT body FROM v2_journal WHERE id=?').bind(args[0]).first();
     if(!entry||typeof args[1]!=='string'||args[1].trim().length<3)fail('请选择原调整流水并填写原因。');
     const originalEntry=M.parseJSON(entry.body);if(originalEntry.kind!=='adminAdjust'||originalEntry.asset!=='cash')fail('只能补偿管理员钱包调整。');
     const claimId=originalEntry.playerId+':compensation:'+originalEntry.id;if(p.claims[claimId])fail('该调整已经补偿。',409);
     const delta=M.sub(M.parse(originalEntry.before),M.parse(originalEntry.after));if(delta===0)fail('该记录没有金额变化。');
     e.adminAdjust(originalEntry.playerId,delta>0?'add':'remove',M.abs(delta),args[1]);
     p.claims[claimId]={id:claimId,playerId:originalEntry.playerId,kind:'compensation',createdAt:now,source:originalEntry.id,reason:args[1]};result={source:originalEntry.id};
    }else if(operation==='deletePlayer'){
     const user=e.data.users.find(u=>u.id===args[0]);if(!user)fail('玩家不存在。');const copy=structuredClone(e.data);e.deletePlayer(user.id);e.data=copy;
     if(Object.values(p.accounts).some(a=>a.playerId===user.id&&a.role==='owner'))fail('不能归档所有者的玩家。');
     const target=e.data.users.find(u=>u.id===user.id);target.balance=0;p.profiles[user.id].archived=true;for(const a of Object.values(p.accounts))if(a.playerId===user.id)a.status='suspended';result=null;
    }else if(operation==='import')fail('V2 已启用；旧存档不能覆盖现有数据库。',409);
    else{
     result=operation==='system.sync'?null:platformAction(p,e,account,operation,args,now);
     if(result===undefined&&extensions.action)result=extensions.action(p,e,account,operation,args,now);
     if(result===undefined)result=await play(e,operation,args,privileged&&elevated);
    }
    for(const user of e.data.users)if(!p.profiles[user.id])ensurePlayer(p,user.id,now);
    const round=operation==='blackjack'?e.active.blackjack: null;
    if(['slots','lottery','plinko','dice','roulette.spin'].includes(operation))settledRound(p,account.playerId,operation==='roulette.spin'?'roulette':operation,result?.roundId||result?.id||id,now);
    else if(round?.phase==='settled'&&!(original.users.find(u=>u.id===account.playerId)?.blackjack?.id===round.id&&original.users.find(u=>u.id===account.playerId)?.blackjack?.phase==='settled'))settledRound(p,account.playerId,'blackjack',round.id,now);
    accountJournal(p,original,e.data,id,who(request),operation,now,operation==='adminAdjust'?args[3]:isAdminCommand(operation)?String(args.at(-1)||''):'');indexes(p,e.data);
   }
   p.events.push({id:'command:'+id,playerId:account.playerId||null,kind:mode==='sandbox'?'sandbox.command':operation,createdAt:now,actor:who(request)});
   const nextSnapshot=mode==='sandbox'?row.snapshot:M.stringify(e.data),receipt=M.stringify({result:result??null});
   const batch=await db.batch([db.prepare('UPDATE casino_state SET snapshot=?,revision=revision+1,last_op=? WHERE id=? AND revision=?').bind(nextSnapshot,id,'club',row.revision),
    ...platformWrites(db,before,p,id),db.prepare("INSERT INTO casino_operations (id,actor,payload,response,created_at) SELECT ?,?,?,?,? WHERE EXISTS (SELECT 1 FROM casino_state WHERE id='club' AND last_op=?)").bind(id,who(request),payload,receipt,now,id)]);
   if(batch[0].meta.changes)return json({...await snapshot(request,db,p,{snapshot:nextSnapshot,revision:row.revision+1},mode),result:result??null});
  }fail('账户更新正忙，请重试。',409);
 }
 async function read(request,db){const {p,row}=await initialize(request,db),url=new URL(request.url),mode=url.searchParams.get('mode')||'formal';
  if(url.pathname==='/api/state'||url.pathname==='/api/me'){
   const data=M.parseJSON(row.snapshot),now=clock(),account=p.accounts[who(request)];
   const due=data.users.some(u=>u.debt>0&&(u.bankInterestAt===null||now-u.bankInterestAt>=600000||u.bankInterestPolicy!==2)||u.sharkDebt>0&&(u.sharkInterestAt===null||now-u.sharkInterestAt>=180000||u.sharkInterestPolicy!==2))
    ||data.loans.some(l=>l.status==='active'&&now-l.interestAt>=l.periodMs);
   if(mode==='formal'&&!p.meta.maintenance&&account?.status==='active'&&account.playerId&&due){const headers=new Headers(request.headers);headers.set('X-Club-Protocol','2');return command(new Request(request,{headers}),db,{id:crypto.randomUUID(),command:'system.sync',args:[],playerId:account.playerId});}
   return json(await snapshot(request,db,p,row,mode));
  }
  if(url.pathname.startsWith('/api/admin/')){
   const account=authorize(p,who(request),null,true,await stepUp(request,db));
   if(url.pathname==='/api/admin/overview')return json({accounts:Object.values(p.accounts),players:M.parseJSON(row.snapshot).users,definitions:Object.values(p.definitions),items:Object.values(p.items),clubs:Object.values(p.clubs),maintenance:p.meta.maintenance,events:await rows(db,'v2_events','',[],100),journal:await rows(db,'v2_journal','',[],100),health:{version:2,revision:row.revision,ready:p.meta.ready}});
   if(url.pathname==='/api/admin/backup'){
    if(account.role!=='owner'||!p.meta.maintenance)fail('请由所有者先开启只读维护，再导出备份。',409);
    const tables=['casino_state','casino_operations','admin_credential','v2_meta',...Object.values((await import('./repository.mjs')).collections).map(([table])=>table),'v2_events','v2_journal','v2_backups'];const records={};
    for(const table of tables)records[table]=(await db.prepare(`SELECT * FROM ${table}`).all()).results;
    return json({format:2,createdAt:clock(),records});
   }
  }
  if(extensions.read){const value=await extensions.read(request,db,p,row,await stepUp(request,db),clock());if(value!==undefined)return json(value);}
  fail('接口不存在。',404);
 }
 return {async fetch(request,env){try{
  const actor=who(request),url=new URL(request.url);if(!env.DB)fail('数据库未连接。',503);
  if(url.pathname.startsWith('/api/admin/register/')||url.pathname.startsWith('/api/admin/authenticate/')||['/api/admin/status','/api/admin/logout'].includes(url.pathname)){
   const {p}=await initialize(request,env.DB),a=p.accounts[actor];if(!['owner','admin'].includes(a?.role)||a.status!=='active')fail('没有管理员权限。',403);
   return legacyFactory({credentialKey:a.role==='owner'?'owner':'admin:'+actor}).fetch(request,env);
  }
  if(request.method==='POST'){
   if(request.headers.get('origin')!==origin||!request.headers.get('content-type')?.startsWith('application/json'))fail('请求来源无效。',403);
   const text=await request.text();if(text.length>1000000)fail('请求过大。',413);let body;try{body=M.parseJSON(text);}catch{fail('请求内容无效。');}
   if(url.pathname==='/api/command')return await command(request,env.DB,body);fail('接口不存在。',404);
  }
  if(request.method!=='GET')fail('请求方式不支持。',405);
  if(url.pathname.startsWith('/api/'))return await read(request,env.DB);
  if(!['/','/player','/admin','/index.html'].includes(url.pathname))return new Response('Not found',{status:404});
  const {p,row}=await initialize(request,env.DB),boot=await snapshot(request,env.DB,p,row),encoded=M.stringify(boot).replaceAll('<','\\u003c');
  return new Response(page.replace('/* SERVER_BOOTSTRAP */',`window.__CASINO_BOOTSTRAP__=${encoded};`),{headers:{'Content-Type':'text/html;charset=utf-8','Cache-Control':'private, no-store','X-Frame-Options':'SAMEORIGIN','X-Content-Type-Options':'nosniff','Permissions-Policy':'publickey-credentials-create=(self), publickey-credentials-get=(self)'}});
 }catch(error){return json({error:error.status?error.message:'操作未完成，请刷新重试。'},error.status||500);}}};
}
