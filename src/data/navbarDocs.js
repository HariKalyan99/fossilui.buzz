import { importGuideSnippets, importSnippet, sharedFaqs } from './sharedDocs'

export const NAVBAR_PACKAGE = { label: 'Navbars', packageName: '@fossilui/navbars' }

export const NAVBAR_IMPORT_SNIPPETS = importGuideSnippets(NAVBAR_PACKAGE)

export const NAVBAR_IMPORT_SNIPPET = importSnippet({
  names: ['Navbar'],
  subpath: 'navbars',
  packageName: NAVBAR_PACKAGE.packageName,
})

export const NAVBAR_DEMO_LINKS = ['Product', 'Components', 'Pricing', 'Docs']

export const NAVBAR_DEMO = {
  brand: 'Fossil UI',
  links: NAVBAR_DEMO_LINKS.map((label) => ({ label, href: `/${label.toLowerCase()}` })),
  active: 'Product',
  ctaLabel: 'Get started',
  ctaHref: '/signup',
}

export function formatLinks(links) {
  const items = links.map((link) => `    { label: '${link.label}', href: '${link.href}' },`).join('\n')
  return `links={[\n${items}\n  ]}`
}

export function navbarSnippet(attrs) {
  const lines = attrs.map((attr) => `  ${attr}`).join('\n')
  return `import { Navbar } from '@fossilui/react'

<Navbar
${lines}
/>`
}

function demoSnippet(motion) {
  return navbarSnippet([
    `motion="${motion}"`,
    `brand="${NAVBAR_DEMO.brand}"`,
    formatLinks(NAVBAR_DEMO.links),
    `active="${NAVBAR_DEMO.active}"`,
    `ctaLabel="${NAVBAR_DEMO.ctaLabel}"`,
    `ctaHref="${NAVBAR_DEMO.ctaHref}"`,
  ])
}

export const NAVBAR_VARIANTS = [
  {
    id: 'sliding-pill',
    name: 'Sliding pill',
    description: 'A soft pill glides between links as you hover and select.',
    component: 'SlidingPillNavbar',
    snippet: demoSnippet('slidingPill'),
  },
  {
    id: 'sliding-underline',
    name: 'Sliding underline',
    description: 'A single underline travels to the hovered or active link.',
    component: 'SlidingUnderlineNavbar',
    snippet: demoSnippet('slidingUnderline'),
  },
  {
    id: 'dot-indicator',
    name: 'Dot indicator',
    description: 'A small dot slides under the current page.',
    component: 'DotIndicatorNavbar',
    snippet: demoSnippet('dotIndicator'),
  },
  {
    id: 'grow-underline',
    name: 'Grow underline',
    description: 'Each link draws its own underline from the left; the active one keeps it.',
    component: 'GrowUnderlineNavbar',
    snippet: demoSnippet('growUnderline'),
  },
  {
    id: 'text-roll',
    name: 'Text roll',
    description: 'Link labels roll upward to reveal a copy on hover.',
    component: 'TextRollNavbar',
    snippet: demoSnippet('textRoll'),
  },
  {
    id: 'spotlight',
    name: 'Spotlight',
    description: 'Hovering one link dims the rest so focus stays clear.',
    component: 'SpotlightNavbar',
    snippet: demoSnippet('spotlight'),
  },
  {
    id: 'glass-float',
    name: 'Glass float',
    description: 'A floating frosted-glass bar that lifts on hover, with pill links.',
    component: 'GlassFloatNavbar',
    snippet: demoSnippet('glassFloat'),
  },
]

export const NAVBAR_WHEN_TO_USE = [
  {
    title: 'Product and SaaS sites',
    body: 'SlidingPillNavbar and SlidingUnderlineNavbar make the current section obvious and feel responsive without being loud.',
  },
  {
    title: 'Landing pages over imagery',
    body: 'GlassFloatNavbar floats above hero media with a frosted backdrop, so it stays legible on photos and gradients.',
  },
  {
    title: 'Editorial and portfolio sites',
    body: 'GrowUnderlineNavbar, TextRollNavbar, and SpotlightNavbar add character to minimal typography-led layouts.',
  },
  {
    title: 'Docs and dashboards',
    body: 'DotIndicatorNavbar is quiet enough for app chrome while still marking the active page.',
  },
  {
    title: 'When not to use',
    body: 'Avoid animated navbars for deep, multi-level navigation — use a dedicated menu or sidebar there. Keep link count to roughly six or fewer.',
  },
]

