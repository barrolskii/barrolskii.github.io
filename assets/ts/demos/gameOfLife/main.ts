import { initCanvas, setCanvasResizeEvent, canvas, ctx } from "modules/canvas/canvas.js"
import { Vector2D } from "modules/math/vector.js";
import { enableElement, disableElement } from "modules/dom/helpers.js"

var interval = 500;
var playInterval: number;
var grid: boolean[][] = [];
var width: number;
var height: number;
var gridSize = 20;
var mouseDown = false;

const mouse = new Vector2D(undefined, undefined);
const lastTile = new Vector2D(undefined, undefined);

const nextButton = document.getElementsByName("nextButton")[0];
const playButton = document.getElementsByName("playButton")[0];
const pauseButton = document.getElementsByName("pauseButton")[0];
const regenButton = document.getElementsByName("regenButton")[0];
const resetButton = document.getElementsByName("resetButton")[0];

const timeStepLabel = document.getElementsByName("time-step-label")[0];
const timeStepSlider = document.getElementsByName("time-step-slider")[0];


function initGrid() {
    let alive: number;

    for (let i = 0; i < gridSize; i++) {
        grid[i] = [];

        for (let j = 0; j < gridSize; j++) {
            alive = Math.floor(Math.random() * 2);
            grid[i].push(alive ? true : false);
        }
    }
}

function postCanvasResize() {
    width = Math.floor(canvas.width / gridSize);
    height = Math.floor(canvas.height / gridSize);
    draw();
}

function init() {
    initCanvas();
    setCanvasResizeEvent(postCanvasResize);

    width = Math.floor(canvas.width / gridSize);
    height = Math.floor(canvas.height / gridSize);

    initGrid();
}

function getNeighbours(y: number, x: number): number {
    let totalNbours = 0;

    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if ((dx + x) == x && (dy + y) == y) {
                continue;
            }

            try {
                if (grid[y + dy][x + dx]) {
                    totalNbours++;
                }
            } catch (e: any) {}
        }
    }

    return totalNbours;
}

function update() {
    let next = [];

    for (let y = 0; y < gridSize; y++) {
        next[y] = [];
        for (let x = 0; x < gridSize; x++) {
            let value = false;
            let nbours = getNeighbours(y, x);

            if (grid[y][x]) {
                switch(nbours) {
                    case 2:
                    case 3:
                        value = true;
                        break;
                    case 0:
                    case 1:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        value = false;
                        break;
                }
            } else {
                if (nbours == 3) {
                    value = true;
                }
            }

            next[y].push(value);
        }
    }

    grid = next;
}

function posToGridPos(xPos: number, yPos: number) {
    const x = Math.floor((Math.round(xPos / 10) * 10) / width);
    const y = Math.floor((Math.round(yPos / 10) * 10) / height);

    return new Vector2D(x, y);
}

function updateLastTile(x: number, y: number) {
    console.assert(x >= 0 || x < gridSize, "X was out of bounds when updating last tile. Got: %d", x);
    console.assert(y >= 0 || y < gridSize, "Y was out of bounds when updating last tile. Got: %d", y);

    lastTile.x = x;
    lastTile.y = y;
}

function toggleGridSquare(x: number, y: number) {
    if (x === undefined || y == undefined)
        return;

    if (x >= gridSize || y >= gridSize)
        return;

    grid[y][x] = !grid[y][x];
}

function draw() {
    ctx.strokeStyle = "rgba(0.0, 0.0, 0.0, 1.0)";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            ctx.fillStyle = (grid[y][x] ? "green" : "rgba(0.0, 0.0, 0.0, 0.0)");
            ctx.fillRect(x * width, y * height, width, height);
        }
    }
}

init();
draw();

nextButton.addEventListener("click", () => {
    update();
    draw();
});

playButton.addEventListener("click", () => {
    disableElement(playButton);
    disableElement(nextButton);
    disableElement(regenButton);
    disableElement(timeStepSlider);
    disableElement(resetButton);
    enableElement(pauseButton);

    playInterval = setInterval(() => {
        update();
        draw();
    }, interval);
});

pauseButton.addEventListener("click", () => {
    clearInterval(playInterval);
    playInterval = null;

    enableElement(playButton);
    enableElement(nextButton);
    enableElement(regenButton);
    enableElement(timeStepSlider);
    enableElement(resetButton);
    disableElement(pauseButton);
});

regenButton.addEventListener("click", () => {
    initGrid();
    draw();
});

resetButton.addEventListener("click", () => {
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            grid[y][x] = false;
        }
    }
    draw();
});

timeStepSlider.addEventListener("input", (event: Event) => {
    interval = parseInt((event.target as HTMLInputElement).value);
    timeStepLabel.textContent = (event.target as HTMLInputElement).value;
});

canvas.addEventListener("mousedown", () => {
    mouseDown = true;
    const currTile = posToGridPos(mouse.x, mouse.y);
    toggleGridSquare(currTile.x, currTile.y);
    updateLastTile(currTile.x, currTile.y);
    draw();
});

canvas.addEventListener("mouseup", () => {
    mouseDown = false;
});

canvas.addEventListener("mousemove", (event: Event) => {
    const rect = canvas.getBoundingClientRect();
    let mouseEvent = (event as MouseEvent);

    mouse.x = Math.floor(mouseEvent.x - rect.left);
    mouse.y = Math.floor(mouseEvent.y - rect.top);

    if (!mouseDown) {
        return;
    }

    let currentTile = posToGridPos(mouse.x, mouse.y);
    if (currentTile.x != lastTile.x || currentTile.y != lastTile.y) {
        toggleGridSquare(currentTile.x, currentTile.y);
        updateLastTile(currentTile.x, currentTile.y);
        draw();
    }
});
