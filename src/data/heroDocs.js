import { importGuideSnippets, importSnippet, sharedFaqs } from './sharedDocs'

export const HERO_PACKAGE = { label: 'Heroes', packageName: '@fossilui/heroes' }

export const HERO_IMPORT_SNIPPETS = importGuideSnippets(HERO_PACKAGE)

export const HERO_IMPORT_SNIPPET = importSnippet({
  names: ['Hero'],
  subpath: 'heroes',
  packageName: HERO_PACKAGE.packageName,
})

export const HERO_DEMO = {
  eyebrow: 'New · Fossil UI 0.2',
  title: 'Ship polished interfaces faster',
  description: 'Animated React components built on Tailwind CSS. Copy, paste, and make them yours.',
  primaryLabel: 'Get started',
  primaryHref: '/components',
  secondaryLabel: 'View on GitHub',
  secondaryHref: 'https://github.com/fossilui',
}

export function heroSnippet(attrs) {
  const lines = attrs.map((attr) => `  ${attr}`).join('\n')
  return `import { Hero } from '@fossilui/react'

<Hero
${lines}
/>`
}

function demoSnippet(motion) {
  return heroSnippet([
    `motion="${motion}"`,
    `eyebrow="${HERO_DEMO.eyebrow}"`,
    `title="${HERO_DEMO.title}"`,
    `description="${HERO_DEMO.description}"`,
    `primaryLabel="${HERO_DEMO.primaryLabel}"`,
    `primaryHref="${HERO_DEMO.primaryHref}"`,
    `secondaryLabel="${HERO_DEMO.secondaryLabel}"`,
    `secondaryHref="${HERO_DEMO.secondaryHref}"`,
  ])
}

export const HERO_VARIANTS = [
  {
    id: 'fade-up',
    name: 'Fade up',
    description: 'Eyebrow, title, copy, and actions rise in one after another.',
    component: 'FadeUpHero',
    snippet: demoSnippet('fadeUp'),
  },
  {
    id: 'stagger-words',
    name: 'Stagger words',
    description: 'Each word of the headline slides up from behind a mask.',
    component: 'StaggerWordsHero',
    snippet: demoSnippet('staggerWords'),
  },
  {
    id: 'blur-reveal',
    name: 'Blur reveal',
    description: 'Content sharpens from a soft blur into focus.',
    component: 'BlurRevealHero',
    snippet: demoSnippet('blurReveal'),
  },
  {
    id: 'scale-in',
    name: 'Scale in',
    description: 'The headline springs in from a slightly smaller scale.',
    component: 'ScaleInHero',
    snippet: demoSnippet('scaleIn'),
  },
  {
    id: 'letter-cascade',
    name: 'Letter cascade',
    description: 'Letters drop into place one by one.',
    component: 'LetterCascadeHero',
    snippet: demoSnippet('letterCascade'),
  },
  {
    id: 'gradient-text',
    name: 'Gradient text',
    description: 'A slow, looping gradient flows through the headline.',
    component: 'GradientTextHero',
    snippet: demoSnippet('gradientText'),
  },
  {
    id: 'spotlight',
    name: 'Spotlight',
    description: 'A soft light follows the pointer across the section.',
    component: 'SpotlightHero',
    snippet: demoSnippet('spotlight'),
  },
  {
    id: 'typewriter',
    name: 'Typewriter',
    description: 'The headline types itself out behind a blinking caret.',
    component: 'TypewriterHero',
    snippet: demoSnippet('typewriter'),
  },
]

export const HERO_WHEN_TO_USE = [
  {
    title: 'Product landing pages',
    body: 'FadeUpHero and BlurRevealHero introduce the page calmly and work with any headline length.',
  },
  {
    title: 'Launches and announcements',
    body: 'StaggerWordsHero, ScaleInHero, and GradientTextHero give short, punchy headlines extra presence.',
  },
  {
    title: 'Personal and agency sites',
    body: 'LetterCascadeHero, TypewriterHero, and SpotlightHero bring personality to portfolios and studio pages.',
  },
  {
    title: 'Section intros',
    body: 'Heroes animate when scrolled into view, so they also work as large intros further down a page. Use align="left" and background="none" there.',
  },
  {
    title: 'When not to use',
    body: 'Avoid letter or typewriter effects on long headlines — they delay reading. Use one hero per page and keep its motion consistent with the rest of the site.',
  },
]

