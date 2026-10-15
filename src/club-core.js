/* Shared play-chip accounting. Kept independent of the rendering code. */
(function (root) {
    'use strict';
    const KEY = 'roulette-club-v1';
    const LIMIT = 100000;
    const SHARK_LIMIT = 1500000;
    const INTEREST_ROUNDS = 10;
    const MAX = 1000000000;
    const symbols = ['7', '💎', 'BAR', '🔔', '🍀', '🍒'];
    const triples = [50, 25, 20, 15, 10, 5];
    const reelStrip = [0, 5, 3, 1, 4, 2, 0, 5, 4, 3, 5, 1];
    const emptyBets = () => ({ RED: 0, BLACK: 0, GREEN: 0, ODD: 0, EVEN: 0, numbers: {} });
    const sumBets = bets => ['RED', 'BLACK', 'GREEN', 'ODD', 'EVEN'].reduce((s, k) => s + bets[k], 0)
        + Object.values(bets.numbers).reduce((s, v) => s + v, 0);
    const integer = (n, max = MAX) => Number.isSafeInteger(n) && n >= 0 && n <= max;
    const cards = Object.freeze({
        seven: Object.freeze({ name: '保底 777', factor: 60, multiplier: 50, reels: [0, 6, 0], symbol: '7 7 7' }),
        diamonds: Object.freeze({ name: '保底三钻石', factor: 30, multiplier: 25, reels: [3, 11, 3], symbol: '💎 💎 💎' }),
        bars: Object.freeze({ name: '保底三 BAR', factor: 24, multiplier: 20, reels: [5, 5, 5], symbol: 'BAR BAR BAR' })
    });
    const economyDefaults = () => ({ sharkDebt: 0, bankRounds: 0, sharkRounds: 0, cards: [], armedCardId: null });
    function validEconomy(user) {
        return integer(user.sharkDebt) && integer(user.bankRounds, 9) && integer(user.sharkRounds, 9)
            && Array.isArray(user.cards) && user.cards.length <= 50
            && user.cards.every(card => card && typeof card.id === 'string' && Object.hasOwn(cards, card.type)
                && integer(card.stake, 1000000) && card.stake > 0)
            && new Set(user.cards.map(card => card.id)).size === user.cards.length
            && (user.armedCardId === null || user.cards.some(card => card.id === user.armedCardId));
    }
    function validateBets(bets) {
        return bets && ['RED', 'BLACK', 'GREEN', 'ODD', 'EVEN'].every(k => integer(bets[k]))
            && bets.numbers && typeof bets.numbers === 'object' && !Array.isArray(bets.numbers)
            && Object.entries(bets.numbers).every(([k, v]) => /^(?:[0-9]|1[0-9]|2[0-3])$/.test(k) && integer(v))
            && integer(sumBets(bets));
    }
    function profile(id, name) {
        return { id, name, balance: 1000, debt: 0, bets: emptyBets(), lastBets: null, history: [], pendingRoulette: false, ...economyDefaults() };
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
                    if (Array.isArray(saved.users)) saved.users = saved.users.map(user => ({ ...economyDefaults(), ...user }));
                    if (saved.version !== 1 || !Array.isArray(saved.users) || saved.users.length < 1 || saved.users.length > 12
                        || !Array.isArray(saved.ledger) || !saved.users.some(u => u.id === saved.activeId)
                        || new Set(saved.users.map(u => u.id)).size !== saved.users.length
                        || !saved.users.every(u => typeof u.id === 'string' && typeof u.name === 'string'
                            && u.name.trim().length > 0 && u.name.length <= 24 && Number.isSafeInteger(u.balance) && Math.abs(u.balance) <= MAX
                            && integer(u.debt) && validEconomy(u) && validateBets(u.bets)
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
        get availableCredit() { return Math.max(0, LIMIT - this.active.debt); }
        get availableSharkCredit() { return Math.max(0, SHARK_LIMIT - this.active.sharkDebt); }
        get canBorrowShark() { return !this.lock && this.availableCredit === 0 && this.active.balance <= 0 && sumBets(this.active.bets) === 0 && this.availableSharkCredit > 0; }
        get armedCard() { return this.active.cards.find(card => card.id === this.active.armedCardId) || null; }
        ensureIdle() {
            if (this.lock) throw new Error('Wait for the current spin to finish.');
        }
        amount(value, maximum = 1000000) {
            if (!Number.isSafeInteger(value) || value <= 0 || value > maximum) throw new Error('Enter a whole number from 1 to ' + maximum.toLocaleString() + '.');
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
            const n = this.amount(value, MAX), u = this.active;
            if (n > u.debt) throw new Error('That amount is greater than your outstanding debt.');
            if (n > u.balance) throw new Error('Your wallet does not have enough chips to repay that amount.');
            u.balance -= n;
            u.debt -= n;
            if (u.debt === 0) u.bankRounds = 0;
            this.record(`${u.name} → Bank: repaid ${n.toLocaleString()} chips.`);
            this.save();
        }
        borrowShark(value) {
            this.ensureIdle();
            const n = this.amount(value, SHARK_LIMIT), user = this.active;
            if (!this.canBorrowShark) throw new Error('高利贷仅在银行额度耗尽、钱包 ≤ 0 且没有未结算下注时开放。');
            if (n > this.availableSharkCredit) throw new Error('高利贷剩余额度不足。');
            user.balance += n; user.sharkDebt += n;
            this.record(`高利贷 → ${user.name}: 借入 ${n.toLocaleString()}；每 10 局计息 10%。`);
            this.save();
        }
        repayShark(value) {
            this.ensureIdle();
            const n = this.amount(value, MAX), user = this.active;
            if (n > user.sharkDebt) throw new Error('还款不能超过高利贷欠款。');
            if (n > user.balance) throw new Error('钱包余额不足以还款。');
            user.balance -= n; user.sharkDebt -= n;
            if (user.sharkDebt === 0) user.sharkRounds = 0;
            this.record(`${user.name} → 高利贷: 偿还 ${n.toLocaleString()}。`);
            this.save();
        }
        completeRound() {
            const user = this.active;
            for (const [debt, rounds, rate, label] of [['debt', 'bankRounds', .01, '银行'], ['sharkDebt', 'sharkRounds', .10, '高利贷']]) {
                if (user[debt] <= 0) { user[rounds] = 0; continue; }
                user[rounds]++;
                if (user[rounds] < INTEREST_ROUNDS) continue;
                user[rounds] = 0;
                const interest = Math.min(MAX - user[debt], Math.ceil(user[debt] * rate));
                user[debt] += interest;
                this.record(`${user.name} · ${label}利息 +${interest.toLocaleString()}；欠款 ${user[debt].toLocaleString()}。`);
            }
        }
        buyCard(type, value) {
            this.ensureIdle();
            const item = Object.hasOwn(cards, type) ? cards[type] : null;
            if (!item) throw new Error('请选择有效的黑市卡。');
            const stake = this.amount(value), price = stake * item.factor, user = this.active;
            if (user.cards.length >= 50) throw new Error('最多持有 50 张卡，请先使用已有卡。');
            if (price + stake > user.balance) throw new Error('余额不足：需支付卡价，并留足一次绑定下注的筹码。');
            const card = { id: root.crypto.randomUUID(), type, stake };
            user.balance -= price; user.cards.push(card);
            this.record(`${user.name} · 黑市购买${item.name}，价格 ${price.toLocaleString()}，绑定下注 ${stake.toLocaleString()}。`);
            this.save(); return card;
        }
        armCard(id) {
            this.ensureIdle();
            const card = this.active.cards.find(item => item.id === id);
            if (id !== null && !card) throw new Error('你没有这张卡。');
            if (card && card.stake > this.active.balance) throw new Error('余额不足以支付该卡绑定的下注。');
            this.active.armedCardId = id;
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
        spinSlots(value, forcedIndices = null, { allIn = false } = {}) {
            this.ensureIdle();
            const n = this.amount(value), u = this.active;
            const card = this.armedCard;
            if (card && n !== card.stake) throw new Error('已装备卡绑定下注 ' + card.stake.toLocaleString() + '，请取消装备后更改。');
            if (allIn && n !== u.balance) throw new Error('All In must wager your whole wallet.');
            if (n > u.balance) throw new Error('Your wallet does not have enough chips for this spin.');
            if (u.balance + n * 49 > MAX) throw new Error('Your wallet is too close to its chip limit.');
            const reels = card ? cards[card.type].reels : forcedIndices === null ? Array.from({ length: 3 }, () => {
                const roll = this.random();
                if (!(roll >= 0 && roll < 1)) throw new Error('Could not generate a valid spin. Try again.');
                return Math.floor(roll * reelStrip.length);
            }) : forcedIndices;
            const result = this.slotResult(reels, n);
            u.balance += result.net;
            if (card) {
                u.cards = u.cards.filter(item => item.id !== card.id); u.armedCardId = null;
                result.cardName = cards[card.type].name;
                this.record(`${u.name} · 已消耗${result.cardName}，绑定下注 ${n.toLocaleString()}。`);
            }
            this.record(`${u.name} · 777${forcedIndices === null ? '' : ' (forced jackpot)'}: wager ${n.toLocaleString()}, payout ${result.payout.toLocaleString()} (${result.symbols.map(i => symbols[i]).join(' / ')}).`);
            this.completeRound();
            this.lock = 'slots';
            this.save();
            return result;
        }
    }
    CasinoEngine.symbols = symbols;
    CasinoEngine.triples = triples;
    CasinoEngine.reelStrip = reelStrip;
    CasinoEngine.creditLimit = LIMIT;
    CasinoEngine.sharkLimit = SHARK_LIMIT;
    CasinoEngine.cards = cards;
    CasinoEngine.emptyBets = emptyBets;
    CasinoEngine.sumBets = sumBets;
    CasinoEngine.storageKey = KEY;
    root.CasinoEngine = CasinoEngine;
})(globalThis);
