import { useMemo, useState } from 'react'
import { ArrowRight, BatteryCharging, MoveRight, Ruler, Waves } from 'lucide-react'
import { MistakeAlert, SectionShell } from './ui'

const fragments = [1500, 1000, 700, 500, 300, 150]
const distanceFor = (bp) => Math.max(8, Math.min(91, 200 - Math.log10(bp) * 55))

export default function GelElectrophoresisAnimation() {
  const [size, setSize] = useState(700)
  const [running, setRunning] = useState(true)
  const distance = useMemo(() => distanceFor(size), [size])

  return (
    <SectionShell id="gel" eyebrow="Lab 04 · DNA separation" title="Small fragments travel farther." description="Agarose is a molecular sieve. Negatively charged DNA moves from the cathode towards the positive anode; short fragments navigate the pores more easily and migrate farther." >
      <div className="grid gap-6 xl:grid-cols-[1.12fr_.88fr]">
        <div className="visual-panel min-h-[580px] overflow-hidden p-5 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="micro-label">Live electrophoresis chamber</p><h3 className="mt-2 text-xl font-extrabold text-ink dark:text-white">Select a fragment and run the gel.</h3></div><button onClick={() => setRunning((v) => !v)} className="secondary-button !py-2.5"><Waves size={16} /> {running ? 'Pause field' : 'Apply current'}</button></div>
          <div className={`gel-chamber mt-8 ${running ? 'is-running' : ''}`}>
            <div className="electrode cathode"><b>−</b><span>cathode</span></div>
            <div className="gel-bed">
              <div className="wells">{[0,1,2,3,4].map(i => <i key={i} />)}</div>
              <div className="sample-band" style={{ '--distance': `${distance}%` }}><span>{size} bp</span></div>
              {fragments.map((fragment, index) => <div key={fragment} className="dna-band" style={{ left: `${distanceFor(fragment)}%`, top: `${20 + index * 11}%`, animationDelay: `${index * -0.3}s` }}><span>{fragment}</span></div>)}
              <div className="field-lines"><MoveRight/><MoveRight/><MoveRight/></div>
            </div>
            <div className="electrode anode"><b>+</b><span>anode</span></div>
          </div>
          <div className="mt-7 rounded-[22px] border border-white/70 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-between text-xs font-extrabold text-ink dark:text-white"><span>Fragment size</span><strong className="text-leaf dark:text-mint">{size} base pairs</strong></div>
            <input type="range" min="100" max="1600" step="50" value={size} onChange={(e) => setSize(Number(e.target.value))} className="range-control mt-4 w-full" />
            <div className="mt-4 flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400"><span>100 bp · travels far</span><span>1600 bp · stays near well</span></div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="glass-card p-6 md:p-8">
            <div className="flex items-center gap-3"><div className="rounded-2xl bg-sky/20 p-3 text-sky-700 dark:text-sky"><Ruler /></div><div><p className="micro-label">Inverse relationship</p><h3 className="text-xl font-extrabold text-ink dark:text-white">Size vs migration</h3></div></div>
            <div className="migration-graph mt-8">
              <div className="axis-y">distance moved</div><div className="axis-x">fragment size (bp)</div>
              <svg viewBox="0 0 320 180" role="img" aria-label="Graph showing smaller DNA fragments migrate farther">
                <path d="M25 18 V155 H305" fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="2" />
                <path d="M30 30 C70 65 120 105 300 145" fill="none" stroke="#28a47b" strokeWidth="5" strokeLinecap="round" />
                <circle cx={30 + (size-100)/1500*270} cy={30 + (1-distance/100)*115} r="7" fill="#ff7f66" stroke="white" strokeWidth="3" />
              </svg>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 text-center">
              <div className="gel-fact"><BatteryCharging/><strong>DNA charge</strong><span>negative</span></div>
              <div className="gel-fact"><ArrowRight/><strong>Direction</strong><span>to anode</span></div>
              <div className="gel-fact"><Waves/><strong>Matrix</strong><span>agarose</span></div>
            </div>
          </div>
          <MistakeAlert>DNA fragments are separated primarily by size—not by charge—because DNA molecules have a similar charge-to-mass ratio.</MistakeAlert>
          <div className="rounded-[24px] bg-ink p-6 text-white dark:bg-emerald-950"><p className="micro-label !text-mint/60">Final step</p><h4 className="mt-2 text-lg font-extrabold">Cut the band. Elute the DNA.</h4><p className="mt-2 text-sm leading-6 text-white/65">The desired band is excised from the gel and the DNA fragment is recovered for the next step.</p></div>
        </div>
      </div>
    </SectionShell>
  )
}
