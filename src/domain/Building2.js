import { Building } from './Building.js'
import { Vector } from './Vector.js'
import { Yield } from './Yield.js'

export class Building2 extends Building {
  constructor() {
    super()
    this.yield = new Yield(new Vector([0, 1, 0]))
  }
}
