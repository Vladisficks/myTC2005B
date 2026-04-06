/*
* Example functions to practice JavaScript
*
* Vladimir Reyes - A01786772
* 2026-03-26
*/

// First Non Repeating
function firstNonRepeating(string) {
    let frequency = {};

    for (const char of string) {
        frequency[char] = (frequency[char] || 0) + 1;
    }

    for (const char in frequency) {
        if (frequency[char] === 1) return char
    }
}

// Bubble Sort
function bubbleSort(arr) {
    const size = arr.length;

    for (let i = 0; i < size; i++) {
        let swapped = false;

        for (let j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arr;
}

// Invert Array
function invertArray(arr) {
    let left = 0
    let right = arr.length - 1;

    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right++;
    }
    return arr;
}

// Invert Array In Place
function invertArrayInplace(arr) {
    let left = 0
    let right = arr.length - 1;

    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right++;
    }
}

// Capitalize
function capitalize(string) {
    const words = string.split(" ").map(word =>
        word ? word[0].toUpperCase() + word.slice(1) : "");
    return words.join(" ");
}

// MCD
function mcd(a, b) {
    return (b === 0) ? a : mcd(b, a % b); // Algortimo euclidiano
}

// Hacker Speak
function hackerSpeak(string) {
    const hackerAlphabet = {
        'a': '4',
        'e': '3',
        'i': '1',
        'o': '0',
        's': '5',
    }

    const hackerString = string.split("")
        .map(char => hackerAlphabet[char.toLowerCase()] || char)
        .join("");
    return hackerString;
}

// Factorize
function factorize(n) {
    const factors = [];

    for (let i = 1; i <= n; i++) {
        if (n % i == 0) factors.push(i);
    }
    return factors;
}

// Deduplicate
function deduplicate(arr) {
    const noDuplicated = [];

    for (const n of arr) {
        if (!noDuplicated.includes(n)) noDuplicated.push(n);
    }
    return noDuplicated.sort();
}

// Find Shortes String
function findShortestString(arr) {
    if (arr.length === 0) return 0;
    let minLength = Infinity;

    for (const word of arr) {
        if (word.length < minLength) {
            minLength = word.length;
        }
    }
    return minLength;
}

// Is Palindrome?
function isPalindrome(string) {
    let palindrome = string.split("").reverse().join("");
    return palindrome.toLowerCase() === string.toLowerCase() ? true : false;
}

// Sort Strings
function sortStrings(arr) {
    return arr.sort();
}

// Stats
function stats(arr) {
    // Mean
    let sum = 0;

    for (const n of arr) sum += n;
    let mean = sum != 0 ? sum / arr.length : 0;

    // Mode
    let frequency = {}

    for (const n of arr) {
        frequency[n] = (frequency[n] || 0) + 1;
    }
    let maxCount = 0;
    let mode = 0;

    for (const n in frequency){
        if (frequency[n] > maxCount){
            maxCount = frequency[n];
            mode = Number(n);
        }
    }
    return [mean, mode];
}

// Popular String
function popularString(arr){
    let frequency = {}

    for (const word of arr){
        frequency[word] = (frequency[word] || 0) + 1;
    }
    let maxCount = 0;
    let popularWord = "";

    for (const nWords in frequency){
        if (frequency[nWords] > maxCount){
            maxCount = frequency[nWords];
            popularWord = nWords;
        }
    }
    return popularWord;
}

// Is Power of 2?
function isPowerOf2(n) {
    return (n > 0 && n & (n - 1)) == 0; // Betwise method
}

// Sort Descending
function sortDescending(arr){
    return arr.sort(function(a, b){
        return b - a
    });
}

export {
    firstNonRepeating,
    bubbleSort,
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
    sortDescending
};