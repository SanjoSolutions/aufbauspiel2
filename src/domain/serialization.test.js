import { describe, expect, it } from '@jest/globals'
import { Building1 } from './Building1.js'
import { serializeBuildings } from './serialization.js'

describe('serializeBuildings', () => {
  it('serializes buildings', () => {
    const buildings = [
      new Building1(),
    ]

    const serializedBuildings = serializeBuildings([
      new Building1(),
    ])

    expect(serializedBuildings).toEqual(
      '[{"position":{"x":0,"y":0},"yield":{"values":{"values":[1,0,0]}},"type":"Building1"}]',
    )
  })
})
