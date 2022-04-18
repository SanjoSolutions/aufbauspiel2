import { createResourcesVector } from './createResourcesVector.js'

/**
 * An inventory.
 */
export class Inventory {
  /**
   * The resources in the inventory.
   *
   * @type {Vector}
   */
  resources = createResourcesVector()

  /**
   * Adds resources to the inventory.
   *
   * @param {Vector} resources - The resources to add.
   */
  add(resources) {
    this.resources = this.resources.add(resources)
  }
}
