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
test('bank charges 1% only on the tenth completed round and compounds after the next ten', () => {
    const {e,saved}=game();e.borrow(100000);
    for(let i=0;i<9;i++){e.spinSlots(1);e.lock=null;}
    assert.equal(e.active.debt,100000);assert.equal(e.active.bankRounds,9);
    e.spinSlots(1);e.lock=null;assert.equal(e.active.debt,101000);assert.equal(e.active.bankRounds,0);assert.equal(e.availableCredit,0);
    for(let i=0;i<10;i++){e.spinSlots(1);e.lock=null;}
    assert.equal(e.active.debt,102010);
    const restored=new Engine(saved);assert.equal(restored.active.debt,102010);assert.equal(restored.storageWarning,'');
    assert.equal(restored.active.balance,e.active.balance);
});
test('interest progress survives reload without offline charges and stays isolated per player', () => {
    const {e,saved}=game();e.borrow(101);e.active.bankRounds=9;e.save();
    let restored=new Engine(saved);assert.equal(restored.active.debt,101);assert.equal(restored.active.bankRounds,9);
    restored.switchUser('jamie');restored.spinSlots(1);restored.lock=null;restored.switchUser('alex');
    assert.equal(restored.active.bankRounds,9);restored.spinSlots(1);restored.lock=null;
    assert.equal(restored.active.debt,103);restored.repay(103);assert.equal(restored.active.bankRounds,0);
    restored.borrow(100);assert.equal(restored.active.bankRounds,0);
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
test('negative saved wallets qualify, loan interest can exceed the cap, and repayments restore capacity', () => {
    const {e,saved}=game();e.borrow(100000);e.active.balance=-50;e.save();
    const restored=new Engine(saved);assert.equal(restored.storageWarning,'');assert.equal(restored.canBorrowShark,true);
    restored.borrowShark(1500000);assert.equal(restored.active.balance,1499950);
    restored.active.sharkRounds=9;restored.active.bankRounds=9;restored.spinSlots(1);restored.lock=null;
    assert.equal(restored.active.sharkDebt,1650000);assert.equal(restored.active.debt,101000);
    assert.equal(restored.availableSharkCredit,0);assert.equal(new Engine(saved).active.sharkDebt,1650000);
    restored.active.balance=2000000;restored.repayShark(1650000);
    assert.equal(restored.active.sharkDebt,0);assert.equal(restored.active.sharkRounds,0);
    assert.throws(()=>restored.repayShark(1));
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
test('roulette counts only rounds with an actual stake toward bank interest', () => {
    const html=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8');
    const source=html.slice(html.indexOf('        function evaluateSpinOutcome('),html.indexOf('        function showResultBanner('));
    const {e}=game();e.borrow(1000);e.active.bankRounds=9;
    const state={balance:e.active.balance,bets:Engine.emptyBets(),history:[]};
    const context={ state,casino:{engine:e},POCKETS:[{number:0}],getTotalActiveBet:()=>Engine.sumBets(state.bets),
        isRedPocket:()=>false,isBlackPocket:()=>false,renderHistoryRibbon(){},updateBettingHUD(){},renderNumberModalGrid(){},showResultBanner(){},document:{getElementById:()=>({})} };
    vm.createContext(context);vm.runInContext(source,context);context.evaluateSpinOutcome(0);
    assert.equal(e.active.bankRounds,9);assert.equal(e.active.debt,1000);
    state.bets.RED=1;context.evaluateSpinOutcome(0);assert.equal(e.active.debt,1010);assert.equal(e.active.bankRounds,0);
});
test('published game removes the free jackpot button and exposes merchant and loan controls', () => {
    const html=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8');
    assert.doesNotMatch(html,/Force 777|function forceJackpot777|data-machine-action="forceJackpot777/);
    for(const id of ['market-view','market-inventory','shark-borrow-amount','shark-repay-amount','lucky-armed-card']) assert.ok(html.includes(`id="${id}"`));
});
