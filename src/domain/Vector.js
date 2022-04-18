/**
 * A vector.
 */
export class Vector {
  /**
   * @type {number[]}
   */
  values = []

  /**
   * @param {number[]} values - The values of the vector.
   */
  constructor(values) {
    this.values = values
  }

  /**
   * Adds the vector with another vector and returns the result as a new vector.
   *
   * @param {Vector} vector - The other vector to add with the vector.
   */
  add(vector) {
    return new Vector(this.values.map((value, index) => value + vector.values[index]))
  }

  /**
   * Multiplies the vector with a scalar.
   * Returns the result as a new vector.
   *
   * @param {number} scalar
   */
  multiplyWithScalar(scalar) {
    return new Vector(this.values.map(value => scalar * value))
  }
}
