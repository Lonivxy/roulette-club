const fs = require('node:fs');
const path = require('node:path');
module.exports = function buildLucky(reference) {
    const style = reference.match(/<style>([\s\S]*?)<\/style>/)[1];
    let body = reference.match(/<body>([\s\S]*?)<script>/)[1];
    const css = style.replace(/@import\s+url\([^)]*\)\s*;/g, '').replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/([^{}]+)\{/g, (_, header) => {
            const selector = header.trim();
            if (selector.startsWith('@') || /^(?:from|to|[0-9.]+%)$/.test(selector)) return `${header}{`;
            return '\n' + selector.split(',').map(s => s.trim() === 'body' ? '#slots-view' : '#slots-view ' + s.trim()).join(', ') + ' {';
        });
    body = body.replace(/onclick="([^"]+)"/g, (_, action) => `data-machine-action="${action}"`)
        .replace('class="hud-overlay"', 'class="hud-overlay" id="lucky-panels" hidden')
        .replace('id="statusTicker"', 'id="statusTicker" role="status" aria-live="polite"')
        .replace('+1,000 REBUY', 'Players & Bank').replace('Close-Up 3D', 'Play view');
    return { css,
        html: `<section id="slots-view" class="club-view" role="tabpanel" aria-labelledby="tab-slots" hidden>${body}<button id="lucky-panel-toggle" type="button" aria-controls="lucky-panels" aria-expanded="false">Show controls</button><p id="lucky-touch-hint">Tap a bet button · Pull the red lever</p><p id="lucky-accessible-result" class="lucky-sr-only" role="status" aria-live="polite"></p></section>`,
        script: ['lucky-machine.js', 'lucky-ui.js'].map(name => fs.readFileSync(path.join(__dirname, 'src', name), 'utf8')).join('\n')
    };
};
