/** @type { function } */
export var postCanvasResize = new Function();

/**
 * @returns {{canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D}}
 */
function initCanvas() {
    /* NOTE: Using getElementsByTagName over ID because we lose type information with the LSP if we use getElementById */
    let canvas = document.getElementsByTagName('canvas')[0];

    if (canvas === null) {
        console.error("Unable to find canvas element");
        return;
    }

    let ctx = canvas.getContext("2d");

    // Set canvas to fit current screen
    updateCanvasSize(canvas);

    window.addEventListener("resize", (event) => {
        updateCanvasSize(canvas);
        postCanvasResize(canvas);
    });

    return { canvas, ctx };
}

/**
 * @returns {{canvas: HTMLCanvasElement, ctx: WebGL2RenderingContext}}
 */
function initCanvas3D() {
    /* NOTE: Same reason here as the 2D canvas */
    let canvas = document.getElementsByTagName('canvas')[0];
    if (canvas === null) {
        console.error("Unable to find canvas element");
        return;
    }

    let ctx = canvas.getContext("webgl2");

    // Set canvas to fit current screen
    updateCanvasSize(canvas);

    window.addEventListener("resize", (event) => {
        updateCanvasSize(canvas);
        postCanvasResize(canvas);
    });

    return { canvas, ctx };
}

/**
 * @returns {void}
 */
function updateCanvasSize(canvas) {
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
/**
 * @returns {void}
 */
function setCanvasResizeFunction(callback) {
      if (typeof callback !== 'function') {
        console.error("Expected function as argument");
        return;
    }

    updateCanvasSize = callback;
}

/**
 * @returns {void}
 */
function setCanvasResizeEvent(callback) {
     if (typeof callback !== 'function') {
        console.error("Expected function as argument");
        return;
    }

    postCanvasResize = callback;
}

export { initCanvas, initCanvas3D, updateCanvasSize, setCanvasResizeFunction, setCanvasResizeEvent }
