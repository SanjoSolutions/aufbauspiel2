import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  Raycaster,
  Scene,
  Vector2,
  WebGLRenderer,
} from 'three'
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Building } from '../domain/Building.js'
import { Building1 } from '../domain/Building1.js'
import { Building2 } from '../domain/Building2.js'
import { Game } from '../domain/Game.js'
import { Position } from '../domain/Position.js'
import { deserializeBuildings, determineBuildingClass, serializeBuildings } from '../domain/serialization.js'

const buildingTypeToColor = new Map([
  [Building.determineType(Building1), 'black'],
  [Building.determineType(Building2), 'red'],
])

const game = new Game()

const scene = new Scene()

let hasSelectedBuilding = false
let selectedBuilding = null
let selectedRenderingObject = null

const width = window.innerWidth
const height = window.innerHeight

const aspectRatio = width / height
const distance = 20
const camera = new OrthographicCamera(
  -distance * aspectRatio,
  distance * aspectRatio,
  distance,
  -distance,
  1,
  1000,
)
camera.rotation.order = 'YXZ'
camera.position.set(0, distance, 0)

function setCameraRotation() {
  camera.rotation.y = -Math.PI / 4
  camera.rotation.x = Math.atan(-1 / Math.sqrt(2))
}

const renderer = new WebGLRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

const controls = new MapControls(camera, renderer.domElement)
controls.enableRotate = false
controls.screenSpacePanning = false
controls.addEventListener('change', setCameraRotation)

setCameraRotation()

function createPlane() {
  const geometry = new BoxGeometry(21, 0.2, 21)
  const material = new MeshBasicMaterial({ color: '#ffedb9' })
  const plane = new Mesh(geometry, material)
  return plane
}

const plane = createPlane()
scene.add(plane)

game.buildings = deserializeBuildings(localStorage.getItem('buildings') || '[]')
const buildingRenderingObjects = convertBuildingsToBuildingRenderingObjects(game.buildings)

function convertBuildingsToBuildingRenderingObjects(buildings) {
  return buildings.map(convertBuildingToBuildingRenderingObject)
}

function convertBuildingToBuildingRenderingObject(building) {
  const buildingRenderingObject = createBuilding(buildingTypeToColor.get(building.type))
  buildingRenderingObject.position.x = building.position.x
  buildingRenderingObject.position.z = building.position.y
  return buildingRenderingObject
}

buildingRenderingObjects.forEach(buildingRenderingObjects => scene.add(buildingRenderingObjects))

function createBox() {
  const geometry = new BoxGeometry(1, 0.01, 1)
  const material = new MeshBasicMaterial({ color: 'gray' })
  const box = new Mesh(geometry, material)
  box.position.y = plane.geometry.parameters.height / 2 + box.geometry.parameters.height / 2
  return box
}

const box = createBox()
scene.add(box)
selectedRenderingObject = box

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

window.addEventListener('resize', onResize)

document.addEventListener('pointermove', onPointerMove)

function determineMousePositionOnPlane(event) {
  const mouse = new Vector2()
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  const raycaster = new Raycaster()
  raycaster.setFromCamera(mouse.clone(), camera)
  const intersects = raycaster.intersectObject(plane)
  if (intersects.length >= 1) {
    const { point } = intersects[0]
    return point
  } else {
    return null
  }
}

function onPointerMove() {
  if (selectedRenderingObject) {
    const position = determineMousePositionOnPlane(event)
    if (position) {
      const x = Math.round(position.x)
      const y = Math.round(position.z)
      if (selectedBuilding) {
        selectedBuilding.position = new Position(x, y)
      }
      selectedRenderingObject.position.x = x
      selectedRenderingObject.position.z = y
    }
  }
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

const $menu = document.querySelector('.menu')
$menu.addEventListener('click', onMenuClick)

const $buildings = Array.from($menu.querySelectorAll('.building'))

function onMenuClick(event) {
  const target = event.target
  const $building = target.closest('.building')
  if ($building) {
    if (hasSelectedBuilding) {
      unselectBuilding()
      scene.remove(selectedRenderingObject)
      selectedBuilding = null
      selectedRenderingObject = null
      hasSelectedBuilding = false
    }

    $building.classList.add('building--selected')

    const buildingType = $building.getAttribute('data-type')
    const buildingClass = determineBuildingClass(buildingType)
    const building = new buildingClass()
    const buildingRenderingObject = convertBuildingToBuildingRenderingObject(building)
    scene.remove(selectedRenderingObject)
    scene.add(buildingRenderingObject)
    selectedBuilding = building
    selectedRenderingObject = buildingRenderingObject
    hasSelectedBuilding = true
  }
}

function unselectBuilding() {
  $buildings.forEach($building => $building.classList.remove('building--selected'))
}

function createBuilding(color) {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({ color })
  const building = new Mesh(geometry, material)
  building.position.y = plane.geometry.parameters.height / 2 + building.geometry.parameters.height / 2
  return building
}

document.addEventListener('pointerdown', onPointerDown)

function onPointerDown(event) {
  if (hasSelectedBuilding) {
    const position = determineMousePositionOnPlane(event)
    if (position) {
      game.buildBuilding(selectedBuilding)
      buildingRenderingObjects.push(selectedRenderingObject)
      localStorage.setItem('buildings', serializeBuildings(game.buildings))
      unselectBuilding()
      selectedBuilding = null
      selectedRenderingObject = box
      scene.add(box)
      hasSelectedBuilding = false
    }
  }
}

animate()

let lastUpdate = new Date()
setInterval(onTick, 1000)

function onTick() {
  const now = new Date()
  const timePassed = now - lastUpdate
  game.updateInventory(timePassed)
  // console.log(inventory.values)
  lastUpdate = now
}
