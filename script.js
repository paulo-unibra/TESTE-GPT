import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container = document.querySelector('#scene');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x07131f);
scene.fog = new THREE.FogExp2(0x07131f, 0.016);

const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 180);
camera.position.set(27, 13, 29);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.055;
controls.minDistance = 12;
controls.maxDistance = 58;
controls.maxPolarAngle = Math.PI * 0.48;
controls.target.set(0, 2.4, 0);

const hemi = new THREE.HemisphereLight(0xa9c8de, 0x241a12, 1.55);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffe6b0, 4.3);
sun.position.set(-14, 24, 17);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -24;
sun.shadow.camera.right = 24;
sun.shadow.camera.top = 24;
sun.shadow.camera.bottom = -24;
scene.add(sun);
const rim = new THREE.DirectionalLight(0x5bb8ff, 2.1);
rim.position.set(18, 8, -25);
scene.add(rim);

const parts = {
  hull: {
    number: '01', name: 'Casco do navio', type: 'ESTRUTURA PRINCIPAL', verse: 'Atos 27:18, 22, 41',
    description: 'A estrutura principal da embarcação. Durante a tempestade o navio foi aliviado e, no naufrágio, a proa ficou presa enquanto a popa se rompia com a força das ondas.',
    quote: '“...não se perderá a vida de nenhum de vós, mas somente o navio.”', target: [0, 0, 0], camera: [25, 8, 23]
  },
  bow: {
    number: '02', name: 'Proa', type: 'PARTE DIANTEIRA', verse: 'Atos 27:30, 41',
    description: 'A frente do navio. Os marinheiros fingiram que lançariam âncoras pela proa. Mais tarde, ela ficou fixa e imóvel quando a embarcação encalhou.',
    quote: '“...fixa a proa, ficou imóvel...”', target: [8.8, 0.6, 0], camera: [19, 6, 18]
  },
  stern: {
    number: '03', name: 'Popa', type: 'PARTE TRASEIRA', verse: 'Atos 27:29, 41',
    description: 'A parte traseira. Quatro âncoras foram lançadas da popa durante a noite. No encalhe, foi essa região que começou a se abrir sob a força das ondas.',
    quote: '“...lançaram da popa quatro âncoras...”', target: [-8.3, 0.8, 0], camera: [-20, 7, 18]
  },
  mainSail: {
    number: '04', name: 'Vela maior', type: 'PROPULSÃO À VELA', verse: 'Atos 27:40',
    description: 'Na tentativa final de alcançar a praia, a vela maior foi alçada ao vento para conduzir o navio em direção à enseada.',
    quote: '“...alçando a vela maior ao vento...”', target: [2, 5.7, 0], camera: [18, 11, 19]
  },
  sails: {
    number: '05', name: 'Velas', type: 'PROPULSÃO À VELA', verse: 'Atos 27:17',
    description: 'Durante o Euroaquilão, as velas foram amainadas e o navio passou a ser levado pela tempestade.',
    quote: '“...amainadas as velas, assim foram à toa.”', target: [-4, 4.5, 0], camera: [-12, 10, 19]
  },
  anchors: {
    number: '06', name: 'Quatro âncoras', type: 'FUNDEIO', verse: 'Atos 27:29, 30, 40',
    description: 'O texto informa explicitamente que quatro âncoras foram lançadas da popa. Ao amanhecer, elas foram abandonadas antes da tentativa de chegar à praia.',
    quote: '“...lançaram da popa quatro âncoras...”', target: [-7.8, -0.2, 2.1], camera: [-19, 5, 14]
  },
  rudder: {
    number: '07', name: 'Leme e suas amarras', type: 'DIREÇÃO', verse: 'Atos 27:40',
    description: 'Antes de seguir para a praia, foram soltas as amarras do leme. A reconstrução mostra lemes laterais do tipo usado em grandes embarcações antigas.',
    quote: '“...largando também as amarras do leme...”', target: [-9.3, -0.1, 0], camera: [-20, 4, 12]
  },
  boat: {
    number: '08', name: 'Batel', type: 'EMBARCAÇÃO AUXILIAR', verse: 'Atos 27:16–17, 30, 32',
    description: 'Um pequeno bote acompanhava o navio. Foi içado durante a tempestade e, depois, os marinheiros tentaram usá-lo para fugir. Os soldados cortaram seus cabos.',
    quote: '“Então os soldados cortaram os cabos do batel...”', target: [-1.2, 1.7, 1.2], camera: [10, 8, 15]
  },
  rigging: {
    number: '09', name: 'Cabos e cordas', type: 'APARELHO DO NAVIO', verse: 'Atos 27:17, 32, 40',
    description: 'Cabos aparecem em várias ações: cingindo e reforçando o navio, prendendo o batel e compondo as amarras do sistema de direção.',
    quote: '“...usaram de todos os meios, cingindo o navio...”', target: [0, 2.5, 0], camera: [21, 10, 19]
  },
  frame: {
    number: '10', name: 'Armação do navio', type: 'APARELHO / ESTRUTURA', verse: 'Atos 27:19',
    description: 'No terceiro dia da tempestade, a própria tripulação lançou ao mar a armação do navio para aliviar a embarcação. Aqui ela é representada pelo conjunto estrutural de mastros e vergas.',
    quote: '“...lançamos ao mar a armação do navio.”', target: [-1, 5.5, 0], camera: [15, 12, 18]
  },
  sounding: {
    number: '11', name: 'Prumo', type: 'NAVEGAÇÃO', verse: 'Atos 27:28',
    description: 'Instrumento usado para medir a profundidade. As medições caíram de vinte para quinze braças, indicando que a embarcação se aproximava rapidamente da terra.',
    quote: '“E, lançando o prumo, acharam vinte braças...”', target: [6.4, -0.5, 2.7], camera: [16, 4, 13]
  },
  cargo: {
    number: '12', name: 'Carga de trigo', type: 'CARGA', verse: 'Atos 27:10, 38',
    description: 'O navio levava carga e o texto identifica trigo. Depois que todos comeram, o trigo restante foi lançado ao mar para deixar a embarcação mais leve.',
    quote: '“...aliviaram o navio, lançando o trigo ao mar.”', target: [-4.3, 1.5, 0], camera: [-13, 7, 14]
  },
  planks: {
    number: '13', name: 'Tábuas e destroços', type: 'PARTES DO NAVIO', verse: 'Atos 27:44',
    description: 'Quando o navio se desfez, pessoas que não nadavam alcançaram a terra apoiadas em tábuas e em outras partes da embarcação.',
    quote: '“...uns em tábuas e outros em coisas do navio.”', target: [4.3, 1.3, -1.5], camera: [14, 6, -12]
  }
};

