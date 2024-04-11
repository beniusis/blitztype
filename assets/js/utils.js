/**
 * Retrieves a custom collection of various English words.
 * @async
 * @function getWords
 * @returns Promise<Array>
 */
export async function getWords() {
  const response = await fetch('../assets/data/words.json');
  const data = await response.json();
  return data.list;
}

/**
 * Randomizes the order of words in the array.
 * @function randomizeWords
 * @param words Array
 * @returns Array
 */
export function randomizeWords(words) {
  for (let i = 0; i < words.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }
  return words;
}
