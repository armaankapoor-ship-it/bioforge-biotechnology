import { AlertTriangle, ArrowUpRight, BookOpen, Dna, Sparkles, Target } from 'lucide-react'

export function SectionShell({ id, eyebrow, title, description, children, tone = 'default' }) {
  return (
    <section id={id} className={`section-shell scroll-mt-24 ${tone === 'tint' ? 'section-tint' : ''}`}>
      <div className="page-wrap">
        <div className="mb-10 max-w-3xl md:mb-14">
          <div className="eyebrow"><span>{eyebrow}</span></div>
          <h2 className="section-title">{title}</h2>
          {description && <p className="section-description">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

export function ConceptCard({ icon: Icon = Dna, kicker, title, children, color = 'mint', className = '' }) {
  return (
    <article className={`concept-card group ${className}`}>
      <div className={`icon-tile icon-${color}`}><Icon size={20} strokeWidth={2.1} /></div>
      {kicker && <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-leaf/60 dark:text-emerald-300/60">{kicker}</p>}
      <h3 className="mt-2 text-lg font-extrabold tracking-tight text-ink dark:text-white">{title}</h3>
      <div className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{children}</div>
    </article>
  )
}

export function NEETHighYieldBox({ children, title = 'NEET high-yield' }) {
  return (
    <aside className="relative overflow-hidden rounded-[24px] border border-amber-200/70 bg-amber-50/80 p-5 dark:border-amber-300/15 dark:bg-amber-300/5">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-300/20 blur-2xl" />
      <div className="flex gap-3">
        <div className="mt-0.5 rounded-xl bg-amber-300 p-2 text-amber-950"><Target size={18} /></div>
        <div><p className="text-xs font-black uppercase tracking-[.16em] text-amber-700 dark:text-amber-300">{title}</p><div className="mt-1 text-sm font-semibold leading-6 text-amber-950 dark:text-amber-50">{children}</div></div>
      </div>
    </aside>
  )
}

export function NCERTImportantLine({ children }) {
  return (
    <div className="rounded-2xl border-l-4 border-leaf bg-emerald-50/80 p-4 text-sm leading-6 text-emerald-950 dark:bg-emerald-300/10 dark:text-emerald-50">
      <span className="mr-2 inline-flex align-middle text-leaf dark:text-mint"><BookOpen size={16} /></span>{children}
    </div>
  )
}

export function MistakeAlert({ children }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-rose-200 bg-rose-50/80 p-4 text-sm leading-6 text-rose-950 dark:border-rose-300/15 dark:bg-rose-300/5 dark:text-rose-50">
      <AlertTriangle className="mt-1 shrink-0 text-coral" size={18} /> <div>{children}</div>
    </div>
  )
}

export function FlowchartBlock({ steps }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, index) => (
        <div className="contents" key={step}>
          <div className="rounded-full border border-leaf/10 bg-white px-4 py-2 text-xs font-extrabold text-ink shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white">{step}</div>
          {index < steps.length - 1 && <ArrowUpRight size={15} className="rotate-45 text-leaf/40" />}
        </div>
      ))}
    </div>
  )
}

export function StatPill({ value, label, accent = 'mint' }) {
  return (
    <div className={`stat-pill stat-${accent}`}><span>{value}</span><small>{label}</small></div>
  )
}

export function VisualDiagram({ label, children, className = '' }) {
  return (
    <div className={`visual-panel ${className}`}>
      <div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full border border-white/60 bg-white/75 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.14em] text-leaf backdrop-blur dark:border-white/10 dark:bg-slate-950/70 dark:text-mint"><Sparkles size={12} /> {label}</div>
      {children}
    </div>
  )
}
