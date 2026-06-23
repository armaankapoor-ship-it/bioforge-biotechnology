import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Dna, RotateCcw, Thermometer } from 'lucide-react'
import notes from '../data/biotechnologyNotes.json'
import { NEETHighYieldBox, SectionShell } from './ui'

function DNAPhaseVisual({ phase }) {
  return (
    <div className={`pcr-dna phase-${phase}`}>
      {[0,1,2,3,4,5,6,7,8].map((i) => <span key={i} style={{ '--i': i }}><i /><b /><em /></span>)}
      {phase === 1 && <><div className="primer primer-a">primer</div><div className="primer primer-b">primer</div></>}
      {phase === 2 && <div className="polymerase">Taq</div>}
    </div>
  )
}

export default function PCRCycleAnimation() {
  const [phase, setPhase] = useState(0)
  const [cycles, setCycles] = useState(5)
  const [playing, setPlaying] = useState(false)
  const copies = useMemo(() => 2 ** cycles, [cycles])

  useEffect(() => {
    if (!playing) return undefined
    const timer = setInterval(() => setPhase((value) => (value + 1) % 3), 1700)
    return () => clearInterval(timer)
  }, [playing])

  const current = notes.pcrPhases[phase]
  return (
    <SectionShell id="pcr" eyebrow="Lab 02 · DNA photocopier" title="One target. Millions of copies." description="PCR is a repeating three-temperature cycle. Each newly made strand becomes a template in the next cycle, so the ideal number of DNA molecules doubles: 2ⁿ.">
      <div className="grid gap-6 xl:grid-cols-[1.12fr_.88fr]">
        <div className="visual-panel min-h-[540px] overflow-hidden p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div><p className="micro-label">Thermal cycle</p><h3 className="mt-2 text-2xl font-extrabold text-ink dark:text-white">{current.name}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300">{current.description}</p></div>
            <div className="temperature-dial" style={{ '--phase-color': current.color }}><Thermometer size={18} /><strong>{current.temperature}</strong></div>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-2">
            {notes.pcrPhases.map((item, index) => <button key={item.name} onClick={() => setPhase(index)} className={`phase-tab ${phase === index ? 'active' : ''}`} style={{ '--phase-color': item.color }}><span>0{index+1}</span>{item.name}</button>)}
          </div>
          <div className="mt-8 flex min-h-[260px] items-center justify-center rounded-[24px] border border-white/70 bg-white/55 p-5 dark:border-white/10 dark:bg-white/5">
            <DNAPhaseVisual phase={phase} />
          </div>
          <div className="mt-5 flex items-center justify-between">
            <button onClick={() => setPhase((phase + 2) % 3)} className="circle-control" aria-label="Previous PCR phase"><ChevronLeft /></button>
            <button onClick={() => setPlaying((v) => !v)} className="secondary-button !py-2.5">{playing ? 'Pause cycle' : 'Animate cycle'}</button>
            <button onClick={() => setPhase((phase + 1) % 3)} className="circle-control" aria-label="Next PCR phase"><ChevronRight /></button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="glass-card p-6 md:p-8">
            <div className="flex items-center justify-between"><div><p className="micro-label">Amplification calculator</p><h3 className="mt-2 text-xl font-extrabold text-ink dark:text-white">How fast does DNA multiply?</h3></div><Dna className="text-leaf dark:text-mint" /></div>
            <div className="copy-display mt-7"><span>Approximate copies</span><strong>{copies.toLocaleString()}</strong><small>2<sup>{cycles}</sup> from one starting molecule</small></div>
            <label className="mt-7 block text-xs font-extrabold text-ink dark:text-white">PCR cycles: <span className="text-leaf dark:text-mint">{cycles}</span></label>
            <input type="range" min="0" max="20" value={cycles} onChange={(event) => setCycles(Number(event.target.value))} className="range-control mt-3 w-full" />
            <div className="mt-6 flex h-36 items-end gap-1.5 rounded-2xl bg-emerald-50/60 p-4 dark:bg-emerald-300/5">
              {Array.from({ length: Math.max(cycles, 1) }, (_, i) => {
                const h = 10 + (i / Math.max(cycles - 1, 1)) * 90
                return <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-leaf to-mint transition-all duration-500" style={{ height: `${h}%`, opacity: .38 + (i / Math.max(cycles,1)) * .62 }} title={`Cycle ${i+1}: ${2 ** (i+1)} copies`} />
              })}
            </div>
            <button onClick={() => { setCycles(5); setPhase(0); setPlaying(false) }} className="mt-5 flex items-center gap-2 text-xs font-extrabold text-leaf dark:text-mint"><RotateCcw size={14} /> Reset simulator</button>
          </div>
          <NEETHighYieldBox>Primers define the target. Taq polymerase extends them at 72°C. The heat-resistant enzyme was isolated from <em>Thermus aquaticus</em>.</NEETHighYieldBox>
        </div>
      </div>
    </SectionShell>
  )
}
