import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(-10, 20, -60);

const renderer = new THREE.WebGPURenderer({antialias: true});
await renderer.init();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Lighting
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(-15, 50, 15);
// scene.add(directionalLight);
// const directionallighthelper = new THREE.DirectionalLightHelper(directionalLight, 1);
// scene.add(directionallighthelper);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const loader = new GLTFLoader();
loader.load('legendium_island1.glb', function(gltf) {
    scene.add(gltf.scene);
});

// Simple cube using material that supports shadows
const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const boxMat = new THREE.MeshStandardMaterial( { color: 0x00ff00, metalness: 0.5, roughness: 0.5 } );
const cube = new THREE.Mesh(boxGeo, boxMat);
scene.add(cube);

// Loop
function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();
