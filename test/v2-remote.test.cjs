const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
require('../src/club-core.js');require('../src/blackjack-core.js');
function fixture(){
 const e=new CasinoEngine(null),data=structuredClone(e.data);data.users=[data.users[0]];
 const boot={data,revision:5,now:Date.now(),auth:{role:'owner',admin:true},platform:{mode:'formal',account:{playerId:'alex'},profile:{bio:'current'}},directory:[{id:'alex',name:'Current'}]};
 const context={CasinoEngine,CasinoBlackjack,window:{__CASINO_BOOTSTRAP__:boot},crypto,AbortSignal,localStorage:{getItem:()=>null},sessionStorage:{getItem:()=>null}};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'../src/remote-engine.js'),'utf8'),context);
 return {e:new context.window.CasinoEngine(),boot,context};
}
test('late state responses cannot replace current V2 privacy, directory or wallet state',()=>{
 const t=fixture(),old=structuredClone(t.boot);old.revision=4;old.platform.profile.bio='stale';old.data.users[0].balance=999;old.directory=[{id:'other'}];t.e.applySnapshot(old);
 assert.equal(t.e.active.balance,1000);assert.equal(t.e.platform.profile.bio,'current');assert.equal(t.e.directory[0].id,'alex');
});
test('entering the sandbox blocks commands until its isolated snapshot is ready',async()=>{
 const t=fixture();let complete;t.e.api=()=>new Promise(resolve=>complete=resolve);const entering=t.e.setSandbox(true);assert.equal(t.e.requestBusy,true);
 await assert.rejects(()=>t.e.send('dice',[1,'small',null]),/上一项/);
 complete({...structuredClone(t.boot),platform:{...t.boot.platform,mode:'sandbox'}});await entering;assert.equal(t.e.mode,'sandbox');assert.equal(t.e.requestBusy,false);
});
