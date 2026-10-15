function bindJackpotShortcut(target, action) {
    let leftShift = false;
    target.addEventListener('keydown', event => {
        if (event.code === 'ShiftLeft') leftShift = true;
        if (!leftShift || !event.shiftKey || event.code !== 'KeyF' || event.repeat || event.isComposing
            || event.ctrlKey || event.altKey || event.metaKey
            || event.target?.closest?.('input, textarea, select, [contenteditable]:not([contenteditable="false"])')) return;
        if (action() === false) return;
        event.preventDefault(); event.stopImmediatePropagation();
    });
    target.addEventListener('keyup', event => { if (event.code === 'ShiftLeft') leftShift = false; });
    target.addEventListener('blur', () => { leftShift = false; });
}
function bestRouletteNumber(bets) {
    let best = 0, highest = -1;
    for (let number = 0; number < 24; number++) {
        const payout = CasinoEngine.money.add(CasinoEngine.money.mul(bets.numbers[number] || 0, 24), number === 0 ? CasinoEngine.money.mul(bets.GREEN, 24)
            : number % 2 ? CasinoEngine.money.mul(CasinoEngine.money.add(bets.RED, bets.ODD), 2) : CasinoEngine.money.mul(CasinoEngine.money.add(bets.BLACK, bets.EVEN), 2));
        if (payout > highest) { highest = payout; best = number; }
    }
    return best;
}
