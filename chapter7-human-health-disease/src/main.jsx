import React from 'react'
import { createRoot } from 'react-dom/client'
import VisualChapterApp from '../../chapter-site-shared/VisualChapterApp.jsx'
import content from './data/chapterContent.json'
import '../../chapter-site-shared/visual-chapter.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VisualChapterApp content={content} />
  </React.StrictMode>,
)
