import { mapValue } from "modules/math/helpers.js";
import { getRandomInt } from "modules/math/random.js";
import { enableElement, disableElement } from "modules/dom/helpers.js";
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
    quickSort,
    selectionSort,
    shellSort
} from "demos/sortingAlgorithmZoo/sortingAlgorithms.js"

async function swap(arr, a, b, reverse) {
    [arr[a], arr[b]] = [arr[b], arr[a]];

    if (animSpeed === 0) {
        return
    }

    let barOne = document.getElementById('bar-' + a);
    let barTwo = document.getElementById('bar-' + b);

    let diff = Math.abs(barTwo.offsetLeft - barOne.offsetLeft);

    const animation = barOne.animate(
        [
            { 'left': '0px' },
            { 'left': diff + 'px' }
        ],
        {
            duration: animSpeed,
            iterations: 1
        }
    );

    const animationTwo = barTwo.animate(
        [
            { 'right': '0px' },
            { 'right': diff + 'px' }
        ],
        {
            duration: animSpeed,
            iterations: 1
        }
    );

    await animation.finished.then( () => barOne.style.left = diff + 'px' );
    await animationTwo.finished.then( () => barTwo.style.right = diff + 'px' );

    draw();

    if (reverse === true) {
        barOne = document.getElementById('bar-' + a);
        barOne.className += " selected";
        barOne.style.backgroundColor = 'blue';

    } else {
        barTwo = document.getElementById('bar-' + b);
        barTwo.className += " selected";
        barTwo.style.backgroundColor = 'blue';
    }
}

async function select(index, from, to) {
    const bar = document.getElementById('bar-' + index);

    // If the bar is already the colour we want to transition to then that
    // bar is already selected so we should exit
    if (bar.style.backgroundColor === to) {
        return;
    }

    const animation = bar.animate(
        [
            { backgroundColor: from },
            { backgroundColor: to }
        ],
        { duration: animSpeed, iterations: 1}
    );

    await animation.finished;

    // We need to manually set the bars colour as after the animation plays
    // out it will reset back to what it was originally
    bar.style.backgroundColor = to;
    bar.className += " selected";
}

async function deselect() {
    const selected = document.getElementsByClassName('selected')[0];

    if (selected === undefined) {
        return;
    }

    const color = getColorString(selected.style.height.replace('px', ''));

    if (selected.style.backgroundColor === color) {
        return;
    }

    const animation = selected.animate(
        [
            { backgroundColor: 'blue'},
            { backgroundColor: color }
        ],
        { duration: animSpeed, iterations: 1}
    );

    await animation.finished;

    selected.style.backgroundColor = color;
}

async function set(arr, index, to) {
    const selected = document.getElementsByClassName('selected')[0];
    const animation = selected.animate(
        [
            { height: selected.style.height },
            { height: to + 'px' }
        ],
        { duration: animSpeed, iterations: 1 }
    );
    await animation.finished;

    selected.style.height = to + 'px';
    arr[index] = to;

    draw();
}

async function sortValues() {
    disableElement(totalValuesSlider);
    disableElement(sortButton);
    disableElement(regenerateButton);

    const generator = currSortingFunc(values);
    let itr = await generator.next();

    while (itr.done === false) {
        const value = itr.value;

        switch (value.op) {
            case "swap":
                await swap(values, value.a, value.b, (value.reverse || false));
                break;
            case "select":
                await select(value.index, getColorString(values[value.index]), 'blue');
                break;
            case "deselect":
                await deselect();
                break;
            case "set":
                await set(values, value.index, value.to);
                break;
            default:
                console.error('Unrecognised operation %s', value.op);
        }

        itr = await generator.next();
    }

    draw();

    enableElement(totalValuesSlider);
    enableElement(sortButton);
    enableElement(regenerateButton);
}

function newValues() {
    generateRandomValues();
    draw();
}

function generateRandomValues() {
    for (let i = 0; i < totalElements; i++) {
        values[i] = getRandomInt(mainContainer.offsetHeight / 3) + 1;
    }
}

function finish() {
    animSpeed = 0;
}

function getColorString(value) {
    let col = Math.round(mapValue(value, 0, canvas.height, darkGrey, lightGrey));
    return `rgb(${col}, ${col}, ${col})`
}

function init() {
    timestepSlider.addEventListener("input", (event) => {
        valueLabel.textContent = String(event.target.value).padStart('4', 0);
        animSpeed = parseInt(event.target.value);
    });

    totalValuesSlider.addEventListener("input", (event) => {
        valuesLabel.textContent = event.target.value;
        totalElements = event.target.value;
    });

    totalValuesSlider.addEventListener("click", () => {
        generateRandomValues();
        draw();
    });

    window.addEventListener("resize", (event) => {
        totalElements = totalValuesSlider.value;
        draw();
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

    barContainer.style.height = mainContainer.offsetHeight / 3 + "px";

    generateRandomValues();
}

function draw() {
    barContainer.innerHTML = '';

    for (let i = 0; i < totalElements; i++) {
        let bar = document.createElement('div');
        let col = Math.round(mapValue(values[i], 0, canvas.height, darkGrey, lightGrey));

        bar.style.height = values[i] + "px";
        bar.style.width = (contentContainer.offsetWidth / totalElements - 2)+ "px";
        bar.style.backgroundColor = getColorString(values[i]);
        bar.style.position = 'relative';
        bar.id = 'bar-' + i;
        bar.className = 'bar';

        barContainer.appendChild(bar);
    }
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
var animSpeed = 1000;

// Values for colours. Single integer as this value applies for the R, G, and B values
var darkGrey = 100;
var lightGrey = 140;

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
    "QuickSort": quickSort,
    "SelectionSort": selectionSort,
    "ShellSort": shellSort,
};

var currSortingFunc = functionTable[algorithmSelector.value];

let canvas = document.getElementsByTagName('canvas')[0];
let mainContainer = document.getElementsByTagName("main")[0];
let contentContainer = document.getElementsByClassName("content")[0];
let barContainer = document.getElementById('bar-container');

// We don't want the canvas for this one as its easier to animate the sort
canvas.remove();
init();
draw();
