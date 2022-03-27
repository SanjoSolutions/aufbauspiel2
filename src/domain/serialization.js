import { Building1 } from './Building1.js'
import { Building2 } from './Building2.js'

export function serializeBuildings(buildings) {
  const data = buildings.map(building => ({
    ...building,
    type: building.type
  }))
  return JSON.stringify(data)
}

export function deserializeBuildings(data) {
  let buildings = JSON.parse(data)
  buildings.map(transformBuilding)
  return buildings
}

function transformBuilding(buildingData) {
  const buildingType = determineBuildingClass(buildingData.type)
  const building = new buildingType()
  delete building.type
  building.position = buildingData.position
  return building
}

const buildingTypeToClass = new Map([
  ['Building1', Building1],
  ['Building2', Building2]
])

export function determineBuildingClass(buildingType) {
  return buildingTypeToClass.get(buildingType)
}

