export var canvas = undefined;
export var ctx = undefined;

function initCanvas() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
}

function updateCanvasSize() {
    // Set the canvas width and height to 0 first so the parent elements can
    // resize correctly if we're moving from a larger resolution to a smaller one
    canvas.width = 0;
    canvas.height = 0;

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
}

function setCanvasResizeFunction(callback) {
      if (typeof callback !== 'function') {
        console.error("Expected function as argument");
        return;
    }

    updateCanvasSize = callback;
}

function setCanvasResizeEvent(callback) {
     if (typeof callback !== 'function') {
        console.error("Expected function as argument");
        return;
    }

    window.addEventListener("resize", (event) => {
        updateCanvasSize();
        callback();
    });
}

export { initCanvas, updateCanvasSize, setCanvasResizeFunction, setCanvasResizeEvent }
