import * as THREE from 'three';
import './stilos.css'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const canvas = document.querySelector(".geometryFigure");

const size = {
  height: window.innerHeight,
  width: window.innerWidth
};

//The scene is our stage
const scene = new THREE.Scene();
const loader = new GLTFLoader();

loader.load( 'public/Sources/Imagen/scene.gltf', function ( gltf ) {
  const root = gltf.scene;
  console.log(root);
  root.scale.set(0.4, 0.4, 0.6);
  scene.add( root );

}, undefined, function ( error ) {

	console.error( 'error' );

} );

const light = new THREE.DirectionalLight(0xfffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

const camera = new THREE.PerspectiveCamera(25, size.width/size.height, 0.1, 100);
camera.position.set(0,1,2);
scene.add(camera);

const render = new THREE.WebGL1Renderer({canvas: canvas});

render.setSize(size.width, size.height);
render.setPixelRatio(Math.min(window.devicePixelRatio, 2))
render.gammaOutput = true;
render.render(scene, camera);

const loop = () => {
  render.render (scene, camera);
  window.requestAnimationFrame(loop);
}

loop();
