export class Vector2D {
    /**
     * Create a new 2D vector
     * @param {(number|Array|Vector2D)} x
     * @param {number} y
     */
    constructor(x: (number | any[] | Vector2D), y: number);
    x: any;
    y: any;
    /**
     * @param {(number|Array|Vector2D)} x
     * @param {number} y
     */
    add(x: (number | any[] | Vector2D), y: number): void;
    /**
     * @param {(number|Array|Vector2D)} x
     * @param {number} y
     */
    subtract(x: (number | any[] | Vector2D), y: number): void;
    /**
     * @param {(number|Array|Vector2D)} x
     * @param {number} y
     */
    multiply(x: (number | any[] | Vector2D), y: number): void;
    /**
     * @param {(number|Array|Vector2D)} x
     * @param {number} y
     */
    divide(x: (number | any[] | Vector2D), y: number): void;
    /**
     * @param {(number|Array|Vector2D)} x
     * @param {number} y
     */
    dotProduct(x: (number | any[] | Vector2D), y: number): number;
    /**
     * @return {number}
     */
    magnitude(): number;
    /**
     * @return {string}
     */
    toString(): string;
    /**
     * @return {Array}
     */
    toArray(): any[];
    /**
     * @return {Vector2D}
     */
    copy(): Vector2D;
}
export class Vector3D {
    /**
     * @param {(number|Array|Vector3D)} x
     * @param {number} y
     * @param {number} z
     */
    constructor(x: (number | any[] | Vector3D), y: number, z: number);
    x: any;
    y: any;
    z: any;
    /**
     * @param {(number|Array|Vector3D)} x
     * @param {number} y
     * @param {number} z
     */
    add(x: (number | any[] | Vector3D), y: number, z: number): void;
    /**
     * @param {(number|Array|Vector3D)} x
     * @param {number} y
     * @param {number} z
     */
    subtract(x: (number | any[] | Vector3D), y: number, z: number): void;
    /**
     * @param {(number|Array|Vector3D)} x
     * @param {number} y
     * @param {number} z
     */
    multiply(x: (number | any[] | Vector3D), y: number, z: number): void;
    /**
     * @param {(number|Array|Vector3D)} x
     * @param {number} y
     * @param {number} z
     */
    divide(x: (number | any[] | Vector3D), y: number, z: number): void;
    /**
     * @param {(number|Array|Vector3D)} x
     * @param {number} y
     * @param {number} z
     * @return {Vector3D}
     */
    crossProduct(x: (number | any[] | Vector3D), y: number, z: number): Vector3D;
    /**
     * @param {(number|Array|Vector3D)} x
     * @param {number} y
     * @param {number} z
     * @return {number}
     */
    dotProduct(x: (number | any[] | Vector3D), y: number, z: number): number;
    /**
     * @return {number}
     */
    magnitude(): number;
    /**
     * @return {string}
     */
    toString(): string;
    /**
     * @return {Array}
     */
    toArray(): any[];
    /**
     * @return {Vector3D}
     */
    copy(): Vector3D;
}
