import { useState } from 'react'
import { Check, ChevronLeft, ChevronRight, RotateCcw, X } from 'lucide-react'

export function QuizCard({ question, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const answered = selected !== null
  return (
    <article className="glass-card p-6">
      <p className="micro-label">Check your understanding</p>
      <h3 className="mt-3 text-lg font-extrabold text-ink dark:text-white">{question.question}</h3>
      <div className="mt-5 grid gap-2">{question.options.map((option, index) => <button key={option} disabled={answered} onClick={() => { setSelected(index); onAnswer?.(index === question.answer) }} className={`rounded-xl border p-3 text-left text-sm font-semibold transition ${answered && index === question.answer ? 'border-emerald-400 bg-emerald-50 text-emerald-900 dark:bg-emerald-300/10 dark:text-mint' : answered && index === selected ? 'border-rose-300 bg-rose-50 text-rose-900 dark:bg-rose-300/10 dark:text-rose-200' : 'border-leaf/10 bg-white/60 text-slate-700 hover:border-leaf/30 dark:border-white/10 dark:bg-white/5 dark:text-slate-200'}`}>{option}</button>)}</div>
      {answered && <p className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400">{question.explanation}</p>}
    </article>
  )
}

export function FlashcardDeck({ cards }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const card = cards[index]
  return <div className="glass-card p-6"><button onClick={() => setFlipped((v) => !v)} className="flex min-h-52 w-full flex-col items-center justify-center rounded-2xl bg-emerald-50/60 p-8 text-center dark:bg-emerald-300/5"><span className="micro-label">{flipped ? 'Answer' : 'Question'}</span><strong className="mt-4 max-w-lg text-xl text-ink dark:text-white">{flipped ? card.back : card.front}</strong><small className="mt-5 text-slate-400">Tap to flip</small></button><div className="mt-4 flex items-center justify-between"><button className="circle-control" onClick={() => { setIndex((index - 1 + cards.length) % cards.length); setFlipped(false) }}><ChevronLeft/></button><span className="text-xs font-bold text-slate-400">{index+1} / {cards.length}</span><button className="circle-control" onClick={() => { setIndex((index + 1) % cards.length); setFlipped(false) }}><ChevronRight/></button></div></div>
}

export function RevisionTable({ columns, rows }) {
  return <div className="overflow-x-auto rounded-2xl border border-leaf/10 dark:border-white/10"><table className="w-full min-w-[560px] border-collapse text-left text-sm"><thead className="bg-emerald-50 dark:bg-emerald-300/10"><tr>{columns.map((column) => <th key={column} className="p-4 text-xs font-black uppercase tracking-wider text-leaf dark:text-mint">{column}</th>)}</tr></thead><tbody>{rows.map((row,index) => <tr key={index} className="border-t border-leaf/10 dark:border-white/10">{row.map((cell,i) => <td key={i} className="p-4 text-slate-600 dark:text-slate-300">{cell}</td>)}</tr>)}</tbody></table></div>
}

export function ProcessTimeline({ steps, active = 0, onSelect }) {
  return <div className="flex gap-2 overflow-x-auto pb-2">{steps.map((step,index) => <button key={step} onClick={() => onSelect?.(index)} className={`min-w-36 rounded-2xl border p-4 text-left transition ${index === active ? 'border-leaf bg-emerald-50 dark:border-mint dark:bg-mint/10' : 'border-leaf/10 bg-white/60 dark:border-white/10 dark:bg-white/5'}`}><span className="micro-label">0{index+1}</span><strong className="mt-2 block text-sm text-ink dark:text-white">{step}</strong></button>)}</div>
}

export function InteractiveHotspotDiagram({ children, hotspots, active, onSelect }) {
  return <div className="relative">{children}{hotspots.map((spot) => <button key={spot.id} aria-label={spot.label} onClick={() => onSelect?.(spot.id)} style={{ left: spot.x, top: spot.y }} className={`absolute grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-leaf text-xs font-black text-white shadow-lg transition ${active === spot.id ? 'scale-125 ring-4 ring-mint/50' : 'animate-pulse'}`}>{spot.number}</button>)}</div>
}

export function GlossaryPopup({ term, definition }) {
  const [open, setOpen] = useState(false)
  return <span className="relative inline-block"><button onClick={() => setOpen((v) => !v)} className="border-b border-dashed border-leaf font-bold text-leaf dark:border-mint dark:text-mint">{term}</button>{open && <span className="absolute bottom-full left-1/2 z-20 mb-2 block w-64 -translate-x-1/2 rounded-2xl bg-ink p-4 text-left text-xs font-medium leading-5 text-white shadow-xl dark:bg-emerald-900">{definition}<button onClick={() => setOpen(false)} className="absolute right-2 top-2"><X size={13}/></button></span>}</span>
}

export function ScoreTracker({ correct, total, onReset }) {
  const percent = total ? Math.round(correct / total * 100) : 0
  return <div className="glass-card flex items-center gap-5 p-5"><div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-lg font-black text-leaf dark:bg-mint/10 dark:text-mint">{percent}%</div><div><p className="micro-label">Session score</p><strong className="mt-1 block text-ink dark:text-white">{correct} correct of {total}</strong></div><button onClick={onReset} className="circle-control ml-auto"><RotateCcw size={16}/></button></div>
}
