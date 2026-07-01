import { useCallback } from 'react'
import * as THREE from 'three'
import ThreeDViewer from './ThreeDViewer'

function cylinderBetween(a, b, radius, material) {
  const distance = a.distanceTo(b)
  const geometry = new THREE.CylinderGeometry(radius, radius, distance, 12)
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.copy(a).add(b).multiplyScalar(0.5)
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize())
  return mesh
}

function beadChain(group, points, material, bridgeMaterial) {
  const bead = new THREE.SphereGeometry(0.18, 18, 14)
  points.forEach((point, index) => {
    const mesh = new THREE.Mesh(bead, material)
    mesh.position.copy(point)
    group.add(mesh)
    if (index > 0) group.add(cylinderBetween(points[index - 1], point, 0.055, bridgeMaterial))
  })
}

function makeMat(color, options = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.28, metalness: 0.05, ...options })
}

function tube(group, points, color = 0x6de0bc, radius = 0.045) {
  const curve = new THREE.CatmullRomCurve3(points)
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 72, radius, 10), makeMat(color))
  group.add(mesh)
  return mesh
}

function orb(group, x, y, z, radius, color, options = {}) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 24, 16), makeMat(color, options))
  mesh.position.set(x, y, z)
  group.add(mesh)
  return mesh
}

function dnaLadder(group, xOffset = 0, yOffset = 0, scale = 1) {
  const left = []
  const right = []
  for (let i = 0; i < 26; i++) {
    const y = (-1.25 + i * 0.1) * scale + yOffset
    const angle = i * 0.68
    const a = new THREE.Vector3(Math.cos(angle) * 0.55 * scale + xOffset, y, Math.sin(angle) * 0.55 * scale)
    const b = new THREE.Vector3(Math.cos(angle + Math.PI) * 0.55 * scale + xOffset, y, Math.sin(angle + Math.PI) * 0.55 * scale)
    left.push(a)
    right.push(b)
    if (i % 2 === 0) tube(group, [a, b], i > 9 && i < 15 ? 0xffd35f : 0xffffff, 0.018 * scale)
  }
  tube(group, left, 0x6de0bc, 0.035 * scale)
  tube(group, right, 0x8ed7ee, 0.035 * scale)
}

function plasmidRing(group, x = 0, y = 0, radius = 0.82) {
  const colors = [0x6de0bc, 0xffd35f, 0xff7f66, 0x8ed7ee]
  for (let i = 0; i < 4; i++) {
    const pts = []
    const start = i * Math.PI * 0.5
    for (let j = 0; j < 28; j++) {
      const a = start + (j / 27) * Math.PI * 0.5
      pts.push(new THREE.Vector3(x + Math.cos(a) * radius, y + Math.sin(a) * radius, Math.sin(a * 3) * 0.08))
    }
    tube(group, pts, colors[i], i === 2 ? 0.09 : 0.055)
  }
}

function microplate(group) {
  const plate = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.18, 2), makeMat(0xffffff, { transparent: true, opacity: 0.88 }))
  group.add(plate)
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 6; c++) {
      const positive = (r + c) % 5 === 0
      const well = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.1, 22), makeMat(positive ? 0xffd35f : 0x8ed7ee, { transparent: true, opacity: positive ? 0.95 : 0.55 }))
      well.position.set(-1.35 + c * 0.54, 0.16, -0.75 + r * 0.5)
      group.add(well)
    }
  }
}

function bioReactor(group) {
  const glass = new THREE.MeshStandardMaterial({ color: 0xb8f2dc, transparent: true, opacity: 0.25, roughness: 0.12 })
  const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 2.4, 48), glass)
  group.add(tank)
  const liquid = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.82, 1.55, 48), makeMat(0x6de0bc, { transparent: true, opacity: 0.28 }))
  liquid.position.y = -0.32
  group.add(liquid)
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.75, 16), makeMat(0x9fb8ae, { metalness: 0.75 }))
  group.add(shaft)
  for (let i = 0; i < 4; i++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.07, 0.18), makeMat(0x9fb8ae, { metalness: 0.75 }))
    blade.position.y = -0.42
    blade.rotation.y = (i / 4) * Math.PI
    group.add(blade)
  }
  for (let i = 0; i < 22; i++) orb(group, -0.55 + (i % 6) * 0.22, -1.1 + (i % 8) * 0.26, Math.sin(i) * 0.42, 0.035 + (i % 3) * 0.01, 0xffffff, { transparent: true, opacity: 0.65 })
}

