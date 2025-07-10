import { mapValue,  } from "modules/math/helpers.js"
import { getRandomInt } from "modules/math/random.js"
import { sleep } from "modules/time/time.js"
import { enableElement, disableElement } from "modules/dom/helpers.js"
import { initCanvas, setCanvasResizeFunction, canvas, ctx } from "modules/canvas/canvas.js";
import {
    bubbleSort,
    cocktailShakerSort,
    combSort,
    cycleSort,
    exchangeSort,
    gnomeSort,
    heapSort,
    insertionSort,
    oddEvenSort,
    patienceSort,
    quickSort,
    selectionSort,
    shellSort,
    setItemWidth,
    setItemGap,
    setTimeStep,
    itemWidth,
    itemGap,
} from "demos/sortingAlgorithmZoo/sortingAlgorithms.js"

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

    setTimeStep(0);

    // Wait until the sorting function has caught up
    while (isSorting) {
        await sleep(10);
    }

    setTimeStep(timestepSlider.value * 1000);
}

function generateRandomValues() {
    values = [];

    for (let i = 0; i < totalElements; i++) {
        values[i] = getRandomInt(canvas.height - 1) + 1;
    }
}

function setItemWidthAndGap() {
    setItemGap(100 / totalElements);
    setItemWidth(canvas.width / totalElements - itemGap * 2);
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

function resizeCanvas() {
    let contentContainer = document.getElementsByClassName("content")[0];
    let mainContainer = document.getElementsByTagName("main")[0];

    if (contentContainer === null) {
        console.error("Could not find content container when updating canvas size");
        return;
    }

    if (mainContainer === null) {
        console.error("Could not find main container when updating canvas size");
        return;
    }

    canvas.width = Math.ceil((contentContainer.offsetWidth / 10)) * 10;
    canvas.height = mainContainer.offsetHeight / 3;

    draw();
}

const sortButton = document.getElementsByName("sortButton")[0];
const regenerateButton = document.getElementsByName("regenerateButton")[0];
const finishButton = document.getElementsByName("finishButton")[0];

const valueLabel = document.getElementById("timestep-slider-value");
const timestepSlider = document.getElementById("timestep-slider");
const totalValuesSlider = document.getElementById("total-values-slider");
const valuesLabel = document.getElementById("total-values-value");
const algorithmSelector = document.getElementById("algorithm-selector");

var values = [];
var totalElements = 10;
var isSorting = false;

setTimeStep(timestepSlider.value * 1000);

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
    setTimeStep(event.target.value * 1000);
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
});

sortButton.addEventListener("click", () => {
    sortValues();
});

regenerateButton.addEventListener("click", () => {
    newValues();
});

finishButton.addEventListener("click", () => {
    finish();
});

valuesLabel.value = totalValuesSlider.value;
valuesLabel.textContent = totalValuesSlider.value;

setCanvasResizeFunction(resizeCanvas);
initCanvas();

setItemWidthAndGap();
generateRandomValues();
draw();
