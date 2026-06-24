import { INSTALL_SNIPPET } from './sharedDocs'

export const BADGE_IMPORT = `import { FossilBadge } from '@fossilui/react'
// or: import { FossilBadge, PulseBadge, ShineBadge } from '@fossilui/react/badges'`

export const BADGE_VARIANTS = [
  {
    id: 'default',
    name: 'Default',
    component: 'DefaultBadge',
    description: 'Neutral pill for tags and metadata.',
    previewProps: { children: 'Beta' },
    snippet: `<FossilBadge motion="default" tone="neutral">Beta</FossilBadge>`,
  },
  {
    id: 'pulse',
    name: 'Pulse',
    component: 'PulseBadge',
    description: 'Subtle pulse for live or active status.',
    previewProps: { children: 'Live' },
    snippet: `<FossilBadge motion="pulse" tone="accent">Live</FossilBadge>`,
  },
  {
    id: 'shine',
    name: 'Shine',
    component: 'ShineBadge',
    description: 'Hover shine sweep for featured labels.',
    previewProps: { children: 'New' },
    snippet: `<FossilBadge motion="shine" tone="accent">New</FossilBadge>`,
  },
  {
    id: 'scale',
    name: 'Scale',
    component: 'ScaleBadge',
    description: 'Gentle scale on hover for interactive chips.',
    previewProps: { children: 'Pro' },
    snippet: `<FossilBadge motion="scale">Pro</FossilBadge>`,
  },
  {
    id: 'dot',
    name: 'Dot',
    component: 'DotBadge',
    description: 'Leading dot indicator for online status.',
    previewProps: { children: 'Online' },
    snippet: `<FossilBadge motion="dot" tone="success">Online</FossilBadge>`,
  },
  {
    id: 'borderGlow',
    name: 'Border glow',
    component: 'BorderGlowBadge',
    description: 'Indigo halo on hover for emphasis.',
    previewProps: { children: 'Featured' },
    snippet: `<FossilBadge motion="borderGlow" tone="accent">Featured</FossilBadge>`,
  },
]

export const BADGE_PROPS = [
  { property: 'motion', description: 'Hover or ambient animation preset.', type: "'default' | 'pulse' | 'shine' | 'scale' | 'dot' | 'borderGlow'", default: "'default'" },
  { property: 'tone', description: 'Color palette for border and background.', type: "'neutral' | 'accent' | 'soft' | 'success' | 'warning' | 'danger'", default: "'neutral'" },
  { property: 'children', description: 'Badge label text.', type: 'ReactNode', default: '—' },
]

export const BADGE_FAQS = [
  { q: 'Can badges contain icons?', a: 'Yes — pass any React node as children, including icons or short text with emoji.' },
  { q: 'Do motion effects respect reduced motion?', a: 'Pulse uses motion-safe utilities. Shine and scale are hover-only and degrade gracefully.' },
]

export const BADGE_WHEN_TO_USE = [
  { title: 'Status and metadata', body: 'Use default or dot badges for plan tiers, online status, and version labels.' },
  { title: 'Marketing highlights', body: 'Shine and borderGlow draw attention to new features without competing with primary CTAs.' },
]

export { INSTALL_SNIPPET as BADGE_INSTALL_SNIPPET }
