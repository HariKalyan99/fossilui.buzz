/**
 * Install / setup snippets shared by every component family page so the
 * "How to import" section reads the same everywhere.
 */

export const VITE_SNIPPET = `// vite.config.js
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})`

export const TAILWIND_BASE_SNIPPET = `/* app.css */
@import "tailwindcss";`

export function tailwindSourceSnippet(packageName) {
  return `/* app.css — use with ${packageName} */
@import "tailwindcss";
@source "../node_modules/${packageName}/dist";`
}

/**
 * @param {{ label: string, packageName: string }} standalone e.g. { label: 'Modals', packageName: '@fossilui/modals' }
 */
export function installSnippet(standalone) {
  return `# Full component library
npm install @fossilui/react lucide-react

# ${standalone.label}-only package (lightweight)
npm install ${standalone.packageName} lucide-react

# Required for both — Tailwind v4 (Vite)
npm install -D tailwindcss @tailwindcss/vite`
}

/**
 * @param {{ names: string[], subpath: string, packageName: string }} options
 */
export function importSnippet({ names, subpath, packageName }) {
  const list = names.join(', ')
  return `// Full library import
import { ${list} } from '@fossilui/react'

// OR ${subpath} path inside @fossilui/react:
import { ${list} } from '@fossilui/react/${subpath}'

// OR standalone package:
import { ${list} } from '${packageName}'`
}

/** The four standard "How to import" snippets for a family. */
export function importGuideSnippets(standalone) {
  return [
    { label: 'Install', code: installSnippet(standalone) },
    { label: 'Vite', code: VITE_SNIPPET },
    { label: 'Tailwind — @fossilui/react', code: tailwindSourceSnippet('@fossilui/react') },
    { label: `Tailwind — ${standalone.packageName}`, code: tailwindSourceSnippet(standalone.packageName) },
  ]
}

export function sharedFaqs(familyLabel, packageName) {
  return [
    {
      q: 'Do I need Tailwind CSS?',
      a: `Yes. Install tailwindcss and @tailwindcss/vite, enable the Vite plugin, and add @import "tailwindcss" plus @source "../node_modules/@fossilui/react/dist" (or ${packageName}/dist) in your CSS. Without the @source line Tailwind never sees the component classes and ${familyLabel} render unstyled.`,
    },
    {
      q: 'Is framer-motion required?',
      a: 'No. Every animation is plain CSS transitions plus the Web Animations API, so the only peer dependencies are React and lucide-react.',
    },
    {
      q: 'Do animations respect reduced motion?',
      a: 'Yes. When the OS has "reduce motion" enabled, transitions collapse to instant state changes and looping effects stop.',
    },
    {
      q: 'Can I add className or inline styles?',
      a: 'Yes. className is merged with tailwind-merge so your utilities win over the defaults, and style accepts object syntax (e.g. style={{ maxWidth: 480 }}). The configurator preview parses both from the code editor.',
    },
    {
      q: 'Can I use these in Next.js or Remix?',
      a: 'Yes. Install the package, add the Tailwind source path, and import components inside client components ("use client" in the App Router) because they rely on state and browser APIs.',
    },
  ]
}
