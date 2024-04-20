import { STATS_LS_KEY } from './constants.js';

/**
 * Class to read and save the user's statistics.
 */
export default class Stats {
  data;

  constructor() {
    this.read();
  }

  /** Read the user's statistics from local storage. */
  read() {
    try {
      this.data = JSON.parse(localStorage.getItem(STATS_LS_KEY)) ?? [];
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Save the previous result.
   * @param {object} result Result object.
   */
  save(result) {
    try {
      this.data.push(result);
      localStorage.setItem(STATS_LS_KEY, JSON.stringify(this.data));
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Get the next ID to assign to a new result.
   * @returns {number} The next ID to assign to a new result.
   */
  getNextId() {
    try {
      return this.data[this.data.length - 1].id + 1;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Get the last result object.
   * @returns {object} The last result object.
   */
  getLastResult() {
    try {
      return this.data[this.data.length - 1];
    } catch (error) {
      console.log(error);
    }
  }
}
