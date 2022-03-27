export class Building {
  static determineType(klass) {
    return klass.name
  }

  constructor() {
    this.position = new Position()
    this.yield = new Yield()
  }

  get type() {
    return this.constructor.name
  }
}

export class Building1 extends Building {
  constructor() {
    super()
    this.yield = new Yield(new Vector([1, 0, 0]))
  }
}

export class Building2 extends Building {
  constructor() {
    super()
    this.yield = new Yield(new Vector([0, 1, 0]))
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

export class Position {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
}
