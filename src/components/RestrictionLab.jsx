import { useState } from 'react'
import { ArrowRight, CheckCircle2, Scissors, Sparkle } from 'lucide-react'
import notes from '../data/biotechnologyNotes.json'
import DNAHelix3D from './DNAHelix3D'
import { ConceptCard, MistakeAlert, NCERTImportantLine, NEETHighYieldBox, SectionShell, VisualDiagram } from './ui'

const bases = ['G', 'A', 'A', 'T', 'T', 'C']
const comp = ['C', 'T', 'T', 'A', 'A', 'G']

export default function RestrictionLab() {
  const [cut, setCut] = useState(false)
  const [hovered, setHovered] = useState(null)

  return (
    <SectionShell id="restriction" eyebrow="Lab 01 · Molecular scissors" title="Find the pattern. Make the cut." description="Restriction endonucleases scan DNA for specific recognition sequences. EcoRI’s six-base site is palindromic: both strands read GAATTC in the 5′→3′ direction." tone="tint">
      <div className="grid gap-6 xl:grid-cols-[1.08fr_.92fr]">
        <VisualDiagram label="Interactive 3D model" className="min-h-[540px] overflow-hidden">
          <DNAHelix3D cut={cut} />
          <div className="pointer-events-none absolute inset-x-5 bottom-5 flex flex-wrap items-end justify-between gap-3">
            <div className="model-label"><span className="bg-amber-400" /> recognition site</div>
            <div className="model-label"><span className="bg-coral" /> EcoRI enzyme</div>
          </div>
        </VisualDiagram>

        <div className="space-y-5">
          <div className="glass-card p-5 md:p-7">
            <div className="flex items-start justify-between gap-4"><div><p className="micro-label">Recognition sequence</p><h3 className="mt-2 text-xl font-extrabold text-ink dark:text-white">EcoRI reads the DNA like a mirror.</h3></div><div className="rounded-2xl bg-coral/10 p-3 text-coral"><Scissors /></div></div>
            <div className={`sequence-lab mt-7 ${cut ? 'is-cut' : ''}`}>
              <div className="strand-label">5′</div>
              <div className="sequence-row">
                {bases.map((base, index) => <button key={`a${index}`} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)} className={`${index === hovered ? 'active' : ''} ${index === 0 ? 'cut-after' : ''}`}>{base}</button>)}
              </div>
              <div className="strand-label">3′</div>
              <div className="strand-label">3′</div>
              <div className="sequence-row">
                {comp.map((base, index) => <button key={`b${index}`} onMouseEnter={() => setHovered(5-index)} onMouseLeave={() => setHovered(null)} className={`${5-index === hovered ? 'active' : ''} ${index === 4 ? 'cut-after' : ''}`}>{base}</button>)}
              </div>
              <div className="strand-label">5′</div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button onClick={() => setCut((value) => !value)} className="primary-button !px-5 !py-3"><Scissors size={16} /> {cut ? 'Reset DNA' : 'Let EcoRI cut'}</button>
              {cut && <div className="flex items-center gap-2 text-xs font-extrabold text-leaf dark:text-mint"><CheckCircle2 size={16} /> 5′ overhang formed</div>}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <ConceptCard icon={Sparkle} kicker="Sticky ends" title="Single-strand overhangs" color="mint">Complementary overhangs hydrogen-bond easily, making ligation efficient and specific.</ConceptCard>
            <ConceptCard icon={Scissors} kicker="Blunt ends" title="Straight across both strands" color="coral">No overhangs. They can still be ligated, but joining is less efficient and less selective.</ConceptCard>
          </div>
        </div>
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <NCERTImportantLine>{notes.restriction.fact}</NCERTImportantLine>
        <NEETHighYieldBox>EcoRI: <strong>E</strong>scherichia <strong>co</strong>li strain <strong>R</strong>Y13, first enzyme isolated from that strain.</NEETHighYieldBox>
        <MistakeAlert>Palindromic DNA is read in the same direction on both strands—always compare 5′→3′, not straight down the page.</MistakeAlert>
      </div>
    </SectionShell>
  )
}