function buildUniversalScene(sceneType, group) {
  const enzyme = () => orb(group, 0.1, 0.1, 0.55, 0.48, 0xff7f66)
  const cell = () => {
    const host = orb(group, 0.3, 0, 0, 1.25, 0xb8f2dc, { transparent: true, opacity: 0.35 })
    host.scale.set(1.28, 0.82, 0.82)
    orb(group, 0.18, 0.06, 0.35, 0.32, 0xff7f66)
    plasmidRing(group, -0.55, 0.24, 0.42)
  }
  switch (sceneType) {
    case 'dna-cut':
      dnaLadder(group, -0.5)
      enzyme()
      tube(group, [new THREE.Vector3(-0.1, 0.05, 0.65), new THREE.Vector3(0.5, -0.35, 0.65)], 0xffffff, 0.028)
      break
    case 'plasmid-map':
      plasmidRing(group, 0, 0, 1.1)
      orb(group, 0.95, 0.38, 0.25, 0.16, 0xffd35f)
      break
    case 'pcr-cycle':
      dnaLadder(group, -0.85, 0.2, 0.72)
      dnaLadder(group, 0.85, -0.2, 0.72)
      ;[0, 1, 2].forEach((i) => {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(1.25 + i * 0.09, 0.025, 12, 80), makeMat([0xff7f66, 0x8ed7ee, 0x6de0bc][i]))
        ring.rotation.x = Math.PI / 2
        group.add(ring)
      })
      break
    case 'gel-bands':
      microplate(group)
      for (let i = 0; i < 5; i++) {
        const band = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1 + i * 0.05, 0.78), makeMat(0x7c3aed))
        band.position.set(-1.1 + i * 0.52, 0.42, -0.05)
        group.add(band)
      }
      break
    case 'bioreactor':
      bioReactor(group)
      break
    case 'ligase':
      plasmidRing(group, -0.25, 0, 0.9)
      tube(group, [new THREE.Vector3(0.55, 0.42, 0.15), new THREE.Vector3(1.35, 0.2, 0.15)], 0xffd35f, 0.08)
      orb(group, 0.72, 0.38, 0.42, 0.32, 0xffffff)
      break
    case 'transformation':
      cell()
      plasmidRing(group, -1.7, 0.75, 0.32)
      tube(group, [new THREE.Vector3(-1.35, 0.7, 0), new THREE.Vector3(-0.55, 0.35, 0.2)], 0xffd35f, 0.04)
      break
    case 'selection':
      for (let i = 0; i < 18; i++) {
        const alive = i % 4 !== 0
        orb(group, -1.45 + (i % 6) * 0.58, -0.75 + Math.floor(i / 6) * 0.62, 0, 0.16, alive ? 0x6de0bc : 0xff7f66, { transparent: true, opacity: alive ? 0.95 : 0.45 })
      }
      break
    case 'gene-gun':
      cell()
      for (let i = 0; i < 10; i++) tube(group, [new THREE.Vector3(-2, -0.7 + i * 0.15, 0), new THREE.Vector3(-0.6, -0.2 + i * 0.06, 0.12)], 0xffd35f, 0.018)
      break
    case 'agrobacterium':
      const bact = new THREE.Mesh(new THREE.CapsuleGeometry(0.35, 1.2, 12, 24), makeMat(0x6de0bc))
      bact.rotation.z = Math.PI / 2
      bact.position.set(-1.05, 0.48, 0)
      group.add(bact)
      cell()
      tube(group, [new THREE.Vector3(-0.7, 0.48, 0.15), new THREE.Vector3(0.05, 0.18, 0.22)], 0xffd35f, 0.045)
      break
    case 'downstream':
      for (let i = 0; i < 4; i++) {
        const block = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.45, 0.3), makeMat([0x6de0bc, 0x8ed7ee, 0xffd35f, 0xff7f66][i]))
        block.position.set(-1.35 + i * 0.9, 0, 0)
        group.add(block)
      }
      break
    case 'microinjection':
      cell()
      tube(group, [new THREE.Vector3(-2, 0.92, 0.2), new THREE.Vector3(-0.12, 0.1, 0.35)], 0xffffff, 0.025)
      orb(group, -0.05, 0.08, 0.42, 0.08, 0xffd35f)
      break
    case 'probe-binding':
      dnaLadder(group, 0, 0, 0.78)
      tube(group, [new THREE.Vector3(-1.25, -0.82, 0.4), new THREE.Vector3(-0.2, -0.28, 0.4), new THREE.Vector3(0.82, 0.22, 0.4)], 0xffd35f, 0.045)
      break
    case 'insulin-pipeline':
      cell()
      for (let i = 0; i < 8; i++) orb(group, 0.85 + Math.cos(i) * 0.52, -0.85 + Math.sin(i) * 0.15, 0.2, 0.08, 0x8ed7ee)
      break
    default:
      dnaLadder(group, -0.95, 0, 0.72)
      plasmidRing(group, 0.95, 0, 0.64)
      cell()
  }
}

