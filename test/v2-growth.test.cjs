const {test}=require('node:test'),assert=require('node:assert/strict');
test('normal rounds grant five XP capped at 100 per Shanghai day, and daily claims cannot repeat',async()=>{
 const {initialPlatform,ensurePlayer,settledRound,claimDaily}=await import('../worker/v2/progression.mjs');
 const now=Date.parse('2026-10-16T04:00:00Z'),p=initialPlatform('owner',now);ensurePlayer(p,'alex',now);
 for(let i=0;i<25;i++)settledRound(p,'alex','dice','round'+i,now);
 assert.equal(p.progress.alex.xp,100);assert.equal(p.progress.alex.games,25);
 claimDaily(p,'alex',now);assert.equal(p.progress.alex.xp,120);assert.throws(()=>claimDaily(p,'alex',now));
 settledRound(p,'alex','dice','nextday',now+86400000);assert.equal(p.progress.alex.day.gameXP,5);
});
test('Shanghai resets cover Monday, month and year boundaries; seven-day rewards cycle without duplicate cosmetics',async()=>{
 const {initialPlatform,ensurePlayer,claimDaily,periods}=await import('../worker/v2/progression.mjs');
 const now=Date.parse('2026-12-31T15:59:59Z'),a=periods(now),b=periods(now+1000);assert.equal(a.day,'2026-12-31');assert.equal(b.day,'2027-01-01');assert.equal(b.month,'2027-01');assert.equal(b.week,'2026-12-28');
 assert.equal(periods(Date.parse('2026-10-18T16:00:00Z')).week,'2026-10-19');
 const p=initialPlatform('owner',now);ensurePlayer(p,'alex',now);for(let i=0;i<14;i++)claimDaily(p,'alex',now+i*86400000);
 assert.equal(p.progress.alex.xp,550);assert.equal(p.progress.alex.streak,7);assert.equal(Object.values(p.inventory).filter(i=>i.itemId==='badge-week').length,1);
 claimDaily(p,'alex',now+16*86400000);assert.equal(p.progress.alex.streak,1);assert.equal(p.progress.alex.xp,570);
});
test('a quest keeps its period reward version and cannot be claimed again after definition edits',async()=>{
 const {initialPlatform,ensurePlayer,settledRound,questViews,claimQuest}=await import('../worker/v2/progression.mjs');
 const now=Date.parse('2026-10-16T04:00:00Z'),p=initialPlatform('owner',now);ensurePlayer(p,'alex',now);questViews(p,'alex',now);
 p.definitions['daily-rounds']={...p.definitions['daily-rounds'],target:1,xp:999,version:2};
 settledRound(p,'alex','dice','1',now);assert.throws(()=>claimQuest(p,'alex','daily-rounds',now));
 settledRound(p,'alex','dice','2',now);settledRound(p,'alex','dice','3',now);claimQuest(p,'alex','daily-rounds',now);
 assert.equal(p.progress.alex.xp,55);assert.throws(()=>claimQuest(p,'alex','daily-rounds',now));
 assert.equal(questViews(p,'alex',now+86400000).find(q=>q.id==='daily-rounds').xp,999);
});
test('event quests count only settlements inside their own window and expire unclaimed rewards',async()=>{
 const {initialPlatform,ensurePlayer,settledRound,questViews,claimQuest}=await import('../worker/v2/progression.mjs');
 const now=Date.parse('2026-10-16T04:00:00Z'),p=initialPlatform('owner',now);ensurePlayer(p,'alex',now);
 settledRound(p,'alex','dice','before',now);
 p.definitions.event={id:'event',kind:'quest',period:'event',condition:'games',target:2,xp:70,name:'Event',startsAt:now+1000,endsAt:now+10000,enabled:true,version:1};
 settledRound(p,'alex','slots','during1',now+2000);
 assert.equal(questViews(p,'alex',now+2000).find(q=>q.id==='event').progress,1);
 settledRound(p,'alex','dice','during2',now+3000);
 assert.equal(questViews(p,'alex',now+3000).find(q=>q.id==='event').progress,2);
 assert.throws(()=>claimQuest(p,'alex','event',now+10000));
});
