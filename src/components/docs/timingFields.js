import { numberAttr, stringAttr } from './snippetAttrs'

/** Empty means "keep the motion's own default". */
export const TIMING_DEFAULTS = {
  duration: '',
  easing: '',
  delay: '',
}

const asText = (fallback) => (value) => (value == null || value === '' ? fallback : String(value))

/** Configurator fields for transition duration, easing, and delay. */
export const timingFields = [
  { key: 'duration', label: 'Duration (ms)', type: 'text', placeholder: 'Default', fromProp: asText('') },
  {
    key: 'easing',
    label: 'Easing',
    type: 'text',
    wide: true,
    placeholder: 'ease-out or cubic-bezier(...)',
    fromProp: asText(''),
  },
  { key: 'delay', label: 'Delay (ms)', type: 'text', placeholder: '0', fromProp: asText('') },
]

/** Snippet attributes. Omitted when left at the motion default. */
export function timingAttrs(state) {
  return [...numberAttr('duration', state.duration), ...stringAttr('easing', state.easing), ...numberAttr('delay', state.delay, 0)]
}

/** Preview props. Invalid numbers are left out so the component keeps its default. */
export function timingProps(state) {
  const props = {}
  if (state.duration != null && state.duration !== '' && Number.isFinite(Number(state.duration))) {
    props.duration = Number(state.duration)
  }
  const easing = String(state.easing ?? '').trim()
  if (easing) props.easing = easing
  if (state.delay != null && state.delay !== '' && Number.isFinite(Number(state.delay)) && Number(state.delay) !== 0) {
    props.delay = Number(state.delay)
  }
  return props
}
