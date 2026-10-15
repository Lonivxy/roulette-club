/* Shared play-chip accounting. Kept independent of the rendering code. */
(function (root) {
    'use strict';
    const KEY = 'roulette-club-v1';
    const LIMIT = 100000;
    const SHARK_LIMIT = 1500000;
    const BANK_PERIOD = 10 * 60000, SHARK_PERIOD = 3 * 60000, MARKET_COOLDOWN = 15 * 60000;
    const INTEREST_POLICY = 2;
    const MAX = 1000000000;
    const symbols = ['7', '💎', 'BAR', '🔔', '🍀', '🍒'];
    const triples = [50, 25, 20, 15, 10, 5];
    const reelStrip = [0, 5, 3, 1, 4, 2, 0, 5, 4, 3, 5, 1];
    const emptyBets = () => ({ RED: 0, BLACK: 0, GREEN: 0, ODD: 0, EVEN: 0, numbers: {} });
    const sumBets = bets => ['RED', 'BLACK', 'GREEN', 'ODD', 'EVEN'].reduce((s, k) => s + bets[k], 0)
        + Object.values(bets.numbers).reduce((s, v) => s + v, 0);
    const integer = (n, max = MAX) => Number.isSafeInteger(n) && n >= 0 && n <= max;
    const cards = Object.freeze({
        seven: Object.freeze({ name: '保底 777', factor: 35, multiplier: 50, reels: [0, 6, 0], symbol: '7 7 7' }),
        diamonds: Object.freeze({ name: '保底三钻石', factor: 18, multiplier: 25, reels: [3, 11, 3], symbol: '💎 💎 💎' }),
        bars: Object.freeze({ name: '保底三 BAR', factor: 14, multiplier: 20, reels: [5, 5, 5], symbol: 'BAR BAR BAR' })
    });
    const economyDefaults = () => ({ sharkDebt: 0, bankInterestAt: null, sharkInterestAt: null, marketAvailableAt: 0, cards: [], armedCardId: null });
    const timestamp = value => value === null || (Number.isSafeInteger(value) && value >= 0);
    function growDebt(balance, rateBps, periods) {
        if (rateBps === 0) return balance;
        for (let i = 0; i < periods && balance < MAX; i++) balance = Math.min(MAX, balance + Math.ceil(balance * rateBps / 10000));
        return balance;
    }
    function validEconomy(user) {
        return integer(user.sharkDebt) && timestamp(user.bankInterestAt) && timestamp(user.sharkInterestAt) && timestamp(user.marketAvailableAt)
            && (user.recovery == null || (typeof user.recovery === 'object' && integer(user.recovery.deficit)))
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
        constructor(storage, random, clock = () => Date.now(), { recoverRoulette = true } = {}) {
            this.storage = storage;
            this.now = clock;
            this.random = random || (() => {
                const a = new Uint32Array(1);
                root.crypto.getRandomValues(a);
                return a[0] / 4294967296;
            });
            this.lock = null;
            this.storageWarning = '';
            this.data = { version: 1, activeId: 'alex', users: [profile('alex', 'Alex'), profile('jamie', 'Jamie'), profile('taylor', 'Taylor')], ledger: [], loans: [] };
            try {
                const raw = storage && storage.getItem(KEY);
                if (raw) {
                    const saved = JSON.parse(raw);
                    if (Array.isArray(saved.users)) saved.users = saved.users.map(user => ({ ...economyDefaults(), ...user }));
                    saved.loans ??= [];
                    if (saved.version !== 1 || !Array.isArray(saved.users) || saved.users.length < 1
                        || !Array.isArray(saved.ledger) || !Array.isArray(saved.loans) || saved.loans.length > 200 || !saved.loans.every(loan => this.validLoan(loan, saved.users)) || new Set(saved.loans.map(loan => loan.id)).size !== saved.loans.length || !saved.users.some(u => u.id === saved.activeId)
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
                        delete u.bankRounds; delete u.sharkRounds;
                        u.history = u.history.filter(h => h && integer(h.num, 23) && ['GREEN', 'RED', 'BLACK'].includes(h.colorTag)).slice(0, 10);
                        if (u.pendingRoulette && recoverRoulette) {
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
            this.accrueInterest();
            for (const user of this.data.users) this.prepareRecovery(user);
            this.save();
        }
        get active() { return this.data.users.find(u => u.id === this.data.activeId); }
        get availableCredit() { return Math.max(0, LIMIT - this.active.debt); }
        get availableSharkCredit() { return Math.max(0, SHARK_LIMIT - this.active.sharkDebt); }
        get canBorrowShark() { return !this.lock && !this.active.recovery && this.availableCredit === 0 && this.active.balance <= 0 && sumBets(this.active.bets) === 0 && this.availableSharkCredit > 0; }
        get armedCard() { return this.active.cards.find(card => card.id === this.active.armedCardId) || null; }
        prepareRecovery(user = this.active) {
            if (!user || user.recovery || user.balance > 0 || !(user.sharkDebt > 0)
                || sumBets(user.bets) || user.pendingRoulette || (user.blackjack && user.blackjack.phase !== 'settled')) return false;
            user.recovery = { deficit: Math.max(0, -user.balance) }; user.balance = 10;
            this.record(`${user.name} · 高利贷筹码已用尽，进入负数模式：-${user.recovery.deficit.toLocaleString()}，每局可用 10。`);
            return true;
        }
        ensureCashWallet(user = this.active) {
            if (user.recovery) throw new Error('负数模式的 10 筹码仅用于游戏，不能赠送、出借、购买或还款。盈利先抵扣负数。');
        }
        recoveryNet(user, net) {
            const remaining = user.recovery.deficit - net;
            if (net > 0 && remaining <= 0) { user.recovery = null; user.balance = 10 - remaining; }
            else { user.recovery.deficit = Math.min(MAX, Math.max(0, remaining)); user.balance = 10; }
        }
        credit(user, amount) {
            if (user.recovery) this.recoveryNet(user, amount);
            else user.balance += amount;
        }
        ensureIdle() {
            if (this.lock) throw new Error('Wait for the current spin to finish.');
            if (this.accrueInterest()) this.save();
        }
        amount(value, maximum = 1000000) {
            if (!Number.isSafeInteger(value) || value <= 0 || value > maximum) throw new Error('Enter a whole number from 1 to ' + maximum.toLocaleString() + '.');
            return value;
        }
        save() {
            this.accrueInterest();
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
            if (this.data.users.some(u => u.name.toLowerCase() === name.toLowerCase())) throw new Error('That player name is already taken.');
            const u = profile(root.crypto.randomUUID(), name);
            this.data.users.push(u);
            this.data.activeId = u.id;
            this.record(`${name} joined with 1,000 starter chips.`);
            this.save();
            return u;
        }
        validLoan(loan, users) {
            return loan && typeof loan.id === 'string' && typeof loan.lenderId === 'string' && typeof loan.borrowerId === 'string'
                && loan.lenderId !== loan.borrowerId && typeof loan.lenderName === 'string' && typeof loan.borrowerName === 'string'
                && integer(loan.principal, 1000000) && loan.principal > 0 && integer(loan.balance)
                && integer(loan.rateBps, 10000) && integer(loan.periodMs, 1440 * 60000) && loan.periodMs >= 60000 && loan.periodMs % 60000 === 0
                && timestamp(loan.createdAt) && timestamp(loan.interestAt)
                && ['pending', 'active', 'declined', 'cancelled', 'repaid'].includes(loan.status)
                && (!['pending', 'active'].includes(loan.status) || [loan.lenderId, loan.borrowerId].every(id => users.some(user => user.id === id)))
                && (loan.status !== 'active' || (loan.interestAt !== null && loan.balance > 0));
        }
        offerLoan(borrowerId, value, ratePercent, minutes = 10) {
            this.ensureIdle();
            this.ensureCashWallet();
            const lender = this.active, borrower = this.data.users.find(user => user.id === borrowerId), principal = this.amount(value);
            if (!borrower || borrower === lender) throw new Error('请选择另一位借款玩家。');
            const rateBps = Math.round(ratePercent * 100);
            if (!Number.isFinite(ratePercent) || !integer(rateBps, 10000) || Math.abs(ratePercent * 100 - rateBps) > .000001) throw new Error('利率需为 0–100%，最多两位小数。');
            if (!integer(minutes, 1440) || minutes < 1) throw new Error('计息周期需为 1–1,440 分钟。');
            if (principal > lender.balance) throw new Error('出借人的余额不足。');
            this.data.loans = this.data.loans.filter(loan => ['pending', 'active'].includes(loan.status) || this.data.loans.indexOf(loan) < 100);
            if (this.data.loans.length >= 200) throw new Error('借款协议数量已达上限，请先处理待确认协议。');
            const loan = { id: root.crypto.randomUUID(), lenderId: lender.id, borrowerId, lenderName: lender.name, borrowerName: borrower.name,
                principal, balance: principal, rateBps, periodMs: minutes * 60000, status: 'pending', createdAt: this.now(), interestAt: null };
            this.data.loans.unshift(loan);
            this.record(`${lender.name} → ${borrower.name}: 发起借款协议 ${principal.toLocaleString()}，每 ${minutes} 分钟 ${ratePercent}%，等待借款人确认。`);
            this.save(); return loan;
        }
        respondLoan(id, accept) {
            this.ensureIdle();
            const loan = this.data.loans.find(item => item.id === id);
            if (!loan || loan.status !== 'pending' || loan.borrowerId !== this.active.id) throw new Error('只有借款人能确认这份待处理协议。');
            if (!accept) { loan.status = 'declined'; this.record(`${loan.borrowerName} 拒绝了 ${loan.lenderName} 的借款协议。`); this.save(); return; }
            const lender = this.data.users.find(user => user.id === loan.lenderId), borrower = this.active;
            this.ensureCashWallet(borrower); if (lender) this.ensureCashWallet(lender);
            if (!lender || lender.balance < loan.principal) throw new Error('出借人当前余额不足，尚未扣款。');
            if (borrower.balance + loan.principal > MAX) throw new Error('借款人钱包已接近上限。');
            lender.balance -= loan.principal; borrower.balance += loan.principal;
            loan.status = 'active'; loan.interestAt = this.now();
            this.record(`${loan.borrowerName} 已接受协议，${loan.lenderName} 转入 ${loan.principal.toLocaleString()}。`);
            this.save();
        }
        cancelLoan(id) {
            this.ensureIdle();
            const loan = this.data.loans.find(item => item.id === id);
            if (!loan || loan.status !== 'pending' || loan.lenderId !== this.active.id) throw new Error('只能撤销自己发起的待确认协议。');
            loan.status = 'cancelled'; this.record(`${loan.lenderName} 撤销了给 ${loan.borrowerName} 的借款协议。`); this.save();
        }
        repayLoan(id, value) {
            this.ensureIdle();
            this.ensureCashWallet();
            const loan = this.data.loans.find(item => item.id === id);
            if (!loan || loan.status !== 'active' || loan.borrowerId !== this.active.id) throw new Error('只能偿还自己的有效借款。');
            const amount = this.amount(value === 'all' ? loan.balance : value, MAX);
            const lender = this.data.users.find(user => user.id === loan.lenderId), borrower = this.active;
            if (amount > loan.balance || amount > borrower.balance) throw new Error('还款超过欠款或钱包余额。');
            if (!lender || lender.balance + amount > MAX) throw new Error('出借人钱包已接近上限。');
            borrower.balance -= amount; this.credit(lender, amount); loan.balance -= amount;
            if (loan.balance === 0) { loan.status = 'repaid'; loan.interestAt = null; }
            this.record(`${borrower.name} → ${lender.name}: 偿还玩家借款 ${amount.toLocaleString()}。`); this.save();
        }
        deletePlayer(id) {
            this.ensureIdle();
            const user = this.data.users.find(item => item.id === id);
            if (!user) throw new Error('该玩家不存在。');
            if (this.data.users.length === 1) throw new Error('至少保留一名玩家。');
            if (user.debt || user.sharkDebt || user.recovery?.deficit || sumBets(user.bets) || user.pendingRoulette || (user.blackjack && user.blackjack.phase !== 'settled')
                || this.data.loans.some(loan => ['pending', 'active'].includes(loan.status) && [loan.lenderId, loan.borrowerId].includes(id))) throw new Error('请先结清欠款、借出款、待确认协议和游戏下注，再删除玩家。');
            this.data.users = this.data.users.filter(item => item.id !== id);
            if (this.data.activeId === id) this.data.activeId = this.data.users[0].id;
            this.record(`已删除玩家 ${user.name}，其钱包和卡包已移除。`); this.save();
        }
        adminAdjust(id, mode, value, reason = '') {
            this.ensureIdle();
            const user = this.data.users.find(item => item.id === id), amount = this.amount(value, MAX);
            if (!user || !['add', 'remove'].includes(mode)) throw new Error('请选择玩家及有效的调整方式。');
            if (typeof reason !== 'string' || reason.length > 120) throw new Error('备注最多 120 个字符。');
            const delta = mode === 'add' ? amount : -amount;
            if (user.recovery) {
                if (mode === 'remove' && user.recovery.deficit + amount > MAX) throw new Error('负数记录已接近上限。');
                if (mode === 'add' && amount - user.recovery.deficit + 10 > MAX) throw new Error('钱包已接近上限。');
                this.recoveryNet(user, delta);
            } else {
                if (user.balance + delta > MAX || user.balance + delta < 0) throw new Error('调整后余额必须在 0–1,000,000,000 之间。');
                user.balance += delta;
            }
            this.record(`管理员 · ${user.name} ${mode === 'add' ? '增加' : '扣除'} ${amount.toLocaleString()} 筹码${reason.trim() ? ' · ' + reason.trim() : ''}。`);
            this.save();
        }
        transfer(id, value) {
            this.ensureIdle();
            this.ensureCashWallet();
            const n = this.amount(value), from = this.active;
            const to = this.data.users.find(u => u.id === id);
            if (!to || to === from) throw new Error('Choose another player to receive the chips.');
            if (n > from.balance) throw new Error('Your wallet does not have enough chips.');
            if (to.balance + n > MAX) throw new Error('The receiving wallet has reached its chip limit.');
            from.balance -= n;
            this.credit(to, n);
            this.record(`${from.name} → ${to.name}: ${n.toLocaleString()} chips transferred.`);
            this.save();
        }
        borrow(value) {
            this.ensureIdle();
            this.ensureCashWallet();
            const n = this.amount(value), u = this.active;
            if (n > this.availableCredit) throw new Error(`You can borrow up to ${this.availableCredit.toLocaleString()} more chips.`);
            if (u.balance + n > MAX) throw new Error('Your wallet has reached its chip limit.');
            u.balance += n;
            if (u.debt === 0) { u.bankInterestAt = this.now(); u.bankInterestPolicy = INTEREST_POLICY; }
            u.debt += n;
            this.record(`Bank → ${u.name}: borrowed ${n.toLocaleString()} chips.`);
            this.save();
        }
        repay(value) {
            this.ensureIdle();
            this.ensureCashWallet();
            const u = this.active, n = this.amount(value === 'all' ? u.debt : value, MAX);
            if (n > u.debt) throw new Error('That amount is greater than your outstanding debt.');
            if (n > u.balance) throw new Error('Your wallet does not have enough chips to repay that amount.');
            u.balance -= n;
            u.debt -= n;
            if (u.debt === 0) u.bankInterestAt = null;
            this.record(`${u.name} → Bank: repaid ${n.toLocaleString()} chips.`);
            this.save();
        }
        borrowShark(value) {
            this.ensureIdle();
            const n = this.amount(value, SHARK_LIMIT), user = this.active;
            if (!this.canBorrowShark) throw new Error('高利贷仅在银行额度耗尽、钱包 ≤ 0 且没有未结算下注时开放。');
            if (n > this.availableSharkCredit) throw new Error('高利贷剩余额度不足。');
            if (user.sharkDebt === 0) { user.sharkInterestAt = this.now(); user.sharkInterestPolicy = INTEREST_POLICY; }
            user.balance += n; user.sharkDebt += n;
            this.record(`高利贷 → ${user.name}: 借入 ${n.toLocaleString()}；每 3 分钟计息 125%。`);
            this.save();
        }
        repayShark(value) {
            this.ensureIdle();
            this.ensureCashWallet();
            const user = this.active, n = this.amount(value === 'all' ? user.sharkDebt : value, MAX);
            if (n > user.sharkDebt) throw new Error('还款不能超过高利贷欠款。');
            if (n > user.balance) throw new Error('钱包余额不足以还款。');
            user.balance -= n; user.sharkDebt -= n;
            if (user.sharkDebt === 0) user.sharkInterestAt = null;
            this.record(`${user.name} → 高利贷: 偿还 ${n.toLocaleString()}。`);
            this.save();
        }
        repayAll(kind, id) {
            if (kind === 'bank') return this.repay('all');
            if (kind === 'shark') return this.repayShark('all');
            if (kind === 'peer') return this.repayLoan(id, 'all');
            throw new Error('请选择银行、高利贷或一笔玩家借款。');
        }
        projectDebts(minutes, id = this.active.id) {
            if (!integer(minutes, 1440)) throw new Error('预览时间需为 0–1,440 分钟。');
            const user = this.data.users.find(person => person.id === id);
            if (!user) throw new Error('请选择有效玩家。');
            const now = this.now(), until = now + minutes * 60000;
            const projected = (debt, clock, period, rate) => growDebt(debt, rate, Math.max(0, Math.floor((until - (clock ?? now)) / period)));
            const bank = projected(user.debt, user.bankInterestAt, BANK_PERIOD, 1500);
            const shark = projected(user.sharkDebt, user.sharkInterestAt, SHARK_PERIOD, 12500);
            const peer = this.data.loans.filter(loan => loan.status === 'active' && loan.borrowerId === id)
                .reduce((total, loan) => total + projected(loan.balance, loan.interestAt, loan.periodMs, loan.rateBps), 0);
            const negative = user.recovery?.deficit || 0;
            return { bank, shark, peer, negative, total: bank + shark + peer + negative };
        }
        completeRound(net = 0) {
            this.accrueInterest();
            const user = this.active;
            if (user.recovery) {
                this.recoveryNet(user, net);
                this.record(`${user.name} · 负数模式净输赢 ${net >= 0 ? '+' : ''}${net.toLocaleString()}；${user.recovery ? '记录 -' + user.recovery.deficit.toLocaleString() + '，下一局可用 10' : '已还清负数，恢复正常余额 ' + user.balance.toLocaleString()}。`);
            } else this.prepareRecovery(user);
        }
        accrueInterest() {
            const now = this.now(); let changed = false;
            const accrue = (target, debt, clock, period, rate, label) => {
                if (target[debt] <= 0) { if (target[clock] !== null) { target[clock] = null; changed = true; } return; }
                if (target[clock] === null) { target[clock] = now; changed = true; return; }
                const periods = Math.floor((now - target[clock]) / period);
                if (periods <= 0) return;
                const before = target[debt]; target[debt] = growDebt(before, rate, periods);
                target[clock] += periods * period; changed = true;
                if (target[debt] !== before) this.record(`${label} · ${periods} 期利息 +${(target[debt] - before).toLocaleString()}，欠款 ${target[debt].toLocaleString()}。`);
            };
            const account = (user, debt, clock, policy, period, rate, oldPeriod, oldRate, label) => {
                if (user[debt] > 0 && user[policy] !== INTEREST_POLICY) {
                    // Settle completed old periods once before starting the new schedule.
                    accrue(user, debt, clock, oldPeriod, oldRate, label);
                    user[policy] = INTEREST_POLICY;
                    user[clock] = Math.max(now, user[clock] ?? now);
                    changed = true;
                }
                accrue(user, debt, clock, period, rate, label);
            };
            for (const user of this.data.users) {
                account(user, 'debt', 'bankInterestAt', 'bankInterestPolicy', BANK_PERIOD, 1500, 30 * 60000, 50, user.name + ' · 银行');
                account(user, 'sharkDebt', 'sharkInterestAt', 'sharkInterestPolicy', SHARK_PERIOD, 12500, 5 * 60000, 1000, user.name + ' · 高利贷');
            }
            for (const loan of this.data.loans) if (loan.status === 'active') accrue(loan, 'balance', 'interestAt', loan.periodMs, loan.rateBps, loan.borrowerName + ' → ' + loan.lenderName);
            return changed;
        }
        buyCard(type, value) {
            this.ensureIdle();
            this.ensureCashWallet();
            const item = Object.hasOwn(cards, type) ? cards[type] : null;
            if (!item) throw new Error('请选择有效的黑市卡。');
            const stake = this.amount(value), price = stake * item.factor, user = this.active;
            if (this.now() < user.marketAvailableAt) throw new Error('黑市进货中，请等待购买冷却结束。');
            if (user.cards.length >= 50) throw new Error('最多持有 50 张卡，请先使用已有卡。');
            if (price + stake > user.balance) throw new Error('余额不足：需支付卡价，并留足一次绑定下注的筹码。');
            const card = { id: root.crypto.randomUUID(), type, stake };
            user.balance -= price; user.cards.push(card);
            user.marketAvailableAt = this.now() + MARKET_COOLDOWN;
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
        playPlinko(value, risk = 'medium', lane = 'center', { jackpot = false } = {}) {
            this.ensureIdle();const n=this.amount(value),user=this.active;
            const {table}=root.CasinoArcade.plinkoSettings(risk,lane);
            if(n>user.balance)throw new Error('钱包余额不足，请降低下注或前往银行。');
            if(user.balance+n*(Math.max(...table)/100-1)>MAX)throw new Error('钱包已接近上限，请降低下注。');
            return this.finishArcade(root.CasinoArcade.plinko(n,risk,lane,this.random,jackpot),'Plinko');
        }
        playDice(value, kind = 'small', target = null, { jackpot = false } = {}) {
            this.ensureIdle();const n=this.amount(value),user=this.active,multiplier=root.CasinoArcade.diceSettings(kind,target);
            if(n>user.balance)throw new Error('钱包余额不足，请降低下注或前往银行。');
            if(user.balance+n*(multiplier-1)>MAX)throw new Error('钱包已接近上限，请降低下注。');
            return this.finishArcade(root.CasinoArcade.dice(n,kind,target,this.random,jackpot),'骰宝');
        }
        finishArcade(result,label) {
            const user=this.active;result.id=root.crypto.randomUUID();result.time=new Date(this.now()).toISOString();result.walletAfterWager=user.balance-result.wager;
            user.balance+=result.net;
            user.arcadeHistory=[result,...(Array.isArray(user.arcadeHistory)?user.arcadeHistory.filter(root.CasinoArcade.validHistory):[])].slice(0,30);
            this.record(`${user.name} · ${label}${result.game==='dice'?' '+result.dice.join(' · '):' '+result.risk+' / '+result.lane}: 下注 ${result.wager.toLocaleString()}，返还 ${result.payout.toLocaleString()}，净输赢 ${result.net>=0?'+':''}${result.net.toLocaleString()}。`);
            this.completeRound(result.net);this.lock=result.game;this.save();return result;
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
        spinSlots(value, forcedIndices = null, { allIn = false, jackpot = false } = {}) {
            this.ensureIdle();
            const n = this.amount(value), u = this.active;
            const card = jackpot ? null : this.armedCard;
            if (card && n !== card.stake) throw new Error('已装备卡绑定下注 ' + card.stake.toLocaleString() + '，请取消装备后更改。');
            if (allIn && n !== u.balance) throw new Error('All In must wager your whole wallet.');
            if (n > u.balance) throw new Error('Your wallet does not have enough chips for this spin.');
            if (u.balance + n * 49 > MAX) throw new Error('Your wallet is too close to its chip limit.');
            const reels = jackpot ? [0, 6, 0] : card ? cards[card.type].reels : forcedIndices === null ? Array.from({ length: 3 }, () => {
                const roll = this.random();
                if (!(roll >= 0 && roll < 1)) throw new Error('Could not generate a valid spin. Try again.');
                return Math.floor(roll * reelStrip.length);
            }) : forcedIndices;
            const result = this.slotResult(reels, n);
            result.walletAfterWager = u.balance - n;
            u.balance += result.net;
            if (card) {
                u.cards = u.cards.filter(item => item.id !== card.id); u.armedCardId = null;
                result.cardName = cards[card.type].name;
                this.record(`${u.name} · 已消耗${result.cardName}，绑定下注 ${n.toLocaleString()}。`);
            }
            this.record(`${u.name} · 777${forcedIndices === null ? '' : ' (forced jackpot)'}: wager ${n.toLocaleString()}, payout ${result.payout.toLocaleString()} (${result.symbols.map(i => symbols[i]).join(' / ')}).`);
            this.completeRound(result.net);
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