export function UniversalBioModel3D({ sceneType, ariaLabel }) {
  const buildScene = useCallback(({ scene, camera }) => {
    camera.position.set(0, 0.2, 8.6)
    const group = new THREE.Group()
    buildUniversalScene(sceneType, group)
    scene.add(group)
    return {
      animate(time) {
        group.rotation.y = time * 0.24
        group.rotation.x = Math.sin(time * 0.45) * 0.1
        group.children.forEach((child, index) => {
          if (child.geometry?.type === 'SphereGeometry') child.position.y += Math.sin(time * 1.4 + index) * 0.0015
        })
      },
    }
  }, [sceneType])
  return <ThreeDViewer buildScene={buildScene} className="h-full w-full" ariaLabel={ariaLabel || 'Interactive biotechnology 3D model'} interactiveHint />
}

export function Insulin3D() {
  const buildScene = useCallback(({ scene, camera }) => {
    camera.position.set(0, 0.2, 8.8)
    const group = new THREE.Group()
    const chainA = new THREE.MeshStandardMaterial({ color: 0x6de0bc, roughness: 0.28, metalness: 0.05 })
    const chainB = new THREE.MeshStandardMaterial({ color: 0x8ed7ee, roughness: 0.28 })
    const bond = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
    const sulphur = new THREE.MeshStandardMaterial({ color: 0xffd35f, emissive: 0x8a6400, emissiveIntensity: 0.35 })
    const aPoints = Array.from({ length: 10 }, (_, i) => new THREE.Vector3(Math.cos(i * 0.75) * 1.05 - 0.8, (i - 4.5) * 0.22, Math.sin(i * 0.75) * 0.55))
    const bPoints = Array.from({ length: 14 }, (_, i) => new THREE.Vector3(Math.cos(i * 0.55) * 1.25 + 0.75, (i - 6.5) * 0.2, Math.sin(i * 0.55) * 0.7))
    beadChain(group, aPoints, chainA, bond)
    beadChain(group, bPoints, chainB, bond)
    ;[[aPoints[2], bPoints[3]], [aPoints[7], bPoints[9]], [aPoints[5], bPoints[11]]].forEach(([from, to]) => {
      group.add(cylinderBetween(from, to, 0.045, sulphur))
      const s1 = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 10), sulphur)
      const s2 = s1.clone()
      s1.position.copy(from).lerp(to, 0.42)
      s2.position.copy(from).lerp(to, 0.58)
      group.add(s1, s2)
    })
    scene.add(group)
    return {
      animate(time) {
        group.rotation.y = time * 0.28
        group.rotation.x = Math.sin(time * 0.4) * 0.12
      },
    }
  }, [])
  return <ThreeDViewer buildScene={buildScene} className="h-full w-full" ariaLabel="3D model of mature insulin A and B chains with disulphide bonds" interactiveHint />
}

export function BtToxin3D() {
  const buildScene = useCallback(({ scene, camera }) => {
    camera.position.set(0, 0.1, 8.5)
    const group = new THREE.Group()
    const crystalMat = new THREE.MeshStandardMaterial({ color: 0xd9f99d, roughness: 0.22, metalness: 0.06 })
    const activeMat = new THREE.MeshStandardMaterial({ color: 0xff7f66, roughness: 0.18, emissive: 0x622114, emissiveIntensity: 0.22 })
    const gutMat = new THREE.MeshStandardMaterial({ color: 0xffe0d6, roughness: 0.38, transparent: true, opacity: 0.62 })
    const crystal = new THREE.Mesh(new THREE.IcosahedronGeometry(0.86, 1), crystalMat)
    crystal.position.x = -1.7
    crystal.scale.set(1, 1.25, 0.85)
    group.add(crystal)
    const toxin = new THREE.Group()
    toxin.position.x = 1.15
    for (let i = 0; i < 5; i++) {
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.16, 1.18, 18), activeMat)
      spike.rotation.z = (i / 5) * Math.PI * 2
      spike.rotation.x = Math.PI / 2
      spike.position.set(Math.cos(i * 1.25) * 0.56, Math.sin(i * 1.25) * 0.38, Math.sin(i) * 0.25)
      toxin.add(spike)
    }
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.48, 24, 18), activeMat)
    toxin.add(core)
    group.add(toxin)
    const gut = new THREE.Mesh(new THREE.TorusGeometry(2.55, 0.08, 18, 90), gutMat)
    gut.rotation.x = Math.PI / 2
    gut.position.z = -0.55
    group.add(gut)
    const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.6, 24), activeMat)
    arrow.rotation.z = -Math.PI / 2
    arrow.position.set(-0.18, 0, 0)
    group.add(arrow)
    scene.add(group)
    return {
      animate(time) {
        group.rotation.y = Math.sin(time * 0.3) * 0.22
        crystal.rotation.y = time * 0.45
        toxin.rotation.x = time * 0.35
        toxin.rotation.y = time * 0.55
        arrow.position.x = -0.3 + Math.sin(time * 2.1) * 0.25
      },
    }
  }, [])
  return <ThreeDViewer buildScene={buildScene} className="h-full w-full" ariaLabel="3D Bt protoxin crystal activating into toxin in insect gut" interactiveHint />
}

