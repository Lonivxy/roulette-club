import {emptyPlatform} from './repository.mjs';
import {fail} from './identity.mjs';
export function periods(now){
 const date=new Date(now+28800000),day=date.toISOString().slice(0,10),month=day.slice(0,7);
 const midnight=Date.parse(day+'T00:00:00Z'),monday=new Date(midnight-((date.getUTCDay()+6)%7)*86400000).toISOString().slice(0,10);
 return {day,week:monday,month,nextDay:midnight+86400000-28800000,nextWeek:Date.parse(monday+'T00:00:00Z')+7*86400000-28800000,nextMonth:Date.UTC(date.getUTCFullYear(),date.getUTCMonth()+1,1)-28800000};
}
export function initialPlatform(owner,now){
 const p=emptyPlatform();p.meta={ownerActor:owner,startedAt:now,maintenance:false,version:2};
 const items=[['frame-starter','frame','初见金边','common'],['badge-week','badge','七日纪念','rare'],['title-newcomer','title','Newcomer','common'],['title-explorer','title','Game Explorer','rare'],['badge-veteran','badge','百局旅人','epic'],['background-night','background','紫夜','rare'],['souvenir-club','souvenir','朋友俱乐部纪念','legendary']];
 for(const [id,kind,name,rarity] of items)p.items[id]={id,kind,name,rarity,description:name+' · 仅限站内装饰，无现金价值。',enabled:true};
 const definitions=[
 {id:'settings',kind:'settings',gameXP:5,dailyGameCap:100,levelFactor:100,dailyXP:[20,25,30,35,40,50,75]},
 {id:'daily-rounds',kind:'quest',period:'day',condition:'games',target:3,xp:40,name:'今日三局'},
 {id:'daily-explore',kind:'quest',period:'day',condition:'types',target:2,xp:40,name:'探索两种玩法'},
 {id:'weekly-rounds',kind:'quest',period:'week',condition:'games',target:15,xp:200,name:'一周十五局'},
 {id:'weekly-explore',kind:'quest',period:'week',condition:'types',target:4,xp:150,name:'每周游戏探索'},
 {id:'profile-once',kind:'quest',period:'all',condition:'profile',target:1,xp:50,name:'认识你自己'},
 {id:'club-once',kind:'quest',period:'all',condition:'club',target:1,xp:100,name:'加入朋友圈'},
 {id:'first-round',kind:'achievement',period:'all',condition:'games',target:1,itemIds:['title-newcomer'],name:'Getting Started',category:'Getting Started'},
 {id:'game-explorer',kind:'achievement',period:'all',condition:'types',target:3,itemIds:['title-explorer'],name:'Game Explorer',category:'Game Explorer'},
 {id:'veteran',kind:'achievement',period:'all',condition:'games',target:100,itemIds:['badge-veteran'],name:'Veteran',category:'Activity Milestones'},
 {id:'collector',kind:'achievement',period:'all',condition:'items',target:4,itemIds:['background-night'],name:'Collector',category:'Collector'},
 {id:'social',kind:'achievement',period:'all',condition:'club',target:1,itemIds:['souvenir-club'],name:'Friends Club',category:'Social'},
 {id:'quest-master',kind:'achievement',period:'all',condition:'quests',target:10,itemIds:['badge-veteran'],name:'Quest Completion',category:'Quest Completion'}];
 for(const d of definitions){d.enabled=true;d.version=1;p.definitions[d.id]=d;p.versions[d.id+':1']=structuredClone(d);}return p;
}
export function ensurePlayer(p,id,now){
 p.profiles[id]??={id,walletVisible:true,bio:'',avatar:'',settings:{sound:true,reducedMotion:false},equipped:{},featuredBadges:[],archived:false};
 p.progress[id]??={id,xp:0,games:0,level:1,gameTypes:{},achievements:{},quests:{},questsCompleted:0,profileCompleted:false,clubsJoined:0,lastDaily:null,streak:0};
 const key=id+':frame-starter';p.inventory[key]??={id:key,playerId:id,itemId:'frame-starter',createdAt:now,source:'welcome'};
 refreshPeriods(p.progress[id],now);
}
function refreshPeriods(prog,now){const keys=periods(now);for(const kind of ['day','week','month'])if(prog[kind]?.key!==keys[kind])prog[kind]={key:keys[kind],games:0,types:{},gameXP:0};}
function event(p,id,playerId,kind,now,detail={}){p.events.push({id,playerId,kind,createdAt:now,...detail});}
function addXP(p,id,xp,now,cause){
 if(!Number.isSafeInteger(xp)||xp<0||xp>10000)fail('XP 奖励超出允许范围。');
 const prog=p.progress[id];if(!Number.isSafeInteger(prog.xp+xp))fail('XP 超出可表示范围。');prog.xp+=xp;
 const factor=p.definitions.settings.levelFactor;prog.level=1+Math.floor(Math.sqrt(prog.xp/factor));
 const keys=periods(now);for(const kind of ['week','month','all']){const period=kind==='all'?'all':keys[kind],key=id+':'+kind+':'+period;
  const stats=p.stats[key]??={id:key,playerId:id,period:kind+':'+period,xp:0,games:0};stats.xp+=xp;}
 if(xp)event(p,'xp:'+cause,id,'xp.granted',now,{xp,cause});
}
export function grant(p,id,key,kind,xp,itemIds,now,details={}){
 const claimId=id+':'+key;if(p.claims[claimId])fail('该奖励已经领取。',409);
 for(const itemId of itemIds||[])if(!p.items[itemId]||!p.items[itemId].enabled)fail('奖励物品不存在或已停用。');
 p.claims[claimId]={id:claimId,playerId:id,kind,xp,createdAt:now,...details};addXP(p,id,xp||0,now,claimId);
 for(const itemId of itemIds||[]){const inventoryId=id+':'+itemId;p.inventory[inventoryId]??={id:inventoryId,playerId:id,itemId,createdAt:now,source:kind};}
 return p.claims[claimId];
}
function value(prog,definition,p,id){
 const period=definition.period==='all'?null:prog[definition.period],source=period||prog;
 return definition.condition==='games'?source.games:definition.condition==='types'?Object.keys(period?period.types:prog.gameTypes).length:
 definition.condition==='profile'?Number(prog.profileCompleted):definition.condition==='club'?prog.clubsJoined:
 definition.condition==='quests'?prog.questsCompleted:definition.condition==='items'?Object.values(p.inventory).filter(x=>x.playerId===id).length:0;
}
function currentQuest(p,id,d,now){
 const prog=p.progress[id],key=d.period==='all'?'all':d.period==='event'?String(d.startsAt):periods(now)[d.period];
 let instance=prog.quests[d.id];if(!instance||instance.key!==key){instance={key,definition:structuredClone(d),progress:0,eventStats:{games:0,types:{}}};prog.quests[d.id]=instance;}
 const definition=instance.definition;
 if(definition.period==='event'&&(now<definition.startsAt||now>=definition.endsAt))return null;
 const amount=definition.period==='event'?(definition.condition==='types'?Object.keys(instance.eventStats?.types||{}).length:instance.eventStats?.games||0):value(prog,definition,p,id);
 instance.progress=Math.min(definition.target,amount);return instance;
}
export function refreshAchievements(p,id,now){
 const prog=p.progress[id];
 for(const d of Object.values(p.definitions).filter(d=>d.kind==='achievement'&&d.enabled))if(!prog.achievements[d.id]&&value(prog,d,p,id)>=d.target){
  grant(p,id,'achievement:'+d.id,'achievement',d.xp||0,d.itemIds||[],now,{definitionVersion:d.version});prog.achievements[d.id]=now;
  event(p,'achievement:'+id+':'+d.id,id,'achievement.unlocked',now,{definitionId:d.id});
 }
 for(const d of Object.values(p.definitions).filter(d=>d.kind==='quest'&&d.enabled))currentQuest(p,id,d,now);
}
export function settledRound(p,id,game,roundId,now){
 ensurePlayer(p,id,now);if(p.claims[id+':round:'+roundId])return false;
 for(const d of Object.values(p.definitions).filter(d=>d.kind==='quest'&&d.enabled&&d.period==='event')){
  const q=currentQuest(p,id,d,now);if(q){q.eventStats??={games:0,types:{}};q.eventStats.games++;q.eventStats.types[game]=true;}
 }
 const prog=p.progress[id],cfg=p.definitions.settings,xp=Math.max(0,Math.min(cfg.gameXP,cfg.dailyGameCap-prog.day.gameXP));
 grant(p,id,'round:'+roundId,'round',xp,[],now);prog.day.gameXP+=xp;prog.games++;prog.gameTypes[game]=true;
 for(const kind of ['day','week','month']){prog[kind].games++;prog[kind].types[game]=true;}
 const keys=periods(now);for(const kind of ['week','month','all']){const period=kind==='all'?'all':keys[kind],key=id+':'+kind+':'+period;const stats=p.stats[key]??={id:key,playerId:id,period:kind+':'+period,xp:0,games:0};stats.games++;}
 event(p,roundId,id,'game.settled',now,{game,...(p.memberships[id]?{clubId:p.memberships[id].clubId}:{})});
 const member=p.memberships[id];if(member){const key=member.clubId+':'+keys.week+':'+roundId;p.contributions[key]={id:key,playerId:id,clubId:member.clubId,week:keys.week,createdAt:now,roundId};}
 refreshAchievements(p,id,now);return true;
}
export function claimDaily(p,id,now){
 ensurePlayer(p,id,now);const prog=p.progress[id],day=periods(now).day,previous=periods(now-86400000).day;
 if(prog.lastDaily===day)fail('今天已经领取签到奖励。',409);
 const streak=prog.lastDaily===previous?(prog.streak%7)+1:1;
 if(streak===1||!prog.dailySchedule)prog.dailySchedule=structuredClone(p.definitions.settings.dailyXP);
 const claim=grant(p,id,'daily:'+day,'daily',prog.dailySchedule[streak-1],streak===7?['badge-week']:[],now,{streak});
 prog.lastDaily=day;prog.streak=streak;refreshAchievements(p,id,now);return claim;
}
export function questViews(p,id,now){
 ensurePlayer(p,id,now);return Object.values(p.definitions).filter(d=>d.kind==='quest'&&d.enabled).map(d=>{
  const instance=currentQuest(p,id,d,now);if(!instance)return null;const q=instance.definition;
  const end=q.period==='day'?periods(now).nextDay:q.period==='week'?periods(now).nextWeek:q.period==='month'?periods(now).nextMonth:q.period==='event'?q.endsAt:null;
  return {...q,key:instance.key,progress:instance.progress,endsAt:end,claimed:Boolean(p.claims[id+':quest:'+d.id+':'+instance.key])};
 }).filter(Boolean);
}
export function claimQuest(p,id,questId,now){
 const q=questViews(p,id,now).find(q=>q.id===questId);if(!q||q.progress<q.target||q.endsAt&&now>=q.endsAt)fail('任务尚未完成或已经过期。');
 const result=grant(p,id,'quest:'+q.id+':'+q.key,'quest',q.xp||0,q.itemIds||[],now,{definitionVersion:q.version});p.progress[id].questsCompleted++;refreshAchievements(p,id,now);return result;
}
