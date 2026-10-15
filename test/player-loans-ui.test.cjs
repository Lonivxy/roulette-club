const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
require('../src/club-core.js');
function ui() {
    class Element {
        constructor(tag='div'){this.tag=tag;this.children=[];this.events={};this.value='';}
        addEventListener(type,fn){(this.events[type]??=[]).push(fn);}
        fire(type){for(const fn of this.events[type]??[])fn({preventDefault(){}});}
        append(...nodes){this.children.push(...nodes);} replaceChildren(...nodes){this.children=nodes;}
        setAttribute(key,value){this[key]=value;}
    }
    const nodes=new Map(),get=id=>{if(!nodes.has(id))nodes.set(id,new Element());return nodes.get(id);};
    const e=new CasinoEngine(null,()=>0),notices=[];let controller,locked=false;
    const context={document:{getElementById:get,createElement:tag=>new Element(tag)}};vm.createContext(context);
    vm.runInContext(fs.readFileSync(path.join(__dirname,'../src/player-loans-ui.js'),'utf8'),context);
    controller=context.createPlayerLoansUI(e,{locked:()=>locked,transact(action){try{if(locked)throw Error('locked');action();controller.render();return true;}catch(error){notices.push(error.message);return false;}}});
    controller.render();get('peer-loan-user').value='jamie';get('peer-loan-amount').value='500';get('peer-loan-rate').value='2';get('peer-loan-minutes').value='10';
    return {e,get,controller,notices,lock(){locked=true;controller.render();}};
}
test('lender form creates a pending agreement; switching to borrower exposes consent and repayment controls',()=>{
    const t=ui();t.get('peer-loan-form').fire('submit');assert.equal(t.e.active.balance,1000);assert.equal(t.e.data.loans[0].status,'pending');
    let row=t.get('peer-loan-list').children[0];assert.equal(row.children.at(-1).children[0].textContent,'撤销协议');
    t.e.switchUser('jamie');t.controller.render();row=t.get('peer-loan-list').children[0];row.children.at(-1).children[0].fire('click');
    assert.equal(t.e.active.balance,1500);assert.equal(t.get('peer-debt').textContent,'500');
    row=t.get('peer-loan-list').children[0];const form=row.children.find(child=>child.tag==='form');form.children[0].value='500';form.fire('submit');
    assert.equal(t.e.data.loans[0].status,'repaid');assert.equal(t.e.active.balance,1000);assert.equal(t.e.data.users[0].balance,1000);
});
test('locked player controls cannot propose or accept loans',()=>{
    const t=ui();t.lock();t.get('peer-loan-form').fire('submit');assert.equal(t.e.data.loans.length,0);assert.equal(t.get('peer-loan-rate').disabled,true);
});
test('players and bank are separate panels and show the requested real-time interest rules',()=>{
    const html=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8');
    assert.ok(html.includes('id="players-view"'));assert.ok(html.includes('id="bank-view"'));
    const players=html.slice(html.indexOf('<section id="players-view"'),html.indexOf('<section id="bank-view"'));
    assert.ok(players.includes('id="transfer-form"'));assert.ok(players.includes('id="peer-loan-form"'));assert.ok(!players.includes('id="bank-form"'));
    assert.ok(html.includes('每 30 分钟'));assert.ok(html.includes('每 5 分钟'));assert.ok(html.includes('0.5%'));
});
