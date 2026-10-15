function createCasinoClub(roulette, sound) {
    'use strict';
    let browserStorage;
    try { browserStorage = window.localStorage; } catch { /* Session mode is supported. */ }
    const engine = new CasinoEngine(browserStorage);
    if (!browserStorage) engine.storageWarning = 'Browser storage is unavailable. This session is temporary.';
    for (const key of ['balance', 'bets', 'lastBets', 'history']) {
        Object.defineProperty(roulette, key, { configurable: true, enumerable: true,
            get: () => engine.active[key], set: value => { engine.active[key] = value; } });
    }
    let view = 'roulette', toastTimer, slotTimer, displayedSlotBalance = null;
    const $ = id => document.getElementById(id);
    const fmt = n => n.toLocaleString();
    const busy = () => Boolean(engine.lock);
    const viewLocked = () => busy() || roulette.isChargingSpin || roulette.isDraggingTurret;
    function toast(message, error = false) {
        clearTimeout(toastTimer);
        $('club-toast').textContent = message;
        $('club-toast').dataset.error = String(error);
        $('club-toast').hidden = false;
        toastTimer = setTimeout(() => { $('club-toast').hidden = true; }, 5000);
    }
    function option(user) {
        const el = document.createElement('option');
        el.value = user.id;
        el.textContent = user.name;
        return el;
    }
    function render() {
        const u = engine.active;
        const selectedRecipient = $('transfer-user').value;
        $('club-user').replaceChildren(...engine.data.users.map(option));
        $('club-user').value = u.id;
        $('club-user').disabled = viewLocked();
        $('transfer-user').replaceChildren(...engine.data.users.filter(p => p.id !== u.id).map(option));
        if ([...$('transfer-user').options].some(o => o.value === selectedRecipient)) $('transfer-user').value = selectedRecipient;
        $('club-wallet').textContent = `${fmt(displayedSlotBalance ?? u.balance)} ₵`;
        $('bank-greeting').textContent = `${u.name}’s wallet & bank`;
        $('bank-wallet').textContent = fmt(u.balance);
        $('bank-debt').textContent = fmt(u.debt);
        $('bank-credit').textContent = fmt(engine.availableCredit);
        $('club-storage-note').textContent = engine.storageWarning;
        $('club-player-list').replaceChildren(...engine.data.users.map(p => {
            const row = document.createElement('div'); row.className = 'club-player';
            const avatar = document.createElement('span'); avatar.className = 'club-avatar'; avatar.textContent = p.name[0].toUpperCase();
            const data = document.createElement('div'); data.className = 'club-player-data';
            const name = document.createElement('div'); name.className = 'club-player-name'; name.textContent = p.name;
            const detail = document.createElement('div'); detail.className = 'club-player-detail';
            detail.textContent = `${fmt(p.balance)} chips · ${fmt(p.debt)} debt${CasinoEngine.sumBets(p.bets) ? ` · ${fmt(CasinoEngine.sumBets(p.bets))} on roulette` : ''}`;
            data.append(name, detail);
            const button = document.createElement('button'); button.type = 'button'; button.className = 'club-action secondary';
            button.textContent = p.id === u.id ? 'Playing' : 'Switch';
            button.disabled = p.id === u.id || viewLocked();
            button.addEventListener('click', () => switchPlayer(p.id));
            row.append(avatar, data, button); return row;
        }));
        const entries = engine.data.ledger.slice(0, 40).map(t => {
            const li = document.createElement('li'); const text = document.createElement('span'); text.textContent = t.text;
            const time = document.createElement('time'); time.dateTime = t.time;
            const date = new Date(t.time); time.textContent = Number.isNaN(date.getTime()) ? '' : date.toLocaleString();
            li.append(text, time); return li;
        });
        if (!entries.length) { const li = document.createElement('li'); li.textContent = 'Your table activity will appear here.'; entries.push(li); }
        $('club-ledger').replaceChildren(...entries);
        document.querySelectorAll('[data-idle-only]').forEach(el => { el.disabled = viewLocked(); });
        document.querySelectorAll('[data-view]').forEach(el => { el.disabled = viewLocked(); });
        $('slot-spin').disabled = viewLocked();
        $('slot-wager').disabled = busy();
        document.querySelectorAll('[data-bet], .chip-btn, #clear-bets-btn, #rebet-btn, #open-number-modal-btn, #spin-btn').forEach(el => { el.disabled = busy(); });
    }
    function refresh() { engine.save(); render(); }
    function setView(next) {
        if (!['roulette', 'slots', 'bank'].includes(next)) return;
        if (viewLocked()) { toast('Finish the current spin before changing tables.', true); return; }
        view = next;
        $('number-modal').classList.add('hidden'); $('number-modal').classList.remove('flex');
        $('slots-view').hidden = view !== 'slots'; $('bank-view').hidden = view !== 'bank';
        document.querySelectorAll('[data-view]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.view === view)));
        document.querySelectorAll('.club-roulette-hud, #roulette-controls, #hint-pill, #status-banner, #canvas-container').forEach(el => {
            if (view === 'roulette') el.style.removeProperty('display'); else el.style.display = 'none';
        });
        render();
    }
    function switchPlayer(id) {
        try {
            if (viewLocked()) throw new Error('Finish the current spin before switching players.');
            engine.switchUser(id);
            updateBettingHUD(); renderHistoryRibbon(); renderNumberModalGrid(); hideBanner();
            $('slot-result-title').textContent = 'Feeling lucky?';
            $('slot-result-detail').textContent = `Playing as ${engine.active.name}. Choose your wager and spin.`;
            document.querySelectorAll('.slot-reel').forEach(el => { el.dataset.symbol = '0'; el.firstElementChild.textContent = '7'; });
            toast(`Now playing as ${engine.active.name}.`);
        } catch (e) { render(); toast(e.message, true); }
    }
    function transact(action, success) {
        try {
            if (viewLocked()) throw new Error('Wait for the current spin to finish.');
            action(); updateBettingHUD(); toast(success);
            return true;
        } catch (e) { toast(e.message, true); return false; }
    }
    function spinSlots() {
        let result;
        try {
            if (viewLocked()) throw new Error('Wait for the current spin to finish.');
            result = engine.spinSlots(Number($('slot-wager').value));
        } catch (e) { toast(e.message, true); return; }
        // The complete financial result is saved before animation, so closing the page cannot lose a payout.
        const ownerName = engine.active.name;
        displayedSlotBalance = engine.active.balance - result.payout;
        sound.init();
        $('slot-cabinet').classList.remove('jackpot');
        $('slot-result-title').textContent = 'Spinning…';
        $('slot-result-detail').textContent = `${ownerName} · ${fmt(result.wager)} chips wagered`;
        $('slot-spin').textContent = 'GOOD LUCK…';
        const reels = [...document.querySelectorAll('.slot-reel')];
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const duration = reducedMotion ? 0 : 1900;
        const start = performance.now();
        reels.forEach(el => el.classList.add('spinning'));
        render();
        const drawSymbol = (el, index) => { el.dataset.symbol = String(index); el.firstElementChild.textContent = CasinoEngine.symbols[index]; };
        function finish() {
            clearInterval(slotTimer);
            reels.forEach((el, i) => { el.classList.remove('spinning'); drawSymbol(el, result.reels[i]); });
            $('slot-reels').setAttribute('aria-label', `Slot reels: ${result.reels.map(i => CasinoEngine.symbols[i]).join(', ')}`);
            engine.lock = null;
            displayedSlotBalance = null;
            const signedNet = `${result.net >= 0 ? '+' : '−'}${fmt(Math.abs(result.net))}`;
            $('slot-result-title').textContent = result.multiplier === 100 ? '777 JACKPOT!' : result.payout > 0 ? `WIN · ${fmt(result.payout)} CHIPS` : 'No match this spin';
            $('slot-result-detail').textContent = `Wager ${fmt(result.wager)} · Returned ${fmt(result.payout)} · Net ${signedNet}`;
            if (result.multiplier === 100) $('slot-cabinet').classList.add('jackpot');
            if (result.payout) sound.playWinSound(result.multiplier === 100); else sound.playLoseSound();
            $('slot-spin').textContent = `SPIN · ${$('slot-wager').value} CHIPS`;
            updateBettingHUD();
        }
        if (reducedMotion) finish();
        else slotTimer = setInterval(() => {
            const elapsed = performance.now() - start;
            reels.forEach((el, i) => {
                if (elapsed >= 850 + i * 450) {
                    if (el.classList.contains('spinning')) { el.classList.remove('spinning'); drawSymbol(el, result.reels[i]); sound.playPocketClick(0.4); }
                } else drawSymbol(el, Math.floor(Math.random() * 6));
            });
            if (elapsed >= duration) finish();
        }, 65);
    }
    function init() {
        document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => setView(b.dataset.view)));
        document.querySelectorAll('[data-go-bank]').forEach(b => b.addEventListener('click', () => setView('bank')));
        $('club-user').addEventListener('change', e => switchPlayer(e.target.value));
        $('transfer-form').addEventListener('submit', e => {
            e.preventDefault();
            if (transact(() => engine.transfer($('transfer-user').value, Number($('transfer-amount').value)), 'Chips transferred successfully.')) $('transfer-form').reset();
        });
        $('bank-form').addEventListener('submit', e => {
            e.preventDefault();
            const repay = e.submitter?.value === 'repay';
            if (transact(() => engine[repay ? 'repay' : 'borrow'](Number($('bank-amount').value)), repay ? 'Debt repaid. Available credit updated.' : 'Borrowed chips added to your wallet.')) $('bank-form').reset();
        });
        $('player-form').addEventListener('submit', e => {
            e.preventDefault();
            if (transact(() => engine.addUser($('player-name').value), 'Player added with 1,000 starter chips.')) {
                $('player-form').reset(); renderHistoryRibbon(); renderNumberModalGrid(); hideBanner();
                $('slot-result-title').textContent = 'Feeling lucky?'; $('slot-result-detail').textContent = `Playing as ${engine.active.name}.`;
            }
        });
        $('slot-spin').addEventListener('click', spinSlots);
        $('slot-wager').addEventListener('change', () => { $('slot-spin').textContent = `SPIN · ${$('slot-wager').value} CHIPS`; });
        $('reset-chips-btn').textContent = 'Bank';
        $('reset-chips-btn').title = 'Borrow chips or repay your bank debt';
        $('reset-chips-btn').addEventListener('click', () => setView('bank'));
        // Space activates the focused UI normally, and controls the wheel only on the roulette table.
        window.addEventListener('keydown', e => {
            if (e.code === 'Space' && (view !== 'roulette' || e.target.closest('input, select, textarea, button'))) e.stopImmediatePropagation();
        });
        window.addEventListener('keyup', e => {
            if (e.code === 'Space' && (view !== 'roulette' || e.target.closest('input, select, textarea, button'))) e.stopImmediatePropagation();
        });
        document.querySelectorAll('[role="tab"]').forEach(tab => tab.addEventListener('keydown', e => {
            const tabs = [...document.querySelectorAll('[role="tab"]')];
            let i = tabs.indexOf(tab);
            if (e.key === 'ArrowRight') i = (i + 1) % tabs.length;
            else if (e.key === 'ArrowLeft') i = (i + tabs.length - 1) % tabs.length;
            else if (e.key === 'Home') i = 0;
            else if (e.key === 'End') i = tabs.length - 1;
            else return;
            e.preventDefault(); setView(tabs[i].dataset.view); tabs[i].focus();
        }));
        render();
    }
    return { engine, get view() { return view; }, busy, refresh, render, init, toast };
}
