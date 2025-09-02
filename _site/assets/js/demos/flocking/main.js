import { initCanvas, updateCanvasSize } from "modules/canvas/canvas.js";

var range = 75;
var separateFactor = 0.05;
var alignmentFactor = 0.05;
var cohesionFactor = 0.005;

var maxSpeed = 10;
var minDist = 20;

var flockCount = 100;
var bounds = 30;
var boids = [];

const flockLabel = document.getElementsByName("flock-label")[0];
const rangeLabel = document.getElementsByName("range-label")[0];
const speedLabel = document.getElementsByName("speed-label")[0];
const cohesionLabel = document.getElementsByName("cohesion-label")[0];
const separationLabel = document.getElementsByName("separation-label")[0];
const alignmentLabel = document.getElementsByName("alignment-label")[0];

const flockSlider = document.getElementsByName("flock-slider")[0];
const rangeSlider = document.getElementsByName("range-slider")[0];
const speedSlider = document.getElementsByName("speed-slider")[0];
const cohesionSlider = document.getElementsByName("cohesion-slider")[0];
const separationSlider = document.getElementsByName("separation-slider")[0];
const alignmentSlider = document.getElementsByName("alignment-slider")[0];

class Boid {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.dx = Math.random() * 10 - 5;
    this.dy = Math.random() * 10 - 5;
    this.totalNbours = 0;
  }

  update() {
    this.totalNbours = 0;

    let cohesionX = 0;
    let cohesionY = 0;
    let separateX = 0;
    let separateY = 0;
    let alignDx = 0;
    let alignDy = 0;

    for (let boid of boids) {
      let dist = this.distanceTo(boid);

      if (dist > range) {
        continue;
      }

      // Cohesion and alignment values
      cohesionX += boid.x;
      cohesionY += boid.y;
      alignDx += boid.dx;
      alignDy += boid.dy;

      this.totalNbours++;

      if (dist > minDist) {
        continue;
      }

      if (boid === this) {
        continue;
      }

      // Separation values
      separateX += this.x - boid.x;
      separateY += this.y - boid.y;
    }

    if (this.totalNbours) {
      cohesionX /= this.totalNbours;
      cohesionY /= this.totalNbours;
      alignDx /= this.totalNbours;
      alignDy /= this.totalNbours;

      this.dx += (cohesionX - this.x) * cohesionFactor;
      this.dy += (cohesionY - this.y) * cohesionFactor;
      this.dx += (alignDx - this.dx) * alignmentFactor;
      this.dy += (alignDy - this.dy) * alignmentFactor;
    }

    this.dx += separateX * separateFactor;
    this.dy += separateY * separateFactor;

    this.clampVelocity();
    this.checkBounds();

    this.x += this.dx;
    this.y += this.dy;
  }

  draw() {
    const angle = Math.atan2(this.dy, this.dx);
    ctx.translate(this.x, this.y);
    ctx.rotate(angle);
    ctx.translate(-this.x, -this.y);

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - 15, this.y + 5);
    ctx.lineTo(this.x - 15, this.y - 5);
    ctx.lineTo(this.x, this.y);
    ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  distanceTo(boid) {
    return Math.sqrt((this.x - boid.x) * (this.x - boid.x) + (this.y - boid.y) * (this.y - boid.y));
  }

  clampVelocity() {
    let speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    if (speed > maxSpeed) {
      this.dx = (this.dx / speed) * maxSpeed;
      this.dy = (this.dy / speed) * maxSpeed;
    }
  }

  checkBounds() {
    if (this.x > canvas.width - bounds) {
      this.dx -= 1;
    }

    if (this.x < 0 + bounds) {
      this.dx += 1;
    }

    if (this.y > canvas.height - bounds) {
      this.dy -= 1;
    }

    if (this.y < 0 + bounds) {
      this.dy += 1;
    }
  }
}

function init() {
  for (let i = 0; i < flockCount; ++i) {
    boids.push(new Boid());
  }

  rangeSlider.addEventListener("input", (event) => {
    rangeLabel.textContent = event.target.value;
    range = Number(event.target.value);
  });

  speedSlider.addEventListener("input", (event) => {
    speedLabel.textContent = event.target.value;
    maxSpeed = Number(event.target.value);
  });

  cohesionSlider.addEventListener("input", (event) => {
    cohesionLabel.textContent = parseFloat(event.target.value).toFixed(3);
    cohesionFactor = parseFloat(event.target.value);
  });

  separationSlider.addEventListener("input", (event) => {
    separationLabel.textContent = parseFloat(event.target.value).toFixed(2);
    separateFactor = parseFloat(event.target.value);
  });

  alignmentSlider.addEventListener("input", (event) => {
    alignmentLabel.textContent = parseFloat(event.target.value).toFixed(2);
    alignmentFactor = parseFloat(event.target.value);
  });
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rebeccapurple";

  for (let i = 0; i < flockCount; ++i) {
    boids[i].update();
    boids[i].draw();
  }

  requestAnimationFrame(draw);
}

var { canvas, ctx } = initCanvas();
updateCanvasSize(canvas);

init();
draw();
