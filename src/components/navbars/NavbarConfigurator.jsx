import {
  Navbar,
  NAVBAR_MOTIONS,
  SlidingPillNavbar,
  SlidingUnderlineNavbar,
  DotIndicatorNavbar,
  GrowUnderlineNavbar,
  TextRollNavbar,
  SpotlightNavbar,
  GlassFloatNavbar,
} from '@fossilui/react'
import { ComponentConfigurator } from '../docs/ComponentConfigurator'
import { pickStrings, stringAttr } from '../docs/snippetAttrs'
import { TIMING_DEFAULTS, timingAttrs, timingFields, timingProps } from '../docs/timingFields'
import { NAVBAR_DEMO, NAVBAR_DEMO_LINKS, formatLinks, navbarSnippet } from '../../data/navbarDocs'

const COMPONENT_MAP = {
  Navbar,
  SlidingPillNavbar,
  SlidingUnderlineNavbar,
  DotIndicatorNavbar,
  GrowUnderlineNavbar,
  TextRollNavbar,
  SpotlightNavbar,
  GlassFloatNavbar,
}

const NAMED_MOTIONS = {
  SlidingPillNavbar: 'slidingPill',
  SlidingUnderlineNavbar: 'slidingUnderline',
  DotIndicatorNavbar: 'dotIndicator',
  GrowUnderlineNavbar: 'growUnderline',
  TextRollNavbar: 'textRoll',
  SpotlightNavbar: 'spotlight',
  GlassFloatNavbar: 'glassFloat',
}

const TEXT_KEYS = ['brand', 'active', 'ctaLabel', 'ctaHref']

/** "Product, Docs" -> [{ label: 'Product', href: '/product' }, ...] */
function linksFromText(text) {
  return String(text ?? '')
    .split(',')
    .map((label) => label.trim())
    .filter(Boolean)
    .map((label) => ({ label, href: `/${label.toLowerCase().replace(/\s+/g, '-')}` }))
}

function linksToText(links) {
  if (!Array.isArray(links)) return undefined
  return links.map((link) => (typeof link === 'string' ? link : link?.label)).filter(Boolean).join(', ')
}

const preventNavigation = (_link, event) => event.preventDefault()

/** @type {import('../docs/ComponentConfigurator').ConfiguratorSchema} */
const SCHEMA = {
  wrapperName: 'Navbar',
  componentMap: COMPONENT_MAP,
  namedMotions: NAMED_MOTIONS,
  motions: NAVBAR_MOTIONS,
  defaults: {
    motion: 'slidingPill',
    brand: NAVBAR_DEMO.brand,
    links: NAVBAR_DEMO_LINKS.join(', '),
    active: NAVBAR_DEMO.active,
    ctaLabel: NAVBAR_DEMO.ctaLabel,
    ctaHref: NAVBAR_DEMO.ctaHref,
    ...TIMING_DEFAULTS,
  },
  fields: [
    { key: 'brand', label: 'Brand', type: 'text' },
    { key: 'active', label: 'Active link', type: 'text' },
    { key: 'links', label: 'Links (comma separated)', type: 'text', wide: true, fromProp: linksToText },
    { key: 'ctaLabel', label: 'CTA label', type: 'text', placeholder: 'Leave empty to hide' },
    { key: 'ctaHref', label: 'CTA href', type: 'text' },
    ...timingFields,
  ],
  buildSnippet: (state) => {
    const links = linksFromText(state.links)
    return navbarSnippet([
      `motion="${state.motion}"`,
      ...stringAttr('brand', state.brand),
      ...(links.length ? [formatLinks(links)] : []),
      ...stringAttr('active', state.active),
      ...stringAttr('ctaLabel', state.ctaLabel),
      ...stringAttr('ctaHref', state.ctaHref),
      ...timingAttrs(state),
    ])
  },
  propsFromState: (state) => ({
    motion: state.motion,
    ...pickStrings(state, TEXT_KEYS),
    links: linksFromText(state.links),
    ...timingProps(state),
  }),
  renderPreview: ({ Component, props }) => (
    <div className="w-full">
      <Component {...props} onLinkClick={preventNavigation} />
    </div>
  ),
  previewPlacement: 'below',
  previewClassName: 'min-h-[10rem] sm:min-h-[10rem]',
  description:
    'Pick props from the panel or edit the code directly. Duration, easing, and delay override the link and menu motion. An easing the browser rejects is ignored. The preview spans the full width; narrow the window to see the mobile menu.',
}

export function NavbarConfigurator() {
  return <ComponentConfigurator schema={SCHEMA} />
}
