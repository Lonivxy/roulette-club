const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
require('../src/club-core.js');
function keyboard() {
    const listeners={};let fired=0,prevented=0,stopped=0;
    const target={addEventListener(type,fn){(listeners[type]||=[]).push(fn);}},context={};
    vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'../src/jackpot-shortcut.js'),'utf8'),context);
    context.bindJackpotShortcut(target,()=>fired++);
    const send=(type,code,extra={})=>{const event={code,shiftKey:true,target:{closest:()=>false},preventDefault(){prevented++;},stopImmediatePropagation(){stopped++;},...extra};for(const fn of listeners[type]||[])fn(event);};
    return {send,context,get fired(){return fired;},get prevented(){return prevented;},get stopped(){return stopped;}};
}
test('Left Shift + F fires once and suppresses repeats; Right Shift and plain F do not fire',()=>{
    const t=keyboard();t.send('keydown','KeyF',{shiftKey:false});t.send('keydown','ShiftRight');t.send('keydown','KeyF');assert.equal(t.fired,0);
    t.send('keydown','ShiftLeft');t.send('keydown','KeyF');t.send('keydown','KeyF',{repeat:true});assert.equal(t.fired,1);assert.equal(t.prevented,1);assert.equal(t.stopped,1);
    t.send('keyup','ShiftLeft');t.send('keydown','KeyF');assert.equal(t.fired,1);
});
test('focus, extra modifiers, IME input and blur cannot trigger a stale shortcut',()=>{
    const t=keyboard();t.send('keydown','ShiftLeft');
    for(const extra of [{ctrlKey:true},{altKey:true},{metaKey:true},{isComposing:true},{target:{closest:()=>true}}])t.send('keydown','KeyF',extra);
    assert.equal(t.fired,0);t.send('blur');t.send('keydown','KeyF');assert.equal(t.fired,0);
    t.send('keydown','ShiftLeft');t.send('keydown','KeyF');assert.equal(t.fired,1);
});
test('roulette maximizes the sum of number, color, parity and zero payouts',()=>{
    const t=keyboard(),bets=CasinoEngine.emptyBets();bets.RED=100;bets.ODD=100;bets.numbers[2]=15;
    assert.equal(t.context.bestRouletteNumber(bets),1);
    bets.numbers[2]=20;assert.equal(t.context.bestRouletteNumber(bets),2);
    bets.GREEN=21;assert.equal(t.context.bestRouletteNumber(bets),0);
    bets.numbers[7]=100;assert.equal(t.context.bestRouletteNumber(bets),7);
});
test('slot shortcut pays 777 once at the selected wager and preserves equipped merchant cards',()=>{
    const engine=new CasinoEngine(null,()=>.3);engine.active.balance=10000;
    const card=engine.buyCard('diamonds',100);engine.armCard(card.id);
    const result=engine.spinSlots(100,null,{jackpot:true});assert.equal(result.payout,5000);assert.equal(engine.active.balance,11900);
    assert.equal(engine.armedCard.id,card.id);assert.equal(engine.active.cards.length,1);
    assert.throws(()=>engine.spinSlots(100,null,{jackpot:true}));assert.equal(engine.active.balance,11900);
    engine.lock=null;assert.equal(engine.spinSlots(100).multiplier,25);assert.equal(engine.armedCard,null);
});
test('roulette shortcut places a selected chip if needed, targets the best existing bet and never places a duplicate during a spin',()=>{
    const html=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8');
    const source=html.slice(html.indexOf('        function forceRouletteJackpot()'),html.indexOf('        function triggerSpin('));
    const context={window:{THREE:{}},renderer:{},state:{bets:CasinoEngine.emptyBets()},POCKETS:Array.from({length:24},(_,number)=>({number})),casino:{engine:{lock:null},toast(){}},
        getTotalActiveBet(){return CasinoEngine.sumBets(context.state.bets);},placeNumberBet(n){context.state.bets.numbers[n]=137;},triggerSpin(){context.casino.engine.lock='roulette';}};
    vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'../src/jackpot-shortcut.js'),'utf8')+'\n'+source,context);
    context.forceRouletteJackpot();assert.equal(context.state.bets.numbers[0],137);assert.equal(context.state.forcedPocketIndex,0);
    context.forceRouletteJackpot();assert.equal(context.state.bets.numbers[0],137);
    context.state.bets=CasinoEngine.emptyBets();context.state.bets.numbers[9]=500;context.forceRouletteJackpot();assert.equal(context.state.forcedPocketIndex,9);
    assert.match(html,/state\.ballAngle = state\.wheelAngle \+ POCKETS\[winningIndex\]\.localAngle/);
});
