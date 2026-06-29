import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, BadgeCheck, BookOpen, Brain, CheckCircle2, ChevronRight, Dna, Flower2, Leaf, Menu, Moon, Move3D, RefreshCcw, Sparkles, Sprout, Sun, Target, TestTube2, X } from 'lucide-react'
import mermaid from 'mermaid'
import * as THREE from 'three'
import content from './data/chapter1Content.json'

const navItems = [
  ['home', 'Home'],
  ['roadmap', 'Map'],
  ['flower', 'Flower'],
  ['male', 'Male'],
  ['female', 'Female'],
  ['pollination', 'Pollination'],
  ['fertilization', 'Double'],
  ['post', 'Seed'],
  ['models', '3D'],
  ['yield', 'Yield'],
  ['quiz', 'Quiz'],
  ['revise', 'Revise'],
]

const flowchart = `flowchart LR
  A["Flower"] --> B["Microsporogenesis"]
  B --> C["Pollen grain"]
  A --> D["Megasporogenesis"]
  D --> E["Embryo sac"]
  C --> F["Pollination"]
  F --> G["Pollen-pistil interaction"]
  G --> H["Double fertilization"]
  H --> I["Endosperm + Embryo"]
  I --> J["Seed + Fruit"]
  J --> K["Apomixis / Polyembryony alerts"]`

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('bioforge-flower-theme') === 'dark')
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('bioforge-flower-theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-18% 0px -68%', threshold: [0.08, 0.25] })
    navItems.forEach(([id]) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fffaf6] text-ink transition-colors dark:bg-[#100916] dark:text-white">
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-[24px] border border-white/70 bg-white/80 px-4 py-3 shadow-[0_18px_60px_rgba(80,34,67,.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#170d20]/80">
          <a href="#home" className="flex items-center gap-2.5" aria-label="BioForge flowering plants home">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-petal to-plum text-white shadow-glow"><Flower2 size={21} /></span>
            <span className="font-display text-[15px] font-black tracking-[-.03em]">BIO<span className="text-petal">FORGE</span></span>
          </a>
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map(([id, label]) => (
              <a key={id} className={`nav-link ${active === id ? 'active' : ''}`} href={`#${id}`}>{label}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full bg-pink-50 px-3 py-2 text-[10px] font-black uppercase tracking-[.16em] text-petal dark:bg-pink-300/10 sm:block">Chapter 1</span>
            <button className="icon-btn" onClick={() => setDark((v) => !v)} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="icon-btn lg:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Open navigation">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="mx-auto mt-2 grid max-w-7xl grid-cols-2 gap-2 rounded-[24px] border border-white/70 bg-white/95 p-3 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-[#170d20]/95 lg:hidden">
            {navItems.map(([id, label]) => (
              <a key={id} onClick={() => setMenuOpen(false)} className={`nav-link py-3 ${active === id ? 'active' : ''}`} href={`#${id}`}>{label}</a>
            ))}
          </div>
        )}
      </header>

      <main>
        <Hero />
        <Roadmap />
        <ConceptSections />
        <VisualLabs />
        <HighYield />
        <QuizSection />
        <RevisionDashboard />
      </main>
      <Footer />
    </div>
  )
}

function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-orb hero-orb-a" />
      <div className="hero-orb hero-orb-b" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pt-36 pb-20 lg:grid-cols-[1.02fr_.98fr] lg:pt-44">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[.18em] text-petal shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">
            <Sparkles size={15} /> Class 12 Biology · NCERT aligned · NEET ready
          </div>
          <h1 className="mt-7 max-w-4xl font-display text-5xl font-black leading-[.92] tracking-[-.06em] md:text-7xl">
            Sexual Reproduction <span className="text-gradient">in Flowering Plants</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            From pollen formation to double fertilization — a premium visual guide for Chapter 1 with 3D models, animations, flowcharts, high-yield NEET notes, flashcards and quizzes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#roadmap" className="primary-btn">Start learning <ArrowRight size={18} /></a>
            <a href="#models" className="secondary-btn">Open 3D lab <Move3D size={18} /></a>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
            <HeroStat value="10" label="chapter modules" />
            <HeroStat value="4" label="3D visuals" />
            <HeroStat value="100%" label="free stack" />
          </div>
        </div>
        <div className="relative">
          <ThreePanel title="Live flower anatomy" subtitle="Drag to rotate · scroll to zoom">
            <ThreeDViewer buildScene={buildFlowerScene} />
          </ThreePanel>
          <div className="floating-card left-0 top-12">
            <TestTube2 size={18} />
            Pollen tube pathway
          </div>
          <div className="floating-card bottom-12 right-2">
            <Dna size={18} />
            Double fertilization
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroStat({ value, label }) {
  return (
    <div className="rounded-3xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">
      <div className="text-2xl font-black text-petal">{value}</div>
      <div className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  )
}

function Roadmap() {
  return (
    <Section id="roadmap" eyebrow="Chapter roadmap" title="The whole chapter is one reproductive journey." description="Learn the chapter as a sequence: make gametes, move pollen, check compatibility, perform double fertilization, then build seed and fruit.">
      <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <div className="premium-card p-5 md:p-8">
          <MermaidDiagram chart={flowchart} />
        </div>
        <div className="grid gap-3">
          {content.roadmap.map((item, index) => (
            <a href={`#${index < 3 ? 'male' : index < 5 ? 'female' : index < 7 ? 'pollination' : index === 7 ? 'fertilization' : 'post'}`} className="roadmap-card" key={item.title}>
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

function ConceptSections() {
  const groups = [
    {
      id: 'flower',
      eyebrow: 'Foundation',
      title: 'Flower anatomy: where the story begins',
      description: 'A flower is a compact reproductive system. The androecium makes pollen and the gynoecium carries ovules.',
      scene: buildFlowerScene,
      items: content.sections.slice(0, 1),
    },
    {
      id: 'male',
      eyebrow: 'Male gametophyte',
      title: 'Anther → microspore → pollen grain',
      description: 'The male side is a carefully layered production line: anther wall protects, tapetum nourishes, meiosis makes microspores, pollen matures.',
      scene: buildPollenScene,
      items: content.sections.slice(1, 3),
    },
    {
      id: 'female',
      eyebrow: 'Female gametophyte',
      title: 'Ovule → megaspore → embryo sac',
      description: 'The female side is spatial: micropyle, chalaza, integuments, nucellus and a 7-celled 8-nucleate embryo sac.',
      scene: buildOvuleScene,
      items: content.sections.slice(3, 4),
    },
    {
      id: 'pollination',
      eyebrow: 'Transfer and compatibility',
      title: 'Pollination plus pollen-pistil interaction',
      description: 'Pollination is not the finish line. Compatible pollen must hydrate, germinate and send a pollen tube through the style.',
      scene: buildPollenTubeScene,
      items: content.sections.slice(4, 6),
    },
    {
      id: 'fertilization',
      eyebrow: 'Angiosperm signature',
      title: 'Double fertilization: two fusions, two products',
      description: 'One male gamete makes the zygote. The second forms endosperm through triple fusion. This is the conceptual heart of the chapter.',
      scene: buildDoubleFertilizationScene,
      items: content.sections.slice(6, 7),
    },
    {
      id: 'post',
      eyebrow: 'After fertilization',
      title: 'Endosperm, embryo, seed, fruit and special cases',
      description: 'The flower transforms: ovule becomes seed, ovary becomes fruit, and special pathways like apomixis become NEET favourites.',
      scene: buildSeedScene,
      items: content.sections.slice(7),
    },
  ]

  return groups.map((group) => (
    <Section key={group.id} id={group.id} eyebrow={group.eyebrow} title={group.title} description={group.description}>
      <div className="grid gap-6 lg:grid-cols-[.92fr_1.08fr]">
        <ThreePanel title={group.title} subtitle="Original browser-rendered 3D schematic">
          <ThreeDViewer buildScene={group.scene} />
        </ThreePanel>
        <div className="grid gap-4">
          {group.items.map((item) => <ConceptCard key={item.id} item={item} />)}
        </div>
      </div>
    </Section>
  ))
}

function VisualLabs() {
  const labs = [
    ['Flower 3D', 'Petals, stamen and pistil arranged as a rotating reproductive organ.', buildFlowerScene],
    ['Pollen grain 3D', 'Exine spikes, germ pore and internal male gametophyte compartments.', buildPollenScene],
    ['Ovule 3D', 'Integuments, micropyle, nucellus and embryo sac orientation.', buildOvuleScene],
    ['Pollen tube 3D', 'Compatible pollen germinates and tube grows toward the ovule.', buildPollenTubeScene],
  ]
  return (
    <Section id="models" eyebrow="Interactive 3D lab" title="Rotate the structures instead of memorising flat diagrams." description="These are original schematic 3D models made with Three.js geometry — no copied diagrams or external models.">
      <div className="grid gap-5 md:grid-cols-2">
        {labs.map(([title, desc, scene]) => (
          <ThreePanel key={title} title={title} subtitle={desc}>
            <ThreeDViewer buildScene={scene} />
          </ThreePanel>
        ))}
      </div>
    </Section>
  )
}

function HighYield() {
  return (
    <Section id="yield" eyebrow="NEET high yield" title="Facts that frequently become one-line questions." description="Use these as rapid revision bullets after you understand the visuals.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {content.highYield.map((fact, index) => (
          <div className="yield-card" key={fact}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{fact}</p>
          </div>
        ))}
      </div>
      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        <Mistake title="Geitonogamy trap" body="It looks like cross-pollination because two flowers are involved, but genetically it is self-pollination because both flowers are on the same plant." />
        <Mistake title="Apomixis vs parthenocarpy" body="Apomixis is seed formation without fertilization. Parthenocarpy is fruit formation without fertilization." />
        <Mistake title="7-celled, 8-nucleate" body="The central cell has two polar nuclei, so cell count and nucleus count are different." />
      </div>
    </Section>
  )
}

function QuizSection() {
  const [answers, setAnswers] = useState({})
  const score = content.quiz.reduce((sum, q, index) => sum + (answers[index] === q.answer ? 1 : 0), 0)
  return (
    <Section id="quiz" eyebrow="Practice" title="NEET-style quick quiz with instant feedback." description="Answer, check the explanation, then reset and run it again before exams.">
      <div className="quiz-score">
        <div>
          <p>Score tracker</p>
          <h3>{score} / {content.quiz.length}</h3>
        </div>
        <button onClick={() => setAnswers({})}><RefreshCcw size={17} /> Reset</button>
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {content.quiz.map((q, index) => (
          <QuizCard key={q.question} q={q} index={index} selected={answers[index]} onSelect={(value) => setAnswers((prev) => ({ ...prev, [index]: value }))} />
        ))}
      </div>
    </Section>
  )
}

function RevisionDashboard() {
  const [card, setCard] = useState(0)
  const current = content.flashcards[card]
  return (
    <Section id="revise" eyebrow="Final revision dashboard" title="Compress the chapter into one last active recall session." description="Use this at the end: process table, memory map, flashcards and transformation summary.">
      <div className="grid gap-6 lg:grid-cols-[1fr_.9fr]">
        <div className="premium-card p-6">
          <h3 className="section-mini-title">Process table</h3>
          <div className="revision-table">
            {[
              ['Microsporogenesis', 'MMC → meiosis → microspores'],
              ['Megasporogenesis', 'Megaspore mother cell → functional megaspore'],
              ['Pollination', 'Anther to stigma pollen transfer'],
              ['Pollen-pistil interaction', 'Recognition + tube growth'],
              ['Double fertilization', 'Syngamy + triple fusion'],
              ['Post-fertilization', 'Endosperm, embryo, seed, fruit'],
            ].map(([a, b]) => (
              <div key={a}><strong>{a}</strong><span>{b}</span></div>
            ))}
          </div>
        </div>
        <div className="flashcard" onClick={() => setCard((card + 1) % content.flashcards.length)}>
          <p>Tap / click for next flashcard</p>
          <h3>{current.front}</h3>
          <div>{current.back}</div>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Transform from="Ovule" to="Seed" />
        <Transform from="Ovary" to="Fruit" />
        <Transform from="Integuments" to="Seed coat" />
      </div>
    </Section>
  )
}

function ConceptCard({ item }) {
  return (
    <article className="concept-card">
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.18em] text-petal"><BadgeCheck size={16} /> {item.eyebrow}</div>
      <h3>{item.title}</h3>
      <ul>
        {item.points.map((point) => <li key={point}>{point}</li>)}
      </ul>
      <div className="neet-line"><Target size={16} /> {item.neet}</div>
    </article>
  )
}

function QuizCard({ q, index, selected, onSelect }) {
  const answered = selected !== undefined
  return (
    <article className="quiz-card">
      <div className="quiz-number">Q{index + 1}</div>
      <h3>{q.question}</h3>
      <div className="mt-4 grid gap-2">
        {q.options.map((option, optionIndex) => {
          const isRight = answered && optionIndex === q.answer
          const isWrong = answered && selected === optionIndex && optionIndex !== q.answer
          return (
            <button key={option} onClick={() => onSelect(optionIndex)} className={`option ${isRight ? 'right' : ''} ${isWrong ? 'wrong' : ''}`}>
              {option}
            </button>
          )
        })}
      </div>
      {answered && <p className="explain"><CheckCircle2 size={16} /> {q.explain}</p>}
    </article>
  )
}

function Section({ id, eyebrow, title, description, children }) {
  return (
    <section id={id} className="section-shell">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-8 max-w-3xl">
          <div className="eyebrow">{eyebrow}</div>
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
  const id = useMemo(() => `mermaid-${Math.random().toString(36).slice(2)}`, [])
  useEffect(() => {
    let active = true
    mermaid.initialize({ startOnLoad: false, theme: 'base', securityLevel: 'loose', themeVariables: { primaryColor: '#fdf2f8', primaryTextColor: '#15231c', primaryBorderColor: '#ec4899', lineColor: '#16a34a', secondaryColor: '#ecfeff', tertiaryColor: '#fff7ed' } })
    mermaid.render(id, chart).then(({ svg }) => {
      if (active && ref.current) ref.current.innerHTML = svg
    }).catch(() => {
      if (active && ref.current) ref.current.textContent = 'Flowchart could not render.'
    })
    return () => { active = false }
  }, [chart, id])
  return <div ref={ref} className="mermaid-box" />
}

function ThreePanel({ title, subtitle, children }) {
  return (
    <div className="three-panel">
      <div className="three-panel-head">
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

function ThreeDViewer({ buildScene }) {
  const mountRef = useRef(null)
  const drag = useRef({ active: false, x: 0 })

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const width = Math.max(320, mount.clientWidth)
    const height = Math.max(320, mount.clientHeight)
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0xfffbf7, 10, 24)
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100)
    camera.position.set(0, 1.1, 8.5)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)
    const ambient = new THREE.AmbientLight(0xffffff, 1.8)
    const key = new THREE.DirectionalLight(0xffffff, 2.2)
    key.position.set(4, 5, 6)
    const rim = new THREE.PointLight(0xec4899, 2, 14)
    rim.position.set(-3, 2, 4)
    scene.add(ambient, key, rim)
    buildScene(group)

    const grid = new THREE.GridHelper(7, 14, 0xf9a8d4, 0xfce7f3)
    grid.position.y = -2.45
    grid.material.opacity = 0.2
    grid.material.transparent = true
    scene.add(grid)

    const onPointerDown = (event) => { drag.current = { active: true, x: event.clientX } }
    const onPointerMove = (event) => {
      if (!drag.current.active) return
      const delta = event.clientX - drag.current.x
      group.rotation.y += delta * 0.008
      drag.current.x = event.clientX
    }
    const onPointerUp = () => { drag.current.active = false }
    const onWheel = (event) => {
      event.preventDefault()
      camera.position.z = Math.min(12, Math.max(5.3, camera.position.z + event.deltaY * 0.004))
    }

    renderer.domElement.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false })

    let frame = 0
    let raf
    const animate = () => {
      frame += 0.01
      group.rotation.y += drag.current.active ? 0 : 0.003
      group.children.forEach((child, index) => {
        if (child.userData.float) child.position.y += Math.sin(frame + index) * 0.0015
        if (child.userData.pulse) child.scale.setScalar(1 + Math.sin(frame * 3 + index) * 0.035)
      })
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    const resizeObserver = new ResizeObserver(() => {
      const w = Math.max(320, mount.clientWidth)
      const h = Math.max(320, mount.clientHeight)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    })
    resizeObserver.observe(mount)

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      renderer.domElement.removeEventListener('wheel', onWheel)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [buildScene])

  return <div ref={mountRef} className="three-canvas" />
}

