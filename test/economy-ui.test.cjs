const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
require('../src/club-core.js');
function ui() {
    class Element {
        constructor(){this.children=[];this.events={};this.value='';this.hidden=false;}
        addEventListener(type,fn){(this.events[type]||=[]).push(fn);}
        fire(type){for(const fn of this.events[type]||[])fn({preventDefault(){}});}
        append(...children){this.children.push(...children);}
        replaceChildren(...children){this.children=children;}
        setAttribute(name,value){this[name]=value;}
        reset(){this.value='';}
    }
    const nodes=new Map(),get=id=>{if(!nodes.has(id))nodes.set(id,new Element());return nodes.get(id);};
    get('market-stake').value='100';const engine=new CasinoEngine(null,()=>.5),notices=[];let locked=false,played=false,controller;
    const context={CasinoEngine,document:{getElementById:get,createElement:()=>new Element()}};
    vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'../src/economy-ui.js'),'utf8'),context);
    controller=context.createEconomyUI(engine,{locked:()=>locked,playSlots:()=>played=true,transact(action){
        try{if(locked)throw new Error('Locked');action();controller.render();return true;}catch(error){notices.push(error.message);return false;}
    }});controller.render();
    return {engine,get,controller,notices,setLocked(value){locked=value;controller.render();},get played(){return played;}};
}
test('loan offer appears only with exhausted bank and empty wallet, while repayments remain accessible',()=>{
    const t=ui();assert.equal(t.get('shark-panel').hidden,true);
    t.engine.borrow(100000);t.engine.active.balance=0;t.controller.render();
    assert.equal(t.get('shark-panel').hidden,false);assert.equal(t.get('shark-offer').hidden,false);assert.equal(t.get('bank-borrow').disabled,true);
    t.get('shark-borrow-amount').value='1500000';t.get('shark-borrow-form').fire('submit');
    assert.equal(t.engine.active.balance,1500000);assert.equal(t.get('shark-offer').hidden,true);assert.equal(t.get('shark-repayment').hidden,false);
    t.get('shark-repay-amount').value='1500000';t.get('shark-repay-form').fire('submit');
    assert.equal(t.engine.active.sharkDebt,0);assert.equal(t.get('shark-offer').hidden,false);
});
test('merchant purchase, equip, player switch and cancellation update visible inventory and armed banner',()=>{
    const t=ui();t.engine.active.balance=10000;t.controller.render();
    const product=t.get('market-catalog').children[0],buy=product.children.at(-1);assert.equal(buy.disabled,false);buy.fire('click');
    assert.equal(t.engine.active.balance,6500);assert.equal(t.engine.active.cards.length,1);
    t.get('market-inventory').children[0].children.at(-1).fire('click');
    assert.equal(t.played,true);assert.equal(t.get('lucky-armed-card').hidden,false);assert.match(t.get('lucky-card-label').textContent,/777.*100/);
    t.engine.switchUser('jamie');t.controller.render();assert.equal(t.get('lucky-armed-card').hidden,true);
    t.engine.switchUser('alex');t.controller.render();t.get('lucky-card-cancel').fire('click');assert.equal(t.get('lucky-armed-card').hidden,true);assert.equal(t.engine.active.cards.length,1);
});
test('merchant invalid amount and active-round locks disable purchases and loan transactions',()=>{
    const t=ui();t.engine.active.balance=100000;t.get('market-stake').value='1.5';t.get('market-stake').fire('input');
    assert.equal(t.get('market-stake')['aria-invalid'],'true');assert.ok(t.get('market-catalog').children.every(card=>card.children.at(-1).disabled));
    t.get('market-stake').value='100';t.setLocked(true);
    assert.ok(t.get('market-catalog').children.every(card=>card.children.at(-1).disabled));assert.equal(t.get('market-stake').disabled,true);
    t.get('shark-borrow-amount').value='1';t.get('shark-borrow-form').fire('submit');assert.equal(t.engine.active.sharkDebt,0);assert.equal(t.notices.at(-1),'Locked');
});
