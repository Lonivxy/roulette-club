function createArcadeScene(kind, container, callbacks) {
    'use strict';
    const T=window.THREE;if(!T)return null;
    const renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75));renderer.outputEncoding=T.sRGBEncoding;
    renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    const scene=new T.Scene(),camera=new T.PerspectiveCamera(kind==='plinko'?40:35,1,.1,60);
    scene.background=new T.Color(kind==='plinko'?0x09131f:0x0b1e1a);
    camera.position.set(...(kind==='plinko'?[0,3,20]:[6,9,11]));camera.lookAt(0,kind==='plinko'?1:0,0);
    scene.add(new T.HemisphereLight(0xd7ecff,0x142125,1.0));
    const key=new T.DirectionalLight(0xffe5ba,1.7);key.position.set(-4,10,10);key.castShadow=true;key.shadow.mapSize.set(1024,1024);scene.add(key);
    const rim=new T.PointLight(kind==='plinko'?0x39d5d9:0xe7b65b,1.4,30);rim.position.set(5,4,5);scene.add(rim);
    const pink=new T.PointLight(0xe86b9c,.65,20);pink.position.set(-5,-2,5);scene.add(pink);
    const metal=new T.MeshStandardMaterial({color:0xae9863,metalness:.8,roughness:.25});
    const dark=new T.MeshStandardMaterial({color:0x122230,metalness:.45,roughness:.6});
    const textures=new Map();let active=false,frame=null,animation=null,optionsKey='',ball,pins=[],bins=[],launchers=[],dice=[];
    function box(w,h,d,material,x=0,y=0,z=0){const mesh=new T.Mesh(new T.BoxGeometry(w,h,d),material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;scene.add(mesh);return mesh;}
    function textTexture(text,background='#183b4c',foreground='#f4e5bb'){
        const key=text+background+foreground;if(textures.has(key))return textures.get(key);
        const canvas=document.createElement('canvas');canvas.width=256;canvas.height=128;const ctx=canvas.getContext('2d');
        ctx.fillStyle=background;ctx.fillRect(0,0,256,128);ctx.fillStyle=foreground;ctx.font='bold 48px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,128,66);
        const texture=new T.CanvasTexture(canvas);texture.encoding=T.sRGBEncoding;textures.set(key,texture);return texture;
    }
    function faceTexture(n){
        const key='dice'+n;if(textures.has(key))return textures.get(key);
        const canvas=document.createElement('canvas');canvas.width=canvas.height=256;const ctx=canvas.getContext('2d');
        ctx.fillStyle='#f4ebd8';ctx.fillRect(0,0,256,256);ctx.strokeStyle='#b6a58c';ctx.lineWidth=8;ctx.strokeRect(7,7,242,242);
        const positions={1:[[1,1]],2:[[0,0],[2,2]],3:[[0,0],[1,1],[2,2]],4:[[0,0],[2,0],[0,2],[2,2]],5:[[0,0],[2,0],[1,1],[0,2],[2,2]],6:[[0,0],[2,0],[0,1],[2,1],[0,2],[2,2]]};
        ctx.fillStyle=n===1?'#ae243d':'#182a2d';for(const [x,y] of positions[n]){ctx.beginPath();ctx.arc(63+x*65,63+y*65,20,0,Math.PI*2);ctx.fill();}
        const texture=new T.CanvasTexture(canvas);texture.encoding=T.sRGBEncoding;textures.set(key,texture);return texture;
    }
    if(kind==='plinko'){
        box(11.8,12,.4,dark,0,.9,-.4);box(.18,12.2,.65,metal,-5.9,.9,0);box(.18,12.2,.65,metal,5.9,.9,0);box(12,.18,.65,metal,0,7,0);box(12,.18,.65,metal,0,-5.1,0);
        for(let row=0;row<CasinoArcade.rows;row++){
            const line=[];for(let col=0;col<=row;col++){
                const material=new T.MeshStandardMaterial({color:0xb9d0d7,metalness:.9,roughness:.23,emissive:0x2db8c5,emissiveIntensity:0});
                const peg=new T.Mesh(new T.CylinderGeometry(.095,.115,.3,12),material);peg.rotation.x=Math.PI/2;peg.position.set((col-row/2)*.82,5-row*.72,.1);peg.castShadow=true;scene.add(peg);line.push(peg);
            }pins.push(line);
        }
        for(let i=0;i<=CasinoArcade.rows;i++){
            const edge=Math.abs(i-6),color=edge>=5?0xb27a35:edge>=3?0x96526a:0x205d6b;
            const material=new T.MeshStandardMaterial({color,metalness:.5,roughness:.4,emissive:color,emissiveIntensity:.2});
            const bin=box(.75,.75,.5,material,(i-6)*.82,-4.48,.05);
            const label=new T.Mesh(new T.PlaneGeometry(.72,.36),new T.MeshBasicMaterial({map:textTexture('1×')}));label.position.set(bin.position.x,-4.44,.32);scene.add(label);bins.push({bin,label});
        }
        for(const [index,lane] of ['left','center','right'].entries()){
            const material=new T.MeshStandardMaterial({color:0x77d0d4,metalness:.65,roughness:.2,emissive:0x3ec4c8,emissiveIntensity:.1});
            const marker=new T.Mesh(new T.TorusGeometry(.27,.08,12,32),material);marker.position.set((index-1)*1.8,6.3,.2);marker.userData.lane=lane;scene.add(marker);launchers.push(marker);
        }
        ball=new T.Mesh(new T.SphereGeometry(.16,24,18),new T.MeshStandardMaterial({color:0xffdf8a,emissive:0xd58a28,emissiveIntensity:.5,metalness:.8,roughness:.13}));ball.visible=false;ball.castShadow=true;scene.add(ball);
    }else{
        const felt=new T.MeshStandardMaterial({color:0x104936,roughness:.95,metalness:0});
        box(9,.25,6,felt,0,-.2,0);box(9.4,.55,.22,metal,0,0,3);box(9.4,.55,.22,metal,0,0,-3);box(.22,.55,6.2,metal,-4.6,0,0);box(.22,.55,6.2,metal,4.6,0,0);
        const materials=[1,6,2,5,3,4].map(n=>new T.MeshStandardMaterial({map:faceTexture(n),metalness:.08,roughness:.32}));
        for(let i=0;i<3;i++){const cube=new T.Mesh(new T.BoxGeometry(1.25,1.25,1.25),materials);cube.position.set((i-1)*1.9,.65,0);cube.castShadow=true;cube.receiveShadow=true;scene.add(cube);dice.push(cube);}
        const label=new T.Mesh(new T.PlaneGeometry(5,.65),new T.MeshBasicMaterial({map:textTexture('DICE CLUB','#104936','#b8d6ac')}));label.rotation.x=-Math.PI/2;label.position.set(0,-.06,1.8);scene.add(label);
    }
    function resize(){
        const width=container.clientWidth||640,height=container.clientHeight||560;renderer.setSize(width,height,false);camera.aspect=width/height;
        if(kind==='plinko')camera.position.set(0,3,Math.max(20,6.5/(Math.tan(Math.PI/9)*camera.aspect)));
        else {const scale=Math.max(1,1.15/camera.aspect);camera.position.set(6*scale,9*scale,11*scale);}
        camera.lookAt(0,kind==='plinko'?1:0,0);camera.updateProjectionMatrix();
    }
    function updateOptions(risk='medium',lane='center'){
        if(kind!=='plinko')return;
        if(optionsKey===risk+lane)return;optionsKey=risk+lane;
        const table=CasinoArcade.tables[risk]||CasinoArcade.tables.medium;
        bins.forEach(({bin,label},i)=>{label.material.map=textTexture(table[i]/100+'×',i===6?'#204e61':Math.abs(i-6)>=5?'#8b5428':'#58384b');label.material.needsUpdate=true;bin.material.emissiveIntensity=.2;});
        launchers.forEach(marker=>marker.material.emissiveIntensity=marker.userData.lane===lane?1.3:.1);
    }
    function settle(result){
        if(kind==='plinko'){ball.position.set((result.pocket-6)*.82,-4.05,.45);bins[result.pocket].bin.material.emissiveIntensity=1.4;}
        else result.dice.forEach((face,i)=>{const rotation=CasinoArcade.diceRotation(face);dice[i].rotation.set(rotation.x,0,rotation.z);dice[i].position.set((i-1)*1.9,.65,0);});
    }
    function draw(now){
        frame=null;if(!active)return;
        if(animation){
            const a=animation,t=Math.min(1,Math.max(0,(now-a.start)/a.duration));
            if(kind==='plinko'){
                const index=Math.min(a.points.length-2,Math.floor(t*(a.points.length-1))),fraction=t===1?1:t*(a.points.length-1)-index,p=a.points[index],q=a.points[index+1];
                const smooth=fraction*fraction*(3-2*fraction);ball.position.set(p.x+(q.x-p.x)*smooth,p.y+(q.y-p.y)*fraction+Math.sin(fraction*Math.PI)*.14,.45);
                for(const line of pins)for(const pin of line)pin.material.emissiveIntensity*=.88;
                if(index>=1&&index<=12){const rights=a.result.path.slice(0,index-1).reduce((s,n)=>s+n,0);pins[index-1][rights].material.emissiveIntensity=.8*(1-fraction);}
            }else{
                const ease=1-(1-t)**3;
                dice.forEach((cube,i)=>{const target=CasinoArcade.diceRotation(a.result.dice[i]);cube.rotation.set((Math.PI*6+target.x)*ease,Math.PI*4*ease,(Math.PI*4+target.z)*ease);cube.position.y=.65+Math.abs(Math.sin(t*Math.PI*(5+i)))*(1-t)*2;cube.position.z=Math.sin(t*Math.PI*3+i)*(1-t)*.6;});
            }
            if(t===1){animation=null;settle(a.result);a.done();}
        }
        try { renderer.render(scene,camera); } catch { stopAndFail(); }
        if(active)frame=requestAnimationFrame(draw);
    }
    function stopAndFail(){
        active=false;if(frame!==null){cancelAnimationFrame(frame);frame=null;}
        const current=animation;animation=null;if(current)current.done();callbacks.failed?.();
    }
    renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();stopAndFail();});
    const raycaster=new T.Raycaster();
    renderer.domElement.addEventListener('pointerup',event=>{
        if(!active||animation||event.button!==0)return;
        if(kind==='dice'){callbacks.play();return;}
        const rect=renderer.domElement.getBoundingClientRect();raycaster.setFromCamera(new T.Vector2((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1),camera);
        const hit=raycaster.intersectObjects(launchers)[0];if(hit){callbacks.selectLane(hit.object.userData.lane);callbacks.play();}
    });
    window.addEventListener('resize',resize);resize();updateOptions();
    return {
        updateOptions,
        setVisible(value){active=value;if(value){resize();if(frame===null)frame=requestAnimationFrame(draw);}else if(frame!==null){cancelAnimationFrame(frame);frame=null;}},
        play(result,duration,done){
            if(kind==='plinko'){ball.visible=true;ball.position.set(CasinoArcade.pathPoints(result.path,result.lane)[0].x,6.3,.45);bins.forEach(({bin})=>bin.material.emissiveIntensity=.2);}
            if(duration<=0){settle(result);done();return;}
            animation={result,duration,done,start:performance.now(),points:kind==='plinko'?CasinoArcade.pathPoints(result.path,result.lane):null};
        }
    };
}
