/**
 * Class to store data of the result (ID, WPM and accuracy).
 */
export default class Result {
  /**
   *
   * @param {number} id Number (ID) of the result.
   * @param {number} wpm Words per minute.
   * @param {number} accuracy Accuracy percentage.
   */
  constructor(id, wpm, accuracy) {
    this.id = id;
    this.wpm = wpm;
    this.accuracy = accuracy;
  }
}
