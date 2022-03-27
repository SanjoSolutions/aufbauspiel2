import { Building } from './Building.js'
import { Vector } from './Vector.js'
import { Yield } from './Yield.js'

export class Building1 extends Building {
  constructor() {
    super()
    this.yield = new Yield(new Vector([1, 0, 0]))
  }
}
