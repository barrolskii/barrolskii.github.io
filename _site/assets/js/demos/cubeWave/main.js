import { initCanvas3D, updateCanvasSize, setCanvasResizeFunction, canvas, ctx } from "modules/canvas/canvas.js";
import { mapValue, degToRad } from "modules/math/helpers.js"
import * as THREE from "libs/three/three.module.js"

function cornerWave() {
  for (let i = 0; i < totalCubes; ++i) {
    for (let j = 0; j < totalCubes; ++j) {
      cubes[i][j].position.y = cubeYPos + Math.sin(offset + mapValue(i+j, 0, 22, 1, 11));
    }
  }
}

function cornerVertexWave() {
   for (let i = 0; i < totalCubes; ++i) {
    for (let j = 0; j < totalCubes; ++j) {
      cubes[i][j].scale.y = 2 + Math.sin(offset + mapValue(i+j, 0, 22, 1, 11));
    }
  }
}

function centreWave() {
  let centre = Math.floor(totalCubes / 2);
  let centrePos = cubes[centre][centre].position;

  for (let i = 0; i < totalCubes; i++) {
    for (let j = 0; j < totalCubes; j++) {
      let curr = cubes[i][j].position;
      let dist = Math.sqrt((curr.x - centrePos.x) ** 2 + (curr.y - centrePos.y) ** 2 + (curr.z - centrePos.z) ** 2);
      cubes[i][j].position.y = cubeYPos + Math.sin(offset + dist);
    }
  }
}

function centreVertexWave() {
  let centre = Math.floor(totalCubes / 2);
  let centrePos = cubes[centre][centre].position;

  for (let i = 0; i < totalCubes; i++) {
    for (let j = 0; j < totalCubes; j++) {
      let curr = cubes[i][j].position;
      let dist = Math.sqrt((curr.x - centrePos.x) ** 2 + (curr.y - centrePos.y) ** 2 + (curr.z - centrePos.z) ** 2);
      cubes[i][j].scale.y =  mapValue(Math.sin(offset + -dist), -1, 1, 1, 5);
    }
  }
}

function resetCubes() {

  for (let i = 0; i < totalCubes; i++) {
    for (let j = 0; j < totalCubes; j++) {
        cubes[i][j].scale.y = 1;
        cubes[i][j].position.x = i;
        cubes[i][j].position.z = j;
        cubes[i][j].position.y = cubeYPos;
    }
  }
}

function onCanvasResize() {
  // Set the canvas width and height to 0 first so the parent elements can
  // resize correctly if we're moving from a larger resolution to a smaller one
  canvas.width = 0;
  canvas.height = 0;
  canvas.style.width = '0px';
  canvas.style.height = '0px';

  let contentContainer = document.getElementsByClassName("content")[0];
  let mainContainer = document.getElementsByTagName("main")[0];

  if (contentContainer === null) {
      console.error("Could not find content container when updating canvas size");
      return;
  }

  if (mainContainer === null) {
      console.error("Could not find main container when updating canvas size");
      return;
  }

  canvas.width = Math.ceil((contentContainer.offsetWidth / 10)) * 10;
  canvas.height = mainContainer.offsetHeight;


  camera.aspect = canvas.width / canvas.height;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.width, canvas.height, false);

  canvas.style.width = canvas.width + 'px';
  canvas.style.height = canvas.height + 'px';
}

function init() {
  initCanvas3D();
  if (ctx === null) {
    alert("Cannot initialise a WebGL canvas. Please check if your browser supports WebGL");
  }

  // Init renderer and canvas here as we need to set this up after we've sorted out the canvas
  camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({canvas: canvas, context: ctx,});

  renderer.setClearColor("#233143");
  renderer.setSize(canvas.width, canvas.height);
  camera.position.set(-10, 6, 15);
  camera.rotation.set(0, degToRad(-60), 0);
  light.position.set(-10, 5, 3);

  for (let i = 0; i < totalCubes; ++i) {
      cubes[i] = [];

      for (let j = 0; j < totalCubes; ++j) {
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = i;
        cube.position.y = cubeYPos;
        cube.position.z = j;

        scene.add(cube, light);
        cubes[i].push(cube);
      }
  }

  function draw(elapsed) {
    if (needsReset) {
      // Need to check for this flag just due to how JS async works
      resetCubes();
    }

    switch(currentStyle) {
      case "Corner Wave":
        cornerWave();
        break;
      case "Corner Vertex Wave":
        cornerVertexWave();
        break;
      case "Centre Wave":
        centreWave();
        break;
      case "Centre Vertex Wave":
        centreVertexWave();
        break;
      default:
        console.assert("Unrecognised wave style function selected");
    }

    offset += speed;

    renderer.render(scene, camera);
    requestAnimationFrame(draw);
  }

  draw();
}

let offset = 0;
let speed = 0.1;
let totalCubes = 11;
let cubes = [];
let currentStyle = "Centre Vertex Wave";
let needsReset = false;

let camera = undefined;
let renderer = undefined;

const cubeYPos = 0;
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({color: '#745594'});
const light = new THREE.DirectionalLight('white', 6);

const modifierSelector = document.getElementsByName("modifier-select")[0];
const speedLabel = document.getElementsByName("speed-label")[0];
const speedSlider = document.getElementsByName("speed-slider")[0];

init();
setCanvasResizeFunction(onCanvasResize);

modifierSelector.addEventListener("input", (event) => {
  currentStyle = event.target.value;
  needsReset = true;
});

speedSlider.addEventListener("input", (event) => {
  speedLabel.textContent = parseFloat(event.target.value).toFixed(3);
  speed = parseFloat(event.target.value);
});
