const {test}=require('node:test'),assert=require('node:assert/strict');
test('normal rounds grant five XP capped at 100 per Shanghai day, and daily claims cannot repeat',async()=>{
 const {initialPlatform,ensurePlayer,settledRound,claimDaily}=await import('../worker/v2/progression.mjs');
 const now=Date.parse('2026-10-16T04:00:00Z'),p=initialPlatform('owner',now);ensurePlayer(p,'alex',now);
 for(let i=0;i<25;i++)settledRound(p,'alex','dice','round'+i,now);
 assert.equal(p.progress.alex.xp,100);assert.equal(p.progress.alex.games,25);
 claimDaily(p,'alex',now);assert.equal(p.progress.alex.xp,120);assert.throws(()=>claimDaily(p,'alex',now));
 settledRound(p,'alex','dice','nextday',now+86400000);assert.equal(p.progress.alex.day.gameXP,5);
});
