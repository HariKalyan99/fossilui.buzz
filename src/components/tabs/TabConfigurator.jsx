import {
  DotTabs,
  FadeTabs,
  GlowTabs,
  GrowTabs,
  LiftTabs,
  OutlineTabs,
  PillTabs,
  Tabs,
  UnderlineTabs,
} from '@fossilui/react'
import { ComponentConfigurator } from '../docs/ComponentConfigurator'
import { numberAttr, stringAttr } from '../docs/snippetAttrs'
import { TAB_ITEMS, tabSnippet } from '../../data/tabDocs'

const asText = (fallback) => (value) => (value == null || value === '' ? fallback : String(value))

/** @type {import('../docs/ComponentConfigurator').ConfiguratorSchema} */
const SCHEMA = {
  wrapperName: 'Tabs',
  componentMap: {
    Tabs,
    PillTabs,
    UnderlineTabs,
    DotTabs,
    GrowTabs,
    OutlineTabs,
    GlowTabs,
    LiftTabs,
    FadeTabs,
  },
  namedMotions: {
    PillTabs: 'pill',
    UnderlineTabs: 'underline',
    DotTabs: 'dot',
    GrowTabs: 'grow',
    OutlineTabs: 'outline',
    GlowTabs: 'glow',
    LiftTabs: 'lift',
    FadeTabs: 'fade',
  },
  motions: ['pill', 'underline', 'dot', 'grow', 'outline', 'glow', 'lift', 'fade'],
  defaults: {
    motion: 'pill',
    duration: '',
    easing: '',
    delay: '',
  },
  fields: [
    { key: 'duration', label: 'Duration (ms)', type: 'text', placeholder: '320', fromProp: asText('') },
    { key: 'easing', label: 'Easing', type: 'text', wide: true, placeholder: 'ease-out or cubic-bezier(...)', fromProp: asText('') },
    { key: 'delay', label: 'Delay (ms)', type: 'text', fromProp: asText('') },
  ],
  buildSnippet: (state) =>
    tabSnippet([
      `motion="${state.motion}"`,
      ...numberAttr('duration', state.duration, null),
      ...stringAttr('easing', state.easing),
      ...numberAttr('delay', state.delay, null),
    ]),
  propsFromState: (state) => ({
    motion: state.motion,
    items: TAB_ITEMS,
    duration: state.duration === '' ? undefined : Number(state.duration),
    easing: state.easing,
    delay: state.delay === '' ? undefined : Number(state.delay),
  }),
  renderPreview: ({ Component, props, previewKey }) => (
    <Component key={previewKey} {...props} items={props.items ?? TAB_ITEMS} className="w-full max-w-xl" />
  ),
  previewPlacement: 'below',
  previewClassName: 'min-h-[12rem] items-stretch justify-start',
  description:
    'Motion chooses the indicator. Duration, easing, and delay time the glide. Arrow keys move the selection. An easing the browser rejects is ignored.',
}

export function TabConfigurator() {
  return <ComponentConfigurator schema={SCHEMA} />
}
