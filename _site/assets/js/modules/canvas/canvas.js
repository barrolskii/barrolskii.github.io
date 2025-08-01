/**
 * Function to run after the canvas has been resized
 * @type { function }
 */
export var postCanvasResize = new Function();

/**
 * Initialises a 2D canvas and returns the canvas object and the 2D canvas context
 * @return {{canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D}}
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
 * Initialises a 3D web GL 2 canvas and returns the canvas object and the 3D canvas context
 * @return {{canvas: HTMLCanvasElement, ctx: WebGL2RenderingContext}}
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
 * Updates the size of a HTML canvas element to fit the containing parent element
 * @param {HTMLCanvasElement} canvas The canvas element to update
 * @return {void}
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
 * Sets the canvas resize behaviour to a user specified function
 * @param {function} callback Function to call when canvas is resized
 * @return {void}
 */
function setCanvasResizeFunction(callback) {
      if (typeof callback !== 'function') {
        console.error("Expected function as argument");
        return;
    }

    updateCanvasSize = callback;
}

/**
 * Sets the canvas post resize function
 * @param {function} callback Function to call after the canvas has been resized
 * @return {void}
 */
function setCanvasResizeEvent(callback) {
     if (typeof callback !== 'function') {
        console.error("Expected function as argument");
        return;
    }

    postCanvasResize = callback;
}

export { initCanvas, initCanvas3D, updateCanvasSize, setCanvasResizeFunction, setCanvasResizeEvent }
