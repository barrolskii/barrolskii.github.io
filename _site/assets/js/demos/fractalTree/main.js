import { initCanvas, updateCanvasSize, setCanvasResizeEvent } from "modules/canvas/canvas.js";
import { mapValue, degToRad } from "modules/math/helpers.js";

var length = 150;
var leftAngle  = 15; // Degrees
var rightAngle = 15;
var branchWidth = 5;
var totalIterations = 10;
var fractalMode = "Fractal canopy";
var colorMode = "Default";

const colorSelector  = document.getElementsByName('color-selector')[0];

const iterationSlider  = document.getElementsByName('iteration-slider')[0];
const lengthSlider     = document.getElementsByName('length-slider')[0];
const leftAngleSlider  = document.getElementsByName('left-angle-slider')[0];
const rightAngleSlider = document.getElementsByName('right-angle-slider')[0];
const widthSlider      = document.getElementsByName('width-slider')[0];

const iterationLabel  = document.getElementsByName('iteration-label')[0];
const lengthLabel     = document.getElementsByName('length-label')[0];
const leftAngleLabel  = document.getElementsByName('left-angle-label')[0];
const rightAngleLabel = document.getElementsByName('right-angle-label')[0];
const widthLabel      = document.getElementsByName('width-label')[0];

var { canvas, ctx } = initCanvas();

function setColour(iteration) {
  switch (colorMode) {
    case "Default": {
      ctx.strokeStyle = "hsl(" + (iteration * 10) + ", 100%, 50%)";
      break;
    }
    case "Rainbow": {
      let start = mapValue(iteration-1, 1, totalIterations, 0, 359);
      let end = mapValue(iteration, 1, totalIterations, 0, 359);
      let gradient = ctx.createLinearGradient(0, 0, branchWidth, -length);
      gradient.addColorStop(0, "hsl(" + start + ", 100%, 50%)");
      gradient.addColorStop(1, "hsl(" + end + ", 100%, 50%)");
      ctx.strokeStyle = gradient;
      break;
    }
    case "White": {
      ctx.strokeStyle = "white";
      break;
    }
    default:
      console.error("Unrecognised colour mode");
  }
}

function drawBranch(length, iteration, maxIterations) {
  if (iteration >= maxIterations) {
    return;
  }

  setColour(iteration);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.translate(0, -length);

  ctx.save();
    ctx.rotate(degToRad(rightAngle));
    drawBranch(length * 0.75, iteration + 1, maxIterations);
  ctx.restore();
  ctx.save();
    ctx.rotate(-degToRad(leftAngle));
    drawBranch(length * 0.75, iteration + 1, maxIterations);
  ctx.restore();
}

function init() {
  setCanvasResizeEvent(draw);

  colorSelector.addEventListener("input", (event) => {
    colorMode = event.target.value;
    draw();
  });

  iterationSlider.addEventListener("input", (event) => {
    iterationLabel.textContent = event.target.value;
    totalIterations = Number(event.target.value);
    draw();
  });

  lengthSlider.addEventListener("input", (event) => {
    lengthLabel.textContent = event.target.value;
    length = Number(event.target.value);
    draw();
  });

  leftAngleSlider.addEventListener("input", (event) => {
    leftAngleLabel.textContent = event.target.value;
    leftAngle = Number(event.target.value);
    draw();
  });

  rightAngleSlider.addEventListener("input", (event) => {
    rightAngleLabel.textContent = event.target.value;
    rightAngle = Number(event.target.value);
    draw();
  });

  widthSlider.addEventListener("input", (event) => {
    widthLabel.textContent = event.target.value;
    branchWidth = Number(event.target.value);
    ctx.lineWidth = branchWidth;
    draw();
  });
}

function draw() {
  // Background
  ctx.fillStyle = "rgba(0,0,0,1.0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.lineWidth = branchWidth;
  ctx.save();

  // Set initial position to be the bottom-middle of the canvas
  ctx.translate(canvas.width/2, canvas.height);
  drawBranch(length, 1, totalIterations);
  ctx.restore();
}

init();
draw();
