import { mapValue } from "/assets/js/modules/math/helpers.js"
import { sleep } from "/assets/js/modules/time/time.js"

export var itemWidth = undefined;
export var itemGap = undefined;
export var timeStep = undefined;

function setItemWidth(value) {
    itemWidth = value;
}

function setItemGap(value) {
    itemGap = value;
}

function setTimeStep(value) {
    timeStep = value;
}

function swap(arr, a, b) {
    [arr[a], arr[b]] = [arr[b], arr[a]];
}

function select(arr, index, color) {
    ctx.fillStyle = color;
    ctx.fillRect(index * (itemWidth+itemGap*2)+itemGap, canvas.height, itemWidth, -arr[index]);
}

function clearElement(arr, index) {
    ctx.clearRect(index * (itemWidth+itemGap*2)+itemGap, 0, itemWidth, canvas.height);
}

function getColorString(value) {
    let col = mapValue(value, 0, canvas.height, 100, 140);
    return `rgb(${col}, ${col}, ${col})`
}

async function sleepStep() {
    let time = getStepSleepTime(timeStep, totalSleepSteps);
    return sleep(time);
}

function getStepSleepTime(timeStep, totalSteps) {
    return timeStep / totalSleepSteps;
}

function merge(left, right) {
    var result = [];

    while (left.length != 0 && right.length != 0) {
        if (left[0] <= right[0]) {
            result.push(left[0]);
            left.shift();
        } else {
            result.push(right[0]);
            right.shift();
        }
    }

    while (left.length > 0) {
        result.push(left[0]);
        left = left.slice(1, left.length);
    }

    while (right.length > 0) {
        result.push(right[0]);
        right = right.slice(1, right.length);
    }

    return result;
}

async function partition(arr, low, high) {
    let pivot = arr[high];
    let index = low - 1;

    select(arr, high, "red");
    await sleepStep();

    for (let i = low; i <= high; i++) {
        select(arr, i, "green");
        await sleepStep();

        if (arr[i] < pivot) {
            index++;

            if (i === index) {
                deselect(arr, i, getColorString(arr[i]));
                continue;
            }

            select(arr, index, "green");
            await sleepStep();

            clearElement(arr, index);
            clearElement(arr, i);

            swap(arr, index, i);

            select(arr, index, "green");
            select(arr, i, "green");
        }

        deselect(arr, index, getColorString(arr[index]));
        await sleepStep();

        deselect(arr, i, getColorString(arr[i]));
        await sleepStep();
    }

    select(arr, high, "red");
    await sleepStep();

    select(arr, index+1, "green");
    await sleepStep();

    clearElement(arr, index+1);
    clearElement(arr, high);

    swap(arr, index+1, high);

    deselect(arr, high, getColorString(arr[high]));
    await sleepStep();

    deselect(arr, index+1, getColorString(arr[index+1]));
    await sleepStep();

    return index+1;
}

var totalSleepSteps;

// Function alias
var deselect = select;

async function bubbleSort(arr) {
    totalSleepSteps = 4;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            // Step 1
            select(arr, j, "red");
            await sleepStep();

            // Step 2
            select(arr, j+1, "green");
            await sleepStep();

            // Step 3
            if (arr[j] > arr[j+1]) {
                swap(arr, j, j+1);

                // After swapping clear and reselect the items
                clearElement(arr, j);
                clearElement(arr, j+1);

                select(arr, j, "red");
                select(arr, j+1, "green");
            }

            deselect(arr, j+1, getColorString(arr[j+1]));
            await sleepStep();

            deselect(arr, j, getColorString(arr[j]));
            await sleepStep();
        }
    }
}

