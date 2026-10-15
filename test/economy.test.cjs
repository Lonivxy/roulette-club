const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
require('../src/club-core.js');
const Engine = globalThis.CasinoEngine;
function storage() { const data = new Map(); return { getItem: key => data.get(key) ?? null, setItem: (key,value) => data.set(key,value) }; }
function game(random = () => 0) { const saved = storage(); return { e: new Engine(saved, random), saved }; }

test('legacy profiles migrate without losing balances, bank debts or roulette bets', () => {
    const {e,saved}=game();e.borrow(5000);e.active.bets.RED=37;e.active.balance-=37;
    for(const user of e.data.users) for(const key of ['cards','armedCardId','sharkDebt','bankRounds','sharkRounds']) delete user[key];
    e.save();const restored=new Engine(saved);
    assert.equal(restored.storageWarning,'');assert.equal(restored.active.balance,5963);assert.equal(restored.active.debt,5000);
    assert.equal(restored.availableCredit,95000);assert.equal(restored.active.bets.RED,37);assert.deepEqual(restored.active.cards,[]);
});
test('bank accrues 15% per real ten minutes, compounds and never charges again on reload', () => {
    const saved=storage();let now=1000000;const e=new Engine(saved,()=>0,()=>now);e.borrow(100000);
    for(let i=0;i<20;i++){e.spinSlots(1);e.lock=null;}assert.equal(e.active.debt,100000);
    now+=10*60000-1;e.save();assert.equal(e.active.debt,100000);
    now++;e.save();assert.equal(e.active.debt,115000);
    now+=10*60000;e.save();assert.equal(e.active.debt,132250);
    const restored=new Engine(saved,()=>0,()=>now);assert.equal(restored.active.debt,132250);assert.equal(restored.storageWarning,'');
    restored.save();assert.equal(restored.active.debt,132250);
});
test('offline time charges all players; partial repayments keep time progress and full repayments reset it', () => {
    const saved=storage();let now=1000000;const e=new Engine(saved,()=>0,()=>now);e.borrow(1000);e.switchUser('jamie');e.borrow(2000);
    now+=20*60000;const restored=new Engine(saved,()=>0,()=>now);
    assert.equal(restored.active.debt,2645);restored.switchUser('alex');assert.equal(restored.active.debt,1323);
    const clock=restored.active.bankInterestAt;restored.repay(100);assert.equal(restored.active.bankInterestAt,clock);
    restored.repay(1223);assert.equal(restored.active.bankInterestAt,null);restored.borrow(100);assert.equal(restored.active.bankInterestAt,now);
});
test('loan shark rejects ordinary players, positive cash, reserved roulette stakes and active games', () => {
    const {e}=game();assert.equal(e.canBorrowShark,false);assert.throws(()=>e.borrowShark(1));
    e.borrow(100000);assert.equal(e.canBorrowShark,false);
    e.active.balance=0;e.active.bets.RED=1;assert.equal(e.canBorrowShark,false);assert.throws(()=>e.borrowShark(1));
    e.active.bets.RED=0;e.lock='blackjack';assert.equal(e.canBorrowShark,false);assert.throws(()=>e.borrowShark(1));
    e.lock=null;assert.equal(e.canBorrowShark,true);
});
test('loan shark lends the full 1.5M once when eligible and prevents borrowing over the total limit', () => {
    const {e,saved}=game();e.borrow(100000);e.active.balance=0;
    assert.throws(()=>e.borrowShark(1500001));e.borrowShark(1500000);
    assert.equal(e.active.balance,1500000);assert.equal(e.active.sharkDebt,1500000);assert.equal(e.canBorrowShark,false);
    assert.throws(()=>e.borrowShark(1));e.active.balance=0;assert.throws(()=>e.borrowShark(1));
    e.save();const restored=new Engine(saved);assert.equal(restored.active.sharkDebt,1500000);assert.equal(restored.availableSharkCredit,0);
});
test('negative wallets qualify and shark charges 125% per three minutes even while offline', () => {
    const saved=storage();let now=1000000;const e=new Engine(saved,()=>0,()=>now);e.borrow(100000);e.active.balance=-50;e.save();
    const restored=new Engine(saved,()=>0,()=>now);assert.equal(restored.canBorrowShark,true);restored.borrowShark(1500000);
    assert.equal(restored.active.balance,1499950);now+=3*60000-1;restored.save();assert.equal(restored.active.sharkDebt,1500000);
    now++;restored.save();assert.equal(restored.active.sharkDebt,3375000);assert.equal(restored.active.debt,100000);
    now+=3*60000;
    const offline=new Engine(saved,()=>0,()=>now);assert.equal(offline.active.sharkDebt,7593750);
    assert.equal(offline.availableSharkCredit,0);assert.equal(new Engine(saved,()=>0,()=>now).active.sharkDebt,7593750);
    offline.active.balance=10000000;offline.repayShark(7593750);assert.equal(offline.active.sharkInterestAt,null);assert.throws(()=>offline.repayShark(1));
});

