/* Shared play-chip accounting. Kept independent of the rendering code. */
(function (root) {
    'use strict';
    const KEY = 'roulette-club-v1';
    const LIMIT = 5000;
    const MAX = 1000000000;
    const symbols = ['7', '💎', 'BAR', '🔔', '🍀', '🍒'];
    const triples = [50, 25, 20, 15, 10, 5];
    const reelStrip = [0, 5, 3, 1, 4, 2, 0, 5, 4, 3, 5, 1];
    const emptyBets = () => ({ RED: 0, BLACK: 0, GREEN: 0, ODD: 0, EVEN: 0, numbers: {} });
    const sumBets = bets => ['RED', 'BLACK', 'GREEN', 'ODD', 'EVEN'].reduce((s, k) => s + bets[k], 0)
        + Object.values(bets.numbers).reduce((s, v) => s + v, 0);
    const integer = (n, max = MAX) => Number.isSafeInteger(n) && n >= 0 && n <= max;
    function validateBets(bets) {
        return bets && ['RED', 'BLACK', 'GREEN', 'ODD', 'EVEN'].every(k => integer(bets[k]))
            && bets.numbers && typeof bets.numbers === 'object' && !Array.isArray(bets.numbers)
            && Object.entries(bets.numbers).every(([k, v]) => /^(?:[0-9]|1[0-9]|2[0-3])$/.test(k) && integer(v))
            && integer(sumBets(bets));
    }
    function profile(id, name) {
        return { id, name, balance: 1000, debt: 0, bets: emptyBets(), lastBets: null, history: [], pendingRoulette: false };
    }
    class CasinoEngine {
        constructor(storage, random) {
            this.storage = storage;
            this.random = random || (() => {
                const a = new Uint32Array(1);
                root.crypto.getRandomValues(a);
                return a[0] / 4294967296;
            });
            this.lock = null;
            this.storageWarning = '';
            this.data = { version: 1, activeId: 'alex', users: [profile('alex', 'Alex'), profile('jamie', 'Jamie'), profile('taylor', 'Taylor')], ledger: [] };
            try {
                const raw = storage && storage.getItem(KEY);
                if (raw) {
                    const saved = JSON.parse(raw);
                    if (saved.version !== 1 || !Array.isArray(saved.users) || saved.users.length < 1 || saved.users.length > 12
                        || !Array.isArray(saved.ledger) || !saved.users.some(u => u.id === saved.activeId)
                        || new Set(saved.users.map(u => u.id)).size !== saved.users.length
                        || !saved.users.every(u => typeof u.id === 'string' && typeof u.name === 'string'
                            && u.name.trim().length > 0 && u.name.length <= 24 && integer(u.balance)
                            && integer(u.debt, LIMIT) && validateBets(u.bets)
                            && (u.lastBets === null || validateBets(u.lastBets)) && Array.isArray(u.history))) {
                        throw new Error('Invalid saved profiles');
                    }
                    this.data = saved;
                    this.data.ledger = saved.ledger.filter(t => t && typeof t.text === 'string' && typeof t.time === 'string').slice(0, 100);
                    for (const u of saved.users) {
                        u.history = u.history.filter(h => h && integer(h.num, 23) && ['GREEN', 'RED', 'BLACK'].includes(h.colorTag)).slice(0, 10);
                        if (u.pendingRoulette) {
                            u.balance += sumBets(u.bets);
                            u.bets = emptyBets();
                            u.pendingRoulette = false;
                            this.record(`${u.name}: interrupted roulette stake refunded.`);
                        }
                    }
                }
            } catch {
                this.storageWarning = 'Saved profiles could not be read. This session starts with fresh local profiles.';
            }
        }
        get active() { return this.data.users.find(u => u.id === this.data.activeId); }
        get availableCredit() { return LIMIT - this.active.debt; }
        ensureIdle() {
            if (this.lock) throw new Error('Wait for the current spin to finish.');
        }
        amount(value) {
            if (!Number.isSafeInteger(value) || value <= 0 || value > 1000000) throw new Error('Enter a whole number from 1 to 1,000,000.');
            return value;
        }
        save() {
            try { if (this.storage) this.storage.setItem(KEY, JSON.stringify(this.data)); }
            catch { this.storageWarning = 'Browser storage is unavailable. Keep this page open to retain this session.'; }
        }
        record(text) {
            this.data.ledger.unshift({ text, time: new Date().toISOString() });
            this.data.ledger = this.data.ledger.slice(0, 100);
        }
        switchUser(id) {
            this.ensureIdle();
            if (!this.data.users.some(u => u.id === id)) throw new Error('Choose an existing player.');
            this.data.activeId = id;
            this.save();
        }
        addUser(name) {
            this.ensureIdle();
            name = String(name).trim();
            if (!name || name.length > 24) throw new Error('Use a player name with 1–24 characters.');
            if (this.data.users.length >= 12) throw new Error('This table has room for 12 players.');
            if (this.data.users.some(u => u.name.toLowerCase() === name.toLowerCase())) throw new Error('That player name is already taken.');
            const u = profile(root.crypto.randomUUID(), name);
            this.data.users.push(u);
            this.data.activeId = u.id;
            this.record(`${name} joined with 1,000 starter chips.`);
            this.save();
            return u;
        }
        transfer(id, value) {
            this.ensureIdle();
            const n = this.amount(value), from = this.active;
            const to = this.data.users.find(u => u.id === id);
            if (!to || to === from) throw new Error('Choose another player to receive the chips.');
            if (n > from.balance) throw new Error('Your wallet does not have enough chips.');
            if (to.balance + n > MAX) throw new Error('The receiving wallet has reached its chip limit.');
            from.balance -= n;
            to.balance += n;
            this.record(`${from.name} → ${to.name}: ${n.toLocaleString()} chips transferred.`);
            this.save();
        }
        borrow(value) {
            this.ensureIdle();
            const n = this.amount(value), u = this.active;
            if (n > this.availableCredit) throw new Error(`You can borrow up to ${this.availableCredit.toLocaleString()} more chips.`);
            if (u.balance + n > MAX) throw new Error('Your wallet has reached its chip limit.');
            u.balance += n;
            u.debt += n;
            this.record(`Bank → ${u.name}: borrowed ${n.toLocaleString()} chips.`);
            this.save();
        }
        repay(value) {
            this.ensureIdle();
            const n = this.amount(value), u = this.active;
            if (n > u.debt) throw new Error('That amount is greater than your outstanding debt.');
            if (n > u.balance) throw new Error('Your wallet does not have enough chips to repay that amount.');
            u.balance -= n;
            u.debt -= n;
            this.record(`${u.name} → Bank: repaid ${n.toLocaleString()} chips.`);
            this.save();
        }
        slotResult(reels, wager) {
            if (!Array.isArray(reels) || reels.length !== 3 || !reels.every(i => integer(i, 11))) throw new Error('Invalid reels.');
            const landed = reels.map(i => reelStrip[i]);
            const cherries = landed.filter(i => i === 5).length;
            const sevens = landed.filter(i => i === 0).length;
            const multiplier = landed.every(i => i === landed[0]) ? triples[landed[0]]
                : sevens === 2 ? 5 : cherries === 2 ? 2 : cherries === 1 ? 1 : 0;
            return { reels: [...reels], symbols: landed, multiplier, wager, payout: wager * multiplier, net: wager * (multiplier - 1) };
        }
        spinSlots(value, forcedIndices = null) {
            this.ensureIdle();
            const n = this.amount(value), u = this.active;
            if (n < 10 || n > 100 || n % 10 !== 0) throw new Error('Choose a wager from 10 to 100 in steps of 10.');
            if (n > u.balance) throw new Error('Your wallet does not have enough chips for this spin.');
            if (u.balance + n * 49 > MAX) throw new Error('Your wallet is too close to its chip limit.');
            const reels = forcedIndices === null ? Array.from({ length: 3 }, () => {
                const roll = this.random();
                if (!(roll >= 0 && roll < 1)) throw new Error('Could not generate a valid spin. Try again.');
                return Math.floor(roll * reelStrip.length);
            }) : forcedIndices;
            const result = this.slotResult(reels, n);
            u.balance += result.net;
            this.record(`${u.name} · 777${forcedIndices === null ? '' : ' (forced jackpot)'}: wager ${n.toLocaleString()}, payout ${result.payout.toLocaleString()} (${result.symbols.map(i => symbols[i]).join(' / ')}).`);
            this.lock = 'slots';
            this.save();
            return result;
        }
    }
    CasinoEngine.symbols = symbols;
    CasinoEngine.triples = triples;
    CasinoEngine.reelStrip = reelStrip;
    CasinoEngine.creditLimit = LIMIT;
    CasinoEngine.emptyBets = emptyBets;
    CasinoEngine.sumBets = sumBets;
    CasinoEngine.storageKey = KEY;
    root.CasinoEngine = CasinoEngine;
})(globalThis);
