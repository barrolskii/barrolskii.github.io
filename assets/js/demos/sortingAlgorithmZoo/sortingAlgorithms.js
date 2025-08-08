async function* bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                yield { op: "select", index: j };
                yield { op: "swap", a: j, b: j+1 };
            } else {
                yield { op: "deselect" };
            }
        }

        yield { op: "deselect" };
    }
}

async function* cocktailShakerSort(arr) {
    do {
        var swapped = false;

        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i+1]) {
                yield { op: "select", index: i };
                yield { op: "swap", a: i, b: i+1 };

                swapped = true;
            } else {
                yield { op: "deselect" };
            }
        }

        yield { op: "deselect" };

        if (!swapped) {
            break;
        }

        for (let i = arr.length - 1; i > 0; i--) {
            if (arr[i - 1] > arr[i]) {
                yield { op: "select", index: i };
                yield { op: "swap", a: i-1, b: i, reverse: true };

                swapped = true;
            } else {
                yield { op: "deselect" };
            }
        }

        yield { op: "deselect" };
    } while(swapped);
}

async function* combSort(arr) {
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
            if (arr[i] > arr[i+gap]) {
                yield { op: "select", index: i };
                yield { op: "swap", a: i, b: i+gap };

                sorted = false;
            }

            yield { op: "deselect" };
        }
    }
}

async function* cycleSort(arr) {
    for (let cycleStart = 0; cycleStart < arr.length - 1; cycleStart++) {
        let item = arr[cycleStart];
        let pos = cycleStart;

        for (let i = cycleStart + 1; i < arr.length; i++) {
            if (arr[i] < item) {
                pos++;
            }
        }

        if (pos == cycleStart) {
            continue;
        }

        while (item == arr[pos]) {
            pos++;
        }


        if (pos != cycleStart) {
            let temp = item;
            item = arr[pos];

            yield { op: "select", index: pos };
            yield { op: "set", index: pos, to: temp };
            yield { op: "deselect" };
        }

        while (pos != cycleStart) {
            pos = cycleStart;

            for (let i = cycleStart + 1; i < arr.length; i++) {
                if (arr[i] < item) {
                    pos++;
                }
            }

            while (item == arr[pos]) {
                pos++;
            }


            if (item != arr[pos]) {
                let temp = item;
                item = arr[pos];

                yield { op: "select", index: pos };
                yield { op: "set", index: pos, to: temp };
                yield { op: "deselect" };
            }
        }
    }
}

async function* exchangeSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                yield { op: "select", index: i };
                yield { op: "swap", a: i, b: j };

            } else {
                yield { op: "deselect" };
            }

            yield { op: "deselect" };
        }
    }
}

async function* gnomeSort(arr) {
    let pos = 0;
    while (pos < arr.length) {
        if (pos === 0 || arr[pos] >= arr[pos-1]) {
            yield { op: "deselect" };
            pos++;
        } else {
            yield { op: "select", index: pos };
            yield { op: "swap", a: pos-1, b: pos, reverse: true };

            pos--;
        }
    }
}

async function* heapify(arr, length, root) {
    let largest = root;
    let left = 2 * root + 1;
    let right = 2 * root + 2;

    if (left < length && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < length && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest === root) {
        yield { op: "deselect" };
        return;
    }

    yield { op: "select", index: root };
    yield { op: "swap", a: root, b: largest };

    yield* heapify(arr, length, largest);
}

async function* heapSort(arr) {
    for (let i = parseInt(arr.length / 2); i >= 0; i--) {
        yield* heapify(arr, arr.length, i);
    }

    for (let j = arr.length - 1; j > 0; j--) {
        yield { op: "select", index: 0 };
        yield { op: "swap", a: 0, b: j };

        yield { op: "deselect" };
        yield* heapify(arr, j, 0);
    }
}

async function* insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j > 0; j--) {
            if (arr[j-1] > arr[j]) {
                yield { op: "select", index: j-1 };
                yield { op: "swap", a: j-1, b: j };
            } else {
                yield { op: "deselect" };
            }

            yield { op: "deselect" };
        }
    }
}

