import { useEffect, useMemo, useRef, useState } from 'react'
import mermaid from 'mermaid'
import * as THREE from 'three'
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  HeartPulse,
  Menu,
  Moon,
  Move3D,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  X,
} from 'lucide-react'

const navItems = [
  ['home', 'Home'],
  ['roadmap', 'Map'],
  ['concepts', 'Concepts'],
  ['models', '3D'],
  ['yield', 'Yield'],
  ['quiz', 'Quiz'],
  ['revise', 'Revise'],
]

export default function VisualChapterApp({ content }) {
  const [dark, setDark] = useState(() => localStorage.getItem(`${content.slug}-theme`) === 'dark')
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem(`${content.slug}-theme`, dark ? 'dark' : 'light')
  }, [dark, content.slug])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-18% 0px -70%', threshold: [0.08, 0.24] })
    navItems.forEach(([id]) => {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    })
    return () => observer.disconnect()
  }, [])

  const style = {
    '--accent': content.theme.accent,
    '--accent-2': content.theme.accent2,
    '--accent-3': content.theme.accent3,
    '--soft': content.theme.soft,
    '--ink': content.theme.ink,
    '--dark': content.theme.dark,
  }

  return (
    <div className="vc-app" style={style}>
      <header className="vc-header">
        <nav className="vc-nav">
          <a href="#home" className="vc-brand" aria-label={`${content.brand} home`}>
            <span className="vc-logo"><HeartPulse size={22} /></span>
            <span>{content.brand}<b>{content.chapterShort}</b></span>
          </a>
          <div className="vc-links">
            {navItems.map(([id, label]) => <a key={id} className={active === id ? 'active' : ''} href={`#${id}`}>{label}</a>)}
          </div>
          <div className="vc-actions">
            <span>{content.chapterNo}</span>
            <button onClick={() => setDark((value) => !value)} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="vc-menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Open navigation">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="vc-mobile-nav">
            {navItems.map(([id, label]) => <a key={id} onClick={() => setMenuOpen(false)} className={active === id ? 'active' : ''} href={`#${id}`}>{label}</a>)}
          </div>
        )}
      </header>
      <main>
        <Hero content={content} />
        <Roadmap content={content} />
        <Concepts content={content} />
        <ModelGallery content={content} />
        <HighYield content={content} />
        <QuizSection content={content} />
        <RevisionDashboard content={content} />
      </main>
      <Footer content={content} />
    </div>
  )
}

