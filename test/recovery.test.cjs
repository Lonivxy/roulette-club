const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
require('../src/club-core.js');require('../src/blackjack-core.js');
const Engine=globalThis.CasinoEngine,Blackjack=globalThis.CasinoBlackjack;
const losing=[2,4,5];
function fixture(){const values=new Map(),storage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v)};let now=1000000;
    const engine=new Engine(storage,()=>0.25,()=>now);return {engine,storage,clock:()=>now};}
function enter(t){const e=t.engine;e.borrow(100000);e.active.balance=0;e.borrowShark(10);e.spinSlots(10,losing);e.lock=null;return e;}

test('only exhausted shark chips enter negative zero with ten chips, persisted once across reloads',()=>{
    const t=fixture(),e=enter(t);assert.equal(e.active.balance,10);assert.equal(e.active.recovery.deficit,0);
    assert.equal(e.active.debt,100000);assert.equal(e.active.sharkDebt,10);assert.equal(e.canBorrowShark,false);
    for(let i=0;i<3;i++){const restored=new Engine(t.storage,()=>0,t.clock);assert.equal(restored.active.balance,10);assert.equal(restored.active.recovery.deficit,0);}
    const ordinary=fixture().engine;ordinary.active.balance=0;ordinary.completeRound(-1000);assert.equal(ordinary.active.recovery,undefined);assert.equal(ordinary.active.balance,0);
});
test('fixed ten-chip rounds record net losses, deduct net profit and exit with the agreed surplus',()=>{
    const t=fixture(),e=enter(t);
    e.spinSlots(10,losing);e.lock=null;assert.equal(e.active.recovery.deficit,10);assert.equal(e.active.balance,10);
    e.active.recovery.deficit=200;
    const win=e.spinSlots(5,[0,6,2]);e.lock=null;assert.equal(win.payout,25);assert.equal(win.net,20);
    assert.equal(e.active.recovery.deficit,180);assert.equal(e.active.balance,10);
    e.active.recovery.deficit=20;e.active.balance+=30;e.completeRound(30);
    assert.equal(e.active.recovery,null);assert.equal(e.active.balance,20);
    assert.equal(e.active.sharkDebt,10);assert.equal(e.active.debt,100000);
});
test('a push leaves the deficit unchanged and partial losses reset the next round to ten',()=>{
    const e=enter(fixture());e.active.recovery.deficit=200;
    e.spinSlots(5,[1,2,4]);e.lock=null;assert.equal(e.active.recovery.deficit,200);assert.equal(e.active.balance,10);
    e.spinSlots(4,losing);e.lock=null;assert.equal(e.active.recovery.deficit,204);assert.equal(e.active.balance,10);
    assert.throws(()=>e.spinSlots(11,losing));
});
test('reserved roulette and pending blackjack funds never trigger a premature recovery refill',()=>{
    const t=fixture(),e=t.engine;e.active.sharkDebt=100;e.active.sharkBorrowed=true;e.active.balance=0;e.active.bets.RED=10;e.save();
    let restored=new Engine(t.storage,()=>0,t.clock,{recoverRoulette:false});assert.equal(restored.active.balance,0);assert.equal(restored.active.recovery,undefined);
    restored.active.bets=Engine.emptyBets();restored.active.blackjack={phase:'player'};restored.save();
    restored=new Engine(t.storage,()=>0,t.clock);assert.equal(restored.active.balance,0);assert.equal(restored.active.recovery,undefined);
});
test('ten-chip game funds cannot be gifted, lent, borrowed again, spent at the market or used for repayments',()=>{
    const t=fixture(),e=enter(t),snapshot=JSON.stringify(e.data);
    for(const action of [()=>e.transfer('jamie',1),()=>e.offerLoan('jamie',1,1),()=>e.borrow(1),()=>e.borrowShark(1),()=>e.repay(1),()=>e.repayShark(1),()=>e.buyCard('seven',1)])assert.throws(action);
    assert.equal(JSON.stringify(e.data),snapshot);
    e.switchUser('jamie');e.transfer('alex',5);e.switchUser('alex');assert.equal(e.active.recovery,null);assert.equal(e.active.balance,15);
});
test('administrator adjustments apply to negative records and cannot exceed accounting limits',()=>{
    const e=enter(fixture());e.active.recovery.deficit=200;
    e.adminAdjust('alex','add',20);assert.equal(e.active.recovery.deficit,180);assert.equal(e.active.balance,10);
    e.adminAdjust('alex','remove',10);assert.equal(e.active.recovery.deficit,190);
    e.adminAdjust('alex','add',200);assert.equal(e.active.recovery,null);assert.equal(e.active.balance,20);
});
test('blackjack natural winnings offset only their net profit in negative mode',()=>{
    const e=enter(fixture());e.active.recovery.deficit=200;const game=new Blackjack(e);
    const result=game.forceJackpot(8);assert.equal(result.result.payout,20);assert.equal(result.result.net,12);
    assert.equal(e.active.recovery.deficit,188);assert.equal(e.active.balance,10);
});

