import { useCallback, useState } from 'react'
import * as THREE from 'three'
import ThreeDViewer from './ThreeDViewer'

function arcCurve(start, length, radius = 2.25) {
  const pts = []
  for (let i = 0; i <= 40; i++) {
    const a = start + (length * i) / 40
    pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, Math.sin(a * 3) * 0.06))
  }
  return new THREE.CatmullRomCurve3(pts)
}

export default function Plasmid3D({ activeHotspot, onHotspot }) {
  const [paused, setPaused] = useState(false)
  const buildScene = useCallback(({ scene, camera, renderer }) => {
    camera.position.set(0, 0, 8.4)
    const group = new THREE.Group()
    const segments = [
      { start: 0, length: 1.25, color: 0x6de0bc, id: 'ori' },
      { start: 1.31, length: 1.75, color: 0x8ed7ee, id: 'marker' },
      { start: 3.12, length: 0.62, color: 0xff9c85, id: 'site' },
      { start: 3.8, length: 1.27, color: 0xd9f99d, id: 'insert' },
      { start: 5.13, length: 1.09, color: 0x73c9a9, id: 'backbone' },
    ]
    const meshes = []
    segments.forEach((segment) => {
      const geometry = new THREE.TubeGeometry(arcCurve(segment.start, segment.length), 64, segment.id === 'insert' ? 0.23 : 0.16, 12, false)
      const material = new THREE.MeshStandardMaterial({
        color: segment.color,
        roughness: 0.28,
        metalness: 0.08,
        emissive: segment.id === activeHotspot ? segment.color : 0x000000,
        emissiveIntensity: segment.id === activeHotspot ? 0.55 : 0,
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.userData.id = segment.id
      meshes.push(mesh); group.add(mesh)
    })
    const core = new THREE.Mesh(
      new THREE.TorusGeometry(1.47, 0.012, 8, 100),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.22 }),
    )
    group.add(core)
    group.rotation.x = 0.25
    scene.add(group)

    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    const handleClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(pointer, camera)
      const hit = raycaster.intersectObjects(meshes)[0]
      if (hit?.object.userData.id && hit.object.userData.id !== 'backbone') onHotspot?.(hit.object.userData.id)
    }
    renderer.domElement.addEventListener('pointerdown', handleClick)

    return {
      animate(time) {
        if (!paused) group.rotation.z = time * 0.18
        group.rotation.x = 0.28 + Math.sin(time * 0.4) * 0.08
      },
      dispose() { renderer.domElement.removeEventListener('pointerdown', handleClick) },
    }
  }, [activeHotspot, onHotspot, paused])

  return (
    <div className="relative h-full min-h-[340px]">
      <ThreeDViewer buildScene={buildScene} className="absolute inset-0" ariaLabel="Rotating interactive recombinant plasmid" />
      <button onClick={() => setPaused((v) => !v)} className="absolute bottom-4 right-4 rounded-full border border-white/50 bg-white/80 px-3 py-2 text-xs font-bold text-ink shadow-sm backdrop-blur dark:bg-slate-900/80 dark:text-white">
        {paused ? 'Resume rotation' : 'Pause rotation'}
      </button>
    </div>
  )
}
