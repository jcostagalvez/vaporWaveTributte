import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import './stilos.css'
import gsap from 'gsap';
import { pickerColor } from './colorPicker';

const size = {
  height: window.innerHeight,
  width: window.innerWidth
};
//The scene is our stage
const scene = new THREE.Scene();

/* 
este metodo permite cambiar el color del fondo para que no este en negro
scene.background = new THREE.Color( "rgb(220, 219, 238)" );
*/
//Gemotry is the shape
const geometry = new THREE.SphereGeometry(3, 64, 64)
//Radious: how size is
//widthSegent size diameter from the radio to the top
//heightSegment size segment from the radio to the bottom

//Material is the color and reflectness
const material = new THREE.MeshStandardMaterial({
  color: '#00ff83',
});

//combination of the geometry and material is called mesh
const mesh = new THREE.Mesh(geometry, material);

//Añadimso a la escena para que sea visible
scene.add(mesh);
//Es necesario añadir ligth
const ligth = new THREE.PointLight(0xffffff, 1, 100);
ligth.position.set(9, 9, 9);
scene.add(ligth);

//Camera es necesario para dar la angulacion y el panorama
const camera = new THREE.PerspectiveCamera(45, size.width/size.height);
camera.position.z = 14;
scene.add(camera);

//render
const canvas = document.querySelector(".geometryFigure");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);

//Vamos añadir controles apra que al pasar el raton por al esfera se gire y haga alguans movdas guapas.
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = false;
controls.enablePan = false;
controls.enableZoom = false;
controls.enableRotate = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;
controls.rotateSpeed = 0;

//Aqui vamos a hacerlo responsive la figura
window.addEventListener("resize", () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;

  camera.aspect = size.width/size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height); 

})

const loop = () => {
  renderer.render (scene, camera);
  controls.update();
  window.requestAnimationFrame(loop);
}

loop();

// añadir time Line

const tl = gsap.timeline({defaults: {duration: 1}});
tl.fromTo(mesh.scale, {z:0 , x:0 , y:0 } , {z:1 , x:1 , y:1 });
tl.fromTo("nav", {y: -100}, {y: 0});
tl.fromTo("title", {opacity: 0}, {opacity: 1});

//change color on the mouse movement
//Hemos dejado de mover el ratón
//Posicionamiento en eje x e y lo multiplicamos por 255 para genera un parametro de colorozacion
// Eventos para la animacion
// window.addEventListener("mousedown", () => mouseDown = true);
// window.addEventListener("mouseup", () => mouseDown = false);

const pickColorCanvas = document.getElementById("color-picker");
const width = pickColorCanvas.offsetWidth
const height = pickColorCanvas.offsetHeight
console.log(height);
const picker = new pickerColor(pickColorCanvas, width, height);

picker.draw();

window.addEventListener("resize", () => {
  const width = pickColorCanvas.offsetWidth;
  const height = pickColorCanvas.offsetHeight;
  const picker = new pickerColor(pickColorCanvas, width, height);
  picker.draw();
})

const picker_selectedBar = document.getElementById("selected_bar");
// Le pasamos un evento onclick para realizar el drag an drop
function handleMouseDown (e) {
  let pickerPosition = e.pageX
  

  const minPickerPosition = (2*pickColorCanvas.offsetWidth)/100;
  const resta = pickColorCanvas.offsetWidth + minPickerPosition;
  console.log('resta ' +  resta);
  console.log('pickerPosition ' + pickerPosition);


  if(pickerPosition > pickColorCanvas.offsetLeft + minPickerPosition &&
    resta > pickerPosition){
    picker_selectedBar.style.left = Number(pickerPosition) + 'px';
    const x = e.pageX - pickColorCanvas.offsetLeft;
    const y = e.pageY - pickColorCanvas.offsetTop;
    const color = picker.getColor(x,y);
  
    // Creamos los colores con la variable THREE.color
      let newColor = new THREE.Color(`rgb(${color.join(",")})`);
      gsap.to(mesh.material.color, {
        s: newColor.s,
        r: newColor.r,
        g: newColor.g,
        b: newColor.b
      })
  }else{
    pickColorCanvas.removeEventListener('mousemove', handleMouseDown);
  }

}

let mouseDown = false;

picker_selectedBar.addEventListener ('mousedown',(e) => {
  mouseDown = true;
  if(mouseDown){
    pickColorCanvas.addEventListener('mousemove', handleMouseDown);
  }
  picker_selectedBar.addEventListener ('mouseup',(e) => mouseDown = false);
});

picker_selectedBar.addEventListener ('mouseup',(e) => {
  console.log('esto funciona');
  pickColorCanvas.removeEventListener('mousemove', handleMouseDown);
});