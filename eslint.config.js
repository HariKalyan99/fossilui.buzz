import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'dist',
    // Each folder under the workspace root is its own template app with its
    // own toolchain; the platform repo only lints its own src/.
    'atelier_09/**',
    'eleven/**',
    'evently/**',
    'glimpse/**',
    'nebula/**',
    'northbound_labs/**',
    'norwin_ai/**',
    'olea/**',
    'node_modules/**',
  ]),
  {
    files: ['src/**/*.{js,jsx}', 'vite.config.js', 'eslint.config.js'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
