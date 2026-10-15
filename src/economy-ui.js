function createEconomyUI(engine, callbacks) {
    const $ = id => document.getElementById(id), fmt = n => n.toLocaleString();
    let buyButtons = [];
    const remaining = ms => { const seconds = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0'); };
    function tick() {
        const user = engine.active, now = engine.now();
        $('bank-interest-progress').textContent = user.debt > 0 ? `下次计息 ${remaining(user.bankInterestAt + 10 * 60000 - now)} · 每 10 分钟 15%。` : '无欠款，不计息。';
        $('shark-progress').textContent = user.sharkDebt > 0 ? `下次计息 ${remaining(user.sharkInterestAt + 3 * 60000 - now)} · 每 3 分钟 125%。` : '每 3 分钟，未还欠款加 125%。';
        const cooling = now < user.marketAvailableAt;
        $('market-cooldown').textContent = cooling ? '商人进货中 · 下次购买还需 ' + remaining(user.marketAvailableAt - now) : '商人已到货 · 购买后冷却 15 分钟';
        buyButtons.forEach(({button, blocked}) => { button.disabled = blocked || cooling; });
    }
    function element(tag, text, className) {
        const node = document.createElement(tag); node.textContent = text;
        if (className) node.className = className;
        return node;
    }
    function validStake() {
        const n = Number($('market-stake').value);
        return Number.isSafeInteger(n) && n > 0 && n <= 1000000 ? n : null;
    }
    function render() {
        const user = engine.active, locked = callbacks.locked(), stake = validStake();
        $('bank-borrow').disabled = locked || Boolean(user.recovery) || engine.availableCredit === 0;
        $('shark-panel').hidden = !engine.canBorrowShark && user.sharkDebt === 0;
        $('shark-offer').hidden = !engine.canBorrowShark;
        $('shark-repayment').hidden = user.sharkDebt === 0;
        $('shark-debt').textContent = fmt(user.sharkDebt);
        $('shark-credit').textContent = fmt(engine.availableSharkCredit);
        $('bank-total-debt').textContent = fmt(user.debt + user.sharkDebt);
        $('market-stake').disabled = locked;
        $('market-stake').setAttribute('aria-invalid', String(stake === null));
        buyButtons = [];
        $('market-catalog').replaceChildren(...Object.entries(CasinoEngine.cards).map(([type, item]) => {
            const card = element('article', '', 'club-card market-product');
            card.append(element('div', item.symbol, 'market-symbols'), element('h3', item.name));
            card.append(element('p', stake === null ? '请输入 1–1,000,000 的整数下注。' : `卡价 ${fmt(stake * item.factor)} · 使用时另扣 ${fmt(stake)}`, 'market-price'));
            card.append(element('p', stake === null ? '' : `保底返回 ${fmt(stake * item.multiplier)} · 扣除卡价与下注后净赚 ${fmt(stake * (item.multiplier - item.factor - 1))}`, 'club-muted'));
            const button = element('button', '购买此卡', 'club-action'); button.type = 'button';
            button.disabled = locked || Boolean(user.recovery) || stake === null || user.cards.length >= 50 || (stake !== null && stake * (item.factor + 1) > user.balance);
            buyButtons.push({button, blocked: button.disabled});
            button.addEventListener('click', () => callbacks.transact(() => engine.buyCard(type, validStake()), '卡片已放入当前玩家的卡包。'));
            card.append(button); return card;
        }));
        const rows = user.cards.map(card => {
            const row = element('div', '', 'market-card-row'), armed = user.armedCardId === card.id;
            row.append(element('span', `${CasinoEngine.cards[card.type].name} · 绑定 ${fmt(card.stake)}${armed ? ' · 已装备' : ''}`));
            const button = element('button', armed ? '取消装备' : '装备并前往 777', 'club-action secondary');
            button.type = 'button'; button.disabled = locked || (!armed && card.stake > user.balance);
            button.addEventListener('click', async () => {
                if (await callbacks.transact(() => engine.armCard(armed ? null : card.id), armed ? '已取消装备。' : '已装备，下一次 777 旋转使用此卡。') && !armed) callbacks.playSlots();
            });
            row.append(button); return row;
        });
        $('market-inventory').replaceChildren(...(rows.length ? rows : [element('p', '卡包还是空的。', 'club-muted')]));
        const armed = engine.armedCard;
        $('lucky-armed-card').hidden = !armed;
        $('lucky-card-label').textContent = armed ? `${CasinoEngine.cards[armed.type].name} · 下一次下注 ${fmt(armed.stake)}` : '';
        $('lucky-card-cancel').disabled = locked;
        tick();
    }
    $('market-stake').addEventListener('input', render);
    $('shark-borrow-form').addEventListener('submit', async event => {
        event.preventDefault();
        if (await callbacks.transact(() => engine.borrowShark(Number($('shark-borrow-amount').value)), '高利贷已到账，欠款及计息进度已保存。')) $('shark-borrow-form').reset();
    });
    $('shark-repay-form').addEventListener('submit', async event => {
        event.preventDefault();
        if (await callbacks.transact(() => engine.repayShark(Number($('shark-repay-amount').value)), '高利贷还款已入账。')) $('shark-repay-form').reset();
    });
    $('lucky-card-cancel').addEventListener('click', () => callbacks.transact(() => engine.armCard(null), '已取消装备。'));
    return { render, tick };
}
