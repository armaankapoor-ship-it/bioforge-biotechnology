import { useEffect, useState } from 'react'
import { ArrowRight, Atom, BookOpen, Dna, Menu, Microscope, Scissors, TestTube2, X } from 'lucide-react'
import { CoreChapterSections, DownstreamApplicationsRevision } from './components/AdvancedChapterSections'
import BioreactorSection from './components/BioreactorSection'
import ChapterHero from './components/ChapterHero'
import ChapterRoadmap from './components/ChapterRoadmap'
import CompleteChapterNotebook from './components/CompleteChapterNotebook'
import DarkModeToggle from './components/DarkModeToggle'
import GelElectrophoresisAnimation from './components/GelElectrophoresisAnimation'
import PCRCycleAnimation from './components/PCRCycleAnimation'
import PlasmidSection from './components/PlasmidSection'
import RestrictionLab from './components/RestrictionLab'
import { StudyAtlasSection } from './components/StudyContentExpansion'
import { ConceptCard, FlowchartBlock, SectionShell } from './components/ui'

const navItems = [
  ['home', 'Home'],
  ['roadmap', 'Map'],
  ['chapter-library', 'Sites'],
  ['chapter-notebook', 'Chapter'],
  ['study-atlas', 'Notes'],
  ['intro', 'Basics'],
  ['principles', 'Tools'],
  ['processes', 'Process'],
  ['restriction', 'Cut'],
  ['pcr', 'PCR'],
  ['plasmid', 'Vector'],
  ['gel', 'Gel'],
  ['bioreactor', 'Scale'],
  ['downstream', 'Purify'],
  ['applications', 'Apps'],
  ['models', '3D'],
  ['high-yield', 'Yield'],
  ['revision', 'Revise'],
]

const chapterSites = [
  ['chapter1', 'Chapter 1', 'Sexual Reproduction in Flowering Plants'],
  ['chapter2', 'Chapter 2', 'Human Reproduction'],
  ['chapter3', 'Chapter 3', 'Reproductive Health'],
  ['chapter4', 'Chapter 4', 'Principles of Inheritance and Variation'],
  ['chapter5', 'Chapter 5', 'Molecular Basis of Inheritance'],
  ['chapter6', 'Chapter 6', 'Evolution'],
  ['chapter7', 'Chapter 7', 'Human Health and Disease'],
  ['chapter8', 'Chapter 8', 'Microbes in Human Welfare'],
  ['', 'Chapter 9', 'Biotechnology: Principles, Processes and Applications'],
  ['chapter10', 'Chapter 10', 'Biotechnology and Its Applications'],
  ['chapter11', 'Chapter 11', 'Organisms and Populations'],
  ['chapter12', 'Chapter 12', 'Ecosystem'],
]

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('bioforge-theme') === 'dark')
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('bioforge-theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-20% 0px -65%', threshold: [0.05, 0.25] })
    navItems.forEach(([id]) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8fbf9] text-ink transition-colors dark:bg-[#071510] dark:text-white">
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-[20px] border border-white/60 bg-white/78 px-4 py-3 shadow-[0_12px_40px_rgba(18,67,51,.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1e17]/80">
          <a href="#home" className="flex items-center gap-2.5" aria-label="BioForge home">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-leaf text-white"><Dna size={20} /></span>
            <span className="font-display text-[15px] font-black tracking-[-.03em]">BIO<span className="text-leaf dark:text-mint">FORGE</span></span>
          </a>
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={`nav-link ${active === id ? 'active' : ''}`}>{label}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden rounded-full bg-emerald-50 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-leaf dark:bg-emerald-300/10 dark:text-mint sm:block">Free forever</div>
            <DarkModeToggle dark={dark} onToggle={() => setDark((value) => !value)} />
            <button onClick={() => setMenuOpen((value) => !value)} className="nav-icon-button lg:hidden" aria-label="Open navigation">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="mx-auto mt-2 grid max-w-7xl grid-cols-2 gap-2 rounded-[20px] border border-white/60 bg-white/95 p-3 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1e17]/95 lg:hidden">
            {navItems.map(([id, label]) => (
              <a onClick={() => setMenuOpen(false)} key={id} href={`#${id}`} className={`nav-link py-3 ${active === id ? 'active' : ''}`}>{label}</a>
            ))}
          </div>
        )}
      </header>

      <main>
        <ChapterHero />
        <ChapterRoadmap />
        <ChapterLibrary />
        <FoundationsStrip />
        <CompleteChapterNotebook />
        <StudyAtlasSection />
        <CoreChapterSections />
        <RestrictionLab />
        <PCRCycleAnimation />
        <PlasmidSection />
        <GelElectrophoresisAnimation />
        <BioreactorSection />
        <DownstreamApplicationsRevision />
      </main>
      <Footer />
    </div>
  )
}

