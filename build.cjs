const fs = require('node:fs');
const path = require('node:path');
const base = __dirname;
const read = name => fs.readFileSync(path.join(base, 'src', name), 'utf8').replace(/\r\n/g, '\n');
let html = read('roulette.html');
const lucky = require('./build-lucky.cjs')(read('lucky-reference.html'));
function replace(from, to) {
    if (!html.includes(from)) throw new Error('Missing integration marker: ' + from.slice(0, 80));
    html = html.replace(from, to);
}
replace('<title>3D Low-Poly Roulette</title>', '<title>Roulette Club · Blackjack, 777 & Bank</title>\n    <meta name="description" content="Play 3D blackjack, roulette and Lucky 777 with local player wallets, chip transfers, and a house bank.">');
replace('</head>', '<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800;900&family=Chakra+Petch:wght@600;700&display=swap" rel="stylesheet">\n</head>');
replace('    </style>', read('club.css') + lucky.css + read('lucky-layout.css') + read('blackjack.css') + '\n    </style>');
replace('<body>', '<body>\n' + read('club.html').replace('<!-- LUCKY_777 -->', lucky.html).replace('<!-- BLACKJACK -->', read('blackjack.html')).replace('<!-- MARKET -->', read('market.html')).replace('<!-- ADMIN -->', read('admin.html')));
replace('class="fixed top-0 left-0 right-0 z-20', 'class="club-roulette-hud fixed top-0 left-0 right-0 z-20');
replace('<div class="fixed bottom-0', '<div id="roulette-controls" class="fixed bottom-0');
replace('    <script>\n', '    <script>\n' + read('club-core.js') + '\n' + read('custom-bet.js') + '\n' + read('jackpot-shortcut.js') + '\n' + read('lucky-input.js') + '\n' + lucky.script + '\n' + read('blackjack-core.js') + '\n' + read('remote-engine.js') + '\n' + read('blackjack-scene.js') + '\n' + read('blackjack-ui.js') + '\n' + read('economy-ui.js') + '\n' + read('player-loans-ui.js') + '\n' + read('distress-ui.js') + '\n' + read('admin-ui.js') + '\n' + read('club-ui.js') + '\n    </script>\n    <script>\n');
replace('        // Helper to determine pocket color', '        const casino = createCasinoClub(state);\n        casino.init();\n        updateBettingHUD();\n        renderHistoryRibbon();\n\n        // Helper to determine pocket color');
replace("            sfx.init();\n            hideBanner();", "            if (casino.busy() || casino.view !== 'roulette') return;\n            casino.engine.lock = 'roulette';\n            casino.engine.active.pendingRoulette = true;\n            casino.refresh();\n            sfx.init();\n            hideBanner();");
replace('            state.balance += totalPayout;', "            state.balance += totalPayout;\n            casino.engine.lock = null;\n            casino.engine.active.pendingRoulette = false;\n            casino.engine.record(`${casino.engine.active.name} · Roulette ${num}: wager ${totalWagered.toLocaleString()}, payout ${totalPayout.toLocaleString()}.`);");
replace("            document.getElementById('balance-display').textContent = state.balance.toLocaleString();", "            casino.refresh();\n            document.getElementById('balance-display').textContent = state.balance.toLocaleString();");
// Bank access replaces the former unlimited chip reset.
replace("            document.getElementById('reset-chips-btn').addEventListener('click', () => {\n                if (state.phase === 'ORBITING' || state.phase === 'DROPPING') return;\n                state.balance = 1000;\n                state.bets = { RED: 0, BLACK: 0, GREEN: 0, ODD: 0, EVEN: 0, numbers: {} };\n                sfx.playChipSound();\n                updateBettingHUD();\n            });", '');
html = html.replaceAll("if (state.phase === 'ORBITING' || state.phase === 'DROPPING') return;", "if (casino.busy()) return;");
replace("hits.length > 0 && state.phase !== 'ORBITING' && state.phase !== 'DROPPING'", "hits.length > 0 && !casino.busy()");
replace("                state.isChargingSpin = true;", "                if (casino.view !== 'roulette') return;\n                state.isChargingSpin = true;");
replace("num !== 0 && num !== 0 &&", "num !== 0 &&");
// Preserve a correct sign for winning payouts smaller than the total wager.
replace('NET +${net.toLocaleString()}', "NET ${net >= 0 ? '+' : '−'}${Math.abs(net).toLocaleString()}");
replace('            updatePhysics(dt);\n            renderer.render(scene, camera);', "            if (casino.view === 'roulette') {\n                updatePhysics(dt);\n                renderer.render(scene, camera);\n            }");
replace('            build3DScene();', "            if (!window.THREE) {\n                casino.toast('The 3D wheel needs an internet connection. Players, bank and 777 are available.', true);\n                return;\n            }\n            build3DScene();");
html = html.replace('let raycaster = new THREE.Raycaster();', 'let raycaster = window.THREE ? new THREE.Raycaster() : null;')
    .replace('let mouseNDC = new THREE.Vector2(0, 0);', 'let mouseNDC = window.THREE ? new THREE.Vector2(0, 0) : null;')
    .replace('let interactivePlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.8);', 'let interactivePlane = window.THREE ? new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.8) : null;');
