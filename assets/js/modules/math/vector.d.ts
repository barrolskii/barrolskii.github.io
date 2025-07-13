export class Vector2D {
    constructor(x: any, y: any);
    x: any;
    y: any;
    add(x: any, y: any): void;
    subtract(x: any, y: any): void;
    multiply(x: any, y: any): void;
    divide(x: any, y: any): void;
    dotProduct(x: any, y: any): number;
    magnitude(): number;
    toString(): string;
    toArray(): any[];
    copy(): Vector2D;
}
export class Vector3D {
    constructor(x: any, y: any, z: any);
    x: any;
    y: any;
    z: any;
    add(x: any, y: any, z: any): void;
    subtract(x: any, y: any): void;
    multiply(x: any, y: any): void;
    divide(x: any, y: any): void;
    crossProduct(x: any, y: any, z: any): Vector3D;
    dotProduct(x: any, y: any, z: any): number;
    magnitude(): number;
    toString(): string;
    toArray(): any[];
    copy(): Vector3D;
}
