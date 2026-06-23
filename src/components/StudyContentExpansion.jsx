import { useMemo, useState } from 'react'
import {
  Activity,
  BookOpen,
  Bug,
  CheckCircle2,
  CircleDot,
  ClipboardCheck,
  Dna,
  Factory,
  FlaskConical,
  Microscope,
  ScanSearch,
  ShieldCheck,
  Syringe,
  TestTube2,
  Wheat,
} from 'lucide-react'
import studyAtlas from '../data/studyAtlas.json'
import {
  BtToxin3D,
  CellFactory3D,
  Diagnostic3D,
  Insulin3D,
  RNAi3D,
  ViralVector3D,
} from './AdvancedBioModels3D'
import { ConceptCard, MistakeAlert, NCERTImportantLine, NEETHighYieldBox, SectionShell } from './ui'

const modelItems = [
  {
    id: 'insulin-3d',
    title: 'Insulin molecule',
    kicker: 'A-chain + B-chain',
    description: 'A schematic 3D protein view showing two chains held by disulphide links.',
    component: Insulin3D,
    labels: ['A-chain', 'B-chain', 'S-S bonds'],
  },
  {
    id: 'bt-3d',
    title: 'Bt toxin activation',
    kicker: 'protoxin to toxin',
    description: 'Bt crystal protein activating into an insect gut toxin.',
    component: BtToxin3D,
    labels: ['Cry protoxin', 'alkaline gut', 'active toxin'],
  },
  {
    id: 'vector-3d',
    title: 'Viral vector delivery',
    kicker: 'gene therapy',
    description: 'A safe schematic vector delivering a corrective gene into a host cell.',
    component: ViralVector3D,
    labels: ['capsid', 'gene payload', 'host cell'],
  },
  {
    id: 'rnai-3d',
    title: 'RNAi targeting',
    kicker: 'mRNA silencing',
    description: 'Double-stranded RNA logic guiding a target mRNA cut.',
    component: RNAi3D,
    labels: ['dsRNA', 'guide RNA', 'mRNA cut'],
  },
  {
    id: 'diagnosis-3d',
    title: 'Diagnostic microplate',
    kicker: 'ELISA + probe',
    description: 'A 3D microplate-style diagnostic model with positive signal wells.',
    component: Diagnostic3D,
    labels: ['wells', 'signal', 'probe'],
  },
  {
    id: 'factory-3d',
    title: 'Bacterial cell factory',
    kicker: 'expression',
    description: 'A recombinant host cell producing blue product molecules from plasmid DNA.',
    component: CellFactory3D,
    labels: ['plasmid', 'ribosomes', 'product'],
  },
]

const iconMap = {
  meaning: BookOpen,
  principles: ShieldCheck,
  isolation: FlaskConical,
  restriction: Dna,
  pcr: Activity,
  vectors: CircleDot,
  transformation: Bug,
  selection: ClipboardCheck,
  gel: TestTube2,
  bioreactor: Factory,
  downstream: Microscope,
  insulin: Syringe,
  'bt-cotton': Wheat,
  'gene-therapy': ShieldCheck,
  rnai: Dna,
  diagnosis: ScanSearch,
  ethics: ShieldCheck,
}

