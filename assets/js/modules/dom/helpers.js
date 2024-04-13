function disableElement(element) {
    if (element.hasAttribute("disabled")) {
        return;
    }

    element.setAttribute("disabled", "");
}

function enableElement(element) {
    if (!element.hasAttribute("disabled")) {
        return;
    }

    element.removeAttribute("disabled", "");
}

export { enableElement, disableElement }
