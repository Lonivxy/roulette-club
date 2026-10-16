import {authorize,publicPlayer,fail} from './identity.mjs';
import {periods} from './progression.mjs';
import {clubView} from './clubs.mjs';
import {rows} from './repository.mjs';
const M=globalThis.CasinoMoney;
const pageOf=url=>Math.max(1,Math.min(1000000,Math.floor(Number(url.searchParams.get('page')))||1));
export async function platformRead(request,db,p,row,stepUp,now=Date.now()){
 const url=new URL(request.url),account=authorize(p,request.headers.get('oai-authenticated-user-id'),null),id=account.playerId,data=M.parseJSON(row.snapshot),page=pageOf(url),limit=20;
 const publicUsers=data.users.filter(u=>!p.profiles[u.id]?.archived&&Object.values(p.accounts).some(a=>a.playerId===u.id&&a.status==='active'));
 if(url.pathname==='/api/players'){
  const query=(url.searchParams.get('query')||'').slice(0,100).normalize('NFKC').toLocaleLowerCase(),users=publicUsers.filter(u=>u.name.normalize('NFKC').toLocaleLowerCase().includes(query));
  return {rows:users.slice((page-1)*limit,page*limit).map(u=>publicPlayer(u,p)),page,total:users.length,pages:Math.max(1,Math.ceil(users.length/limit))};
 }
 if(url.pathname.startsWith('/api/players/')){const user=publicUsers.find(u=>u.id===decodeURIComponent(url.pathname.slice(13)));if(!user)fail('玩家不存在。',404);return publicPlayer(user,p);}
 if(url.pathname==='/api/transactions')return {rows:await rows(db,'v2_journal','WHERE player_id=?',[id],limit,(page-1)*limit),page};
 if(url.pathname==='/api/clubs'){
  const result=clubView(p,id,now);if(result.club)result.feed=await rows(db,'v2_events',"WHERE json_extract(body,'$.clubId')=?",[result.club.id],30);return result;
 }
 if(url.pathname.startsWith('/api/clubs/')){
  const clubId=decodeURIComponent(url.pathname.slice(11));if(p.memberships[id]?.clubId!==clubId)fail('不是该俱乐部成员。',403);
  const value=clubView(p,id,now);value.feed=await rows(db,'v2_events',"WHERE json_extract(body,'$.clubId')=?",[clubId],30);return value;
 }
 if(url.pathname==='/api/leaderboards'){
  const metric=url.searchParams.get('metric')||'xp',period=url.searchParams.get('period')||'all';
  if(!['wallet','xp','games','achievements','activity'].includes(metric)||!['all','week','month'].includes(period))fail('排行榜类型无效。');
  let source,ordering,score,values=[];
  const active="JOIN v2_accounts a ON a.player_id=w.id AND a.status='active' JOIN v2_profiles profile ON profile.id=w.id WHERE json_extract(profile.body,'$.archived')=0";
  if(metric==='wallet'){
   source=`SELECT w.id,w.sign,w.magnitude,w.digits,json_extract(w.body,'$.name') AS name,w.body FROM v2_wallet_index w ${active} AND w.visible=1`;
   ordering='sign DESC,CASE WHEN sign>=0 THEN magnitude END DESC,CASE WHEN sign>=0 THEN digits END DESC,CASE WHEN sign<0 THEN magnitude END ASC,CASE WHEN sign<0 THEN digits END ASC';score='NULL';
  }else{
   const selectedMetric=metric==='activity'?'games':metric;
   if(period!=='all'&&metric!=='achievements'){
    const key=period+':'+periods(now)[period];source=`SELECT w.id,json_extract(w.body,'$.name') AS name,COALESCE(s.${selectedMetric},0) AS score FROM v2_wallet_index w JOIN v2_accounts a ON a.player_id=w.id AND a.status='active' JOIN v2_profiles profile ON profile.id=w.id LEFT JOIN v2_period_stats s ON s.player_id=w.id AND s.period=? WHERE json_extract(profile.body,'$.archived')=0`;values=[key];
   }else{score=metric==='achievements'?"(SELECT COUNT(*) FROM json_each(json_extract(prog.body,'$.achievements')))":'prog.'+selectedMetric;
    source=`SELECT w.id,json_extract(w.body,'$.name') AS name,${score} AS score FROM v2_wallet_index w JOIN v2_progress prog ON prog.id=w.id ${active}`;}
   ordering='score DESC';
  }
  const query=(url.searchParams.get('query')||'').slice(0,100),escaped='%'+query.replaceAll('\\','\\\\').replaceAll('%','\\%').replaceAll('_','\\_')+'%';
  const cte=`WITH candidates AS (${source}),ranked AS (SELECT *,RANK() OVER (ORDER BY ${ordering}) AS place FROM candidates)`;
  const found=(await db.prepare(cte+" SELECT * FROM ranked WHERE name LIKE ? ESCAPE '\\' ORDER BY place,id LIMIT ? OFFSET ?").bind(...values,escaped,limit,(page-1)*limit).all()).results;
  const count=await db.prepare(cte+" SELECT COUNT(*) AS count FROM ranked WHERE name LIKE ? ESCAPE '\\'").bind(...values,escaped).first();
  return {rows:found.map(r=>({...publicPlayer(data.users.find(u=>u.id===r.id),p),rank:r.place,score:metric==='wallet'?M.parse((r.sign<0?'-':'')+r.digits):r.score})),page,total:count.count,pages:Math.max(1,Math.ceil(count.count/limit)),metric,period:metric==='wallet'||metric==='achievements'?'all':period};
 }
 if(url.pathname==='/api/admin/analytics'){
  authorize(p,account.actor,null,true,stepUp);
  const since=Date.now()-30*86400000,counts=(await db.prepare('SELECT kind,COUNT(*) AS count FROM v2_events WHERE created_at>=? GROUP BY kind').bind(since).all()).results;
  const active=await db.prepare('SELECT COUNT(DISTINCT player_id) AS count FROM v2_events WHERE created_at>=? AND player_id IS NOT NULL').bind(Date.now()-86400000).first();
  const claims=(await db.prepare("SELECT kind,COUNT(*) AS count FROM v2_claims WHERE kind!='round' AND created_at>=? GROUP BY kind").bind(since).all()).results;
  const cash=(await db.prepare("SELECT body FROM v2_journal WHERE kind NOT IN ('opening','gift','respondLoan','repayLoan') AND created_at>=?").bind(since).all()).results.map(r=>M.parseJSON(r.body)).filter(r=>r.asset==='cash');
  let increases=0,decreases=0;for(const entry of cash){const delta=M.parse(entry.delta);if(delta>0)increases=M.add(increases,delta);else decreases=M.sub(decreases,delta);}
  return {window:'30 days',activePlayers24h:active.count,events:counts,claims,cashIncreases:increases,cashDecreases:decreases,accounting:'净筹码增减口径；排除期初和玩家互转。'};
 }
 return undefined;
}
