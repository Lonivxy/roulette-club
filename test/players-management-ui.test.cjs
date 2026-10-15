const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
require('../src/club-core.js');
require('../src/account-tools.js');
function ui() {
    class Element {
        constructor(){this.children=[];this.events={};this.dataset={};this.style={removeProperty(){}};this.classList={add(){},remove(){}};this.value='';}
        addEventListener(type,fn){(this.events[type]??=[]).push(fn);}fire(type){return Promise.all((this.events[type]??[]).map(fn=>fn({preventDefault(){}})));}
        append(...nodes){this.children.push(...nodes);}replaceChildren(...nodes){this.children=nodes;}setAttribute(key,value){this[key]=value;}
        get options(){return this.children;}
    }
    const nodes=new Map(),get=id=>{if(!nodes.has(id))nodes.set(id,new Element());return nodes.get(id);};
    let club;const empty=()=>({render(){},tick(){}}),controller=()=>({update(){},setVisible(){},resetPlayer(){},pending:false,animating:false});
    const context={CasinoEngine,CasinoAccounts:globalThis.CasinoAccounts,document:{getElementById:get,createElement:()=>new Element(),querySelectorAll:()=>[]},
        window:{location:{hash:'#players'},history:{replaceState(){}},addEventListener(){}},setTimeout(){},clearTimeout(){},setInterval(){},
        bindJackpotShortcut(){},bindCustomBet:()=>({update(){}}),createDistressUI:empty,createAccountUI:empty,createAdminUI:()=>({render(){},unlocked:true}),createEconomyUI:empty,createPlayerLoansUI:empty,createBlackjackTable:controller,createLucky777:controller,
        updateBettingHUD:()=>club.refresh(),renderHistoryRibbon(){},renderNumberModalGrid(){},hideBanner(){}};
    vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'../src/club-ui.js'),'utf8'),context);
    club=context.createCasinoClub({});club.init();return {club,get};
}
test('administrator search and pagination work for more than one page of players',async()=>{
    const t=ui();for(let i=3;i<43;i++)t.club.engine.addUser('Player '+i);t.club.render();
    assert.equal(t.get('club-player-list').children.length,20);assert.equal(t.get('admin-player-page').textContent,'1 / 3');
    await t.get('admin-player-next').fire('click');assert.equal(t.get('admin-player-page').textContent,'2 / 3');
    t.get('admin-player-search').value='Player 39';await t.get('admin-player-search').fire('input');assert.equal(t.get('club-player-list').children.length,1);assert.equal(t.get('admin-player-page').textContent,'1 / 1');
    assert.equal(t.get('club-player-list').children[0].children[1].children[0].textContent,'Player 39');
    t.get('admin-player-search').value='missing';await t.get('admin-player-search').fire('input');assert.match(t.get('club-player-list').children[0].textContent,/没有匹配/);
});

test('deleting a player requires a second explicit click and selects a surviving account',async () =>{
    const t=ui();assert.equal(t.club.view,'players');assert.equal(t.get('players-view').hidden,false);assert.equal(t.get('bank-view').hidden,true);
    await t.get('club-player-list').children[0].children.at(-1).fire('click');assert.equal(t.club.engine.data.users.length,3);
    const confirm=t.get('club-player-list').children[0].children.at(-1);assert.match(confirm.textContent,/确认永久删除/);await confirm.fire('click');
    assert.equal(t.club.engine.data.users.length,2);assert.equal(t.club.engine.active.id,'jamie');assert.match(t.get('club-toast').textContent,/玩家已删除/);
});
test('delete confirmation cannot remove a player with bank debt',async () =>{
    const t=ui();t.club.engine.borrow(1);t.club.render();
    await t.get('club-player-list').children[0].children.at(-1).fire('click');await t.get('club-player-list').children[0].children.at(-1).fire('click');
    assert.equal(t.club.engine.data.users.length,3);assert.match(t.get('club-toast').textContent,/结清欠款/);
});
