function createLucky777(engine, callbacks) {
    const host = document.getElementById('slots-view');
    const panels = document.getElementById('lucky-panels');
    const toggle = document.getElementById('lucky-panel-toggle');
    let machine = null, failed = false, visible = false;
    const customPanel = document.getElementById('lucky-custom-panel');
    const customToggle = document.getElementById('lucky-custom-toggle');
    const custom = bindCustomBet('lucky-custom', engine, {
        locked: () => !machine || callbacks.locked(), notify: callbacks.notify,
        apply(value) { machine.setCustomBet(value); customPanel.hidden = true; customToggle.setAttribute('aria-expanded', 'false'); }
    });
    customToggle.addEventListener('click', () => {
        customPanel.hidden = !customPanel.hidden;
        customToggle.setAttribute('aria-expanded', String(!customPanel.hidden));
        if (!customPanel.hidden) document.getElementById('lucky-custom-amount').focus();
    });
    window.addEventListener('keydown', event => {
        if (!visible || !machine || event.repeat || event.code !== 'Space' || event.ctrlKey || event.metaKey || event.altKey || event.target.closest('input, select, textarea, button, [contenteditable]')) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        machine.spin();
    });
    toggle.addEventListener('click', () => {
        panels.hidden = !panels.hidden;
        toggle.textContent = panels.hidden ? 'Show controls' : 'Hide panels';
        toggle.setAttribute('aria-expanded', String(!panels.hidden));
    });
    return {
        get dragging() { return machine?.dragging || false; },
        get displayBalance() { return machine?.displayBalance ?? null; },
        update(locked) { machine?.update(locked); custom.update(locked); customToggle.disabled = locked; },
        resetPlayer() { machine?.resetPlayer(); },
        setVisible(value) {
            visible = value;
            if (value && !machine && !failed) {
                try { machine = createLuckyMachine(engine, callbacks, host); }
                catch (error) {
                    failed = true;
                    document.getElementById('webgl-mount').replaceChildren();
                    const message = document.createElement('p');
                    message.className = 'machine-error';
                    message.textContent = 'The 3D machine could not load. Reload with an internet connection and WebGL enabled. Your chips are safe; Players & Bank is still available.';
                    host.appendChild(message);
                    toggle.hidden = true;
                    customToggle.hidden = true;
                    customPanel.hidden = true;
                    document.getElementById('lucky-touch-hint').hidden = true;
                }
            }
            machine?.setVisible(value);
        }
    };
}
