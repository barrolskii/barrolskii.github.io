/**
 * Maps value x from range a -> b to range c -> d
 * @param {number} x
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @param {number} d
 * @return {number}
 */
function mapValue(x, a, b, c, d) {
    return (x-a) * ((d-c)/(b-a)) + c;
}

/**
 * Converts degrees to radians
 * @param {number} degrees
 * @return {number}
 */
function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Converts radians to degrees
 * @param {number} radians
 * @return {number}
 */
function radToDeg(radians) {
  return radians / (Math.PI / 180);
}

export { mapValue, degToRad, radToDeg }
