import { resources } from './resources.js'
import { Vector } from './Vector.js'

export function createResourcesVector() {
  return new Vector(new Array(resources.length).fill(0))
}
