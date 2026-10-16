const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const base=path.resolve(__dirname,'../.scratch/roulette-club-v2'),dir=path.join(base,'issues');
const stages=JSON.parse(fs.readFileSync(path.join(base,'stages.json'),'utf8'));
const field=(body,key)=>body.match(new RegExp('^'+key+': (.*)$','m'))?.[1];
const read=id=>{const file=path.join(dir,id+'.md'),body=fs.readFileSync(file,'utf8');return {id,file,body,status:field(body,'Status'),stage:field(body,'Stage'),title:body.split('\n')[0].replace(/^# /,'')};};
const all=()=>stages.flatMap(s=>s.tasks.map(read));
function evidence(file){const value=JSON.parse(fs.readFileSync(path.resolve(base,file),'utf8'));if(value.exitCode!==0||value.accepted!==true)throw Error('Evidence must record exitCode=0 and accepted=true.');return value;}
function update(task,key,value){task.body=task.body.replace(new RegExp('^'+key+': .*$','m'),key+': '+value);fs.writeFileSync(task.file,task.body);}
const [action='sync',id,arg]=process.argv.slice(2);
try{
 if(['start','done','checkpoint','block'].includes(action)){
  const task=read(id);
  if(action==='start'){
   if(all().some(t=>t.status==='in-progress'&&t.id!==id))throw Error('Another task is in progress.');
   const deps=field(task.body,'Blocked by').split(',').map(x=>x.trim()).filter(x=>x!=='none');if(deps.some(d=>read(d).status!=='done'))throw Error('Dependencies incomplete.');
   update(task,'Status','in-progress');update(task,'Owner','Codex (single implementer)');
  }
  if(action==='block')update(task,'Status','blocked');
  if(action==='done'){
   evidence(arg);update(task,'Evidence',arg);update(task,'Commit',cp.execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim());update(task,'Status','done');
   task.body=task.body.replaceAll('- [ ]','- [x]');fs.writeFileSync(task.file,task.body);
  }
  if(action==='checkpoint')fs.appendFileSync(task.file,'\nCheckpoint: '+new Date().toISOString()+' — '+arg+'\n');
 }
 if(action==='stage'){
  const stage=stages.find(s=>s.id===id);if(!stage||stage.tasks.some(t=>read(t).status!=='done'))throw Error('Stage has incomplete tasks.');evidence(arg);
  fs.writeFileSync(path.join(base,id+'-gate.json'),JSON.stringify({evidence:arg,accepted:true,date:new Date().toISOString()},null,2)+'\n');
 }
 const tasks=all();let text='# Roulette Club V2 — TODO\n\nGenerated from issue Status fields. Update with scripts/task-board.cjs. Never tick unverified work.\n\n';
 for(const s of stages){const done=s.tasks.every(t=>read(t).status==='done')&&fs.existsSync(path.join(base,s.id+'-gate.json'));text+=`- [${done?'x':' '}] **${s.id} — ${s.title}**\n`;for(const id of s.tasks){const t=read(id);text+=`  - [${t.status==='done'?'x':' '}] [${t.title}](issues/${id}.md) — ${t.status}\n`;}}
 fs.writeFileSync(path.join(base,'TODO.md'),text);
 const current=tasks.find(t=>t.status==='in-progress')||tasks.find(t=>t.status!=='done');
 let handoff=fs.readFileSync(path.join(base,'HANDOFF.md'),'utf8').split('\n## Automatic checkpoint')[0];
 handoff+='\n## Automatic checkpoint\n\nUpdated: '+new Date().toLocaleString('zh-CN',{timeZone:'Asia/Shanghai'})+' Asia/Shanghai\n\n';
 handoff+='Completed tasks: '+tasks.filter(t=>t.status==='done').length+'/'+tasks.length+'\n\nNext/current: '+(current?`[${current.title}](issues/${current.id}.md) — ${current.status}`:'All tasks complete')+'\n\n';
 handoff+='HEAD: '+cp.execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim()+'\n\nWorking tree (inspect before resuming):\n```\n'+cp.execFileSync('git',['status','--short'],{encoding:'utf8'})+'```\n';
 fs.writeFileSync(path.join(base,'HANDOFF.md'),handoff);console.log('Board synchronized; next: '+(current?.id||'none'));
}catch(error){console.error(error.message);process.exitCode=1;}
