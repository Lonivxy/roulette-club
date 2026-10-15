const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
require('../src/club-core.js');
const Engine = globalThis.CasinoEngine;
function memory() {
    const values = new Map();
    return { getItem: k => values.get(k) ?? null, setItem: (k, v) => values.set(k, v) };
}
function engine(random) { return new Engine(memory(), random); }

test('transfers conserve chips and survive a reload for both players', () => {
    const storage = memory(), e = new Engine(storage);
    const total = e.data.users.reduce((s, u) => s + u.balance, 0);
    e.transfer('jamie', 125);
    assert.equal(e.active.balance, 875);
    e.switchUser('jamie'); assert.equal(e.active.balance, 1125);
    assert.equal(e.data.users.reduce((s, u) => s + u.balance, 0), total);
    const restored = new Engine(storage);
    assert.equal(restored.active.name, 'Jamie'); assert.equal(restored.active.balance, 1125);
    assert.equal(restored.data.ledger.length, 1);
});
test('invalid transfers never mutate either wallet', () => {
    const e = engine(), snapshot = JSON.stringify(e.data);
    for (const value of [0, -1, 1.5, NaN, Infinity, 1001, 1000001]) assert.throws(() => e.transfer('jamie', value));
    assert.throws(() => e.transfer('alex', 10));
    assert.throws(() => e.transfer('missing', 10));
    assert.equal(JSON.stringify(e.data), snapshot);
});
test('bank debt and repayments enforce credit and cash limits per player', () => {
    const e = engine(); e.borrow(5000);
    assert.equal(e.active.balance, 6000); assert.equal(e.active.debt, 5000);
    assert.throws(() => e.borrow(1)); assert.throws(() => e.repay(5001));
    e.repay(600); assert.equal(e.active.debt, 4400); assert.equal(e.availableCredit, 600);
    e.borrow(600); assert.equal(e.active.debt, 5000);
    e.transfer('jamie', 6000); assert.throws(() => e.repay(1));
    e.switchUser('jamie'); assert.equal(e.active.debt, 0); assert.equal(e.availableCredit, 5000);
});
test('players retain separate roulette stakes, history, and rebet snapshots', () => {
    const e = engine(); e.active.bets.RED = 100; e.active.balance -= 100;
    e.active.lastBets = { ...Engine.emptyBets(), GREEN: 25 };
    e.active.history.push({ num: 1, colorTag: 'RED' }); e.save();
    e.switchUser('jamie'); assert.equal(Engine.sumBets(e.active.bets), 0); assert.equal(e.active.lastBets, null);
    e.switchUser('alex'); assert.equal(Engine.sumBets(e.active.bets), 100); assert.equal(e.active.history[0].num, 1);
});
test('new players validate names and table capacity', () => {
    const e = engine(); assert.throws(() => e.addUser('Alex')); assert.throws(() => e.addUser('  '));
    assert.throws(() => e.addUser('x'.repeat(25)));
    for (let i = 3; i < 12; i++) { const u = e.addUser('Player ' + i); assert.equal(u.balance, 1000); }
    assert.equal(e.data.users.length, 12); assert.throws(() => e.addUser('Player 13'));
});
test('new 777 jackpot returns 50 times stake once and persists before animation ends', () => {
    const storage = memory(), e = new Engine(storage, () => 0);
    const r = e.spinSlots(10);
    assert.equal(r.multiplier, 50); assert.equal(r.payout, 500); assert.equal(r.net, 490);
    assert.equal(e.active.balance, 1490); assert.equal(e.lock, 'slots');
    const restored = new Engine(storage);
    assert.equal(restored.active.balance, 1490); assert.equal(restored.data.ledger.length, 1);
});
test('all 1,728 facet combinations obey the supplied cabinet payout rules', () => {
    const e = engine(); let total = 0;
    const strip = ['7', 'CHERRY', 'BELL', 'DIAMOND', 'CLOVER', 'BAR', '7', 'CHERRY', 'CLOVER', 'BELL', 'CHERRY', 'DIAMOND'];
    const payouts = { '7': 50, DIAMOND: 25, BAR: 20, BELL: 15, CLOVER: 10, CHERRY: 5 };
    for (let a = 0; a < 12; a++) for (let b = 0; b < 12; b++) for (let c = 0; c < 12; c++) {
        const r = e.slotResult([a, b, c], 10);
        const landed = [a, b, c].map(i => strip[i]);
        const cherries = landed.filter(s => s === 'CHERRY').length;
        const expected = landed.every(s => s === landed[0]) ? payouts[landed[0]]
            : landed.filter(s => s === '7').length === 2 ? 5 : cherries === 2 ? 2 : cherries === 1 ? 1 : 0;
        assert.equal(r.payout, expected * 10); assert.equal(r.net, r.payout - 10); total += r.payout;
    }
    assert.equal(total, 27340);
});
test('Force 777 uses the shared wallet and cannot bypass funds or spin locks', () => {
    const e = engine(() => { throw new Error('Forced spin should not roll random facets'); });
    const result = e.spinSlots(20, [0, 6, 0]);
    assert.equal(result.payout, 1000); assert.equal(e.active.balance, 1980);
    assert.match(e.data.ledger[0].text, /forced jackpot/);
    assert.throws(() => e.spinSlots(20, [0, 6, 0]), /current spin/);
    e.lock = null; e.active.balance = 5;
    assert.throws(() => e.spinSlots(10, [0, 6, 0]), /enough chips/);
    assert.equal(e.active.balance, 5);
});
test('10–100 step wagers and invalid facet positions are validated before mutation', () => {
    for (const n of [10,20,30,40,50,60,70,80,90,100]) {
        const e = engine(() => 0); assert.equal(e.spinSlots(n).wager, n);
    }
    const e = engine(() => 0), snapshot = JSON.stringify(e.data);
    for (const n of [5,15,25,110,500]) assert.throws(() => e.spinSlots(n));
    for (const reels of [[0,6,12], [0,6,-1], [0,6], [0,6,1.5]]) assert.throws(() => e.spinSlots(20, reels));
    assert.equal(JSON.stringify(e.data), snapshot);
});
test('losing spin debits only its stake and insufficient or invalid wagers are atomic', () => {
    let i = 0; const e = engine(() => [0.01, 0.2, 0.4][i++ % 3]);
    const r = e.spinSlots(50); assert.equal(r.payout, 0); assert.equal(e.active.balance, 950);
    e.lock = null; e.active.balance = 5;
    assert.throws(() => e.spinSlots(10)); assert.throws(() => e.spinSlots(11)); assert.equal(e.active.balance, 5);
    const bad = engine(() => NaN); assert.throws(() => bad.spinSlots(10)); assert.equal(bad.active.balance, 1000);
});
test('an active spin blocks switching, transfers, bank changes, and another spin', () => {
    const e = engine(() => 0); e.spinSlots(10);
    for (const action of [() => e.switchUser('jamie'), () => e.transfer('jamie', 1), () => e.borrow(1), () => e.repay(1), () => e.addUser('New'), () => e.spinSlots(10)]) assert.throws(action, /current spin/);
    e.lock = null; e.switchUser('jamie'); assert.equal(e.active.balance, 1000);
});
test('interrupted roulette stake is refunded only once after reload', () => {
    const storage = memory(), e = new Engine(storage);
    e.active.balance = 900; e.active.bets.RED = 100; e.active.pendingRoulette = true; e.save();
    const loaded = new Engine(storage); assert.equal(loaded.active.balance, 1000); assert.equal(Engine.sumBets(loaded.active.bets), 0);
    loaded.save(); const twice = new Engine(storage); assert.equal(twice.active.balance, 1000);
});
test('unavailable or malformed storage remains usable with a visible warning', () => {
    const e = new Engine({ getItem() { throw new Error('denied'); }, setItem() { throw new Error('denied'); } });
    e.borrow(10); assert.equal(e.active.balance, 1010); assert.ok(e.storageWarning);
    const storage = memory(); storage.setItem(Engine.storageKey, '{broken');
    const fresh = new Engine(storage); assert.equal(fresh.active.balance, 1000); assert.ok(fresh.storageWarning);
});
test('compiled page scripts parse and IDs are unique', () => {
    const html = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');
    const inline = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].filter(m => m[1].trim());
    assert.equal(inline.length, 2); inline.forEach(m => new vm.Script(m[1]));
    const ids = [...html.matchAll(/\bid="([^"\s]+)"/g)].map(m => m[1]);
    assert.equal(new Set(ids).size, ids.length);
    assert.ok(!html.includes('state.balance = 1000;'));
    assert.ok(!html.includes('Free Arcade House Refill'));
    assert.ok(!html.includes('onclick='));
    assert.ok(html.includes('createLucky777'));
    assert.ok(!html.includes('function spinSlots()'));
});
