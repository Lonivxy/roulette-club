const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
require('../src/arcade-core.js');require('../src/club-core.js');
function fixture(kind='plinko',{unavailable=false,reduced=false}={}){
    class Element{constructor(){this.children=[];this.events={};this.dataset={};this.value='';this.hidden=true;}
        addEventListener(type,fn){(this.events[type]??=[]).push(fn);}fire(type,event={}){return Promise.all((this.events[type]??[]).map(fn=>fn({preventDefault(){},...event})));}
        setAttribute(key,value){this[key]=value;}replaceChildren(...children){this.children=children;}}
    const nodes=new Map(),get=id=>{if(!nodes.has(id))nodes.set(id,new Element());return nodes.get(id);},win=new Element();win.matchMedia=()=>({matches:reduced});
    const e=new CasinoEngine(null,()=>.9,()=>1000000),notices=[];let ui,done,result,created=0,locked=false;
    for(const game of ['plinko','dice']){get(game+'-wager').value='10';get(game+'-risk').value='high';get(game+'-lane').value='center';get(game+'-kind').value='small';get(game+'-target').value='4';}
    const context={CasinoArcade,document:{getElementById:get,createElement:()=>new Element(),querySelectorAll:()=>[]},window:win,
        createArcadeScene(){created++;if(unavailable)return null;return {setVisible(){},updateOptions(){},play(value,duration,callback){result=value;done=callback;if(duration===0)callback();}};}};
    vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'../src/arcade-ui.js'),'utf8'),context);
    ui=context.createArcadeGame(kind,e,{locked:()=>locked,changed(){ui.update();},notify(message){notices.push(message);}});
    return {e,get,ui,win,notices,finish(){done();},get result(){return result;},get created(){return created;},lock(){locked=true;ui.update();}};
}
test('Plinko initializes once, debits the custom wager, locks during animation and reveals its saved payout',async()=>{
    const t=fixture();assert.equal(t.created,0);t.ui.setVisible(true);t.ui.setVisible(false);t.ui.setVisible(true);assert.equal(t.created,1);
    t.get('plinko-wager').value='137';await t.ui.forceJackpot();assert.equal(t.result.wager,137);assert.equal(t.result.multiplier,100);assert.equal(t.ui.displayBalance,863);assert.equal(t.ui.animating,true);
    const balance=t.e.active.balance;await t.ui.forceJackpot();assert.equal(t.e.active.balance,balance);t.finish();assert.equal(t.ui.animating,false);assert.equal(t.ui.displayBalance,null);assert.equal(t.e.lock,null);assert.match(t.get('plinko-result').textContent,/13,700/);assert.equal(t.get('plinko-history').children.length,1);
});
test('dice controls select exact sums, report real results, and reject unaffordable rolls before animation',async()=>{
    const t=fixture('dice');t.ui.setVisible(true);t.get('dice-kind').value='sum';await t.get('dice-kind').fire('change');assert.equal(t.get('dice-target-field').hidden,false);
    t.get('dice-wager').value='10';t.get('dice-target').value='4';await t.ui.forceJackpot();assert.equal(t.result.total,4);assert.equal(t.result.payout,610);t.finish();assert.match(t.get('dice-result').textContent,/610/);
    t.get('dice-wager').value='1000000';const before=t.e.active.balance;await t.get('dice-form').fire('submit');assert.equal(t.e.active.balance,before);assert.equal(t.ui.animating,false);assert.ok(t.notices.length>0);
});
test('negative-mode entry resets the selected wager to ten and reduced-motion play completes immediately',async()=>{
    const t=fixture('dice',{reduced:true});t.ui.setVisible(true);t.get('dice-wager').value='100';t.e.active.recovery={deficit:200};t.e.active.balance=10;t.ui.update();assert.equal(t.get('dice-wager').value,'10');
    await t.get('dice-form').fire('submit');assert.equal(t.ui.animating,false);assert.equal(t.e.active.recovery.deficit,210);assert.equal(t.e.active.balance,10);assert.match(t.get('dice-status').textContent,/-210/);
});
test('Space is scoped to the visible game and keyboard fields; unsupported WebGL never debits chips',async()=>{
    const t=fixture();const event={code:'Space',target:{closest:()=>false},stopImmediatePropagation(){}};
    await t.win.fire('keydown',event);assert.equal(t.e.active.arcadeHistory,undefined);t.ui.setVisible(true);
    await t.win.fire('keydown',{...event,target:{closest:()=>true}});assert.equal(t.e.active.arcadeHistory,undefined);
    await t.win.fire('keydown',event);await Promise.resolve();assert.equal(t.e.active.arcadeHistory.length,1);t.finish();
    const fail=fixture('plinko',{unavailable:true});fail.ui.setVisible(true);assert.equal(fail.get('plinko-unavailable').hidden,false);await fail.ui.forceJackpot();assert.equal(fail.e.active.balance,1000);assert.equal(fail.get('plinko-play').disabled,true);
});
