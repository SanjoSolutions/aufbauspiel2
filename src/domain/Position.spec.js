import { describe, expect, test } from '@jest/globals'
import { Position } from './Position.js'

describe('Position', () => {
  describe('construction', () => {
    test('a position can be created with two coordinates', () => {
      const x = 1
      const y = 2
      const position = new Position(x, y)
      expect(position).toEqual(new Position(x, y))
    })
  })
})
