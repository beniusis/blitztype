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
   * Update the user's statistics with the previous result.
   * @param {object} result
   */
  update(result) {
    this.data.push(result);
    localStorage.setItem('stats', JSON.stringify(this.data));
  }
}
