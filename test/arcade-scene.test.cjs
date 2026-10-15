const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');require('../src/arcade-core.js');
function fixture(kind){
    const scenes=[],cameras=[],renderers=[],frames=new Map();let nextFrame=1,now=0,completed=0,plays=0,failed=0,lane;
    class Vector{set(x=0,y=0,z=0){this.x=x;this.y=y;this.z=z;return this;}}
    class Node{constructor(){this.position=new Vector();this.rotation=new Vector();this.userData={};} }
    class Material{constructor(props){Object.assign(this,props);}}
    class Element{constructor(){this.events={};}addEventListener(type,fn){this.events[type]=fn;}getBoundingClientRect(){return {left:0,top:0,width:600,height:600};}}
    class Geometry{constructor(...args){this.args=args;this.type=this.constructor.name;}}
    const T={Scene:class extends Node{constructor(){super();this.children=[];scenes.push(this);}add(node){this.children.push(node);}},
        PerspectiveCamera:class extends Node{constructor(){super();cameras.push(this);}lookAt(){}updateProjectionMatrix(){}},
        WebGLRenderer:class{constructor(){this.domElement=new Element();this.shadowMap={};renderers.push(this);}setPixelRatio(){}setSize(){}render(){this.renders=(this.renders||0)+1;}},
        Mesh:class extends Node{constructor(geometry,material){super();this.geometry=geometry;this.material=material;}},
        MeshStandardMaterial:Material,MeshBasicMaterial:Material,BoxGeometry:class BoxGeometry extends Geometry{},CylinderGeometry:class CylinderGeometry extends Geometry{},SphereGeometry:class SphereGeometry extends Geometry{},TorusGeometry:class TorusGeometry extends Geometry{},PlaneGeometry:class PlaneGeometry extends Geometry{},
        CanvasTexture:class{constructor(canvas){this.canvas=canvas;}},Color:class{},HemisphereLight:class extends Node{},PointLight:class extends Node{},DirectionalLight:class extends Node{constructor(){super();this.shadow={mapSize:{set(){}}};}},
        Vector2:Vector,Raycaster:class{setFromCamera(){}intersectObjects(objects){return [{object:objects[0]}];}}};
    const canvasContext={fillRect(){},strokeRect(){},fillText(){},beginPath(){},arc(){},fill(){}},container={clientWidth:600,clientHeight:600,appendChild(){}};
    const win=new Element();win.THREE=T;win.devicePixelRatio=1;
    const context={CasinoArcade,window:win,document:{createElement:()=>({getContext:()=>canvasContext})},performance:{now:()=>now},requestAnimationFrame(fn){const id=nextFrame++;frames.set(id,fn);return id;},cancelAnimationFrame(id){frames.delete(id);}};
    vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'../src/arcade-scene.js'),'utf8'),context);
    const scene=context.createArcadeScene(kind,container,{play(){plays++;},selectLane(value){lane=value;},failed(){failed++;}});
    return {scene,container,win,objects:scenes[0].children,camera:cameras[0],renderer:renderers[0],get pendingFrames(){return frames.size;},get completed(){return completed;},get plays(){return plays;},get lane(){return lane;},get failed(){return failed;},finish(){completed++;},frame(time){now=time;const [id,fn]=frames.entries().next().value;frames.delete(id);fn(time);}};
}
test('Plinko builds 78 pegs and 13 bins, follows the server path and fits a narrow screen',()=>{
    const t=fixture('plinko'),A=CasinoArcade,result=A.plinko(10,'high','right',()=>0,true);
    assert.equal(t.objects.filter(node=>node.geometry?.type==='CylinderGeometry').length,78);
    assert.equal(t.objects.filter(node=>node.geometry?.type==='PlaneGeometry').length,13);
    t.scene.setVisible(true);t.scene.updateOptions('high','right');t.scene.play(result,1000,()=>t.finish());t.frame(0);t.frame(500);t.frame(1000);
    const ball=t.objects.find(node=>node.geometry?.type==='SphereGeometry');assert.equal(ball.position.x,4.92);assert.equal(ball.position.y,-4.05);assert.equal(t.completed,1);
    t.container.clientWidth=360;t.container.clientHeight=560;t.win.events.resize();assert.ok(t.camera.position.z>25);
    t.renderer.domElement.events.pointerup({button:0,clientX:100,clientY:100});assert.equal(t.lane,'left');assert.equal(t.plays,1);
    t.scene.setVisible(false);assert.equal(t.pendingFrames,0);
});
test('three dice settle on the reported top faces and context loss finishes a paid animation once',()=>{
    const t=fixture('dice'),result=CasinoArcade.diceResult(10,'sum',6,[1,2,3]);
    t.scene.setVisible(true);t.scene.play(result,1000,()=>t.finish());t.frame(0);t.frame(1000);
    const dice=t.objects.filter(node=>node.geometry?.type==='BoxGeometry'&&node.geometry.args[0]===1.25);assert.equal(dice.length,3);
    dice.forEach((cube,i)=>{const expected=CasinoArcade.diceRotation(result.dice[i]);assert.equal(cube.rotation.x,expected.x);assert.equal(cube.rotation.z,expected.z);assert.equal(cube.position.y,.65);});
    t.scene.play(result,1000,()=>t.finish());t.renderer.domElement.events.webglcontextlost({preventDefault(){}});assert.equal(t.completed,2);assert.equal(t.failed,1);assert.equal(t.pendingFrames,0);
    t.renderer.domElement.events.webglcontextlost({preventDefault(){}});assert.equal(t.completed,2);
});
