import { BoxGeometry, Mesh, MeshBasicMaterial, OrthographicCamera, Scene, WebGLRenderer } from 'three'
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new Scene()

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

const geometry = new BoxGeometry(20, 0.2, 20)
const material = new MeshBasicMaterial({ color: '#ffedb9' })
const plane = new Mesh(geometry, material)
scene.add(plane)

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

window.addEventListener('resize', onResize)

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

animate()