function Hero({ content }) {
  return (
    <section id="home" className="vc-hero">
      <div className="vc-orb vc-orb-a" />
      <div className="vc-orb vc-orb-b" />
      <div className="vc-hero-grid">
        <div className="vc-hero-copy">
          <div className="vc-badge"><Sparkles size={15} /> {content.heroBadge}</div>
          <h1>{content.title}</h1>
          <p>{content.subtitle}</p>
          <div className="vc-hero-buttons">
            <a className="vc-primary" href="#roadmap">Start learning <ArrowRight size={18} /></a>
            <a className="vc-secondary" href="#models">Open 3D lab <Move3D size={18} /></a>
          </div>
          <div className="vc-stats">
            <Stat value={content.stats.modules} label="guided modules" />
            <Stat value={content.stats.models} label="3D models" />
            <Stat value="100%" label="free stack" />
          </div>
        </div>
        <div className="vc-hero-visual">
          <ThreePanel title={content.heroModel.title} subtitle={content.heroModel.subtitle}>
            <ThreeDViewer sceneType={content.heroModel.scene} />
          </ThreePanel>
          <div className="vc-float vc-float-left"><Activity size={17} /> {content.floating[0]}</div>
          <div className="vc-float vc-float-right"><ShieldCheck size={17} /> {content.floating[1]}</div>
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }) {
  return (
    <div className="vc-stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

function Roadmap({ content }) {
  return (
    <Section id="roadmap" eyebrow="Chapter roadmap" title={content.roadmapTitle} description={content.roadmapDescription}>
      <div className="vc-roadmap-grid">
        <div className="vc-card vc-mermaid-card">
          <MermaidDiagram chart={content.flowchart} />
        </div>
        <div className="vc-roadmap-list">
          {content.roadmap.map((item, index) => (
            <a className="vc-roadmap-card" href="#concepts" key={item.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </div>
              <ChevronRight size={18} />
            </a>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Concepts({ content }) {
  return (
    <Section id="concepts" eyebrow="Visual notes" title={content.conceptTitle} description={content.conceptDescription}>
      <div className="vc-concept-grid">
        {content.sections.map((item, index) => (
          <article className="vc-concept-card" key={item.title}>
            <div className="vc-concept-top">
              <div className="vc-mini-badge"><BadgeCheck size={15} /> {item.eyebrow}</div>
              <span>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <ul>
              {item.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
            <div className="vc-neet"><Target size={16} /> {item.neet}</div>
          </article>
        ))}
      </div>
    </Section>
  )
}

function ModelGallery({ content }) {
  return (
    <Section id="models" eyebrow="Interactive 3D lab" title={content.modelTitle} description={content.modelDescription}>
      <div className="vc-model-grid">
        {content.models.map((model) => (
          <ThreePanel key={model.title} title={model.title} subtitle={model.description}>
            <ThreeDViewer sceneType={model.scene} />
          </ThreePanel>
        ))}
      </div>
    </Section>
  )
}

function HighYield({ content }) {
  return (
    <Section id="yield" eyebrow="NEET high-yield" title="Fast facts that become exam lines." description="Use these after understanding the visuals. They are designed for quick active recall.">
      <div className="vc-yield-grid">
        {content.highYield.map((fact, index) => (
          <div className="vc-yield-card" key={fact}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{fact}</p>
          </div>
        ))}
      </div>
      <div className="vc-mistake-grid">
        {content.mistakes.map((item) => (
          <div className="vc-mistake" key={item.title}>
            <Brain size={20} />
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

function QuizSection({ content }) {
  const [answers, setAnswers] = useState({})
  const score = content.quiz.reduce((sum, q, index) => sum + (answers[index] === q.answer ? 1 : 0), 0)
  return (
    <Section id="quiz" eyebrow="Practice" title="Chapter quiz with instant explanations." description="Try the questions, check the explanation, then reset and repeat for exam-day memory.">
      <div className="vc-score">
        <div>
          <p>Score tracker</p>
          <h3>{score} / {content.quiz.length}</h3>
        </div>
        <button onClick={() => setAnswers({})}><RefreshCcw size={17} /> Reset</button>
      </div>
      <div className="vc-quiz-grid">
        {content.quiz.map((q, index) => (
          <QuizCard key={q.question} q={q} index={index} selected={answers[index]} onSelect={(value) => setAnswers((prev) => ({ ...prev, [index]: value }))} />
        ))}
      </div>
    </Section>
  )
}

function QuizCard({ q, index, selected, onSelect }) {
  const answered = selected !== undefined
  return (
    <article className="vc-quiz-card">
      <div className="vc-question-number">Q{index + 1}</div>
      <h3>{q.question}</h3>
      <div className="vc-options">
        {q.options.map((option, optionIndex) => {
          const right = answered && optionIndex === q.answer
          const wrong = answered && optionIndex === selected && optionIndex !== q.answer
          return <button key={option} className={`${right ? 'right' : ''} ${wrong ? 'wrong' : ''}`} onClick={() => onSelect(optionIndex)}>{option}</button>
        })}
      </div>
      {answered && <p className="vc-explain"><CheckCircle2 size={16} /> {q.explain}</p>}
    </article>
  )
}

function RevisionDashboard({ content }) {
  const [card, setCard] = useState(0)
  const current = content.flashcards[card]
  return (
    <Section id="revise" eyebrow="Revision dashboard" title="One last compressed revision pass." description="Review the summary table, click flashcards, and lock the chapter transformations.">
      <div className="vc-revision-grid">
        <div className="vc-card vc-revision-table">
          <h3><BookOpen size={22} /> Process summary</h3>
          {content.revisionTable.map(([left, right]) => (
            <div className="vc-row" key={left}>
              <strong>{left}</strong>
              <span>{right}</span>
            </div>
          ))}
        </div>
        <button className="vc-flashcard" onClick={() => setCard((card + 1) % content.flashcards.length)}>
          <span>Tap / click for next flashcard</span>
          <h3>{current.front}</h3>
          <p>{current.back}</p>
        </button>
      </div>
      <div className="vc-transform-grid">
        {content.transforms.map(([from, to]) => (
          <div className="vc-transform" key={from}>
            <span>{from}</span>
            <ArrowRight size={18} />
            <strong>{to}</strong>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Section({ id, eyebrow, title, description, children }) {
  return (
    <section id={id} className="vc-section">
      <div className="vc-container">
        <div className="vc-section-head">
          <span>{eyebrow}</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        {children}
      </div>
    </section>
  )
}

function MermaidDiagram({ chart }) {
  const ref = useRef(null)
  const id = useMemo(() => `chart-${Math.random().toString(36).slice(2)}`, [])
  useEffect(() => {
    let alive = true
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      securityLevel: 'loose',
      themeVariables: {
        primaryColor: '#ffffff',
        primaryTextColor: '#16231d',
        primaryBorderColor: '#c7d2fe',
        lineColor: '#64748b',
        secondaryColor: '#fdf2f8',
        tertiaryColor: '#ecfeff',
      },
    })
    mermaid.render(id, chart).then(({ svg }) => {
      if (alive && ref.current) ref.current.innerHTML = svg
    }).catch(() => {
      if (alive && ref.current) ref.current.textContent = 'Flowchart could not render.'
    })
    return () => { alive = false }
  }, [chart, id])
  return <div className="vc-mermaid" ref={ref} />
}

function ThreePanel({ title, subtitle, children }) {
  return (
    <div className="vc-three-panel">
      <div className="vc-three-head">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <Move3D size={20} />
      </div>
      {children}
    </div>
  )
}

function ThreeDViewer({ sceneType }) {
  const mountRef = useRef(null)
  const drag = useRef({ active: false, x: 0 })

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const width = Math.max(320, mount.clientWidth)
    const height = Math.max(320, mount.clientHeight)
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0xffffff, 10, 24)
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100)
    camera.position.set(0, 1.1, 8.6)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(width, height)
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)
    scene.add(new THREE.AmbientLight(0xffffff, 1.7))
    const key = new THREE.DirectionalLight(0xffffff, 2.4)
    key.position.set(5, 6, 4)
    const rim = new THREE.PointLight(0xff4fa3, 2.2, 14)
    rim.position.set(-4, 2, 5)
    scene.add(key, rim)

    buildScene(sceneType, group)
    const grid = new THREE.GridHelper(7, 14, 0xf9a8d4, 0xdbeafe)
    grid.position.y = -2.35
    grid.material.opacity = 0.18
    grid.material.transparent = true
    scene.add(grid)

    const onDown = (event) => { drag.current = { active: true, x: event.clientX } }
    const onMove = (event) => {
      if (!drag.current.active) return
      group.rotation.y += (event.clientX - drag.current.x) * 0.008
      drag.current.x = event.clientX
    }
    const onUp = () => { drag.current.active = false }
    const onWheel = (event) => {
      event.preventDefault()
      camera.position.z = Math.min(12, Math.max(5.4, camera.position.z + event.deltaY * 0.004))
    }
    renderer.domElement.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false })

    let t = 0
    let raf = 0
    const animate = () => {
      t += 0.012
      group.rotation.y += drag.current.active ? 0 : 0.003
      group.children.forEach((child, index) => {
        if (child.userData.float) child.position.y += Math.sin(t + index) * 0.0015
        if (child.userData.pulse) child.scale.setScalar(1 + Math.sin(t * 3 + index) * 0.035)
      })
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    const resize = new ResizeObserver(() => {
      const w = Math.max(320, mount.clientWidth)
      const h = Math.max(320, mount.clientHeight)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    })
    resize.observe(mount)

    return () => {
      cancelAnimationFrame(raf)
      resize.disconnect()
      renderer.domElement.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      renderer.domElement.removeEventListener('wheel', onWheel)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [sceneType])

  return <div className="vc-canvas" ref={mountRef} />
}

function mat(color, options = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.48, metalness: 0.04, ...options })
}

function addLabel(group, text, position) {
  const canvas = document.createElement('canvas')
  canvas.width = 560
  canvas.height = 130
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'rgba(255,255,255,.92)'
  ctx.strokeStyle = '#c7d2fe'
  ctx.lineWidth = 5
  roundRect(ctx, 14, 20, 532, 88, 40)
  ctx.fill()
  ctx.stroke()
  ctx.fillStyle = '#16231d'
  ctx.font = '800 32px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, 280, 64)
  const texture = new THREE.CanvasTexture(canvas)
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture }))
  sprite.position.set(...position)
  sprite.scale.set(1.75, 0.42, 1)
  group.add(sprite)
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function buildScene(type, group) {
  const scenes = {
    humanOverview,
    maleSystem,
    femaleSystem,
    spermatogenesis,
    oogenesis,
    menstrualCycle,
    fertilization,
    implantation,
    pregnancy,
    reproductiveHealth,
    contraception,
    sti,
    population,
    artLab,
    safeClinic,
  }
  ;(scenes[type] || humanOverview)(group)
}

function humanOverview(group) {
  maleSystem(group, -1.35)
  femaleSystem(group, 1.35)
  addLabel(group, 'male + female systems', [0, 2.05, 0])
}

function maleSystem(group, xOffset = 0) {
  const tubeMat = mat(0x38bdf8)
  const glandMat = mat(0xf59e0b)
  const testisMat = mat(0x60a5fa)
  for (let i = 0; i < 2; i++) {
    const testis = new THREE.Mesh(new THREE.SphereGeometry(0.45, 32, 20), testisMat)
    testis.position.set(xOffset + (i ? 0.48 : -0.48), -1.25, 0)
    testis.scale.set(0.72, 1, 0.62)
    testis.userData.pulse = true
    group.add(testis)
  }
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 2.1, 28), tubeMat)
  shaft.position.set(xOffset, -0.15, 0)
  group.add(shaft)
  const gland = new THREE.Mesh(new THREE.SphereGeometry(0.36, 32, 18), glandMat)
  gland.position.set(xOffset, 1.08, 0)
  group.add(gland)
  const ductCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(xOffset - 0.45, -1.25, 0.08),
    new THREE.Vector3(xOffset - 1.0, -0.45, 0.1),
    new THREE.Vector3(xOffset - 0.35, 0.65, 0.05),
    new THREE.Vector3(xOffset, 1.08, 0),
  ])
  group.add(new THREE.Mesh(new THREE.TubeGeometry(ductCurve, 64, 0.045, 12), tubeMat))
  addLabel(group, 'testis', [xOffset - 1.7, -1.45, 0])
  addLabel(group, 'duct + gland', [xOffset + 1.35, 0.7, 0])
}

function femaleSystem(group, xOffset = 0) {
  const ovaryMat = mat(0xec4899)
  const tubeMat = mat(0xf9a8d4)
  const uterusMat = mat(0xfb7185, { transparent: true, opacity: 0.78 })
  const uterus = new THREE.Mesh(new THREE.SphereGeometry(0.72, 42, 24), uterusMat)
  uterus.position.set(xOffset, -0.25, 0)
  uterus.scale.set(0.82, 1.35, 0.62)
  group.add(uterus)
  const canal = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.22, 1.4, 26), tubeMat)
  canal.position.set(xOffset, -1.45, 0)
  group.add(canal)
  for (let side of [-1, 1]) {
    const ovary = new THREE.Mesh(new THREE.SphereGeometry(0.28, 28, 18), ovaryMat)
    ovary.position.set(xOffset + side * 1.1, 0.35, 0)
    ovary.userData.float = true
    group.add(ovary)
    const tubeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(xOffset + side * 0.22, 0.45, 0),
      new THREE.Vector3(xOffset + side * 0.72, 0.92, 0),
      new THREE.Vector3(xOffset + side * 1.1, 0.35, 0),
    ])
    group.add(new THREE.Mesh(new THREE.TubeGeometry(tubeCurve, 50, 0.055, 12), tubeMat))
  }
  addLabel(group, 'ovary', [xOffset + 1.65, 0.45, 0])
  addLabel(group, 'uterus', [xOffset - 1.45, -0.35, 0])
}

function spermatogenesis(group) {
  const tubule = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.18, 18, 90), mat(0x38bdf8, { transparent: true, opacity: 0.78 }))
  tubule.rotation.x = Math.PI / 2
  group.add(tubule)
  for (let i = 0; i < 14; i++) {
    const angle = (i / 14) * Math.PI * 2
    const cell = new THREE.Mesh(new THREE.SphereGeometry(0.14 + (i % 4) * 0.025, 20, 12), mat(i % 3 === 0 ? 0xf59e0b : 0x60a5fa))
    cell.position.set(Math.cos(angle) * 1.1, Math.sin(angle) * 0.18, Math.sin(angle) * 1.1)
    cell.userData.pulse = i % 4 === 0
    group.add(cell)
  }
  for (let i = 0; i < 8; i++) addSperm(group, -1 + i * 0.28, -1.15 + Math.sin(i) * 0.08, 0.2)
  addLabel(group, 'seminiferous tubule', [0, 1.75, 0])
  addLabel(group, 'spermatozoa', [0, -1.85, 0])
}

