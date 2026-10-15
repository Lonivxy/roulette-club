const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
require('../src/club-core.js');require('../src/blackjack-core.js');
const html=fs.readFileSync(path.join(__dirname,'../src/blackjack.html'),'utf8');
const script=fs.readFileSync(path.join(__dirname,'../src/blackjack-ui.js'),'utf8');
function ui(engine=new CasinoEngine(null,()=>.5)) {
    class Element {
        constructor(){this.children=[];this.dataset={};this.listeners={};this.textContent='';this.value='50';this.hidden=false;this.firstChild={textContent:''};}
        addEventListener(type,handler){(this.listeners[type]||=[]).push(handler);}
        fire(type,event={}){for(const handler of this.listeners[type]||[])handler(event);}
        setAttribute(name,value){this[name]=value;}
        append(...children){this.children.push(...children);}
        replaceChildren(...children){this.children=children;}
    }
    const elements=new Map();for(const match of html.matchAll(/\bid="([^"]+)"/g))elements.set(match[1],new Element());
    const chips=[10,50,100,500].map(value=>{const element=new Element();element.dataset.bjChip=String(value);return element;});
    const bank=new Element();elements.get('blackjack-view').querySelectorAll=selector=>selector==='[data-go-bank]'?[bank]:selector.includes('.bj-step')?[...chips,elements.get('bj-bet-minus'),elements.get('bj-bet-plus')]:chips;
    const timers=new Map(),notices=[];let timerId=0,changes=0;
    const sandbox={CasinoBlackjack,document:{getElementById:id=>{assert.ok(elements.has(id),'Missing element '+id);return elements.get(id);},createElement:()=>new Element()},
        window:{matchMedia:()=>({matches:true}),addEventListener(){}},createBlackjackScene:()=>null,
        setTimeout:fn=>{timers.set(++timerId,fn);return timerId;},clearTimeout:id=>timers.delete(id)};
    vm.createContext(sandbox);vm.runInContext(script,sandbox);
    const controller=sandbox.createBlackjackTable(engine,{changed:()=>changes++,notify:message=>notices.push(message)});
    function dealSequence(ranks) {
        const cards=CasinoBlackjack.makeShoe(()=>.5),sequence=ranks.map(rank=>({rank,suit:0}));
        for(const card of sequence){const index=cards.findIndex(c=>c.rank===card.rank&&c.suit===0);cards.splice(index,1);}
        controller.game.shoeFactory=()=>[...cards,...sequence.toReversed()];
    }
    function flush(){let count=0;while(timers.size){const [id,fn]=timers.entries().next().value;timers.delete(id);fn();assert.ok(count++<50);}}
    controller.setVisible(true);
    return {engine,controller,elements,chips,notices,dealSequence,flush,click:action=>elements.get('bj-'+action).fire('click'),get changes(){return changes;}};
}
test('table controls deal, hide the hole card, stand, run the dealer and settle the shared wallet',()=>{
    const t=ui();t.dealSequence([10,9,8,7,10]);t.click('deal');
    assert.equal(t.engine.active.balance,950);assert.equal(t.controller.animating,true);assert.equal(t.elements.get('bj-deal').disabled,true);
    assert.match(t.elements.get('bj-dealer-total').textContent,/hidden/);t.flush();assert.equal(t.elements.get('bj-hit').disabled,false);
    t.click('stand');t.flush();assert.equal(t.engine.active.balance,1050);assert.equal(t.engine.lock,null);
    assert.equal(t.elements.get('bj-deal').disabled,false);assert.match(t.elements.get('bj-status').textContent,/Net \+50/);
});
test('wager controls, low funds, camera and sound controls remain functional without WebGL',()=>{
    const t=ui();assert.equal(t.elements.get('bj-render-note').hidden,false);
    t.chips[1].fire('click');assert.equal(t.elements.get('bj-wager').value,'100');t.click('bet-minus');assert.equal(t.elements.get('bj-wager').value,'90');
    t.click('camera');assert.equal(t.elements.get('bj-camera').textContent,'View: Overhead');t.click('sound');assert.equal(t.elements.get('bj-sound')['aria-pressed'],'true');
    t.engine.active.balance=0;t.click('deal');assert.equal(t.engine.active.balance,0);assert.match(t.notices.at(-1),/Not enough chips/);
});
test('replacement UI resumes a pending dealer turn and does not pay twice',()=>{
    const values=new Map(),storage={getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v)};
    const t=ui(new CasinoEngine(storage,()=>.5));t.dealSequence([10,9,8,7,10]);t.click('deal');t.flush();t.click('stand');
    const restored=ui(new CasinoEngine(storage,()=>.5));assert.equal(restored.engine.lock,'blackjack');restored.flush();assert.equal(restored.engine.active.balance,1050);
    const next=new CasinoEngine(storage);new CasinoBlackjack(next);assert.equal(next.active.balance,1050);assert.equal(next.data.ledger.length,1);
});

test('typing a custom wager updates the deal button and debits the exact amount',()=>{
    const t=ui();t.dealSequence([10,9,8,7,10]);
    const input=t.elements.get('bj-wager');input.value='137';input.fire('input');
    assert.equal(t.elements.get('bj-deal').disabled,false);t.click('deal');
    assert.equal(t.engine.active.balance,863);assert.equal(input.disabled,true);
    t.flush();t.click('stand');t.flush();assert.equal(t.engine.active.balance,1137);
    input.value='1.5';input.fire('input');assert.equal(t.elements.get('bj-deal').disabled,true);
    input.value='2000';input.fire('input');assert.equal(t.elements.get('bj-deal').disabled,true);
});