function capsule(text, position, color = 0xffffff) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'rgba(255,255,255,.9)'
  ctx.strokeStyle = '#f9a8d4'
  ctx.lineWidth = 5
  roundRect(ctx, 12, 18, 488, 86, 38)
  ctx.fill()
  ctx.stroke()
  ctx.fillStyle = '#15231c'
  ctx.font = '700 34px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, 256, 62)
  const texture = new THREE.CanvasTexture(canvas)
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, color }))
  sprite.position.set(...position)
  sprite.scale.set(1.65, 0.42, 1)
  return sprite
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

function buildFlowerScene(group) {
  const petalMat = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.5, metalness: 0.04 })
  const petalGeo = new THREE.SphereGeometry(0.75, 32, 18)
  for (let i = 0; i < 8; i += 1) {
    const petal = new THREE.Mesh(petalGeo, petalMat)
    const angle = (i / 8) * Math.PI * 2
    petal.position.set(Math.cos(angle) * 1.45, Math.sin(angle) * 0.12, Math.sin(angle) * 1.45)
    petal.scale.set(0.75, 0.18, 1.45)
    petal.rotation.set(0.25, -angle, 0.15)
    petal.userData.float = true
    group.add(petal)
  }
  const center = new THREE.Mesh(new THREE.SphereGeometry(0.56, 32, 32), new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.35 }))
  center.userData.pulse = true
  group.add(center)
  const filamentMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24 })
  for (let i = 0; i < 6; i += 1) {
    const angle = (i / 6) * Math.PI * 2
    const filament = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 1.55, 12), filamentMat)
    filament.position.set(Math.cos(angle) * 0.68, 0.05, Math.sin(angle) * 0.68)
    filament.rotation.z = 0.18 * Math.cos(angle)
    group.add(filament)
    const anther = new THREE.Mesh(new THREE.SphereGeometry(0.18, 18, 12), new THREE.MeshStandardMaterial({ color: 0xf97316 }))
    anther.position.set(Math.cos(angle) * 0.84, 0.85, Math.sin(angle) * 0.84)
    group.add(anther)
  }
  const pistil = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.14, 2.2, 24), new THREE.MeshStandardMaterial({ color: 0x16a34a }))
  pistil.position.y = 0.45
  group.add(pistil)
  const stigma = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 12), new THREE.MeshStandardMaterial({ color: 0x86efac }))
  stigma.position.y = 1.65
  group.add(stigma)
  group.add(capsule('stigma', [1.9, 1.65, 0]))
  group.add(capsule('anther', [-1.9, 1.02, 0]))
  group.add(capsule('petals', [0, -1.8, 0]))
}

