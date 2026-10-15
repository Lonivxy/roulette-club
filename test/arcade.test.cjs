const {test}=require('node:test'),assert=require('node:assert/strict');
require('../src/arcade-core.js');require('../src/club-core.js');require('../src/blackjack-core.js');
const A=globalThis.CasinoArcade,E=globalThis.CasinoEngine;
function fixture(random=()=>.9){const values=new Map(),saved={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v)};return {e:new E(saved,random,()=>1000000),saved};}

test('all 4096 Plinko paths land on their matching multiplier and stay within the board',()=>{
    for(let mask=0;mask<4096;mask++){
        const path=Array.from({length:12},(_,i)=>(mask>>i)&1),pocket=path.reduce((s,n)=>s+n,0);
        for(const risk of Object.keys(A.tables)){
            const result=A.plinkoResult(137,risk,'center',path);assert.equal(result.pocket,pocket);assert.equal(result.payout,Math.floor(137*A.tables[risk][pocket]/100));assert.equal(result.net,result.payout-137);
        }
        for(const lane of Object.keys(A.lanes)){const points=A.pathPoints(path,lane);assert.equal(points.at(-1).x,(pocket-6)*.82);assert.ok(points.every(point=>Math.abs(point.x)<=5&&point.y>=-4.1&&point.y<=6.3));}
    }
});
test('Plinko lane odds sum to one and every visible risk/launcher table stays below full expected return',()=>{
    for(const lane of Object.keys(A.lanes)){
        const probabilities=Array.from({length:13},(_,i)=>A.pocketProbability(i,lane));assert.ok(Math.abs(probabilities.reduce((s,n)=>s+n,0)-1)<1e-12);
        for(const risk of Object.keys(A.tables)){const expected=probabilities.reduce((s,p,i)=>s+p*A.tables[risk][i]/100,0);assert.ok(expected>0&&expected<1);}
    }
    assert.equal(A.plinko(10,'high','right',()=>{throw Error('unused');},true).pocket,12);
    assert.equal(A.plinko(10,'high','center',()=>0,true).payout,1000);
});
test('all 216 dice outcomes obey big/small, parity, triple exclusions and every exact-sum payout',()=>{
    const counts={small:0,big:0,odd:0,even:0,triple:0},sums=Object.fromEntries(Object.keys(A.sumReturns).map(n=>[n,0]));
    for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)for(let c=1;c<=6;c++){
        const faces=[a,b,c];for(const kind of Object.keys(counts)){const result=A.diceResult(137,kind,null,faces);if(result.payout)counts[kind]++;assert.equal(result.net,result.payout-137);if(a===b&&b===c&&kind!=='triple')assert.equal(result.payout,0);}
        for(const target of Object.keys(sums).map(Number)){const result=A.diceResult(137,'sum',target,faces);assert.equal(result.payout,a+b+c===target?137*A.sumReturns[target]:0);if(result.payout)sums[target]++;}
    }
    assert.deepEqual(counts,{small:105,big:105,odd:105,even:105,triple:6});assert.deepEqual(Object.values(sums),[3,6,10,15,21,25,27,27,25,21,15,10,6,3]);
});
test('dice jackpots produce the maximum return for the selected wager without sampling randomness',()=>{
    const random=()=>{throw Error('should not sample');};
    for(const kind of ['small','big','odd','even','triple'])assert.equal(A.dice(137,kind,null,random,true).payout,137*A.diceSettings(kind,null));
    for(let target=4;target<=17;target++){const result=A.dice(137,'sum',target,random,true);assert.equal(result.total,target);assert.equal(result.payout,137*A.sumReturns[target]);}
});
test('dice final rotations place the reported face upward',()=>{
    const normals={1:[1,0,0],2:[0,1,0],3:[0,0,1],4:[0,0,-1],5:[0,-1,0],6:[-1,0,0]};
    for(let face=1;face<=6;face++){const {x,z}=A.diceRotation(face),[nx,ny,nz]=normals[face];const rzY=nx*Math.sin(z)+ny*Math.cos(z),y=rzY*Math.cos(x)-nz*Math.sin(x);assert.ok(Math.abs(y-1)<1e-10);}
});
test('recent-game records validate payout math and ignore malformed imported display data',()=>{
    const result={...A.diceResult(10,'sum',6,[1,2,3]),id:'round',time:'2026-10-16T00:00:00Z'};
    assert.equal(A.validHistory(result),true);assert.equal(A.validHistory({...result,payout:999999}),false);
    assert.equal(A.validHistory({...result,dice:[{toString:'invalid'},2,3]}),false);assert.equal(A.validHistory(null),false);
});
test('new-game accounting persists the exact wager, bounded history, jackpot return and a separate player wallet',()=>{
    const {e,saved}=fixture();const result=e.playPlinko(137,'high','center',{jackpot:true});assert.equal(result.payout,13700);assert.equal(result.walletAfterWager,863);assert.equal(e.active.balance,14563);assert.equal(e.lock,'plinko');
    assert.throws(()=>e.playDice(1));const reloaded=new E(saved,()=>.5,()=>1000000);assert.equal(reloaded.active.balance,14563);assert.equal(reloaded.active.arcadeHistory.length,1);assert.equal(reloaded.lock,null);
    reloaded.switchUser('jamie');assert.equal(reloaded.active.balance,1000);assert.equal(reloaded.active.arcadeHistory,undefined);
    for(let i=0;i<35;i++){reloaded.playDice(1,'small');reloaded.lock=null;}assert.equal(reloaded.active.arcadeHistory.length,30);assert.equal(reloaded.data.users[0].arcadeHistory.length,1);
});
test('invalid wagers, settings, random samples and wallet caps fail before taking chips',()=>{
    const {e}=fixture();const before=JSON.stringify(e.data);
    for(const wager of [0,-1,1.5,NaN,Infinity,1001,1000001]){assert.throws(()=>e.playPlinko(wager));assert.throws(()=>e.playDice(wager));}
    for(const action of [()=>e.playPlinko(10,'__proto__'),()=>e.playPlinko(10,'low','missing'),()=>e.playDice(10,'missing'),()=>e.playDice(10,'sum',3),()=>e.playDice(10,'sum',18)])assert.throws(action);
    e.random=()=>1;assert.throws(()=>e.playPlinko(10));assert.throws(()=>e.playDice(10));assert.equal(JSON.stringify(e.data),before);
    e.active.balance=999999999;e.random=()=>.5;assert.throws(()=>e.playPlinko(10,'high'));assert.throws(()=>e.playDice(10,'triple'));assert.equal(e.active.balance,999999999);
});
test('both games support the fixed ten-chip negative ledger and profit-based recovery',()=>{
    const {e}=fixture(()=>.999);e.borrow(100000);e.active.balance=0;e.borrowShark(10);e.playDice(10,'small');e.lock=null;
    assert.equal(e.active.recovery.deficit,0);assert.equal(e.active.balance,10);e.playDice(10,'small');e.lock=null;assert.equal(e.active.recovery.deficit,10);
    e.active.recovery.deficit=200;let i=0;e.random=()=>i++<2?0:.9;e.playPlinko(10,'medium');e.lock=null;
    assert.equal(e.active.recovery.deficit,180);assert.equal(e.active.balance,10);
    e.active.recovery.deficit=20;e.playDice(10,'sum',4,{jackpot:true});e.lock=null;assert.equal(e.active.recovery,null);assert.equal(e.active.balance,590);assert.equal(e.active.sharkDebt,10);
});