const wood = new THREE.MeshStandardMaterial({ color: 0x6f3f22, roughness: 0.72, metalness: 0.03 });
const darkWood = new THREE.MeshStandardMaterial({ color: 0x3d2115, roughness: 0.8 });
const deckMat = new THREE.MeshStandardMaterial({ color: 0x9a6337, roughness: 0.86 });
const sailMat = new THREE.MeshStandardMaterial({ color: 0xe9d8ae, roughness: 0.82, side: THREE.DoubleSide });
const sailDarkMat = new THREE.MeshStandardMaterial({ color: 0xc5ad7e, roughness: 0.86, side: THREE.DoubleSide });
const ropeMat = new THREE.MeshStandardMaterial({ color: 0x8f7145, roughness: 1 });
const bronzeMat = new THREE.MeshStandardMaterial({ color: 0x846842, roughness: 0.46, metalness: 0.62 });
const wheatMat = new THREE.MeshStandardMaterial({ color: 0xc79b4b, roughness: 0.9 });
const invisibleMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });

const ship = new THREE.Group();
ship.position.y = 1.75;
scene.add(ship);

function tag(root, key) {
  root.traverse(obj => {
    obj.userData.partKey = key;
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
      if (obj.material && 'emissiveIntensity' in obj.material) {
        obj.userData.baseEmissiveIntensity = obj.material.emissiveIntensity || 0;
      }
    }
  });
  return root;
}

