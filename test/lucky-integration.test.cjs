const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
require('../src/club-core.js');
const read = name => fs.readFileSync(path.join(__dirname, '../src', name), 'utf8');
class Element {
    constructor() { this.events = {}; this.style = {}; this.dataset = {}; this.hidden = true; this.classList = { toggle() {} }; this.clientWidth = 1000; this.clientHeight = 700; }
    addEventListener(type, fn) { (this.events[type] ||= []).push(fn); }
    fire(type, event = {}) { for (const fn of this.events[type] || []) fn({ button: 0, pointerId: 1, clientX: 150, clientY: 150, preventDefault() {}, ...event }); }
    setAttribute(key, value) { this[key] = value; }
    getBoundingClientRect() { return { left: 50, top: 100, width: 200, height: 500 }; }
    setPointerCapture(id) { this.capture = id; }
    hasPointerCapture(id) { return this.capture === id; }
    releasePointerCapture() { this.capture = null; }
    replaceChildren() {}
    appendChild(child) { this.child = child; }
}
function inputFixture(hit = { action: 'JOYSTICK' }) {
    const canvas = new Element(), win = new Element(); let time = 0, spins = 0, dragging = false, bet, coords;
    const context = { window: win, performance: { now: () => time } };
    vm.createContext(context); vm.runInContext(read('lucky-input.js'), context);
    const input = context.createLuckyInput(canvas, { canAct: () => !dragging, hitTest: (x,y) => { coords = [x,y]; return hit; },
        dragging: value => dragging = value, pull() {}, spin: () => { assert.equal(dragging, false); spins++; }, bet: n => bet = n });
    return { canvas, win, input, wait: () => time = 500, get spins() { return spins; }, get bet() { return bet; }, get coords() { return coords; } };
}
test('touch rays use canvas bounds and physical bet buttons select their value', () => {
    const m = inputFixture({ action: 'BET', value: 500 }); m.canvas.fire('pointerdown');
    assert.deepEqual(m.coords, [0,.8]); assert.equal(m.bet, 500); assert.equal(m.spins, 0);
});
test('lever full pull fires exactly once; a quick tap also spins once', () => {
    const m = inputFixture(); m.canvas.fire('pointerdown'); m.canvas.fire('pointermove', { clientY: 400 }); m.canvas.fire('pointerup');
    assert.equal(m.spins, 1); assert.equal(m.canvas.capture, null);
    m.canvas.fire('pointerdown'); m.canvas.fire('pointerup'); assert.equal(m.spins, 2);
});
test('short pull, pointer cancellation, blur and secondary touches never spin', () => {
    const m = inputFixture(); m.canvas.fire('pointerdown'); m.wait(); m.canvas.fire('pointermove', { clientY: 170 }); m.canvas.fire('pointerup');
    for (const event of ['pointercancel', 'lostpointercapture']) { m.canvas.fire('pointerdown'); m.canvas.fire(event); m.canvas.fire('pointerup'); }
    m.canvas.fire('pointerdown'); m.win.fire('blur'); m.canvas.fire('pointerup');
    m.canvas.fire('pointerdown', { isPrimary: false }); m.canvas.fire('pointerup'); assert.equal(m.spins, 0);
});
function uiFixture(fail = false) {
    const elements = new Map(); const get = id => { if (!elements.has(id)) elements.set(id, new Element()); return elements.get(id); };
    const window = new Element(); let created = 0, spins = 0;
    const context = { window, bindCustomBet: () => ({ update() {} }), document: { getElementById: get, createElement: () => new Element() }, createLuckyMachine() {
        created++; if (fail) throw new Error('No WebGL'); return { setVisible() {}, update() {}, spin() { spins++; } };
    } };
    vm.createContext(context); vm.runInContext(read('lucky-ui.js'), context);
    const ui = context.createLucky777({}, {});
    return { get, ui, window, get created() { return created; }, get spins() { return spins; } };
}
test('panels default hidden, toggle restores them, and machine initializes only once on visit', () => {
    const m = uiFixture(); assert.equal(m.created, 0); assert.equal(m.get('lucky-panels').hidden, true);
    m.get('lucky-panel-toggle').fire('click'); assert.equal(m.get('lucky-panels').hidden, false);
    assert.equal(m.get('lucky-panel-toggle')['aria-expanded'], 'true');
    m.get('lucky-panel-toggle').fire('click'); assert.equal(m.get('lucky-panels').hidden, true);
    m.ui.setVisible(true); m.ui.setVisible(false); m.ui.setVisible(true); assert.equal(m.created, 1);
});
test('Space is scoped to the visible machine and ignores focused form controls', () => {
    const m = uiFixture(), event = { code: 'Space', target: { closest: () => false }, stopImmediatePropagation() {} };
    m.window.fire('keydown', event); assert.equal(m.spins, 0);
    m.ui.setVisible(true); m.window.fire('keydown', event); assert.equal(m.spins, 1);
    m.window.fire('keydown', { ...event, target: { closest: () => true } });
    m.ui.setVisible(false); m.window.fire('keydown', event); assert.equal(m.spins, 1);
});
test('WebGL failure leaves an explicit message and no misleading hidden controls', () => {
    const m = uiFixture(true); m.ui.setVisible(true); m.ui.setVisible(false); m.ui.setVisible(true);
    assert.equal(m.created, 1); assert.match(m.get('slots-view').child.textContent, /Your chips are safe/);
    assert.equal(m.get('lucky-panel-toggle').hidden, true);
});

