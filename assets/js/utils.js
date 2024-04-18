import { STATS_COLUMNS, STATS_PAGINATION_CONFIG } from './constants.js';
import {
  accuracyResult,
  caret,
  comparison,
  loader,
  resultModal,
  statsModal,
  statsTable,
  textPrompt,
  wpmResult
} from './elements.js';

/**
 * Retrieves a custom collection of various English words in a random order.
 * @async
 * @function getWords
 * @returns {Promise<Array>} A promise that contains words in a random order in an array when fulfilled.
 */
const getWords = async () => {
  const response = await fetch('../assets/data/words.json');
  const data = await response.json();
  return randomizeWords(data.list);
};

/**
 * Randomizes the order of words in the array.
 * @function randomizeWords
 * @param {Array} words Words array.
 * @returns {Array} Array
 */
const randomizeWords = (words) => {
  for (let i = 0; i < words.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }
  return words;
};

/**
 * Populates the text field with words.
 * @async
 * @function populate
 */
export const populate = async () => {
  loader.classList.remove('hidden');
  caret.classList.add('hidden');

  const words = await getWords();

  words.forEach((word) => {
    let letters = '';
    word.split('').forEach((letter) => {
      letters += `<span class='letter'>${letter}</span>`;
    });
    letters += `<span class='letter'>&nbsp;</span>`;
    textPrompt.innerHTML += `<span class='word'>${letters}</span>`;
  });

  loader.classList.add('hidden');
  caret.classList.remove('hidden');
};

/**
 * Count the number of mistakes made.
 * @returns {number} Number of mistakes made.
 */
export const countMistakes = () => {
  return document.querySelectorAll('.incorrect').length;
};

/**
 *
 * @param {number} numOfCharsTyped Total number of characters typed.
 * @param {number} numOfMistakes Total number of mistakes made.
 * @returns {number} Words per minute.
 */
export const countWordsPerMinute = (numOfCharsTyped, numOfMistakes) => {
  return Number(((numOfCharsTyped - numOfMistakes) / 5).toFixed(0));
};

/**
 *
 * @param {number} numOfCharsTyped Total number of characters typed.
 * @param {number} numOfMistakes Total number of mistakes made.
 * @returns {number} Accuracy (%) with 2 digits after the decimal point.
 */
export const calcAccuracy = (numOfCharsTyped, numOfMistakes) => {
  return Number(
    (((numOfCharsTyped - numOfMistakes) / numOfCharsTyped) * 100).toFixed(2)
  );
};

/**
 * Checks if the user improved on his result comparing to the last one.
 * @param {object} lastResult User's last result object.
 * @param {object} newResult User's new result object.
 * @returns {boolean} True if the user improved, false otherwise.
 */
export const hasImproved = (lastResult, newResult) => {
  if (lastResult === undefined) return true;
  return (
    (lastResult.wpm < newResult.wpm &&
      lastResult.accuracy <= newResult.accuracy) ||
    (lastResult.wpm <= newResult.wpm &&
      lastResult.accuracy < newResult.accuracy)
  );
};

/**
 * Shwos the result modal.
 * @param {object} result Result object.
 * @param {boolean} improved Has the recent result improved compared to the last one?
 */
export const showResultModal = (result, improved) => {
  resultModal.classList.remove('hidden');
  resultModal.classList.add('flex');

  if (improved) {
    comparison.innerText = 'Improved';
    comparison.classList.add('text-light-green');
  } else {
    comparison.innerText = 'Not Improved';
    comparison.classList.add('text-light-red');
  }

  wpmResult.innerText = result.wpm;
  accuracyResult.innerText = `${result.accuracy}%`;
};

/**
 * Shows the stats modal with the stats data table.
 * @param {Array} stats Array of stats objects.
 */
export const showStatsModal = (stats) => {
  statsModal.classList.remove('hidden');
  statsModal.classList.add('flex');
  new gridjs.Grid({
    columns: STATS_COLUMNS,
    data: stats,
    sort: {
      multiColumn: false
    },
    pagination: STATS_PAGINATION_CONFIG
  }).render(statsTable);
};

/**
 * Closes the stats modal.
 */
export const closeStatsModal = () => {
  statsModal.classList.remove('flex');
  statsModal.classList.add('hidden');
  statsTable.innerHTML = '';
};

/**
 *
 * @param {number} ms Time to wait for in milliseconds.
 * @returns {Promise} A promise that is resolved after the specified time.
 */
export const waitFor = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));
