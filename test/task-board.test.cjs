const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),cp=require('node:child_process');
test('durable board enforces dependencies, one implementer, real evidence and stage completion',()=>{
 const temporary=fs.mkdtempSync(path.join(os.tmpdir(),'roulette-board-')),scripts=path.join(temporary,'scripts'),base=path.join(temporary,'.scratch/roulette-club-v2'),issues=path.join(base,'issues');fs.mkdirSync(scripts,{recursive:true});fs.mkdirSync(issues,{recursive:true});
 fs.copyFileSync(path.join(__dirname,'../scripts/task-board.cjs'),path.join(scripts,'task-board.cjs'));
 fs.writeFileSync(path.join(base,'stages.json'),JSON.stringify([{id:'P0',title:'Fixture stage',tasks:['01','02']}]));fs.writeFileSync(path.join(base,'HANDOFF.md'),'# Fixture handoff\n');
 for(const id of ['01','02'])fs.writeFileSync(path.join(issues,id+'.md'),`# ${id} — Fixture\r\n\r\nStage: P0\r\nStatus: pending\r\nBlocked by: ${id==='01'?'none':'01'}\r\nOwner: none\r\nEvidence: none\r\nCommit: none\r\n\r\n- [ ] Accepted\r\n`);
 fs.writeFileSync(path.join(base,'good.json'),JSON.stringify({accepted:true,exitCode:0}));fs.writeFileSync(path.join(base,'bad.json'),JSON.stringify({accepted:false,exitCode:1}));
 const run=(...args)=>cp.spawnSync(process.execPath,[path.join(scripts,'task-board.cjs'),...args],{cwd:path.resolve(__dirname,'..'),encoding:'utf8'});
 try{
  assert.equal(run('done','01','good.json').status,1);assert.equal(run('start','02').status,1);assert.equal(run('start','01').status,0);assert.equal(run('start','02').status,1);
  assert.equal(run('done','01','bad.json').status,1);assert.match(fs.readFileSync(path.join(issues,'01.md'),'utf8'),/Status: in-progress/);
  assert.equal(run('done','01','good.json').status,0);assert.match(fs.readFileSync(path.join(base,'TODO.md'),'utf8'),/\[x\].*01/);assert.equal(run('stage','P0','good.json').status,1);
  assert.equal(run('start','02').status,0);assert.equal(run('done','02','good.json').status,0);assert.equal(run('stage','P0','good.json').status,0);assert.match(fs.readFileSync(path.join(base,'TODO.md'),'utf8'),/\[x\] \*\*P0/);
 }finally{if(!path.resolve(temporary).startsWith(path.resolve(os.tmpdir())+path.sep)||!path.basename(temporary).startsWith('roulette-board-'))throw Error('Unexpected cleanup target.');fs.rmSync(temporary,{recursive:true,force:true});}
});
