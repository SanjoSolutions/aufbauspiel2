import { Vector, Yield } from './core.js'

export const resources = [
  'Ressource 1',
]

export function createVector() {
  return new Vector(new Array(resources.length).fill(0))
}

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
