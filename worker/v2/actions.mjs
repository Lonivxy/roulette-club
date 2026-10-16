import {fail} from './identity.mjs';
import {ensurePlayer,refreshAchievements,claimDaily,claimQuest} from './progression.mjs';
const text=(value,max,min=0)=>{if(typeof value!=='string'||value.trim().length<min||value.trim().length>max)fail(`文字长度必须为 ${min}–${max}。`);return value.trim();};
const integer=(value,min,max)=>{if(!Number.isSafeInteger(value)||value<min||value>max)fail('请输入有效整数。');return value;};
const identifier=value=>{const id=text(value,80,1);if(!/^[a-zA-Z0-9_-]+$/.test(id)||['__proto__','prototype','constructor'].includes(id))fail('配置标识无效。');return id;};
const owner=(p,a)=>{if(a.actor!==p.meta.ownerActor||a.role!=='owner')fail('只有站点所有者可以执行此操作。',403);};
export const isAdminCommand=command=>command.startsWith('admin.')||['adminAdjust','addUser','deletePlayer','import'].includes(command);
export function platformAction(p,engine,account,command,args,now){
 const id=account.playerId;
 if(command==='reward.claim')return claimDaily(p,id,now);
 if(command==='quest.claim')return claimQuest(p,id,text(args[0],80,1),now);
 if(command==='profile.update'){
  const value=args[0];if(!value||typeof value!=='object'||Array.isArray(value))fail('资料格式无效。');
  const profile=p.profiles[id];if(value.name!==undefined){const name=text(value.name,24,1);if(engine.data.users.some(u=>u.id!==id&&u.name.toLocaleLowerCase()===name.toLocaleLowerCase()))fail('玩家名称已被使用。');engine.active.name=name;}
  if(value.bio!==undefined)profile.bio=text(value.bio,180);
  if(value.avatar!==undefined){if(!['initial','star','moon','diamond'].includes(value.avatar))fail('请选择预设头像。');profile.avatar=value.avatar;}
  p.progress[id].profileCompleted=true;refreshAchievements(p,id,now);return profile;
 }
 if(command==='profile.settings'){
  const value=args[0];if(!value||typeof value!=='object'||Array.isArray(value))fail('设置格式无效。');const profile=p.profiles[id];
  if(value.walletVisible!==undefined){if(typeof value.walletVisible!=='boolean')fail('余额隐私设置无效。');profile.walletVisible=value.walletVisible;}
  for(const key of ['sound','reducedMotion'])if(value[key]!==undefined){if(typeof value[key]!=='boolean')fail('偏好设置无效。');profile.settings[key]=value[key];}return profile;
 }
 if(command==='inventory.equip'){
  const [slot,value]=args,profile=p.profiles[id];
  const owns=(itemId,kind)=>{if(!p.inventory[id+':'+itemId]||p.items[itemId]?.kind!==kind||!p.items[itemId]?.enabled)fail('未拥有该物品或装备类型不匹配。',403);};
  if(slot==='badges'){if(!Array.isArray(value)||value.length>3||new Set(value).size!==value.length)fail('最多展示三个不同徽章。');for(const item of value)owns(item,'badge');profile.featuredBadges=[...value];}
  else{if(!['frame','title','background'].includes(slot))fail('装备位置无效。');if(value!==null)owns(value,slot);profile.equipped[slot]=value;}return profile;
 }
 if(command==='admin.bind'){
  const [actor,playerId]=args,target=p.accounts[actor],player=engine.data.users.find(u=>u.id===playerId);
  if(!target||!player||p.profiles[playerId]?.archived)fail('请选择已登录的账号和有效旧玩家。');
  if(target.playerId&&target.playerId!==playerId)fail('该账号已经绑定其他玩家。');
  if(Object.values(p.accounts).some(a=>a.actor!==actor&&a.playerId===playerId))fail('该玩家已经绑定其他账号。',409);
  if(target.role!=='member'&&account.role!=='owner')fail('只有所有者可以绑定管理员账号。',403);
  target.playerId=playerId;target.status='active';ensurePlayer(p,playerId,now);return {actor,playerId};
 }
 if(command==='admin.account'){
  owner(p,account);const [actor,role,status,reason]=args;const target=p.accounts[actor];text(reason,120,3);
  if(!target||actor===p.meta.ownerActor||!['admin','member'].includes(role)||!['active','suspended','pending'].includes(status))fail('账号状态或角色无效；不能修改所有者。');
  if(status==='active'&&!target.playerId)fail('请先绑定玩家。');target.role=role;target.status=status;return {actor,role,status};
 }
 if(command==='admin.maintenance'){owner(p,account);if(typeof args[0]!=='boolean')fail('维护状态无效。');text(args[1],120,3);p.meta.maintenance=args[0];return {maintenance:args[0]};}
 if(command==='admin.item'){
  const item=structuredClone(args[0]);if(!item||typeof item!=='object'||Array.isArray(item))fail('物品无效。');item.id=identifier(item.id);item.name=text(item.name,48,1);item.description=text(item.description||'',300);
  if(!['frame','badge','title','background','souvenir'].includes(item.kind)||!['common','rare','epic','legendary'].includes(item.rarity)||typeof item.enabled!=='boolean')fail('物品分类或稀有度无效。');
  if(p.items[item.id]&&p.items[item.id].kind!==item.kind)fail('已有物品不能改变装备类型。');p.items[item.id]=item;return item;
 }
 if(command==='admin.definition'){
  const d=structuredClone(args[0]);if(!d||typeof d!=='object'||Array.isArray(d))fail('配置无效。');d.id=identifier(d.id);d.name=text(d.name||d.id,60,1);
  if(typeof d.enabled!=='boolean'||!['settings','quest','achievement'].includes(d.kind))fail('配置类型无效。');
  if(d.kind==='settings'){
   if(d.id!=='settings')fail('配置标识无效。');integer(d.gameXP,0,100);integer(d.dailyGameCap,0,1000);integer(d.levelFactor,10,1000000);
   if(!Array.isArray(d.dailyXP)||d.dailyXP.length!==7)fail('签到需要七天奖励。');d.dailyXP.forEach(n=>integer(n,0,10000));
  }else{
   if(!['day','week','month','all','event'].includes(d.period)||!['games','types','profile','club','quests','items'].includes(d.condition))fail('任务规则无效。');
   integer(d.target,1,1000000);integer(d.xp||0,0,10000);
   if(d.period==='event'){integer(d.startsAt,0,Number.MAX_SAFE_INTEGER);integer(d.endsAt,d.startsAt+1,Number.MAX_SAFE_INTEGER);if(!['games','types'].includes(d.condition))fail('限时任务支持完成对局或不同游戏数量。');}
   if(d.kind==='achievement'&&d.period!=='all')fail('成就使用累计里程碑规则。');
   if(d.itemIds!==undefined&&(!Array.isArray(d.itemIds)||d.itemIds.length>5||d.itemIds.some(item=>!p.items[item])))fail('奖励物品无效。');
  }
  const previous=p.definitions[d.id];if(previous&&previous.kind!==d.kind)fail('不能改变已有配置的类型。');d.version=(previous?.version||0)+1;
  if(previous?.kind==='quest'&&(previous.period!==d.period||d.period==='event'&&(previous.startsAt!==d.startsAt||previous.endsAt!==d.endsAt)))fail('已有任务不能更改周期或活动时间；请创建新任务。');
  if(d.kind==='settings')for(const progress of Object.values(p.progress))progress.level=1+Math.floor(Math.sqrt(progress.xp/d.levelFactor));
  p.definitions[d.id]=d;p.versions[d.id+':'+d.version]=structuredClone(d);return d;
 }
 return undefined;
}
