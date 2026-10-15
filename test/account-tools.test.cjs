const {test}=require('node:test'),assert=require('node:assert/strict');
require('../src/club-core.js');require('../src/account-tools.js');
const Engine=globalThis.CasinoEngine,Tools=globalThis.CasinoAccounts;
function fixture(){let now=1000000;return {e:new Engine(null,()=>.5,()=>now),advance(ms){now+=ms;}};}

test('account summaries include reserved bets and peer assets without counting pending offers',()=>{
    const {e}=fixture();const loan=e.offerLoan('jamie',200,1,10);e.switchUser('jamie');e.respondLoan(loan.id,true);e.borrow(1000);
    e.switchUser('alex');e.offerLoan('taylor',100,1,10);e.active.balance-=75;e.active.bets.RED=50;e.active.blackjack={phase:'player',hands:[{bet:25}]};
    const rows=Tools.summaries(e.data),alex=rows.find(row=>row.id==='alex'),jamie=rows.find(row=>row.id==='jamie');
    assert.equal(alex.cash,725);assert.equal(alex.reserved,75);assert.equal(alex.receivable,200);assert.equal(alex.net,1000);
    assert.equal(jamie.peer,200);assert.equal(jamie.bank,1000);assert.equal(jamie.debt,1200);assert.equal(jamie.net,1000);
    assert.equal(rows.reduce((sum,row)=>sum+row.net,0),3000);
});
test('negative-mode summaries exclude its ten-chip allowance and keep every debt separate',()=>{
    const {e}=fixture();e.active.recovery={deficit:200};e.active.balance=10;e.active.debt=1000;e.active.sharkDebt=500;e.active.bets.RED=4;
    const row=Tools.summaries(e.data)[0];assert.equal(row.cash,0);assert.equal(row.allowance,10);assert.equal(row.reserved,4);
    assert.equal(row.negative,200);assert.equal(row.debt,1700);assert.equal(row.net,-1700);
});
test('directory search handles Unicode and pages clamp without dropping or duplicating players',()=>{
    const rows=Array.from({length:103},(_,i)=>({id:String(i),name:'Player '+i,cash:i,net:-i,debt:i}));
    const matched=Tools.selectPlayers(rows,{query:'Ｐｌａｙｅｒ ９９'});assert.equal(matched.total,1);assert.equal(matched.rows[0].id,'99');
    const ids=[];for(let page=1;page<=6;page++)ids.push(...Tools.selectPlayers(rows,{page}).rows.map(row=>row.id));
    assert.equal(ids.length,103);assert.equal(new Set(ids).size,103);
    const last=Tools.selectPlayers(rows,{page:999});assert.equal(last.page,6);assert.equal(last.rows.length,3);
    assert.equal(Tools.selectPlayers(rows,{sort:'cash'}).rows[0].id,'102');assert.equal(Tools.selectPlayers(rows,{sort:'net'}).rows[0].id,'0');
    const none=Tools.selectPlayers(rows,{query:'missing',page:99});assert.equal(none.total,0);assert.equal(none.page,1);assert.equal(none.pages,1);
    assert.equal(rows[0].id,'0');
});
test('debt forecasts respect remaining periods, rounding, loan terms and caps without mutation',()=>{
    const t=fixture(),e=t.e;e.borrow(1000);e.active.sharkDebt=1000;e.active.sharkInterestAt=e.now();e.active.sharkInterestPolicy=2;
    t.advance(9*60000);const before=JSON.stringify(e.data);
    assert.equal(e.projectDebts(0).bank,1000);assert.equal(e.projectDebts(1).bank,1150);assert.equal(e.projectDebts(11).bank,1323);
    assert.equal(e.projectDebts(0).shark,11392);assert.equal(e.projectDebts(1440).shark,1000000000);
    assert.equal(JSON.stringify(e.data),before);
    for(const minutes of [-1,1.5,1441,NaN,Infinity])assert.throws(()=>e.projectDebts(minutes));assert.throws(()=>e.projectDebts(3,'missing'));
});
test('peer-loan forecasts include active borrowed agreements and the unchanged negative record only',()=>{
    const t=fixture(),e=t.e,loan=e.offerLoan('jamie',100,2,10);e.switchUser('jamie');e.respondLoan(loan.id,true);
    e.active.recovery={deficit:200};e.active.balance=10;t.advance(9*60000);
    const result=e.projectDebts(1);assert.equal(result.peer,102);assert.equal(result.negative,200);assert.equal(result.total,302);
    e.switchUser('alex');assert.equal(e.projectDebts(10).peer,0);
});
test('one-click bank and shark repayment uses accrued debt and rejects insufficient funds atomically',()=>{
    const t=fixture(),e=t.e;e.borrow(1000);e.active.balance=10000;t.advance(10*60000);e.repayAll('bank');
    assert.equal(e.active.debt,0);assert.equal(e.active.bankInterestAt,null);assert.equal(e.active.balance,8850);assert.throws(()=>e.repayAll('bank'));assert.equal(e.active.balance,8850);
    e.active.sharkDebt=1000;e.active.sharkInterestAt=e.now();e.active.sharkInterestPolicy=2;e.active.balance=1000;t.advance(3*60000);
    assert.throws(()=>e.repayAll('shark'));assert.equal(e.active.balance,1000);assert.equal(e.active.sharkDebt,2250);
    e.active.balance=5000;e.repayAll('shark');assert.equal(e.active.balance,2750);assert.equal(e.active.sharkDebt,0);assert.equal(e.active.sharkInterestAt,null);
});
test('one-click peer repayment checks the borrower and retains negative-mode spending restrictions',()=>{
    const t=fixture(),e=t.e,loan=e.offerLoan('jamie',100,2,10);assert.throws(()=>e.repayAll('peer',loan.id));
    e.switchUser('jamie');e.respondLoan(loan.id,true);t.advance(10*60000);e.repayAll('peer',loan.id);
    assert.equal(loan.status,'repaid');assert.equal(loan.balance,0);assert.equal(e.active.balance,998);assert.equal(e.data.users[0].balance,1002);
    e.active.recovery={deficit:200};e.active.balance=10;e.active.debt=1;e.active.sharkDebt=1;
    for(const kind of ['bank','shark','peer','unknown','__proto__'])assert.throws(()=>e.repayAll(kind,loan.id));assert.equal(e.active.balance,10);
});
test('activity filtering and CSV preserve text while preventing formula cells and escaping quotes',()=>{
    const entries=[{time:'2026-10-15T00:00:00Z',text:'Alex → Jamie: 10'},{time:'2026-10-15T00:01:00Z',text:'=SUM(1,2) "quoted"\nnext'},{time:'@evil',text:'  +command'}];
    assert.equal(Tools.activity(entries,'ＡＬＥＸ').length,1);assert.equal(Tools.activity(entries,'missing').length,0);
    const csv=Tools.activityCSV(entries);assert.ok(csv.startsWith('\uFEFF'));assert.ok(csv.includes('"\'=SUM(1,2) ""quoted""\nnext"'));assert.ok(csv.includes('"\'@evil"'));assert.ok(csv.includes('"\'  +command"'));
    assert.equal(entries[1].text,'=SUM(1,2) "quoted"\nnext');
});
