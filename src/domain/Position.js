/**
 * A position.
 */
export class Position {
  /**
   * @type {number}
   */
  x = 0

  /**
   * @type {number}
   */
  y = 0

  /**
   * @param {number} x - X coordinate of the position.
   * @param {number} y - Y coordinate of the position.
   */
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
}
