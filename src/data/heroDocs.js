import { INSTALL_SNIPPET, motionSnippet } from './sharedDocs'

export const HERO_IMPORT = `import { FossilHero } from '@fossilui/react'
// or: import { FossilHero, CenteredHero, SplitHero } from '@fossilui/react/heroes'`

export const HERO_VARIANTS = [
  {
    id: 'centered',
    name: 'Centered',
    component: 'CenteredHero',
    description: 'Classic stacked headline, copy, and CTA.',
    snippet: motionSnippet('FossilHero', 'variant', 'centered', 'title="Build interfaces that last"\n  description="Production-ready React components."'),
  },
  {
    id: 'split',
    name: 'Split',
    component: 'SplitHero',
    description: 'Two-column layout with image beside copy.',
    snippet: motionSnippet('FossilHero', 'variant', 'split', 'title="Ship faster"\n  imageSrc="/hero.jpg"\n  imageAlt="Product preview"'),
  },
  {
    id: 'eyebrow',
    name: 'Eyebrow',
    component: 'EyebrowHero',
    description: 'Small label above the headline.',
    snippet: motionSnippet('FossilHero', 'variant', 'eyebrow', 'eyebrow="Fossil UI"\n  title="Components that last"'),
  },
  {
    id: 'gradient',
    name: 'Gradient',
    component: 'GradientHero',
    description: 'Soft indigo gradient wash background.',
    snippet: motionSnippet('FossilHero', 'variant', 'gradient', 'title="Start building today"'),
  },
  {
    id: 'dualCta',
    name: 'Dual CTA',
    component: 'DualCtaHero',
    description: 'Primary and secondary action buttons.',
    snippet: motionSnippet('FossilHero', 'variant', 'dualCta', 'title="Choose your path"\n  primaryCta="Get started"\n  secondaryCta="View docs"'),
  },
  {
    id: 'stats',
    name: 'Stats',
    component: 'StatsHero',
    description: 'Headline with metric row below CTAs.',
    snippet: motionSnippet('FossilHero', 'variant', 'stats', 'title="Trusted by builders"\n  stats={[{ label: "Components", value: "50+" }]}'),
  },
  {
    id: 'mockup',
    name: 'Mockup',
    component: 'MockupHero',
    description: 'Device-style frame for product screenshots.',
    snippet: motionSnippet('FossilHero', 'variant', 'mockup', 'title="See it in action"'),
  },
  {
    id: 'media',
    name: 'Media',
    component: 'MediaHero',
    description: 'Large image or video beside copy.',
    snippet: motionSnippet('FossilHero', 'variant', 'media', 'title="Showcase your product"\n  imageSrc="/hero.jpg"\n  imageAlt="Hero media"'),
  },
  {
    id: 'minimal',
    name: 'Minimal',
    component: 'MinimalHero',
    description: 'Oversized type with generous whitespace.',
    snippet: motionSnippet('FossilHero', 'variant', 'minimal', 'title="Ship faster."\n  description="Minimal hero with oversized type."'),
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    component: 'NewsletterHero',
    description: 'Email capture form below the headline.',
    snippet: motionSnippet('FossilHero', 'variant', 'newsletter', 'title="Stay in the loop"\n  description="Get updates when new families ship."'),
  },
]

export const HERO_PROPS = [
  { property: 'variant', description: 'Layout and content preset.', type: "'centered' | 'split' | 'eyebrow' | 'gradient' | 'dualCta' | 'stats' | 'mockup' | 'media' | 'minimal' | 'newsletter'", default: "'centered'" },
  { property: 'compact', description: 'Smaller typography and padding for embedded previews.', type: 'boolean', default: 'false' },
  { property: 'title', description: 'Main headline.', type: 'string', default: "'Build interfaces that last'" },
  { property: 'description', description: 'Supporting paragraph.', type: 'string', default: 'default copy' },
  { property: 'primaryCta', description: 'Primary button label.', type: 'string', default: "'Get started'" },
  { property: 'secondaryCta', description: 'Secondary button label (dualCta).', type: 'string', default: '—' },
  { property: 'imageSrc', description: 'Media URL for split, media, and mockup variants.', type: 'string', default: '—' },
  { property: 'stats', description: 'Array of { label, value } for stats variant.', type: 'Array<{ label: string; value: string }>', default: '—' },
]

export const HERO_FAQS = [
  { q: 'Can heroes be full viewport height?', a: 'Add min-h-screen or py utilities via className on FossilHero to stretch above the fold.' },
  { q: 'Do image variants require local assets?', a: 'Pass any imageSrc URL — bundled demos use /14.jpg but remote URLs work too.' },
]

export const HERO_WHEN_TO_USE = [
  { title: 'Landing pages', body: 'Centered, gradient, and dualCta variants cover most marketing hero sections.' },
  { title: 'Product launches', body: 'Split, mockup, and stats heroes highlight visuals and social proof above the fold.' },
]

export { INSTALL_SNIPPET as HERO_INSTALL_SNIPPET }