test('blackjack keeps its stake reserved on reload and settles its full net result once',()=>{
    const t=fixture(),e=enter(t);e.active.recovery.deficit=200;
    const shoe=Blackjack.makeShoe(()=>.5),sequence=[10,10,7,9].map(rank=>{const i=shoe.findIndex(c=>c.rank===rank);return shoe.splice(i,1)[0];});
    const game=new Blackjack(e,{shoeFactory:()=>[...shoe,...sequence.toReversed()]});game.start(10);
    assert.equal(e.active.balance,0);assert.equal(e.active.recovery.deficit,200);
    const restored=new Engine(t.storage,()=>0,t.clock),resumed=new Blackjack(restored);
    assert.equal(restored.active.balance,0);assert.equal(restored.active.recovery.deficit,200);
    resumed.stand();while(resumed.round.phase==='dealer')resumed.dealerStep();
    assert.equal(resumed.round.result.net,-10);assert.equal(restored.active.recovery.deficit,210);assert.equal(restored.active.balance,10);
    assert.throws(()=>resumed.dealerStep());assert.equal(new Engine(t.storage,()=>0,t.clock).active.recovery.deficit,210);
});
test('roulette settles and jackpot adjustments reduce deficit exactly once without a second ten-chip grant',async()=>{
    const {applyCommand}=await import('../worker/service.mjs');const e=enter(fixture());e.active.recovery.deficit=200;
    await applyCommand(e,'roulette.bet',['RED',10],false);assert.equal(e.active.balance,0);assert.equal(e.active.recovery.deficit,200);
    const result=await applyCommand(e,'roulette.spin',[false],false);assert.equal(result.payout,0);assert.equal(e.active.recovery.deficit,210);assert.equal(e.active.balance,10);
    await applyCommand(e,'roulette.rig',[result.roundId],false);assert.equal(e.active.recovery.deficit,190);assert.equal(e.active.balance,10);
    await applyCommand(e,'roulette.rig',[result.roundId],false);assert.equal(e.active.recovery.deficit,190);
    const normal=fixture().engine;normal.active.sharkDebt=100;normal.active.balance=10;
    await applyCommand(normal,'roulette.bet',['RED',10],false);const loss=await applyCommand(normal,'roulette.spin',[false],false);
    assert.equal(normal.active.recovery.deficit,0);await applyCommand(normal,'roulette.rig',[loss.roundId],false);
    assert.equal(normal.active.recovery,null);assert.equal(normal.active.balance,20);
});

function ui(){class Element{constructor(){this.hidden=true;this.events={};this.classList={toggle(){}};}addEventListener(type,fn){this.events[type]=fn;}focus(){this.focused=true;}scrollIntoView(){this.scrolled=true;}}
    const nodes=new Map(),get=id=>{if(!nodes.has(id))nodes.set(id,new Element());return nodes.get(id);};const e=fixture().engine;e.borrow(100000);e.active.balance=0;
    let view='roulette',locked=false,ui;const context={CasinoEngine:Engine,document:{getElementById:get,body:new Element()}};
    vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'../src/distress-ui.js'),'utf8'),context);
    ui=context.createDistressUI(e,{locked:()=>locked,openBank(){view='bank';ui.render(view);}});
    return {e,get,ui,setView(value){view=value;ui.render(view);},setLocked(value){locked=value;ui.render(view);}};
}
test('red crisis appears on every view, traps focus and navigates to the usable red shark form',()=>{
    const t=ui();for(const view of ['roulette','slots','blackjack','players','market','bank','admin']){t.setView(view);assert.equal(t.ui.blocking,true);assert.equal(t.get('shark-crisis-go').focused,true);}
    let prevented=false;t.get('shark-crisis').events.keydown({key:'Tab',preventDefault(){prevented=true;}});assert.equal(prevented,true);
    t.get('shark-crisis-go').events.click();assert.equal(t.ui.blocking,false);assert.equal(t.get('shark-borrow-amount').focused,true);assert.equal(t.get('shark-panel').scrolled,true);
    t.setView('slots');assert.equal(t.ui.blocking,true);t.setLocked(true);assert.equal(t.ui.blocking,false);
    t.setLocked(false);assert.equal(t.ui.blocking,true);t.e.borrowShark(10);t.setView('bank');assert.equal(t.ui.blocking,false);
});
test('negative zero and the ten-chip allowance stay visible across all views without the borrowing modal',()=>{
    const t=ui();t.e.borrowShark(10);t.e.spinSlots(10,losing);t.e.lock=null;
    for(const view of ['roulette','slots','blackjack','players','market','bank','admin']){t.setView(view);assert.equal(t.ui.blocking,false);assert.equal(t.get('club-recovery').hidden,false);assert.equal(t.get('recovery-deficit').textContent,'-0');assert.equal(t.get('recovery-budget').textContent,'10');}
    t.e.active.recovery.deficit=180;t.setView('bank');assert.equal(t.get('bank-recovery-deficit').textContent,'-180');
});