// Keep the hidden shortcut's winning pocket aligned with the rendered ball.
replace('        function triggerSpin(powerNormalized = 0.75, direction = 1) {', `        function forceRouletteJackpot() {
            if (!window.THREE || !renderer) { casino.toast('The 3D wheel is unavailable.', true); return; }
            if (casino.engine.lock && casino.engine.lock !== 'roulette') return;
            if (getTotalActiveBet() === 0) placeNumberBet(0);
            if (getTotalActiveBet() === 0) { casino.toast('Not enough chips to place a bet.', true); return; }
            const winningNumber = bestRouletteNumber(state.bets);
            state.forcedPocketIndex = POCKETS.findIndex(pocket => pocket.number === winningNumber);
            if (casino.engine.lock !== 'roulette') triggerSpin();
        }

        function triggerSpin(powerNormalized = 0.75, direction = 1) {`);
replace('const targetLocalAngle = POCKETS[currentPocketIdx].localAngle;', 'const targetLocalAngle = POCKETS[state.forcedPocketIndex ?? currentPocketIdx].localAngle;');
replace('                    state.settledPocketIndex = currentPocketIdx;', `                    const winningIndex = state.forcedPocketIndex ?? currentPocketIdx;
                    state.settledPocketIndex = winningIndex;
                    state.ballAngle = state.wheelAngle + POCKETS[winningIndex].localAngle;
                    state.forcedPocketIndex = null;`);
replace('                    evaluateSpinOutcome(currentPocketIdx);', '                    evaluateSpinOutcome(winningIndex);');
// Custom roulette chips use an exact amount and never silently spend a smaller balance.
replace("document.querySelectorAll('[data-bet]').forEach(btn => {", "document.querySelectorAll('#roulette-controls [data-bet]').forEach(btn => {");
replace('                <!-- Clear / Rebet -->', `                <form id="roulette-custom-form" class="custom-bet-form" novalidate>
                    <label for="roulette-custom-amount">Custom bet</label>
                    <input id="roulette-custom-amount" type="number" min="1" max="1000000" step="1" inputmode="numeric" placeholder="Amount" required aria-describedby="roulette-custom-selected">
                    <button id="roulette-custom-apply" type="submit">Use amount</button>
                    <span id="roulette-custom-selected">1–1,000,000 chips per bet</span>
                </form>
                <!-- Clear / Rebet -->`);
replace("            if (state.selectedChip === 'ALL') return state.balance;", `            if (state.customBet) {
                try {
                    const amount = casino.engine.amount(Number(state.selectedChip));
                    if (amount > state.balance) throw new Error('Not enough chips for your custom bet. Lower it or visit the bank.');
                    return amount;
                } catch (error) { casino.toast(error.message, true); return 0; }
            }
            if (state.selectedChip === 'ALL') return state.balance;`);
replace("                    state.selectedChip = val === 'ALL' ? 'ALL' : Number(val);", `                    state.selectedChip = val === 'ALL' ? 'ALL' : Number(val);
                    state.customBet = false;
                    document.getElementById('roulette-custom-selected').textContent = 'Selected: ' + (val === 'ALL' ? 'All In' : Number(val).toLocaleString()) + ' chips per bet';`);
