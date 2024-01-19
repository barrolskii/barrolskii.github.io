async function sortValues() {
    await currSortingFunc(values);
    draw();
}

function newValues() {
    generateRandomValues();
    draw();
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

function draw() {
    var darkGrey = "rgb(100, 100, 100)";
    var lightGrey = "rgb(140, 140, 140)";

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < values.length; i++) {
        var col = Math.round(mapValue(values[i], 0, canvas.height, 100, 140));
        ctx.fillStyle = `rgb(${col}, ${col}, ${col})`;
        ctx.fillRect(i * itemWidth, canvas.height, itemWidth, -values[i]);
    }
}

const valueLabel = document.getElementById("timestep-slider-value");
const timestepSlider = document.getElementById("timestep-slider");
const totalValuesSlider = document.getElementById("total-values-slider");
const valuesLabel = document.getElementById("total-values-value");
const algorithmSelector = document.getElementById("algorithm-selector");

var itemWidth;
var timeStep = timestepSlider.value * 1000;
var values = [];
var totalElements = 10;

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
    itemWidth = canvas.width / totalElements;
});

window.addEventListener("resize", (event) => {
    totalElements = totalValuesSlider.value;
    itemWidth = canvas.width / totalElements;
});

algorithmSelector.addEventListener("input", (event) => {
    currSortingFunc = functionTable[algorithmSelector.value];
})

valuesLabel.value = totalValuesSlider.value;
valuesLabel.textContent = totalValuesSlider.value;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
updateCanvasSize();

totalElements = totalValuesSlider.value;
itemWidth = canvas.width / totalElements;

generateRandomValues();
draw();
