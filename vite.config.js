import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Set VITE_BASE_PATH to your repository name when deploying, e.g. /bioforge/
  base: process.env.VITE_BASE_PATH || '/',
})