function buildPollenScene(group) {
  const exine = new THREE.Mesh(new THREE.SphereGeometry(1.15, 48, 32), new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.55 }))
  group.add(exine)
  const inner = new THREE.Mesh(new THREE.SphereGeometry(0.82, 32, 20), new THREE.MeshStandardMaterial({ color: 0xffedd5, transparent: true, opacity: 0.62 }))
  group.add(inner)
  for (let i = 0; i < 42; i += 1) {
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.28, 10), new THREE.MeshStandardMaterial({ color: 0xb45309 }))
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    spike.position.set(Math.sin(phi) * Math.cos(theta) * 1.26, Math.cos(phi) * 1.26, Math.sin(phi) * Math.sin(theta) * 1.26)
    spike.lookAt(0, 0, 0)
    spike.rotateX(Math.PI)
    group.add(spike)
  }
  const pore = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.04, 16, 40), new THREE.MeshStandardMaterial({ color: 0xffffff }))
  pore.position.set(0.15, 0.15, 1.18)
  group.add(pore)
  const veg = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 16), new THREE.MeshStandardMaterial({ color: 0x38bdf8 }))
  veg.position.set(-0.25, 0.12, 0.25)
  group.add(veg)
  const gen = new THREE.Mesh(new THREE.SphereGeometry(0.16, 24, 16), new THREE.MeshStandardMaterial({ color: 0x7c3aed }))
  gen.position.set(0.3, -0.12, 0.18)
  group.add(gen)
  group.add(capsule('exine', [-1.9, 1.35, 0]))
  group.add(capsule('germ pore', [1.9, 0.75, 0]))
  group.add(capsule('vegetative + generative cells', [0, -1.65, 0]))
}

