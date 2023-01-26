import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import './stilos.css'
import gsap from 'gsap';
import { pickerColor } from './colorPicker';
import gsapCore from 'gsap/gsap-core';
import { ObjectLoader } from 'three';
const size = {
  height: window.innerHeight,
  width: window.innerWidth
};

//The scene is our stage
const scene = new THREE.Scene();
const loader = new GLTFLoader();
loader.load( './public/Sources/Imagen/scene.gltf', function ( gltf ) {
	scene.add( gltf.scene );
  const canvas = document.querySelector(".geometryFigure");
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(size.width, size.height);
  renderer.render(scene, camera);
  const camera = new THREE.PerspectiveCamera(45, size.width/size.height);
  camera.position.z = 14;
  scene.add(camera);
  
}, undefined, function ( error ) {

	console.error( 'error' );

} );