function createHullGeometry(scale = 1) {
  const sections = [
    [-10.6, .38],[-9.5, 1.2],[-7.5, 2.05],[-4.5, 2.7],[0, 3.05],[4.7, 2.65],[7.7, 1.85],[9.7, .85],[10.7, .28]
  ];
  const vertices = [];
  const indices = [];
  for (const [x,w] of sections) {
    const bottom = -1.85 + 0.25 * Math.abs(x / 10.7);
    vertices.push(
      x*scale, .55*scale, -w*scale,
      x*scale, -.55*scale, -w*.94*scale,
      x*scale, bottom*scale, 0,
      x*scale, -.55*scale, w*.94*scale,
      x*scale, .55*scale, w*scale
    );
  }
  for (let s=0;s<sections.length-1;s++) {
    for (let p=0;p<4;p++) {
      const a=s*5+p,b=(s+1)*5+p,c=(s+1)*5+p+1,d=s*5+p+1;
      indices.push(a,b,d,b,c,d);
    }
  }
  for (const end of [0, sections.length-1]) {
    const o=end*5;
    if (end===0) indices.push(o,o+1,o+2,o,o+2,o+4,o+2,o+3,o+4);
    else indices.push(o,o+2,o+1,o,o+4,o+2,o+2,o+4,o+3);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices,3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function createDeckGeometry() {
  const sections = [[-10,.48],[-8.7,1.55],[-6,2.3],[0,2.82],[6,2.25],[8.8,1.2],[10,.4]];
  const vertices=[]; const indices=[];
  sections.forEach(([x,w])=>vertices.push(x,.68,-w,x,.68,w));
  for(let i=0;i<sections.length-1;i++){const a=i*2,b=a+1,c=a+2,d=a+3;indices.push(a,c,b,c,d,b)}
  const geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geo.setIndex(indices);geo.computeVertexNormals();return geo;
}

const hullMesh = tag(new THREE.Mesh(createHullGeometry(), wood), 'hull');
ship.add(hullMesh);
const deck = tag(new THREE.Mesh(createDeckGeometry(), deckMat), 'hull');
deck.receiveShadow = true;
ship.add(deck);

for(let x=-8;x<=8;x+=1.15){
  const plank=new THREE.Mesh(new THREE.BoxGeometry(.055,.045,4.1),darkWood);
  plank.position.set(x,.735,0); plank.rotation.y=.02*Math.sin(x); ship.add(tag(plank,'hull'));
}

const gunwaleGeo = new THREE.BoxGeometry(17.5,.23,.18);
for(const z of [-2.35,2.35]){
  const rail=new THREE.Mesh(gunwaleGeo,darkWood);rail.position.set(0,1.0,z);rail.scale.z=z>0?1:1;ship.add(tag(rail,'hull'));
}

const bowHit = new THREE.Mesh(new THREE.BoxGeometry(4.2,3.8,5.2), invisibleMat.clone());
bowHit.position.set(8.8,-.2,0); ship.add(tag(bowHit,'bow'));
const prow = new THREE.Mesh(new THREE.ConeGeometry(.28,2.6,8), bronzeMat);
prow.rotation.z=-Math.PI/2;prow.position.set(10.9,1.3,0);ship.add(tag(prow,'bow'));

const sternHit = new THREE.Mesh(new THREE.BoxGeometry(4.5,4,5.3), invisibleMat.clone());
sternHit.position.set(-8.7,-.2,0); ship.add(tag(sternHit,'stern'));
const sternDeck = new THREE.Mesh(new THREE.BoxGeometry(4.2,.45,4.3), darkWood);
sternDeck.position.set(-7.4,1.35,0);ship.add(tag(sternDeck,'stern'));
for(const z of [-1.7,1.7]){
  const post=new THREE.Mesh(new THREE.CylinderGeometry(.12,.16,1.7,10),darkWood);post.position.set(-8.7,2.1,z);ship.add(tag(post,'stern'));
}

function cylinderBetween(a,b,r,material){
  const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),mid=start.clone().add(end).multiplyScalar(.5);
  const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,start.distanceTo(end),10),material);
  mesh.position.copy(mid);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),end.clone().sub(start).normalize());return mesh;
}