// Hosted roulette places and settles wagers through the authoritative server.
replace('        function placeCategoryBet(category) {', `        function placeCategoryBet(category) {
            if (casino.engine.remote) {
                if (casino.busy()) return;
                const amount = getChipIncrement(); if (amount <= 0) return;
                casino.engine.rouletteBet(category, amount).then(() => { sfx.playChipSound(); updateBettingHUD(); }).catch(error => casino.toast(error.message,true)); return;
            }`);
replace('        function placeNumberBet(pocketNum) {', `        function placeNumberBet(pocketNum) {
            if (casino.engine.remote) {
                if (casino.busy()) return;
                const amount = getChipIncrement(); if (amount <= 0) return;
                casino.engine.rouletteBet(pocketNum, amount).then(() => { sfx.playChipSound(); updateBettingHUD(); renderNumberModalGrid(); }).catch(error => casino.toast(error.message,true)); return;
            }`);
replace('        function clearAllBets() {', `        function clearAllBets() {
            if (casino.engine.remote) { if(casino.busy())return; casino.engine.rouletteClear().then(() => {updateBettingHUD();renderNumberModalGrid();}).catch(error=>casino.toast(error.message,true)); return; }`);
replace('        function rebetLast() {', `        function rebetLast() {
            if (casino.engine.remote) { if(casino.busy())return; casino.engine.rouletteRebet().then(() => {updateBettingHUD();renderNumberModalGrid();}).catch(error=>casino.toast(error.message,true)); return; }`);
replace('        function triggerSpin(powerNormalized = 0.75, direction = 1) {', `        function triggerSpin(powerNormalized = 0.75, direction = 1) {
            if (casino.engine.remote && !state.remoteSpin) {
                if(casino.busy())return;
                casino.engine.rouletteSpin(Boolean(state.remoteJackpot)).then(result => {
                    state.remoteJackpot = false; state.remoteSpin = result; state.forcedPocketIndex = result.index;
                    triggerSpin(powerNormalized,direction);
                }).catch(error => {state.remoteJackpot=false;casino.toast(error.message,true);});return;
            }`);
replace('        function forceRouletteJackpot() {', `        function forceRouletteJackpot() {
            if (casino.engine.remote) {
                if(!window.THREE || !renderer){casino.toast('The 3D wheel is unavailable.',true);return;}
                if(casino.engine.animationLock==='roulette' && state.remoteSpin){
                    casino.engine.rouletteRig(state.remoteSpin.roundId).then(result => {
                        if(state.remoteSpin){state.remoteSpin=result;state.forcedPocketIndex=result.index;}
                        else {state.settledPocketIndex=result.index;renderHistoryRibbon();updateBettingHUD();showResultBanner(result.number,result.number===0?'GREEN':result.number%2?'RED':'BLACK',result.wager,result.payout);}
                    }).catch(error=>casino.toast(error.message,true));return;
                }
                if(casino.busy())return;
                const prepared = getTotalActiveBet()>0 ? Promise.resolve() : casino.engine.rouletteBet(0,getChipIncrement());
                prepared.then(() => {state.remoteJackpot=true;triggerSpin();}).catch(error=>casino.toast(error.message,true));return;
            }`);
replace('        function evaluateSpinOutcome(winningIndex) {', `        function evaluateSpinOutcome(winningIndex) {
            if (casino.engine.remote && state.remoteSpin) {
                const result=state.remoteSpin;state.remoteSpin=null;casino.engine.lock=null;casino.engine.active.pendingRoulette=false;
                renderHistoryRibbon();updateBettingHUD();renderNumberModalGrid();
                showResultBanner(result.number,result.number===0?'GREEN':result.number%2?'RED':'BLACK',result.wager,result.payout);
                document.getElementById('hint-text').textContent='Spin complete!';return;
            }`);
replace('            // Display result banner', '            if (totalWagered > 0) casino.engine.completeRound(totalPayout - totalWagered);\n            updateBettingHUD();\n            // Display result banner');
fs.mkdirSync(path.join(base, 'dist'), { recursive: true });
fs.writeFileSync(path.join(base, 'dist', 'index.html'), html);
fs.writeFileSync(path.join(base, '..', 'roulette.html'), html);
console.log('Built roulette club and standalone roulette.html.');
