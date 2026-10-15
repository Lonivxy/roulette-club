const { test } = require('node:test');
const assert = require('node:assert/strict');
require('../src/club-core.js'); require('../src/blackjack-core.js');
const Engine = globalThis.CasinoEngine, Blackjack = globalThis.CasinoBlackjack;
const card = (rank, suit = 0) => ({ rank, suit });
function storage() { const map = new Map(); return { getItem: k => map.get(k) ?? null, setItem: (k,v) => map.set(k,v) }; }
function shoe(sequence) {
    const cards = Blackjack.makeShoe(() => .5);
    for (const c of sequence) {
        const index = cards.findIndex(x => x.rank === c.rank && x.suit === c.suit);
        assert.notEqual(index,-1); cards.splice(index,1);
    }
    return [...cards,...sequence.toReversed()];
}
function table(ranks, balance = 1000) {
    const saved = storage(), engine = new Engine(saved, () => .5); engine.active.balance = balance;
    const game = new Blackjack(engine,{shoeFactory:()=>shoe(ranks.map(r=>typeof r==='number'?card(r):r))});
    return { engine, game, saved };
}
function dealer(game) { let count=0;while(game.round.phase==='dealer') {game.dealerStep();assert.ok(count++<50);} }
test('scores multiple aces, soft totals, naturals, and busts correctly',()=>{
    assert.deepEqual(Blackjack.score([card(1),card(1),card(9)]),{total:21,soft:true,blackjack:false,bust:false});
    assert.equal(Blackjack.score([card(1),card(6),card(10)]).soft,false);
    assert.equal(Blackjack.score([card(1),card(13)]).blackjack,true);
    assert.equal(Blackjack.score([card(10),card(9),card(5)]).bust,true);
});
test('shoe contains six copies of every physical card and rejects invalid randomness',()=>{
    const cards=Blackjack.makeShoe(()=>.4),counts=new Map();
    assert.equal(cards.length,312);for(const c of cards) {const key=c.rank+':'+c.suit;counts.set(key,(counts.get(key)||0)+1);}
    assert.equal(counts.size,52);assert.ok([...counts.values()].every(n=>n===6));
    assert.throws(()=>Blackjack.makeShoe(()=>NaN));
});
test('initial natural pays 3:2, both naturals push, and dealer natural settles immediately',()=>{
    const win=table([1,9,13,7]);win.game.start(10);assert.equal(win.game.round.phase,'settled');assert.equal(win.game.round.result.payout,25);assert.equal(win.engine.active.balance,1015);
    const push=table([1,1,13,12]);push.game.start(10);assert.equal(push.engine.active.balance,1000);assert.equal(push.game.round.result.hands[0].label,'Push');
    const lose=table([10,1,7,13]);lose.game.start(10);assert.equal(lose.engine.active.balance,990);assert.equal(lose.engine.lock,null);
});
test('stand compares hands and pays a dealer bust; equal totals return the stake',()=>{
    const win=table([10,9,7,7,10]);win.game.start(50);assert.equal(win.engine.active.balance,950);win.game.stand();dealer(win.game);assert.equal(win.engine.active.balance,1050);
    const push=table([10,10,7,7]);push.game.start(50);push.game.stand();dealer(push.game);assert.equal(push.engine.active.balance,1000);
    assert.equal(push.game.round.result.net,0);
});
test('dealer stands on soft 17 without drawing another card',()=>{
    const t=table([10,1,8,6,10]);t.game.start(20);const before=t.game.round.shoe.length;t.game.stand();dealer(t.game);
    assert.equal(t.game.round.dealer.length,2);assert.equal(t.game.round.shoe.length,before);assert.equal(t.engine.active.balance,1020);
});
test('hit to 21 advances automatically and pays a regular win',()=>{
    const t=table([7,10,4,7,10]);t.game.start(20);t.game.hit();assert.equal(t.game.round.phase,'dealer');dealer(t.game);
    assert.equal(t.game.round.result.payout,40);assert.equal(t.engine.active.balance,1020);
});
test('player bust loses only the stake and the dealer does not draw needlessly',()=>{
    const t=table([10,8,9,9,10]);t.game.start(20);t.game.hit();const before=t.game.round.shoe.length;dealer(t.game);
    assert.equal(t.engine.active.balance,980);assert.equal(t.game.round.shoe.length,before);assert.equal(t.game.round.result.hands[0].label,'Bust');
});
test('double debits one extra stake, draws exactly one card, and ends the hand',()=>{
    const t=table([5,9,6,7,10,10]);t.game.start(20);t.game.double();
    assert.equal(t.engine.active.balance,960);assert.equal(t.game.round.hands[0].bet,40);assert.equal(t.game.round.hands[0].cards.length,3);assert.equal(t.game.round.phase,'dealer');
    dealer(t.game);assert.equal(t.engine.active.balance,1040);
});
test('insufficient funds and ineligible double or split never mutate wallet or hand',()=>{
    const t=table([8,10,8,7,2],15);t.game.start(10);const before=JSON.stringify(t.engine.data);
    assert.throws(()=>t.game.double());assert.throws(()=>t.game.split());assert.equal(JSON.stringify(t.engine.data),before);
    const other=table([5,10,6,7,2]);other.game.start(10);other.game.hit();assert.equal(other.game.available().double,false);assert.throws(()=>other.game.double());
});
test('split creates two independently played hands and double after split pays correct totals',()=>{
    const t=table([8,10,8,7,3,2,10,9]);t.game.start(10);t.game.split();
    assert.equal(t.engine.active.balance,980);assert.equal(t.game.round.hands.length,2);assert.equal(t.game.available().split,false);
    t.game.double();assert.equal(t.game.round.activeHand,1);assert.equal(t.engine.active.balance,970);
    t.game.hit();t.game.stand();dealer(t.game);assert.equal(t.game.round.result.wager,30);assert.equal(t.game.round.result.payout,60);assert.equal(t.engine.active.balance,1030);
});
test('split aces take one card each and a split 21 pays 1:1',()=>{
    const t=table([1,10,1,7,13,9]);t.game.start(10);t.game.split();
    assert.equal(t.game.round.phase,'dealer');assert.ok(t.game.round.hands.every(h=>h.cards.length===2));dealer(t.game);
    assert.equal(t.game.round.result.payout,40);assert.equal(t.engine.active.balance,1020);
});
test('equal-value court cards can split; unpaired ranks cannot',()=>{
    const t=table([12,8,13,8,2,3]);t.game.start(10);assert.equal(t.game.available().split,true);t.game.split();assert.equal(t.game.round.hands.length,2);
    const other=table([10,9,8,8]);other.game.start(10);assert.equal(other.game.available().split,false);assert.throws(()=>other.game.split());
});
test('an open blackjack hand blocks other games, profiles, transfers, and banking',()=>{
    const t=table([10,9,8,7]);t.game.start(10);
    for(const action of [()=>t.engine.switchUser('jamie'),()=>t.engine.borrow(10),()=>t.engine.repay(10),()=>t.engine.transfer('jamie',10),()=>t.engine.spinSlots(10),()=>t.game.start(10)]) assert.throws(action);
});
test('reload resumes the exact hand, shoe, owner and stake without refund or redebit',()=>{
    const t=table([8,10,8,7,3,2,10]);t.game.start(10);t.game.split();
    const snapshot=JSON.stringify(t.game.round), restored=new Engine(t.saved), game=new Blackjack(restored);
    assert.equal(restored.lock,'blackjack');assert.equal(restored.active.balance,980);assert.equal(JSON.stringify(game.round),snapshot);
    game.stand();game.stand();dealer(game);const settledBalance=restored.active.balance;
    const again=new Engine(t.saved), reopened=new Blackjack(again);assert.equal(again.active.balance,settledBalance);assert.equal(reopened.pending,false);assert.equal(again.data.ledger.length,1);
    assert.throws(()=>reopened.dealerStep());assert.equal(again.active.balance,settledBalance);
});
test('a reload during dealer play resumes the remaining draws and settles once',()=>{
    const t=table([10,2,8,3,4,10]);t.game.start(20);t.game.stand();t.game.dealerStep();assert.equal(t.game.round.phase,'dealer');
    const engine=new Engine(t.saved), game=new Blackjack(engine);dealer(game);assert.equal(game.round.dealer.length,4);assert.equal(engine.active.balance,980);assert.equal(engine.data.ledger.length,1);
});
test('invalid wagers fail before debit and old saved casino profiles still load',()=>{
    const t=table([10,9,8,7]);const before=JSON.stringify(t.engine.data);
    for(const bet of [0,-10,1.5,1000001,Infinity,NaN,10000]) assert.throws(()=>t.game.start(bet));
    assert.equal(JSON.stringify(t.engine.data),before);t.engine.borrow(100);t.engine.save();
    const fresh=new Engine(t.saved), game=new Blackjack(fresh);assert.equal(game.round,null);assert.equal(fresh.active.balance,1100);assert.equal(fresh.active.debt,100);
});