function addMast(x,height,key='frame'){
  const mast=new THREE.Mesh(new THREE.CylinderGeometry(.18,.24,height,12),darkWood);
  mast.position.set(x,.85+height/2,0);ship.add(tag(mast,key));
  const yard=new THREE.Mesh(new THREE.CylinderGeometry(.1,.12,6.7,10),darkWood);
  yard.rotation.x=Math.PI/2;yard.position.set(x,.85+height*.72,0);ship.add(tag(yard,key));
  return {mast,yard};
}
addMast(1.7,9.2);
addMast(-4.3,7.1);

function sailShape(width,height,topScale=1,bottomScale=.78){
  const s=new THREE.Shape();
  s.moveTo(-width*topScale/2,height/2);s.lineTo(width*topScale/2,height/2);s.lineTo(width*bottomScale/2,-height/2);s.lineTo(-width*bottomScale/2,-height/2);s.closePath();
  const g=new THREE.ShapeGeometry(s,8);g.rotateY(Math.PI/2);return g;
}
const mainSail=new THREE.Mesh(sailShape(6.1,4.8,1,.72),sailMat);
mainSail.position.set(1.72,6.15,0);ship.add(tag(mainSail,'mainSail'));
const smallSail=new THREE.Mesh(sailShape(5.1,3.6,1,.7),sailDarkMat);
smallSail.position.set(-4.28,5.05,0);ship.add(tag(smallSail,'sails'));

const rigLines=[
  [[1.7,10,0],[10.5,1.3,0]],[[1.7,10,0],[-9.2,1.5,0]],
  [[-4.3,8,0],[-9.2,1.5,0]],[[1.7,8.2,-3],[1.7,8.2,3]],
  [[-4.3,6.3,-2.6],[-4.3,6.3,2.6]]
];
for(const [a,b] of rigLines){ship.add(tag(cylinderBetween(a,b,.035,ropeMat),'rigging'))}
for(const x of [-5.2,-1.7,2.0,5.3]){
  const ring=new THREE.Mesh(new THREE.TorusGeometry(2.55,.055,8,50),ropeMat);
  ring.rotation.y=Math.PI/2;ring.scale.y=.72;ring.position.set(x,-.42,0);ship.add(tag(ring,'rigging'));
}

function createAnchor(x,z,flip=1){
  const g=new THREE.Group();
  const shaft=new THREE.Mesh(new THREE.CylinderGeometry(.075,.1,1.65,9),bronzeMat);g.add(shaft);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.22,.055,8,20),bronzeMat);ring.position.y=.9;g.add(ring);
  const stock=new THREE.Mesh(new THREE.BoxGeometry(.95,.11,.11),bronzeMat);stock.position.y=.5;g.add(stock);
  const arm1=new THREE.Mesh(new THREE.BoxGeometry(.75,.12,.12),bronzeMat);arm1.position.set(-.23,-.78,0);arm1.rotation.z=-.55;g.add(arm1);
  const arm2=arm1.clone();arm2.position.x=.23;arm2.rotation.z=.55;g.add(arm2);
  g.position.set(x,-.4,z);g.rotation.x=flip*.18;g.rotation.z=.15;ship.add(tag(g,'anchors'));
}
createAnchor(-7.0,-2.45,-1);createAnchor(-8.15,-2.25,-1);createAnchor(-7.0,2.45,1);createAnchor(-8.15,2.25,1);

function createRudder(z,sign){
  const g=new THREE.Group();
  const shaft=cylinderBetween([0,2.0,0],[-1.2,-2.4,0],.1,darkWood);g.add(shaft);
  const blade=new THREE.Mesh(new THREE.BoxGeometry(.78,1.65,.18),darkWood);blade.position.set(-1.35,-2.65,0);blade.rotation.z=-.25;g.add(blade);
  const tie=new THREE.Mesh(new THREE.TorusGeometry(.22,.04,7,24),ropeMat);tie.rotation.x=Math.PI/2;tie.position.set(-.1,1.25,0);g.add(tie);
  g.position.set(-8.25,.4,z);g.rotation.x=sign*.1;ship.add(tag(g,'rudder'));
}
createRudder(-2.1,-1);createRudder(2.1,1);

