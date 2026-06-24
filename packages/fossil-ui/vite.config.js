import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(import.meta.url), '..')

const families = [
  'buttons',
  'cards',
  'modals',
  'inputs',
  'badges',
  'alerts',
  'separators',
  'spinners',
  'navbars',
  'heroes',
]

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        index: resolve(root, 'src/index.js'),
        'buttons/index': resolve(root, 'src/buttons/index.js'),
        'buttons/example': resolve(root, 'src/buttons/example.jsx'),
        ...Object.fromEntries(families.filter((f) => f !== 'buttons').map((f) => [`${f}/index`, resolve(root, `src/${f}/index.js`)])),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'lucide-react',
        'clsx',
        'tailwind-merge',
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
})
