import { initCanvas, setCanvasResizeEvent, canvas, ctx } from "/assets/js/modules/canvas/canvas.js";
import { Vector2D } from "/assets/js/modules/math/vector.js";
import { enableElement, disableElement } from "/assets/js/modules/dom/helpers.js";
var interval = 500;
var playInterval;
var grid = [];
var width;
var height;
var gridSize = 20;
var mouseDown = false;
var mouse = new Vector2D(undefined, undefined);
var lastTile = new Vector2D(undefined, undefined);
var nextButton = document.getElementsByName("nextButton")[0];
var playButton = document.getElementsByName("playButton")[0];
var pauseButton = document.getElementsByName("pauseButton")[0];
var regenButton = document.getElementsByName("regenButton")[0];
var resetButton = document.getElementsByName("resetButton")[0];
var timeStepLabel = document.getElementsByName("time-step-label")[0];
var timeStepSlider = document.getElementsByName("time-step-slider")[0];
function initGrid() {
    var alive;
    for (var i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (var j = 0; j < gridSize; j++) {
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
    //setCanvasResizeFunction(() => {
    //    width = Math.floor(canvas.width / gridSize);
    //    height = Math.floor(canvas.height / gridSize);
    //    draw();
    //});
    width = Math.floor(canvas.width / gridSize);
    height = Math.floor(canvas.height / gridSize);
    initGrid();
}
function getNeighbours(y, x) {
    var totalNbours = 0;
    for (var dy = -1; dy <= 1; dy++) {
        for (var dx = -1; dx <= 1; dx++) {
            if ((dx + x) == x && (dy + y) == y) {
                continue;
            }
            try {
                if (grid[y + dy][x + dx]) {
                    totalNbours++;
                }
            }
            catch (e) { }
        }
    }
    return totalNbours;
}
function update() {
    var next = [];
    for (var y = 0; y < gridSize; y++) {
        next[y] = [];
        for (var x = 0; x < gridSize; x++) {
            var value = false;
            var nbours = getNeighbours(y, x);
            if (grid[y][x]) {
                switch (nbours) {
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
            }
            else {
                if (nbours == 3) {
                    value = true;
                }
            }
            next[y].push(value);
        }
    }
    grid = next;
}
function posToGridPos(xPos, yPos) {
    var x = Math.floor((Math.round(xPos / 10) * 10) / width);
    var y = Math.floor((Math.round(yPos / 10) * 10) / height);
    return new Vector2D(x, y);
}
function updateLastTile(x, y) {
    console.assert(x >= 0 || x < gridSize, "X was out of bounds when updating last tile. Got: %d", x);
    console.assert(y >= 0 || y < gridSize, "Y was out of bounds when updating last tile. Got: %d", y);
    lastTile.x = x;
    lastTile.y = y;
}
function toggleGridSquare(x, y) {
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
    for (var y = 0; y < gridSize; y++) {
        for (var x = 0; x < gridSize; x++) {
            ctx.fillStyle = (grid[y][x] ? "green" : "rgba(0.0, 0.0, 0.0, 0.0)");
            ctx.fillRect(x * width, y * height, width, height);
        }
    }
}
init();
draw();
nextButton.addEventListener("click", function () {
    update();
    draw();
});
playButton.addEventListener("click", function () {
    disableElement(playButton);
    disableElement(nextButton);
    disableElement(regenButton);
    disableElement(timeStepSlider);
    disableElement(resetButton);
    enableElement(pauseButton);
    playInterval = setInterval(function () {
        update();
        draw();
    }, interval);
});
pauseButton.addEventListener("click", function () {
    clearInterval(playInterval);
    playInterval = null;
    enableElement(playButton);
    enableElement(nextButton);
    enableElement(regenButton);
    enableElement(timeStepSlider);
    enableElement(resetButton);
    disableElement(pauseButton);
});
regenButton.addEventListener("click", function () {
    initGrid();
    draw();
});
resetButton.addEventListener("click", function () {
    for (var y = 0; y < gridSize; y++) {
        for (var x = 0; x < gridSize; x++) {
            grid[y][x] = false;
        }
    }
    draw();
});
timeStepSlider.addEventListener("input", function (event) {
    interval = parseInt(event.target.value);
    timeStepLabel.textContent = event.target.value;
});
canvas.addEventListener("mousedown", function () {
    mouseDown = true;
    var currTile = posToGridPos(mouse.x, mouse.y);
    toggleGridSquare(currTile.x, currTile.y);
    updateLastTile(currTile.x, currTile.y);
    draw();
});
canvas.addEventListener("mouseup", function () {
    mouseDown = false;
});
canvas.addEventListener("mousemove", function (event) {
    var rect = canvas.getBoundingClientRect();
    var mouseEvent = event;
    mouse.x = Math.floor(mouseEvent.x - rect.left);
    mouse.y = Math.floor(mouseEvent.y - rect.top);
    if (!mouseDown) {
        return;
    }
    var currentTile = posToGridPos(mouse.x, mouse.y);
    if (currentTile.x != lastTile.x || currentTile.y != lastTile.y) {
        toggleGridSquare(currentTile.x, currentTile.y);
        updateLastTile(currentTile.x, currentTile.y);
        draw();
    }
});
