function createPlayerLoansUI(engine, callbacks) {
    const $ = id => document.getElementById(id), fmt = value => value.toLocaleString();
    const repaymentValues = new Map(); let clocks = [];
    const element = (tag, text, className) => { const node = document.createElement(tag); node.textContent = text; if (className) node.className = className; return node; };
    function button(text, action) {
        const node = element('button', text, 'club-action secondary'); node.type = 'button'; node.disabled = callbacks.locked(); node.addEventListener('click', action); return node;
    }
    function tick() {
        for (const {node, loan} of clocks) {
            const seconds = Math.max(0, Math.ceil((loan.interestAt + loan.periodMs - engine.now()) / 1000));
            node.textContent = `下次计息 ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2,'0')} · 当前欠款 ${fmt(loan.balance)}`;
        }
    }
    function render() {
        const user = engine.active, locked = callbacks.locked(), selected = $('peer-loan-user').value;
        const options = engine.data.users.filter(person => person.id !== user.id).map(person => { const option = element('option', person.name); option.value = person.id; return option; });
        $('peer-loan-user').replaceChildren(...options);
        if (options.some(option => option.value === selected)) $('peer-loan-user').value = selected;
        $('peer-loan-user').disabled = locked || !options.length;
        for (const name of ['amount','rate','minutes']) $('peer-loan-' + name).disabled = locked;
        $('players-greeting').textContent = user.name + ' · 玩家往来'; $('players-wallet').textContent = fmt(user.balance);
        const loans = engine.data.loans.filter(loan => [loan.lenderId, loan.borrowerId].includes(user.id));
        $('peer-debt').textContent = fmt(loans.filter(loan => loan.status === 'active' && loan.borrowerId === user.id).reduce((sum, loan) => sum + loan.balance,0));
        $('peer-receivable').textContent = fmt(loans.filter(loan => loan.status === 'active' && loan.lenderId === user.id).reduce((sum, loan) => sum + loan.balance,0));
        clocks = [];
        const rows = loans.slice(0, 100).map(loan => {
            const row = element('article', '', 'peer-loan-row'), actions = element('div', '', 'club-actions');
            const state = {pending:'待借款人确认',active:'借款中',declined:'已拒绝',cancelled:'已撤销',repaid:'已还清'}[loan.status];
            row.append(element('h4', loan.lenderName + ' → ' + loan.borrowerName + ' · ' + state));
            row.append(element('p', `本金 ${fmt(loan.principal)} · 每 ${loan.periodMs / 60000} 分钟 ${loan.rateBps / 100}% · 确认后按现实时间复利计息，离线也计息`, 'club-muted'));
            if (loan.status === 'pending') {
                if (loan.borrowerId === user.id) {
                    actions.append(button('接受条款并借入', () => callbacks.transact(() => engine.respondLoan(loan.id, true), '双方已同意，借款已到账。')),
                        button('拒绝', () => callbacks.transact(() => engine.respondLoan(loan.id, false), '已拒绝该协议。')));
                } else actions.append(button('撤销协议', () => callbacks.transact(() => engine.cancelLoan(loan.id), '已撤销协议。')));
            }
            if (loan.status === 'active') {
                const clock = element('p', '', 'club-muted'); row.append(clock); clocks.push({node:clock, loan});
                if (loan.borrowerId === user.id) {
                    const form = document.createElement('form'), input = document.createElement('input'), submit = element('button', '还给 ' + loan.lenderName, 'club-action');
                    form.className = 'peer-repay-form'; input.className = 'club-input'; input.type = 'number'; input.min = '1'; input.max = String(loan.balance); input.step = '1'; input.required = true;
                    input.setAttribute('aria-label', '偿还给 ' + loan.lenderName + ' 的金额'); input.value = repaymentValues.get(loan.id) ?? String(Math.max(1, Math.min(loan.balance, user.balance)));
                    input.disabled = locked || Boolean(user.recovery); submit.type = 'submit'; submit.disabled = locked || Boolean(user.recovery);
                    input.addEventListener('input', () => repaymentValues.set(loan.id, input.value));
                    form.addEventListener('submit', async event => { event.preventDefault(); callbacks.transact(() => engine.repayLoan(loan.id, Number(input.value)), '还款已进入出借人钱包。'); });
                    form.append(input, submit); row.append(form);
                    const all = button('一键还清这笔', () => callbacks.transact(() => engine.repayAll('peer', loan.id), '这笔玩家借款已全部还清。'));
                    all.disabled = locked || Boolean(user.recovery) || user.balance < loan.balance; actions.append(all);
                }
            }
            row.append(actions); return row;
        });
        $('peer-loan-list').replaceChildren(...(rows.length ? rows : [element('p','暂无借款协议。','club-muted')])); tick();
    }
    $('peer-loan-form').addEventListener('submit', async event => {
        event.preventDefault();
        if (await callbacks.transact(() => engine.offerLoan($('peer-loan-user').value, Number($('peer-loan-amount').value), Number($('peer-loan-rate').value), Number($('peer-loan-minutes').value)), '协议已发出，请切换到借款玩家确认。')) $('peer-loan-amount').value = '';
    });
    return { render, tick };
}
