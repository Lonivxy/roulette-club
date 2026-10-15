(function(root) {
    'use strict';
    if (!root.CasinoMoney && typeof require === 'function') require('./money.js');
    const M = root.CasinoMoney;
    const normalize = value => String(value ?? '').normalize('NFKC').trim().toLocaleLowerCase();
    function summaries(data) {
        const rows = data.users.map(user => {
            const reserved = M.add(root.CasinoEngine.sumBets(user.bets), (user.blackjack && user.blackjack.phase !== 'settled' ? user.blackjack.hands.reduce((sum, hand) => M.add(sum, hand.bet), 0) : 0));
            const negative = user.recovery?.deficit || 0;
            return { id:user.id, name:user.name, cash:user.recovery ? 0 : user.balance, allowance:user.recovery ? user.balance : 0,
                recovery:Boolean(user.recovery), reserved, bank:user.debt, shark:user.sharkDebt, negative, peer:0, receivable:0 };
        });
        const byId = new Map(rows.map(row => [row.id, row]));
        for (const loan of data.loans) if (loan.status === 'active') {
            const lender = byId.get(loan.lenderId), borrower = byId.get(loan.borrowerId);
            if (lender) lender.receivable = M.add(lender.receivable, loan.balance);
            if (borrower) borrower.peer = M.add(borrower.peer, loan.balance);
        }
        for (const row of rows) {
            row.debt = M.add(row.bank, row.shark, row.peer, row.negative);
            row.net = M.sub(M.add(row.cash, (row.recovery ? 0 : row.reserved), row.receivable), row.debt);
        }
        return rows;
    }
    function selectPlayers(rows, {query='', sort='name', page=1, pageSize=20}={}) {
        const needle = normalize(query), filtered = rows.filter(row => normalize(row.name).includes(needle));
        const nameOrder = (a,b) => a.name.localeCompare(b.name, 'zh-CN', {numeric:true, sensitivity:'base'}) || a.id.localeCompare(b.id);
        filtered.sort(['cash','debt','net'].includes(sort) ? (a,b) => M.compare(b[sort],a[sort]) || nameOrder(a,b) : nameOrder);
        const size = Number.isInteger(pageSize) && pageSize > 0 && pageSize <= 100 ? pageSize : 20;
        const pages = Math.max(1, Math.ceil(filtered.length / size));
        const current = Math.min(pages, Math.max(1, Number.isInteger(page) ? page : 1));
        return {rows:filtered.slice((current-1)*size,current*size), page:current, pages, total:filtered.length};
    }
    function activity(entries, query='') {
        const needle = normalize(query);
        return entries.filter(entry => normalize(entry.text+' '+entry.time).includes(needle));
    }
    function activityCSV(entries) {
        const cell = value => {
            let text = String(value ?? '');
            if (/^[\s]*[=+\-@]/u.test(text) || /^[\t\r\n]/.test(text)) text = "'"+text;
            return '"'+text.replaceAll('"','""')+'"';
        };
        return '\uFEFF'+[['时间','账户记录'],...entries.map(entry=>[entry.time,entry.text])].map(row=>row.map(cell).join(',')).join('\r\n');
    }
    root.CasinoAccounts = { summaries, selectPlayers, activity, activityCSV };
})(globalThis);
