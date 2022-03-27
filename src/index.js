import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  Scene,
  WebGLRenderer,
  Vector2,
  Raycaster,
} from 'three'
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new Scene()

let hasSelectedHouse = false
let selectedObject = null

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

const geometry = new BoxGeometry(21, 0.2, 21)
const material = new MeshBasicMaterial({ color: '#ffedb9' })
const plane = new Mesh(geometry, material)
scene.add(plane)

function createBox() {
  const geometry = new BoxGeometry(1, 0.01, 1)
  const material = new MeshBasicMaterial({ color: 'gray' })
  const box = new Mesh(geometry, material)
  box.position.y = plane.geometry.parameters.height / 2 + box.geometry.parameters.height / 2
  return box
}

const box = createBox()
scene.add(box)
selectedObject = box

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
  if (selectedObject) {
    const position = determineMousePositionOnPlane(event)
    if (position) {
      selectedObject.position.x = Math.round(position.x)
      selectedObject.position.z = Math.round(position.z)
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

const $houses = Array.from($menu.querySelectorAll('.house'))

function onMenuClick(event) {
  const target = event.target
  const $house = target.closest('.house')
  if ($house) {
    if (hasSelectedHouse) {
      unselectHouse()
      scene.remove(selectedObject)
      selectedObject = null
      hasSelectedHouse = false
    }

    $house.classList.add('house--selected')

    const color = $house.querySelector('.house-image').style.backgroundColor || 'black'
    const house = createHouse(color)
    scene.remove(selectedObject)
    scene.add(house)
    selectedObject = house
    hasSelectedHouse = true
  }
}

function unselectHouse() {
  $houses.forEach($house => $house.classList.remove('house--selected'))
}

function createHouse(color) {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({ color })
  const house = new Mesh(geometry, material)
  house.position.y = plane.geometry.parameters.height / 2 + house.geometry.parameters.height / 2
  return house
}

document.addEventListener('pointerdown', onPointerDown)

function onPointerDown(event) {
  if (hasSelectedHouse) {
    const position = determineMousePositionOnPlane(event)
    if (position) {
      unselectHouse()
      selectedObject = box
      scene.add(box)
      hasSelectedHouse = false
    }
  }
}

animate()