function oogenesis(group) {
  const ovary = new THREE.Mesh(new THREE.SphereGeometry(1.25, 48, 30), mat(0xf9a8d4, { transparent: true, opacity: 0.62 }))
  ovary.scale.set(1.15, 0.85, 0.62)
  group.add(ovary)
  const stages = [
    [-0.75, 0.1, 0.28, 0x38bdf8],
    [-0.1, -0.35, 0.38, 0xf59e0b],
    [0.62, 0.28, 0.5, 0xec4899],
  ]
  stages.forEach(([x, y, s, c], i) => {
    const follicle = new THREE.Mesh(new THREE.SphereGeometry(s, 32, 18), mat(c, { transparent: true, opacity: 0.78 }))
    follicle.position.set(x, y, 0.28)
    follicle.userData.pulse = i === 2
    group.add(follicle)
  })
  addLabel(group, 'follicle growth', [0, 1.65, 0])
  addLabel(group, 'ovum release', [1.6, -0.85, 0])
}

function menstrualCycle(group) {
  const colors = [0x38bdf8, 0xf59e0b, 0xec4899, 0x22c55e]
  for (let i = 0; i < 4; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.2 + i * 0.045, 0.035, 12, 80), mat(colors[i]))
    ring.rotation.x = Math.PI / 2
    ring.rotation.z = i * 0.35
    group.add(ring)
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.16, 24, 14), mat(colors[i]))
    const angle = i * Math.PI / 2
    dot.position.set(Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, 0.22)
    dot.userData.pulse = true
    group.add(dot)
  }
  addLabel(group, 'menstrual', [-1.7, 1.2, 0])
  addLabel(group, 'follicular', [1.65, 1.2, 0])
  addLabel(group, 'ovulation', [1.7, -1.15, 0])
  addLabel(group, 'luteal', [-1.55, -1.15, 0])
}

