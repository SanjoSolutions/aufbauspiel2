import { describe, it, test, expect, jest, afterEach, beforeEach } from '@jest/globals'
import { Vector } from './Vector.js'

describe('Vector', () => {
  describe('add', () => {
    it('adds a vector to another one', () => {
      const vectorA = createVectorA()
      const vectorB = createVectorB()
      const result = vectorA.add(vectorB)
      expect(result).toEqual(new Vector([
        3, 5, 7
      ]))
    })

    describe('returns the result as a new vector', () => {
      let vectorA
      let vectorB

      beforeEach(() => {
        vectorA = createVectorA()
        vectorB = createVectorB()
        vectorA.add(vectorB)
      })

      test('vectorA stays the same', () => {
        expect(vectorA).toEqual(createVectorA())
      })

      test('vectorB stays the same', () => {
        expect(vectorB).toEqual(createVectorB())
      })
    })
  })

  describe('multiplyWithScalar', () => {
    let vector
    const scalar = 2

    beforeEach(() => {
      vector = new Vector([2, 3])
    })

    it('multiplies a vector with a scalar and returns the result as a new vector', () => {
      const result = vector.multiplyWithScalar(scalar)
      expect(result).toEqual(new Vector([4, 6]))
    })

    describe('returns the result as a new vector', () => {
      test('vector stays the same', () => {
        vector.multiplyWithScalar(scalar)
        expect(vector).toEqual(new Vector([2, 3]))
      })
    })
  })
})

function createVectorA() {
  return new Vector([1, 2, 3])
}

function createVectorB() {
  return new Vector([2, 3, 4])
}
