/**
 * Function to run after the canvas has been resized
 * @type { function }
 */
export const postCanvasResize: Function;
/**
 * Initialises a 2D canvas and returns the canvas object and the 2D canvas context
 * @return {{canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D}}
 */
export function initCanvas(): {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
};
/**
 * Initialises a 3D web GL 2 canvas and returns the canvas object and the 3D canvas context
 * @return {{canvas: HTMLCanvasElement, ctx: WebGL2RenderingContext}}
 */
export function initCanvas3D(): {
    canvas: HTMLCanvasElement;
    ctx: WebGL2RenderingContext;
};
/**
 * Updates the size of a HTML canvas element to fit the containing parent element
 * @param {HTMLCanvasElement} canvas The canvas element to update
 * @return {void}
 */
export function updateCanvasSize(canvas: HTMLCanvasElement): void;
/**
 * Sets the canvas resize behaviour to a user specified function
 * @param {function} callback Function to call when canvas is resized
 * @return {void}
 */
export function setCanvasResizeFunction(callback: Function): void;
/**
 * Sets the canvas post resize function
 * @param {function} callback Function to call after the canvas has been resized
 * @return {void}
 */
export function setCanvasResizeEvent(callback: Function): void;
