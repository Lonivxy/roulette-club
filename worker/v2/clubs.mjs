import {fail} from './identity.mjs';
import {periods,grant,refreshAchievements} from './progression.mjs';
const clean=(text,max,min=0)=>{if(typeof text!=='string'||text.trim().length<min||text.trim().length>max)fail('俱乐部文字长度无效。');return text.trim();};
function own(p,id){const club=p.clubs[p.memberships[id]?.clubId];if(!club||club.ownerId!==id||club.archived)fail('只有俱乐部所有者可以操作。',403);return club;}
function activity(p,clubId,id,kind,now,detail={}){p.events.push({id:crypto.randomUUID(),playerId:id,clubId,kind,createdAt:now,...detail});}
export function clubAction(p,engine,account,command,args,now){
 const id=account.playerId;if(!command.startsWith('club.')&&command!=='admin.club')return undefined;
 if(command==='club.create'){
  if(p.memberships[id])fail('每名玩家同时只能加入一个俱乐部。');const value=args[0]||{},club={id:crypto.randomUUID(),name:clean(value.name,32,1),description:clean(value.description||'',200),icon:clean(value.icon||'initial',20),ownerId:id,createdAt:now,archived:false};
  p.clubs[club.id]=club;p.memberships[id]={id,clubId:club.id,joinedAt:now};p.progress[id].clubsJoined++;refreshAchievements(p,id,now);activity(p,club.id,id,'club.created',now);return club;
 }
 if(command==='club.invite'){
  const club=own(p,id),target=args[0];if(!engine.data.users.some(u=>u.id===target)||p.profiles[target]?.archived||p.memberships[target]||target===id)fail('该玩家不能接受邀请。');
  if(Object.values(p.invitations).some(i=>i.clubId===club.id&&i.targetId===target&&i.status==='pending'&&i.expiresAt>now))fail('已经存在有效邀请。');
  const invitation={id:crypto.randomUUID(),clubId:club.id,targetId:target,inviterId:id,createdAt:now,expiresAt:now+7*86400000,status:'pending'};p.invitations[invitation.id]=invitation;activity(p,club.id,id,'club.invited',now,{target});return invitation;
 }
 if(command==='club.respond'){
  const invitation=p.invitations[args[0]];if(!invitation||invitation.targetId!==id||invitation.status!=='pending'||invitation.expiresAt<=now||p.clubs[invitation.clubId]?.archived)fail('邀请已过期、撤销或不属于你。',403);
  if(typeof args[1]!=='boolean')fail('请选择接受或拒绝。');if(args[1]&&p.memberships[id])fail('请先退出当前俱乐部。');
  invitation.status=args[1]?'accepted':'declined';if(args[1]){p.memberships[id]={id,clubId:invitation.clubId,joinedAt:now};p.progress[id].clubsJoined++;refreshAchievements(p,id,now);}
  activity(p,invitation.clubId,id,'club.'+invitation.status,now);return invitation;
 }
 if(command==='club.revoke'){
  const club=own(p,id),invitation=p.invitations[args[0]];if(!invitation||invitation.clubId!==club.id||invitation.status!=='pending')fail('邀请无效。');invitation.status='revoked';return invitation;
 }
 if(command==='club.leave'){
  const member=p.memberships[id],club=p.clubs[member?.clubId];if(!club)fail('尚未加入俱乐部。');if(club.ownerId===id)fail('请先转移所有权，或归档空俱乐部。');delete p.memberships[id];activity(p,club.id,id,'club.left',now);return {left:true};
 }
 if(command==='club.transfer'){
  const club=own(p,id),target=args[0];if(!target||target===id||p.memberships[target]?.clubId!==club.id)fail('请选择当前俱乐部的其他成员。');club.ownerId=target;activity(p,club.id,id,'club.transferred',now,{target});return club;
 }
 if(command==='club.remove'){
  const club=own(p,id),target=args[0];if(target===id||p.memberships[target]?.clubId!==club.id)fail('请选择其他成员。');delete p.memberships[target];activity(p,club.id,id,'club.removed',now,{target});return {removed:target};
 }
 if(command==='club.update'){const club=own(p,id),value=args[0]||{};club.name=clean(value.name,32,1);club.description=clean(value.description||'',200);club.icon=clean(value.icon||'initial',20);return club;}
 if(command==='club.archive'||command==='admin.club'){
  const club=command==='admin.club'?p.clubs[args[0]]:own(p,id);if(!club)fail('俱乐部不存在。');
  if(command==='admin.club'){if(typeof args[1]!=='string'||args[1].trim().length<3)fail('请填写处理原因。');}
  else if(Object.values(p.memberships).some(m=>m.clubId===club.id&&m.id!==id))fail('归档前请先移除其他成员。');
  club.archived=true;for(const [key,m] of Object.entries(p.memberships))if(m.clubId===club.id)delete p.memberships[key];for(const invite of Object.values(p.invitations))if(invite.clubId===club.id&&invite.status==='pending')invite.status='revoked';activity(p,club.id,id,'club.archived',now);return club;
 }
 if(command==='club.claim'){
  const clubId=p.memberships[id]?.clubId,week=periods(now).week,contributions=Object.values(p.contributions).filter(c=>c.clubId===clubId&&c.week===week);
  if(!clubId||contributions.length<50||!contributions.some(c=>c.playerId===id))fail('本周团队挑战尚未完成，或你没有参与。');
  return grant(p,id,'club:'+clubId+':'+week,'club',100,[],now);
 }
 fail('俱乐部操作无效。',404);
}
export function clubView(p,id,now){
 const clubId=p.memberships[id]?.clubId,club=p.clubs[clubId],week=periods(now).week;
 const incoming=Object.values(p.invitations).filter(i=>i.targetId===id&&i.status==='pending'&&i.expiresAt>now&&!p.clubs[i.clubId]?.archived).map(i=>({...i,clubName:p.clubs[i.clubId].name}));
 if(!club)return {club:null,incoming};
 const members=Object.values(p.memberships).filter(m=>m.clubId===clubId),contributions=Object.values(p.contributions).filter(c=>c.clubId===clubId&&c.week===week);
 return {club,members,incoming,outgoing:club.ownerId===id?Object.values(p.invitations).filter(i=>i.clubId===clubId&&i.status==='pending'&&i.expiresAt>now):[],
  challenge:{week,target:50,progress:contributions.length,participated:contributions.some(c=>c.playerId===id),claimed:Boolean(p.claims[id+':club:'+clubId+':'+week])},
  leaderboard:members.map(m=>({playerId:m.id,rounds:contributions.filter(c=>c.playerId===m.id).length})).sort((a,b)=>b.rounds-a.rounds||a.playerId.localeCompare(b.playerId))};
}
