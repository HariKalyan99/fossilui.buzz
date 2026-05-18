// Stack labels derived from each template's package.json (dependencies + devDependencies).

export const TEMPLATE_STACKS = {
  atelier_09: ['tailwind4', 'motion', 'lucide', 'vite'],
  eleven: ['tailwind3', 'motion', 'router', 'radix', 'tiptap', 'recharts', 'zustand'],
  evently: ['tailwind3', 'motion', 'router', 'lucide', 'vite'],
  glimpse: ['tailwind4', 'motion', 'router', 'zustand', 'lucide'],
  nebula: ['tailwind4', 'motion', 'lucide', 'vite'],
  northbound_labs: ['tailwind4', 'motion', 'lucide', 'vite'],
  norwin_ai: ['tailwind3', 'motion', 'router', 'lucide', 'vite'],
  olea: ['tailwind3', 'motion', 'router', 'vite'],
}

export const STACK_META = {
  tailwind3: {
    label: 'Tailwind CSS v3',
    shortLabel: 'Tailwind',
    color: '#06b6d4',
  },
  tailwind4: {
    label: 'Tailwind CSS v4',
    shortLabel: 'Tailwind',
    color: '#06b6d4',
  },
  motion: {
    label: 'Framer Motion',
    shortLabel: 'Motion',
    color: '#ff4d8d',
  },
  router: {
    label: 'React Router',
    shortLabel: 'Router',
    color: '#e44d26',
  },
  lucide: {
    label: 'Lucide Icons',
    shortLabel: 'Lucide',
    color: '#18181b',
  },
  radix: {
    label: 'Radix UI',
    shortLabel: 'Radix',
    color: '#161618',
  },
  tiptap: {
    label: 'TipTap',
    shortLabel: 'TipTap',
    color: '#684ced',
  },
  recharts: {
    label: 'Recharts',
    shortLabel: 'Recharts',
    color: '#22c55e',
  },
  zustand: {
    label: 'Zustand',
    shortLabel: 'Zustand',
    color: '#c4712f',
  },
  vite: {
    label: 'Vite',
    shortLabel: 'Vite',
    color: '#646cff',
  },
}

export function getTemplateStack(slug) {
  const ids = TEMPLATE_STACKS[slug] ?? []
  return ids
    .map((id) => ({ id, ...STACK_META[id] }))
    .filter((item) => item.label)
}
