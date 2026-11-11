import {
  BlurTooltip,
  FadeTooltip,
  GrowTooltip,
  LiftTooltip,
  PopTooltip,
  RiseTooltip,
  ScaleTooltip,
  SlideTooltip,
  Tooltip,
} from '@fossilui/react'
import { ComponentConfigurator } from '../docs/ComponentConfigurator'
import { numberAttr, optionAttr, stringAttr } from '../docs/snippetAttrs'
import { TOOLTIP_DEMO_LABEL, tooltipSnippet } from '../../data/tooltipDocs'

const asText = (fallback) => (value) => (value == null || value === '' ? fallback : String(value))

const TRIGGER_CLASS =
  'inline-flex h-9 max-w-full items-center rounded-lg border border-neutral-200 bg-white px-3 text-[13px] font-medium text-neutral-800 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/45'

/** @type {import('../docs/ComponentConfigurator').ConfiguratorSchema} */
const SCHEMA = {
  wrapperName: 'Tooltip',
  componentMap: {
    Tooltip,
    FadeTooltip,
    ScaleTooltip,
    SlideTooltip,
    RiseTooltip,
    BlurTooltip,
    PopTooltip,
    GrowTooltip,
    LiftTooltip,
  },
  namedMotions: {
    FadeTooltip: 'fade',
    ScaleTooltip: 'scale',
    SlideTooltip: 'slide',
    RiseTooltip: 'rise',
    BlurTooltip: 'blur',
    PopTooltip: 'pop',
    GrowTooltip: 'grow',
    LiftTooltip: 'lift',
  },
  motions: ['fade', 'scale', 'slide', 'rise', 'blur', 'pop', 'grow', 'lift'],
  defaults: {
    motion: 'fade',
    content: 'Copy link to clipboard',
    side: 'top',
    delayDuration: '400',
    duration: '',
    easing: '',
    delay: '',
  },
  fields: [
    { key: 'content', label: 'Content', type: 'text', wide: true, fromProp: asText('Copy link to clipboard') },
    { key: 'side', label: 'Side', type: 'select', options: ['top', 'bottom', 'left', 'right'] },
    { key: 'delayDuration', label: 'Show delay (ms)', type: 'text', placeholder: '400', fromProp: asText('400') },
    { key: 'duration', label: 'Duration (ms)', type: 'text', placeholder: '240', fromProp: asText('') },
    { key: 'delay', label: 'Delay (ms)', type: 'text', fromProp: asText('') },
    { key: 'easing', label: 'Easing', type: 'text', wide: true, placeholder: 'ease-out or cubic-bezier(...)', fromProp: asText('') },
  ],
  buildSnippet: (state) =>
    tooltipSnippet([
      `motion="${state.motion}"`,
      `content="${state.content.replace(/"/g, '\\"')}"`,
      ...optionAttr('side', state.side, 'top'),
      ...numberAttr('delayDuration', state.delayDuration, 400),
      ...numberAttr('duration', state.duration, null),
      ...stringAttr('easing', state.easing),
      ...numberAttr('delay', state.delay, null),
    ]),
  propsFromState: (state) => ({
    motion: state.motion,
    content: state.content,
    side: state.side,
    delayDuration: state.delayDuration === '' ? 400 : Number(state.delayDuration),
    duration: state.duration === '' ? undefined : Number(state.duration),
    easing: state.easing,
    delay: state.delay === '' ? undefined : Number(state.delay),
  }),
  renderPreview: ({ Component, props, previewKey }) => (
    <Component
      key={previewKey}
      {...props}
      contained
      className="relative flex min-h-[7.5rem] w-full max-w-sm flex-col items-center justify-center"
    >
      <button type="button" className={TRIGGER_CLASS}>
        {TOOLTIP_DEMO_LABEL}
      </button>
    </Component>
  ),
  previewPlacement: 'below',
  previewClassName: 'min-h-[9rem]! overflow-visible! items-center! justify-center! p-3 sm:min-h-[10rem]! sm:p-4',
  description:
    'Motion shapes the bubble entrance. Side picks placement. Show delay waits before hover or focus reveals the tip. On touch, tap the trigger to toggle.',
}

export function TooltipConfigurator() {
  return <ComponentConfigurator schema={SCHEMA} />
}
