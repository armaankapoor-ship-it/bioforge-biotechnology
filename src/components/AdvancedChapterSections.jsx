import { useState } from 'react'
import {
  Activity,
  ArrowRight,
  BookOpen,
  Bug,
  CheckCircle2,
  CircleDot,
  ClipboardCheck,
  Dna,
  Factory,
  Filter,
  FlaskConical,
  Gauge,
  Microscope,
  Pipette,
  Scale,
  ScanSearch,
  ShieldCheck,
  Syringe,
  TestTube2,
  Wheat,
} from 'lucide-react'
import quizQuestions from '../data/quizQuestions.json'
import flashcards from '../data/flashcards.json'
import { ApplicationDeepDives, NEETHighYieldSection } from './ApplicationDeepDives'
import { ThreeDModelGallery } from './StudyContentExpansion'
import {
  FlashcardDeck,
  ProcessTimeline,
  QuizCard,
  RevisionTable,
  ScoreTracker,
} from './LearningComponents'
import {
  ConceptCard,
  FlowchartBlock,
  MistakeAlert,
  NCERTImportantLine,
  NEETHighYieldBox,
  SectionShell,
  VisualDiagram,
} from './ui'

const toolCards = [
  { icon: Microscope, title: 'Restriction enzymes', label: 'Molecular scissors', text: 'Cut DNA at specific recognition sequences and create sticky or blunt ends.', color: 'coral' },
  { icon: Dna, title: 'DNA ligase', label: 'Molecular glue', text: 'Joins compatible DNA ends by sealing phosphodiester bonds.', color: 'mint' },
  { icon: Activity, title: 'Polymerases', label: 'DNA copier', text: 'Build DNA strands; Taq polymerase powers PCR because it tolerates heat.', color: 'sky' },
  { icon: CircleDot, title: 'Vectors', label: 'Delivery vehicle', text: 'Carry the desired DNA into a host and replicate there.', color: 'lime' },
  { icon: Factory, title: 'Host organisms', label: 'Living factory', text: 'Bacteria, yeast, plant or animal cells copy and express recombinant DNA.', color: 'mint' },
]

const transformationMethods = [
  ['CaCl2 treatment', 'Makes bacterial membranes more permeable to plasmid DNA.'],
  ['Heat shock', 'A quick temperature pulse encourages plasmid entry into competent cells.'],
  ['Microinjection', 'DNA is injected directly into a cell or nucleus using a fine needle.'],
  ['Gene gun', 'DNA-coated micro-particles are shot into plant cells.'],
  ['Disarmed pathogen', 'A pathogen vector is made safe but still useful for DNA delivery.'],
  ['Agrobacterium', 'A natural plant transformation system adapted for gene transfer.'],
]

const applicationCards = [
  {
    icon: Syringe,
    title: 'Genetically engineered insulin',
    tag: 'Eli Lilly era concept',
    text: 'Human insulin genes are expressed in microbes to produce A and B chains that are purified and combined.',
    points: ['Animal insulin could trigger allergy-like responses in some patients.', 'Mature insulin has A and B chains linked by disulphide bonds.', 'Proinsulin contains an extra C-peptide that is removed.'],
    visual: 'insulin',
  },
  {
    icon: Wheat,
    title: 'Bt cotton',
    tag: 'Cry protein',
    text: 'A Bt gene helps cotton produce an insecticidal protein that becomes active in an alkaline insect gut.',
    points: ['Protoxin is inactive in the plant.', 'Alkaline gut activates toxin.', 'Active toxin damages midgut epithelial cells of target pests.'],
    visual: 'bt',
  },
  {
    icon: ShieldCheck,
    title: 'Gene therapy',
    tag: 'ADA deficiency example',
    text: 'A normal gene is introduced to compensate for a faulty gene; somatic gene therapy is taught at this level.',
    points: ['Ex vivo: cells are corrected outside and returned.', 'In vivo: vector delivers gene inside the body.', 'Early intervention gives better outcomes.'],
    visual: 'therapy',
  },
  {
    icon: Dna,
    title: 'RNA interference',
    tag: 'Gene silencing',
    text: 'Double-stranded RNA can trigger degradation of matching mRNA, switching off a gene.',
    points: ['dsRNA is processed into small RNAs.', 'Matching mRNA is cut or blocked.', 'Used in nematode-resistant tobacco concept.'],
    visual: 'rnai',
  },
  {
    icon: ScanSearch,
    title: 'Molecular diagnosis',
    tag: 'PCR, ELISA, probes',
    text: 'Early detection uses nucleic-acid amplification, DNA probes and antigen-antibody reactions.',
    points: ['PCR detects low pathogen DNA/RNA amounts.', 'ELISA detects antigen-antibody interaction.', 'DNA probes bind complementary sequences.'],
    visual: 'diagnosis',
  },
  {
    icon: Scale,
    title: 'Ethics, biosafety and GEAC',
    tag: 'Responsible biotechnology',
    text: 'GM products must be evaluated for biosafety, ecological impact, patents and ethical concerns.',
    points: ['GEAC evaluates GM organism safety in India.', 'Biopiracy involves unfair use of bioresources.', 'Patents and public interest both matter.'],
    visual: 'ethics',
  },
]

