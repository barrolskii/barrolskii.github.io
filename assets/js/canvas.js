function updateCanvasSize() {
    var contentContainer = document.getElementsByClassName("content")[0];
    var mainContainer = document.getElementsByTagName("main")[0];

    if (contentContainer === null) {
        console.error("Could not find content container when updating canvas size");
        return;
    }

    if (mainContainer === null) {
        console.error("Could not find main container when updating canvas size");
        return;
    }

    canvas.width = ceilInt(contentContainer.offsetWidth);
    canvas.height = mainContainer.offsetHeight / 3;
}

window.addEventListener("resize", (event) => {
  updateCanvasSize();
  draw();
});
