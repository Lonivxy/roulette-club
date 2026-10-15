const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const buildLucky = require('../build-lucky.cjs');
require('../src/club-core.js');
const reference = fs.readFileSync(path.join(__dirname, '../src/lucky-reference.html'), 'utf8').replace(/\r\n/g, '\n');

// A small DOM substitute exercises initialization and wallet callbacks without a browser.
function machine() {
    class Element {
        constructor() {
            this.children = []; this.dataset = {}; this.listeners = {}; this.textContent = '';
            this.style = { setProperty() {} };
            const classes = new Set();
            this.classList = { add: s => classes.add(s), remove: s => classes.delete(s), contains: s => classes.has(s) };
        }
        set innerHTML(value) { this.children = []; this.html = value; }
        appendChild(child) { this.children.push(child); }
        addEventListener(name, handler) { (this.listeners[name] ||= []).push(handler); }
        fire(name, event = {}) { for (const handler of this.listeners[name] || []) handler(event); }
        setAttribute(name, value) { this[name] = value; }
        querySelector(selector) { const index = selector.match(/data-index="(\d+)"/)[1]; return this.children.find(c => String(c.dataset.index) === index); }
        getBoundingClientRect() { return { left: 10, top: 100, width: 500, height: 600 }; }
    }
    const built = buildLucky(reference), elements = new Map();
    for (const m of built.html.matchAll(/\bid="([^"]+)"/g)) elements.set(m[1], new Element());
    const host = elements.get('slots-view');
    const controls = [...built.html.matchAll(/data-lucky-action="([^"]+)"/g)].map(m => {
        const element = new Element(); element.dataset.luckyAction = m[1]; return element;
    });
    host.querySelectorAll = () => controls;
    elements.get('fxCanvas').getContext = () => null;
    const frames = [], windowHandlers = {}, notices = [];
    const originalRouletteTrigger = () => 'roulette';
    const sandbox = {
        document: { getElementById: id => { assert.ok(elements.has(id), `Missing element ${id}`); return elements.get(id); },
            createElement: () => new Element(), querySelectorAll: () => [] },
        window: { innerWidth: 1024, innerHeight: 768, matchMedia: () => ({ matches: true }),
            addEventListener: (key, handler) => (windowHandlers[key] ||= []).push(handler) },
        requestAnimationFrame: callback => { frames.push(callback); return frames.length; },
        cancelAnimationFrame() {}, setTimeout() {}, performance: { now: () => 0 },
        triggerSpin: originalRouletteTrigger
    };
    vm.createContext(sandbox); vm.runInContext(built.script, sandbox);
    const engine = new CasinoEngine(null, () => 0); let changes = 0;
    const controller = sandbox.createLucky777(engine, { locked: () => Boolean(engine.lock), changed: () => changes++, notify: message => notices.push(message) });
    const click = action => controls.find(c => c.dataset.luckyAction === action).fire('click');
    const finish = () => { while (frames.length) frames.shift()(3000); };
    return { engine, controller, elements, notices, sandbox, originalRouletteTrigger, click, finish, get changes() { return changes; } };
}

test('supplied cabinet initializes 36 facets and preserves the roulette function namespace', () => {
    const m = machine();
    for (let i = 0; i < 3; i++) assert.equal(m.elements.get('reel' + i).children.length, 12);
    assert.equal(m.sandbox.triggerSpin, m.originalRouletteTrigger);
    assert.equal(m.elements.get('creditsDisplay').textContent, '1,000');
});
test('cabinet controls debit the active wallet once and finish with the saved payout', () => {
    const m = machine(); m.controller.setVisible(true);
    m.click('spin'); assert.equal(m.engine.active.balance, 1980); assert.equal(m.engine.lock, 'slots');
    assert.equal(m.controller.displayBalance, 980);
    m.click('spin'); assert.equal(m.engine.active.balance, 1980);
    m.finish(); assert.equal(m.engine.lock, null); assert.equal(m.controller.displayBalance, null);
    assert.equal(m.elements.get('winDisplay').textContent, '1,000');
    assert.equal(m.elements.get('creditsDisplay').textContent, '1,980');
    assert.equal(m.changes, 2);
});
test('force button, max bet, camera modes and low funds connect through the replacement', () => {
    const m = machine(); m.controller.setVisible(true);
    m.click('iso'); m.click('flat'); m.click('tilt');
    m.click('max'); m.click('force');
    assert.equal(m.engine.active.balance, 5900); m.finish();
    assert.match(m.engine.data.ledger[0].text, /forced jackpot/);
    m.engine.switchUser('jamie'); m.controller.resetPlayer(); m.controller.update(false);
    assert.equal(m.elements.get('creditsDisplay').textContent, '1,000');
    assert.equal(m.elements.get('winDisplay').textContent, '0');
    m.engine.active.balance = 0; m.controller.update(false); m.click('spin');
    assert.equal(m.engine.active.balance, 0); assert.match(m.notices.at(-1), /enough chips/);
    m.controller.setVisible(false); m.click('force'); assert.equal(m.engine.lock, null);
});
