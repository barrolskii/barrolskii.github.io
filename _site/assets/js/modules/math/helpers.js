// maps value x from range a -> b to range c -> d
function mapValue(x, a, b, c, d) {
    return (x-a) * ((d-c)/(b-a)) + c;
}

export { mapValue }
