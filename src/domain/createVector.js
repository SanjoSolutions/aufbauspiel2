import { resources } from './resources.js'
import { Vector } from './Vector.js'

export function createVector() {
  return new Vector(new Array(resources.length).fill(0))
}
