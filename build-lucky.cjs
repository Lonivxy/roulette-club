// Scope and adapt the supplied cabinet so it shares the club's accounting.
module.exports = function buildLucky(reference) {
    const style = reference.match(/<style>([\s\S]*?)<\/style>/)[1];
    const sourceBody = reference.match(/<body>([\s\S]*?)<script>/)[1];
    let script = reference.match(/<script>([\s\S]*?)<\/script>/)[1];
    function replace(from, to) {
        if (!script.includes(from)) throw new Error('Missing Lucky 777 marker: ' + from.slice(0, 70));
        script = script.replace(from, to);
    }
    const css = style.replace(/@import[^;]+;/g, '').replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/([^{}]+)\{/g, (_, header) => {
            const selector = header.trim();
            if (selector.startsWith('@') || /^(?:from|to|[0-9.]+%)(?:\s*,\s*(?:from|to|[0-9.]+%))*$/.test(selector)) return `${header}{`;
            return '\n' + selector.split(',').map(s => [':root', 'body'].includes(s.trim()) ? '#slots-view' : '#slots-view ' + s.trim()).join(', ') + ' {';
        });
    const actions = {
        "setCameraMode('tilt')": 'tilt', "setCameraMode('iso')": 'iso', "setCameraMode('flat')": 'flat',
        'forceLucky777()': 'force', 'toggleMute()': 'mute', 'changeBet(-10)': 'betDown',
        'changeBet(10)': 'betUp', 'setMaxBet()': 'max', 'triggerSpin()': 'spin'
    };
    let body = sourceBody.replace(/onclick="([^"]+)"/g, (_, action) => {
        if (!actions[action]) throw new Error('Unknown cabinet control: ' + action);
        return `data-lucky-action="${actions[action]}"`;
    });
    body = body.replace('data-lucky-action="force"', 'id="force777Btn" data-lucky-action="force"')
        .replace('id="leverAssembly"', 'id="leverAssembly" role="button" tabindex="0" aria-label="Pull the Lucky 777 lever"')
        .replace('id="statusBanner"', 'id="statusBanner" role="status" aria-live="polite" aria-atomic="true"')
        .replace('class="reel-window-frame"', 'class="reel-window-frame" role="img" aria-label="Slot reels: 7, 7, 7" id="lucky-reel-window"')
        .replace('<canvas id="fxCanvas">', '<canvas id="fxCanvas" aria-hidden="true">')
        .replace('<!-- Digital LED Readouts -->', '<div class="pay-pill lucky-extra-pay"><span>Two lucky 7s</span><strong>5×</strong></div>\n<!-- Digital LED Readouts -->');
    replace('    let credits = 1000;', '    let credits = engine.active.balance;\n    let visible = false;\n    let visualBalance = null;\n    let spinResult = null;\n    let coinFrame = null;');
    const triggerStart = script.indexOf('    function triggerSpin(forcedIndices = null) {');
    const beforeWinReset = script.indexOf("      document.getElementById('winDisplay').textContent = '0';", triggerStart);
    script = script.slice(0, triggerStart) + `    function triggerSpin(forcedIndices = null) {
      if (isSpinning || !visible || callbacks.locked()) return;
      try { spinResult = engine.spinSlots(currentBet, forcedIndices); }
      catch (error) { callbacks.notify(error.message, true); return; }
      isSpinning = true;
      visualBalance = engine.active.balance - spinResult.payout;
      credits = visualBalance;
      callbacks.changed();
` + script.slice(beforeWinReset);
    replace(`      const chosenIndices = forcedIndices || [
        Math.floor(Math.random() * FACET_COUNT),
        Math.floor(Math.random() * FACET_COUNT),
        Math.floor(Math.random() * FACET_COUNT)
      ];`, '      const chosenIndices = spinResult.reels;');
    replace('      const spinDurations = [1400, 1950, 2550];', "      const spinDurations = reducedMotion.matches ? [0, 0, 0] : [1400, 1950, 2550];");
    replace('const t = Math.min(1, elapsed / duration);', 'const t = duration === 0 ? 1 : Math.min(1, elapsed / duration);');
    replace('        credits += payout;', '        // Payout was persisted atomically before the animation.');
    replace(`      updateHUD();
      setButtonsDisabled(false);
      isSpinning = false;`, `      credits = engine.active.balance;
      visualBalance = null;
      engine.lock = null;
      isSpinning = false;
      const net = spinResult.net;
      document.getElementById('lucky-outcome').textContent = 'Wager ' + currentBet.toLocaleString() + ' · Returned ' + spinResult.payout.toLocaleString() + ' · Net ' + (net >= 0 ? '+' : '−') + Math.abs(net).toLocaleString();
      document.getElementById('lucky-reel-window').setAttribute('aria-label', 'Slot reels: ' + landed.map(s => s.label).join(', '));
      spinResult = null;
      updateHUD();
      setButtonsDisabled(false);
      callbacks.changed();`);
    replace("['spinBtn', 'betDownBtn', 'betUpBtn', 'maxBetBtn']", "['spinBtn', 'betDownBtn', 'betUpBtn', 'maxBetBtn', 'force777Btn']");
    replace("      });\n    }\n\n    /* ==========================================================\n       5.", "      });\n      document.getElementById('leverAssembly').setAttribute('aria-disabled', String(disabled));\n    }\n\n    /* ==========================================================\n       5.");
    replace('const root = document.documentElement;', 'const root = host;');
    replace("window.addEventListener('mousemove', (e) => {\n      if (cameraMode !== 'tilt') return;", "host.addEventListener('pointermove', (e) => {\n      if (!visible || cameraMode !== 'tilt' || reducedMotion.matches) return;");
    script = script.replaceAll('document.documentElement.style.setProperty', 'host.style.setProperty');
    replace("playTone(freq, 'Byte' ? 'square' : 'triangle'", "playTone(freq, 'square'");
    replace('      const originX = window.innerWidth / 2;\n      const originY = window.innerHeight * 0.48;', "      if (!ctx || reducedMotion.matches || !visible) return;\n      const rect = document.getElementById('slotCabinet').getBoundingClientRect();\n      const originX = rect.left + rect.width / 2;\n      const originY = rect.top + rect.height * 0.48;");
    replace('      for (let i = 0; i < count; i++) {', '      if (coinFrame === null) coinFrame = requestAnimationFrame(renderCoins);\n      for (let i = 0; i < count; i++) {');
    replace('    function renderCoins() {\n      ctx.clearRect', '    function renderCoins() {\n      coinFrame = null;\n      if (!ctx) return;\n      ctx.clearRect');
    replace('      requestAnimationFrame(renderCoins);\n    }\n    requestAnimationFrame(renderCoins);', '      if (coins.length && visible) coinFrame = requestAnimationFrame(renderCoins);\n    }');
    replace("      if (e.code === 'Space') {\n        e.preventDefault();\n        triggerSpin();\n      }", "      if (!visible || e.repeat || e.code !== 'Space' || e.target.closest('input, select, textarea, button, [role=button]')) return;\n      e.preventDefault();\n      e.stopImmediatePropagation();\n      triggerSpin();");
    replace("    // Boot up machine", `    document.getElementById('leverAssembly').addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.code === 'Space') { e.preventDefault(); e.stopPropagation(); if (!e.repeat) triggerSpin(); }
    });
    const actions = { tilt: () => setCameraMode('tilt'), iso: () => setCameraMode('iso'), flat: () => setCameraMode('flat'), force: forceLucky777, mute: toggleMute, betDown: () => changeBet(-10), betUp: () => changeBet(10), max: setMaxBet, spin: () => triggerSpin() };
    host.querySelectorAll('[data-lucky-action]').forEach(button => button.addEventListener('click', actions[button.dataset.luckyAction]));
    // Boot up machine`);
    return {
        css,
        html: `<section id="slots-view" class="club-view" role="tabpanel" aria-labelledby="tab-slots" hidden>${body}<div class="lucky-footer"><p id="lucky-outcome">Payouts include your stake. Force 777 uses your wager and pays the 50× jackpot.</p><button type="button" class="club-action secondary" data-go-bank>Players & Bank →</button></div></section>`,
        script: `function createLucky777(engine, callbacks) {\n'use strict';\nconst host = document.getElementById('slots-view');\nconst reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');\n${script.trim()}\nreturn {
          update(locked) { credits = visualBalance ?? engine.active.balance; updateHUD(); setButtonsDisabled(locked); },
          get displayBalance() { return visualBalance; },
          setVisible(value) { visible = value; if (value) resizeCanvas(); else { coins = []; if (coinFrame !== null) cancelAnimationFrame(coinFrame); coinFrame = null; if (ctx) ctx.clearRect(0,0,canvas.width,canvas.height); } },
          resetPlayer() { document.getElementById('winDisplay').textContent = '0'; clearFacetHighlights(); document.getElementById('paylineBar').classList.remove('win-active'); reelStates.forEach(r => { r.angle = 0; r.targetIndex = 0; r.el.style.transform = 'rotateX(0deg)'; }); document.getElementById('lucky-reel-window').setAttribute('aria-label','Slot reels: 7, 7, 7'); document.getElementById('lucky-outcome').textContent = 'Payouts include your stake. Force 777 uses your wager and pays the 50× jackpot.'; setStatus('Playing as ' + engine.active.name + ' · Pull the lever or press SPIN.'); }
        };\n}`
    };
};
