/*
* Example functions to practice JavaScript
*
* Vladimir Reyes - A01786772
* 2026-03-26
*/

// First Non Repeating
function firstNonRepeating(string){
    let frequency = {};

    for (const char of string){
        frequency[char] = (frequency[char] || 0) + 1;
    }

    for (const char in frequency){
        if (frequency[char] == 1) return char
    }
}

// Bubble Sort
function bubbleSort(arr){
    const size = arr.length;

    for (let i = 0; i < size; i++){
        let swapped = false;

        for (let j = 0; j < size-i-1; j++){
            if (arr[j] > arr[j+1]){
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                swapped = true;
            }
        }
        if(!swapped) break;
    }
    return arr;
}

// Invert Array
function invertArray(arr){
    let left = 0
    let right = arr.length-1;

    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right++;
    }
    return arr;
}

// Invert Array In Place
function invertArrayInplace(arr){
    let left = 0
    let right = arr.length-1;

    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right++;
    }
}

// Capitalize
function capitalize(string){
        const words = string.split(" ").map(word => 
            word ? word[0].toUpperCase() + word.slice(1) : "");
    return words.join(" ");
}

// MCD
function mcd(a, b){
     return (b == 0) ? a : mcd(b, a % b); // Algortimo euclidiano
}

// Hacker Speak
function hackerSpeak(string){
    const hackerAlphabet = {
        'a' : '4',
        'e' : '3',
        'i' : '1',
        'o' : '0',
        's' : '5',
        't' : '7',
    }
}

/*export {
    firstNonRepeating,
    /*bubbleSort,
    invertArray,
    invertArrayInplace,
    capitalize,
    mcd,
    hackerSpeak,
    factorize,
    deduplicate,
    findShortestString,
    isPalindrome,
    sortStrings,
    stats,
    popularString,
    isPowerOf2,
    sortDescending,
};*/