function fertilization(group) {
  const ovum = new THREE.Mesh(new THREE.SphereGeometry(1.05, 48, 30), mat(0xf9a8d4, { transparent: true, opacity: 0.78 }))
  group.add(ovum)
  const zona = new THREE.Mesh(new THREE.TorusGeometry(1.16, 0.045, 16, 100), mat(0xffffff))
  zona.rotation.x = Math.PI / 2
  group.add(zona)
  for (let i = 0; i < 7; i++) addSperm(group, -2.4 + i * 0.35, -0.95 + Math.sin(i) * 0.45, 0.2)
  const nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.28, 28, 16), mat(0xec4899))
  nucleus.userData.pulse = true
  group.add(nucleus)
  addLabel(group, 'ovum', [1.75, 1.15, 0])
  addLabel(group, 'sperm entry', [-1.8, -1.65, 0])
}

function implantation(group) {
  const uterus = new THREE.Mesh(new THREE.SphereGeometry(1.35, 48, 30), mat(0xfb7185, { transparent: true, opacity: 0.55 }))
  uterus.scale.set(0.92, 1.28, 0.55)
  group.add(uterus)
  const lining = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.09, 16, 90), mat(0xec4899))
  lining.rotation.x = Math.PI / 2
  lining.position.y = -0.1
  group.add(lining)
  const blast = new THREE.Mesh(new THREE.SphereGeometry(0.34, 32, 18), mat(0x38bdf8, { transparent: true, opacity: 0.86 }))
  blast.position.set(0.2, 0.05, 0.52)
  blast.userData.pulse = true
  group.add(blast)
  addLabel(group, 'blastocyst', [1.75, 0.35, 0])
  addLabel(group, 'endometrium', [-1.7, -0.65, 0])
}