async function* oddEvenSort(arr) {
    let sorted = false;
    while (!sorted) {
        sorted = true;
        for (let i = 1; i < arr.length - 1; i += 2) {
            if (arr[i] > arr[i+1]) {
                yield { op: "select", index: i };
                yield { op: "swap", a: i, b: i+1 };

                sorted = false;
            } else {
                yield { op: "deselect" };
            }

            yield { op: "deselect" };
        }

        for (let j = 0; j < arr.length - 1; j += 2) {
            if (arr[j] > arr[j+1]) {
                yield { op: "select", index: j };
                yield { op: "swap", a: j, b: j+1 };

                sorted = false;

            } else {
                yield { op: "deselect" };
            }

            yield { op: "deselect" };
        }
    }
}

async function maxIndex(arr, k) {
    let index = 0;

    for (let i = 0; i < k; i++) {
        if (arr[i] > arr[index]) {
            index = i;
        }
    }

    return index;
}

async function* flip(arr, index) {
    let left = 0;

    while (left < index) {
        yield { op: "select", index: left };
        yield { op: "swap", a: left, b: index };
        yield { op: "deselect" };

        index--;
        left++;
    }
}

async function* pancakeSort(arr) {
    let n = arr.length;

    while (n > 1) {
        let index = await maxIndex(arr, n);

        if (index != n-1) {
            if (index != 0) {
                yield* await flip(arr, index);
            }

            yield* await flip(arr, n-1);
        }

        n--;
    }

    return;
}

async function* partition(arr, low, high) {
    let pivot = arr[low];

    let leftIndex = low - 1;
    let rightIndex = high + 1;

    while (true) {
        do {
            leftIndex++;
        } while (arr[leftIndex] < pivot);

        do {
            rightIndex--;
        } while (arr[rightIndex] > pivot);

        if (leftIndex >= rightIndex) {
            return rightIndex;
        }

        yield { op: "select", index: leftIndex };
        yield { op: "swap", a: leftIndex, b: rightIndex };
        yield { op: "deselect" };
    }
}

async function* quickSortRecursive(arr, low, high) {
    if (low < high) {
        let pivot = yield* await partition(arr, low, high);

        yield* quickSortRecursive(arr, low, pivot);
        yield* quickSortRecursive(arr, pivot + 1, high);
    }
}

async function* quickSort(arr) {
    yield* quickSortRecursive(arr, 0, arr.length - 1);
}

async function* selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let min = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
                continue;
            }
        }

        if (min != i) {
            yield { op: "select", index: min };
            yield { op: "swap", a: i, b: min, reverse: true };
        }

        yield { op: "deselect" };
    }
}

async function* shellSort(arr) {
    let gaps = [701, 301, 132, 57, 23, 10, 4, 1]; // Ciura gap sequence

    for (let g = 0; g < gaps.length; g++) {
        let gap = gaps[g];
        for (let i = gap; i < arr.length; i++) {
            let temp = arr[i];
            let j;

            for (j = i; (j >= gap) && (arr[j - gap] > temp); j -= gap) {
                yield { op: "select", index: j-gap };
                yield { op: "swap", a: j-gap, b: j };
                yield { op: "deselect" };
            }
        }
    }
}

async function* slowSortRecursive(arr, startIndex, endIndex) {
    if (startIndex >= endIndex) {
        return;
    }

    let middleIndex = Math.floor((startIndex + endIndex) / 2);

    yield* slowSortRecursive(arr, startIndex, middleIndex);
    yield* slowSortRecursive(arr, middleIndex + 1, endIndex);

    if (arr[middleIndex] > arr[endIndex]) {
        yield { op: "select", index: middleIndex };
        yield { op: "swap", a: middleIndex, b: endIndex };
        yield { op: "deselect" };
    }

    yield* slowSortRecursive(arr, startIndex, endIndex-1);
}

async function* slowSort(arr) {
    yield* slowSortRecursive(arr, 0, arr.length - 1);
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
    pancakeSort,
    quickSort,
    selectionSort,
    shellSort,
    slowSort
}
