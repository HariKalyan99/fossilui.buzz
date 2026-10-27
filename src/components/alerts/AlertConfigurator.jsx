import { useState } from 'react'
import {
  Alert,
  ALERT_DIRECTIONS,
  ALERT_FILL_MODES,
  ALERT_MOTIONS,
  ALERT_PLAY_STATES,
  ALERT_TONES,
  BlurAlert,
  FadeAlert,
  PopAlert,
  RiseAlert,
  ScaleAlert,
  ShakeAlert,
  SlideAlert,
  SlideRightAlert,
} from '@fossilui/react'
import { ComponentConfigurator } from '../docs/ComponentConfigurator'
import { boolAttr, numberAttr, optionAttr, stringAttr } from '../docs/snippetAttrs'
import { ALERT_DEMO, alertSnippet } from '../../data/alertDocs'
import { cn } from '../../lib/cn'

const COMPONENT_MAP = {
  Alert,
  SlideAlert,
  RiseAlert,
  SlideRightAlert,
  ShakeAlert,
  FadeAlert,
  ScaleAlert,
  PopAlert,
  BlurAlert,
}

const NAMED_MOTIONS = {
  SlideAlert: 'slide',
  RiseAlert: 'rise',
  SlideRightAlert: 'slideRight',
  ShakeAlert: 'shake',
  FadeAlert: 'fade',
  ScaleAlert: 'scale',
  PopAlert: 'pop',
  BlurAlert: 'blur',
}

const asText = (fallback) => (value) => (value == null || value === '' ? fallback : String(value))

function iterationAttr(value) {
  const text = String(value ?? '').trim()
  if (!text || text === '1') return []
  if (text === 'infinite') return ['iterationCount="infinite"']
  const n = Number(text)
  if (!Number.isFinite(n) || n === 1) return []
  return [`iterationCount={${n}}`]
}

function ReplayableAlert({ Component, props }) {
  const [replay, setReplay] = useState(0)
  const { className, ...rest } = props

  return (
    <div className="flex w-full max-w-md flex-col items-stretch gap-3">
      <Component key={replay} {...rest} className={cn('w-full', className)} />
      <button
        type="button"
        onClick={() => setReplay((value) => value + 1)}
        className="self-center text-[12px] font-medium text-neutral-500 transition-colors hover:text-neutral-900"
      >
        Replay
      </button>
    </div>
  )
}

/** @type {import('../docs/ComponentConfigurator').ConfiguratorSchema} */
const SCHEMA = {
  wrapperName: 'Alert',
  componentMap: COMPONENT_MAP,
  namedMotions: NAMED_MOTIONS,
  motions: ALERT_MOTIONS,
  defaults: {
    motion: 'slide',
    tone: 'info',
    title: ALERT_DEMO.title,
    description: ALERT_DEMO.description,
    duration: '300',
    easing: '',
    delay: '0',
    direction: 'normal',
    iterationCount: '1',
    fillMode: 'both',
    playState: 'running',
    dismissible: false,
  },
  fields: [
    { key: 'tone', label: 'Tone', type: 'select', options: [...ALERT_TONES] },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'description', label: 'Description', type: 'text', wide: true },
    { key: 'duration', label: 'Duration (ms)', type: 'text', fromProp: asText('300') },
    { key: 'easing', label: 'Easing', type: 'text', wide: true, placeholder: 'ease-out or cubic-bezier(...)', fromProp: asText('') },
    { key: 'delay', label: 'Delay (ms)', type: 'text', fromProp: asText('0') },
    { key: 'direction', label: 'Direction', type: 'select', options: [...ALERT_DIRECTIONS] },
    { key: 'iterationCount', label: 'Iterations', type: 'text', placeholder: '1 or infinite', fromProp: asText('1') },
    { key: 'fillMode', label: 'Fill', type: 'select', options: [...ALERT_FILL_MODES] },
    { key: 'playState', label: 'Play state', type: 'select', options: [...ALERT_PLAY_STATES] },
    { key: 'dismissible', label: 'Dismissible', type: 'checkbox' },
  ],
  buildSnippet: (state) =>
    alertSnippet([
      `motion="${state.motion}"`,
      ...optionAttr('tone', state.tone, 'info'),
      ...stringAttr('title', state.title),
      ...stringAttr('description', state.description),
      ...numberAttr('duration', state.duration, 300),
      ...stringAttr('easing', state.easing),
      ...numberAttr('delay', state.delay, 0),
      ...optionAttr('direction', state.direction, 'normal'),
      ...iterationAttr(state.iterationCount),
      ...optionAttr('fillMode', state.fillMode, 'both'),
      ...optionAttr('playState', state.playState, 'running'),
      ...boolAttr('dismissible', state.dismissible, false),
    ]),
  propsFromState: (state) => ({
    motion: state.motion,
    tone: state.tone,
    title: state.title,
    description: state.description,
    duration: state.duration === '' ? undefined : Number(state.duration),
    easing: state.easing,
    delay: state.delay === '' ? undefined : Number(state.delay),
    direction: state.direction,
    iterationCount: state.iterationCount === 'infinite' ? 'infinite' : Number(state.iterationCount),
    fillMode: state.fillMode,
    playState: state.playState,
    dismissible: state.dismissible,
  }),
  renderPreview: ({ Component, props }) => <ReplayableAlert key={props.motion} Component={Component} props={props} />,
  description:
    'Motion is the animation name. Duration, easing, delay, direction, iterations, fill, and play state are the CSS animation properties. An easing the browser rejects falls back to the motion default instead of breaking the alert. Replay runs the entrance again.',
}

export function AlertConfigurator() {
  return <ComponentConfigurator schema={SCHEMA} />
}
