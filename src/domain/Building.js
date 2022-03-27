import { Position } from './Position.js'
import { Yield } from './Yield.js'

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