export const NAVBAR_PROPS = [
  {
    property: 'motion',
    description: 'Link hover/active animation when using the standard <Navbar /> wrapper.',
    type: "'slidingPill' | 'slidingUnderline' | 'dotIndicator' | 'growUnderline' | 'textRoll' | 'spotlight' | 'glassFloat'",
    default: "'slidingPill'",
  },
  {
    property: 'brand',
    description: 'Brand text shown next to the logo.',
    type: 'ReactNode',
    default: "'Fossil UI'",
  },
  {
    property: 'brandHref',
    description: 'Renders the brand as a link when set.',
    type: 'string',
    default: '—',
  },
  {
    property: 'logo',
    description: 'Custom logo node. A gradient mark is shown when omitted.',
    type: 'ReactNode',
    default: '—',
  },
  {
    property: 'links',
    description: 'Navigation items. Plain strings are allowed and link to "#".',
    type: 'Array<string | { label: string; href?: string }>',
    default: '[]',
  },
  {
    property: 'active',
    description: 'Label of the current link. Clicking a link also updates the indicator.',
    type: 'string',
    default: '—',
  },
  {
    property: 'ctaLabel',
    description: 'Shows the call-to-action button on the right when set.',
    type: 'string',
    default: '—',
  },
  {
    property: 'ctaHref',
    description: 'Link target for the call-to-action.',
    type: 'string',
    default: '—',
  },
  {
    property: 'onLinkClick',
    description: 'Called with the link and click event — call event.preventDefault() for client-side routing.',
    type: '(link, event) => void',
    default: '—',
  },
  {
    property: 'className',
    description: 'Extra classes merged onto the <header> root.',
    type: 'string',
    default: '—',
  },
]

export const NAVBAR_MOTION_COMPATIBILITY = [
  {
    motion: 'slidingPill',
    bestWith: 'SaaS and product sites; 3–6 links',
    limited: '—',
    notes: 'Most versatile default.',
  },
  {
    motion: 'slidingUnderline',
    bestWith: 'docs, blogs, light headers',
    limited: 'Very tight link spacing',
    notes: 'Thin 2px line — keep a clear contrast with the border.',
  },
  {
    motion: 'dotIndicator',
    bestWith: 'app chrome; minimal headers',
    limited: 'Long link labels',
    notes: 'Most subtle indicator in the set.',
  },
  {
    motion: 'growUnderline',
    bestWith: 'editorial and portfolio sites',
    limited: 'Sites that need a sliding indicator',
    notes: 'Each link animates independently.',
  },
  {
    motion: 'textRoll',
    bestWith: 'agency and brand sites',
    limited: 'Multi-word labels',
    notes: 'Short, single-word labels roll best.',
  },
  {
    motion: 'spotlight',
    bestWith: 'typography-led layouts',
    limited: 'Low-contrast palettes',
    notes: 'Dims sibling links rather than adding an indicator.',
  },
  {
    motion: 'glassFloat',
    bestWith: 'heroes with imagery or gradients',
    limited: 'Plain white pages (glass effect is invisible)',
    notes: 'Max width 48rem with rounded corners; pair with position sticky.',
  },
]

export const NAVBAR_FAQS = [
  {
    q: 'How does it behave on mobile?',
    a: 'Navbars use container queries, so they adapt to the width of their parent rather than the viewport. Below ~36rem the links collapse into an animated hamburger menu whose items stagger in.',
  },
  {
    q: 'How do I use it with React Router or Next.js links?',
    a: 'Pass onLinkClick, call event.preventDefault(), and navigate with your router (navigate(link.href) or router.push(link.href)). Set active from the current pathname so the indicator follows route changes.',
  },
  {
    q: 'How do I make it sticky?',
    a: 'Add className="sticky top-0 z-40". For glassFloat, use "sticky top-3 z-40" so it floats below the top edge.',
  },
  ...sharedFaqs('navbars', NAVBAR_PACKAGE.packageName),
]
