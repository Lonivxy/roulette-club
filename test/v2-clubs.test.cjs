const {test}=require('node:test'),assert=require('node:assert/strict');
test('club invitations enforce single membership and weekly rewards cannot be claimed twice after rejoin',async()=>{
 const {initialPlatform,ensurePlayer,settledRound}=await import('../worker/v2/progression.mjs'),{clubAction}=await import('../worker/v2/clubs.mjs');
 const now=Date.parse('2026-10-16T04:00:00Z'),p=initialPlatform('owner',now);for(const id of ['alex','jamie'])ensurePlayer(p,id,now);
 const a={playerId:'alex'},b={playerId:'jamie'},engine={data:{users:[{id:'alex'},{id:'jamie'}]}};
 const club=clubAction(p,engine,a,'club.create',[{name:'Friends',description:'Private'}],now),invite=clubAction(p,engine,a,'club.invite',['jamie'],now);
 clubAction(p,engine,b,'club.respond',[invite.id,true],now);assert.equal(p.memberships.jamie.clubId,club.id);
 assert.throws(()=>clubAction(p,engine,b,'club.create',[{name:'Other',description:''}],now));
 for(let i=0;i<50;i++)settledRound(p,'jamie','dice','round'+i,now);
 clubAction(p,engine,b,'club.claim',[],now);assert.throws(()=>clubAction(p,engine,b,'club.claim',[],now));
 assert.throws(()=>clubAction(p,engine,a,'club.leave',[],now));clubAction(p,engine,a,'club.transfer',['jamie'],now);clubAction(p,engine,a,'club.leave',[],now);
 assert.equal(p.clubs[club.id].ownerId,'jamie');assert.equal(p.memberships.alex,undefined);
});