function pregnancy(group) {
  const womb = new THREE.Mesh(new THREE.SphereGeometry(1.22, 48, 30), mat(0xf9a8d4, { transparent: true, opacity: 0.5 }))
  womb.scale.set(0.85, 1.22, 0.66)
  group.add(womb)
  const fetus = new THREE.Group()
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.25, 24, 16), mat(0xffedd5))
  head.position.set(0.15, 0.35, 0.3)
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 0.7, 12, 24), mat(0xffedd5))
  body.position.set(-0.02, -0.15, 0.3)
  body.rotation.z = -0.45
  fetus.add(head, body)
  fetus.userData.float = true
  group.add(fetus)
  const placenta = new THREE.Mesh(new THREE.SphereGeometry(0.34, 30, 16), mat(0xec4899))
  placenta.position.set(-0.55, 0.75, 0.25)
  group.add(placenta)
  addLabel(group, 'placenta', [-1.75, 1.1, 0])
  addLabel(group, 'embryo/fetus', [1.75, -0.5, 0])
}

function reproductiveHealth(group) {
  const shield = new THREE.Mesh(new THREE.ConeGeometry(1.05, 1.7, 5), mat(0x22c55e, { transparent: true, opacity: 0.82 }))
  shield.rotation.z = Math.PI
  shield.position.y = 0.05
  group.add(shield)
  const crossA = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.05, 0.18), mat(0xffffff))
  const crossB = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.22, 0.18), mat(0xffffff))
  crossA.position.z = 0.5
  crossB.position.z = 0.5
  group.add(crossA, crossB)
  addLabel(group, 'physical + emotional health', [0, 1.85, 0])
  addLabel(group, 'safe choices', [0, -1.75, 0])
}

