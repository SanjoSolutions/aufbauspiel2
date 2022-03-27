export class House {
  constructor() {
    this.yield = new Yield()
  }
}

export class Yield {
  constructor(values = new Vector([0, 0, 0])) {
    this.values = values
  }
}

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
