(function (root) {
    'use strict';
    if (!root.CasinoMoney && typeof require === 'function') require('./money.js');
    const M = root.CasinoMoney, total = 10000000;
    const prices = Object.freeze([1000, 10000, 1000000]);
    // Ten million equally likely tickets represent every supplied percentage exactly.
    const tiers = Object.freeze([
        {weight:500, numerator:200, name:'特等奖'},
        {weight:2000, numerator:100, name:'一等奖'},
        {weight:30000, numerator:20, name:'二等奖'},
        {weight:60000, numerator:16, name:'三等奖'},
        {weight:120000, numerator:10, name:'四等奖'},
        {weight:250000, numerator:8, name:'五等奖'},
        {weight:350000, numerator:5, name:'六等奖'},
        {weight:450000, numerator:4, name:'七等奖'},
        {weight:750000, numerator:3, name:'八等奖'},
        {weight:2000000, numerator:2, name:'保本末等奖'},
        {weight:5987500, numerator:0, name:'未中奖'}
    ].map(Object.freeze));
    function price(value) {
        const amount = M.positive(value);
        if (!prices.includes(amount)) throw new Error('彩票票价只能选择 1,000、10,000 或 1,000,000 筹码。');
        return amount;
    }
    function fromTicket(value, ticket) {
        const wager = price(value);
        if (!Number.isInteger(ticket) || ticket < 0 || ticket >= total) throw new Error('彩票开奖结果无效。');
        let end = 0;
        const tier = tiers.findIndex(item => ticket < (end += item.weight)), item = tiers[tier];
        const payout = M.ratio(wager, item.numerator, 2);
        return {game:'lottery', ticket, tier, wager, multiplier:item.numerator / 2, payout, net:M.sub(payout,wager)};
    }
    function drawTicket(random) {
        // Rejection sampling avoids rounding/modulo bias for the rarest prizes.
        const range = 4294967296, limit = Math.floor(range / total) * total;
        for (let attempt = 0; attempt < 64; attempt++) {
            const roll = random();
            if (typeof roll !== 'number' || !(roll >= 0 && roll < 1)) throw new Error('无法生成有效彩票，请重试。');
            const value = Math.floor(roll * range);
            if (value < limit) return value % total;
        }
        throw new Error('无法生成有效彩票，请重试。');
    }
    function draw(value, random, jackpot = false) {
        const amount = price(value);
        return fromTicket(amount, jackpot ? 0 : drawTicket(random));
    }
    function validHistory(result) {
        try {
            if (!result || result.game !== 'lottery' || typeof result.id !== 'string' || typeof result.time !== 'string') return false;
            const expected = fromTicket(result.wager, result.ticket);
            return ['tier','multiplier','payout','net'].every(key => result[key] === expected[key]);
        } catch { return false; }
    }
    const expectedNumerator = tiers.reduce((sum,item) => sum + item.weight * item.numerator, 0);
    root.CasinoLottery = {prices, tiers, total, expectedNumerator, price, fromTicket, drawTicket, draw, validHistory};
})(globalThis);
