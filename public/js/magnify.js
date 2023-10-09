let current = null;

function MagnifyImage(element) {
    if (current == null) {
        current = element;
        element.classList.toggle("magnify");
    } else {
        if (current == element) {
            element.classList.toggle("magnify");
            current = null;
            return;
        }
    }
}
