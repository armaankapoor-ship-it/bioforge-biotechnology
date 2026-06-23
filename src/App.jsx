import { useEffect, useState } from 'react'
import { ArrowRight, Atom, Dna, Menu, Microscope, Scissors, TestTube2, X } from 'lucide-react'
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
