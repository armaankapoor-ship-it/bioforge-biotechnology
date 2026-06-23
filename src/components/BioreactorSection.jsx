import { useState } from 'react'
import { Activity, Droplets, Fan, Gauge, ThermometerSun, Wind } from 'lucide-react'
import Bioreactor3D from './Bioreactor3D'
import { FlowchartBlock, SectionShell, VisualDiagram } from './ui'

export default function BioreactorSection() {
  const [oxygen, setOxygen] = useState(68)
  const [speed, setSpeed] = useState(55)
  return (
    <SectionShell id="bioreactor" eyebrow="Lab 05 · Scale-up" title="Turn a cell into a production system." description="A stirred-tank bioreactor maintains the conditions cells need to grow and produce a desired molecule—at a scale far beyond a laboratory flask." tone="tint">
      <div className="grid gap-6 xl:grid-cols-[1.08fr_.92fr]">
        <VisualDiagram label="Live 3D stirred tank" className="min-h-[610px] overflow-hidden">
          <Bioreactor3D oxygen={oxygen} speed={speed} />
          <div className="reactor-label label-inlet">Nutrient inlet</div><div className="reactor-label label-motor">Motor + shaft</div><div className="reactor-label label-sparger">Air sparger</div><div className="reactor-label label-outlet">Harvest outlet</div>
        </VisualDiagram>
        <div className="space-y-5">
          <div className="glass-card p-6 md:p-8">
            <div className="flex items-center justify-between"><div><p className="micro-label">Process control</p><h3 className="mt-2 text-xl font-extrabold text-ink dark:text-white">Cell culture dashboard</h3></div><Activity className="text-leaf dark:text-mint" /></div>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <Parameter icon={ThermometerSun} label="Temperature" value="37.0" unit="°C" color="coral" />
              <Parameter icon={Droplets} label="pH" value="7.2" unit="pH" color="sky" />
              <Parameter icon={Wind} label="Dissolved O₂" value={oxygen} unit="%" color="mint" />
              <Parameter icon={Fan} label="Agitation" value={speed * 6} unit="rpm" color="lime" />
            </div>
            <Control label="Oxygen flow" value={oxygen} onChange={setOxygen} />
            <Control label="Impeller speed" value={speed} onChange={setSpeed} />
          </div>
          <div className="glass-card p-6"><p className="micro-label">Why each part matters</p><div className="mt-4 space-y-3"><ReactorPart name="Impeller" text="mixes nutrients and cells uniformly" /><ReactorPart name="Sparger" text="introduces sterile air as fine bubbles" /><ReactorPart name="Sensors" text="track pH, temperature and oxygen" /><ReactorPart name="Foam control" text="prevents excessive foaming" /></div></div>
        </div>
      </div>
      <div className="mt-6 rounded-[26px] border border-leaf/10 bg-white/60 p-6 shadow-sm dark:border-white/10 dark:bg-white/5"><p className="micro-label mb-4">Scale-up pathway</p><FlowchartBlock steps={['Lab flask', 'Seed culture', 'Pilot scale', 'Industrial bioreactor', 'Harvest', 'Purification']} /></div>
    </SectionShell>
  )
}

function Parameter({ icon: Icon, label, value, unit, color }) {
  return <div className="parameter-card"><div className={`icon-${color}`}><Icon size={16} /></div><span>{label}</span><strong>{value}<small>{unit}</small></strong></div>
}

function Control({ label, value, onChange }) {
  return <label className="mt-6 block"><div className="mb-2 flex justify-between text-xs font-extrabold text-ink dark:text-white"><span>{label}</span><span className="text-leaf dark:text-mint">{value}%</span></div><input type="range" min="10" max="100" value={value} onChange={(e) => onChange(Number(e.target.value))} className="range-control w-full" /></label>
}

function ReactorPart({ name, text }) {
  return <div className="flex items-center gap-3 rounded-xl bg-emerald-50/60 p-3 text-xs dark:bg-emerald-300/5"><Gauge size={15} className="shrink-0 text-leaf dark:text-mint" /><strong className="text-ink dark:text-white">{name}</strong><span className="text-slate-500 dark:text-slate-400">{text}</span></div>
}