async function cocktailShakerSort(arr) {
    totalSleepSteps = 6;

    do {
        var swapped = false;

        for (let i = 0; i < arr.length - 1; i++) {
            select(arr, i, "red");
            await sleepStep();

            select(arr, i+1, "green");
            await sleepStep();

            if (arr[i] > arr[i+1]) {
                swap(arr, i, i+1);
                swapped = true;

                clearElement(arr, i);

                select(arr, i, "red");
                select(arr, i+1, "green");
            }

            await sleepStep();
            deselect(arr, i, getColorString(arr[i]));
            deselect(arr, i+1, getColorString(arr[i+1]));
        }

        if (!swapped) {
            break;
        }

        for (let i = arr.length - 1; i > 0; i--) {
            select(arr, i, "red");
            await sleepStep();

            select(arr, i-1, "green");
            await sleepStep();

            if (arr[i - 1] > arr[i]) {
                swap(arr, i, i-1);
                swapped = true;

                clearElement(arr, i-1);
                select(i*itemWidth, canvas.height, itemWidth, -arr[i], "green");
                select((i-1)*itemWidth, canvas.height, itemWidth, -arr[i-1], "red");
            }

            await sleepStep();

            deselect(arr, i, getColorString(arr[i]));
            deselect(arr, i-1, getColorString(arr[i-1]));
        }
    } while(swapped);
}

async function combSort(arr) {
    totalSleepSteps = 3;

    let gap = arr.length;
    let shrink = 1.3;
    let sorted = false;

    while (!sorted) {
        gap = Math.floor(gap / shrink);
        if (gap <= 1) {
            gap = 1;
            sorted = true;
        }

        for (let i = 0; i < (arr.length - gap); i++) {
            select(arr, i, "red");
            await sleepStep();

            select(arr, i+gap, "green")
            await sleepStep();

            if (arr[i] > arr[i+gap]) {
                swap(arr, i, i+gap);
                sorted = false;

                clearElement(arr, i);
                clearElement(arr, i+gap);

                select(arr, i, "red");
                select(arr, i+gap, "green");
                await sleepStep();
            }

            deselect(arr, i+gap, getColorString(arr[i+gap]));
            deselect(arr, i, getColorString(arr[i]));
        }
    }
}

async function cycleSort(arr) {
    totalSleepSteps = 6;

    for (let cycleStart = 0; cycleStart < arr.length - 1; cycleStart++) {
        let item = arr[cycleStart];
        let pos = cycleStart;

        select(arr, cycleStart, "red");
        await sleepStep();

        for (let i = cycleStart + 1; i < arr.length; i++) {
            if (arr[i] < item) {
                await sleepStep();

                if (pos !== cycleStart) {
                    deselect(arr, pos, getColorString(arr[pos]));
                    await sleepStep();
                }

                pos++;
                select(arr, pos, "green");
            }
        }

        if (pos == cycleStart) {
            deselect(arr, cycleStart, getColorString(arr[cycleStart]));
            await sleepStep();
            continue;
        }

        while (item == arr[pos]) {
            pos++;
        }

        if (pos != cycleStart) {
            let temp = item;
            item = arr[pos];
            arr[pos] = temp;

            clearElement(arr, pos);
            await sleepStep();
            select(arr, pos, "green");
            await sleepStep();
        }

        deselect(arr, pos, getColorString(arr[pos]));
        await sleepStep();

        while (pos != cycleStart) {
            pos = cycleStart;
            select(arr, pos, "red");
            await sleepStep();

            for (let i = cycleStart + 1; i < arr.length; i++) {
                if (arr[i] < item) {
                    await sleepStep();
                    if (pos !== cycleStart) {
                        deselect(arr, pos, getColorString(arr[pos]));
                        await sleepStep();
                    }

                    pos++;
                    select(arr, pos, "green");
                }
            }

            while (item == arr[pos]) {
                pos++;
            }

            if (item != arr[pos]) {
                let temp = item;
                item = arr[pos];
                arr[pos] = temp;

                clearElement(arr, pos);
                await sleepStep();
                select(arr, pos, "green");
                await sleepStep();
            }

            deselect(arr, pos, getColorString(arr[pos]));
            await sleepStep();
            deselect(arr, cycleStart, getColorString(arr[cycleStart]));
            await sleepStep();
        }
    }
}

async function exchangeSort(arr) {
    totalSleepSteps = 4;

    for (let i = 0; i < arr.length - 1; i++) {
        select(arr, i, "red");
        await sleepStep();

        for (let j = i + 1; j < arr.length; j++) {

            select(arr, j, "green");
            await sleepStep();

            if (arr[i] > arr[j]) {
                swap(arr, i, j);

                clearElement(arr, i);
                clearElement(arr, j);

                select(arr, i, "red");
                select(arr, j, "green");
            }

            deselect(arr, j, getColorString(arr[j]));
            await sleepStep();
        }

        deselect(arr, i, getColorString(arr[i]));
        await sleepStep();
    }
}

