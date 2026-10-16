const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {DatabaseSync}=require('node:sqlite');
async function fixture(options={}){
 const sql=new DatabaseSync(':memory:');for(const file of fs.readdirSync(path.join(__dirname,'../drizzle')).filter(f=>f.endsWith('.sql')).sort())sql.exec(fs.readFileSync(path.join(__dirname,'../drizzle',file),'utf8'));
 const DB={prepare(query){let values=[];const s={bind(...v){values=v;return s;},execute(){const r=sql.prepare(query).run(...values);return {meta:{changes:Number(r.changes)}};},async run(){return s.execute();},async first(){return sql.prepare(query).get(...values)||null;},async all(){return {results:sql.prepare(query).all(...values)};}};return s;},async batch(statements){sql.exec('BEGIN');try{const r=statements.map(s=>s.execute());sql.exec('COMMIT');return r;}catch(e){sql.exec('ROLLBACK');throw e;}}};
 const {createService,ORIGIN}=await import('../worker/service.mjs'),service=createService({v2:true,bootstrapOwnerPrivate:true,...options});
 async function request(route,{actor='owner',body,step=false,protocol=2}={}){
  const headers={'oai-authenticated-user-id':actor,'oai-authenticated-user-email':actor+'@example.test','X-Club-Protocol':String(protocol)};
  if(body){headers.Origin=ORIGIN;headers['Content-Type']='application/json';}if(step)headers.Cookie='__Host-club-admin=test-session';
  return service.fetch(new Request(ORIGIN+route,{headers,method:body?'POST':'GET',body:body?globalThis.CasinoMoney.stringify(body):undefined}),{DB});
 }
 async function command(command,args=[],options={}){return request('/api/command',{body:{id:crypto.randomUUID(),command,args,playerId:options.playerId},...options});}
 async function owner(){await request('/api/state');const {createHash}=require('node:crypto');sql.prepare('INSERT INTO admin_sessions VALUES (?,?,?)').run(createHash('sha256').update('test-session').digest('base64url'),'owner',(options.clock?options.clock():Date.now())+600000);const bound=await command('admin.bind',['owner','alex'],{step:true});assert.equal(bound.status,200);}
 return {sql,DB,request,command,owner};
}
test('V2 HTTP binds accounts and never leaks another player private state',async()=>{
 const t=await fixture();await t.owner();await t.request('/api/state',{actor:'friend'});assert.equal((await t.command('admin.bind',['friend','jamie'],{step:true})).status,200);
 const response=await t.request('/api/state',{actor:'friend'});assert.equal(response.status,200);const value=await response.json();
 assert.equal(value.data.users.length,1);assert.equal(value.data.users[0].id,'jamie');assert.equal(value.directory[0].debt,undefined);
 assert.equal((await t.command('slots',[1],{actor:'friend',playerId:'alex'})).status,403);
 assert.equal((await t.command('slots',[1,null],{actor:'friend',protocol:1})).status,409);
});
test('definition configuration rejects reserved keys and prevents reopening a claimed task under another period',async()=>{
 const t=await fixture();await t.owner();const state=await (await t.request('/api/state')).json(),d=state.platform.definitions.find(d=>d.id==='daily-rounds');
 assert.equal((await t.command('admin.definition',[{...d,id:'__proto__'}],{step:true})).status,400);
 assert.equal((await t.command('admin.definition',[{...d,period:'all'}],{step:true})).status,400);
 assert.equal((await t.command('admin.definition',[{...d,id:'bad-event',period:'event',condition:'profile',startsAt:Date.now(),endsAt:Date.now()+10000}],{step:true})).status,400);
});
module.exports={fixture};
test('V2 atomic rewards replay once and simultaneous new claims grant only once',async()=>{
 const t=await fixture();await t.owner();const body={id:crypto.randomUUID(),command:'reward.claim',args:[],playerId:'alex'};
 const first=await t.request('/api/command',{body});assert.equal(first.status,200);const a=await first.json();assert.equal(a.platform.progress.xp,20);assert.equal(a.data.users[0].balance,1000);
 const replay=await (await t.request('/api/command',{body})).json();assert.equal(replay.platform.progress.xp,20);assert.equal(replay.revision,a.revision);
 assert.equal((await t.command('reward.claim')).status,409);
 const friend=await t.request('/api/state',{actor:'friend'});assert.equal(friend.status,200);await t.command('admin.bind',['friend','jamie'],{step:true});
 const responses=await Promise.all([t.command('reward.claim',[],{actor:'friend'}),t.command('reward.claim',[],{actor:'friend'})]);assert.deepEqual(responses.map(r=>r.status).sort(),[200,409]);
 const final=await (await t.request('/api/state',{actor:'friend'})).json();assert.equal(final.platform.progress.xp,20);
});
test('V2 sandbox wins cannot alter formal wallet or progression and require step-up',async()=>{
 const t=await fixture();await t.owner();assert.equal((await t.command('slots',[100,{jackpot:true}])).status,403);
 assert.equal((await t.command('slots',[100,{jackpot:true}],{body:{id:crypto.randomUUID(),command:'slots',args:[100,{jackpot:true}],mode:'sandbox'}})).status,403);
 const response=await t.command('slots',[100,{jackpot:true}],{step:true,body:{id:crypto.randomUUID(),command:'slots',args:[100,{jackpot:true}],mode:'sandbox'}});assert.equal(response.status,200);
 const value=await response.json();assert.equal(value.result.payout,5000);assert.equal(value.platform.mode,'sandbox');
 const formal=await (await t.request('/api/state')).json();assert.equal(formal.data.users[0].balance,1000);assert.equal(formal.platform.progress.xp,0);assert.equal(formal.platform.progress.games,0);
});
test('V2 permanent journal and exact balances survive transfers, retries, suspension and privacy changes',async()=>{
 const t=await fixture();await t.owner();await t.request('/api/state',{actor:'friend'});await t.command('admin.bind',['friend','jamie'],{step:true});
 assert.equal((await t.command('adminAdjust',['alex','add','10000000000000000000000','test funding'],{step:true})).status,200);
 const body={id:crypto.randomUUID(),command:'gift',args:['jamie','10000000000000000000000'],playerId:'alex'};
 assert.equal((await t.request('/api/command',{body})).status,200);assert.equal((await t.request('/api/command',{body})).status,200);
 let value=globalThis.CasinoMoney.hydrate(await (await t.request('/api/state',{actor:'friend'})).json());assert.equal(value.data.users[0].balance,10000000000000000001000n);
 const ledger=await (await t.request('/api/transactions',{actor:'friend'})).json();assert.equal(ledger.rows.filter(r=>r.operationId===body.id).length,1);
 await t.command('profile.settings',[{walletVisible:false}],{actor:'friend'});const directory=await (await t.request('/api/players')).json();assert.equal(directory.rows.find(r=>r.id==='jamie').balance,undefined);
 const rank=await t.request('/api/leaderboards?metric=wallet');assert.equal(rank.status,200);assert.ok(!(await rank.json()).rows.some(r=>r.id==='jamie'));
 await t.command('admin.account',['friend','member','suspended','permission revoked'],{step:true});assert.equal((await t.request('/api/state',{actor:'friend'})).status,403);
});
test('V2 preserves a large old snapshot during bounded initialization and records opening funds without inventing XP',async()=>{
 const t=await fixture(),M=globalThis.CasinoMoney,e=new globalThis.CasinoEngine(null);for(let i=3;i<36;i++)e.addUser('Old Player '+i);
 e.data.users[0].balance=10n**80n;e.data.users[0].cards=[{id:'old-card',type:'seven',stake:1000}];e.data.users[0].history=[{num:0,colorTag:'GREEN'}];
 const saved=M.stringify(e.data);t.sql.prepare('INSERT INTO casino_state VALUES (?,?,?,?)').run('club',saved,50,'old');
 let response;for(let i=0;i<10;i++){response=await t.request('/api/state');if(response.status===200)break;assert.equal(response.status,503);}
 assert.equal(response.status,200);assert.equal(t.sql.prepare('SELECT snapshot FROM casino_state').get().snapshot,saved);
 const progress=t.sql.prepare('SELECT xp,games FROM v2_progress WHERE id=?').get('alex');assert.equal(progress.xp,0);assert.equal(progress.games,0);
 assert.equal(t.sql.prepare("SELECT COUNT(*) AS count FROM v2_journal WHERE kind='opening'").get().count,144);
});
test('V2 blackjack locks only its owner, while maintenance freezes interest and backup exports exact data',async()=>{
 const t=await fixture();await t.owner();await t.request('/api/state',{actor:'friend'});await t.command('admin.bind',['friend','jamie'],{step:true});
 require('../src/blackjack-core.js');const e=new globalThis.CasinoEngine(null,()=>.5);e.switchUser('jamie');
 const shoe=globalThis.CasinoBlackjack.makeShoe(()=>.5),sequence=[10,10,7,9].map(rank=>shoe.splice(shoe.findIndex(c=>c.rank===rank),1)[0]);
 new globalThis.CasinoBlackjack(e,{shoeFactory:()=>[...shoe,...sequence.toReversed()]}).start(1);
 const raw=t.sql.prepare('SELECT snapshot FROM casino_state').get(),data=globalThis.CasinoMoney.parseJSON(raw.snapshot);data.users[1].blackjack=e.active.blackjack;data.users[1].balance=999;t.sql.prepare('UPDATE casino_state SET snapshot=?').run(globalThis.CasinoMoney.stringify(data));
 assert.equal((await t.command('dice',[10,'small',null])).status,200);assert.equal((await t.command('dice',[10,'small',null],{actor:'friend'})).status,400);
 assert.equal((await t.command('admin.maintenance',[true,'upgrade verification'],{step:true})).status,200);
 const before=t.sql.prepare('SELECT snapshot FROM casino_state').get().snapshot;
 assert.equal((await t.command('dice',[10,'small',null])).status,503);await t.request('/api/state');assert.equal(t.sql.prepare('SELECT snapshot FROM casino_state').get().snapshot,before);
 const backup=await t.request('/api/admin/backup',{step:true});assert.equal(backup.status,200);const value=await backup.json();assert.equal(value.records.casino_state[0].snapshot,before);assert.ok(value.records.v2_journal.length>0);
 assert.equal((await t.request('/api/admin/backup')).status,403);
});
test('admin corrections append compensating records rather than editing history',async()=>{
 const t=await fixture();await t.owner();await t.command('adminAdjust',['alex','add',100,'initial correction test'],{step:true});
 const ledger=await (await t.request('/api/transactions')).json(),entry=ledger.rows.find(r=>r.kind==='adminAdjust'&&r.asset==='cash');assert.ok(entry);
 assert.equal((await t.command('admin.compensate',[entry.id,'reverse mistaken credit'],{step:true})).status,200);
 assert.equal((await t.command('admin.compensate',[entry.id,'repeat reverse'],{step:true})).status,409);
 const state=await (await t.request('/api/state')).json();assert.equal(state.data.users[0].balance,1000);
 const after=await (await t.request('/api/transactions')).json();assert.equal(after.rows.find(r=>r.id===entry.id).after,'1100');assert.ok(after.rows.some(r=>r.kind==='admin.compensate'));
});
test('V2 profile edits and completed games grant cosmetic achievements without changing another player',async()=>{
 const t=await fixture();await t.owner();await t.request('/api/state',{actor:'friend'});await t.command('admin.bind',['friend','jamie'],{step:true});
 const edited=await t.command('profile.update',[{name:'Owner New',bio:'Hello <friends>',avatar:'moon'}]);assert.equal(edited.status,200);
 assert.equal((await t.command('profile.update',[{name:'Intruder'}],{actor:'friend',playerId:'alex'})).status,403);
 assert.equal((await t.command('inventory.equip',['title','title-newcomer'])).status,403);
 assert.equal((await t.command('roulette.bet',['RED',1])).status,200);let state=await (await t.request('/api/state')).json();assert.equal(state.platform.progress.xp,0);
 assert.equal((await t.command('dice',[1,'small',null])).status,200);state=await (await t.request('/api/state')).json();
 assert.equal(state.platform.progress.games,1);assert.equal(state.platform.progress.xp,5);assert.ok(state.platform.inventory.some(i=>i.itemId==='title-newcomer'));
 assert.equal((await t.command('inventory.equip',['title','title-newcomer'])).status,200);
 const profile=await (await t.request('/api/players/alex',{actor:'friend'})).json();assert.equal(profile.name,'Owner New');assert.equal(profile.bio,'Hello <friends>');assert.equal(profile.equipped.title,'title-newcomer');assert.equal(profile.debt,undefined);assert.equal(profile.inventory,undefined);
 assert.equal((await t.command('inventory.equip',['badges',['badge-week','badge-week']])).status,400);
 const friend=await (await t.request('/api/state',{actor:'friend'})).json();assert.equal(friend.platform.progress.games,0);
});
test('quest claims race atomically, expire at Shanghai midnight and roll back every effect on database failure',async()=>{
 let now=Date.parse('2026-10-16T15:59:00Z');const t=await fixture({clock:()=>now});await t.owner();
 for(let i=0;i<3;i++)assert.equal((await t.command('dice',[1,'small',null])).status,200);
 const race=await Promise.all([t.command('quest.claim',['daily-rounds']),t.command('quest.claim',['daily-rounds'])]);assert.deepEqual(race.map(r=>r.status).sort(),[200,409]);
 let state=await (await t.request('/api/state')).json();assert.equal(state.platform.progress.xp,55);assert.equal(state.platform.progress.questsCompleted,1);
 now=Date.parse('2026-10-16T16:00:00Z');assert.equal((await t.command('quest.claim',['daily-rounds'])).status,400);
 const before=await (await t.request('/api/state')).json(),batch=t.DB.batch;
 t.DB.batch=statements=>batch([...statements,t.DB.prepare('INSERT INTO nonexistent_v2_table VALUES (1)')]);
 assert.equal((await t.command('reward.claim')).status,500);t.DB.batch=batch;
 state=await (await t.request('/api/state')).json();assert.equal(state.revision,before.revision);assert.equal(state.platform.progress.xp,55);assert.equal(state.platform.progress.lastDaily,null);
 assert.equal((await t.command('reward.claim')).status,200);
});
test('collection ownership, disabled items and all equipment slots enforce exactly three distinct featured badges',async()=>{
 const t=await fixture();await t.owner();await t.request('/api/state',{actor:'friend'});await t.command('admin.bind',['friend','jamie'],{step:true});
 const badges=['badge-a','badge-b','badge-c','badge-d'];for(const id of badges){
  assert.equal((await t.command('admin.item',[{id,name:id,description:'A collectible',kind:'badge',rarity:'rare',enabled:true}],{step:true})).status,200);
  assert.equal((await t.command('admin.definition',[{id:'award-'+id,name:id,kind:'achievement',period:'all',condition:'games',target:1,itemIds:[id],enabled:true}],{step:true})).status,200);
 }
 await t.command('dice',[1,'small',null]);assert.equal((await t.command('inventory.equip',['badges',badges.slice(0,3)])).status,200);
 assert.equal((await t.command('inventory.equip',['badges',badges])).status,400);assert.equal((await t.command('inventory.equip',['badges',[badges[0],badges[0]]])).status,400);
 assert.equal((await t.command('inventory.equip',['badges',[badges[0]]],{actor:'friend'})).status,403);assert.equal((await t.command('inventory.equip',['frame',badges[0]])).status,403);
 assert.equal((await t.command('inventory.equip',['frame','frame-starter'])).status,200);assert.equal((await t.command('inventory.equip',['frame',null])).status,200);
 await t.command('admin.item',[{id:badges[0],name:'Paused',description:'retained',kind:'badge',rarity:'rare',enabled:false}],{step:true});
 assert.equal((await t.command('inventory.equip',['badges',[badges[0]]])).status,403);const state=await (await t.request('/api/state')).json();assert.ok(state.platform.inventory.some(i=>i.itemId===badges[0]));
});
test('leaderboards sort arbitrarily large amounts exactly and retain competition ranks after search and privacy filtering',async()=>{
 const t=await fixture();await t.owner();for(const [actor,id]of [['friend','jamie'],['other','taylor']]){await t.request('/api/state',{actor});await t.command('admin.bind',[actor,id],{step:true});}
 for(const id of ['alex','jamie'])assert.equal((await t.command('adminAdjust',[id,'add','10000000000000000000000000000000001','ranking fixture'],{step:true})).status,200);
 let rank=await (await t.request('/api/leaderboards?metric=wallet')).json();assert.deepEqual(rank.rows.map(r=>[r.id,r.rank]),[['alex',1],['jamie',1],['taylor',3]]);
 rank=await (await t.request('/api/leaderboards?metric=wallet&query=Taylor')).json();assert.equal(rank.rows[0].rank,3);
 await t.command('profile.settings',[{walletVisible:false}],{actor:'friend'});rank=await (await t.request('/api/leaderboards?metric=wallet')).json();assert.deepEqual(rank.rows.map(r=>r.rank),[1,2]);
 assert.equal((await (await t.request('/api/leaderboards?page=1.5')).json()).page,1);
 assert.equal((await t.request('/api/transactions?playerId=jamie')).status,200);const privateRows=await (await t.request('/api/transactions?playerId=jamie')).json();assert.ok(privateRows.rows.every(r=>r.playerId==='alex'));
});
test('private clubs handle concurrent invite acceptance, revocation, expiry, transfer and leaving without leaking other clubs',async()=>{
 let now=Date.parse('2026-10-16T04:00:00Z');const t=await fixture({clock:()=>now});await t.owner();for(const [actor,id]of [['friend','jamie'],['other','taylor']]){await t.request('/api/state',{actor});await t.command('admin.bind',[actor,id],{step:true});}
 await t.command('club.create',[{name:'Owner Club'}]);const club=(await (await t.request('/api/clubs')).json()).club;
 await t.command('club.create',[{name:'Other Club'}],{actor:'other'});const other=(await (await t.request('/api/clubs',{actor:'other'})).json()).club;
 assert.equal((await t.request('/api/clubs/'+other.id)).status,403);
 const a=await (await t.command('club.invite',['jamie'])).json(),b=await (await t.command('club.invite',['jamie'],{actor:'other'})).json();
 const races=await Promise.all([t.command('club.respond',[a.result.id,true],{actor:'friend'}),t.command('club.respond',[b.result.id,true],{actor:'friend'})]);assert.equal(races.filter(r=>r.status===200).length,1);
 const joined=await (await t.request('/api/clubs',{actor:'friend'})).json();assert.ok([club.id,other.id].includes(joined.club.id));
 await t.command('club.leave',[],{actor:'friend'});const invite=await (await t.command('club.invite',['jamie'])).json();
 await t.command('club.revoke',[invite.result.id]);assert.equal((await t.command('club.respond',[invite.result.id,true],{actor:'friend'})).status,403);
 const fresh=await (await t.command('club.invite',['jamie'])).json();now+=7*86400000;assert.equal((await t.command('club.respond',[fresh.result.id,true],{actor:'friend'})).status,403);
 now-=7*86400000;await t.command('club.respond',[fresh.result.id,true],{actor:'friend'});assert.equal((await t.command('club.leave')).status,400);assert.equal((await t.command('club.transfer',['jamie'])).status,200);assert.equal((await t.command('club.leave')).status,200);
});
test('weekly club challenge counts formal activity only and prevents duplicate claims after leaving and rejoining',async()=>{
 const t=await fixture();await t.owner();await t.request('/api/state',{actor:'friend'});await t.command('admin.bind',['friend','jamie'],{step:true});
 await t.command('club.create',[{name:'Challenge'}]);let invite=await (await t.command('club.invite',['jamie'])).json();await t.command('club.respond',[invite.result.id,true],{actor:'friend'});
 assert.equal((await t.command('club.claim',[],{actor:'friend'})).status,400);
 for(let i=0;i<49;i++)assert.equal((await t.command('dice',[1,'small',null])).status,200);
 assert.equal((await t.command('dice',[1,'small',null],{actor:'friend'})).status,200);
 const club=await (await t.request('/api/clubs',{actor:'friend'})).json();assert.equal(club.challenge.progress,50);assert.ok(club.feed.length);
 const race=await Promise.all([t.command('club.claim',[],{actor:'friend'}),t.command('club.claim',[],{actor:'friend'})]);assert.deepEqual(race.map(r=>r.status).sort(),[200,409]);
 await t.command('club.leave',[],{actor:'friend'});invite=await (await t.command('club.invite',['jamie'])).json();await t.command('club.respond',[invite.result.id,true],{actor:'friend'});
 assert.equal((await t.command('club.claim',[],{actor:'friend'})).status,409);assert.equal((await (await t.request('/api/clubs')).json()).challenge.progress,50);
});
