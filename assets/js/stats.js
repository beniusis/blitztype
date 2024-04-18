export default class Stats {
  data;

  constructor() {
    this.read();
  }

  /** Read the user's statistics from local storage. */
  read() {
    this.data = JSON.parse(localStorage.getItem('stats')) ?? [];
  }

  /**
   * Save the previous result.
   * @param {object} result
   */
  save(result) {
    this.data.push(result);
    localStorage.setItem('stats', JSON.stringify(this.data));
  }

  /**
   * Get the next ID to assign to a new result.
   * @returns {number} The next ID to assign to a new result.
   */
  getNextId() {
    return this.data.length + 1;
  }
}
