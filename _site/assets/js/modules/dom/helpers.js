/**
 * Disables a specific HTML element by adding a 'disabled' attribute to it
 * @param {HTMLElement} element
 * @return {void}
 */
function disableElement(element) {
    if (element.hasAttribute("disabled")) {
        return;
    }

    element.setAttribute("disabled", "");
}

/**
 * Enables a specific HTML element by removing the 'disabled' attribute
 * @param {HTMLElement} element
 * @return {void}
 */
function enableElement(element) {
    if (!element.hasAttribute("disabled")) {
        return;
    }

    element.removeAttribute("disabled", "");
}

export { enableElement, disableElement }