const boat=new THREE.Group();
const boatHull=new THREE.Mesh(createHullGeometry(.24),new THREE.MeshStandardMaterial({color:0x7f4b2d,roughness:.82}));
boatHull.scale.y=.7;boat.add(boatHull);
const seatGeo=new THREE.BoxGeometry(.12,.12,1.1);
for(const x of [-1.2,0,1.2]){const seat=new THREE.Mesh(seatGeo,darkWood);seat.position.set(x,.25,0);boat.add(seat)}
boat.scale.set(.85,.85,.85);boat.position.set(-1.1,2.0,1.05);boat.rotation.y=-.05;ship.add(tag(boat,'boat'));

for(let i=0;i<12;i++){
  const sack=new THREE.Mesh(new THREE.SphereGeometry(.48,14,10),wheatMat);
  sack.scale.set(1.1,.7,.78);sack.position.set(-5.1+(i%4)*.72,1.05+Math.floor(i/8)*.55,-.75+Math.floor((i%8)/4)*1.45);ship.add(tag(sack,'cargo'));
}

for(let i=0;i<6;i++){
  const board=new THREE.Mesh(new THREE.BoxGeometry(3.2,.12,.32),deckMat);
  board.position.set(4.4,1.15+i*.13,-1.45);board.rotation.y=.08*(i-2);ship.add(tag(board,'planks'));
}

const soundingLine=cylinderBetween([6.5,.9,2.62],[6.5,-3.4,2.62],.025,ropeMat);
ship.add(tag(soundingLine,'sounding'));
const soundingWeight=new THREE.Mesh(new THREE.ConeGeometry(.18,.52,10),bronzeMat);
soundingWeight.position.set(6.5,-3.62,2.62);ship.add(tag(soundingWeight,'sounding'));

const frameDetail=new THREE.Mesh(new THREE.BoxGeometry(3.9,.18,.22),darkWood);
frameDetail.position.set(-1.15,2.1,-2.45);frameDetail.rotation.y=.2;ship.add(tag(frameDetail,'frame'));

// Decorative rope coils on deck
for(const x of [3.5,6.0]){
  const coil=new THREE.Mesh(new THREE.TorusGeometry(.44,.055,8,28),ropeMat);coil.rotation.x=Math.PI/2;coil.position.set(x,1.02,1.25);ship.add(tag(coil,'rigging'));
}

// Sea
const seaGeo=new THREE.PlaneGeometry(150,150,80,80);seaGeo.rotateX(-Math.PI/2);
const seaMat=new THREE.MeshPhysicalMaterial({color:0x0b3850,roughness:.28,metalness:.12,transparent:true,opacity:.93,clearcoat:.3,side:THREE.DoubleSide});
const sea=new THREE.Mesh(seaGeo,seaMat);sea.position.y=0;sea.receiveShadow=true;scene.add(sea);
const seaPos=seaGeo.attributes.position;const seaBase=[];
for(let i=0;i<seaPos.count;i++)seaBase.push([seaPos.getX(i),seaPos.getZ(i)]);

// A faint glow on the horizon
const horizon=new THREE.Mesh(new THREE.CircleGeometry(24,80),new THREE.MeshBasicMaterial({color:0x285270,transparent:true,opacity:.12,depthWrite:false}));
horizon.position.set(-35,14,-55);scene.add(horizon);

// Stars
const starPos=[];
for(let i=0;i<420;i++){
  const r=65+Math.random()*55;const theta=Math.random()*Math.PI*2;const phi=Math.random()*Math.PI*.42;
  starPos.push(Math.cos(theta)*Math.cos(phi)*r,14+Math.sin(phi)*r,Math.sin(theta)*Math.cos(phi)*r);
}
const starGeo=new THREE.BufferGeometry();starGeo.setAttribute('position',new THREE.Float32BufferAttribute(starPos,3));
const stars=new THREE.Points(starGeo,new THREE.PointsMaterial({color:0xcbe1ef,size:.12,transparent:true,opacity:.55}));scene.add(stars);

const raycaster=new THREE.Raycaster();
const pointer=new THREE.Vector2();
let hovered=null;
let selectedKey=null;
let cameraGoal=null;
let targetGoal=null;

