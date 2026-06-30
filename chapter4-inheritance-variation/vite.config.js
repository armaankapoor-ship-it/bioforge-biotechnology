import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const localModule = (path) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: [
      { find: /^react$/, replacement: localModule('../node_modules/react/index.js') },
      { find: /^react\/jsx-runtime$/, replacement: localModule('../node_modules/react/jsx-runtime.js') },
      { find: /^react-dom$/, replacement: localModule('../node_modules/react-dom/index.js') },
      { find: /^react-dom\/client$/, replacement: localModule('../node_modules/react-dom/client.js') },
    ],
  },
})
