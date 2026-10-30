import {
  Accordion,
  BlurAccordion,
  FadeAccordion,
  HeightAccordion,
  PopAccordion,
  RiseAccordion,
  ScaleAccordion,
  SlideAccordion,
  WipeAccordion,
} from '@fossilui/react'
import { ComponentConfigurator } from '../docs/ComponentConfigurator'
import { boolAttr, numberAttr, optionAttr, stringAttr } from '../docs/snippetAttrs'
import { ACCORDION_ITEMS, accordionSnippet } from '../../data/accordionDocs'

const asText = (fallback) => (value) => (value == null || value === '' ? fallback : String(value))

/** @type {import('../docs/ComponentConfigurator').ConfiguratorSchema} */
const SCHEMA = {
  wrapperName: 'Accordion',
  componentMap: {
    Accordion,
    HeightAccordion,
    FadeAccordion,
    SlideAccordion,
    RiseAccordion,
    ScaleAccordion,
    BlurAccordion,
    PopAccordion,
    WipeAccordion,
  },
  namedMotions: {
    HeightAccordion: 'height',
    FadeAccordion: 'fade',
    SlideAccordion: 'slide',
    RiseAccordion: 'rise',
    ScaleAccordion: 'scale',
    BlurAccordion: 'blur',
    PopAccordion: 'pop',
    WipeAccordion: 'wipe',
  },
  motions: ['height', 'fade', 'slide', 'rise', 'scale', 'blur', 'pop', 'wipe'],
  defaults: {
    motion: 'height',
    type: 'single',
    collapsible: true,
    duration: '',
    easing: '',
    delay: '',
  },
  fields: [
    { key: 'type', label: 'Type', type: 'select', options: ['single', 'multiple'] },
    { key: 'duration', label: 'Duration (ms)', type: 'text', placeholder: '280', fromProp: asText('') },
    { key: 'easing', label: 'Easing', type: 'text', wide: true, placeholder: 'ease-out or cubic-bezier(...)', fromProp: asText('') },
    { key: 'delay', label: 'Delay (ms)', type: 'text', fromProp: asText('') },
    { key: 'collapsible', label: 'Collapsible', type: 'checkbox', disabledWhen: (state) => state.type === 'multiple' },
  ],
  buildSnippet: (state) =>
    accordionSnippet([
      `motion="${state.motion}"`,
      ...optionAttr('type', state.type, 'single'),
      ...(state.type === 'single' ? boolAttr('collapsible', state.collapsible, true) : []),
      ...numberAttr('duration', state.duration, null),
      ...stringAttr('easing', state.easing),
      ...numberAttr('delay', state.delay, null),
      state.type === 'multiple' ? 'defaultValue={["shipping"]}' : 'defaultValue="shipping"',
    ]),
  propsFromState: (state) => ({
    motion: state.motion,
    type: state.type,
    collapsible: state.collapsible,
    items: ACCORDION_ITEMS,
    defaultValue: state.type === 'multiple' ? ['shipping'] : 'shipping',
    duration: state.duration === '' ? undefined : Number(state.duration),
    easing: state.easing,
    delay: state.delay === '' ? undefined : Number(state.delay),
  }),
  renderPreview: ({ Component, props, previewKey }) => (
    <Component
      key={`${previewKey}-${props.type}-${props.collapsible}-${String(props.defaultValue)}`}
      {...props}
      items={props.items ?? ACCORDION_ITEMS}
      className="w-full max-w-xl"
    />
  ),
  previewPlacement: 'below',
  previewClassName: 'min-h-[16rem] items-stretch justify-start',
  description:
    'Motion changes the shape of each row. Type chooses one open panel or several. Duration, easing, and delay time the open and the marker. Collapsible only applies in single mode.',
}

export function AccordionConfigurator() {
  return <ComponentConfigurator schema={SCHEMA} />
}
