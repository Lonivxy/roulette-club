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
    body = body.replace(/<button onclick="forceJackpot777\(\)"[\s\S]*?<\/button>/, '<button type="button" onclick="openBlackMarket()" class="px-3 py-1.5 rounded-full bg-red-950 border border-amber-400 text-xs text-amber-200">黑市商人</button>');
    body = body.replace(/onclick="([^"]+)"/g, (_, action) => `data-machine-action="${action}"`)
        .replace('class="hud-overlay"', 'class="hud-overlay" id="lucky-panels" hidden')
        .replace('id="statusTicker"', 'id="statusTicker" role="status" aria-live="polite"')
        .replace('+1,000 REBUY', 'Players & Bank').replace('Close-Up 3D', 'Play view');
    return { css,
        html: `<section id="slots-view" class="club-view" role="tabpanel" aria-labelledby="tab-slots" hidden>${body}<button id="lucky-panel-toggle" type="button" aria-controls="lucky-panels" aria-expanded="false">Show controls</button><button id="lucky-custom-toggle" type="button" aria-controls="lucky-custom-panel" aria-expanded="false">Custom bet</button><div id="lucky-custom-panel" hidden><form id="lucky-custom-form" class="custom-bet-form" novalidate><label for="lucky-custom-amount">Custom bet · 1–1,000,000 chips</label><input id="lucky-custom-amount" type="number" min="1" max="1000000" step="1" inputmode="numeric" value="100" required><button id="lucky-custom-apply" type="submit">Use amount</button></form></div><div id="lucky-armed-card" hidden><span id="lucky-card-label"></span><button id="lucky-card-cancel" type="button">取消装备</button></div><p id="lucky-touch-hint">Tap a bet button · Pull the red lever</p><p id="lucky-accessible-result" class="lucky-sr-only" role="status" aria-live="polite"></p></section>`,
        script: ['lucky-machine.js', 'lucky-ui.js'].map(name => fs.readFileSync(path.join(__dirname, 'src', name), 'utf8')).join('\n')
    };
};