function contraception(group) {
  const pill = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.8, 16, 24), mat(0x38bdf8))
  pill.rotation.z = Math.PI / 2
  pill.position.set(-1.05, 0.8, 0)
  group.add(pill)
  const iud = new THREE.Group()
  iud.add(new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.1, 12), mat(0xf59e0b)))
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.78, 12), mat(0xf59e0b))
  arm.rotation.z = Math.PI / 2
  arm.position.y = 0.45
  iud.add(arm)
  iud.position.set(0.2, 0.05, 0)
  group.add(iud)
  const barrier = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.055, 16, 60), mat(0xec4899))
  barrier.position.set(1.25, -0.65, 0)
  group.add(barrier)
  addLabel(group, 'pills', [-1.55, 1.55, 0])
  addLabel(group, 'IUD', [0.2, -1.45, 0])
  addLabel(group, 'barrier', [1.65, 0.35, 0])
}

function sti(group) {
  for (let i = 0; i < 4; i++) {
    const virus = new THREE.Mesh(new THREE.SphereGeometry(0.38, 24, 16), mat(i % 2 ? 0xef4444 : 0xf59e0b))
    virus.position.set(Math.cos(i * 1.6) * 1.05, Math.sin(i * 1.6) * 0.9, 0)
    virus.userData.pulse = true
    group.add(virus)
    for (let j = 0; j < 9; j++) {
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.2, 8), mat(0x7f1d1d))
      const a = (j / 9) * Math.PI * 2
      spike.position.set(virus.position.x + Math.cos(a) * 0.48, virus.position.y + Math.sin(a) * 0.48, 0)
      spike.rotation.z = -a + Math.PI / 2
      group.add(spike)
    }
  }
  addLabel(group, 'STI prevention', [0, 1.85, 0])
  addLabel(group, 'early diagnosis', [0, -1.75, 0])
}

