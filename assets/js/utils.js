/**
 * Retrieves a custom collection of various English words in a random order.
 * @async
 * @function getWords
 * @returns Promise<Array>
 */
const getWords = async () => {
  const response = await fetch('../assets/data/words.json');
  const data = await response.json();
  return randomizeWords(data.list);
};

/**
 * Randomizes the order of words in the array.
 * @function randomizeWords
 * @param {Array} words
 * @returns Array
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
 * @param {HTMLElement} field
 */
export const populate = async (field) => {
  const words = await getWords();

  words.forEach((word) => {
    let letters = '';
    word.split('').forEach((letter) => {
      letters += `<span class='letter'>${letter}</span>`;
    });
    letters += `<span class='letter'>&nbsp;</span>`;
    field.innerHTML += `<span class='word'>${letters}</span>`;
  });
};
