import { CARD_DEMO_IMAGE, CARD_DEMO_IMAGE_ALT } from './cardDemo'

export const CARD_INSTALL_SNIPPET = `# Full component library
npm install @fossilui/react

# Required — Tailwind v4 (Vite)
npm install -D tailwindcss @tailwindcss/vite`

export const CARD_VITE_SNIPPET = `// vite.config.js
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})`

export const CARD_IMPORT_SNIPPET = `// Full library import
import { Card } from '@fossilui/react'

// OR cards path inside @fossilui/react:
import { Card } from '@fossilui/react/cards'`

export const CARD_TAILWIND_SNIPPET = `/* app.css */
@import "tailwindcss";`

export const CARD_TAILWIND_REACT_SNIPPET = `/* app.css — use with @fossilui/react */
@import "tailwindcss";
@source "../node_modules/@fossilui/react/dist";`

export const WHEN_TO_USE = [
  {
    title: 'Product and feature grids',
    body: 'Use LiftShadowCard or ScaleUpCard for template galleries, pricing tiers, and feature lists where hover should feel tactile without distracting motion.',
  },
  {
    title: 'Media-forward layouts',
    body: 'ImageZoomCard and ShineSweepCard suit portfolio tiles, blog previews, and any card where the visual area is the primary hook.',
  },
  {
    title: 'Editorial and minimal sections',
    body: 'BorderGlowCard, AccentRevealCard, and GradientShiftCard work well on docs, about pages, and light backgrounds where subtle polish matters.',
  },
  {
    title: 'Interactive showcases',
    body: 'TiltHoverCard adds depth for hero-adjacent grids or demo sections. Keep one motion per row so the page does not feel busy.',
  },
  {
    title: 'When not to use',
    body: 'Avoid animated cards in dense dashboards, data tables, or anywhere users scan quickly. Prefer static cards when hover is unavailable or when motion would compete with primary CTAs.',
  },
]

export const CARD_PROPS = [
  {
    property: 'motion',
    description: 'Hover animation style when using the standard <Card /> wrapper.',
    type: "'liftShadow' | 'borderGlow' | 'imageZoom' | 'shineSweep' | 'gradientShift' | 'scaleUp' | 'accentReveal' | 'tiltHover'",
    default: "'liftShadow'",
  },
  {
    property: 'title',
    description: 'Card heading rendered in the body when children are not provided.',
    type: 'string',
    default: '—',
  },
  {
    property: 'description',
    description: 'Supporting copy below the title.',
    type: 'string',
    default: '—',
  },
  {
    property: 'accent',
    description: 'Fallback media gradient palette when imageSrc and media are not set.',
    type: "'default' | 'primary' | 'violet' | 'teal' | 'rose'",
    default: "'default'",
  },
  {
    property: 'size',
    description: 'Body padding scale.',
    type: "'compact' | 'default' | 'roomy'",
    default: "'default'",
  },
  {
    property: 'withMedia',
    description: 'Show the built-in media area above the body.',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'interactive',
    description: 'Enable hover motion. Set false for static presentation.',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'imageSrc',
    description: 'Image URL for the media area. Place files in your public folder and reference with a leading slash.',
    type: 'string',
    default: '—',
  },
  {
    property: 'imageAlt',
    description: 'Accessible alt text for imageSrc.',
    type: 'string',
    default: "''",
  },
  {
    property: 'media',
    description: 'Custom media slot. Replaces imageSrc and the default gradient preview.',
    type: 'ReactNode',
    default: '—',
  },
  {
    property: 'children',
    description: 'Custom body content. Replaces title and description when set.',
    type: 'ReactNode',
    default: '—',
  },
  {
    property: 'className',
    description: 'Extra Tailwind or custom classes merged onto the root element.',
    type: 'string',
    default: '—',
  },
  {
    property: 'style',
    description: 'Inline styles on the root element. In the configurator use object syntax, e.g. style={{ maxWidth: 320 }}.',
    type: 'CSSProperties',
    default: '—',
  },
  {
    property: 'href',
    description: 'When set, renders the card root as an anchor.',
    type: 'string',
    default: '—',
  },
  {
    property: 'className',
    description: 'Extra classes merged onto the root element.',
    type: 'string',
    default: '—',
  },
]

export const CARD_MOTION_COMPATIBILITY = [
  {
    motion: 'liftShadow',
    bestWith: 'feature grids; default/primary accents; with or without media',
    limited: 'Very small compact cards can feel stiff',
    notes: 'Most flexible default — matches Fossil UI site card hover.',
  },
  {
    motion: 'borderGlow',
    bestWith: 'text-heavy cards; minimal media; primary accent',
    limited: 'Busy backgrounds reduce glow visibility',
    notes: 'Great for docs and editorial link tiles.',
  },
  {
    motion: 'imageZoom',
    bestWith: 'media-forward cards; portfolio and template previews',
    limited: 'No media area means little visible effect',
    notes: 'Pair with withMedia=true or a custom media slot.',
  },
  {
    motion: 'shineSweep',
    bestWith: 'hero-adjacent grids; premium highlights',
    limited: 'Can feel loud when overused in dense grids',
    notes: 'Use sparingly for standout tiles.',
  },
  {
    motion: 'gradientShift',
    bestWith: 'light backgrounds; compact copy blocks',
    limited: 'Dark surfaces hide the shift',
    notes: 'Uses an opacity-faded overlay so the effect works with photos and solid backgrounds.',
  },
  {
    motion: 'scaleUp',
    bestWith: 'equal-height grids; roomy size',
    limited: 'Adjacent cards may overlap if gap is tight',
    notes: 'Leave comfortable grid gap (12px+).',
  },
  {
    motion: 'accentReveal',
    bestWith: 'link cards; bottom-aligned CTAs',
    limited: 'Static cards with no hover affordance',
    notes: 'Underline-style accent without underlining text.',
  },
  {
    motion: 'tiltHover',
    bestWith: 'showcase sections; single-row highlights',
    limited: 'Dense multi-column grids',
    notes: 'Adds depth — use one row at a time for best effect.',
  },
]

