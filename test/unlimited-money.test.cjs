const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
require('../src/money.js');require('../src/arcade-core.js');require('../src/club-core.js');require('../src/blackjack-core.js');require('../src/account-tools.js');
const M=CasinoMoney,H=10n**100n+137n;
function fixture(){let raw=null,now=100000000;const storage={getItem:()=>raw,setItem:(_,value)=>raw=value};const e=new CasinoEngine(storage,()=>.5,()=>now);return {e,storage,advance:ms=>now+=ms};}

test('money preserves arbitrary digits, crosses the safe integer boundary and rejects rounded numeric input',()=>{
    assert.equal(M.parse(String(H)),H);assert.equal(M.add(Number.MAX_SAFE_INTEGER,1),9007199254740992n);
    assert.equal(M.sub(9007199254740992n,1),Number.MAX_SAFE_INTEGER);assert.equal(M.mul(H,61),H*61n);
    assert.equal(M.ratio(H,5,2),H*5n/2n);assert.equal(M.ratio(H,15,100,true),(H*15n+99n)/100n);
    for(const value of ['',null,undefined,{},1.5,Infinity,NaN,Number.MAX_SAFE_INTEGER+1,'1e100','1.5','1,000'])assert.throws(()=>M.positive(value));
    for(const value of ['0','-1',0n])assert.throws(()=>M.positive(value));
});

test('JSON codec round-trips large money and preserves ordinary strings and existing saves',()=>{
    const value={balance:H,net:-H,zero:0,player:'$chips:123',nested:[H]};
    assert.deepEqual(M.parseJSON(M.stringify(value)),value);assert.deepEqual(M.hydrate(value),value);
    assert.deepEqual(M.parseJSON('{"balance":1000,"name":"Alex"}'),{balance:1000,name:'Alex'});
    assert.deepEqual(M.parseJSON('{"$chips":"123","name":"Player"}'),{$chips:'123',name:'Player'});
});

test('admin credit, debit, gift, balances and saved player records have no configured maximum',()=>{
    const {e,storage}=fixture();e.adminAdjust('alex','add',String(H));assert.equal(e.active.balance,H+1000n);
    e.adminAdjust('alex','remove',String(H));assert.equal(e.active.balance,1000);
    e.adminAdjust('alex','add',String(H));e.transfer('jamie',String(H));assert.equal(e.active.balance,1000);assert.equal(e.data.users[1].balance,H+1000n);
    e.switchUser('jamie');const restored=new CasinoEngine(storage,()=>.5,e.now);assert.equal(restored.active.balance,H+1000n);assert.equal(restored.data.users.length,3);assert.equal(restored.storageWarning,'');
    assert.throws(()=>e.adminAdjust('jamie','remove',String(H+1001n)));assert.equal(e.active.balance,H+1000n);
});

test('player lending and repayment retain exact principal and agreed interest above the old ceiling',()=>{
    const {e,advance,storage}=fixture();e.adminAdjust('alex','add',String(H));const loan=e.offerLoan('jamie',String(H),15,10);
    e.switchUser('jamie');e.respondLoan(loan.id,true);assert.equal(e.active.balance,H+1000n);
    assert.equal(e.projectDebts(10).peer,H+(H*1500n+9999n)/10000n);
    advance(600000);e.save();const owed=H+(H*1500n+9999n)/10000n;assert.equal(loan.balance,owed);
    e.adminAdjust('jamie','add',String(owed));e.repayAll('peer',loan.id);assert.equal(loan.balance,0);assert.equal(e.data.users[0].balance,owed+1000n);
    const restored=new CasinoEngine(storage,()=>.5,e.now);assert.equal(restored.storageWarning,'');assert.equal(restored.data.loans[0].status,'repaid');
});

test('unlimited slot All In pays the exact 50 times jackpot and reloads without loss',()=>{
    const {e,storage}=fixture();e.active.balance=H;const result=e.spinSlots(String(H),null,{allIn:true,jackpot:true});
    assert.equal(result.walletAfterWager,0);assert.equal(result.payout,H*50n);assert.equal(result.net,H*49n);assert.equal(e.active.balance,H*50n);
    assert.equal(new CasinoEngine(storage,()=>.5,e.now).active.balance,H*50n);
});

test('Plinko uses integer division for fractional multipliers on very large wagers',()=>{
    const result=CasinoArcade.plinkoResult(H,'low','center',[1,1,1,1,1,1,0,0,0,0,0,0]);
    assert.equal(result.payout,H*40n/100n);assert.equal(result.net,H*40n/100n-H);
    const {e,storage}=fixture();e.active.balance=H;e.playPlinko(String(H),'high','center',{jackpot:true});assert.equal(e.active.balance,H*100n);
    const restored=new CasinoEngine(storage,()=>.5,e.now);assert.equal(CasinoArcade.validHistory(restored.active.arcadeHistory[0]),true);
});

