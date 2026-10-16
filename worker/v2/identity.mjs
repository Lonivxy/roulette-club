export const fail=(message,status=400)=>{throw Object.assign(new Error(message),{status});};
export function authorize(platform,actor,playerId,privileged=false,stepUp=false){
 const account=platform.accounts[actor];
 if(!account||account.status!=='active')fail('账号尚未获邀、已停用或尚未完成绑定。',403);
 if(privileged){if(!['owner','admin'].includes(account.role)||!stepUp)fail('需要授权管理员及 Windows Hello 验证。',403);}
 else if(!account.playerId|| (playerId&&playerId!==account.playerId))fail('只能操作绑定给自己的玩家。',403);
 return account;
}
export function privateState(data,platform,account){
 const player=data.users.find(u=>u.id===account.playerId);
 return {version:data.version,activeId:account.playerId,users:player?[structuredClone(player)]:[],
  loans:data.loans.filter(l=>[l.lenderId,l.borrowerId].includes(account.playerId)),ledger:[]};
}
export function publicPlayer(user,platform){
 const profile=platform.profiles[user.id]||{},progress=platform.progress[user.id]||{};
 return {id:user.id,name:user.name,avatar:profile.avatar||user.name[0],bio:profile.bio||'',xp:progress.xp||0,level:progress.level||1,
  games:progress.games||0,achievements:Object.keys(progress.achievements||{}).length,equipped:profile.equipped||{},featuredBadges:profile.featuredBadges||[],
  ...(profile.walletVisible!==false?{balance:user.recovery?0:user.balance}:{})};
}
