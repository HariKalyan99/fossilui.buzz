import { INSTALL_SNIPPET, motionSnippet } from './sharedDocs'

export const NAVBAR_IMPORT = `import { FossilNavbar } from '@fossilui/react'
// or: import { FossilNavbar, MinimalNavbar, CtaNavbar } from '@fossilui/react/navbars'`

export const NAVBAR_VARIANTS = [
  {
    id: 'minimal',
    name: 'Minimal',
    component: 'MinimalNavbar',
    description: 'Logo left, links right — default site header.',
    snippet: motionSnippet('FossilNavbar', 'variant', 'minimal', 'logo="Fossil"\n  links={[{ label: "Home", href: "#" }]}'),
  },
  {
    id: 'centered',
    name: 'Centered',
    component: 'CenteredNavbar',
    description: 'Logo and links stacked in a centered column.',
    snippet: motionSnippet('FossilNavbar', 'variant', 'centered', 'logo="Fossil"'),
  },
  {
    id: 'withCta',
    name: 'With CTA',
    component: 'CtaNavbar',
    description: 'Primary call-to-action button on the right.',
    snippet: motionSnippet('FossilNavbar', 'variant', 'withCta', 'ctaLabel="Get started"\n  ctaHref="#"'),
  },
  {
    id: 'scrollBlur',
    name: 'Scroll blur',
    component: 'ScrollBlurNavbar',
    description: 'Backdrop blur activates after scrolling.',
    snippet: motionSnippet('FossilNavbar', 'variant', 'scrollBlur', 'logo="Fossil"'),
  },
  {
    id: 'bordered',
    name: 'Bordered',
    component: 'BorderedNavbar',
    description: 'Bottom border for docs and app shells.',
    snippet: motionSnippet('FossilNavbar', 'variant', 'bordered', 'logo="Fossil"'),
  },
]

export const NAVBAR_PROPS = [
  { property: 'variant', description: 'Layout and behavior preset.', type: "'minimal' | 'centered' | 'withCta' | 'scrollBlur' | 'bordered'", default: "'minimal'" },
  { property: 'compact', description: 'Tighter layout for previews and embedded headers.', type: 'boolean', default: 'false' },
  { property: 'logo', description: 'Brand text or mark.', type: 'string', default: "'Fossil'" },
  { property: 'links', description: 'Array of { label, href } nav items.', type: 'Array<{ label: string; href: string }>', default: 'default links' },
  { property: 'ctaLabel', description: 'CTA button text for withCta variant.', type: 'string', default: "'Get started'" },
  { property: 'ctaHref', description: 'CTA link destination.', type: 'string', default: "'#'" },
]

export const NAVBAR_FAQS = [
  { q: 'Is the mobile menu included?', a: 'Yes — all variants include a responsive hamburger menu below the md breakpoint.' },
  { q: 'Can I replace the logo with an image?', a: 'Pass a React node as logo or wrap FossilNavbar children for full custom branding.' },
]

export const NAVBAR_WHEN_TO_USE = [
  { title: 'Marketing sites', body: 'Centered and CTA variants suit landing pages with a clear conversion path.' },
  { title: 'Product shells', body: 'Bordered and scrollBlur work for docs, dashboards, and app layouts that scroll.' },
]

export { INSTALL_SNIPPET as NAVBAR_INSTALL_SNIPPET }