function buildOvuleScene(group) {
  const outer = new THREE.Mesh(new THREE.SphereGeometry(1.25, 48, 32, 0, Math.PI * 2, 0.22, Math.PI - 0.35), new THREE.MeshStandardMaterial({ color: 0xf9a8d4, transparent: true, opacity: 0.46, side: THREE.DoubleSide }))
  outer.scale.set(0.82, 1.25, 0.72)
  group.add(outer)
  const nucellus = new THREE.Mesh(new THREE.SphereGeometry(0.78, 36, 24), new THREE.MeshStandardMaterial({ color: 0xfef3c7, transparent: true, opacity: 0.8 }))
  nucellus.scale.set(0.75, 1.12, 0.65)
  group.add(nucellus)
  const sac = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 18), new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.78 }))
  sac.scale.set(0.55, 1.5, 0.45)
  group.add(sac)
  const egg = new THREE.Mesh(new THREE.SphereGeometry(0.12, 18, 12), new THREE.MeshStandardMaterial({ color: 0xec4899 }))
  egg.position.y = -0.52
  group.add(egg)
  for (let i = 0; i < 2; i += 1) {
    const polar = new THREE.Mesh(new THREE.SphereGeometry(0.1, 18, 12), new THREE.MeshStandardMaterial({ color: 0x7c3aed }))
    polar.position.set(i ? 0.14 : -0.14, 0.05, 0.05)
    group.add(polar)
  }
  const micropyle = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.045, 16, 42), new THREE.MeshStandardMaterial({ color: 0x16a34a }))
  micropyle.position.y = -1.22
  micropyle.rotation.x = Math.PI / 2
  group.add(micropyle)
  group.add(capsule('micropyle', [1.75, -1.1, 0]))
  group.add(capsule('embryo sac', [-1.8, 0.2, 0]))
  group.add(capsule('integuments', [0, 1.72, 0]))
}

