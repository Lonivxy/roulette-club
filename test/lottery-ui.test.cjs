const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
require('../src/lottery-core.js');require('../src/club-core.js');
function fixture({reduced=false,history=false}={}){
    class Element {
        constructor(){this.children=[];this.events={};this.dataset={};this.hidden=false;this.textContent='';}
        addEventListener(type,fn){(this.events[type]??=[]).push(fn);}fire(type,event={}){return Promise.all((this.events[type]??[]).map(fn=>fn(event)));}
        setAttribute(key,value){this[key]=value;}replaceChildren(...children){this.children=children;}append(...children){this.children.push(...children);}
    }
    const nodes=new Map(),get=id=>{if(!nodes.has(id))nodes.set(id,new Element());return nodes.get(id);};
    const e=new CasinoEngine(null,()=>0,()=>100000000);e.active.balance=2000000;
    if(history){e.buyLottery(1000,{jackpot:true});e.lock=null;}
    const buttons=CasinoLottery.prices.map(price=>{const b=new Element();b.dataset.lotteryPrice=String(price);return b;});
    const win=new Element();win.matchMedia=()=>({matches:reduced});const timers=new Map(),notices=[];let id=0,ui;
    const context={CasinoLottery,document:{getElementById:get,createElement:()=>new Element(),querySelectorAll:()=>buttons},window:win,
        setTimeout:fn=>{timers.set(++id,fn);return id;},clearTimeout:id=>timers.delete(id)};
    vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'../src/lottery-ui.js'),'utf8'),context);
    ui=context.createLotteryGame(e,{locked:()=>!!e.lock,changed(){ui.update();},notify:text=>notices.push(text)});ui.setVisible(true);
    return {e,ui,get,buttons,win,timers,notices,async finish(){for(const [id,fn] of [...timers]){timers.delete(id);await fn();}}};
}

test('all three prices update exact prize amounts and the confirmed full probability table',async()=>{
    const t=fixture();assert.equal(t.get('lottery-odds').children.length,11);assert.equal(t.get('lottery-odds').children[0].children[1].textContent,'0.005%');
    assert.equal(t.get('lottery-odds').children.at(-1).children[1].textContent,'59.875%');assert.match(t.get('lottery-theory').textContent,/74\.3%/);
    await t.buttons[2].fire('click');assert.match(t.get('lottery-cost').textContent,/1,000,000/);assert.equal(t.get('lottery-top-prize').textContent,'100,000,000');assert.equal(t.buttons[2]['aria-pressed'],'true');
    await t.buttons[1].fire('click');assert.equal(t.get('lottery-top-prize').textContent,'1,000,000');
});

test('buying locks the view, hides the result until reveal, and cannot purchase twice during the animation',async()=>{
    const t=fixture();await t.ui.forceJackpot();assert.equal(t.e.active.balance,2099000);assert.equal(t.ui.displayBalance,1999000);assert.equal(t.ui.animating,true);
    assert.equal(t.get('lottery-ticket')['aria-busy'],'true');assert.match(t.get('lottery-multiplier').textContent,/开奖中/);assert.equal(t.get('lottery-history').children[0].textContent,'还没有彩票记录。');
    await t.ui.forceJackpot();assert.equal(t.e.active.lotteryHistory.length,1);assert.equal(t.get('lottery-buy').disabled,true);
    await t.get('lottery-reveal').fire('click');assert.equal(t.ui.animating,false);assert.equal(t.ui.displayBalance,null);assert.equal(t.e.lock,null);assert.equal(t.timers.size,0);
    assert.equal(t.get('lottery-multiplier').textContent,'100×');assert.match(t.get('lottery-result').textContent,/100,000/);assert.equal(t.get('lottery-history').children.length,1);
});

test('reduced motion reveals immediately and ordinary mode reveals automatically',async()=>{
    const reduced=fixture({reduced:true});await reduced.ui.forceJackpot();assert.equal(reduced.ui.animating,false);assert.equal(reduced.timers.size,0);assert.equal(reduced.e.lock,null);
    const regular=fixture();await regular.get('lottery-buy').fire('click');assert.equal(regular.ui.animating,true);await regular.finish();assert.equal(regular.ui.animating,false);assert.equal(regular.e.active.balance,2099000);
});

test('saved ticket results are shown after reload without buying another and player switching resets the display',()=>{
    const t=fixture({history:true}),balance=t.e.active.balance;t.ui.update();assert.equal(t.get('lottery-prize-name').textContent,'特等奖');assert.equal(t.e.active.balance,balance);
    t.e.switchUser('jamie');t.ui.update();assert.equal(t.get('lottery-prize-name').textContent,'你的下一份幸运');assert.equal(t.get('lottery-history').children[0].textContent,'还没有彩票记录。');
});

test('insufficient cash, the ten-chip allowance and pending games prevent purchases without changing balances',async()=>{
    const t=fixture();t.e.active.balance=10;t.e.active.recovery={deficit:200};t.ui.update();assert.equal(t.get('lottery-buy').disabled,true);assert.match(t.get('lottery-status').textContent,/负数模式/);
    await t.ui.forceJackpot();assert.equal(t.e.active.balance,10);assert.equal(t.e.active.lotteryHistory,undefined);
    t.e.active.recovery=null;t.e.active.balance=2000;t.e.lock='blackjack';await t.ui.forceJackpot();assert.equal(t.e.active.balance,2000);
});

test('Space is scoped to the lottery view and respects focused controls, repeat and modifiers',async()=>{
    const t=fixture(),event={code:'Space',target:{closest:()=>false},preventDefault(){},stopImmediatePropagation(){}};
    t.ui.setVisible(false);await t.win.fire('keydown',event);assert.equal(t.e.active.lotteryHistory,undefined);t.ui.setVisible(true);
    for(const extra of [{repeat:true},{shiftKey:true},{ctrlKey:true},{altKey:true},{metaKey:true},{target:{closest:()=>true}}])await t.win.fire('keydown',{...event,...extra});
    assert.equal(t.e.active.lotteryHistory,undefined);await t.win.fire('keydown',event);assert.equal(t.e.active.lotteryHistory.length,1);await t.win.fire('keydown',event);assert.equal(t.ui.animating,false);
});
