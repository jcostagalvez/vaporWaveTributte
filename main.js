import * as THREE from 'three';
import './stilos.css'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const size = {
  height: window.innerHeight,
  width: window.innerWidth
};

const canvas = document.querySelector('.miguelangel')

//The scene is our stage
const scene = new THREE.Scene();

// Vamos a cargar la imagen de forma asyncronica y añadirla a nuestro escenario
const loader = new GLTFLoader();
loader.load( './public/Sources/Imagen/scene.gltf', function ( gltf ) {
	scene.add( gltf.scene );
}, undefined, function ( error ) {

	console.error( 'error' );

} );

// Ahora creamos las luces
const light = new THREE.DirectionalLight('#F538F2', 2);
light.position.set(2, 2, 5);
scene.add(light);

const light2 = new THREE.DirectionalLight('#00ff00', 4);
light.position.set(3, 3, 8);
scene.add(light2);
// creamos la camara y la perspectiva

const camera = new THREE.PerspectiveCamera(75, size.width/size.height, 0.1, 100);
camera.position.set(0, 1, 2);
scene.add(camera);

const rendered = new THREE.WebGL1Renderer({ canvas: canvas});

rendered.setSize(size.width, size.height);
rendered.setPixelRatio(Math.min(window.devicePixelRatio, 2));
rendered.shadowMap = true;
rendered.gammaOutput = true;

const loop = () => {
  rendered.render (scene, camera);
  window.requestAnimationFrame(loop);
}

loop();