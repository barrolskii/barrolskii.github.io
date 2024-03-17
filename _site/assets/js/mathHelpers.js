// maps value x from range a -> b to range c -> d
function mapValue(x, a, b, c, d) {
    return (x-a) * ((d-c)/(b-a)) + c;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export { mapValue, getRandomInt }
