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

export { Vector2D }
