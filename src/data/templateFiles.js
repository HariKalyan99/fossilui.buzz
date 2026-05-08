// Lazy raw loaders for every template's source. Vite requires the glob
// patterns to be string literals at the call site, so we declare one block
// per template and merge them into a single map keyed by slug.
//
// Each entry resolves to a function that returns the file contents as a
// string (text). We expose `loadTemplateFiles(slug)` which returns an array
// of `{ path, code, lang, isBinary }` ready for the code viewer.

const sourcePatterns = {
  atelier_09: {
    src: import.meta.glob('../../atelier_09/src/**/*.{js,jsx,ts,tsx,css,json,md}', { query: '?raw', import: 'default' }),
    root: import.meta.glob(
      '../../atelier_09/{package.json,README.md,vite.config.js,eslint.config.js,index.html,tailwind.config.js,postcss.config.js}',
      { query: '?raw', import: 'default' },
    ),
  },
  eleven: {
    src: import.meta.glob('../../eleven/src/**/*.{js,jsx,ts,tsx,css,json,md}', { query: '?raw', import: 'default' }),
    root: import.meta.glob(
      '../../eleven/{package.json,README.md,vite.config.js,eslint.config.js,index.html,tailwind.config.js,postcss.config.js}',
      { query: '?raw', import: 'default' },
    ),
  },
  evently: {
    src: import.meta.glob('../../evently/src/**/*.{js,jsx,ts,tsx,css,json,md}', { query: '?raw', import: 'default' }),
    root: import.meta.glob(
      '../../evently/{package.json,README.md,vite.config.js,eslint.config.js,index.html,tailwind.config.js,postcss.config.js}',
      { query: '?raw', import: 'default' },
    ),
  },
  glimpse: {
    src: import.meta.glob('../../glimpse/src/**/*.{js,jsx,ts,tsx,css,json,md}', { query: '?raw', import: 'default' }),
    root: import.meta.glob(
      '../../glimpse/{package.json,README.md,vite.config.js,eslint.config.js,index.html,tailwind.config.js,postcss.config.js}',
      { query: '?raw', import: 'default' },
    ),
  },
  nebula: {
    src: import.meta.glob('../../nebula/src/**/*.{js,jsx,ts,tsx,css,json,md}', { query: '?raw', import: 'default' }),
    root: import.meta.glob(
      '../../nebula/{package.json,README.md,vite.config.js,eslint.config.js,index.html,tailwind.config.js,postcss.config.js}',
      { query: '?raw', import: 'default' },
    ),
  },
  northbound_labs: {
    src: import.meta.glob('../../northbound_labs/src/**/*.{js,jsx,ts,tsx,css,json,md}', { query: '?raw', import: 'default' }),
    root: import.meta.glob(
      '../../northbound_labs/{package.json,README.md,vite.config.js,eslint.config.js,index.html,tailwind.config.js,postcss.config.js}',
      { query: '?raw', import: 'default' },
    ),
  },
  norwin_ai: {
    src: import.meta.glob('../../norwin_ai/src/**/*.{js,jsx,ts,tsx,css,json,md}', { query: '?raw', import: 'default' }),
    root: import.meta.glob(
      '../../norwin_ai/{package.json,README.md,vite.config.js,eslint.config.js,index.html,tailwind.config.js,postcss.config.js}',
      { query: '?raw', import: 'default' },
    ),
  },
  olea: {
    src: import.meta.glob('../../olea/src/**/*.{js,jsx,ts,tsx,css,json,md}', { query: '?raw', import: 'default' }),
    root: import.meta.glob(
      '../../olea/{package.json,README.md,vite.config.js,eslint.config.js,index.html,tailwind.config.js,postcss.config.js}',
      { query: '?raw', import: 'default' },
    ),
  },
}

const EXT_LANG = {
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  mjs: 'javascript',
  cjs: 'javascript',
  css: 'css',
  scss: 'css',
  html: 'html',
  json: 'json',
  md: 'markdown',
}

function languageFor(path) {
  const ext = path.split('.').pop()?.toLowerCase()
  return EXT_LANG[ext] || 'text'
}

function relPath(slug, fullPath) {
  // Strip the leading "../../<slug>/" prefix so we expose tidy paths.
  const marker = `/${slug}/`
  const idx = fullPath.indexOf(marker)
  return idx === -1 ? fullPath : fullPath.slice(idx + marker.length)
}

/**
 * Load every source/config file for a template as an array of
 * { path, code, lang } sorted with src/ first.
 */
export async function loadTemplateFiles(slug) {
  const bucket = sourcePatterns[slug]
  if (!bucket) return []

  const allLoaders = { ...bucket.src, ...bucket.root }
  const entries = await Promise.all(
    Object.entries(allLoaders).map(async ([fullPath, loader]) => {
      try {
        const code = await loader()
        return {
          path: relPath(slug, fullPath),
          code: typeof code === 'string' ? code : String(code ?? ''),
          lang: languageFor(fullPath),
        }
      } catch {
        return null
      }
    }),
  )

  const files = entries.filter(Boolean)

  // Sort: src/main.jsx and src/App.jsx first, then rest of src/, then root.
  const score = (p) => {
    if (p === 'src/main.jsx' || p === 'src/main.js') return 0
    if (p === 'src/App.jsx' || p === 'src/App.tsx' || p === 'src/App.js') return 1
    if (p === 'src/index.css') return 2
    if (p.startsWith('src/')) return 3
    if (p === 'index.html') return 4
    if (p === 'package.json') return 5
    if (p === 'README.md') return 6
    return 7
  }
  files.sort((a, b) => {
    const sa = score(a.path)
    const sb = score(b.path)
    if (sa !== sb) return sa - sb
    return a.path.localeCompare(b.path)
  })

  return files
}

export function buildFileTree(files) {
  // Build a nested directory tree: { name, path, children?, file? }
  const root = { name: '', path: '', children: [] }
  for (const f of files) {
    const parts = f.path.split('/')
    let cur = root
    parts.forEach((part, i) => {
      const isLast = i === parts.length - 1
      let next = cur.children.find((c) => c.name === part)
      if (!next) {
        next = isLast
          ? { name: part, path: f.path, file: f }
          : { name: part, path: parts.slice(0, i + 1).join('/'), children: [] }
        cur.children.push(next)
      }
      if (!isLast) cur = next
    })
  }

  // Sort: folders first, then files, alphabetical.
  const sortNode = (node) => {
    if (!node.children) return
    node.children.sort((a, b) => {
      const aDir = !!a.children
      const bDir = !!b.children
      if (aDir !== bDir) return aDir ? -1 : 1
      return a.name.localeCompare(b.name)
    })
    node.children.forEach(sortNode)
  }
  sortNode(root)
  return root
}
