// maps value x from range a -> b to range c -> d
function mapValue(x, a, b, c, d) {
    return (x-a) * ((d-c)/(b-a)) + c;
}

function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

function radToDeg(radians) {
  return radians / (Math.PI / 180);
}

export { mapValue, degToRad, radToDeg }
