import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  appType: 'spa',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(root, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
    fs: {
      // Allow Vite to read files from the workspace root (we read template
      // sources via import.meta.glob from sibling folders).
      allow: [root],
    },
  },
  build: {
    // Keep heavy libraries (CodeMirror, framer-motion, gsap, three) out of the
    // main chunk for snappier first paint.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('@codemirror') ||
              id.includes('@uiw/react-codemirror') ||
              id.includes('@lezer') ||
              id.includes('codemirror')
            ) {
              return 'codemirror'
            }
            if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) {
              return 'motion'
            }
            if (id.includes('gsap')) return 'gsap'
            if (id.includes('three')) return 'three'
          }
        },
      },
    },
  },
})