function meshHighlight(key,on){
  ship.traverse(obj=>{
    if(!obj.isMesh || obj.userData.partKey!==key || obj.material===invisibleMat) return;
    const mats=Array.isArray(obj.material)?obj.material:[obj.material];
    mats.forEach(mat=>{
      if('emissive' in mat){mat.emissive.setHex(on?0x5a3b12:0x000000);mat.emissiveIntensity=on?.45:0;}
    });
  });
}

function getPartFromEvent(event){
  const rect=renderer.domElement.getBoundingClientRect();
  pointer.x=((event.clientX-rect.left)/rect.width)*2-1;
  pointer.y=-((event.clientY-rect.top)/rect.height)*2+1;
  raycaster.setFromCamera(pointer,camera);
  const hits=raycaster.intersectObjects(ship.children,true);
  return hits.find(hit=>hit.object.userData.partKey)?.object.userData.partKey || null;
}

renderer.domElement.addEventListener('pointermove',e=>{
  const key=getPartFromEvent(e);
  if(key!==hovered){
    if(hovered && hovered!==selectedKey)meshHighlight(hovered,false);
    hovered=key;
    if(hovered && hovered!==selectedKey)meshHighlight(hovered,true);
    renderer.domElement.style.cursor=key?'pointer':'grab';
  }
});
renderer.domElement.addEventListener('pointerleave',()=>{if(hovered&&hovered!==selectedKey)meshHighlight(hovered,false);hovered=null});
renderer.domElement.addEventListener('click',e=>{const key=getPartFromEvent(e);if(key)selectPart(key,false)});

const panel=document.querySelector('#info-panel');
function selectPart(key,focus=true){
  if(!parts[key])return;
  if(selectedKey)meshHighlight(selectedKey,false);
  selectedKey=key;meshHighlight(key,true);
  const p=parts[key];
  document.querySelector('#part-number').textContent=p.number;
  document.querySelector('#part-type').textContent=p.type;
  document.querySelector('#part-name').textContent=p.name;
  document.querySelector('#part-verse').textContent=p.verse;
  document.querySelector('#part-description').textContent=p.description;
  document.querySelector('#part-quote').textContent=p.quote;
  panel.classList.add('open');
  document.querySelectorAll('.parts-dock button').forEach(btn=>btn.classList.toggle('active',btn.dataset.part===key));
  if(focus){cameraGoal=new THREE.Vector3(...p.camera);targetGoal=new THREE.Vector3(...p.target).add(new THREE.Vector3(0,1.75,0));}
}

document.querySelectorAll('.parts-dock button').forEach(btn=>btn.addEventListener('click',()=>selectPart(btn.dataset.part,true)));
document.querySelector('#close-panel').addEventListener('click',()=>panel.classList.remove('open'));
document.querySelector('#start-explore').addEventListener('click',()=>{
  document.querySelector('#intro-card').classList.add('hidden');
  cameraGoal=new THREE.Vector3(24,9,22);targetGoal=new THREE.Vector3(0,3.0,0);
  setTimeout(()=>selectPart('hull',false),320);
});
document.querySelector('#reset-camera').addEventListener('click',()=>{
  cameraGoal=new THREE.Vector3(27,13,29);targetGoal=new THREE.Vector3(0,2.4,0);
});
controls.addEventListener('start',()=>{cameraGoal=null;targetGoal=null});

function animate(t){
  requestAnimationFrame(animate);
  const time=t*.001;
  for(let i=0;i<seaPos.count;i++){
    const [x,z]=seaBase[i];
    const y=Math.sin(x*.12+time*.72)*.17+Math.sin(z*.16-time*.56)*.12+Math.sin((x+z)*.07+time*.34)*.09;
    seaPos.setY(i,y);
  }
  seaPos.needsUpdate=true;
  if(cameraGoal){camera.position.lerp(cameraGoal,.045);if(camera.position.distanceTo(cameraGoal)<.04)cameraGoal=null;}
  if(targetGoal){controls.target.lerp(targetGoal,.06);if(controls.target.distanceTo(targetGoal)<.03)targetGoal=null;}
  ship.rotation.z=Math.sin(time*.55)*.008;
  ship.rotation.x=Math.sin(time*.38)*.004;
  controls.update();
  renderer.render(scene,camera);
}
animate(0);

addEventListener('resize',()=>{
  camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
});