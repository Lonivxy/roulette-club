function createEconomyUI(engine, callbacks) {
    const $ = id => document.getElementById(id), fmt = n => n.toLocaleString();
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
        $('bank-borrow').disabled = locked || engine.availableCredit === 0;
        $('bank-interest-progress').textContent = user.debt > 0 ? `再完成 ${10 - user.bankRounds} 局计息：当前欠款的 1%，向上取整。` : '无欠款，不计息。';
        $('shark-panel').hidden = !engine.canBorrowShark && user.sharkDebt === 0;
        $('shark-offer').hidden = !engine.canBorrowShark;
        $('shark-repayment').hidden = user.sharkDebt === 0;
        $('shark-debt').textContent = fmt(user.sharkDebt);
        $('shark-credit').textContent = fmt(engine.availableSharkCredit);
        $('shark-progress').textContent = user.sharkDebt > 0 ? `再完成 ${10 - user.sharkRounds} 局，未还欠款加 10%（向上取整）。` : '每完成 10 局，未还欠款加 10%。';
        $('bank-total-debt').textContent = fmt(user.debt + user.sharkDebt);
        $('market-stake').disabled = locked;
        $('market-stake').setAttribute('aria-invalid', String(stake === null));
        $('market-catalog').replaceChildren(...Object.entries(CasinoEngine.cards).map(([type, item]) => {
            const card = element('article', '', 'club-card market-product');
            card.append(element('div', item.symbol, 'market-symbols'), element('h3', item.name));
            card.append(element('p', stake === null ? '请输入 1–1,000,000 的整数下注。' : `卡价 ${fmt(stake * item.factor)} · 使用时另扣 ${fmt(stake)}`, 'market-price'));
            card.append(element('p', stake === null ? '' : `保底返回 ${fmt(stake * item.multiplier)}（${item.multiplier}×，含下注）`, 'club-muted'));
            const button = element('button', '购买此卡', 'club-action'); button.type = 'button';
            button.disabled = locked || stake === null || user.cards.length >= 50 || (stake !== null && stake * (item.factor + 1) > user.balance);
            button.addEventListener('click', () => callbacks.transact(() => engine.buyCard(type, validStake()), '卡片已放入当前玩家的卡包。'));
            card.append(button); return card;
        }));
        const rows = user.cards.map(card => {
            const row = element('div', '', 'market-card-row'), armed = user.armedCardId === card.id;
            row.append(element('span', `${CasinoEngine.cards[card.type].name} · 绑定 ${fmt(card.stake)}${armed ? ' · 已装备' : ''}`));
            const button = element('button', armed ? '取消装备' : '装备并前往 777', 'club-action secondary');
            button.type = 'button'; button.disabled = locked || (!armed && card.stake > user.balance);
            button.addEventListener('click', () => {
                if (callbacks.transact(() => engine.armCard(armed ? null : card.id), armed ? '已取消装备。' : '已装备，下一次 777 旋转使用此卡。') && !armed) callbacks.playSlots();
            });
            row.append(button); return row;
        });
        $('market-inventory').replaceChildren(...(rows.length ? rows : [element('p', '卡包还是空的。', 'club-muted')]));
        const armed = engine.armedCard;
        $('lucky-armed-card').hidden = !armed;
        $('lucky-card-label').textContent = armed ? `${CasinoEngine.cards[armed.type].name} · 下一次下注 ${fmt(armed.stake)}` : '';
        $('lucky-card-cancel').disabled = locked;
    }
    $('market-stake').addEventListener('input', render);
    $('shark-borrow-form').addEventListener('submit', event => {
        event.preventDefault();
        if (callbacks.transact(() => engine.borrowShark(Number($('shark-borrow-amount').value)), '高利贷已到账，欠款及计息进度已保存。')) $('shark-borrow-form').reset();
    });
    $('shark-repay-form').addEventListener('submit', event => {
        event.preventDefault();
        if (callbacks.transact(() => engine.repayShark(Number($('shark-repay-amount').value)), '高利贷还款已入账。')) $('shark-repay-form').reset();
    });
    $('lucky-card-cancel').addEventListener('click', () => callbacks.transact(() => engine.armCard(null), '已取消装备。'));
    return { render };
}
