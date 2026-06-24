export const COMPONENT_INSTALL_SNIPPET = `# Install
npm install @fossilui/react

# Tailwind v4 — app.css
@import "tailwindcss";
@source "../node_modules/@fossilui/react/dist";`

export const COMPONENT_FAMILIES = [
  {
    id: 'buttons',
    name: 'Buttons',
    description: 'Roll text, stagger letters, shine sweep, lift shadow, and more — with shared props and motion compatibility.',
    variants: 11,
    href: '/components/buttons',
    status: 'live',
  },
  {
    id: 'cards',
    name: 'Cards',
    description: 'Media-forward tiles with lift shadow, image zoom, gradient wash, tilt hover, and accent reveal.',
    variants: 8,
    href: '/components/cards',
    status: 'live',
  },
  {
    id: 'modals',
    name: 'Modals',
    description: 'Focus-friendly dialogs with fade, slide, scale, blur overlay, and drawer motion.',
    variants: 6,
    href: '/components/modals',
    status: 'live',
  },
  {
    id: 'inputs',
    name: 'Inputs',
    description: 'Text fields, selects, toggles, and form helpers with validation and focus states.',
    variants: 14,
    href: '/components/inputs',
    status: 'live',
  },
  {
    id: 'badges',
    name: 'Badges',
    description: 'Status pills with pulse, shine, scale, dot, and border glow effects.',
    variants: 6,
    href: '/components/badges',
    status: 'live',
  },
  {
    id: 'alerts',
    name: 'Alerts',
    description: 'Inline banners for info, success, warning, and danger messaging.',
    variants: 4,
    href: '/components/alerts',
    status: 'live',
  },
  {
    id: 'navbars',
    name: 'Navbars',
    description: 'Responsive headers with CTA, centered nav, scroll blur, and mobile menus.',
    variants: 5,
    href: '/components/navbars',
    status: 'live',
  },
  {
    id: 'hero-blocks',
    name: 'Hero blocks',
    description: 'Above-the-fold sections with split layouts, stats, media, and newsletter CTAs.',
    variants: 10,
    href: '/components/heroes',
    status: 'live',
  },
  {
    id: 'separators',
    name: 'Separators',
    description: 'Horizontal, vertical, and labeled dividers for stacking content.',
    variants: 3,
    href: '/components/separators',
    status: 'live',
  },
  {
    id: 'spinners',
    name: 'Spinners',
    description: 'Loading indicators with ring and dot motion presets.',
    variants: 3,
    href: '/components/spinners',
    status: 'live',
  },
]

export const LIVE_FAMILIES = COMPONENT_FAMILIES.filter((item) => item.status === 'live')

export const COMPONENT_STATS = {
  liveFamilies: LIVE_FAMILIES.length,
  totalVariants: COMPONENT_FAMILIES.reduce((sum, item) => sum + item.variants, 0),
  liveVariants: LIVE_FAMILIES.reduce((sum, item) => sum + item.variants, 0),
}
