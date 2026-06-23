import { ArrowDown, Atom, Bug, CircleDot, FlaskConical, Gauge, Play, ScanLine, Sparkles } from 'lucide-react'
import DNAHelix3D from './DNAHelix3D'

const orbitals = [
  { Icon: FlaskConical, label: 'PCR', className: 'left-[5%] top-[20%] lg:left-[8%]' },
  { Icon: Bug, label: 'Host cell', className: 'right-[3%] top-[18%] lg:right-[7%]' },
  { Icon: ScanLine, label: 'Gel', className: 'bottom-[17%] left-[3%] lg:left-[10%]' },
  { Icon: Gauge, label: 'Bioreactor', className: 'bottom-[13%] right-[4%] lg:right-[10%]' },
]

export default function ChapterHero() {
  return (
    <section id="home" className="hero-section scroll-mt-20">
      <div className="hero-grid" />
      <div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" />
      <div className="absolute inset-0 z-0 opacity-35 md:opacity-55"><DNAHelix3D hero /></div>
      {orbitals.map(({ Icon, label, className }, index) => (
        <div key={label} className={`hero-orbital hidden sm:flex ${className}`} style={{ animationDelay: `${index * -1.2}s` }}>
          <Icon size={17} /><span>{label}</span>
        </div>
      ))}

      <div className="page-wrap relative z-10 flex min-h-[840px] flex-col items-center justify-center pb-20 pt-32 text-center md:min-h-[920px]">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-leaf/10 bg-white/75 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.16em] text-leaf shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70 dark:text-mint">
          <Sparkles size={13} /> Class 12 · NCERT aligned · NEET ready
        </div>
        <div className="relative">
          <div className="absolute -left-6 -top-6 hidden h-14 w-14 items-center justify-center rounded-full bg-coral text-white shadow-lg md:flex animate-float"><Atom size={24} /></div>
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[.3em] text-leaf/60 dark:text-mint/60">Chapter 09 / Visual guide</p>
          <h1 className="hero-title">Biotechnology<span>Principles, Processes</span><em>&amp; Applications</em></h1>
        </div>
        <p className="mt-7 max-w-2xl text-base font-medium leading-7 text-slate-600 dark:text-slate-300 md:text-lg md:leading-8">
          From DNA cutting to recombinant products — a complete visual guide built for curious minds and exam-day clarity.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="#roadmap" className="primary-button"><Play size={17} fill="currentColor" /> Start learning</a>
          <a href="#roadmap" className="secondary-button"><CircleDot size={17} /> View chapter map</a>
        </div>
        <div className="mt-14 grid w-full max-w-3xl grid-cols-3 overflow-hidden rounded-[26px] border border-white/60 bg-white/55 shadow-soft backdrop-blur-md dark:border-white/10 dark:bg-slate-900/45">
          <div className="hero-stat"><strong>7</strong><span>visual labs</span></div>
          <div className="hero-stat border-x border-leaf/10 dark:border-white/10"><strong>100%</strong><span>free &amp; open</span></div>
          <div className="hero-stat"><strong>3D</strong><span>live models</span></div>
        </div>
        <a href="#roadmap" aria-label="Scroll to chapter roadmap" className="absolute bottom-7 flex flex-col items-center gap-2 text-[10px] font-black uppercase tracking-[.2em] text-leaf/50 dark:text-mint/50">
          Explore <ArrowDown size={16} className="animate-bounce" />
        </a>
      </div>
    </section>
  )
}