function population(group) {
  const bars = [0.55, 0.9, 1.35, 1.75]
  bars.forEach((h, i) => {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.36, h, 0.34), mat(i < 2 ? 0x38bdf8 : 0xec4899))
    bar.position.set(-1.1 + i * 0.72, -1 + h / 2, 0)
    group.add(bar)
  })
  for (let i = 0; i < 5; i++) {
    const person = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 12), mat(0xf59e0b))
    person.position.set(-1.3 + i * 0.65, 1.05 + Math.sin(i) * 0.16, 0)
    person.userData.float = true
    group.add(person)
  }
  addLabel(group, 'population growth', [0, 1.85, 0])
  addLabel(group, 'birth control', [0, -1.75, 0])
}

function artLab(group) {
  const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.28, 2.25, 32), mat(0x38bdf8, { transparent: true, opacity: 0.45 }))
  tube.position.set(-0.75, 0, 0)
  group.add(tube)
  const embryo = new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 16), mat(0xf59e0b))
  embryo.position.set(-0.75, -0.6, 0.25)
  embryo.userData.pulse = true
  group.add(embryo)
  const dish = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.07, 16, 70), mat(0xec4899))
  dish.rotation.x = Math.PI / 2
  dish.position.set(0.95, -0.45, 0)
  group.add(dish)
  addLabel(group, 'IVF / ZIFT / IUT', [0, 1.75, 0])
  addLabel(group, 'embryo handling', [0.45, -1.55, 0])
}

function safeClinic(group) {
  reproductiveHealth(group)
  const clipboard = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.1, 0.08), mat(0xffffff))
  clipboard.position.set(1.25, -0.2, 0.45)
  group.add(clipboard)
  for (let i = 0; i < 3; i++) {
    const line = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.045, 0.04), mat(0x22c55e))
    line.position.set(1.25, 0.1 - i * 0.24, 0.52)
    group.add(line)
  }
  addLabel(group, 'counselling + care', [0, -2.05, 0])
}

function addSperm(group, x, y, z) {
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.12, 18, 12), mat(0x38bdf8))
  head.scale.set(1.25, 0.8, 0.8)
  head.position.set(x, y, z)
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(x - 0.1, y, z),
    new THREE.Vector3(x - 0.35, y + 0.08, z),
    new THREE.Vector3(x - 0.68, y - 0.08, z),
    new THREE.Vector3(x - 0.95, y + 0.04, z),
  ])
  const tail = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.018, 8), mat(0x38bdf8))
  head.userData.float = true
  group.add(head, tail)
}

function Footer({ content }) {
  return (
    <footer className="vc-footer">
      <div>
        <strong>{content.brand} · {content.chapterNo}</strong>
        <p>Original NCERT-aligned visual learning resource built with free and open-source tools. Diagrams are independent schematic learning aids.</p>
      </div>
      <a href="#home">Back to top <ArrowRight size={16} /></a>
    </footer>
  )
}
