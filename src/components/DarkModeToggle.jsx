import { Moon, Sun } from 'lucide-react'

export default function DarkModeToggle({ dark, onToggle }) {
  return (
    <button onClick={onToggle} className="nav-icon-button" aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
