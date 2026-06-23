import { useMemo, useState } from 'react'
import {
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Dna,
  Eye,
  GraduationCap,
  Layers3,
  Lightbulb,
  PenTool,
  Search,
} from 'lucide-react'
import notebook from '../data/chapterNotebook.json'
import { FlowchartBlock, MistakeAlert, NCERTImportantLine, NEETHighYieldBox, SectionShell } from './ui'

export default function CompleteChapterNotebook() {
  const [activeId, setActiveId] = useState(notebook[0].id)
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return notebook
    return notebook.filter((item) => [
      item.title,
      item.objective,
      item.neetHook,
      item.diagramPractice,
      item.check,
      ...item.notes,
    ].join(' ').toLowerCase().includes(q))
  }, [query])
  const active = useMemo(() => filtered.find((item) => item.id === activeId) || filtered[0] || notebook[0], [activeId, filtered])

  return (
    <SectionShell
      id="chapter-notebook"
      eyebrow="Complete chapter notebook"
      title="A fuller module-by-module textbook layer for the entire chapter."
      description="This section is built like guided visual notes: each module has objective, explanation, NEET hook, diagram practice and a self-check prompt."
      tone="tint"
    >
      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_.85fr]">
        <div className="notebook-search">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search: EcoRI, insulin, GEAC, PCR, bioreactor..." />
        </div>
        <div className="rounded-[24px] bg-ink p-5 text-white dark:bg-emerald-950">
          <FlowchartBlock steps={['Basics', 'Tools', 'rDNA', 'Scale-up', 'Applications', 'Ethics']} />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[.78fr_1.22fr]">
        <aside className="glass-card max-h-[790px] overflow-y-auto p-3">
          <div className="grid gap-2">
            {filtered.map((item) => (
              <button key={item.id} onClick={() => setActiveId(item.id)} className={`notebook-tab ${active.id === item.id ? 'active' : ''}`}>
                <span>{item.module}</span>
                <strong>{item.title}</strong>
              </button>
            ))}
          </div>
        </aside>

        <article className="glass-card overflow-hidden">
          <div className="notebook-hero">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-leaf shadow-sm dark:bg-white/10 dark:text-mint"><BookOpen size={25} /></div>
            <p className="micro-label mt-5">Module {active.module}</p>
            <h3>{active.title}</h3>
            <p>{active.objective}</p>
          </div>

          <div className="grid gap-5 p-6 md:p-8">
            <div className="grid gap-4">
              {active.notes.map((note, index) => (
                <div key={note} className="notebook-note">
                  <span>{index + 1}</span>
                  <p>{note}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <NEETHighYieldBox title="NEET hook">{active.neetHook}</NEETHighYieldBox>
              <NCERTImportantLine>{active.diagramPractice}</NCERTImportantLine>
            </div>
            <MistakeAlert>{active.check}</MistakeAlert>
          </div>
        </article>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          [GraduationCap, '20 modules', 'Covers the whole chapter from basics to ethics.'],
          [Dna, 'rDNA core', 'Tools, process, ligation, transformation and selection.'],
          [Eye, 'Diagram cues', 'Every module includes what to draw or visualise.'],
          [Lightbulb, 'NEET hooks', 'Each concept includes one exam-facing memory line.'],
          [PenTool, 'Self-checks', 'Built-in prompts for active recall.'],
        ].map(([Icon, title, text]) => (
          <div key={title} className="notebook-stat">
            <Icon size={19} />
            <strong>{title}</strong>
            <span>{text}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="chapter-completion-card">
          <Layers3 />
          <strong>NCERT base</strong>
          <span>Definitions, process order, examples and diagram labels.</span>
        </div>
        <div className="chapter-completion-card">
          <ClipboardList />
          <strong>NEET layer</strong>
          <span>Common traps, one-line facts and concept comparisons.</span>
        </div>
        <div className="chapter-completion-card">
          <CheckCircle2 />
          <strong>Revision layer</strong>
          <span>Flashcards, tables, MCQs, assertion-reason and case questions.</span>
        </div>
      </div>
    </SectionShell>
  )
}
