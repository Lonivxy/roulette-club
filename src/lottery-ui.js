function createLotteryGame(engine, callbacks) {
    'use strict';
    const $ = name => document.getElementById('lottery-' + name), rules = CasinoLottery, M = engine.money;
    const prices = [...document.querySelectorAll('[data-lottery-price]')], fmt = value => value.toLocaleString();
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false;
    let selected = rules.prices[0], visible = false, pending = false, animating = false, player = null, timer = null, runningId = null, visualBalance = null;
    function element(tag, text) { const node = document.createElement(tag); node.textContent = text; return node; }
    function describe(result) {
        return `票价 ${fmt(result.wager)} · ${result.multiplier}× · 返还 ${fmt(result.payout)} · 净输赢 ${result.net >= 0 ? '+' : ''}${fmt(result.net)}`;
    }
    function update() {
        if (player !== engine.active.id) { player = engine.active.id; selected = rules.prices[0]; $('status').textContent = '选择票价，准备开奖。'; }
        const locked = callbacks.locked() || pending || animating, affordable = engine.active.balance >= selected;
        prices.forEach(button => { button.disabled = locked; button.setAttribute('aria-pressed', String(Number(button.dataset.lotteryPrice) === selected)); });
        $('buy').disabled = locked || !affordable;
        $('buy').textContent = '购票并开奖 · ' + fmt(selected);
        $('cost').textContent = '本次票价 ' + fmt(selected) + ' 筹码 · 购票后立即结算';
        $('top-prize').textContent = fmt(M.mul(selected,100));
        $('odds').replaceChildren(...rules.tiers.map(item => {
            const row = document.createElement('tr'), probability = (item.weight * 100 / rules.total).toFixed(5).replace(/\.?0+$/, '');
            row.append(element('td', item.numerator / 2 + '×'), element('td', probability + '%'), element('td', fmt(M.ratio(selected,item.numerator,2)))); return row;
        }));
        $('theory').textContent = '理论平均返还率 ' + (rules.expectedNumerator * 100 / (rules.total * 2)).toFixed(4).replace(/\.?0+$/, '') + '% · 每张独立随机，结果不会因之前输赢改变。';
        const history = (Array.isArray(engine.active.lotteryHistory) ? engine.active.lotteryHistory : []).filter(rules.validHistory).slice(0,30);
        const drawing = pending || animating, latest = history[0];
        $('ticket').setAttribute('aria-busy', String(drawing));
        $('reveal').hidden = !animating;
        if (drawing) {
            $('ticket').dataset.state = 'drawing'; $('prize-name').textContent = '幸运正在揭晓'; $('multiplier').textContent = '开奖中…';
            $('result').textContent = '结果已提交，请稍候。'; $('ticket-id').textContent = '';
        } else if (latest) {
            $('ticket').dataset.state = latest.net > 0 ? 'profit' : latest.net < 0 ? 'loss' : 'even';
            $('prize-name').textContent = rules.tiers[latest.tier].name; $('multiplier').textContent = latest.multiplier + '×';
            $('result').textContent = describe(latest); $('ticket-id').textContent = '票号 ' + latest.id;
        } else {
            $('ticket').dataset.state = 'ready'; $('prize-name').textContent = '你的下一份幸运'; $('multiplier').textContent = '最高 100×';
            $('result').textContent = '所有票价使用相同中奖概率。'; $('ticket-id').textContent = '';
        }
        const recent = pending ? history.slice(1) : history.filter(result => result.id !== runningId);
        $('history').replaceChildren(...(recent.length ? recent.map(result => {
            const row = element('li', rules.tiers[result.tier].name + ' · ' + describe(result)); row.dataset.loss = String(result.net < 0);
            const time = element('time', new Date(result.time).toLocaleString()); time.dateTime = result.time; row.append(time); return row;
        }) : [element('li','还没有彩票记录。')]));
        if (!locked && !affordable) $('status').textContent = engine.active.recovery ? '负数模式每局只有 10 筹码，暂时无法购买最低 1,000 的彩票。' : '当前余额不足，请选择更低票价或前往银行。';
    }
    function reveal() {
        if (!animating) return;
        if (timer !== null) clearTimeout(timer); timer = null;
        animating = false; runningId = null; visualBalance = null; engine.lock = null;
        $('status').textContent = '开奖完成，奖金已自动计入当前玩家钱包。';
        update(); callbacks.changed();
    }
    async function buy(jackpot = false) {
        if (!visible || pending || animating || callbacks.locked()) return;
        if (selected > engine.active.balance) { callbacks.notify('钱包余额不足以购买这档彩票。',true); return; }
        pending = true; visualBalance = M.sub(engine.active.balance,selected); $('status').textContent = '正在购票，请稍候…'; update(); callbacks.changed();
        let result;
        try {
            result = await engine.buyLottery(selected,{jackpot}); pending = false; animating = true; runningId = result.id; engine.lock = 'lottery';
            $('status').textContent = '彩票已购买，即将揭晓…'; update(); callbacks.changed();
            if (reduced) reveal(); else timer = setTimeout(reveal,1800);
        } catch (error) {
            pending = false; animating = false; visualBalance = null; runningId = null;
            if (result) engine.lock = null;
            update(); callbacks.notify(result ? '本张彩票已结算，请查看彩票记录。' : error.message,true); callbacks.changed();
        }
    }
    prices.forEach(button => button.addEventListener('click', () => {
        if (callbacks.locked() || pending || animating) return;
        selected = rules.price(Number(button.dataset.lotteryPrice)); $('status').textContent = '已选择 ' + fmt(selected) + ' 筹码彩票。'; update();
    }));
    $('buy').addEventListener('click', () => buy()); $('reveal').addEventListener('click', reveal);
    window.addEventListener('keydown', event => {
        if (!visible || event.repeat || event.code !== 'Space' || event.ctrlKey || event.altKey || event.metaKey || event.shiftKey || event.target?.closest?.('input,select,textarea,button,[contenteditable]')) return;
        event.preventDefault(); event.stopImmediatePropagation(); if (animating) reveal(); else buy();
    });
    return {update, forceJackpot:() => buy(true), setVisible(value) { visible = value; update(); },
        get animating() { return pending || animating; }, get displayBalance() { return visualBalance; }};
}
