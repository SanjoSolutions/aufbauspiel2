export class Vector {
  constructor(values) {
    this.values = values
  }

  add(vector) {
    return new Vector(this.values.map((value, index) => value + vector.values[index]))
  }

  multiplyWithScalar(scalar) {
    return new Vector(this.values.map(value => scalar * value))
  }
}
