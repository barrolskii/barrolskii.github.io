/** @type { function } */
export const postCanvasResize: Function;
/**
 * @returns {{canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D}}
 */
export function initCanvas(): {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
};
/**
 * @returns {{canvas: HTMLCanvasElement, ctx: WebGL2RenderingContext}}
 */
export function initCanvas3D(): {
    canvas: HTMLCanvasElement;
    ctx: WebGL2RenderingContext;
};
/**
 * @returns {void}
 */
export function updateCanvasSize(canvas: any): void;
/**
 * @returns {void}
 */
export function setCanvasResizeFunction(callback: any): void;
/**
 * @returns {void}
 */
export function setCanvasResizeEvent(callback: any): void;
