import '../../src/money.js';
const M=globalThis.CasinoMoney;
// Metadata is JSON; identity/foreign-key/query columns are constrained independently.
export const collections={
 profiles:['v2_profiles',{}],items:['v2_items',{}],accounts:['v2_accounts',{player_id:'playerId',role:'role',status:'status'}],
 progress:['v2_progress',{xp:'xp',games:'games'}],definitions:['v2_definitions',{kind:'kind',version:'version'}],versions:['v2_definition_versions',{}],
 inventory:['v2_inventory',{player_id:'playerId',item_id:'itemId'}],claims:['v2_claims',{player_id:'playerId',kind:'kind',created_at:'createdAt'}],
 clubs:['v2_clubs',{owner_id:'ownerId'}],memberships:['v2_memberships',{club_id:'clubId'}],invitations:['v2_invitations',{club_id:'clubId',target_id:'targetId'}],
 contributions:['v2_contributions',{club_id:'clubId',player_id:'playerId'}],stats:['v2_period_stats',{player_id:'playerId',period:'period',xp:'xp',games:'games'}],
 wallets:['v2_wallet_index',{visible:'visible',sign:'sign',magnitude:'magnitude',digits:'digits'}],sandbox:['v2_sandbox',{}]
};
export async function loadPlatform(db,{actor,week}={}){
 const accountRows=(await db.prepare('SELECT id,body FROM v2_accounts').all()).results,accounts=Object.fromEntries(accountRows.map(row=>[row.id,M.parseJSON(row.body)])),playerId=accounts[actor]?.playerId||'';
 const rows=await Promise.all(Object.entries(collections).map(async([key,[table]])=>{
  if(key==='accounts')return [key,accountRows];
  if(key==='claims'&&actor)return [key,(await db.prepare("SELECT id,body FROM v2_claims WHERE player_id=? AND kind!='round'").bind(playerId).all()).results];
  if(key==='contributions'&&week)return [key,(await db.prepare("SELECT id,body FROM v2_contributions WHERE json_extract(body,'$.week')=?").bind(week).all()).results];
  return [key,(await db.prepare(`SELECT id,body FROM ${table}`).all()).results];
 }));
 const meta=await db.prepare('SELECT body FROM v2_meta WHERE id=?').bind('platform').first();
 return {meta:meta?M.parseJSON(meta.body):null,...Object.fromEntries(rows.map(([key,values])=>[key,Object.fromEntries(values.map(row=>[row.id,M.parseJSON(row.body)]))])),events:[],journal:[],backups:[]};
}
function guardedUpsert(db,table,id,body,columns,operation){
 const immutable=['v2_events','v2_journal','v2_claims','v2_backups','v2_definition_versions'].includes(table);
 const names=['id',...Object.keys(columns),'body'],values=[id,...Object.values(columns).map(key=>body[key]??null),M.stringify(body)];
 return db.prepare(`INSERT INTO ${table} (${names.join(',')}) SELECT ${names.map(()=>'?').join(',')} WHERE EXISTS (SELECT 1 FROM casino_state WHERE id='club' AND last_op=?) ON CONFLICT(id) ${immutable?'DO NOTHING':'DO UPDATE SET '+names.slice(1).map(name=>`${name}=excluded.${name}`).join(',')}`)
  .bind(...values,operation);
}
export function platformWrites(db,before,after,operation){
 const writes=[];
 if(M.stringify(before.meta)!==M.stringify(after.meta))writes.push(guardedUpsert(db,'v2_meta','platform',after.meta,{},operation));
 for(const [key,[table,columns]] of Object.entries(collections)){
  for(const [id,body] of Object.entries(after[key]))if(M.stringify(before[key][id])!==M.stringify(body))writes.push(guardedUpsert(db,table,id,body,columns,operation));
  for(const id of Object.keys(before[key]))if(!Object.hasOwn(after[key],id))writes.push(db.prepare(`DELETE FROM ${table} WHERE id=? AND EXISTS (SELECT 1 FROM casino_state WHERE id='club' AND last_op=?)`).bind(id,operation));
 }
 for(const event of after.events)writes.push(guardedUpsert(db,'v2_events',event.id,event,{player_id:'playerId',kind:'kind',created_at:'createdAt'},operation));
 for(const entry of after.journal)writes.push(guardedUpsert(db,'v2_journal',entry.id,entry,{player_id:'playerId',operation_id:'operationId',actor:'actor',kind:'kind',before:'before',after:'after',created_at:'createdAt'},operation));
 for(const backup of after.backups)writes.push(guardedUpsert(db,'v2_backups',backup.id,backup,{created_at:'createdAt'},operation));
 return writes;
}
export function emptyPlatform(){return {meta:null,...Object.fromEntries(Object.keys(collections).map(key=>[key,{}])),events:[],journal:[],backups:[]};}
export async function rows(db,table,where='',values=[],limit=100,offset=0){
 const allowed=['v2_events','v2_journal','v2_backups'];if(!allowed.includes(table))throw Error('Unsupported record query');
 return (await db.prepare(`SELECT body FROM ${table} ${where} ORDER BY created_at DESC,id LIMIT ? OFFSET ?`).bind(...values,limit,offset).all()).results.map(row=>M.parseJSON(row.body));
}
