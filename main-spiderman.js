import * as THREE from "https://cdn.skypack.dev/three@0.129/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.y = 5;
camera.position.z = 5;

let spiderman;
const loader = new GLTFLoader();
loader.load(
  "/symbiote_spiderman_-_tobey_maguire.glb",
  function (gltf) {
    spiderman = gltf.scene;
    spiderman.position.y = -3;
    spiderman.position.z = 0;
    scene.add(spiderman);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (err) {
    console.error("An error happened:", err);
  }
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container-3d").appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);
const topLight = new THREE.DirectionalLight(0xffffff, 2);
topLight.position.set(20, 20, 20);
scene.add(topLight);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = true;
controls.minDistance = 1;
controls.maxDistance = 20;
controls.maxPolarAngle = Math.PI / 2;

// Render loop
const reRender3D = () => {
  requestAnimationFrame(reRender3D);
  controls.update(); // Update controls
  renderer.render(scene, camera);
};

reRender3D();
