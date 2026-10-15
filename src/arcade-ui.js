function createArcadeGame(kind,engine,callbacks) {
    'use strict';
    const $=name=>document.getElementById(kind+'-'+name),fmt=value=>value.toLocaleString();
    let visible=false,scene=null,failed=false,pending=false,animating=false,lastPlayer=null,lastRecovery=false,visualBalance=null,runningId=null,oddsKey='';
    const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches||false;
    const inputs=kind==='plinko'?['wager','risk','lane']:['wager','kind','target'];
    const wagers=Array.from(document.querySelectorAll('[data-arcade-chip]')).filter(button=>button.dataset.arcadeChip.startsWith(kind+':'));
    function describe(result){return kind==='plinko'?`${result.multiplier}× · 返还 ${fmt(result.payout)} · 净输赢 ${result.net>=0?'+':''}${fmt(result.net)}`:`${result.dice.join(' · ')} = ${result.total}${result.triple?' · 围骰':''} · 返还 ${fmt(result.payout)} · 净输赢 ${result.net>=0?'+':''}${fmt(result.net)}`;}
    function update(){
        if(lastPlayer!==engine.active.id){lastPlayer=engine.active.id;$('wager').value='10';$('result').textContent='';$('status').textContent=kind==='plinko'?'选择落球口，准备投球。':'选择下注，准备掷骰。';}
        if(engine.active.recovery&&!lastRecovery)$('wager').value='10';lastRecovery=Boolean(engine.active.recovery);
        const locked=callbacks.locked()||pending||animating,wager=engine.money.tryParse($('wager').value),valid=wager!==null&&wager>=1;
        inputs.forEach(name=>$(name).disabled=locked);wagers.forEach(button=>button.disabled=locked);
        $('wager').setAttribute('aria-invalid',String(!valid));$('play').disabled=locked||!scene||!valid||wager>engine.active.balance;
        if(kind==='plinko'){
            const risk=$('risk').value||'medium',lane=$('lane').value||'center';scene?.updateOptions(risk,lane);
            const key=risk+lane;if(key!==oddsKey){oddsKey=key;let expected=0;
                $('odds').replaceChildren(...CasinoArcade.tables[risk].map((value,i)=>{const probability=CasinoArcade.pocketProbability(i,lane);expected+=value/100*probability;const node=document.createElement('li');node.textContent=`槽 ${i+1} · ${value/100}× · ${(probability*100).toFixed(3)}%`;return node;}));
                $('theory').textContent=`当前组合理论返还率 ${(expected*100).toFixed(2)}%，小额下注整筹码取整后可能略低。`;
            }
        }else $('target-field').hidden=$('kind').value!=='sum';
        const history=Array.isArray(engine.active.arcadeHistory)?engine.active.arcadeHistory:[];
        const recent=history.filter(result=>CasinoArcade.validHistory(result)&&result.id!==runningId&&result.game===kind).slice(0,6);
        $('history').replaceChildren(...(recent.length?recent.map(result=>{const li=document.createElement('li');li.textContent=describe(result);li.dataset.loss=String(result.net<0);return li;}):[Object.assign(document.createElement('li'),{textContent:'还没有本玩法的记录。'})]));
    }
    async function play(jackpot=false){
        if(!visible||pending||animating||callbacks.locked())return;
        if(!scene){callbacks.notify('3D 画面尚不可用，请检查浏览器的 WebGL 支持。',true);return;}
        const wager=$('wager').value;let result;
        pending=true;update();callbacks.changed();
        try {
            result=kind==='plinko'?await engine.playPlinko(wager,$('risk').value,$('lane').value,{jackpot}):await engine.playDice(wager,$('kind').value,$('kind').value==='sum'?Number($('target').value):null,{jackpot});
            pending=false;animating=true;visualBalance=result.walletAfterWager;runningId=result.id;engine.lock=kind;$('status').textContent=kind==='plinko'?'弹珠正在穿过钉阵…':'骰子正在滚动…';$('result').textContent='';update();callbacks.changed();
            scene.play(result,reduced?0:kind==='plinko'?4200:2300,()=>{
                animating=false;visualBalance=null;runningId=null;engine.lock=null;$('result').textContent=describe(result);$('result').dataset.loss=String(result.net<0);
                $('status').textContent=engine.active.recovery?`负数记录 -${fmt(engine.active.recovery.deficit)} · 下一局可用 10。`:'本局已结算，可以继续下注。';
                update();callbacks.changed();
            });
        }catch(error){pending=false;animating=false;visualBalance=null;runningId=null;engine.lock=null;update();callbacks.notify(result?'本局已结算，动画未能完成。请查看最近记录。':error.message,true);callbacks.changed();}
    }
    $( 'form').addEventListener('submit',event=>{event.preventDefault();return play();});
    for(const name of inputs)$(name).addEventListener(name==='wager'?'input':'change',update);
    wagers.forEach(button=>button.addEventListener('click',()=>{const value=button.dataset.arcadeChip.split(':')[1];$('wager').value=String(value==='all'?engine.active.balance:Number(value));update();}));
    if(kind==='dice')$('target').replaceChildren(...Object.entries(CasinoArcade.sumReturns).map(([total,multiplier])=>{const option=document.createElement('option');option.value=total;option.textContent=`${total} 点 · ${multiplier}×`;return option;}));
    window.addEventListener('keydown',event=>{
        if(!visible||event.repeat||event.code!=='Space'||event.ctrlKey||event.altKey||event.metaKey||event.shiftKey||event.target.closest('input,select,textarea,button,[contenteditable]'))return;
        event.preventDefault();event.stopImmediatePropagation();play();
    });
    return {
        update,forceJackpot:()=>play(true),get animating(){return pending||animating;},get displayBalance(){return visualBalance;},
        setVisible(value){visible=value;if(value&&!scene&&!failed){try{scene=createArcadeScene(kind,$('mount'),{play:()=>play(),selectLane:lane=>{$('lane').value=lane;update();},failed(){failed=true;scene=null;$('unavailable').hidden=false;update();callbacks.changed();}});if(!scene)throw new Error('WebGL unavailable');}catch{failed=true;$('mount').replaceChildren();$('unavailable').hidden=false;}}
            scene?.setVisible(value);update();}
    };
}
