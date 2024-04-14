class Vector2D {
  constructor(x, y) {
    if (x instanceof Vector2D) {
      this.x = x.x || 0;
      this.y = x.y || 0;
      return;
    }

    if (Array.isArray(x)) {
      this.x = x[0] || 0;
      this.y = x[1] || 0;
      return;
    }

    this.x = x || 0;
    this.y = y || 0;
  }

  add(x, y) {
    if (x instanceof Vector2D) {
      this.x += x.x || 0;
      this.y += x.y || 0;
      return;
    }

    if (Array.isArray(x)) {
      this.x += x[0] || 0;
      this.y += x[1] || 0;
      return;
    }

    this.x += x || 0;
    this.y += y || 0;
  }

  subtract(x, y) {
    if (x instanceof Vector2D) {
      this.x -= x.x || 0;
      this.y -= x.y || 0;
      return;
    }

    if (Array.isArray(x)) {
      this.x -= x[0] || 0;
      this.y -= x[1] || 0;
      return;
    }

    this.x -= x || 0;
    this.y -= y || 0;
  }

  multiply(x, y) {
    if (x instanceof Vector2D) {
      this.x *= x.x || 0;
      this.y *= x.y || 0;
      return;
    }

    if (Array.isArray(x)) {
      this.x *= x[0] || 0;
      this.y *= x[1] || 0;
      return;
    }

    this.x *= x || 0;
    this.y *= y || 0;
  }

  divide(x, y) {
    if (x instanceof Vector2D) {
      if (x.toArray().some(element => element === 0)) {
        console.error("Divide by 0 encountered");
        return;
      }

      this.x /= x.x || 0;
      this.y /= x.y || 0;
      return;
    }

    if (Array.isArray(x)) {
      if (x.some(element => element === 0)) {
        console.error("Divide by 0 encountered");
        return;
      }

      this.x /= x[0] || 0;
      this.y /= x[1] || 0;
      return;
    }

    this.x /= x || 0;
    this.y /= y || 0;
  }

  dotProduct(x, y) {
    if (x instanceof Vector2D) {
      return this.x * (x.x || 0) + this.y * (x.y || 0);
    }

    if (Array.isArray(x)) {
      return this.x * (x[0] || 0) + this.y * (x[1] || 0);
    }

    return this.x * (x || 0) + this.y * (y || 0);
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  toString() {
    return `${this.x} ${this.y}`;
  }

  toArray() {
    return [ this.x, this.y ];
  }

  copy() {
    return new Vector2D(this.x, this.y);
  }
}

class Vector3D {

  constructor(x, y, z) {
    if (x instanceof Vector3D) {
      this.x = x.x || 0;
      this.y = x.y || 0;
      this.z = x.z || 0;
      return;
    }

    if (Array.isArray(x)) {
      this.x = x[0] || 0;
      this.y = x[1] || 0;
      this.z = x[2] || 0;
      return;
    }

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  add(x, y, z) {
    if (x instanceof Vector3D) {
      this.x += x.x || 0;
      this.y += x.y || 0;
      this.z += x.z || 0;
      return;
    }

    if (Array.isArray(x)) {
      this.x += x[0] || 0;
      this.y += x[1] || 0;
      this.z += x[1] || 0;
      return;
    }

    this.x += x || 0;
    this.y += y || 0;
    this.z += z || 0;
  }

  subtract(x, y) {
    if (x instanceof Vector3D) {
      this.x -= x.x || 0;
      this.y -= x.y || 0;
      this.z -= x.z || 0;
      return;
    }

    if (Array.isArray(x)) {
      this.x -= x[0] || 0;
      this.y -= x[1] || 0;
      this.z -= x[1] || 0;
      return;
    }

    this.x -= x || 0;
    this.y -= y || 0;
    this.z -= z || 0;
  }

  multiply(x, y) {
    if (x instanceof Vector3D) {
      this.x *= x.x || 0;
      this.y *= x.y || 0;
      this.z *= x.z || 0;
      return;
    }

    if (Array.isArray(x)) {
      this.x *= x[0] || 0;
      this.y *= x[1] || 0;
      this.z *= x[1] || 0;
      return;
    }

    this.x *= x || 0;
    this.y *= y || 0;
    this.z *= z || 0;
  }

  divide(x, y) {
    if (x instanceof Vector3D) {
      if (x.toArray().some(element => element === 0)) {
        console.error("Divide by 0 encountered");
        return;
      }

      this.x /= x.x || 0;
      this.y /= x.y || 0;
      this.z /= x.z || 0;
      return;
    }

    if (Array.isArray(x)) {
      if (x.some(element => element === 0)) {
        console.error("Divide by 0 encountered");
        return;
      }

      this.x /= x[0] || 0;
      this.y /= x[1] || 0;
      this.z /= x[2] || 0;
      return;
    }

    this.x /= x || 0;
    this.y /= y || 0;
    this.z /= z || 0;
  }

  crossProduct(x, y, z) {
    if (x instanceof Vector3D) {
      return new Vector3D(
        this.y * x.z - this.z * x.y,
        this.z * x.x - this.x * x.z,
        this.x * x.y - this.y * x.x
      );
    }

    if (Array.isArray(x)) {
      return new Vector3D(
        this.y * x[2] - this.z * x[1],
        this.z * x[0] - this.x * x[2],
        this.x * x[1] - this.y * x[0]
      );
    }

    return new Vector3D(
      this.y * z - this.z * y,
      this.z * x - this.x * z,
      this.x * y - this.y * x
    );
  }

  dotProduct(x, y, z) {
    if (x instanceof Vector3D) {
      return this.x * (x.x || 0) + this.y * (x.y || 0) + this.z * (x.z || 0);
    }

    if (Array.isArray(x)) {
      return this.x * (x[0] || 0) + this.y * (x[1] || 0) + this.z * (x[2] || 0);
    }

    return this.x * (x || 0) + this.y * (y || 0) + this.z * (z || 0);
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  toString() {
    return `${this.x} ${this.y} ${this.z}`;
  }

  toArray() {
    return [ this.x, this.y, this.z ];
  }

  copy() {
    return new Vector3D(this.x, this.y, this.z);
  }
}

export { Vector2D, Vector3D }
