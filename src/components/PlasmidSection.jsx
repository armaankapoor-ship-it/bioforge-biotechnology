import { useState } from 'react'
import { CircleDot, PackageOpen, ScanSearch } from 'lucide-react'
import notes from '../data/biotechnologyNotes.json'
import Plasmid3D from './Plasmid3D'
import { NCERTImportantLine, SectionShell, VisualDiagram } from './ui'

export default function PlasmidSection() {
  const [active, setActive] = useState('insert')
  const selected = notes.plasmidHotspots.find((item) => item.id === active)
  return (
    <SectionShell id="plasmid" eyebrow="Lab 03 · Cloning vector" title="A tiny circular delivery vehicle." description="A plasmid is engineered to carry foreign DNA, copy inside a host, and help us find cells that accepted it. Tap the coloured arcs to inspect its essential features." tone="tint">
      <div className="grid gap-6 xl:grid-cols-[1.05fr_.95fr]">
        <VisualDiagram label="Drag-free interactive plasmid" className="min-h-[540px] overflow-hidden">
          <Plasmid3D activeHotspot={active} onHotspot={setActive} />
          <div className="absolute left-5 right-5 top-16 flex justify-center"><p className="rounded-full bg-ink/80 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur">Tap a coloured segment to inspect it</p></div>
        </VisualDiagram>
        <div className="space-y-5">
          <div className="glass-card p-5 md:p-7">
            <div className="flex items-center gap-3"><div className="rounded-2xl bg-emerald-100 p-3 text-leaf dark:bg-emerald-300/10 dark:text-mint"><CircleDot /></div><div><p className="micro-label">Original vector schematic</p><h3 className="text-xl font-extrabold text-ink dark:text-white">Recombinant plasmid map</h3></div></div>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {notes.plasmidHotspots.map((item) => <button key={item.id} onClick={() => setActive(item.id)} className={`hotspot-button ${active === item.id ? 'active' : ''}`} style={{ '--spot': item.color }}><span style={{ background: item.color }} /> <strong>{item.label}</strong><small>{item.title}</small></button>)}
            </div>
            <div className="mt-5 min-h-[130px] rounded-[22px] border border-leaf/10 bg-emerald-50/60 p-5 dark:border-white/10 dark:bg-white/5">
              <p className="micro-label">Selected feature</p><h4 className="mt-2 text-lg font-extrabold text-ink dark:text-white">{selected.title}</h4><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{selected.description}</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="mini-process"><PackageOpen /><div><strong>01 · Open</strong><span>Vector and insert are cut with compatible enzymes.</span></div></div>
            <div className="mini-process"><ScanSearch /><div><strong>02 · Seal</strong><span>DNA ligase closes the recombinant molecule.</span></div></div>
          </div>
          <NCERTImportantLine>A cloning vector needs an origin of replication, selectable marker and one or more unique cloning sites.</NCERTImportantLine>
        </div>
      </div>
    </SectionShell>
  )
}