export function ViralVector3D() {
  const buildScene = useCallback(({ scene, camera }) => {
    camera.position.set(0, 0.1, 8.4)
    const group = new THREE.Group()
    const capsidMat = new THREE.MeshStandardMaterial({ color: 0x8ed7ee, roughness: 0.24, metalness: 0.08, transparent: true, opacity: 0.88 })
    const geneMat = new THREE.MeshStandardMaterial({ color: 0xffd35f, emissive: 0x8a6400, emissiveIntensity: 0.28, roughness: 0.25 })
    const hostMat = new THREE.MeshStandardMaterial({ color: 0xb8f2dc, roughness: 0.33, transparent: true, opacity: 0.35 })
    const capsid = new THREE.Mesh(new THREE.IcosahedronGeometry(1.35, 2), capsidMat)
    group.add(capsid)
    const hostCell = new THREE.Mesh(new THREE.SphereGeometry(2.55, 48, 32), hostMat)
    hostCell.position.x = 2.35
    group.add(hostCell)
    const geneCurve = new THREE.CatmullRomCurve3(Array.from({ length: 40 }, (_, i) => new THREE.Vector3(-0.95 + i * 0.05, Math.sin(i * 0.55) * 0.22, Math.cos(i * 0.55) * 0.22)))
    const gene = new THREE.Mesh(new THREE.TubeGeometry(geneCurve, 80, 0.045, 10), geneMat)
    group.add(gene)
    const payload = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.85, 18), geneMat)
    payload.rotation.z = Math.PI / 2
    group.add(payload)
    scene.add(group)
    return {
      animate(time) {
        capsid.rotation.y = time * 0.5
        capsid.rotation.x = Math.sin(time * 0.4) * 0.2
        payload.position.x = 0.7 + Math.sin(time * 1.2) * 1.45
        payload.position.y = Math.sin(time * 2) * 0.08
        gene.rotation.x = time * 0.12
        group.rotation.y = Math.sin(time * 0.25) * 0.18
      },
    }
  }, [])
  return <ThreeDViewer buildScene={buildScene} className="h-full w-full" ariaLabel="3D viral vector delivering a corrective gene to a host cell" interactiveHint />
}

export function RNAi3D() {
  const buildScene = useCallback(({ scene, camera }) => {
    camera.position.set(0, 0, 8.6)
    const group = new THREE.Group()
    const dsMatA = new THREE.MeshStandardMaterial({ color: 0x6de0bc, roughness: 0.3 })
    const dsMatB = new THREE.MeshStandardMaterial({ color: 0x8ed7ee, roughness: 0.3 })
    const targetMat = new THREE.MeshStandardMaterial({ color: 0xff7f66, roughness: 0.3 })
    const cutMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.18 })
    for (let strand = 0; strand < 2; strand++) {
      const points = Array.from({ length: 32 }, (_, i) => new THREE.Vector3(-2.35 + i * 0.07, Math.sin(i * 0.65 + strand * Math.PI) * 0.2 + 0.8, Math.cos(i * 0.65 + strand * Math.PI) * 0.2))
      group.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 80, 0.035, 8), strand ? dsMatB : dsMatA))
    }
    const guide = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.35, 16), dsMatA)
    guide.rotation.z = Math.PI / 2
    guide.position.set(-0.05, -0.05, 0)
    group.add(guide)
    const mrna = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(Array.from({ length: 45 }, (_, i) => new THREE.Vector3(-1.75 + i * 0.08, Math.sin(i * 0.35) * 0.12 - 1.05, 0))), 90, 0.05, 8), targetMat)
    group.add(mrna)
    const scissor = new THREE.Group()
    for (let i = 0; i < 2; i++) {
      const blade = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.9, 16), cutMat)
      blade.position.set(0, -0.75, 0)
      blade.rotation.z = i ? -0.62 : 0.62
      scissor.add(blade)
    }
    group.add(scissor)
    scene.add(group)
    return {
      animate(time) {
        group.rotation.y = Math.sin(time * 0.25) * 0.18
        guide.position.y = -0.15 - Math.abs(Math.sin(time * 1.2)) * 0.7
        scissor.position.set(0.15 + Math.sin(time * 1.5) * 0.18, -0.7, 0.2)
        scissor.rotation.z = Math.sin(time * 4) * 0.22
      },
    }
  }, [])
  return <ThreeDViewer buildScene={buildScene} className="h-full w-full" ariaLabel="3D RNA interference model showing dsRNA guide targeting mRNA" interactiveHint />
}

