function createAccountUI(engine, callbacks) {
    const $ = id => document.getElementById(id), fmt = value => value.toLocaleString();
    let page = 1, forecastKey = '';
    function element(tag, text, className) {
        const node = document.createElement(tag); node.textContent = text;
        if (className) node.className = className;
        return node;
    }
    function tick() {
        const minutes = Number($('forecast-minutes').value || 10);
        const now = engine.projectDebts(0), later = engine.projectDebts(minutes);
        const key = engine.money.stringify([engine.active.id, minutes, now, later]);
        if (key === forecastKey) return;
        forecastKey = key;
        $('forecast-heading').textContent = minutes + ' 分钟后';
        $('forecast-rows').replaceChildren(...[['bank','银行'],['shark','高利贷'],['peer','玩家借款'],['negative','负数记录'],['total','合计']].map(([kind,label]) => {
            const row = document.createElement('tr'); row.append(element('th',label),element('td',fmt(now[kind])),element('td',fmt(later[kind])));
            row.children[0].setAttribute('scope','row'); return row;
        }));
        $('forecast-growth').textContent = `未来 ${minutes} 分钟预计增加 ${fmt(engine.money.sub(later.total,now.total))} 筹码欠款。`;
    }
    function render() {
        const rows = CasinoAccounts.summaries(engine.data), current = rows.find(row => row.id === engine.active.id), locked = callbacks.locked();
        const selection = CasinoAccounts.selectPlayers(rows,{query:$('directory-search').value,sort:$('directory-sort').value,page});
        page = selection.page;
        $('directory-count').textContent = `${selection.total} 位匹配 · 共 ${rows.length} 位玩家`;
        $('directory-empty').hidden = selection.total !== 0;
        $('directory-page').textContent = `${selection.page} / ${selection.pages}`;
        $('directory-prev').disabled = page === 1; $('directory-next').disabled = page === selection.pages;
        $('directory-rows').replaceChildren(...selection.rows.map(player => {
            const row = document.createElement('tr'), name = element('td',player.name), cash = element('td',player.recovery ? '-'+fmt(player.negative) : fmt(player.cash));
            if (player.recovery) { cash.dataset.negative = 'true'; cash.append(element('small',`可用 ${fmt(player.allowance)} · 负数模式`)); }
            else if (player.reserved) cash.append(element('small',`另有 ${fmt(player.reserved)} 下注中`));
            const debt = element('td',fmt(player.debt)), net = element('td',fmt(player.net)), actions = document.createElement('td');
            net.dataset.negative = String(player.net < 0); net.append(element('small',`应收 ${fmt(player.receivable)}`));
            const button = element('button',player.id===current.id?'当前玩家':'切换','club-action secondary');
            button.type = 'button'; button.disabled = locked || player.id === current.id;
            button.addEventListener('click',()=>callbacks.switchPlayer(player.id)); actions.append(button);
            row.append(name,cash,debt,net,actions); return row;
        }));
        $('summary-net').textContent = fmt(current.net); $('summary-net').dataset.negative = String(current.net < 0);
        $('summary-liabilities').textContent = fmt(current.debt); $('summary-reserved').textContent = fmt(current.reserved); $('summary-receivable').textContent = fmt(current.receivable);
        const user = engine.active;
        $('bank-repay-all').disabled = locked || current.recovery || user.debt <= 0 || user.balance < user.debt;
        $('shark-repay-all').disabled = locked || current.recovery || user.sharkDebt <= 0 || user.balance < user.sharkDebt;
        $('repay-all-help').textContent = current.recovery ? '负数模式底金不能用于还款。先抵清负数，恢复正常余额。' : '余额足够时可一键还清；服务器会先结算到期利息，再核对欠款和余额。';
        const entries = CasinoAccounts.activity(engine.data.ledger,$('activity-search').value);
        $('activity-count').textContent = `匹配 ${entries.length} 条 · 当前保留最近 ${engine.data.ledger.length} 条（最多 100 条）`;
        $('activity-export').disabled = entries.length === 0;
        $('club-ledger').replaceChildren(...(entries.length ? entries.map(entry => {
            const row = document.createElement('li'), time = document.createElement('time'), date = new Date(entry.time);
            time.dateTime = entry.time; time.textContent = Number.isNaN(date.getTime()) ? entry.time : date.toLocaleString();
            row.append(element('span',entry.text),time); return row;
        }) : [element('li',engine.data.ledger.length?'没有匹配的记录，请更换关键词。':'账户活动会显示在这里。')]));
        tick();
    }
    for (const id of ['directory-search','directory-sort']) $(id).addEventListener(id.endsWith('search')?'input':'change',()=>{page=1;render();});
    $('directory-prev').addEventListener('click',()=>{page--;render();}); $('directory-next').addEventListener('click',()=>{page++;render();});
    $('activity-search').addEventListener('input',render); $('forecast-minutes').addEventListener('change',tick);
    $('bank-repay-all').addEventListener('click',()=>callbacks.transact(()=>engine.repayAll('bank'),'银行欠款已全部还清。'));
    $('shark-repay-all').addEventListener('click',()=>callbacks.transact(()=>engine.repayAll('shark'),'高利贷已全部还清。'));
    $('activity-export').addEventListener('click',()=>{
        let url, link;
        try {
            const entries = CasinoAccounts.activity(engine.data.ledger,$('activity-search').value);
            if (!entries.length) return;
            url = URL.createObjectURL(new Blob([CasinoAccounts.activityCSV(entries)],{type:'text/csv;charset=utf-8'}));
            link = document.createElement('a'); link.href = url; link.download = 'roulette-activity-'+Date.now()+'.csv';
            document.body.append(link); link.click(); callbacks.notify(`已导出 ${entries.length} 条筛选记录。`);
        } catch { callbacks.notify('导出未完成，请重新尝试。',true); }
        finally { link?.remove(); if(url)setTimeout(()=>URL.revokeObjectURL(url),1000); }
    });
    return {render,tick};
}
