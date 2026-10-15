(function(root) {
    'use strict';
    const rows = 12;
    const tables = Object.freeze({
        low:Object.freeze([800,400,200,140,110,70,40,70,110,140,200,400,800]),
        medium:Object.freeze([2500,800,300,150,100,60,20,60,100,150,300,800,2500]),
        high:Object.freeze([10000,1500,400,200,60,20,0,20,60,200,400,1500,10000])
    });
    const lanes = Object.freeze({left:.44,center:.5,right:.56});
    const sumReturns = Object.freeze({4:61,5:31,6:19,7:13,8:9,9:7,10:7,11:7,12:7,13:9,14:13,15:19,16:31,17:61});
    const wager = value => {if(!Number.isSafeInteger(value)||value<1||value>1000000)throw new Error('下注需为 1–1,000,000 的整数。');return value;};
    const sample = random => {const n=random();if(!(n>=0&&n<1))throw new Error('无法生成有效结果，请重试。');return n;};
    function plinkoSettings(risk,lane) {
        if(!Object.hasOwn(tables,risk)||!Object.hasOwn(lanes,lane))throw new Error('请选择有效的风险和落球口。');
        return {table:tables[risk],rightChance:lanes[lane]};
    }
    function plinkoResult(value,risk,lane,path) {
        wager(value);const {table}=plinkoSettings(risk,lane);
        if(!Array.isArray(path)||path.length!==rows||!path.every(bit=>bit===0||bit===1))throw new Error('弹珠路径无效。');
        const pocket=path.reduce((sum,bit)=>sum+bit,0),multiplier=table[pocket]/100,payout=Math.floor(value*table[pocket]/100);
        return {game:'plinko',wager:value,risk,lane,path:[...path],pocket,multiplier,payout,net:payout-value};
    }
    function plinko(value,risk,lane,random,jackpot=false) {
        const {rightChance}=plinkoSettings(risk,lane);wager(value);
        const path=Array.from({length:rows},()=>jackpot?(lane==='right'?1:0):Number(sample(random)<rightChance));
        return plinkoResult(value,risk,lane,path);
    }
    function pocketProbability(pocket,lane) {
        if(!Number.isInteger(pocket)||pocket<0||pocket>rows||!Object.hasOwn(lanes,lane))throw new Error('槽位无效。');
        let combinations=1;for(let i=1;i<=pocket;i++)combinations=combinations*(rows-i+1)/i;
        return combinations*lanes[lane]**pocket*(1-lanes[lane])**(rows-pocket);
    }
    function pathPoints(path,lane) {
        plinkoResult(1,'low',lane,path);let rights=0;
        const points=[{x:{left:-1.8,center:0,right:1.8}[lane],y:6.3},{x:0,y:5.22}];
        for(let i=1;i<=rows;i++){rights+=path[i-1];points.push({x:(rights-i/2)*.82,y:5.22-i*.72});}
        points.push({x:(rights-6)*.82,y:-4.05});return points;
    }
    function diceSettings(kind,target) {
        if(!['small','big','odd','even','triple','sum'].includes(kind))throw new Error('请选择有效的骰宝下注。');
        if(kind==='sum'&&(!Number.isInteger(target)||!Object.hasOwn(sumReturns,target)))throw new Error('指定总点数需为 4–17。');
        return kind==='sum'?sumReturns[target]:kind==='triple'?31:2;
    }
    function diceResult(value,kind,target,faces) {
        wager(value);const maxReturn=diceSettings(kind,target);
        if(!Array.isArray(faces)||faces.length!==3||!faces.every(n=>Number.isInteger(n)&&n>=1&&n<=6))throw new Error('骰子结果无效。');
        const total=faces.reduce((sum,n)=>sum+n,0),triple=faces.every(n=>n===faces[0]);
        const won=kind==='triple'?triple:kind==='sum'?total===target:!triple&&(kind==='small'?total>=4&&total<=10:kind==='big'?total>=11&&total<=17:kind==='odd'?total%2===1:total%2===0);
        const multiplier=won?maxReturn:0,payout=value*multiplier;
        return {game:'dice',wager:value,kind,target:kind==='sum'?target:null,dice:[...faces],total,triple,multiplier,payout,net:payout-value};
    }
    function dice(value,kind,target,random,jackpot=false) {
        diceSettings(kind,target);wager(value);let faces;
        if(jackpot){
            outer:for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)for(let c=1;c<=6;c++)if(diceResult(value,kind,target,[a,b,c]).payout>0){faces=[a,b,c];break outer;}
        }else faces=Array.from({length:3},()=>1+Math.floor(sample(random)*6));
        return diceResult(value,kind,target,faces);
    }
    function diceRotation(face) {
        const rotations={1:{x:0,z:Math.PI/2},2:{x:0,z:0},3:{x:-Math.PI/2,z:0},4:{x:Math.PI/2,z:0},5:{x:0,z:Math.PI},6:{x:0,z:-Math.PI/2}};
        if(!Object.hasOwn(rotations,face))throw new Error('骰子点数无效。');return rotations[face];
    }
    function validHistory(result) {
        try {
            if(!result||typeof result.id!=='string'||typeof result.time!=='string')return false;
            const expected=result.game==='plinko'?plinkoResult(result.wager,result.risk,result.lane,result.path):result.game==='dice'?diceResult(result.wager,result.kind,result.target,result.dice):null;
            return Boolean(expected&&result.payout===expected.payout&&result.net===expected.net&&result.multiplier===expected.multiplier&&(result.game!=='dice'||result.total===expected.total));
        }catch{return false;}
    }
    root.CasinoArcade={rows,tables,lanes,sumReturns,plinkoSettings,plinkoResult,plinko,pocketProbability,pathPoints,diceSettings,diceResult,dice,diceRotation,validHistory};
})(globalThis);
