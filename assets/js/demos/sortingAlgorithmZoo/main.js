async function sortValues() {
    isSorting = true;

    disableElement(totalValuesSlider);
    disableElement(sortButton);
    disableElement(regenerateButton);

    await currSortingFunc(values);
    draw();

    enableElement(totalValuesSlider);
    enableElement(sortButton);
    enableElement(regenerateButton);

    isSorting = false;
}

function newValues() {
    generateRandomValues();
    draw();
}

async function finish() {
    if (!isSorting) {
        return;
    }

    timeStep = 0;

    // Wait until the sorting function has caught up
    while (isSorting) {
        await sleep(10);
    }

    timeStep = timestepSlider.value * 1000;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function ceilInt(x) {
    return Math.ceil(x / 10) * 10;
}

function generateRandomValues() {
    values = [];

    for (let i = 0; i < totalElements; i++) {
        values[i] = getRandomInt(canvas.height - 1) + 1;
    }
}

// maps value x from range a -> b to range c -> d
function mapValue(x, a, b, c, d) {
    return (x-a) * ((d-c)/(b-a)) + c;
}

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

function setItemWidthAndGap() {
    itemGap = 100 / totalElements;
    itemWidth = canvas.width / totalElements - itemGap * 2;
}

function draw() {
    var darkGrey = "rgb(100, 100, 100)";
    var lightGrey = "rgb(140, 140, 140)";

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < values.length; i++) {
        var col = Math.round(mapValue(values[i], 0, canvas.height, 100, 140));
        ctx.fillStyle = `rgb(${col}, ${col}, ${col})`;
        ctx.fillRect(i * (itemWidth+itemGap*2)+itemGap, canvas.height, itemWidth, -values[i]);
    }
}

const sortButton = document.getElementsByName("sortButton")[0];
const regenerateButton = document.getElementsByName("regenerateButton")[0];

const valueLabel = document.getElementById("timestep-slider-value");
const timestepSlider = document.getElementById("timestep-slider");
const totalValuesSlider = document.getElementById("total-values-slider");
const valuesLabel = document.getElementById("total-values-value");
const algorithmSelector = document.getElementById("algorithm-selector");

var itemWidth;
var itemGap;
var timeStep = timestepSlider.value * 1000;
var values = [];
var totalElements = 10;
var isSorting = false;

var functionTable = {
    "BubbleSort": bubbleSort,
    "CocktailShakerSort": cocktailShakerSort,
    "CombSort": combSort,
    "CycleSort": cycleSort,
    "ExchangeSort": exchangeSort,
    "GnomeSort": gnomeSort,
    "HeapSort": heapSort,
    "InsertionSort": insertionSort,
    "OddEvenSort": oddEvenSort,
    "PatienceSort": patienceSort,
    "QuickSort": quickSort,
    "SelectionSort": selectionSort,
    "ShellSort": shellSort,
};

var currSortingFunc = functionTable[algorithmSelector.value];

timestepSlider.addEventListener("input", (event) => {
    valueLabel.textContent = parseFloat(event.target.value).toFixed(2);
    timeStep = event.target.value * 1000;
});

totalValuesSlider.addEventListener("input", (event) => {
    valuesLabel.textContent = event.target.value;
    totalElements = event.target.value;
    setItemWidthAndGap();
});

totalValuesSlider.addEventListener("click", () => {
    generateRandomValues();
    draw();
});

window.addEventListener("resize", (event) => {
    totalElements = totalValuesSlider.value;
    setItemWidthAndGap();
});

algorithmSelector.addEventListener("input", (event) => {
    currSortingFunc = functionTable[algorithmSelector.value];
})

valuesLabel.value = totalValuesSlider.value;
valuesLabel.textContent = totalValuesSlider.value;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

updateCanvasSize();
setItemWidthAndGap();

generateRandomValues();
draw();