async function gnomeSort(arr) {
    totalSleepSteps = 3;

    let pos = 0;
    while (pos < arr.length) {
        select(arr, pos, "red");
        await sleepStep();

        if (pos === 0 || arr[pos] >= arr[pos-1]) {
            deselect(arr, pos, getColorString(arr[pos]));
            pos++;
        } else {
            select(arr, pos-1, "green");
            await sleepStep();

            swap(arr, pos, pos-1);

            clearElement(arr, pos);
            clearElement(arr, pos-1);

            select(arr, pos, "red");
            select(arr, pos-1, "green");

            await sleepStep();

            deselect(arr, pos, getColorString(arr[pos]));
            deselect(arr, pos-1, getColorString(arr[pos-1]));
            pos--;
        }
    }
}

async function heapify(arr, length, root) {
    let largest = root;
    let left = 2 * root + 1;
    let right = 2 * root + 2;

    select(arr, root, "red");
    await sleepStep();

    if (left < length && arr[left] > arr[largest]) {
        largest = left;
        select(arr, left, "green");
        await sleepStep();
    }

    if (right < length && arr[right] > arr[largest]) {
        deselect(arr, largest, getColorString(arr[largest]));
        largest = right;
        select(arr, right, "green");
        await sleepStep();
    }

    select(arr, largest, "green");
    await sleepStep();

    if (largest === root) {
        deselect(arr, largest, getColorString(arr[largest]));
        await sleepStep();
        return;
    }

    swap(arr, root, largest);

    clearElement(arr, root);
    clearElement(arr, largest);

    select(arr, root, "red");
    select(arr, largest, "green");

    await sleepStep();

    deselect(arr, root, getColorString(arr[root]));
    deselect(arr, largest, getColorString(arr[largest]));

    await heapify(arr, length, largest);
}

async function heapSort(arr) {
    totalSleepSteps = 5;

    for (let i = parseInt(arr.length / 2); i >= 0; i--) {
        await heapify(arr, arr.length, i);
    }

    for (let j = arr.length - 1; j > 0; j--) {
        select(arr, j, "red");
        select(arr, 0, "green");

        await sleepStep();
        swap(arr, 0, j);

        clearElement(arr, j);
        clearElement(arr, 0);

        select(arr, j, "red");
        select(arr, 0, "green");

        await sleepStep();

        deselect(arr, j, getColorString(arr[j]));
        deselect(arr, 0, getColorString(arr[0]));

        await heapify(arr, j, 0);
    }
}

async function insertionSort(arr) {
    totalSleepSteps = 4;

    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j > 0; j--) {
            select(arr, j, "red");
            await sleepStep();

            select(arr, j-1, "green");
            await sleepStep();

            if (arr[j-1] > arr[j]) {
                swap(arr, j, j-1);

                clearElement(arr, j-1);
                clearElement(arr, j);

                select(arr, j, "red");
                select(arr, j-1, "green");
            }

            deselect(arr, j, getColorString(arr[j]));
            await sleepStep();

            deselect(arr, j-1, getColorString(arr[j-1]));
            await sleepStep();
        }
    }
}

async function oddEvenSort(arr) {
    totalSleepSteps = 4;

    let sorted = false;
    while (!sorted) {
        sorted = true;
        for (let i = 1; i < arr.length - 1; i += 2) {
            select(arr, i, "red");
            await sleepStep();

            select(arr, i+1, "green");
            await sleepStep();

            if (arr[i] > arr[i+1]) {
                swap(arr, i, i+1);
                sorted = false;

                clearElement(arr, i);
                clearElement(arr, i+1);

                select(arr, i, "red");
                select(arr, i+1, "green");
            }

            deselect(arr, i, getColorString(arr[i]));
            await sleepStep();

            deselect(arr, i+1, getColorString(arr[i+1]));
            await sleepStep();
        }

        for (let j = 0; j < arr.length - 1; j += 2) {
            select(arr, j, "red");
            await sleepStep();

            select(arr, j+1, "green");
            await sleepStep();

            if (arr[j] > arr[j+1]) {
                swap(arr, j, j+1);
                sorted = false;

                clearElement(arr, j);
                clearElement(arr, j+1);

                select(arr, j, "red");
                select(arr, j+1, "green");
            }

            deselect(arr, j, getColorString(arr[j]));
            await sleepStep();

            deselect(arr, j+1, getColorString(arr[j+1]));
            await sleepStep();
        }
    }
}

