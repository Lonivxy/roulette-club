const {test}=require('node:test'),assert=require('node:assert/strict');
test('a bound member can only select their own player; administrators still need step-up',async()=>{
 const {authorize,privateState}=await import('../worker/v2/identity.mjs');
 const p={meta:{ownerActor:'owner'},accounts:{owner:{actor:'owner',role:'owner',status:'active',playerId:'alex'},friend:{actor:'friend',role:'member',status:'active',playerId:'jamie'}},profiles:{alex:{walletVisible:true},jamie:{walletVisible:true}}};
 assert.equal(authorize(p,'friend','jamie',false).playerId,'jamie');assert.throws(()=>authorize(p,'friend','alex',false));
 assert.throws(()=>authorize(p,'friend','jamie',true));assert.throws(()=>authorize(p,'owner','alex',true,false));
 assert.equal(authorize(p,'owner','alex',true,true).role,'owner');
 const data={activeId:'alex',users:[{id:'alex',name:'Alex',balance:10,debt:200,bets:{}},{id:'jamie',name:'Jamie',balance:20,debt:400,bets:{}}],loans:[],ledger:[{text:'private'}]};
 const view=privateState(data,p,p.accounts.friend);assert.equal(view.users.length,1);assert.equal(view.users[0].id,'jamie');assert.deepEqual(view.ledger,[]);
 p.accounts.friend.status='suspended';assert.throws(()=>authorize(p,'friend','jamie',false));
});