const enzymeRows = [
  ['Restriction endonuclease', 'Cuts DNA at recognition sites', 'EcoRI makes sticky ends at GAATTC'],
  ['DNA ligase', 'Seals sugar-phosphate backbone', 'Forms recombinant DNA'],
  ['Taq polymerase', 'Extends primers during PCR', 'Works best around 72°C'],
  ['Lysozyme / cellulase / chitinase', 'Breaks cell wall', 'Used depending on bacterial, plant or fungal cell'],
  ['Protease', 'Removes proteins during DNA isolation', 'Helps purify nucleic acids'],
  ['RNase', 'Removes RNA during DNA isolation', 'Leaves DNA enriched in the sample'],
]

const processRows = [
  ['Isolation', 'Release and purify DNA', 'Cell lysis, enzymes, ethanol precipitation'],
  ['Restriction digestion', 'Create compatible ends', 'Restriction enzyme + recognition sequence'],
  ['PCR', 'Amplify target gene', 'Denaturation, annealing, extension'],
  ['Ligation', 'Insert gene into vector', 'DNA ligase joins sticky ends'],
  ['Transformation', 'Move rDNA into host', 'Competent host, heat shock, vectors'],
  ['Selection', 'Find recombinants', 'Markers, insertional inactivation, blue-white idea'],
  ['Bioprocessing', 'Scale and recover product', 'Bioreactor + downstream processing'],
]

const definitionRows = [
  ['Biotechnology', 'Use of organisms, cells or enzymes to make useful products or processes.'],
  ['Genetic engineering', 'Direct manipulation of DNA to alter phenotype or produce a desired product.'],
  ['Cloning vector', 'DNA carrier that can replicate in a host and carry foreign DNA.'],
  ['Selectable marker', 'A gene that helps identify transformed cells.'],
  ['Insertional inactivation', 'Loss of marker function due to DNA insertion within that marker.'],
  ['Elution', 'Extraction of DNA fragments from an agarose gel.'],
  ['Downstream processing', 'Separation, purification, formulation and quality testing of a product.'],
]

const heatmapConcepts = [
  ['Restriction enzymes', 5],
  ['PCR cycles', 5],
  ['Plasmid features', 4],
  ['Selectable markers', 4],
  ['Insulin', 5],
  ['Bt cotton', 5],
  ['RNAi', 4],
  ['GEAC / biopiracy', 3],
  ['Gel electrophoresis', 5],
  ['Bioreactors', 3],
]

export function CoreChapterSections() {
  return (
    <>
      <IntroductionSection />
      <PrinciplesAndToolsSection />
      <ProcessExpansionSection />
    </>
  )
}

export function DownstreamApplicationsRevision() {
  return (
    <>
      <DownstreamProcessingSection />
      <ApplicationsSection />
      <ApplicationDeepDives />
      <ThreeDModelGallery />
      <NEETHighYieldSection />
      <RevisionDashboardSection />
    </>
  )
}

