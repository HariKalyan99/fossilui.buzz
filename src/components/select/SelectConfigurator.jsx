import {
  BlurSelect,
  FadeSelect,
  PopSelect,
  RiseSelect,
  ScaleSelect,
  Select,
  SlideDownSelect,
  SlideUpSelect,
  WipeSelect,
} from '@fossilui/react'
import { ComponentConfigurator } from '../docs/ComponentConfigurator'
import { numberAttr, optionAttr, stringAttr } from '../docs/snippetAttrs'
import { SELECT_ITEMS, selectSnippet } from '../../data/selectDocs'

const asText = (fallback) => (value) => (value == null || value === '' ? fallback : String(value))

/** @type {import('../docs/ComponentConfigurator').ConfiguratorSchema} */
const SCHEMA = {
  wrapperName: 'Select',
  componentMap: {
    Select,
    FadeSelect,
    ScaleSelect,
    SlideDownSelect,
    SlideUpSelect,
    BlurSelect,
    PopSelect,
    RiseSelect,
    WipeSelect,
  },
  namedMotions: {
    FadeSelect: 'fade',
    ScaleSelect: 'scale',
    SlideDownSelect: 'slideDown',
    SlideUpSelect: 'slideUp',
    BlurSelect: 'blur',
    PopSelect: 'pop',
    RiseSelect: 'rise',
    WipeSelect: 'wipe',
  },
  motions: ['fade', 'scale', 'slideDown', 'slideUp', 'blur', 'pop', 'rise', 'wipe'],
  defaults: {
    motion: 'fade',
    placeholder: 'Pick a framework',
    defaultValue: 'react',
    align: 'start',
    duration: '',
    easing: '',
    delay: '',
  },
  fields: [
    { key: 'placeholder', label: 'Placeholder', type: 'text', wide: true, fromProp: asText('Pick a framework') },
    { key: 'defaultValue', label: 'Default value', type: 'text', fromProp: asText('react') },
    { key: 'align', label: 'Align', type: 'select', options: ['start', 'center', 'end'] },
    { key: 'duration', label: 'Duration (ms)', type: 'text', placeholder: '240', fromProp: asText('') },
    { key: 'delay', label: 'Delay (ms)', type: 'text', placeholder: '0', fromProp: asText('') },
    { key: 'easing', label: 'Easing', type: 'text', wide: true, placeholder: 'ease-out or cubic-bezier(...)', fromProp: asText('') },
  ],
  buildSnippet: (state) =>
    selectSnippet([
      `motion="${state.motion}"`,
      `placeholder="${state.placeholder}"`,
      ...stringAttr('defaultValue', state.defaultValue),
      ...optionAttr('align', state.align, 'start'),
      ...numberAttr('duration', state.duration, null),
      ...stringAttr('easing', state.easing),
      ...numberAttr('delay', state.delay, null),
    ]),
  propsFromState: (state) => ({
    motion: state.motion,
    placeholder: state.placeholder,
    defaultValue: state.defaultValue,
    align: state.align,
    items: SELECT_ITEMS,
    duration: state.duration === '' ? undefined : Number(state.duration),
    easing: state.easing,
    delay: state.delay === '' ? undefined : Number(state.delay),
  }),
  renderPreview: ({ Component, props, previewKey }) => (
    <Component
      key={`${previewKey}-${props.align}-${props.duration ?? ''}`}
      {...props}
      items={props.items ?? SELECT_ITEMS}
      contained
      className="relative flex min-h-[14rem] w-full max-w-sm flex-col items-center justify-start pt-1"
    />
  ),
  previewPlacement: 'below',
  previewClassName:
    'min-h-[16rem]! overflow-visible! items-center! justify-center! p-3 sm:min-h-[17rem]! sm:p-4',
  description:
    'Motion picks how the list appears. Align positions it against the trigger. The list opens below and flips above when space runs out. Duration, easing, and delay time the entrance.',
}

export function SelectConfigurator() {
  return <ComponentConfigurator schema={SCHEMA} />
}
