(function (root) {
    'use strict';
    const safe = BigInt(Number.MAX_SAFE_INTEGER);
    function big(value) {
        if (typeof value === 'bigint') return value;
        if (typeof value === 'number' && Number.isSafeInteger(value)) return BigInt(value);
        if (typeof value === 'string' && /^-?\d+$/.test(value.trim())) return BigInt(value.trim());
        throw new Error('请输入完整的整数筹码金额（至少 1），不支持小数或科学计数法。');
    }
    const normalize = value => value >= -safe && value <= safe ? Number(value) : value;
    const parse = value => normalize(big(value));
    const valid = value => typeof value === 'bigint' || (typeof value === 'number' && Number.isSafeInteger(value));
    const add = (...values) => normalize(values.reduce((sum, value) => sum + big(value), 0n));
    const sub = (a, b) => normalize(big(a) - big(b));
    const mul = (a, b) => normalize(big(a) * big(b));
    function ratio(value, numerator, denominator, ceiling = false) {
        const product = big(value) * big(numerator), divisor = big(denominator);
        if (product < 0n || divisor <= 0n) throw new Error('Invalid chip ratio.');
        return normalize((product + (ceiling && product ? divisor - 1n : 0n)) / divisor);
    }
    const compare = (a, b) => big(a) < big(b) ? -1 : big(a) > big(b) ? 1 : 0;
    const min = (a, b) => compare(a, b) <= 0 ? a : b;
    const max = (a, b) => compare(a, b) >= 0 ? a : b;
    function positive(value) {
        const result = parse(value);
        if (result <= 0) throw new Error('请输入至少 1 筹码的整数金额。');
        return result;
    }
    const revive = (_, value) => value && typeof value === 'object' && !Array.isArray(value)
        && Object.keys(value).length === 1 && typeof value.$chips === 'string' && /^-?\d+$/.test(value.$chips)
        ? parse(value.$chips) : value;
    const stringify = value => JSON.stringify(value, (_, item) => typeof item === 'bigint' ? {$chips:String(item)} : item);
    const decode = text => JSON.parse(text, revive);
    root.CasinoMoney = { parse, positive, valid, add, sub, mul, ratio, compare, min, max,
        abs:value => value < 0 ? sub(0,value) : value,
        tryParse:value => {try {return parse(value);} catch {return null;}},
        stringify, parseJSON:decode, hydrate:value => decode(stringify(value)) };
})(globalThis);
