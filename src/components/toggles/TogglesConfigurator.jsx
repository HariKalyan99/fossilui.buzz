import {
  BounceSwitch,
  CheckCheckbox,
  Checkbox,
  GlowRadio,
  GlowSwitch,
  PopCheckbox,
  PulseRadio,
  Radio,
  ScaleRadio,
  SlideSwitch,
  Switch,
} from '@fossilui/react'
import { ComponentConfigurator } from '../docs/ComponentConfigurator'
import { boolAttr, numberAttr, optionAttr, stringAttr } from '../docs/snippetAttrs'
import {
  RADIO_ITEMS,
  checkboxSnippet,
  radioSnippet,
  switchSnippet,
} from '../../data/togglesDocs'

const asText = (fallback) => (value) => (value == null || value === '' ? fallback : String(value))

const VARIANT_META = {
  'Slide switch': { kind: 'switch', motion: 'slide', Component: SlideSwitch, name: 'SlideSwitch' },
  'Bounce switch': { kind: 'switch', motion: 'bounce', Component: BounceSwitch, name: 'BounceSwitch' },
  'Glow switch': { kind: 'switch', motion: 'glow', Component: GlowSwitch, name: 'GlowSwitch' },
  Check: { kind: 'checkbox', motion: 'check', Component: CheckCheckbox, name: 'CheckCheckbox' },
  'Pop checkbox': { kind: 'checkbox', motion: 'pop', Component: PopCheckbox, name: 'PopCheckbox' },
  'Scale radio': { kind: 'radio', motion: 'scale', Component: ScaleRadio, name: 'ScaleRadio' },
  'Pulse radio': { kind: 'radio', motion: 'pulse', Component: PulseRadio, name: 'PulseRadio' },
  'Glow radio': { kind: 'radio', motion: 'glow', Component: GlowRadio, name: 'GlowRadio' },
}

const DEFAULT_VARIANT = 'Slide switch'
const MOTIONS = Object.keys(VARIANT_META)

function metaOf(motionKey) {
  return VARIANT_META[motionKey] ?? VARIANT_META[DEFAULT_VARIANT]
}

function metaFromComponent(Component, motionProp) {
  const byComponent = Object.values(VARIANT_META).find((entry) => entry.Component === Component)
  if (byComponent) return byComponent
  if (Component === Switch || Component === Checkbox || Component === Radio) {
    const kind = Component === Radio ? 'radio' : Component === Checkbox ? 'checkbox' : 'switch'
    return (
      Object.values(VARIANT_META).find((entry) => entry.kind === kind && entry.motion === motionProp) ??
      Object.values(VARIANT_META).find((entry) => entry.kind === kind) ??
      VARIANT_META[DEFAULT_VARIANT]
    )
  }
  return VARIANT_META[DEFAULT_VARIANT]
}

function namedSnippet(componentName, kind, attrs) {
  const body =
    kind === 'radio'
      ? radioSnippet(attrs).replace('import { Radio }', `import { ${componentName} }`).replace('<Radio', `<${componentName}`)
      : kind === 'checkbox'
        ? checkboxSnippet(attrs)
            .replace('import { Checkbox }', `import { ${componentName} }`)
            .replace('<Checkbox', `<${componentName}`)
        : switchSnippet(attrs)
            .replace('import { Switch }', `import { ${componentName} }`)
            .replace('<Switch', `<${componentName}`)
  return body
}

