const {test}=require('node:test'),assert=require('node:assert/strict');
require('../src/lottery-core.js');require('../src/club-core.js');require('../src/blackjack-core.js');
const L=CasinoLottery,M=CasinoMoney;
const sample=ticket=>()=>ticket/4294967296;
function fixture(ticket=9999999){let raw=null;const storage={getItem:()=>raw,setItem:(_,value)=>raw=value},e=new CasinoEngine(storage,sample(ticket),()=>100000000);return {e,storage};}

test('confirmed lottery weights total exactly 100% and return exactly 74.3% of the stake in theory',()=>{
    assert.deepEqual(L.prices,[1000,10000,1000000]);
    assert.deepEqual(L.tiers.map(t=>t.weight),[500,2000,30000,60000,120000,250000,350000,450000,750000,2000000,5987500]);
    assert.deepEqual(L.tiers.map(t=>t.numerator/2),[100,50,10,8,5,4,2.5,2,1.5,1,0]);
    assert.equal(L.tiers.reduce((sum,t)=>sum+t.weight,0),L.total);assert.equal(L.expectedNumerator,14860000);
    assert.equal(L.expectedNumerator/(L.total*2),.743);
    assert.ok(Object.isFrozen(L.tiers));assert.ok(Object.isFrozen(L.tiers[0]));
});

test('every boundary belongs to exactly the correct prize tier for all three ticket prices',()=>{
    let start=0;
    for(let tier=0;tier<L.tiers.length;tier++){
        const item=L.tiers[tier],end=start+item.weight;
        for(const price of L.prices)for(const ticket of [start,end-1]){
            const result=L.fromTicket(price,ticket);assert.equal(result.tier,tier);assert.equal(result.multiplier,item.numerator/2);
            assert.equal(result.payout,price*item.numerator/2);assert.equal(result.net,result.payout-price);
        }
        if(end<L.total)assert.equal(L.fromTicket(1000,end).tier,tier+1);start=end;
    }
    assert.equal(start,L.total);
});

test('random draw rejects the excess 32-bit tail without modulo bias and handles invalid generators',()=>{
    let calls=0;assert.equal(L.drawTicket(()=>++calls===1?4294967295/4294967296:499/4294967296),499);assert.equal(calls,2);
    for(const roll of [NaN,Infinity,-.1,1,'0',null])assert.throws(()=>L.drawTicket(()=>roll));
    assert.throws(()=>L.drawTicket(()=>4294967295/4294967296));
    assert.equal(L.draw(1000,()=>{throw Error('jackpot does not need a sample');},true).payout,100000);
});

test('invalid prices, samples, funds and game locks never take chips or add ticket history',()=>{
    const {e}=fixture(),before=M.stringify(e.data);
    for(const price of [0,1,10,999,1001,10000,1000000,1000001,1.5,NaN,Infinity,'1e3'])assert.throws(()=>e.buyLottery(price));
    assert.equal(M.stringify(e.data),before);e.random=()=>1;assert.throws(()=>e.buyLottery(1000));assert.equal(M.stringify(e.data),before);
    for(const ticket of [-1,10000000,1.5,NaN])assert.throws(()=>L.fromTicket(1000,ticket));
    e.lock='blackjack';assert.throws(()=>e.buyLottery(1000,{jackpot:true}));assert.equal(M.stringify(e.data),before);
});

test('purchase settles one exact debit and payout before reveal and persists the result without replay',()=>{
    const {e,storage}=fixture(0),result=e.buyLottery(1000);
    assert.equal(result.walletAfterWager,0);assert.equal(result.payout,100000);assert.equal(e.active.balance,100000);assert.equal(e.lock,'lottery');
    assert.equal(e.active.lotteryHistory.length,1);assert.equal(L.validHistory(result),true);assert.match(e.data.ledger[0].text,/彩票/);
    assert.throws(()=>e.buyLottery(1000));
    const loaded=new CasinoEngine(storage,sample(0),e.now);assert.equal(loaded.active.balance,100000);assert.equal(loaded.active.lotteryHistory.length,1);assert.equal(loaded.storageWarning,'');
    assert.equal(L.validHistory(loaded.active.lotteryHistory[0]),true);assert.equal(L.validHistory({...result,payout:200000}),false);
});

test('ticket prices stay fixed while six-figure prizes credit arbitrary-size wallets precisely',()=>{
    const {e,storage}=fixture(),huge=10n**100n;e.active.balance=huge;
    const result=e.buyLottery('1000000',{jackpot:true});assert.equal(result.payout,100000000);assert.equal(e.active.balance,huge+99000000n);
    assert.equal(new CasinoEngine(storage,sample(0),e.now).active.balance,huge+99000000n);
});

test('a losing final shark ticket enters the existing ten-chip recovery mode and cannot afford another ticket',()=>{
    const {e,storage}=fixture();e.borrow(100000);e.active.balance=0;e.borrowShark(1000);
    const r=e.buyLottery(1000);assert.equal(r.payout,0);assert.equal(e.active.recovery.deficit,0);assert.equal(e.active.balance,10);
    assert.equal(e.active.debt,100000);assert.equal(e.active.sharkDebt,1000);e.lock=null;const before=M.stringify(e.data);
    assert.throws(()=>e.buyLottery(1000));assert.equal(M.stringify(e.data),before);
    assert.equal(new CasinoEngine(storage,sample(0),e.now).active.balance,10);
});

test('history is isolated by player and keeps the most recent thirty valid tickets',()=>{
    const {e,storage}=fixture(0);for(let i=0;i<35;i++){e.buyLottery(1000);e.lock=null;}
    const alexId=e.active.lotteryHistory[0].id;assert.equal(e.active.lotteryHistory.length,30);
    e.switchUser('jamie');assert.equal(e.active.lotteryHistory,undefined);e.buyLottery(1000);assert.equal(e.active.lotteryHistory.length,1);
    const restored=new CasinoEngine(storage,sample(0),e.now);assert.equal(restored.active.id,'jamie');restored.switchUser('alex');assert.equal(restored.active.lotteryHistory.length,30);assert.equal(restored.active.lotteryHistory[0].id,alexId);
});
