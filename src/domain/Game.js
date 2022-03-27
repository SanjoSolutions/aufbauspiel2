import { createVector } from './createVector.js'
import { Vector } from './Vector.js'
import { Yield } from './Yield.js'

export class Game {
  constructor() {
    this.buildings = []
    this.inventory = createVector()
    this.totalYield = new Yield(new Vector([1]))
  }

  updateInventory(timePassed) {
    this.inventory = this.inventory.add(this.totalYield.values.multiplyWithScalar(timePassed / 1000))
  }
}