/** @type {import('../docs/ComponentConfigurator').ConfiguratorSchema} */
const SCHEMA = {
  wrapperName: 'Switch',
  componentMap: {
    Switch,
    Checkbox,
    Radio,
    SlideSwitch,
    BounceSwitch,
    GlowSwitch,
    CheckCheckbox,
    PopCheckbox,
    ScaleRadio,
    PulseRadio,
    GlowRadio,
  },
  namedMotions: {
    SlideSwitch: 'Slide switch',
    BounceSwitch: 'Bounce switch',
    GlowSwitch: 'Glow switch',
    CheckCheckbox: 'Check',
    PopCheckbox: 'Pop checkbox',
    ScaleRadio: 'Scale radio',
    PulseRadio: 'Pulse radio',
    GlowRadio: 'Glow radio',
  },
  motions: MOTIONS,
  defaults: {
    motion: DEFAULT_VARIANT,
    label: 'Airplane mode',
    defaultChecked: true,
    defaultValue: 'pro',
    orientation: 'vertical',
    disabled: false,
    duration: '',
    easing: '',
    delay: '',
  },
  fields: [
    {
      key: 'label',
      label: 'Label',
      type: 'text',
      wide: true,
      fromProp: asText('Airplane mode'),
      disabledWhen: (state) => metaOf(state.motion).kind === 'radio',
    },
    {
      key: 'defaultValue',
      label: 'Default value',
      type: 'select',
      options: RADIO_ITEMS.map((item) => item.value),
      disabledWhen: (state) => metaOf(state.motion).kind !== 'radio',
    },
    {
      key: 'orientation',
      label: 'Orientation',
      type: 'select',
      options: ['vertical', 'horizontal'],
      disabledWhen: (state) => metaOf(state.motion).kind !== 'radio',
    },
    {
      key: 'defaultChecked',
      label: 'Default checked',
      type: 'checkbox',
      disabledWhen: (state) => metaOf(state.motion).kind === 'radio',
    },
    { key: 'disabled', label: 'Disabled', type: 'checkbox' },
    { key: 'duration', label: 'Duration (ms)', type: 'text', placeholder: '280', fromProp: asText('') },
    { key: 'delay', label: 'Delay (ms)', type: 'text', fromProp: asText('') },
    {
      key: 'easing',
      label: 'Easing',
      type: 'text',
      wide: true,
      placeholder: 'ease-out or cubic-bezier(...)',
      fromProp: asText(''),
    },
  ],
  buildSnippet: (state) => {
    const meta = metaOf(state.motion)
    const timing = [
      ...numberAttr('duration', state.duration, null),
      ...stringAttr('easing', state.easing),
      ...numberAttr('delay', state.delay, null),
    ]
    if (meta.kind === 'checkbox') {
      return namedSnippet(meta.name, 'checkbox', [
        ...stringAttr('label', state.label || 'Send me product updates'),
        ...boolAttr('defaultChecked', state.defaultChecked, false),
        ...boolAttr('disabled', state.disabled, false),
        ...timing,
      ])
    }
    if (meta.kind === 'radio') {
      return namedSnippet(meta.name, 'radio', [
        ...optionAttr('defaultValue', state.defaultValue, 'pro'),
        ...optionAttr('orientation', state.orientation, 'vertical'),
        ...boolAttr('disabled', state.disabled, false),
        ...timing,
      ])
    }
    return namedSnippet(meta.name, 'switch', [
      ...stringAttr('label', state.label || 'Airplane mode'),
      ...boolAttr('defaultChecked', state.defaultChecked, false),
      ...boolAttr('disabled', state.disabled, false),
      ...timing,
    ])
  },
  propsFromState: (state) => {
    const meta = metaOf(state.motion)
    const timing = {
      duration: state.duration === '' ? undefined : Number(state.duration),
      easing: state.easing,
      delay: state.delay === '' ? undefined : Number(state.delay),
    }
    if (meta.kind === 'checkbox') {
      return {
        motion: meta.motion,
        label: state.label || 'Send me product updates',
        defaultChecked: state.defaultChecked,
        disabled: state.disabled,
        ...timing,
      }
    }
    if (meta.kind === 'radio') {
      return {
        motion: meta.motion,
        defaultValue: state.defaultValue,
        orientation: state.orientation,
        disabled: state.disabled,
        items: RADIO_ITEMS,
        ...timing,
      }
    }
    return {
      motion: meta.motion,
      label: state.label || 'Airplane mode',
      defaultChecked: state.defaultChecked,
      disabled: state.disabled,
      ...timing,
    }
  },
  renderPreview: ({ Component, props, previewKey }) => {
    const meta = metaFromComponent(Component, props.motion)
    const Preview = meta.Component
    if (meta.kind === 'radio') {
      return (
        <Preview
          key={previewKey}
          defaultValue={props.defaultValue ?? 'pro'}
          orientation={props.orientation ?? 'vertical'}
          disabled={props.disabled}
          duration={props.duration}
          easing={props.easing}
          delay={props.delay}
          items={props.items ?? RADIO_ITEMS}
          className="w-full max-w-xs"
        />
      )
    }
    return (
      <Preview
        key={previewKey}
        label={props.label ?? (meta.kind === 'checkbox' ? 'Send me product updates' : 'Airplane mode')}
        defaultChecked={props.defaultChecked ?? true}
        disabled={props.disabled}
        duration={props.duration}
        easing={props.easing}
        delay={props.delay}
      />
    )
  },
  previewPlacement: 'below',
  previewClassName:
    'min-h-[6.5rem]! items-center! justify-center! overflow-visible! p-3 sm:min-h-[7.5rem]! sm:p-4',
  description:
    'Pick a curated toggle variant. Label and checked apply to switch/checkbox; default value and orientation apply to radio. Switch orientation to horizontal to preview a compact radio row.',
}

export function TogglesConfigurator() {
  return <ComponentConfigurator schema={SCHEMA} />
}
