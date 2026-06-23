import { ArrowRight, Check, Route } from 'lucide-react'
import notes from '../data/biotechnologyNotes.json'
import MermaidDiagram from './MermaidDiagram'
import { SectionShell } from './ui'

const chart = `flowchart LR
  A[Biotechnology basics] --> B[Principles]
  B --> C[Tools of rDNA]
  C --> D[Restriction enzymes]
  D --> E[PCR amplification]
  E --> F[Vector + host]
  F --> G[Selection]
  G --> H[Bioreactor]
  H --> I[Downstream processing]
  I --> J[Applications + ethics]
  classDef mint fill:#e7f8f2,stroke:#79cdb0,color:#15382e,stroke-width:1.5px;
  classDef blue fill:#edf8fc,stroke:#83cde8,color:#15382e,stroke-width:1.5px;
  classDef coral fill:#fff1ed,stroke:#ff9a83,color:#6b2b1f,stroke-width:1.5px;
  class A,B,C mint; class D,E,F blue; class G,H,I coral; class J mint;`

export default function ChapterRoadmap() {
  return (
    <SectionShell id="roadmap" eyebrow="Your learning route" title="See the whole chapter before you zoom in." description="Biotechnology is one connected story: find a useful gene, build recombinant DNA, move it into a living factory, recover the product safely, then apply it responsibly.">
      <div className="mb-8 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
        <div className="glass-card min-h-[300px] p-4 md:p-7"><MermaidDiagram chart={chart} /></div>
        <div className="relative overflow-hidden rounded-[28px] bg-ink p-7 text-white dark:bg-emerald-950">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-mint/10 blur-3xl" />
          <Route className="text-mint" size={26} />
          <h3 className="mt-7 text-2xl font-extrabold tracking-tight">The one-line chapter story</h3>
          <p className="mt-4 text-sm leading-7 text-white/70">Cut → copy → carry → select → express → scale → purify → apply.</p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 font-mono text-xs leading-6 text-mint">
            “I Can Copy Little Genes, Then Select Expressed Products”
            <br />
            <span className="text-white/50">Isolate · Cut · Copy · Ligate · Transfer · Select · Express · Purify</span>
          </div>
        </div>
      </div>
      <div className="roadmap-grid">
        {notes.roadmap.map((item, index) => (
          <a key={item.id} href={`#${item.id}`} className="roadmap-card group">
            <div className={`roadmap-number road-${item.accent}`}>{index === 0 ? <Check size={15} /> : item.number}</div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.15em] text-leaf/45 dark:text-mint/45">Module {item.number}</p>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
            <ArrowRight className="ml-auto shrink-0 text-leaf/30 transition group-hover:translate-x-1 group-hover:text-leaf" size={18} />
          </a>
        ))}
      </div>
    </SectionShell>
  )
}
