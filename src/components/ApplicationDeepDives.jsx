import {
  Activity,
  ArrowRight,
  Bug,
  CheckCircle2,
  ClipboardCheck,
  Dna,
  FlaskConical,
  Microscope,
  Scale,
  ScanSearch,
  ShieldCheck,
  Syringe,
  TestTube2,
  Wheat,
} from 'lucide-react'
import {
  ConceptCard,
  FlowchartBlock,
  MistakeAlert,
  NCERTImportantLine,
  NEETHighYieldBox,
  SectionShell,
  VisualDiagram,
} from './ui'
import { RevisionTable } from './LearningComponents'

const highYieldFacts = [
  ['EcoRI', 'Recognises GAATTC and forms sticky ends.'],
  ['PCR copies', 'Ideal copies after n cycles = 2^n.'],
  ['Gel direction', 'DNA moves towards the positive electrode.'],
  ['ori', 'Controls replication start and affects copy number.'],
  ['Selectable marker', 'Helps identify transformed cells.'],
  ['Bt toxin', 'Protoxin becomes active in alkaline insect gut.'],
  ['RNAi', 'Silences genes by targeting matching mRNA.'],
  ['ADA deficiency', 'Classic NCERT gene therapy example.'],
  ['ELISA', 'Based on antigen-antibody interaction.'],
  ['GEAC', 'Evaluates GM organism safety and validity in India.'],
]

const confusingTerms = [
  ['Transformant', 'Cell that received foreign DNA.', 'Recombinant', 'Cell/vector carrying desired inserted DNA.'],
  ['Sticky end', 'Single-stranded overhang.', 'Blunt end', 'No overhang.'],
  ['Probe', 'Complementary labelled DNA/RNA used for detection.', 'Primer', 'Short sequence that starts DNA synthesis in PCR.'],
  ['Bioreactor', 'Controlled vessel for production.', 'Downstream processing', 'Recovery and purification after production.'],
]

const matchRows = [
  ['Taq polymerase', 'PCR extension'],
  ['Sparger', 'Aeration in bioreactor'],
  ['ELISA', 'Antigen-antibody detection'],
  ['RNAi', 'mRNA degradation'],
  ['Cry protein', 'Bt cotton pest resistance'],
]

export function ApplicationDeepDives() {
  return (
    <>
      <HumanInsulinSection />
      <BtCottonSection />
      <GeneTherapySection />
      <RNAiSection />
      <MolecularDiagnosisSection />
      <EthicsGeacSection />
    </>
  )
}

export function NEETHighYieldSection() {
  return (
    <SectionShell
      id="high-yield"
      eyebrow="NEET high-yield"
      title="The exam layer: facts, traps, tables and fast revision hooks."
      description="This block is intentionally dense. It turns the chapter into one-line recall, comparison logic and mistake alerts."
      tone="tint"
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_.9fr]">
        <div className="glass-card p-6">
          <p className="micro-label">One-line facts</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {highYieldFacts.map(([term, fact]) => (
              <div key={term} className="yield-fact">
                <strong>{term}</strong>
                <span>{fact}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <NEETHighYieldBox title="Most asked sequence">Isolate DNA - cut - amplify - ligate - transform - select - express - purify.</NEETHighYieldBox>
          <MistakeAlert>Do not confuse PCR primers with DNA probes. Primers start synthesis; probes detect complementary sequences.</MistakeAlert>
          <NCERTImportantLine>NCERT-style questions often ask function from context, not just the tool name. Read the verb: cut, join, amplify, select, purify.</NCERTImportantLine>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-5">
          <p className="micro-label mb-4">Common confusing terms</p>
          <RevisionTable columns={['Term A', 'Meaning', 'Term B', 'Meaning']} rows={confusingTerms} />
        </div>
        <div className="glass-card p-5">
          <p className="micro-label mb-4">Match-the-following drill</p>
          <RevisionTable columns={['Column I', 'Column II']} rows={matchRows} />
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Restriction enzymes', 'Recognition site, palindrome, sticky/blunt ends.'],
          ['PCR', '95 C, 50-65 C, 72 C and exponential copies.'],
          ['Vectors', 'ori, selectable marker, cloning site, copy number.'],
          ['Applications', 'Insulin, Bt cotton, ADA therapy, RNAi, ELISA, GEAC.'],
        ].map(([title, text], index) => (
          <ConceptCard key={title} icon={[Dna, Activity, ClipboardCheck, ScanSearch][index]} kicker="Heat zone" title={title} color={['coral', 'sky', 'mint', 'lime'][index]}>
            {text}
          </ConceptCard>
        ))}
      </div>
    </SectionShell>
  )
}