test('old bank and shark debts settle old completed periods once before the new schedules start', () => {
    const saved=storage();let now=1000000;const e=new Engine(saved,()=>0,()=>now);
    const user=e.active;user.debt=100000;user.bankInterestAt=now;user.sharkDebt=1000;user.sharkInterestAt=now+25*60000;
    delete user.bankInterestPolicy;delete user.sharkInterestPolicy;
    saved.setItem(Engine.storageKey,JSON.stringify(e.data));now+=30*60000;
    const migrated=new Engine(saved,()=>0,()=>now);
    assert.equal(migrated.active.debt,100500);assert.equal(migrated.active.sharkDebt,1100);
    assert.equal(migrated.active.bankInterestAt,now);assert.equal(migrated.active.sharkInterestAt,now);
    const reloaded=new Engine(saved,()=>0,()=>now);assert.equal(reloaded.active.debt,100500);assert.equal(reloaded.active.sharkDebt,1100);
    now+=3*60000;reloaded.save();assert.equal(reloaded.active.sharkDebt,2475);assert.equal(reloaded.active.debt,100500);
    now+=7*60000;reloaded.save();assert.equal(reloaded.active.debt,115575);
});
test('all merchant cards charge their price and force the correct result for exactly one spin', () => {
    for(const type of Object.keys(Engine.cards)) {
        const {e,saved}=game(()=>.4);e.active.balance=100000;
        const item=Engine.cards[type],card=e.buyCard(type,137),afterPurchase=100000-137*item.factor;
        assert.equal(e.active.balance,afterPurchase);e.armCard(card.id);
        const result=e.spinSlots(137,[0,0,0]);assert.equal(result.multiplier,item.multiplier);
        assert.equal(e.active.balance,afterPurchase+137*(item.multiplier-1));assert.equal(e.active.cards.length,0);assert.equal(e.armedCard,null);
        const restored=new Engine(saved);assert.equal(restored.active.cards.length,0);assert.equal(restored.active.balance,e.active.balance);
        e.lock=null;assert.equal(e.spinSlots(1).multiplier,10);
    }
});
test('unaffordable purchases, foreign cards, invalid stakes and failed spins never consume a card', () => {
    const {e}=game();const initial=JSON.stringify(e.data);
    assert.throws(()=>e.buyCard('seven',100));assert.throws(()=>e.buyCard('__proto__',1));assert.throws(()=>e.buyCard('seven',1.5));
    assert.equal(JSON.stringify(e.data),initial);
    e.active.balance=10000;const card=e.buyCard('seven',100);e.armCard(card.id);
    assert.throws(()=>e.spinSlots(101));assert.equal(e.active.cards.length,1);
    e.active.balance=99;assert.throws(()=>e.spinSlots(100));assert.equal(e.active.cards.length,1);assert.equal(e.active.armedCardId,card.id);
    e.active.balance=100;e.switchUser('jamie');assert.throws(()=>e.armCard(card.id));assert.equal(e.active.cards.length,0);
    e.switchUser('alex');e.armCard(null);assert.equal(e.active.cards.length,1);assert.equal(e.armedCard,null);
});
test('bought and equipped cards persist independently of the selected player', () => {
    const {e,saved}=game();e.active.balance=10000;const card=e.buyCard('diamonds',100);e.armCard(card.id);e.switchUser('jamie');
    const restored=new Engine(saved);assert.equal(restored.active.name,'Jamie');assert.equal(restored.armedCard,null);
    restored.switchUser('alex');assert.equal(restored.armedCard.id,card.id);assert.equal(restored.active.cards.length,1);
});
test('loan and merchant transactions are locked during an active round', () => {
    const {e}=game();e.borrow(100000);const card=e.buyCard('seven',10);e.active.sharkDebt=100;e.lock='blackjack';
    const snapshot=JSON.stringify(e.data);
    for(const action of [()=>e.borrowShark(1),()=>e.repayShark(1),()=>e.buyCard('seven',1),()=>e.armCard(card.id)]) assert.throws(action);
    assert.equal(JSON.stringify(e.data),snapshot);
});
test('roulette rounds do not advance real-time interest', () => {
    const html=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8');
    const source=html.slice(html.indexOf('        function evaluateSpinOutcome('),html.indexOf('        function showResultBanner('));
    const {e}=game();e.borrow(1000);
    const state={balance:e.active.balance,bets:Engine.emptyBets(),history:[]};
    const context={ state,casino:{engine:e},POCKETS:[{number:0}],getTotalActiveBet:()=>Engine.sumBets(state.bets),
        isRedPocket:()=>false,isBlackPocket:()=>false,renderHistoryRibbon(){},updateBettingHUD(){},renderNumberModalGrid(){},showResultBanner(){},document:{getElementById:()=>({})} };
    vm.createContext(context);vm.runInContext(source,context);context.evaluateSpinOutcome(0);
    assert.equal(e.active.debt,1000);
    state.bets.RED=1;context.evaluateSpinOutcome(0);assert.equal(e.active.debt,1000);
});
test('published game removes the free jackpot button and exposes merchant and loan controls', () => {
    const html=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8');
    assert.doesNotMatch(html,/Force 777|function forceJackpot777|data-machine-action="forceJackpot777/);
    for(const id of ['market-view','market-inventory','shark-borrow-amount','shark-repay-amount','lucky-armed-card']) assert.ok(html.includes(`id="${id}"`));
});