async function patienceSort(arr) {
    totalSleepSteps = 2;

    let piles = [];
    let sorted = [];
    let colors = [ "red", "green", "blue", "yellow", "orange", "brown", "pink", "purple" ];

    for (let i = 0; i < arr.length; i++) {
        let destIndex = piles.findIndex( (pile) => arr[i] >= pile.at(-1) );

        if (destIndex === -1) {
            select(arr, i, colors[piles.length % colors.length]);
            piles.push([arr[i]]);
        } else {
            piles[destIndex].push(arr[i]);
            select(arr, i, colors[destIndex % colors.length]);
        }

        await sleepStep();
    }

    let copy = structuredClone(piles);

    // Draw the elements in order of pile
    for (let k = 0; k < arr.length; k++) {
        let min = Number.MAX_SAFE_INTEGER;
        let currPile = null;
        let pileIndex = null;

        copy.forEach((pile, index) => {
            if (pile[0] <= min) {
                min = pile[0];
                currPile = pile;
                pileIndex = index;
            }
        });

        clearElement(arr, k);
        await sleepStep();

        ctx.fillStyle = colors[pileIndex % colors.length];
        ctx.fillRect(k * (itemWidth+itemGap*2)+itemGap, canvas.height, itemWidth, -currPile[0]);
        await sleepStep();

        currPile.shift();
    }

    for (let j = 0; j < piles.length; j++) {
        sorted = merge(sorted, piles[j]);
    }

    for (let i = 0; i < sorted.length; i++) {
        arr[i] = sorted[i];
    }
}

async function quickSortRecursive(arr, low, high) {
    if (low < high) {
        let partitionIndex = await partition(arr, low, high);

        await quickSortRecursive(arr, low, partitionIndex-1);
        await quickSortRecursive(arr, partitionIndex+1, high);
    }
}

async function quickSort(arr) {
    totalSleepSteps = 4;
    await quickSortRecursive(arr, 0, arr.length - 1);
}

async function selectionSort(arr) {
    totalSleepSteps = 3;

    for (let i = 0; i < arr.length - 1; i++) {
        let min = i;
        select(arr, i, "red");
        select(i*itemWidth, canvas.height, itemWidth, -arr[i], "red");

        for (let j = i + 1; j < arr.length; j++) {
            await sleepStep();
            select(arr, j, "green")

            if (arr[j] < arr[min]) {
                await sleepStep();
                if (i !== min) {
                    deselect(arr, min, getColorString(arr[min]));
                }
                select(arr, j, "green");

                min = j;

                continue;
            }

            await sleepStep();
            deselect(arr, j, getColorString(arr[j]));
        }

        if (min != i) {
            swap(arr, i, min);

            clearElement(arr, i);
            clearElement(arr, min);

            select(arr, i, "red");
            select(arr, min, "green");
        }

        await sleepStep();
        select(arr, i, getColorString(arr[i]));
        select(arr, min, getColorString(arr[min]));
    }
}

async function shellSort(arr) {
    totalSleepSteps = 3;

    let gaps = [701, 301, 132, 57, 23, 10, 4, 1] // Ciura gap sequence

    for (let g = 0; g < gaps.length; g++) {
        let gap = gaps[g];
        for (let i = gap; i < arr.length; i++) {
            let temp = arr[i];
            let j;

            for (j = i; (j >= gap) && (arr[j - gap] > temp); j -= gap) {
                select(arr, j, "red");
                await sleepStep();

                clearElement(arr, j);
                arr[j] = arr[j - gap];

                select(arr, j, "green");
                await sleepStep();
                deselect(arr, j, getColorString(arr[j]));
            }

            clearElement(arr, j)
            arr[j] = temp;
            select(arr, j, "red");
            await sleepStep();
            deselect(arr, j, getColorString(arr[j]));
        }
    }
}

export {
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
    setTimeStep
}