function HumanInsulinSection() {
  return (
    <SectionShell
      id="insulin"
      eyebrow="Application deep dive"
      title="Human insulin production: from proinsulin logic to recombinant product."
      description="Earlier insulin from animals could cause immune reactions in some patients. Recombinant DNA technology made it possible to produce human insulin chains in microbial systems."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <VisualDiagram label="proinsulin to insulin" className="min-h-[520px] p-6">
          <div className="grid h-full place-items-center pt-14">
            <InsulinDeepGraphic />
          </div>
        </VisualDiagram>
        <div className="grid gap-4">
          <ConceptCard icon={Syringe} kicker="Problem" title="Why not rely only on animal insulin?" color="coral">Animal insulin is similar but not identical to human insulin, so it could trigger allergic or immune responses in some individuals.</ConceptCard>
          <ConceptCard icon={Dna} kicker="NCERT core" title="Proinsulin vs mature insulin" color="mint">Proinsulin contains A-chain, B-chain and C-peptide. Mature insulin forms when C-peptide is removed and A/B chains are linked.</ConceptCard>
          <ConceptCard icon={Bug} kicker="Production idea" title="Bacterial factory" color="sky">Genes for insulin chains can be expressed in bacteria, followed by purification and chain assembly.</ConceptCard>
          <div className="rounded-[26px] bg-ink p-5 text-white dark:bg-emerald-950">
            <FlowchartBlock steps={['Human gene', 'Bacteria', 'A + B chains', 'Purification', 'Insulin vial']} />
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

function BtCottonSection() {
  return (
    <SectionShell
      id="bt-cotton"
      eyebrow="Application deep dive"
      title="Bt cotton: a plant protection story with a built-in activation switch."
      description="Bt cotton expresses genes from Bacillus thuringiensis. The toxin is produced as an inactive protoxin and becomes active in the alkaline gut of target insects."
      tone="tint"
    >
      <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
        <div className="grid gap-4">
          <ConceptCard icon={Wheat} kicker="Source" title="Bacillus thuringiensis" color="mint">Bt genes encode Cry proteins that can protect plants from specific insect pests.</ConceptCard>
          <ConceptCard icon={Bug} kicker="Mechanism" title="Protoxin activation" color="coral">The protoxin is activated in the alkaline gut, then damages the insect midgut epithelium.</ConceptCard>
          <ConceptCard icon={ShieldCheck} kicker="Responsible use" title="Benefits and limits" color="sky">Bt crops can reduce insecticide use, but resistance management and ecological monitoring matter.</ConceptCard>
          <NEETHighYieldBox>NEET trap: the toxin is not fully active inside the plant. Activation is linked to the alkaline insect gut.</NEETHighYieldBox>
        </div>
        <VisualDiagram label="Bt toxin activation" className="min-h-[540px] p-6">
          <div className="grid h-full place-items-center pt-14">
            <BtDeepGraphic />
          </div>
        </VisualDiagram>
      </div>
    </SectionShell>
  )
}

function GeneTherapySection() {
  return (
    <SectionShell
      id="gene-therapy"
      eyebrow="Application deep dive"
      title="Gene therapy: correcting function by adding a working gene."
      description="At this level, focus on somatic gene therapy and the ADA deficiency example. The core idea is to compensate for a faulty gene."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <VisualDiagram label="ex vivo therapy timeline" className="min-h-[520px] p-6">
          <div className="grid h-full place-items-center pt-14">
            <TherapyDeepGraphic />
          </div>
        </VisualDiagram>
        <div className="grid gap-4">
          <ConceptCard icon={ShieldCheck} kicker="Definition" title="What gene therapy means" color="mint">A functional gene is introduced into cells to compensate for a missing or defective gene product.</ConceptCard>
          <ConceptCard icon={Activity} kicker="Two routes" title="Ex vivo and in vivo" color="sky">Ex vivo corrects cells outside the body and returns them. In vivo delivers the gene inside the body.</ConceptCard>
          <ConceptCard icon={Dna} kicker="Example" title="ADA deficiency" color="coral">ADA deficiency is the standard NCERT example used to explain gene therapy at student level.</ConceptCard>
          <NCERTImportantLine>Somatic gene therapy affects body cells, not future generations. Keep that distinction clean.</NCERTImportantLine>
        </div>
      </div>
    </SectionShell>
  )
}

function RNAiSection() {
  return (
    <SectionShell
      id="rnai"
      eyebrow="Application deep dive"
      title="RNA interference: silencing a gene by destroying its message."
      description="RNAi uses double-stranded RNA logic to target complementary mRNA. NCERT highlights nematode resistance in tobacco plants."
      tone="tint"
    >
      <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
        <div className="grid gap-4">
          <ConceptCard icon={Dna} kicker="Trigger" title="dsRNA enters the pathway" color="sky">Double-stranded RNA is processed into small RNA guides that match a target mRNA.</ConceptCard>
          <ConceptCard icon={Activity} kicker="Effect" title="mRNA degradation" color="coral">The matching mRNA is cut or blocked, so the protein is not produced.</ConceptCard>
          <ConceptCard icon={Wheat} kicker="Example" title="Nematode-resistant tobacco" color="lime">RNAi can silence important nematode genes, protecting the plant root from infection.</ConceptCard>
          <MistakeAlert>RNAi does not cut the DNA gene itself. It blocks expression by acting at the RNA/message level.</MistakeAlert>
        </div>
        <VisualDiagram label="gene silencing switch" className="min-h-[520px] p-6">
          <div className="grid h-full place-items-center pt-14">
            <RNAiDeepGraphic />
          </div>
        </VisualDiagram>
      </div>
    </SectionShell>
  )
}

function MolecularDiagnosisSection() {
  return (
    <SectionShell
      id="diagnosis"
      eyebrow="Application deep dive"
      title="Molecular diagnosis: detecting tiny signals early."
      description="Early diagnosis matters because pathogen load or disease markers may be low. PCR, ELISA and DNA probes give sensitive detection routes."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <VisualDiagram label="diagnostic lab dashboard" className="min-h-[540px] p-6">
          <div className="grid h-full place-items-center pt-14">
            <DiagnosisDeepGraphic />
          </div>
        </VisualDiagram>
        <div className="grid gap-4">
          <ConceptCard icon={TestTube2} kicker="PCR" title="Amplify the target" color="mint">PCR-based diagnosis detects very low amounts of pathogen DNA or RNA after amplification.</ConceptCard>
          <ConceptCard icon={FlaskConical} kicker="ELISA" title="Colour means binding" color="sky">ELISA uses antigen-antibody interaction and an enzyme-linked signal, often a colour change.</ConceptCard>
          <ConceptCard icon={ScanSearch} kicker="DNA probe" title="Complementary detection" color="coral">A labelled probe binds a matching sequence, helping detect a specific target.</ConceptCard>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="diagnosis-result positive">Positive: signal appears</div>
            <div className="diagnosis-result negative">Negative: no target signal</div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

function EthicsGeacSection() {
  return (
    <SectionShell
      id="ethics"
      eyebrow="Ethics and GEAC"
      title="Biotechnology also asks: safe for whom, owned by whom, and released under what rules?"
      description="This closes the chapter with biosafety, GM organisms, patents, biopiracy, ethical issues and the role of GEAC in India."
      tone="tint"
    >
      <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
        <div className="grid gap-4">
          <ConceptCard icon={Scale} kicker="Ethics" title="Benefit vs concern" color="sky">GM technology can help health and agriculture, but risk, access, environment and consent must be evaluated.</ConceptCard>
          <ConceptCard icon={ClipboardCheck} kicker="Regulation" title="GEAC role" color="mint">GEAC is linked with appraisal of genetically engineered organisms and products for environmental safety and validity.</ConceptCard>
          <ConceptCard icon={ShieldCheck} kicker="Biosafety" title="Responsible release" color="lime">Field release and commercial use require assessment, monitoring and safeguards.</ConceptCard>
          <ConceptCard icon={Microscope} kicker="Biopiracy" title="Fair use of bioresources" color="coral">Biopiracy involves unfair exploitation of biological resources or traditional knowledge without fair benefit sharing.</ConceptCard>
        </div>
        <VisualDiagram label="approval and ethics pipeline" className="min-h-[540px] p-6">
          <div className="grid h-full place-items-center pt-14">
            <EthicsDeepGraphic />
          </div>
        </VisualDiagram>
      </div>
    </SectionShell>
  )
}

function InsulinDeepGraphic() {
  return (
    <div className="deep-stage">
      <div className="proinsulin-strip">
        <span className="seg-a">A-chain</span>
        <span className="seg-c">C-peptide removed</span>
        <span className="seg-b">B-chain</span>
      </div>
      <div className="deep-arrow">processing</div>
      <div className="insulin-finished">
        <span>A</span>
        <i>S-S</i>
        <span>B</span>
      </div>
      <div className="deep-pipeline">
        {['gene', 'bacteria', 'purify', 'vial'].map((step) => <strong key={step}>{step}</strong>)}
      </div>
    </div>
  )
}

function BtDeepGraphic() {
  return (
    <div className="deep-stage bt-stage">
      <div className="plant-shield"><Wheat size={64} /><span>Bt gene in plant</span></div>
      <div className="cry-flow">
        <strong>Cry protoxin</strong>
        <ArrowRight />
        <strong>alkaline gut</strong>
        <ArrowRight />
        <strong>active toxin</strong>
      </div>
      <div className="gut-card"><Bug size={30} /> midgut cells damaged</div>
    </div>
  )
}

function TherapyDeepGraphic() {
  return (
    <div className="deep-stage">
      <div className="therapy-timeline">
        {['Patient cells removed', 'Normal gene delivered', 'Cells corrected', 'Cells returned'].map((step, index) => (
          <div key={step} className="therapy-step">
            <span>{index + 1}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}

function RNAiDeepGraphic() {
  return (
    <div className="deep-stage rnai-stage">
      <div className="rna-duplex">dsRNA</div>
      <ArrowRight />
      <div className="rna-guides">small RNA guide</div>
      <ArrowRight />
      <div className="target-mrna">target mRNA cut</div>
      <div className="silence-switch"><span /> gene silenced</div>
    </div>
  )
}

function DiagnosisDeepGraphic() {
  return (
    <div className="deep-stage diagnosis-stage">
      <div className="pcr-panel"><strong>PCR</strong><span>target amplified</span><i /></div>
      <div className="microplate">
        {Array.from({ length: 24 }).map((_, index) => <span key={index} className={index % 5 === 0 ? 'signal' : ''} />)}
      </div>
      <div className="probe-line">DNA probe binds complementary target</div>
    </div>
  )
}

function EthicsDeepGraphic() {
  return (
    <div className="deep-stage ethics-stage">
      <div className="balance-card"><Scale size={58} /><span>benefits vs concerns</span></div>
      <div className="approval-flow">
        {['Research', 'Biosafety data', 'GEAC appraisal', 'Monitored release'].map((step) => <strong key={step}>{step}</strong>)}
      </div>
      <div className="map-card">Biopiracy watch: credit, consent, benefit sharing</div>
    </div>
  )
}
