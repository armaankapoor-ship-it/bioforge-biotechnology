import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch {
    return false
  }
}

function fallbackLabels(ariaLabel) {
  const text = ariaLabel.toLowerCase()
  if (text.includes('insulin')) return ['A-chain', 'B-chain', 'S-S']
  if (text.includes('bt') || text.includes('toxin')) return ['protoxin', 'alkaline gut', 'active toxin']
  if (text.includes('viral') || text.includes('vector')) return ['vector', 'gene payload', 'host cell']
  if (text.includes('rna')) return ['dsRNA', 'guide RNA', 'mRNA cut']
  if (text.includes('diagnosis') || text.includes('microplate')) return ['ELISA', 'probe', 'signal']
  if (text.includes('bioreactor')) return ['sparger', 'impeller', 'bubbles']
  if (text.includes('plasmid')) return ['ori', 'marker', 'insert']
  if (text.includes('dna')) return ['recognition site', 'enzyme', 'sticky end']
  return ['model', 'labels', 'animation']
}

function FallbackModel({ ariaLabel }) {
  const labels = fallbackLabels(ariaLabel)

  return (
    <div className="fallback-3d-viewer" role="img" aria-label={`${ariaLabel}. Animated fallback shown because WebGL is unavailable in this browser.`}>
      <div className="fallback-3d-orbit">
        <span className="fallback-ring ring-a" />
        <span className="fallback-ring ring-b" />
        <span className="fallback-core" />
        {labels.map((label, index) => (
          <i key={label} className={`fallback-label label-${index}`}>{label}</i>
        ))}
      </div>
      <p>Interactive model fallback</p>
      <small>Open in a WebGL-enabled browser for the full Three.js model.</small>
    </div>
  )
}

export default function ThreeDViewer({ buildScene, className = '', ariaLabel = 'Interactive 3D biology model', interactiveHint = false }) {
  const mountRef = useRef(null)
  const [webglAvailable, setWebglAvailable] = useState(true)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount || !supportsWebGL()) {
      setWebglAvailable(false)
      return undefined
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.set(0, 0, 9)

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch {
      setWebglAvailable(false)
      return undefined
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    mount.appendChild(renderer.domElement)
    renderer.domElement.tabIndex = 0

    const ambient = new THREE.AmbientLight(0xffffff, 2.1)
    const key = new THREE.DirectionalLight(0xffffff, 2.8)
    key.position.set(4, 6, 8)
    const rim = new THREE.PointLight(0x74e6c0, 35, 18)
    rim.position.set(-4, -2, 5)
    scene.add(ambient, key, rim)

    let elapsed = 0
    let last = performance.now()
    const api = buildScene({ scene, camera, renderer, THREE }) || {}
    const baseCameraZ = camera.position.z
    const controls = {
      dragging: false,
      lastX: 0,
      lastY: 0,
      rotationX: 0,
      rotationY: 0,
      zoom: 0,
    }

    const onPointerDown = (event) => {
      controls.dragging = true
      controls.lastX = event.clientX
      controls.lastY = event.clientY
      renderer.domElement.setPointerCapture?.(event.pointerId)
    }
    const onPointerMove = (event) => {
      if (!controls.dragging) return
      const dx = event.clientX - controls.lastX
      const dy = event.clientY - controls.lastY
      controls.lastX = event.clientX
      controls.lastY = event.clientY
      controls.rotationY += dx * 0.006
      controls.rotationX += dy * 0.004
      controls.rotationX = Math.max(-0.65, Math.min(0.65, controls.rotationX))
    }
    const onPointerUp = (event) => {
      controls.dragging = false
      renderer.domElement.releasePointerCapture?.(event.pointerId)
    }
    const onWheel = (event) => {
      event.preventDefault()
      controls.zoom += event.deltaY * 0.003
      controls.zoom = Math.max(-2.2, Math.min(2.8, controls.zoom))
    }
    renderer.domElement.addEventListener('pointerdown', onPointerDown)
    renderer.domElement.addEventListener('pointermove', onPointerMove)
    renderer.domElement.addEventListener('pointerup', onPointerUp)
    renderer.domElement.addEventListener('pointerleave', onPointerUp)
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false })

    const resize = () => {
      const rect = mount.getBoundingClientRect()
      const width = Math.max(280, Math.min(1400, Math.floor(rect.width || mount.clientWidth || 360)))
      const height = Math.max(280, Math.min(900, Math.floor(rect.height || mount.clientHeight || 360)))
      renderer.setSize(width, height, true)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    const observer = new ResizeObserver(resize)
    observer.observe(mount)
    resize()

    let frame
    const render = (now) => {
      frame = requestAnimationFrame(render)
      const delta = Math.min(0.05, (now - last) / 1000)
      last = now
      elapsed += delta
      api.animate?.(elapsed, delta)
      scene.rotation.x = controls.rotationX
      scene.rotation.y = controls.rotationY
      camera.position.z = baseCameraZ + controls.zoom
      renderer.render(scene, camera)
    }
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      api.dispose?.()
      scene.traverse((object) => {
        object.geometry?.dispose?.()
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose?.())
        else object.material?.dispose?.()
      })
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      renderer.domElement.removeEventListener('pointermove', onPointerMove)
      renderer.domElement.removeEventListener('pointerup', onPointerUp)
      renderer.domElement.removeEventListener('pointerleave', onPointerUp)
      renderer.domElement.removeEventListener('wheel', onWheel)
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [buildScene])

  if (!webglAvailable) return <FallbackModel ariaLabel={ariaLabel} />

  return (
    <div ref={mountRef} className={`three-d-mount ${className}`} role="img" aria-label={ariaLabel}>
      {interactiveHint && <span className="three-d-hint">Drag to rotate · scroll to zoom</span>}
    </div>
  )
}
