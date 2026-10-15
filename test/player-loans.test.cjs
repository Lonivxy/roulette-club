const {test}=require('node:test'),assert=require('node:assert/strict');
require('../src/club-core.js');
function fixture() {
    const map=new Map(),saved={getItem:key=>map.get(key)??null,setItem:(key,value)=>map.set(key,value)};
    let now=1000000;const engine=new CasinoEngine(saved,()=>0,()=>now);
    return {engine,saved,clock:()=>now,advance:ms=>now+=ms};
}
test('lender proposes immutable terms, only borrower can accept, and transfer occurs exactly once',()=>{
    const t=fixture(),e=t.engine,loan=e.offerLoan('jamie',500,2.5);
    assert.equal(loan.status,'pending');assert.equal(loan.periodMs,600000);assert.equal(loan.rateBps,250);
    assert.equal(e.active.balance,1000);assert.equal(e.data.users[1].balance,1000);assert.throws(()=>e.respondLoan(loan.id,true));
    t.advance(3600000);e.save();assert.equal(loan.balance,500);assert.equal(loan.interestAt,null);
    e.switchUser('jamie');e.respondLoan(loan.id,true);assert.equal(e.active.balance,1500);assert.equal(e.data.users[0].balance,500);
    assert.equal(loan.interestAt,t.clock());assert.throws(()=>e.respondLoan(loan.id,true));assert.equal(e.active.balance,1500);
});
test('peer loans accrue offline, repay partially or fully to the lender, and reload without duplicate interest',()=>{
    const t=fixture(),e=t.engine,loan=e.offerLoan('jamie',500,1);e.switchUser('jamie');e.respondLoan(loan.id,true);
    t.advance(20*60000);const restored=new CasinoEngine(t.saved,()=>0,t.clock),active=restored.data.loans[0];
    assert.equal(active.balance,511);assert.equal(restored.active.balance,1500);assert.equal(restored.storageWarning,'');
    restored.save();assert.equal(active.balance,511);const at=active.interestAt;
    restored.repayLoan(loan.id,100);assert.equal(active.balance,411);assert.equal(active.interestAt,at);assert.equal(restored.data.users[0].balance,600);
    restored.repayLoan(loan.id,411);assert.equal(active.status,'repaid');assert.equal(active.balance,0);assert.equal(active.interestAt,null);
    assert.equal(restored.active.balance,989);assert.equal(restored.data.users[0].balance,1011);assert.throws(()=>restored.repayLoan(loan.id,1));
});
test('acceptance rechecks lender funds and borrower wallet capacity without partial transfers',()=>{
    const {engine:e}=fixture(),loan=e.offerLoan('jamie',1000,1);
    e.transfer('taylor',1000);e.switchUser('jamie');let before=JSON.stringify(e.data);
    assert.throws(()=>e.respondLoan(loan.id,true));assert.equal(JSON.stringify(e.data),before);assert.equal(loan.status,'pending');
    e.data.users[0].balance=1000;e.active.balance=1000000000;before=JSON.stringify(e.data);
    assert.throws(()=>e.respondLoan(loan.id,true));assert.equal(JSON.stringify(e.data),before);
});
test('only lender may cancel, only borrower may decline, and neither moves chips',()=>{
    const {engine:e}=fixture(),first=e.offerLoan('jamie',10,0),second=e.offerLoan('taylor',20,100,1);
    e.cancelLoan(first.id);assert.equal(first.status,'cancelled');e.switchUser('taylor');assert.throws(()=>e.cancelLoan(second.id));e.respondLoan(second.id,false);
    assert.equal(second.status,'declined');assert.ok(e.data.users.every(user=>user.balance===1000));
});
test('loan rate, principal, periods, parties and game locks are validated before creating an agreement',()=>{
    const {engine:e}=fixture(),before=JSON.stringify(e.data);
    for(const args of [['alex',10,1],['missing',10,1],['jamie',0,1],['jamie',10,-1],['jamie',10,100.01],['jamie',10,1.001],['jamie',10,NaN],['jamie',10,1,0],['jamie',10,1,1441]])assert.throws(()=>e.offerLoan(...args));
    assert.equal(JSON.stringify(e.data),before);e.lock='slots';assert.throws(()=>e.offerLoan('jamie',1,1));assert.equal(JSON.stringify(e.data),before);
});
test('deletion blocks debts and unresolved agreements; a settled account can be deleted without deleting receipts',()=>{
    const t=fixture(),e=t.engine,loan=e.offerLoan('jamie',500,1);
    assert.throws(()=>e.deletePlayer('alex'));assert.throws(()=>e.deletePlayer('jamie'));
    e.switchUser('jamie');e.respondLoan(loan.id,true);assert.throws(()=>e.deletePlayer('alex'));assert.throws(()=>e.deletePlayer('jamie'));
    e.repayLoan(loan.id,500);e.deletePlayer('alex');assert.equal(e.data.users.length,2);assert.equal(e.data.loans[0].status,'repaid');
    const restored=new CasinoEngine(t.saved,()=>0,t.clock);assert.equal(restored.storageWarning,'');assert.equal(restored.data.loans[0].lenderName,'Alex');
    restored.deletePlayer('jamie');assert.equal(restored.active.name,'Taylor');assert.throws(()=>restored.deletePlayer('taylor'));
});
test('deletion cannot erase bank debt, shark debt, staked chips or another unfinished hand',()=>{
    const {engine:e}=fixture();e.borrow(1);assert.throws(()=>e.deletePlayer('alex'));e.repay(1);
    e.active.sharkDebt=1;assert.throws(()=>e.deletePlayer('alex'));e.active.sharkDebt=0;
    e.active.bets.RED=1;assert.throws(()=>e.deletePlayer('alex'));e.active.bets.RED=0;
    e.active.blackjack={phase:'player'};assert.throws(()=>e.deletePlayer('alex'));e.active.blackjack=null;
    e.deletePlayer('alex');assert.equal(e.active.id,'jamie');assert.equal(e.data.users.length,2);
});
test('new black market cards yield positive net winnings and enforce a persistent per-player cooldown',()=>{
    const t=fixture(),e=t.engine;e.active.balance=10000;const start=e.active.balance;
    const card=e.buyCard('seven',100);e.armCard(card.id);const result=e.spinSlots(100);e.lock=null;
    assert.equal(result.payout,5000);assert.equal(e.active.balance,start+1400);assert.throws(()=>e.buyCard('diamonds',1));
    const restored=new CasinoEngine(t.saved,()=>0,t.clock);assert.throws(()=>restored.buyCard('seven',1));
    restored.switchUser('jamie');restored.buyCard('seven',1);restored.switchUser('alex');
    t.advance(15*60000);restored.buyCard('diamonds',100);assert.equal(restored.active.cards.length,1);
});
test('long offline debt caps safely and clock rollback cannot generate another interest period',()=>{
    const t=fixture(),e=t.engine;e.borrow(100000);e.active.balance=0;e.borrowShark(1500000);
    t.advance(365*24*60*60000);e.save();assert.equal(e.active.sharkDebt,1000000000);assert.equal(e.active.debt,1000000000);
    t.advance(-1000000);e.save();assert.equal(e.active.debt,1000000000);assert.equal(e.active.sharkDebt,1000000000);
});