test('dice allows a whole-wallet wager and an exact 61 times return',()=>{
    const {e}=fixture();e.active.balance=H;const r=e.playDice(String(H),'sum',4,{jackpot:true});
    assert.equal(r.payout,H*61n);assert.equal(r.net,H*60n);assert.equal(e.active.balance,H*61n);
});

test('blackjack pays odd 100-digit natural wagers precisely and retains settled hands on reload',()=>{
    const {e,storage}=fixture();e.active.balance=H;const game=new CasinoBlackjack(e),r=game.start(String(H),{jackpot:true});
    assert.equal(r.result.payout,H*5n/2n);assert.equal(e.active.balance,H*5n/2n);
    const restored=new CasinoEngine(storage,()=>.5,e.now);new CasinoBlackjack(restored);assert.equal(restored.active.blackjack.phase,'settled');assert.equal(restored.active.balance,H*5n/2n);
});

test('blackjack split and double debit exact amounts without a hand-stake ceiling',()=>{
    const {e}=fixture();e.active.balance=H*4n;
    const shoe=CasinoBlackjack.makeShoe(()=>.5),sequence=[8,10,8,7,2,3,10].map(rank=>shoe.splice(shoe.findIndex(c=>c.rank===rank),1)[0]);
    const game=new CasinoBlackjack(e,{shoeFactory:()=>[...shoe,...sequence.toReversed()]});game.start(H);game.split();game.double();
    assert.equal(e.active.balance,H);assert.equal(game.round.hands[0].bet,H*2n);assert.equal(game.round.hands[1].bet,H);
});

test('black market cards and recovery deficits retain arbitrary-size chip amounts',()=>{
    const {e,storage}=fixture();e.active.balance=H*36n;const card=e.buyCard('seven',String(H));e.armCard(card.id);assert.equal(e.active.balance,H);
    e.spinSlots(H);assert.equal(e.active.balance,H*50n);e.lock=null;
    e.active.recovery={deficit:H};e.active.balance=10;e.adminAdjust('alex','remove',String(H));assert.equal(e.active.recovery.deficit,H*2n);
    e.adminAdjust('alex','add',String(H*2n+20n));assert.equal(e.active.recovery,null);assert.equal(e.active.balance,30);
    assert.equal(new CasinoEngine(storage,()=>.5,e.now).storageWarning,'');
});

test('account summaries, ordering and reserves handle huge balances with exact net assets',()=>{
    const {e}=fixture();e.active.balance=H;e.active.bets.RED=H;e.data.users[1].balance=H+1n;e.data.users[2].recovery={deficit:H};
    const rows=CasinoAccounts.summaries(e.data),sorted=CasinoAccounts.selectPlayers(rows,{sort:'cash'});
    assert.equal(rows[0].reserved,H);assert.equal(rows[0].net,H*2n);assert.equal(rows[2].net,-H);assert.equal(sorted.rows[0].id,'jamie');
});

test('standalone roulette places, refunds, rebets and settles 100-digit wagers precisely',()=>{
    const html=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8'),{e}=fixture();e.active.balance=H;
    const state={...e.active,phase:'IDLE',selectedChip:H,customBet:true},context={CasinoEngine,structuredClone,state,casino:{engine:e,busy:()=>!!e.lock,toast:message=>{throw Error(message);}},
        sfx:{playChipSound(){},playWinSound(){}},POCKETS:[{number:0}],isRedPocket:()=>false,isBlackPocket:()=>false,renderHistoryRibbon(){},updateBettingHUD(){},renderNumberModalGrid(){},showResultBanner(){},document:{getElementById:()=>({})}};
    vm.createContext(context);vm.runInContext(html.slice(html.indexOf('        function getTotalActiveBet()'),html.indexOf('        function showResultBanner(')),context);
    context.placeNumberBet(0);assert.equal(state.balance,0);assert.equal(state.bets.numbers[0],H);
    context.clearAllBets();assert.equal(state.balance,H);context.placeNumberBet(0);context.evaluateSpinOutcome(0);assert.equal(state.balance,H*24n);
    context.rebetLast();assert.equal(state.balance,H*23n);assert.equal(state.bets.numbers[0],H);
});

test('generated monetary controls have no max attribute and accept digits without number rounding',()=>{
    const html=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8');
    for(const id of ['roulette-custom-amount','lucky-custom-amount','bj-wager','plinko-wager','dice-wager','market-stake','admin-adjust-amount','transfer-amount','peer-loan-amount']){
        const tag=html.match(new RegExp('<input\\b[^>]*\\bid="'+id+'"[^>]*>'))?.[0];assert.ok(tag,id);assert.doesNotMatch(tag,/\bmax=/);assert.match(tag,/type="text"/);
    }
});
