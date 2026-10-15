const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
require('../src/club-core.js');require('../src/account-tools.js');
function fixture(){
    class Element {
        constructor(tag='div'){this.tag=tag;this.children=[];this.events={};this.dataset={};this.value='';this.hidden=false;}
        addEventListener(type,fn){(this.events[type]??=[]).push(fn);}fire(type){return Promise.all((this.events[type]??[]).map(fn=>fn({preventDefault(){}})));}
        append(...nodes){this.children.push(...nodes);}replaceChildren(...nodes){this.children=nodes;}setAttribute(name,value){this[name]=value;}
        click(){this.clicked=true;}remove(){this.removed=true;}
    }
    const nodes=new Map(),get=id=>{if(!nodes.has(id))nodes.set(id,new Element());return nodes.get(id);};
    const e=new CasinoEngine(null,()=>.5,()=>1000000),notices=[],downloads=[],links=[],revoked=[];let locked=false,ui;
    for(let i=3;i<43;i++)e.addUser('Player '+i);
    get('directory-sort').value='name';get('forecast-minutes').value='10';
    const context={CasinoAccounts,document:{getElementById:get,createElement:tag=>new Element(tag),body:{append(link){links.push(link);}}},Blob,
        URL:{createObjectURL(blob){downloads.push(blob);return 'blob:download-'+downloads.length;},revokeObjectURL(url){revoked.push(url);}},setTimeout:fn=>fn()};
    vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'../src/account-ui.js'),'utf8'),context);
    ui=context.createAccountUI(e,{locked:()=>locked,switchPlayer(id){e.switchUser(id);ui.render();},notify(message){notices.push(message);},async transact(action,success){try{await action();notices.push(success);ui.render();return true;}catch(error){notices.push(error.message);return false;}}});
    ui.render();return {e,get,ui,notices,downloads,links,revoked,setLocked(value){locked=value;ui.render();}};
}
test('player directory searches, sorts, pages and switches through actual controls',async()=>{
    const t=fixture();assert.equal(t.get('directory-rows').children.length,20);assert.equal(t.get('directory-page').textContent,'1 / 3');
    await t.get('directory-next').fire('click');assert.equal(t.get('directory-page').textContent,'2 / 3');
    t.get('directory-search').value='Player 39';await t.get('directory-search').fire('input');assert.equal(t.get('directory-rows').children.length,1);assert.equal(t.get('directory-page').textContent,'1 / 1');
    const row=t.get('directory-rows').children[0];assert.equal(row.children[0].textContent,'Player 39');await row.children[4].children[0].fire('click');assert.equal(t.e.active.name,'Player 39');
    t.get('directory-search').value='not found';await t.get('directory-search').fire('input');assert.equal(t.get('directory-empty').hidden,false);assert.equal(t.get('directory-rows').children.length,0);
    t.get('directory-search').value='';t.get('directory-sort').value='cash';t.e.data.users[0].balance=9000;await t.get('directory-sort').fire('change');assert.equal(t.get('directory-rows').children[0].children[0].textContent,'Alex');
    t.setLocked(true);assert.equal(t.get('directory-rows').children[0].children[4].children[0].disabled,true);
});
test('interest selection and one-click bank repayment update the visible summary',async()=>{
    const t=fixture();t.e.borrow(100);t.ui.render();assert.equal(t.get('bank-repay-all').disabled,false);assert.equal(t.get('summary-liabilities').textContent,'100');
    t.get('forecast-minutes').value='30';await t.get('forecast-minutes').fire('change');assert.equal(t.get('forecast-heading').textContent,'30 分钟后');
    assert.equal(t.get('forecast-rows').children[0].children[2].textContent,'153');
    await t.get('bank-repay-all').fire('click');assert.equal(t.e.active.debt,0);assert.equal(t.get('bank-repay-all').disabled,true);assert.equal(t.get('summary-liabilities').textContent,'0');
});
test('negative-mode allowance is distinct from net assets and cannot enable repayment buttons',()=>{
    const t=fixture();t.e.active.recovery={deficit:180};t.e.active.balance=10;t.e.active.debt=100;t.ui.render();
    assert.equal(t.get('summary-net').textContent,'-280');assert.equal(t.get('summary-net').dataset.negative,'true');assert.equal(t.get('summary-liabilities').textContent,'280');
    assert.equal(t.get('bank-repay-all').disabled,true);assert.equal(t.get('shark-repay-all').disabled,true);assert.match(t.get('repay-all-help').textContent,/底金不能/);
});
test('activity search exports only matching records and cleans up the download URL',async()=>{
    const t=fixture();t.e.record('Alex bonus, "ten"');t.e.record('Jamie repayment');t.get('activity-search').value='Alex bonus';await t.get('activity-search').fire('input');
    assert.equal(t.get('club-ledger').children.length,1);assert.match(t.get('activity-count').textContent,/匹配 1 条/);
    await t.get('activity-export').fire('click');assert.equal(t.links[0].clicked,true);assert.equal(t.links[0].removed,true);assert.match(t.links[0].download,/\.csv$/);
    const csv=await t.downloads[0].text();assert.ok(csv.includes('Alex bonus, ""ten""'));assert.ok(!csv.includes('Jamie repayment'));assert.equal(t.revoked.length,1);
    t.get('activity-search').value='missing';await t.get('activity-search').fire('input');assert.equal(t.get('activity-export').disabled,true);assert.match(t.get('club-ledger').children[0].textContent,/没有匹配/);
});
