import { initCanvas, updateCanvasSize, setCanvasResizeFunction, canvas, ctx } from "/assets/js/modules/canvas/canvas.js";
import { Vector2D } from "/assets/js/modules/math/vector.js"

class Particle {
  static hue = 0;

  constructor() {
    this.regenerate();
  }

  regenerate() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.vel = new Vector2D(Math.random() * 5 - 2.5, Math.random() * 3 - 1.5);
    this.size = Math.random() * 11;
    this.color = Particle.hue;
    this.isDead = false;
  }

  update() {
    if (this.isDead) {
      this.regenerate();
      return;
    }

    this.x += this.vel.x;
    this.y += this.vel.y;

    if (this.size > 0.2) {
      this.size -= particleLifetime;
    } else {
      this.isDead = true;
    }
  }

  draw() {
    ctx.fillStyle = "hsl(" + this.color + ", 100%, 50%)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function updateMousePos(event) {
  const rect = canvas.getBoundingClientRect();
  mouse.x = event.x - rect.left;
  mouse.y = event.y - rect.top;
}

function init() {
  for (let i = 0; i < totalParticles; i++) {
    particles.push(new Particle());
  }
}

function drawParticleConnections(i) {
    for (let j = i; j < totalParticles; j++) {
        if (j == i) {
          continue;
        }

        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < linkRange) {
          ctx.beginPath();
          ctx.strokeStyle = "hsl(" + particles[i].color + ", 100%, 50%)";
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.closePath();
        }
    }
}

function draw() {
  if (style === 'Fade') {
    ctx.fillStyle = "rgba(0,0,0," + fadeAmount + ")";
  } else {
    ctx.fillStyle = "rgba(0,0,0,1.0)";
  }

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < totalParticles; i++) {
      particles[i].update();
      particles[i].draw();

    if (style === 'Link') {
      drawParticleConnections(i);
    }
  }

  Particle.hue++;
  if (Particle.hue > 360) {
      Particle.hue = 0;
  }

  requestAnimationFrame(draw);
}

function resizeParticles(value) {
  if (value < totalParticles) {
    totalParticles = value;
    return;
  }

  if (value > particles.length) {
    let diff = value - particles.length;
    for (let i = 0; i < diff; i++) {
      particles.push(new Particle());
    }
  }

  totalParticles = value;
}

function toggleControls(name) {
  const element = document.getElementsByName(name)[0];

  if (element === undefined) {
    return;
  }

  if (element.style.display === 'none' || element.style.display === '') {
    element.style.display = 'block';
    return;
  }

  element.style.display = 'none';
}

const mouse = {
  x: undefined,
  y: undefined
}

var particles = [];
var totalParticles = 100;
var style = "None";
var particleLifetime = 0.09;
var fadeAmount = 0.1;
var linkRange = 50;

const modifierSelector = document.getElementsByName("modifier-select")[0];
const particleCountLabel = document.getElementsByName("count-label")[0];
const particleCountSlider = document.getElementsByName("particle-slider")[0];
const lifetimeLabel = document.getElementsByName("lifetime-label")[0];
const lifetimeSlider = document.getElementsByName("lifetime-slider")[0];

const linkLabel = document.getElementsByName("link-label")[0];
const linkSlider = document.getElementsByName("link-slider")[0];
const fadeLabel = document.getElementsByName("fade-label")[0];
const fadeSlider = document.getElementsByName("fade-slider")[0];

initCanvas();
updateCanvasSize();

canvas.addEventListener("click", (event) => {
  updateMousePos(event);
});

canvas.addEventListener("mousemove", (event) => {
  updateMousePos(event);
});

modifierSelector.addEventListener("input", (event) => {
  /* Hide previous controls */
  toggleControls(style.toLowerCase() + "-controls");
  style = event.target.value;
  toggleControls(style.toLowerCase() + "-controls");
});

particleCountSlider.addEventListener("input", (event) => {
  particleCountLabel.textContent = event.target.value;
  resizeParticles(Number(event.target.value));
});

lifetimeSlider.addEventListener("input", (event) => {
  lifetimeLabel.textContent = parseFloat(event.target.value).toFixed(3);
  particleLifetime = parseFloat(event.target.value);
});

linkSlider.addEventListener("input", (event) => {
  linkLabel.textContent = event.target.value;
  linkRange = Number(event.target.value);
});

fadeSlider.addEventListener("input", (event) => {
  fadeLabel.textContent = event.target.value;
  fadeAmount = event.target.value;
});

init();
draw();
