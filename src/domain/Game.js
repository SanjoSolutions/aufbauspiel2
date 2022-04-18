import { Building } from './Building.js'
import { Inventory } from './Inventory.js'
import { Vector } from './Vector.js'
import { Yield } from './Yield.js'

/**
 * A class representing the game.
 */
export class Game {
  /**
   * The building that are built in the game.
   *
   * @type {Building[]}
   */
  buildings = []

  /**
   * The inventory.
   *
   * @type {Inventory}
   */
  inventory = new Inventory()

  /**
   * The total yield.
   *
   * @type {Yield}
   */
  totalYield = new Yield(new Vector([1]))

  /**
   * Updates the inventory.
   *
   * @param {number} timePassed - Time passed since last update in milliseconds.
   */
  updateInventory(timePassed) {
    this.inventory = this.inventory.add(this.totalYield.values.multiplyWithScalar(timePassed / 1000))
  }

  /**
   * Builds a building.
   *
   * @param {Building} building - The building to build.
   */
  buildBuilding(building) {
    this.buildings.push(building)
  }
}