function buildPollenTubeScene(group) {
  const stigma = new THREE.Mesh(new THREE.SphereGeometry(0.55, 32, 20), new THREE.MeshStandardMaterial({ color: 0x86efac }))
  stigma.position.y = 1.75
  group.add(stigma)
  const style = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.32, 3.2, 28), new THREE.MeshStandardMaterial({ color: 0x16a34a, transparent: true, opacity: 0.75 }))
  style.position.y = 0.1
  group.add(style)
  const ovary = new THREE.Mesh(new THREE.SphereGeometry(0.85, 36, 24), new THREE.MeshStandardMaterial({ color: 0xf9a8d4, transparent: true, opacity: 0.66 }))
  ovary.scale.set(1.05, 0.7, 0.85)
  ovary.position.y = -1.72
  group.add(ovary)
  const tubeCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.65, 2.1, 0),
    new THREE.Vector3(-0.25, 1.2, 0.05),
    new THREE.Vector3(0.08, 0.15, 0),
    new THREE.Vector3(0.18, -1.45, 0.03),
  ])
  const tube = new THREE.Mesh(new THREE.TubeGeometry(tubeCurve, 72, 0.055, 12, false), new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0x7c2d12, emissiveIntensity: 0.08 }))
  tube.userData.pulse = true
  group.add(tube)
  const pollen = new THREE.Mesh(new THREE.SphereGeometry(0.25, 24, 16), new THREE.MeshStandardMaterial({ color: 0xf59e0b }))
  pollen.position.set(-0.78, 2.28, 0)
  group.add(pollen)
  group.add(capsule('compatible pollen', [-1.8, 2.1, 0]))
  group.add(capsule('tube through style', [1.8, 0.1, 0]))
  group.add(capsule('ovary / ovule', [0, -2.45, 0]))
}