export const HERO_PROPS = [
  {
    property: 'motion',
    description: 'Entrance animation when using the standard <Hero /> wrapper.',
    type: "'fadeUp' | 'staggerWords' | 'blurReveal' | 'scaleIn' | 'letterCascade' | 'gradientText' | 'spotlight' | 'typewriter'",
    default: "'fadeUp'",
  },
  {
    property: 'eyebrow',
    description: 'Small pill above the headline, e.g. a release note.',
    type: 'ReactNode',
    default: '—',
  },
  {
    property: 'title',
    description: 'Headline. A plain string so word and letter motions can split it; screen readers get the full text.',
    type: 'string',
    default: '—',
  },
  {
    property: 'description',
    description: 'Supporting paragraph under the headline.',
    type: 'ReactNode',
    default: '—',
  },
  {
    property: 'primaryLabel',
    description: 'Shows the primary action when set.',
    type: 'string',
    default: '—',
  },
  {
    property: 'primaryHref',
    description: 'Link target for the primary action.',
    type: 'string',
    default: '—',
  },
  {
    property: 'secondaryLabel',
    description: 'Shows the secondary (outlined) action when set.',
    type: 'string',
    default: '—',
  },
  {
    property: 'secondaryHref',
    description: 'Link target for the secondary action.',
    type: 'string',
    default: '—',
  },
  {
    property: 'align',
    description: 'Text and action alignment.',
    type: "'center' | 'left'",
    default: "'center'",
  },
  {
    property: 'background',
    description: 'Decorative backdrop behind the content.',
    type: "'grid' | 'glow' | 'none'",
    default: "'grid'",
  },
  {
    property: 'children',
    description: 'Extra content under the actions — a screenshot, logo row, or form. It animates in last.',
    type: 'ReactNode',
    default: '—',
  },
  {
    property: 'className',
    description: 'Extra classes merged onto the <section> root.',
    type: 'string',
    default: '—',
  },
]

export const HERO_MOTION_COMPATIBILITY = [
  {
    motion: 'fadeUp',
    bestWith: 'any headline; both alignments',
    limited: '—',
    notes: 'Safest default.',
  },
  {
    motion: 'staggerWords',
    bestWith: 'headlines of 3–8 words',
    limited: 'Very long headlines',
    notes: 'Words wrap naturally — no layout shift after the animation.',
  },
  {
    motion: 'blurReveal',
    bestWith: 'image-rich or premium brands',
    limited: 'Low-end devices (blur is GPU heavy)',
    notes: 'Slightly slower and softer than fadeUp.',
  },
  {
    motion: 'scaleIn',
    bestWith: 'short, bold headlines',
    limited: 'Left-aligned layouts',
    notes: 'Springs up from 86% scale with a slight overshoot.',
  },
  {
    motion: 'letterCascade',
    bestWith: 'one- to four-word headlines',
    limited: 'Headlines longer than ~40 characters',
    notes: 'Letters stagger 22ms apart, capped at about one second.',
  },
  {
    motion: 'gradientText',
    bestWith: 'launches; dark or glow backgrounds',
    limited: 'Brand palettes without indigo/violet',
    notes: 'The loop stops when reduced motion is on.',
  },
  {
    motion: 'spotlight',
    bestWith: 'desktop-first landing pages',
    limited: 'Touch devices (no pointer to follow)',
    notes: 'The glow only appears on hover; touch users still get the fade-up entrance.',
  },
  {
    motion: 'typewriter',
    bestWith: 'developer tools; personal sites',
    limited: 'Long headlines',
    notes: 'Space is reserved up front, so typing never shifts the layout.',
  },
]

export const HERO_FAQS = [
  {
    q: 'When does the animation start?',
    a: 'When at least 20% of the hero scrolls into view, once. Heroes at the top of the page start immediately on load.',
  },
  {
    q: 'Is the headline readable by screen readers and search engines?',
    a: 'Yes. Split-text motions render the full title in a visually hidden span and hide the animated pieces with aria-hidden, so the heading text stays intact.',
  },
  {
    q: 'How do I add a product screenshot?',
    a: 'Pass it as children. It is placed below the actions and animates in after them, using the same motion.',
  },
  ...sharedFaqs('heroes', HERO_PACKAGE.packageName),
]
