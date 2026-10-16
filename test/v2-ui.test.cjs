const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),{parseHTML}=require('linkedom');
async function fixture(){
 require('../src/club-core.js');const {initialPlatform,ensurePlayer,questViews,periods}=await import('../worker/v2/progression.mjs');
 const now=Date.now(),p=initialPlatform('owner',now);ensurePlayer(p,'alex',now);const e=new CasinoEngine(null),calls=[],notices=[];
 e.platform={profile:p.profiles.alex,progress:p.progress.alex,definitions:Object.values(p.definitions),items:Object.values(p.items),inventory:Object.values(p.inventory),quests:questViews(p,'alex',now),periods:periods(now),mode:'formal'};
 e.auth={role:'member',admin:false};e.directory=[{id:'alex',name:'Alex'},{id:'jamie',name:'Jamie'}];e.send=async(...args)=>{calls.push(args);};e.api=async()=>({rows:[],page:1,pages:1});
 const {document,window}=parseHTML(fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8'));
 Object.defineProperty(window.HTMLSelectElement.prototype,'value',{configurable:true,get(){return this.querySelector('option[selected]')?.value||this.querySelector('option')?.value||'';},set(v){for(const o of this.querySelectorAll('option'))o.toggleAttribute('selected',o.value===String(v));}});
 const context=vm.createContext({document,window,Blob,URL,setTimeout,crypto,console});vm.runInContext(fs.readFileSync(path.join(__dirname,'../src/v2-ui.js'),'utf8'),context);
 let ui;ui=context.CasinoV2.createFeatures(e,{locked:()=>false,changed:()=>ui.render(),notify:m=>notices.push(m),setView:v=>ui.paint(v,v)});return {e,ui,document,window,calls,notices};
}
test('central V2 navigation preserves games and exposes progression, economy, social and account pages',()=>{
 require('../src/v2-ui.js');const v=CasinoV2;
 assert.deepEqual(v.groups.map(g=>g.id),['games','economy','social','rewards','account']);
 const names=v.groups.flatMap(g=>g.items.map(i=>i[0]));for(const name of ['roulette','slots','blackjack','plinko','dice','lottery','bank','market','inventory','leaderboard','clubs','rewards','quests','achievements','dashboard','profile','settings'])assert.ok(names.includes(name));
 assert.equal(new Set(names).size,names.length);
});
test('V2 account and privacy controls submit only the current account profile and hide ADMIN',async()=>{
 const t=await fixture();t.ui.paint('profile','profile');const panel=t.document.getElementById('v2-profile-view');
 assert.match(panel.textContent,/编辑资料/);const fields=panel.querySelectorAll('input');fields[0].value='Changed';fields[1].value='My bio';
 [...panel.querySelectorAll('button')].find(b=>b.textContent==='保存资料').click();await new Promise(resolve=>setImmediate(resolve));
 assert.equal(t.calls[0][0],'profile.update');assert.equal(t.calls[0][1][0].name,'Changed');
 assert.ok([...t.document.querySelectorAll('a[href="/admin"]')].every(a=>a.hidden));
 t.ui.paint('settings','settings');const settings=t.document.getElementById('v2-settings-view');settings.querySelector('input').checked=false;settings.querySelector('button').click();await new Promise(resolve=>setImmediate(resolve));
 assert.equal(t.calls[1][0],'profile.settings');assert.equal(t.calls[1][1][0].walletVisible,false);
});
test('V2 growth, achievements, daily rewards and collection render real platform state',async()=>{
 const t=await fixture();t.ui.paint('dashboard','dashboard');assert.match(t.document.getElementById('v2-dashboard-view').textContent,/Lv. 1/);
 t.ui.paint('inventory','inventory');assert.match(t.document.getElementById('v2-inventory-view').textContent,/初见金边/);const equip=[...t.document.getElementById('v2-inventory-view').querySelectorAll('button')].find(b=>b.textContent==='装备');equip.click();await new Promise(resolve=>setImmediate(resolve));assert.equal(t.calls[0][0],'inventory.equip');
 t.ui.paint('achievements','achievements');assert.ok(t.document.getElementById('v2-achievements-view').querySelectorAll('progress').length>=6);
 t.e.platform.progress.achievements['first-round']=Date.now();t.ui.render();t.ui.render();assert.equal(t.notices.filter(n=>n.includes('成就解锁')).length,1);
 t.ui.paint('rewards','rewards');const panel=t.document.getElementById('v2-rewards-view');assert.equal(panel.querySelectorAll('.v2-day').length,7);panel.querySelector('button').click();await new Promise(resolve=>setImmediate(resolve));assert.equal(t.calls.at(-1)[0],'reward.claim');
});
