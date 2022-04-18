import { describe, expect, it } from '@jest/globals'
import { Building } from './Building.js'
import { Game } from './Game.js'

describe('Game', () => {
  describe('buildBuilding', () => {
    it('builds a building', () => {
      const game = new Game()
      const buildingToBuild = new Building()
      game.buildBuilding(buildingToBuild)
      expect(game.buildings).toContain(buildingToBuild)
    })
  })
})