function ChapterLibrary() {
  const base = import.meta.env.BASE_URL || '/'
  const hrefFor = (path) => (path ? `${base}${path}/` : base)

  return (
    <SectionShell id="chapter-library" eyebrow="Chapter sites" title="Separate premium websites for Class 12 Biology." description="Each chapter opens as its own free GitHub Pages learning site with visual notes, 3D models, flowcharts, quizzes and revision tools.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {chapterSites.map(([path, chapter, title]) => (
          <a key={`${chapter}-${title}`} href={hrefFor(path)} className="group rounded-[28px] border border-emerald-100 bg-white/85 p-5 shadow-soft transition hover:-translate-y-1 hover:border-leaf/30 hover:shadow-[0_20px_60px_rgba(18,67,51,.14)] dark:border-white/10 dark:bg-white/5">
            <div className="flex items-start justify-between gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-leaf/10 text-leaf dark:bg-mint/10 dark:text-mint">
                <BookOpen size={21} />
              </div>
              <ArrowRight className="-rotate-45 text-leaf opacity-50 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100 dark:text-mint" size={18} />
            </div>
            <p className="mt-5 text-xs font-black uppercase tracking-[.18em] text-leaf/60 dark:text-mint/60">{chapter}</p>
            <h3 className="mt-2 font-display text-xl font-black tracking-[-.04em] text-ink dark:text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">Open the standalone visual learning site.</p>
          </a>
        ))}
      </div>
    </SectionShell>
  )
}

function FoundationsStrip() {
  return (
    <SectionShell id="foundations" eyebrow="The master process" title="Nine moves make recombinant DNA technology." description="Use this as your mental spine. Every detailed concept in the chapter attaches to one of these moves.">
      <div className="rounded-[30px] bg-ink p-6 text-white shadow-soft dark:bg-emerald-950 md:p-9">
        <FlowchartBlock steps={['Isolate DNA', 'Cut', 'Amplify', 'Ligate', 'Transform', 'Select', 'Express', 'Scale', 'Purify']} />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ConceptCard icon={Scissors} kicker="Tool" title="Restriction enzyme" color="coral">A sequence-specific cutter that produces compatible DNA ends.</ConceptCard>
        <ConceptCard icon={Dna} kicker="Tool" title="DNA ligase" color="mint">The molecular glue that seals the insert into its vector.</ConceptCard>
        <ConceptCard icon={TestTube2} kicker="Process" title="PCR" color="sky">A thermal cycle that amplifies the chosen target exponentially.</ConceptCard>
        <ConceptCard icon={Microscope} kicker="System" title="Living host" color="lime">A cell that copies recombinant DNA and may express its product.</ConceptCard>
      </div>
    </SectionShell>
  )
}

function Footer() {
  return (
    <footer className="border-t border-leaf/10 bg-white px-5 py-14 dark:border-white/10 dark:bg-[#071510]">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2 font-black">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-leaf text-white"><Atom size={19} /></span>
            BIOFORGE
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">Original, NCERT-aligned visual learning. Built entirely with free and open-source web technologies. No copied textbook diagrams.</p>
        </div>
        <div className="md:text-right">
          <p className="text-xs font-extrabold uppercase tracking-[.18em] text-leaf/60 dark:text-mint/60">Built free-first</p>
          <p className="mt-2 text-sm font-bold text-ink dark:text-white">Original diagrams · local JSON · GitHub Pages ready</p>
          <a href="#home" className="mt-4 inline-flex items-center gap-2 text-xs font-black text-leaf dark:text-mint">Back to top <ArrowRight className="-rotate-45" size={15} /></a>
        </div>
      </div>
    </footer>
  )
}

export default App
