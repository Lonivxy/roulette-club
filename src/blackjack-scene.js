function createBlackjackScene(container) {
    'use strict';
    const T = window.THREE;
    if (!T) return null;
    const renderer = new T.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = T.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    const scene = new T.Scene(); scene.background = new T.Color(0x101318); scene.fog = new T.Fog(0x101318, 16, 32);
    const camera = new T.PerspectiveCamera(37, 1, 0.1, 60);
    let active = false, frame = null, overhead = false, currentRound = null;
    const materials = new Map(), cards = new Map(), chips = new T.Group(); scene.add(chips);
    const warm = new T.SpotLight(0xffe7ba, 1.65, 35, Math.PI / 4, 0.65, 1.2);
    warm.position.set(-3.5, 10, 4); warm.castShadow = true; warm.shadow.mapSize.set(2048, 2048);
    warm.shadow.bias = -0.0003; warm.shadow.normalBias = 0.025; scene.add(warm);
    scene.add(new T.HemisphereLight(0xc9d9e8, 0x25211a, 0.72));
    const fill = new T.DirectionalLight(0xe4eaff, 0.4); fill.position.set(5, 6, -5); scene.add(fill);
    const rim = new T.PointLight(0xffc577, 0.6, 15); rim.position.set(0, 3, -5); scene.add(rim);
    function texture(canvas) {
        const map = new T.CanvasTexture(canvas); map.encoding = T.sRGBEncoding;
        map.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy()); return map;
    }
    function canvas(width, height) { const c = document.createElement('canvas'); c.width = width; c.height = height; return c; }
    function grain(kind) {
        const c = canvas(512, 512), ctx = c.getContext('2d');
        ctx.fillStyle = kind === 'felt' ? '#145540' : '#42251c'; ctx.fillRect(0, 0, 512, 512);
        if (kind === 'felt') {
            for (let i = 0; i < 26000; i++) {
                ctx.fillStyle = Math.random() > .5 ? 'rgba(255,255,210,.04)' : 'rgba(0,12,8,.11)';
                ctx.fillRect(Math.random() * 512, Math.random() * 512, 1, 1 + Math.random() * 2);
            }
        } else {
            for (let i = 0; i < 500; i++) {
                const x = Math.random() * 512; ctx.beginPath(); ctx.moveTo(x, 0);
                ctx.bezierCurveTo(x + 35, 170, x - 35, 340, x + 5, 512);
                ctx.strokeStyle = i % 2 ? '#9c6a3b16' : '#160c0d55'; ctx.lineWidth = Math.random() * 3; ctx.stroke();
            }
        }
        const map = texture(c); map.wrapS = map.wrapT = T.RepeatWrapping;
        if (kind === 'felt') map.repeat.set(5, 5); return map;
    }
    const felt = grain('felt'), walnut = grain('wood');
    function mesh(geometry, material, x, y, z) {
        const object = new T.Mesh(geometry, material); object.position.set(x, y, z);
        object.castShadow = true; object.receiveShadow = true; scene.add(object); return object;
    }
    const wood = mesh(new T.CylinderGeometry(5.8, 5.65, .45, 128), new T.MeshStandardMaterial({ map: walnut, roughness: .32, metalness: .05 }), 0, -.24, 0); wood.scale.z = .62;
    const cloth = mesh(new T.CylinderGeometry(5.33, 5.33, .08, 128), new T.MeshStandardMaterial({ map: felt, bumpMap: felt, bumpScale: .025, roughness: 1 }), 0, .015, 0); cloth.scale.z = .6;
    const leather = mesh(new T.TorusGeometry(5.52, .255, 20, 128), new T.MeshStandardMaterial({ color: 0x251f20, roughness: .7, bumpMap: walnut, bumpScale: .035 }), 0, .045, 0);
    leather.rotation.x = -Math.PI / 2; leather.scale.y = .62;
    const brassMaterial = new T.MeshStandardMaterial({ color: 0xb99959, metalness: .85, roughness: .27 });
    for (const radius of [5.22, 5.79]) {
        const ring = mesh(new T.TorusGeometry(radius, .018, 8, 128), brassMaterial, 0, radius === 5.22 ? .07 : -.12, 0);
        ring.rotation.x = -Math.PI / 2; ring.scale.y = .62;
    }
    mesh(new T.CylinderGeometry(1.15, 1.65, 1, 48), new T.MeshStandardMaterial({ color: 0x272326, roughness: .4, metalness: .45 }), 0, -.95, 0);
    const floor = mesh(new T.PlaneGeometry(70, 70), new T.MeshStandardMaterial({ color: 0x13171b, roughness: .85 }), 0, -1.47, 0); floor.rotation.x = -Math.PI / 2;
    const print = canvas(1200, 340), ink = print.getContext('2d');
    ink.textAlign = 'center'; ink.fillStyle = '#d2ba7b'; ink.font = '26px Georgia'; ink.fillText('T H E   R E S E R V E', 600, 65);
    ink.font = 'bold 48px Georgia'; ink.fillText('BLACKJACK PAYS 3 TO 2', 600, 150);
    ink.fillStyle = '#c5c7a2'; ink.font = '24px Georgia'; ink.fillText('DEALER STANDS ON ALL 17s', 600, 220);
    ink.strokeStyle = '#d2ba7b66'; ink.lineWidth = 2; ink.beginPath(); ink.ellipse(600, 50, 560, 250, 0, .17, Math.PI - .17); ink.stroke();
    const printing = mesh(new T.PlaneGeometry(5.2, 1.48), new T.MeshBasicMaterial({ map: texture(print), transparent: true, depthWrite: false }), 0, .066, -.15); printing.rotation.x = -Math.PI / 2;
    const shoe = mesh(new T.BoxGeometry(1.13, .38, 1.7), new T.MeshStandardMaterial({ color: 0x262d31, metalness: .3, roughness: .24 }), 4.1, .26, -1.15); shoe.rotation.y = -.15;
    mesh(new T.BoxGeometry(1, .13, 1.38), new T.MeshStandardMaterial({ color: 0xeee6d7, roughness: .7 }), 4.1, .52, -1.15);
    const tray = mesh(new T.BoxGeometry(1.1, .12, 1.6), new T.MeshStandardMaterial({ color: 0x171d1d, metalness: .2, roughness: .35 }), -4.12, .12, -1.15); tray.rotation.y = .12;
    for (let i = 0; i < 5; i++) mesh(new T.BoxGeometry(.78, .015, 1.1), new T.MeshStandardMaterial({ color: 0x79303e, roughness: .7 }), -4.12 + i * .018, .2 + i * .018, -1.15);
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    function cardMap(card) {
        const key = card ? card.rank + ':' + card.suit : 'back';
        if (materials.has(key)) return materials.get(key);
        const c = canvas(384, 576), ctx = c.getContext('2d');
        ctx.fillStyle = '#f6f2e9'; ctx.fillRect(0, 0, 384, 576);
        ctx.strokeStyle = '#cec9bd'; ctx.lineWidth = 3; ctx.strokeRect(5, 5, 374, 566);
        if (!card) {
            ctx.fillStyle = '#662c39'; ctx.fillRect(18, 18, 348, 540); ctx.strokeStyle = '#dbc99b60'; ctx.lineWidth = 1;
            for (let i = -576; i < 960; i += 15) { ctx.beginPath(); ctx.moveTo(i, 18); ctx.lineTo(i + 540, 558); ctx.stroke(); ctx.beginPath(); ctx.moveTo(i, 18); ctx.lineTo(i - 540, 558); ctx.stroke(); }
            ctx.fillStyle = '#6f2f3d'; ctx.beginPath(); ctx.ellipse(192, 288, 100, 138, 0, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#d8c498'; ctx.lineWidth = 3; ctx.stroke();
            ctx.textAlign = 'center'; ctx.fillStyle = '#e9d9b0'; ctx.font = 'bold 68px Georgia'; ctx.fillText('R', 192, 306); ctx.font = '13px Georgia'; ctx.fillText('THE RESERVE', 192, 344);
        } else {
            const red = card.suit === 1 || card.suit === 2; ctx.fillStyle = red ? '#ae2733' : '#18222b';
            const corner = () => { ctx.textAlign = 'center'; ctx.font = 'bold 48px Georgia'; ctx.fillText(ranks[card.rank], 43, 65); ctx.font = '44px Georgia'; ctx.fillText(suits[card.suit], 43, 111); };
            corner(); ctx.save(); ctx.translate(384, 576); ctx.rotate(Math.PI); corner(); ctx.restore();
            if (card.rank === 1) { ctx.font = '160px Georgia'; ctx.textAlign = 'center'; ctx.fillText(suits[card.suit], 192, 340); }
            else if (card.rank > 10) {
                ctx.strokeStyle = red ? '#a92c3b' : '#2b3c58'; ctx.lineWidth = 8; ctx.strokeRect(94, 112, 196, 352);
                ctx.strokeStyle = '#c3a462'; ctx.lineWidth = 3; ctx.strokeRect(103, 121, 178, 334);
                ctx.font = 'bold 120px Georgia'; ctx.textAlign = 'center'; ctx.fillText(ranks[card.rank], 192, 294);
                ctx.font = '88px Georgia'; ctx.fillText(suits[card.suit], 192, 397);
            } else {
                const patterns = {
                    2:[[0,-1],[0,1]],3:[[0,-1],[0,0],[0,1]],4:[[-1,-1],[1,-1],[-1,1],[1,1]],
                    5:[[-1,-1],[1,-1],[0,0],[-1,1],[1,1]],6:[[-1,-1],[1,-1],[-1,0],[1,0],[-1,1],[1,1]],
                    7:[[-1,-1],[1,-1],[0,-.5],[-1,0],[1,0],[-1,1],[1,1]],
                    8:[[-1,-1],[1,-1],[0,-.5],[-1,0],[1,0],[0,.5],[-1,1],[1,1]],
                    9:[[-1,-1],[1,-1],[-1,-.33],[1,-.33],[0,0],[-1,.33],[1,.33],[-1,1],[1,1]],
                    10:[[-1,-1],[1,-1],[0,-.65],[-1,-.33],[1,-.33],[-1,.33],[1,.33],[0,.65],[-1,1],[1,1]]
                };
                ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '60px Georgia';
                for (const [x,y] of patterns[card.rank]) { ctx.save(); ctx.translate(192 + x * 68, 288 + y * 150); if (y > 0) ctx.rotate(Math.PI); ctx.fillText(suits[card.suit], 0, 0); ctx.restore(); }
            }
        }
        const material = new T.MeshStandardMaterial({ map: texture(c), roughness: .64, metalness: 0 }); materials.set(key, material); return material;
    }
    const bodyGeometry = new T.BoxGeometry(.88, .018, 1.27), faceGeometry = new T.PlaneGeometry(.9, 1.29);
    const paper = new T.MeshStandardMaterial({ color: 0xe7e1d4, roughness: .8 });
    function createCard(card, hidden, delay) {
        const group = new T.Group();
        const body = new T.Mesh(bodyGeometry, paper); body.castShadow = true; group.add(body);
        const face = new T.Mesh(faceGeometry, cardMap(card)); face.rotation.x = -Math.PI / 2; face.position.y = .011; face.receiveShadow = true; group.add(face);
        const back = new T.Mesh(faceGeometry, cardMap(null)); back.rotation.x = Math.PI / 2; back.position.y = -.011; group.add(back);
        group.position.set(4.1, .65, -1.15); group.rotation.z = hidden ? Math.PI : 0;
        group.userData = { started: performance.now() + delay, from: group.position.clone(), target: new T.Vector3(), hidden, targetFlip: hidden ? Math.PI : 0, yaw: 0, face, faceKey: card.rank + ':' + card.suit };
        scene.add(group); return group;
    }
    const chipGeometry = new T.CylinderGeometry(.225, .225, .055, 40), chipMaps = new Map();
    function chipStack(value, x, z) {
        const denominations = [500,100,50,10], colors = ['#76518e','#292c31','#a33941','#276599'];
        let height = 0, remaining = value;
        denominations.forEach((denom, index) => {
            const count = Math.floor(remaining / denom); remaining %= denom;
            if (!chipMaps.has(denom)) {
                const c = canvas(128,128), ctx = c.getContext('2d'); ctx.fillStyle = colors[index]; ctx.fillRect(0,0,128,128);
                ctx.strokeStyle = '#f4eadd'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(64,64,45,0,Math.PI*2); ctx.stroke();
                ctx.fillStyle = '#f4eadd'; ctx.textAlign = 'center'; ctx.font = 'bold 34px Georgia'; ctx.fillText(String(denom),64,76); chipMaps.set(denom,texture(c));
            }
            for (let i = 0; i < Math.min(count,10); i++) {
                const group = new T.Group(); group.position.set(x, .095 + height * .058, z);
                const edge = new T.Mesh(chipGeometry, new T.MeshStandardMaterial({ color: colors[index], roughness:.65 })); edge.castShadow = true; group.add(edge);
                const top = new T.Mesh(new T.CircleGeometry(.224,40),new T.MeshStandardMaterial({map:chipMaps.get(denom),roughness:.6})); top.rotation.x=-Math.PI/2; top.position.y=.029; group.add(top);
                for(let j=0;j<8;j++) { const notch=new T.Mesh(new T.BoxGeometry(.055,.057,.05),paper); const a=j*Math.PI/4; notch.position.set(Math.cos(a)*.21,0,Math.sin(a)*.21); notch.rotation.y=-a; group.add(notch); }
                chips.add(group); height++;
            }
        });
    }
    function clearChips() {
        while (chips.children.length) { const group=chips.children[0]; group.traverse(obj=>{ if(obj.isMesh) { if(obj.geometry!==chipGeometry) obj.geometry.dispose(); if(obj.material!==paper) obj.material.dispose(); } }); chips.remove(group); }
    }
    function sync(round, wager) {
        const changed = currentRound !== round?.id; currentRound = round?.id;
        if (changed) { for (const group of cards.values()) scene.remove(group); cards.clear(); }
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        function place(key, card, hidden, x, z, yaw, delay, stackIndex) {
            let group = cards.get(key);
            if (!group) { group=createCard(card,hidden,reduced?0:delay); if(reduced) group.userData.started-=1000; cards.set(key,group); }
            const faceKey=card.rank+':'+card.suit;
            if(group.userData.faceKey!==faceKey) {group.userData.face.material=cardMap(card);group.userData.faceKey=faceKey;}
            group.userData.target.set(x,.092+stackIndex*.014,z); group.userData.yaw=yaw; group.userData.targetFlip=hidden?Math.PI:0;
        }
        if (round) {
            round.dealer.forEach((card,index)=>place('d'+index,card,index===1&&round.phase==='player', (index-(round.dealer.length-1)/2)*.43,-1.35,(index-(round.dealer.length-1)/2)*-.035,changed?index*220+100:0,index));
            round.hands.forEach((hand,h)=> {
                const center=round.hands.length===1?0:(h===0?-1.75:1.75);
                const spacing=Math.min(.43,2.45/Math.max(1,hand.cards.length-1));
                hand.cards.forEach((card,index)=>place('p'+h+'-'+index,card,false,center+(index-(hand.cards.length-1)/2)*spacing,1.3+(h===0?0:.05),(index-(hand.cards.length-1)/2)*.035,changed?index*220:0,index));
            });
        }
        clearChips();
        if(round) round.hands.forEach((hand,h)=>chipStack(hand.bet,round.hands.length===1?0:(h===0?-1.75:1.75),2.3));
        else chipStack(wager,0,2.3);
    }
    function resize() {
        const width=container.clientWidth||900,height=container.clientHeight||450;
        renderer.setSize(width,height,false); camera.aspect=width/height;
        if(overhead) camera.position.set(0, camera.aspect<1.3?16:12.5,.01);
        else camera.position.set(0,camera.aspect<1.3?11.7:8.4,camera.aspect<1.3?12.7:9.3);
        camera.lookAt(0,0,0); camera.updateProjectionMatrix();
    }
    function animate(now) {
        frame=null; if(!active) return;
        for(const group of cards.values()) {
            const d=group.userData,t=Math.max(0,Math.min(1,(now-d.started)/520)),ease=1-Math.pow(1-t,3);
            group.position.lerpVectors(d.from,d.target,ease); group.position.y+=Math.sin(t*Math.PI)*.4;
            group.rotation.y+=(d.yaw-group.rotation.y)*.18; group.rotation.z+=(d.targetFlip-group.rotation.z)*.16;
        }
        renderer.render(scene,camera); frame=requestAnimationFrame(animate);
    }
    const observer=typeof ResizeObserver!=='undefined'?new ResizeObserver(resize):null; observer?.observe(container);
    window.addEventListener('resize',resize);
    resize();
    return { sync, resize,
        setVisible(value) { active=value; if(value) { resize(); if(frame===null) frame=requestAnimationFrame(animate); } else if(frame!==null) {cancelAnimationFrame(frame);frame=null;} },
        setOverhead(value) {overhead=value;resize();}
    };
}