function IntroductionSection() {
  return (
    <SectionShell
      id="intro"
      eyebrow="Biotechnology basics"
      title="Biotechnology is the art of turning living systems into useful products."
      description="NCERT frames biotechnology through organisms, cells, enzymes and products. NEET often asks you to separate old fermentation-based biotechnology from modern DNA-level engineering."
      tone="tint"
    >
      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <div className="grid gap-4">
          <div className="glass-card p-6">
            <p className="micro-label">Traditional vs modern</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <ComparePanel title="Traditional biotechnology" items={['Uses whole organisms', 'Fermentation and breeding', 'Examples: curd, cheese, antibiotics']} accent="bg-amber-100 text-amber-700" />
              <ComparePanel title="Modern biotechnology" items={['Works at DNA/gene level', 'Uses recombinant DNA tools', 'Examples: insulin, Bt cotton, PCR diagnosis']} accent="bg-emerald-100 text-emerald-700" />
            </div>
          </div>
          <div className="glass-card p-6">
            <p className="micro-label">Development timeline</p>
            <div className="mt-5 grid gap-3">
              {['Fermentation', 'DNA structure', 'Restriction enzymes', 'Recombinant DNA', 'PCR', 'Modern therapeutics'].map((item, index) => (
                <div key={item} className="timeline-row">
                  <span>{index + 1}</span>
                  <strong>{item}</strong>
                  <small>{['Food and microbes', 'Molecular basis', 'Precise cutting', 'Gene transfer', 'Gene amplification', 'Products and diagnosis'][index]}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
        <VisualDiagram label="cell to product pathway" className="min-h-[560px] p-6">
          <div className="grid h-full place-items-center pt-16">
            <CellToProductGraphic />
          </div>
        </VisualDiagram>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <ConceptCard icon={Dna} kicker="Core idea" title="Genetic engineering" color="mint">Desired DNA is cut, joined to a vector and introduced into a host so the trait or product can be expressed.</ConceptCard>
        <ConceptCard icon={Factory} kicker="Core idea" title="Bioprocess engineering" color="sky">Sterile conditions, controlled growth and product recovery turn a lab idea into a usable product.</ConceptCard>
        <ConceptCard icon={ShieldCheck} kicker="Why it matters" title="Human use with safeguards" color="lime">Biotechnology supports medicine, agriculture and diagnosis, but needs biosafety and ethical review.</ConceptCard>
      </div>
    </SectionShell>
  )
}

function PrinciplesAndToolsSection() {
  return (
    <SectionShell
      id="principles"
      eyebrow="Principles and toolkit"
      title="Two principles, five tools: the chapter becomes manageable."
      description="The first principle changes DNA. The second keeps the biological factory clean and controlled so the product is safe and reproducible."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="glass-card p-6 md:p-8">
          <p className="micro-label">Desired gene → vector → host → product</p>
          <div className="mt-6 rounded-[24px] bg-ink p-5 text-white dark:bg-emerald-950">
            <FlowchartBlock steps={['Desired gene', 'Vector', 'Host cell', 'Expression', 'Product']} />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <ConceptCard icon={Dna} kicker="Principle 1" title="Genetic engineering" color="mint">Create new DNA combinations by cutting, joining and transferring DNA.</ConceptCard>
            <ConceptCard icon={ShieldCheck} kicker="Principle 2" title="Sterile processing" color="sky">Maintain contamination-free conditions so only the desired organism grows.</ConceptCard>
          </div>
        </div>
        <VisualDiagram label="sterile bioprocess environment" className="min-h-[450px] p-6">
          <div className="grid h-full place-items-center pt-14">
            <SterileBioreactorGraphic />
          </div>
        </VisualDiagram>
      </div>

      <div id="tools" className="mt-10 scroll-mt-24">
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="micro-label">rDNA toolbox</p>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-ink dark:text-white">Every tool has a job — cut, paste, copy, carry or express.</h3>
          </div>
          <NEETHighYieldBox>Restriction enzymes + ligase + vector + host is a classic NEET cluster. Questions often hide the tool name and ask its function.</NEETHighYieldBox>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {toolCards.map(({ icon, title, label, text, color }) => (
            <ConceptCard key={title} icon={icon} kicker={label} title={title} color={color}>{text}</ConceptCard>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <RevisionTable columns={['Feature', 'Genetic engineering', 'Bioprocess engineering']} rows={[
          ['Main question', 'How do we create useful recombinant DNA?', 'How do we grow cells and recover product safely?'],
          ['Scale', 'Molecular and cellular', 'Culture vessel to industrial plant'],
          ['Key tools', 'Restriction enzymes, ligase, vectors, host', 'Bioreactor, sterile controls, downstream processing'],
          ['NEET hook', 'Gene transfer, selectable markers', 'pH, oxygen, temperature, foam, purification'],
        ]} />
        <div className="grid gap-4">
          <NCERTImportantLine>Modern biotechnology combines genetic engineering with controlled bioprocessing. Remember both; NEET can ask either half.</NCERTImportantLine>
          <MistakeAlert>Do not treat a vector as the final product. A vector is the carrier; the host expresses or copies the inserted gene.</MistakeAlert>
        </div>
      </div>
    </SectionShell>
  )
}

function ProcessExpansionSection() {
  const [active, setActive] = useState(0)
  const [inserted, setInserted] = useState(false)
  const steps = ['DNA isolation', 'Competent host', 'Ligation', 'Selection', 'Scale-up']
  return (
    <SectionShell
      id="processes"
      eyebrow="Process deep dive"
      title="From cell breakage to recombinant selection — the hidden middle of rDNA technology."
      description="These are the steps that sit around the glamorous 3D models. They are heavily NCERT-aligned and very exam-friendly."
      tone="tint"
    >
      <ProcessTimeline steps={steps} active={active} onSelect={setActive} />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="glass-card p-6 md:p-8">
          {active === 0 && <ProcessText title="Isolation of desired DNA" icon={Pipette} bullets={['Break cells open using suitable enzymes and detergents.', 'Remove proteins with protease and RNA with RNase.', 'Add chilled ethanol so DNA appears as thread-like precipitate.']} />}
          {active === 1 && <ProcessText title="Competent host and transformation" icon={Bug} bullets={['Host cells must be made competent so DNA can enter.', 'CaCl2 treatment and heat shock are common bacterial transformation ideas.', 'Microinjection, gene gun and Agrobacterium-mediated transfer are used for other cells.']} />}
          {active === 2 && <ProcessText title="Ligation and recombinant DNA" icon={Dna} bullets={['DNA ligase joins compatible sticky ends.', 'The insert and vector should be cut with the same enzyme or compatible enzymes.', 'A plasmid carrying foreign DNA becomes a recombinant plasmid.']} />}
          {active === 3 && <ProcessText title="Selection of recombinants" icon={ClipboardCheck} bullets={['Selectable markers identify transformed cells.', 'Antibiotic resistance helps separate transformed from non-transformed bacteria.', 'Insertional inactivation and blue-white screening identify recombinant colonies.']} />}
          {active === 4 && <ProcessText title="Expression and scale-up" icon={Factory} bullets={['Selected cells are grown and induced to express the desired gene.', 'Small culture is scaled to pilot and industrial volumes.', 'The product is recovered by downstream processing.']} />}

          <div className="mt-7 rounded-[24px] bg-emerald-50/70 p-5 dark:bg-emerald-300/5">
            <p className="micro-label">Memory trick</p>
            <p className="mt-2 text-sm font-bold leading-7 text-ink dark:text-white">I Can Copy Little Genes, Then Select Expressed Products: Isolate → Cut → Copy → Ligate → Transfer → Select → Express → Purify.</p>
          </div>
        </div>
        <VisualDiagram label={steps[active]} className="min-h-[470px] p-6">
          <div className="grid h-full place-items-center pt-14">
            {active === 0 && <DnaIsolationGraphic />}
            {active === 1 && <TransformationGraphic methods={transformationMethods} />}
            {active === 2 && <LigationDock inserted={inserted} setInserted={setInserted} />}
            {active === 3 && <SelectionGraphic />}
            {active === 4 && <ScaleUpGraphic />}
          </div>
        </VisualDiagram>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {transformationMethods.map(([title, text], index) => (
          <ConceptCard key={title} icon={[TestTube2, Gauge, Pipette, CircleDot, ShieldCheck, Wheat][index]} kicker="Transfer method" title={title} color={['sky', 'coral', 'mint', 'lime', 'sky', 'mint'][index]}>
            {text}
          </ConceptCard>
        ))}
      </div>
    </SectionShell>
  )
}

function DownstreamProcessingSection() {
  return (
    <SectionShell
      id="downstream"
      eyebrow="Downstream processing"
      title="The product is not useful until it is separated, purified, tested and released."
      description="NCERT keeps this compact, but NEET loves asking what happens after expression: separation, purification, formulation and quality control."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <VisualDiagram label="factory purification pipeline" className="min-h-[500px] p-6">
          <div className="grid h-full place-items-center pt-14">
            <DownstreamGraphic />
          </div>
        </VisualDiagram>
        <div className="grid gap-4">
          {[
            ['Separation', 'Remove cells, debris or unwanted culture components.', Filter],
            ['Purification', 'Isolate the target molecule with filtration, chromatography-like separation or precipitation ideas.', Pipette],
            ['Formulation', 'Make the product stable, sterile and deliverable.', FlaskConical],
            ['Quality control', 'Test purity, safety, activity and batch consistency.', ClipboardCheck],
            ['Clinical trials where applicable', 'Therapeutic products require evidence of safety and efficacy before use.', Activity],
            ['Packaging and release', 'Final vials, packets or diagnostic kits are labelled and distributed.', Factory],
          ].map(([title, text, Icon], index) => (
            <div key={title} className="glass-card flex gap-4 p-5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-100 text-leaf dark:bg-mint/10 dark:text-mint"><Icon size={20} /></div>
              <div>
                <h3 className="font-black text-ink dark:text-white">{index + 1}. {title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}

function ApplicationsSection() {
  const [selected, setSelected] = useState(applicationCards[0])
  return (
    <SectionShell
      id="applications"
      eyebrow="Applications"
      title="Applications are where biotechnology becomes medicine, agriculture, diagnosis and debate."
      description="This section covers insulin, Bt cotton, gene therapy, RNAi, molecular diagnosis, ELISA, PCR-based diagnosis, transgenic animals, biopiracy and GEAC-level ethics."
      tone="tint"
    >
      <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
        <div className="grid gap-3">
          {applicationCards.map((card) => (
            <button key={card.title} onClick={() => setSelected(card)} className={`app-selector ${selected.title === card.title ? 'active' : ''}`}>
              <span><card.icon size={18} /></span>
              <strong>{card.title}</strong>
              <small>{card.tag}</small>
            </button>
          ))}
        </div>
        <div className="glass-card overflow-hidden">
          <div className="grid gap-0 xl:grid-cols-[.95fr_1.05fr]">
            <div className="p-6 md:p-8">
              <p className="micro-label">{selected.tag}</p>
              <h3 className="mt-3 text-3xl font-black tracking-tight text-ink dark:text-white">{selected.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{selected.text}</p>
              <div className="mt-6 grid gap-3">
                {selected.points.map((point) => (
                  <div key={point} className="flex gap-3 rounded-2xl bg-emerald-50/80 p-4 text-sm font-semibold leading-6 text-emerald-950 dark:bg-emerald-300/5 dark:text-emerald-50">
                    <CheckCircle2 className="mt-1 shrink-0 text-leaf dark:text-mint" size={16} />
                    {point}
                  </div>
                ))}
              </div>
            </div>
            <div className="min-h-[460px] bg-[radial-gradient(circle_at_50%_20%,rgba(184,242,220,.65),rgba(255,255,255,.3)_55%,rgba(255,255,255,.0))] p-4 dark:bg-[radial-gradient(circle_at_50%_20%,rgba(62,169,130,.2),rgba(255,255,255,.02)_60%)]">
              <ApplicationVisual type={selected.visual} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <ConceptCard icon={TestTube2} kicker="ELISA" title="Antigen-antibody detection" color="sky">A colour change in a microplate indicates a specific antigen-antibody reaction.</ConceptCard>
        <ConceptCard icon={ScanSearch} kicker="PCR diagnosis" title="Low copy detection" color="mint">PCR can amplify a tiny amount of pathogen nucleic acid to a detectable level.</ConceptCard>
        <ConceptCard icon={Microscope} kicker="Transgenic animals" title="Research and production" color="lime">Animals carrying foreign genes can model disease, test safety and produce biological products.</ConceptCard>
      </div>
    </SectionShell>
  )
}

function RevisionDashboardSection() {
  return (
    <SectionShell
      id="revision"
      eyebrow="Final revision dashboard"
      title="A NEET-ready command center: tables, flashcards, heatmap and a full local question bank."
      description="Everything here runs in the browser from local JSON. No backend, database or paid service needed."
    >
      <div className="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
        <div className="grid gap-6">
          <div className="glass-card p-6">
            <p className="micro-label">Full chapter flow</p>
            <div className="mt-5 rounded-[24px] bg-ink p-5 text-white dark:bg-emerald-950">
              <FlowchartBlock steps={['Basics', 'Tools', 'Cut', 'Copy', 'Carry', 'Transform', 'Select', 'Scale', 'Applications', 'Ethics']} />
            </div>
          </div>
          <FlashcardDeck cards={flashcards} />
          <Heatmap concepts={heatmapConcepts} />
        </div>
        <QuestionBank />
      </div>

      <div className="mt-8 grid gap-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card p-5">
            <p className="micro-label mb-4">All enzymes table</p>
            <RevisionTable columns={['Enzyme', 'Role', 'NEET hook']} rows={enzymeRows} />
          </div>
          <div className="glass-card p-5">
            <p className="micro-label mb-4">All processes table</p>
            <RevisionTable columns={['Process', 'Purpose', 'Keywords']} rows={processRows} />
          </div>
        </div>
        <div className="glass-card p-5">
          <p className="micro-label mb-4">Important definitions</p>
          <RevisionTable columns={['Term', 'Definition']} rows={definitionRows} />
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <NEETHighYieldBox title="One-line facts">DNA is negatively charged, so fragments move to the positive electrode in gel electrophoresis.</NEETHighYieldBox>
        <MistakeAlert>Common confusion: transformed means plasmid entered; recombinant means the plasmid carries the desired insert.</MistakeAlert>
        <NCERTImportantLine>GEAC is associated with assessing the validity and safety of GM organism research and release in India.</NCERTImportantLine>
      </div>
    </SectionShell>
  )
}

function ComparePanel({ title, items, accent }) {
  return (
    <div className="rounded-[22px] border border-leaf/10 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5">
      <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${accent}`}>compare</span>
      <h3 className="mt-4 font-black text-ink dark:text-white">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {items.map((item) => <li key={item}>• {item}</li>)}
      </ul>
    </div>
  )
}

function ProcessText({ title, icon: Icon, bullets }) {
  return (
    <div>
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-100 text-leaf dark:bg-mint/10 dark:text-mint"><Icon size={24} /></div>
      <h3 className="mt-5 text-3xl font-black tracking-tight text-ink dark:text-white">{title}</h3>
      <div className="mt-5 grid gap-3">
        {bullets.map((bullet) => (
          <div key={bullet} className="flex gap-3 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
            <ArrowRight className="mt-1 shrink-0 text-leaf dark:text-mint" size={16} />
            {bullet}
          </div>
        ))}
      </div>
    </div>
  )
}

function QuestionBank() {
  const [filter, setFilter] = useState('mcq')
  const [answered, setAnswered] = useState({})
  const [correct, setCorrect] = useState(0)
  const [resetKey, setResetKey] = useState(0)
  const filtered = quizQuestions.filter((question) => question.type === filter)
  const countByType = (type) => quizQuestions.filter((question) => question.type === type).length

  const handleAnswer = (id, isCorrect) => {
    if (answered[id]) return
    setAnswered((prev) => ({ ...prev, [id]: true }))
    if (isCorrect) setCorrect((value) => value + 1)
  }

  const reset = () => {
    setAnswered({})
    setCorrect(0)
    setResetKey((value) => value + 1)
  }

  return (
    <div className="glass-card p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="micro-label">Local question bank</p>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-ink dark:text-white">{countByType('mcq')} MCQs · {countByType('assertion')} assertion-reason · {countByType('case')} case-based</h3>
        </div>
        <ScoreTracker correct={correct} total={Object.keys(answered).length} onReset={reset} />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {[
          ['mcq', '30 MCQs'],
          ['assertion', '10 Assertion-reason'],
          ['case', '10 Case-based'],
        ].map(([type, label]) => (
          <button key={type} onClick={() => setFilter(type)} className={`dashboard-tab ${filter === type ? 'active' : ''}`}>{label}</button>
        ))}
      </div>
      <div className="mt-5 grid max-h-[980px] gap-4 overflow-y-auto pr-1">
        {filtered.map((question) => (
          <QuizCard key={`${resetKey}-${question.id}`} question={question} onAnswer={(ok) => handleAnswer(question.id, ok)} />
        ))}
      </div>
    </div>
  )
}

function Heatmap({ concepts }) {
  return (
    <div className="glass-card p-6">
      <p className="micro-label">Most asked concepts heatmap</p>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {concepts.map(([concept, level]) => (
          <div key={concept} className="heatmap-cell" style={{ '--level': level }}>
            <strong>{concept}</strong>
            <span>{'★'.repeat(level)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CellToProductGraphic() {
  const nodes = [
    ['Cell', 'rounded-[35%] bg-emerald-200'],
    ['DNA', 'rounded-full bg-sky-200'],
    ['Gene', 'rounded-xl bg-amber-200'],
    ['Product', 'rounded-2xl bg-rose-200'],
  ]
  return (
    <div className="w-full max-w-2xl">
      <div className="grid gap-4 sm:grid-cols-4">
        {nodes.map(([label, cls], index) => (
          <div key={label} className="bio-path-node">
            <div className={`grid h-24 w-24 place-items-center ${cls} text-sm font-black text-ink shadow-soft`}>
              {label === 'DNA' ? <Dna size={36} /> : label}
            </div>
            <span>{label}</span>
            {index < nodes.length - 1 && <ArrowRight className="hidden text-leaf/50 sm:block" />}
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-[24px] border border-leaf/10 bg-white/70 p-5 text-center text-sm font-bold leading-7 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
        organism / cell / enzyme → useful product, process or diagnostic result
      </div>
    </div>
  )
}

function SterileBioreactorGraphic() {
  return (
    <div className="relative h-[360px] w-full max-w-md">
      <div className="absolute inset-x-16 bottom-7 top-16 rounded-[40px] border-4 border-emerald-300/60 bg-white/35 shadow-inner backdrop-blur dark:bg-white/5">
        <div className="absolute inset-x-8 top-20 h-28 rounded-b-[40px] bg-emerald-300/35" />
        {[0, 1, 2, 3, 4, 5].map((i) => <span key={i} className="sterile-bubble" style={{ left: `${28 + i * 9}%`, animationDelay: `${i * 0.25}s` }} />)}
        <div className="absolute left-1/2 top-4 h-56 w-2 -translate-x-1/2 rounded-full bg-slate-600/70" />
        <div className="absolute left-1/2 top-40 h-4 w-24 -translate-x-1/2 rounded-full bg-leaf/70 animate-spin" />
      </div>
      <div className="absolute left-3 top-7 rounded-2xl bg-white/80 p-3 text-xs font-black text-leaf shadow-soft dark:bg-ink/80 dark:text-mint">Sterile inlet</div>
      <div className="absolute right-0 top-28 rounded-2xl bg-white/80 p-3 text-xs font-black text-leaf shadow-soft dark:bg-ink/80 dark:text-mint">pH + oxygen</div>
      <div className="absolute bottom-0 left-8 rounded-2xl bg-white/80 p-3 text-xs font-black text-leaf shadow-soft dark:bg-ink/80 dark:text-mint">Foam control</div>
    </div>
  )
}

function DnaIsolationGraphic() {
  return (
    <div className="grid w-full max-w-lg gap-5 md:grid-cols-[.8fr_1.2fr]">
      <div className="dna-tube">
        <div className="tube-layer layer-1">ethanol</div>
        <div className="tube-layer layer-2">DNA threads</div>
        <div className="tube-layer layer-3">cell extract</div>
      </div>
      <div className="grid content-center gap-3">
        {['Cell wall broken', 'Proteins + RNA removed', 'Chilled ethanol added', 'DNA spool appears'].map((step, index) => (
          <div key={step} className="rounded-2xl bg-white/80 p-4 text-sm font-bold text-ink shadow-sm dark:bg-white/5 dark:text-white">
            <span className="mr-3 font-mono text-leaf dark:text-mint">0{index + 1}</span>{step}
          </div>
        ))}
      </div>
    </div>
  )
}

function TransformationGraphic({ methods }) {
  return (
    <div className="w-full max-w-xl">
      <div className="relative mx-auto h-64 w-64 rounded-[46%] border-4 border-emerald-300 bg-emerald-100/80 shadow-inner dark:bg-emerald-300/10">
        <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px] border-coral/80 border-t-mint animate-spin" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-20 rounded-xl bg-white px-3 py-2 text-xs font-black text-leaf shadow dark:bg-ink dark:text-mint">plasmid enters</div>
        <span className="absolute -right-6 top-20 rounded-full bg-coral px-3 py-2 text-xs font-black text-white">heat shock</span>
      </div>
      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        {methods.slice(0, 4).map(([title]) => <span key={title} className="rounded-full bg-white/80 px-4 py-2 text-center text-xs font-black text-leaf shadow-sm dark:bg-white/5 dark:text-mint">{title}</span>)}
      </div>
    </div>
  )
}

function LigationDock({ inserted, setInserted }) {
  return (
    <div className="w-full max-w-lg">
      <div className="mb-5 text-center text-sm font-bold text-slate-600 dark:text-slate-300">Drag the gene insert into the open plasmid, or tap it.</div>
      <div className="grid items-center gap-5 md:grid-cols-[.75fr_1.25fr]">
        <button
          draggable
          onDragStart={(event) => event.dataTransfer.setData('text/plain', 'gene')}
          onClick={() => setInserted(true)}
          className={`gene-insert ${inserted ? 'opacity-40' : ''}`}
        >
          gene insert
        </button>
        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault()
            setInserted(true)
          }}
          className={`drop-plasmid ${inserted ? 'inserted' : ''}`}
        >
          <span className="cut-gap" />
          {inserted && <span className="inserted-gene">foreign DNA</span>}
          <strong>{inserted ? 'recombinant plasmid' : 'open plasmid'}</strong>
        </div>
      </div>
      <button onClick={() => setInserted(false)} className="secondary-button mx-auto mt-6 flex">Reset ligation</button>
    </div>
  )
}

function SelectionGraphic() {
  const colonies = [
    [21, 28, 'white'], [44, 19, 'blue'], [68, 33, 'white'], [33, 57, 'blue'], [58, 66, 'white'], [76, 58, 'blue'], [22, 75, 'white'],
  ]
  return (
    <div className="w-full max-w-xl">
      <div className="petri">
        {colonies.map(([x, y, type], index) => <span key={index} className={`colony ${type}`} style={{ left: `${x}%`, top: `${y}%` }} />)}
        <strong>antibiotic plate</strong>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-white/80 p-4 text-sm font-bold text-ink shadow-sm dark:bg-white/5 dark:text-white">Blue colony: marker active → non-recombinant idea</div>
        <div className="rounded-2xl bg-white/80 p-4 text-sm font-bold text-ink shadow-sm dark:bg-white/5 dark:text-white">White colony: marker disrupted → recombinant idea</div>
      </div>
    </div>
  )
}

function ScaleUpGraphic() {
  return (
    <div className="w-full max-w-xl">
      <div className="factory-pipeline">
        {['Lab culture', 'Pilot scale', 'Industrial bioreactor', 'Purified product'].map((step, index) => (
          <div key={step} className="factory-step">
            <Factory size={24} />
            <strong>{step}</strong>
            {index < 3 && <ArrowRight />}
          </div>
        ))}
      </div>
    </div>
  )
}

function DownstreamGraphic() {
  const stages = ['Separate', 'Purify', 'Formulate', 'QC', 'Release']
  return (
    <div className="w-full max-w-2xl">
      <div className="downstream-machine">
        {stages.map((stage, index) => (
          <div key={stage} className="downstream-stage" style={{ animationDelay: `${index * .2}s` }}>
            <span>{index + 1}</span>
            <strong>{stage}</strong>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-[24px] bg-white/80 p-5 text-center text-sm font-bold leading-7 text-slate-600 shadow-sm dark:bg-white/5 dark:text-slate-300">
        Product recovery is a pipeline, not a single step.
      </div>
    </div>
  )
}

function ApplicationVisual({ type }) {
  if (type === 'insulin') return <InsulinGraphic />
  if (type === 'bt') return <BtGraphic />
  if (type === 'therapy') return <GeneTherapyGraphic />
  if (type === 'rnai') return <RnaiGraphic />
  if (type === 'diagnosis') return <DiagnosisGraphic />
  return <EthicsGraphic />
}

function InsulinGraphic() {
  return (
    <div className="app-visual">
      <div className="insulin-chain chain-a">A chain</div>
      <div className="insulin-chain chain-b">B chain</div>
      <div className="disulphide">S-S</div>
      <div className="bacteria-factory"><Bug size={30} /><span>bacterial factory</span></div>
      <div className="vial-card">human insulin vial</div>
    </div>
  )
}

function BtGraphic() {
  return (
    <div className="app-visual">
      <div className="cotton-plant"><Wheat size={72} /><span>Bt cotton</span></div>
      <div className="cry-crystal">Cry protoxin</div>
      <div className="gut">alkaline insect gut → active toxin</div>
      <div className="larva"><Bug size={34} /> pest larva</div>
    </div>
  )
}

function GeneTherapyGraphic() {
  return (
    <div className="app-visual">
      <div className="therapy-cell faulty">faulty gene</div>
      <ArrowRight className="therapy-arrow" />
      <div className="vector-orb"><ShieldCheck size={26} /> vector</div>
      <div className="therapy-cell corrected">corrected cell</div>
      <div className="return-flow">remove → correct → return</div>
    </div>
  )
}

function RnaiGraphic() {
  return (
    <div className="app-visual">
      <div className="dsrna">dsRNA</div>
      <ArrowRight className="therapy-arrow" />
      <div className="mrna-cut">mRNA ✂ degraded</div>
      <div className="gene-switch"><span />gene OFF</div>
      <div className="plant-root">protected plant root</div>
    </div>
  )
}

function DiagnosisGraphic() {
  return (
    <div className="app-visual">
      <div className="lab-dashboard">
        <span>PCR +</span><span>ELISA</span><span>DNA probe</span>
      </div>
      <div className="elisa-plate">
        {Array.from({ length: 18 }).map((_, index) => <i key={index} className={index % 4 === 0 ? 'positive' : ''} />)}
      </div>
      <div className="probe-bind">probe binds target sequence</div>
    </div>
  )
}

function EthicsGraphic() {
  return (
    <div className="app-visual">
      <div className="ethics-scale"><Scale size={70} /><span>benefit ↔ biosafety</span></div>
      <div className="geac-flow">research → GEAC review → safe release</div>
      <div className="biopiracy-card">biopiracy alert: fair access + credit</div>
    </div>
  )
}
