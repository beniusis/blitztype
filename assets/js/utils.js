/**
 * Retrieves a custom collection of various English words.
 * @async
 * @function getWords
 * @returns {Promise<Array>}
 */
export async function getWords() {
  const response = await fetch('../assets/data/words.json');
  const data = await response.json();
  const words = data.list;

  // Randomize the order of the words
  for (let i = 0; i < words.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }

  return words;
}