// Exercise real machine accounting/animation code with geometry construction substituted.
// This checks state transitions, not rendered WebGL appearance.
function machineFixture() {
    const elements = new Map(), controls = [];
    const get = id => { if (!elements.has(id)) elements.set(id, new Element()); return elements.get(id); };
    for (const action of ['QuickPullAndSpin()', 'forceJackpot777()', 'setBetMode(500)', "setBetMode('ALL_IN')"]) {
        const el = new Element(); el.dataset.machineAction = action; controls.push(el);
    }
    const host = get('slots-view'); host.querySelectorAll = () => controls;
    let source = read('lucky-machine.js');
    const symbols = source.slice(source.indexOf('    const SYMBOL_DEFS'), source.indexOf('    function createHighDPISymbolTexture'));
    const begin = source.indexOf('    const mount =');
    const end = source.indexOf('    const ARM_REST_ANGLE');
    const object = `({ position: { set() {}, lerp() {} }, rotation: {}, scale: { set() {} }, lookAt() {} })`;
    source = source.slice(0,begin) + symbols + `
      const camera = ${object}; camera.updateProjectionMatrix = () => {};
      const camTargetPos = ${object}.position, camLookTarget = { set() {} }, fitDistance = () => 12;
      const renderer = { domElement: {}, setSize() {}, render() {} };
      const scene = {}, interactiveMeshes = [], deckButtons3D = [], bootRings = [], pullArcLEDs = [], marqueeBulbs = [];
      const leverPivot = ${object}, spinCapMesh = ${object}, grabHaloRing = ${object}, grabHaloMat = {}, cabinetGroup = { remove() {} };
      const paylineLaserMat = { color: { setHex() {} }, emissive: { setHex() {} } };
      const reels = Array.from({length:3}, () => ({ angle:0, group:{rotation:{}}, segments:Array.from({length:12}, () => ({mat:{}})) }));
      function update3DScoreboardTexture() {}
    ` + source.slice(end);
    const frames = []; const notices = []; const engine = new CasinoEngine(null, () => 0);
    const noop = function() {}; const context = { document: { getElementById: get, querySelectorAll: () => [] },
        window: { matchMedia: () => ({ matches: true }), addEventListener() {} },
        THREE: { Raycaster: noop, Vector2: noop, CylinderGeometry: noop, Clock: function() { this.getElapsedTime = () => 0; } },
        createLuckyInput: () => ({ cancel() {} }), requestAnimationFrame: fn => { frames.push(fn); return frames.length; },
        cancelAnimationFrame() {}, setTimeout() {}, performance: { now: () => 0 } };
    vm.createContext(context); vm.runInContext(source, context);
    const machine = context.createLuckyMachine(engine, { locked: () => !!engine.lock, changed() {}, notify: text => notices.push(text) }, host);
    machine.setVisible(true);
    const finish = () => { const spins = frames.splice(0).filter(fn => fn.name === 'updateReelSpin'); spins.forEach(fn => fn(3000)); };
    return { engine, machine, get, notices, finish, click: action => controls.find(c => c.dataset.machineAction === action).fire('click') };
}
test('machine saves one debit and payout, locks during spin, then reveals final wallet', () => {
    const m = machineFixture(); m.click('QuickPullAndSpin()');
    assert.equal(m.engine.active.balance, 5900); assert.equal(m.machine.displayBalance, 900); assert.equal(m.engine.lock, 'slots');
    m.click('QuickPullAndSpin()'); assert.equal(m.engine.active.balance, 5900);
    m.finish(); assert.equal(m.engine.lock, null); assert.equal(m.machine.displayBalance, null); assert.equal(m.get('uiWin').textContent, '5,000');
});
test('physical wager tiers and All In share accounting; an empty wallet gets no free refill', () => {
    const m = machineFixture(); m.click('setBetMode(500)'); m.click('forceJackpot777()'); m.finish();
    assert.equal(m.engine.active.balance, 25500);
    m.engine.active.balance = 15; m.machine.update(); m.click("setBetMode('ALL_IN')"); m.click('QuickPullAndSpin()'); m.finish();
    assert.equal(m.engine.active.balance, 750);
    m.engine.active.balance = 0; m.machine.update(); m.click('QuickPullAndSpin()');
    assert.equal(m.engine.active.balance, 0); assert.equal(m.engine.lock, null); assert.equal(m.notices.length, 1);
});

test('custom 777 amount remains exact and refuses a reduced wallet without debiting it', () => {
    const m = machineFixture(); m.machine.setCustomBet(137); m.click('forceJackpot777()');
    assert.equal(m.engine.active.balance, 7713); m.finish();
    m.engine.active.balance = 100; m.machine.update(); m.click('QuickPullAndSpin()');
    assert.equal(m.engine.active.balance, 100); assert.equal(m.engine.lock, null);
    assert.match(m.notices.at(-1), /enough chips/);
});
