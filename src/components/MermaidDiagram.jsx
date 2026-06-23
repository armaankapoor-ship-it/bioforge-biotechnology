import { useEffect, useId, useState } from 'react'

let mermaidLoader

async function loadMermaid() {
  if (!mermaidLoader) {
    mermaidLoader = import('mermaid').then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: 'base',
        themeVariables: {
          primaryColor: '#e7f8f2',
          primaryTextColor: '#15382e',
          primaryBorderColor: '#87d7bd',
          lineColor: '#4b846f',
          secondaryColor: '#edf7fb',
          tertiaryColor: '#fff3ec',
          fontFamily: 'Manrope, sans-serif',
          fontSize: '14px',
        },
        flowchart: { curve: 'basis', padding: 14, nodeSpacing: 28, rankSpacing: 38 },
      })
      return mermaid
    })
  }
  return mermaidLoader
}

export default function MermaidDiagram({ chart }) {
  const rawId = useId()
  const id = `mermaid-${rawId.replace(/:/g, '')}`
  const [svg, setSvg] = useState('')

  useEffect(() => {
    let active = true
    loadMermaid()
      .then((mermaid) => mermaid.render(id, chart))
      .then(({ svg: markup }) => active && setSvg(markup))
      .catch(() => active && setSvg('<p class="text-sm font-bold text-slate-500">Flowchart could not render.</p>'))
    return () => { active = false }
  }, [chart, id])

  return <div className="mermaid-wrap" dangerouslySetInnerHTML={{ __html: svg }} />
}