export function Diagnostic3D() {
  const buildScene = useCallback(({ scene, camera }) => {
    camera.position.set(0, 1.0, 8.8)
    const group = new THREE.Group()
    const plateMat = new THREE.MeshStandardMaterial({ color: 0xe9fbff, roughness: 0.25, metalness: 0.04 })
    const wellMat = new THREE.MeshStandardMaterial({ color: 0x8ed7ee, roughness: 0.2, transparent: true, opacity: 0.72 })
    const positiveMat = new THREE.MeshStandardMaterial({ color: 0xffcf73, emissive: 0x8a5a00, emissiveIntensity: 0.4, roughness: 0.18 })
    const plate = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.22, 2.8), plateMat)
    group.add(plate)
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 6; c++) {
        const well = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.12, 24), (r + c) % 5 === 0 ? positiveMat : wellMat)
        well.position.set(-1.75 + c * 0.7, 0.2, -0.9 + r * 0.6)
        group.add(well)
      }
    }
    const probe = new THREE.Mesh(new THREE.TorusKnotGeometry(0.52, 0.035, 80, 8), positiveMat)
    probe.position.set(0, 1.05, 0)
    group.add(probe)
    scene.add(group)
    return {
      animate(time) {
        group.rotation.y = Math.sin(time * 0.3) * 0.35
        probe.rotation.x = time * 0.8
        probe.rotation.y = time * 0.45
      },
    }
  }, [])
  return <ThreeDViewer buildScene={buildScene} className="h-full w-full" ariaLabel="3D molecular diagnosis microplate with positive wells and probe" interactiveHint />
}

export function CellFactory3D() {
  const buildScene = useCallback(({ scene, camera }) => {
    camera.position.set(0, 0.2, 8.8)
    const group = new THREE.Group()
    const cellMat = new THREE.MeshPhysicalMaterial({ color: 0xb8f2dc, transparent: true, opacity: 0.48, roughness: 0.22, transmission: 0.18 })
    const plasmidMat = new THREE.MeshStandardMaterial({ color: 0xffd35f, emissive: 0x8a6400, emissiveIntensity: 0.25 })
    const ribosomeMat = new THREE.MeshStandardMaterial({ color: 0xff9c85, roughness: 0.3 })
    const productMat = new THREE.MeshStandardMaterial({ color: 0x8ed7ee, roughness: 0.23, metalness: 0.05 })
    const cell = new THREE.Mesh(new THREE.SphereGeometry(2.2, 48, 30), cellMat)
    cell.scale.set(1.35, 0.82, 0.82)
    group.add(cell)
    const plasmid = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.055, 12, 80), plasmidMat)
    plasmid.position.set(-0.75, 0.2, 0.35)
    plasmid.rotation.x = Math.PI / 2
    group.add(plasmid)
    const products = []
    for (let i = 0; i < 12; i++) {
      const ribosome = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 10), ribosomeMat)
      ribosome.position.set(-0.1 + Math.cos(i) * 1.2, Math.sin(i * 1.7) * 0.65, Math.sin(i) * 0.6)
      const product = new THREE.Mesh(new THREE.CapsuleGeometry(0.08, 0.42, 8, 16), productMat)
      product.position.copy(ribosome.position).add(new THREE.Vector3(0.45, 0.12, 0))
      product.userData.phase = i
      products.push(product)
      group.add(ribosome, product)
    }
    scene.add(group)
    return {
      animate(time) {
        group.rotation.y = time * 0.22
        plasmid.rotation.z = time * 0.9
        products.forEach((product) => {
          product.position.y += Math.sin(time * 1.4 + product.userData.phase) * 0.0018
          product.rotation.z = time + product.userData.phase
        })
      },
    }
  }, [])
  return <ThreeDViewer buildScene={buildScene} className="h-full w-full" ariaLabel="3D bacterial cell factory expressing recombinant products" interactiveHint />
}
