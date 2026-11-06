import {
  BlurDropdown,
  Dropdown,
  FadeDropdown,
  PopDropdown,
  RiseDropdown,
  ScaleDropdown,
  SlideDownDropdown,
  SlideUpDropdown,
  WipeDropdown,
} from '@fossilui/react'
import { ComponentConfigurator } from '../docs/ComponentConfigurator'
import { numberAttr, optionAttr, stringAttr } from '../docs/snippetAttrs'
import { DROPDOWN_ITEMS, dropdownSnippet } from '../../data/dropdownDocs'

const asText = (fallback) => (value) => (value == null || value === '' ? fallback : String(value))

/** @type {import('../docs/ComponentConfigurator').ConfiguratorSchema} */
const SCHEMA = {
  wrapperName: 'Dropdown',
  componentMap: {
    Dropdown,
    FadeDropdown,
    ScaleDropdown,
    SlideDownDropdown,
    SlideUpDropdown,
    BlurDropdown,
    PopDropdown,
    RiseDropdown,
    WipeDropdown,
  },
  namedMotions: {
    FadeDropdown: 'fade',
    ScaleDropdown: 'scale',
    SlideDownDropdown: 'slideDown',
    SlideUpDropdown: 'slideUp',
    BlurDropdown: 'blur',
    PopDropdown: 'pop',
    RiseDropdown: 'rise',
    WipeDropdown: 'wipe',
  },
  motions: ['fade', 'scale', 'slideDown', 'slideUp', 'blur', 'pop', 'rise', 'wipe'],
  defaults: {
    motion: 'fade',
    label: 'Actions',
    align: 'start',
    side: 'bottom',
    duration: '',
    easing: '',
    delay: '',
  },
  fields: [
    { key: 'label', label: 'Label', type: 'text', wide: true, fromProp: asText('Actions') },
    { key: 'align', label: 'Align', type: 'select', options: ['start', 'center', 'end'] },
    { key: 'side', label: 'Side', type: 'select', options: ['bottom', 'top'] },
    { key: 'duration', label: 'Duration (ms)', type: 'text', placeholder: '240', fromProp: asText('') },
    { key: 'delay', label: 'Delay (ms)', type: 'text', fromProp: asText('') },
    { key: 'easing', label: 'Easing', type: 'text', wide: true, placeholder: 'ease-out or cubic-bezier(...)', fromProp: asText('') },
  ],
  buildSnippet: (state) =>
    dropdownSnippet([
      `motion="${state.motion}"`,
      `label="${state.label}"`,
      ...optionAttr('align', state.align, 'start'),
      ...optionAttr('side', state.side, 'bottom'),
      ...numberAttr('duration', state.duration, null),
      ...stringAttr('easing', state.easing),
      ...numberAttr('delay', state.delay, null),
    ]),
  propsFromState: (state) => ({
    motion: state.motion,
    label: state.label,
    align: state.align,
    side: state.side,
    items: DROPDOWN_ITEMS,
    duration: state.duration === '' ? undefined : Number(state.duration),
    easing: state.easing,
    delay: state.delay === '' ? undefined : Number(state.delay),
  }),
  renderPreview: ({ Component, props, previewKey }) => (
    <Component
      key={previewKey}
      {...props}
      items={props.items ?? DROPDOWN_ITEMS}
      className="max-w-full"
    />
  ),
  previewPlacement: 'below',
  previewClassName: 'min-h-[5rem]! overflow-visible! items-center! justify-center! p-3 sm:min-h-[5.5rem]! sm:p-4',
  description:
    'Motion picks how the menu appears. Align and side position it against the trigger. Duration, easing, and delay time the entrance. Arrow keys move the highlight while open.',
}

export function DropdownConfigurator() {
  return <ComponentConfigurator schema={SCHEMA} />
}
