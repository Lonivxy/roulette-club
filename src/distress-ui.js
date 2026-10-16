function createDistressUI(engine, callbacks) {
    const $ = id => document.getElementById(id), overlay = $('shark-crisis'), go = $('shark-crisis-go');
    let bankAcknowledged = null, previousFocus = null;
    const inertNodes = new Map();
    function render(view) {
        const user = engine.active, recovery = user.recovery;
        const eligible = !engine.platform?.maintenance && engine.platform?.mode !== 'sandbox' && !recovery && engine.availableCredit === 0 && user.balance <= 0
            && CasinoEngine.sumBets(user.bets) === 0 && engine.availableSharkCredit > 0;
        const crisis = eligible && !callbacks.locked();
        if (!eligible || bankAcknowledged !== user.id || view !== 'bank') bankAcknowledged = null;
        const show = crisis && !(view === 'bank' && bankAcknowledged === user.id);
        const wasHidden = overlay.hidden;
        overlay.hidden = !show;
        if (show && wasHidden) {
            for (const node of document.body.children || []) if (node !== overlay) { inertNodes.set(node, node.inert); node.inert = true; }
        } else if (!show && !wasHidden) {
            for (const [node, inert] of inertNodes) node.inert = inert;
            inertNodes.clear();
        }
        document.body.classList.toggle('shark-crisis-active', eligible);
        $('club-recovery').hidden = !recovery;
        $('recovery-deficit').textContent = recovery ? '-' + recovery.deficit.toLocaleString() : '-0';
        $('recovery-budget').textContent = user.balance.toLocaleString();
        $('bank-recovery').hidden = !recovery;
        $('bank-recovery-deficit').textContent = recovery ? '-' + recovery.deficit.toLocaleString() : '-0';
        if (show && wasHidden) { previousFocus = document.activeElement; go.focus(); }
        if (!show && !wasHidden && previousFocus?.isConnected) previousFocus.focus();
    }
    go.addEventListener('click', () => {
        bankAcknowledged = engine.active.id;
        callbacks.openBank();
        $('shark-panel').scrollIntoView?.({ block: 'center', behavior: globalThis.CasinoPreferences?.reducedMotion ? 'auto' : 'smooth' });
        $('shark-borrow-amount').focus();
    });
    overlay.addEventListener('keydown', event => {
        if (event.key === 'Tab' || event.key === 'Escape') { event.preventDefault(); go.focus(); }
    });
    return { render, get blocking() { return !overlay.hidden; } };
}
