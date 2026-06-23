import { useCallback } from 'react'
import * as THREE from 'three'
import ThreeDViewer from './ThreeDViewer'

function cylinderBetween(a, b, radius, material) {
  const distance = a.distanceTo(b)
  const geometry = new THREE.CylinderGeometry(radius, radius, distance, 10)
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.copy(a).add(b).multiplyScalar(0.5)
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize())
  return mesh
}

export default function DNAHelix3D({ cut = false, hero = false }) {
  const buildScene = useCallback(({ scene, camera }) => {
    camera.position.set(hero ? 0 : 0.8, 0, hero ? 10 : 8)
    const group = new THREE.Group()
    group.rotation.z = hero ? -0.22 : 0.1
    const backboneA = new THREE.MeshStandardMaterial({ color: 0x46cda6, roughness: 0.28, metalness: 0.06 })
    const backboneB = new THREE.MeshStandardMaterial({ color: 0x73bce5, roughness: 0.28 })
    const baseWarm = new THREE.MeshStandardMaterial({ color: 0xff967e, roughness: 0.35 })
    const baseLight = new THREE.MeshStandardMaterial({ color: 0xe5f7ad, roughness: 0.35 })
    const recognition = new THREE.MeshStandardMaterial({ color: 0xffd65b, emissive: 0x8a5a00, emissiveIntensity: 0.55 })
    const sphere = new THREE.SphereGeometry(hero ? 0.105 : 0.12, 16, 12)

    const pairs = 25
    for (let i = 0; i < pairs; i++) {
      const y = (i - (pairs - 1) / 2) * 0.26
      const angle = i * 0.55
      const separation = cut && i === 12 ? 0.75 : 0
      const left = new THREE.Vector3(Math.cos(angle) * 1.32 - separation, y, Math.sin(angle) * 1.32)
      const right = new THREE.Vector3(Math.cos(angle + Math.PI) * 1.32 + separation, y, Math.sin(angle + Math.PI) * 1.32)
      const a = new THREE.Mesh(sphere, i >= 10 && i <= 15 ? recognition : backboneA)
      const b = new THREE.Mesh(sphere, i >= 10 && i <= 15 ? recognition : backboneB)
      a.position.copy(left); b.position.copy(right)
      group.add(a, b)
      if (!(cut && i === 12)) group.add(cylinderBetween(left, right, 0.035, i % 2 ? baseWarm : baseLight))
      if (i > 0) {
        const prevY = (i - 1 - (pairs - 1) / 2) * 0.26
        const prevAngle = (i - 1) * 0.55
        const prevL = new THREE.Vector3(Math.cos(prevAngle) * 1.32, prevY, Math.sin(prevAngle) * 1.32)
        const prevR = new THREE.Vector3(Math.cos(prevAngle + Math.PI) * 1.32, prevY, Math.sin(prevAngle + Math.PI) * 1.32)
        group.add(cylinderBetween(prevL, left, 0.055, backboneA), cylinderBetween(prevR, right, 0.055, backboneB))
      }
    }

    const enzymeMat = new THREE.MeshStandardMaterial({ color: 0xff715c, roughness: 0.18, metalness: 0.08 })
    const enzyme = new THREE.Mesh(new THREE.IcosahedronGeometry(0.68, 1), enzymeMat)
    enzyme.scale.set(1.25, 0.8, 0.7)
    group.add(enzyme)
    scene.add(group)

    return {
      animate(time) {
        group.rotation.y = time * (hero ? 0.15 : 0.1)
        const target = cut ? 0.15 : 2.65
        enzyme.position.set(target + Math.sin(time * 1.6) * 0.08, 0.05, 1.15)
        enzyme.rotation.x = time * 0.5
        enzyme.rotation.z = time * 0.35
      },
    }
  }, [cut, hero])

  return <ThreeDViewer buildScene={buildScene} className="h-full w-full" ariaLabel="Animated DNA double helix with an EcoRI restriction enzyme" />
}