const DEMO_TITLE = 'Fossil UI'
const DEMO_DESCRIPTION = 'Production-ready components for modern developers.'

function cardSnippet(motion) {
  return `import { Card } from '@fossilui/react'

<Card
  motion="${motion}"
  imageSrc="${CARD_DEMO_IMAGE}"
  imageAlt="${CARD_DEMO_IMAGE_ALT}"
  title="${DEMO_TITLE}"
  description="${DEMO_DESCRIPTION}"
/>`
}

export const CARD_VARIANTS = [
  {
    id: 'lift-shadow',
    name: 'Lift shadow',
    description: 'Card rises with a soft shadow beneath it.',
    component: 'LiftShadowCard',
    title: DEMO_TITLE,
    tagline: DEMO_DESCRIPTION,
    snippet: cardSnippet('liftShadow'),
  },
  {
    id: 'border-glow',
    name: 'Border glow',
    description: 'Border brightens with a soft indigo glow on hover.',
    component: 'BorderGlowCard',
    title: DEMO_TITLE,
    tagline: DEMO_DESCRIPTION,
    snippet: cardSnippet('borderGlow'),
  },
  {
    id: 'image-zoom',
    name: 'Image zoom',
    description: 'Media area scales up smoothly inside the card.',
    component: 'ImageZoomCard',
    title: DEMO_TITLE,
    tagline: DEMO_DESCRIPTION,
    snippet: cardSnippet('imageZoom'),
  },
  {
    id: 'shine-sweep',
    name: 'Shine sweep',
    description: 'Diagonal highlight sweeps across on hover.',
    component: 'ShineSweepCard',
    title: DEMO_TITLE,
    tagline: DEMO_DESCRIPTION,
    snippet: cardSnippet('shineSweep'),
  },
  {
    id: 'gradient-shift',
    name: 'Gradient shift',
    description: 'Background gradient wash fades in over the card on hover.',
    component: 'GradientShiftCard',
    title: DEMO_TITLE,
    tagline: DEMO_DESCRIPTION,
    snippet: cardSnippet('gradientShift'),
  },
  {
    id: 'scale-up',
    name: 'Scale up',
    description: 'Entire card scales up slightly on hover.',
    component: 'ScaleUpCard',
    title: DEMO_TITLE,
    tagline: DEMO_DESCRIPTION,
    snippet: cardSnippet('scaleUp'),
  },
  {
    id: 'accent-reveal',
    name: 'Accent reveal',
    description: 'Bottom accent bar grows from the center.',
    component: 'AccentRevealCard',
    title: DEMO_TITLE,
    tagline: DEMO_DESCRIPTION,
    snippet: cardSnippet('accentReveal'),
  },
  {
    id: 'tilt-hover',
    name: 'Tilt hover',
    description: 'Subtle 3D tilt adds depth on hover.',
    component: 'TiltHoverCard',
    title: DEMO_TITLE,
    tagline: DEMO_DESCRIPTION,
    snippet: cardSnippet('tiltHover'),
  },
]

export const CARD_FAQS = [
  {
    q: 'Do I need Tailwind CSS?',
    a: 'Yes. Install tailwindcss and @tailwindcss/vite, enable the Vite plugin, and add @import "tailwindcss" plus @source "../node_modules/@fossilui/react/dist" in your CSS. Without Tailwind, cards mount but look unstyled.',
  },
  {
    q: 'Can I add className or inline styles?',
    a: 'Yes. Pass className for Tailwind or custom classes, and style with object syntax (e.g. style={{ maxWidth: 320 }}) in your snippet. The configurator preview parses both from the code editor.',
  },
  {
    q: 'Can I use custom media instead of the default gradient?',
    a: 'Pass imageSrc for a photo from your public folder (e.g. imageSrc="/14.jpg"), or pass a media prop with any React node. You can also compose with CardMedia and CardBody for full control.',
  },
  {
    q: 'Does the configurator sync controls and code both ways?',
    a: 'Yes. The control panel and code editor share one source of truth. Changing controls updates code and preview, and valid code edits update controls and preview.',
  },
  {
    q: 'Should every card in a grid use a different motion?',
    a: 'No. Pick one motion per section for consistency. Mixing many hover styles in one grid feels noisy and slows scanning.',
  },
  {
    q: 'Can I make a card a link?',
    a: 'Yes. Pass href to render the root as an anchor. Pair with accentReveal or liftShadow for clear interactive affordance.',
  },
  {
    q: 'How do I disable hover motion?',
    a: 'Set interactive={false} for static presentation — useful in dashboards or when mirroring a selected state.',
  },
  {
    q: 'Which card should I pick?',
    a: 'Use liftShadow for general grids, imageZoom for media tiles, borderGlow or accentReveal for editorial links, and tiltHover for showcase rows. See When to use for more guidance.',
  },
  {
    q: 'Can I use these in Next.js or Remix?',
    a: 'Yes. Install the package, add the Tailwind source path, and import components in client components ("use client" in the App Router) because cards rely on hover styles.',
  },
]