function buildDoubleFertilizationScene(group) {
  buildOvuleScene(group)
  const zygote = new THREE.Mesh(new THREE.SphereGeometry(0.17, 24, 14), new THREE.MeshStandardMaterial({ color: 0xec4899, emissive: 0xec4899, emissiveIntensity: 0.2 }))
  zygote.position.set(-0.18, -0.55, 0.42)
  zygote.userData.pulse = true
  group.add(zygote)
  const endosperm = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 14), new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.2 }))
  endosperm.position.set(0.18, 0.02, 0.42)
  endosperm.userData.pulse = true
  group.add(endosperm)
  group.add(capsule('syngamy → zygote', [-2.05, -0.75, 0]))
  group.add(capsule('triple fusion → endosperm', [2.05, 0.2, 0]))
}

function buildSeedScene(group) {
  const seed = new THREE.Mesh(new THREE.SphereGeometry(1.18, 48, 30), new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.65 }))
  seed.scale.set(0.75, 1.25, 0.65)
  group.add(seed)
  const cut = new THREE.Mesh(new THREE.SphereGeometry(0.88, 36, 22), new THREE.MeshStandardMaterial({ color: 0xffedd5 }))
  cut.scale.set(0.55, 0.92, 0.48)
  cut.position.z = 0.38
  group.add(cut)
  const embryo = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.95, 12, 24), new THREE.MeshStandardMaterial({ color: 0x16a34a }))
  embryo.position.set(-0.15, -0.1, 0.82)
  embryo.rotation.z = -0.25
  group.add(embryo)
  const cotyledon = new THREE.Mesh(new THREE.SphereGeometry(0.34, 24, 16), new THREE.MeshStandardMaterial({ color: 0x86efac }))
  cotyledon.scale.set(0.9, 0.35, 0.6)
  cotyledon.position.set(0.25, 0.22, 0.82)
  group.add(cotyledon)
  group.add(capsule('seed coat', [-1.9, 1.15, 0]))
  group.add(capsule('embryo', [1.8, 0, 0]))
  group.add(capsule('stored food', [0, -1.65, 0]))
}

function Mistake({ title, body }) {
  return (
    <div className="mistake-card">
      <Brain size={20} />
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  )
}

function Transform({ from, to }) {
  return (
    <div className="transform-card">
      <span>{from}</span>
      <ArrowRight size={18} />
      <strong>{to}</strong>
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t border-pink-100 bg-white px-5 py-14 dark:border-white/10 dark:bg-[#100916]">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2 font-black"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-petal text-white"><Sprout size={20} /></span> BIOFORGE · Chapter 1</div>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">Original NCERT-aligned visual learning resource for Class 12 Biology. Built with free, open-source tools and deployable on GitHub Pages.</p>
        </div>
        <a href="#home" className="inline-flex items-center gap-2 text-sm font-black text-petal">Back to top <ArrowRight className="-rotate-45" size={16} /></a>
      </div>
    </footer>
  )
}

export default App