test('odd custom blackjack rounds half chips down and reloads the saved wallet safely',()=>{
    const t=table([1,9,13,7]);t.game.start(137);
    assert.equal(t.game.round.phase,'settled');assert.equal(t.game.round.result.payout,342);
    assert.equal(t.engine.active.balance,1205);
    const restored=new Engine(t.saved),game=new Blackjack(restored);
    assert.equal(restored.active.balance,1205);assert.equal(game.round.result.payout,342);
    assert.equal(game.pending,false);assert.equal(restored.storageWarning,'');
});

test('custom split and doubled wagers survive reload and keep exact stakes',()=>{
    const t=table([8,10,8,7,2,3,10]);t.game.start(137);t.game.split();t.game.double();
    assert.equal(t.engine.active.balance,589);
    const restored=new Engine(t.saved),game=new Blackjack(restored);
    assert.deepEqual(game.round.hands.map(h=>h.bet),[274,137]);assert.equal(restored.lock,'blackjack');
    assert.equal(restored.active.balance,589);assert.equal(restored.storageWarning,'');
});

test('a settled blackjack hand charges due interest once and reload never charges it again',()=>{
    const t=table([1,9,13,7]);t.engine.borrow(1000);t.engine.active.bankRounds=9;
    t.game.start(10);assert.equal(t.engine.active.debt,1010);assert.equal(t.engine.active.bankRounds,0);
    const restored=new Engine(t.saved);new Blackjack(restored);
    assert.equal(restored.active.debt,1010);assert.equal(restored.active.bankRounds,0);
});
