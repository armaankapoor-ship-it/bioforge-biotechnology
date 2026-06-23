import { useCallback } from 'react'
import * as THREE from 'three'
import ThreeDViewer from './ThreeDViewer'

export default function Bioreactor3D({ oxygen = 70, speed = 55 }) {
  const buildScene = useCallback(({ scene, camera }) => {
    camera.position.set(5.4, 3.6, 8.6)
    camera.lookAt(0, 0, 0)
    const rig = new THREE.Group()
    const glass = new THREE.MeshPhysicalMaterial({ color: 0xb9f3e6, transparent: true, opacity: 0.2, roughness: 0.1, transmission: 0.3, side: THREE.DoubleSide })
    const liquid = new THREE.MeshPhysicalMaterial({ color: 0x45c6a1, transparent: true, opacity: 0.28, roughness: 0.25 })
    const steel = new THREE.MeshStandardMaterial({ color: 0x9fb8ae, roughness: 0.25, metalness: 0.75 })
    const tank = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 4.6, 48, 1, true), glass)
    const bottom = new THREE.Mesh(new THREE.SphereGeometry(2, 48, 20, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), glass)
    bottom.scale.y = 0.35; bottom.position.y = -2.3
    const broth = new THREE.Mesh(new THREE.CylinderGeometry(1.86, 1.86, 3.2, 48), liquid)
    broth.position.y = -0.55
    rig.add(tank, bottom, broth)

    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 5.4, 16), steel)
    shaft.position.y = 0.45
    const impeller = new THREE.Group()
    impeller.position.y = -0.75
    for (let i = 0; i < 4; i++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.14, 0.38), steel)
      blade.rotation.y = (Math.PI / 2) * i
      impeller.add(blade)
    }
    rig.add(shaft, impeller)

    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.24, 0.07, 10, 40), steel)
    ring.rotation.x = Math.PI / 2; ring.position.y = -1.95
    rig.add(ring)
    const bubbles = []
    for (let i = 0; i < 34; i++) {
      const bubble = new THREE.Mesh(
        new THREE.SphereGeometry(0.035 + Math.random() * 0.07, 10, 8),
        new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.65, roughness: 0 }),
      )
      bubble.userData = { y: -2 + Math.random() * 3.2, phase: Math.random() * Math.PI * 2, radius: Math.random() * 1.45 }
      bubbles.push(bubble); rig.add(bubble)
    }
    const pipeGeometry = new THREE.CylinderGeometry(0.12, 0.12, 2.3, 16)
    const pipeA = new THREE.Mesh(pipeGeometry, steel); pipeA.position.set(-1.1, 3, 0)
    const pipeB = new THREE.Mesh(pipeGeometry, steel); pipeB.position.set(1.1, 3, 0)
    rig.add(pipeA, pipeB)
    scene.add(rig)

    return {
      animate(time, delta) {
        rig.rotation.y = Math.sin(time * 0.22) * 0.16
        impeller.rotation.y += delta * (1.5 + speed / 16)
        bubbles.forEach((bubble, i) => {
          bubble.userData.y += delta * (0.2 + oxygen / 90) * (0.65 + (i % 5) * 0.11)
          if (bubble.userData.y > 1.15) bubble.userData.y = -2.05
          const a = bubble.userData.phase + time * 0.5
          bubble.position.set(Math.cos(a) * bubble.userData.radius, bubble.userData.y, Math.sin(a) * bubble.userData.radius)
        })
      },
    }
  }, [oxygen, speed])

  return <ThreeDViewer buildScene={buildScene} className="h-full w-full" ariaLabel="Animated transparent stirred-tank bioreactor" />
}