export function ThreeDModelGallery() {
  const [active, setActive] = useState(0)
  const ActiveModel = modelItems[active].component

  return (
    <SectionShell
      id="models"
      eyebrow="3D biology gallery"
      title="More interactive 3D models for the application-heavy half of the chapter."
      description="These are original, code-generated Three.js schematic models. No downloaded models, no stock assets, no paid APIs."
      tone="tint"
    >
      <div className="grid gap-6 xl:grid-cols-[.75fr_1.25fr]">
        <div className="grid gap-3">
          {modelItems.map((item, index) => (
            <button key={item.id} onClick={() => setActive(index)} className={`model-picker ${active === index ? 'active' : ''}`}>
              <span>{index + 1}</span>
              <strong>{item.title}</strong>
              <small>{item.kicker}</small>
            </button>
          ))}
        </div>
        <div className="glass-card overflow-hidden">
          <div className="grid min-h-[560px] lg:grid-cols-[1fr_.72fr]">
            <div className="relative min-h-[420px] bg-[radial-gradient(circle_at_50%_40%,rgba(184,242,220,.65),rgba(255,255,255,.25)_60%,transparent)] p-4 dark:bg-[radial-gradient(circle_at_50%_40%,rgba(184,242,220,.13),rgba(255,255,255,.03)_65%,transparent)]">
              <ActiveModel />
              <div className="absolute left-5 top-5 rounded-full border border-white/70 bg-white/75 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.14em] text-leaf backdrop-blur dark:border-white/10 dark:bg-slate-950/70 dark:text-mint">
                {modelItems[active].kicker}
              </div>
            </div>
            <div className="p-6 md:p-8">
              <p className="micro-label">Model focus</p>
              <h3 className="mt-3 text-3xl font-black tracking-tight text-ink dark:text-white">{modelItems[active].title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{modelItems[active].description}</p>
              <div className="mt-6 grid gap-3">
                {modelItems[active].labels.map((label) => (
                  <div key={label} className="model-feature-pill">
                    <CheckCircle2 size={16} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <NEETHighYieldBox title="How to read the model">
                Treat every 3D object as a labelled schematic: identify the biological part, then connect it to the NCERT process.
              </NEETHighYieldBox>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

export function StudyAtlasSection() {
  const [activeId, setActiveId] = useState(studyAtlas[0].id)
  const active = useMemo(() => studyAtlas.find((item) => item.id === activeId) || studyAtlas[0], [activeId])
  const ActiveIcon = iconMap[active.id] || BookOpen

  return (
    <SectionShell
      id="study-atlas"
      eyebrow="Complete study atlas"
      title="More study content: NCERT core plus NEET depth for every major concept."
      description="This is the dense reading layer the first version was missing. Use the left rail like a chapter index, then revise from the cards on the right."
    >
      <div className="grid gap-6 xl:grid-cols-[.82fr_1.18fr]">
        <div className="glass-card max-h-[760px] overflow-y-auto p-3">
          <div className="grid gap-2">
            {studyAtlas.map((item, index) => {
              const ItemIcon = iconMap[item.id] || BookOpen
              return (
                <button key={item.id} onClick={() => setActiveId(item.id)} className={`atlas-nav-item ${active.id === item.id ? 'active' : ''}`}>
                  <span><ItemIcon size={16} /></span>
                  <strong>{index + 1}. {item.title}</strong>
                </button>
              )
            })}
          </div>
        </div>

        <article className="glass-card overflow-hidden">
          <div className="border-b border-leaf/10 bg-gradient-to-r from-emerald-50/90 to-sky-50/80 p-6 dark:border-white/10 dark:from-emerald-300/10 dark:to-sky-300/5 md:p-8">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-leaf shadow-sm dark:bg-white/10 dark:text-mint">
              <ActiveIcon size={25} />
            </div>
            <p className="micro-label mt-5">Deep note</p>
            <h3 className="mt-2 text-3xl font-black tracking-tight text-ink dark:text-white">{active.title}</h3>
          </div>
          <div className="grid gap-5 p-6 md:p-8">
            <StudyBlock title="NCERT core" text={active.core} />
            <StudyBlock title="NEET depth" text={active.neetDepth} />

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-[24px] bg-emerald-50/80 p-5 dark:bg-emerald-300/5">
                <p className="micro-label">Must remember</p>
                <div className="mt-4 grid gap-3">
                  {active.mustRemember.map((line) => (
                    <div key={line} className="atlas-bullet"><CheckCircle2 size={16} />{line}</div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4">
                <NCERTImportantLine>{active.diagramCue}</NCERTImportantLine>
                <MistakeAlert>{active.commonTrap}</MistakeAlert>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ConceptCard icon={BookOpen} kicker="Reading" title="NCERT aligned" color="mint">Every atlas entry starts with the school-level core idea before adding exam depth.</ConceptCard>
        <ConceptCard icon={Microscope} kicker="Visual cue" title="Diagram-ready" color="sky">Each concept includes a quick diagram prompt so students can practise drawing from memory.</ConceptCard>
        <ConceptCard icon={ClipboardCheck} kicker="Recall" title="Must remember" color="lime">Short lines are written as flashcard-style recall targets.</ConceptCard>
        <ConceptCard icon={ShieldCheck} kicker="Exam trap" title="Common mistakes" color="coral">Each topic includes one high-probability confusion warning.</ConceptCard>
      </div>
    </SectionShell>
  )
}

function StudyBlock({ title, text }) {
  return (
    <div className="rounded-[24px] border border-leaf/10 bg-white/65 p-5 dark:border-white/10 dark:bg-white/[.035]">
      <p className="micro-label">{title}</p>
      <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  )
}
