import {
  BlurTooltip,
  FadeTooltip,
  GrowTooltip,
  LiftTooltip,
  PopTooltip,
  RiseTooltip,
  ScaleTooltip,
  SlideTooltip,
} from '@fossilui/react'
import { ComponentDocPage } from '../components/docs/ComponentDocPage'
import { TooltipConfigurator } from '../components/tooltip/TooltipConfigurator'
import {
  TOOLTIP_DEMO_LABEL,
  TOOLTIP_FAQS,
  TOOLTIP_IMPORT_SNIPPET,
  TOOLTIP_IMPORT_SNIPPETS,
  TOOLTIP_MOTION_COMPATIBILITY,
  TOOLTIP_PROPS,
  TOOLTIP_VARIANTS,
  TOOLTIP_WHEN_TO_USE,
} from '../data/tooltipDocs'

const TOOLTIP_COMPONENTS = {
  FadeTooltip,
  ScaleTooltip,
  SlideTooltip,
  RiseTooltip,
  BlurTooltip,
  PopTooltip,
  GrowTooltip,
  LiftTooltip,
}

const TRIGGER_CLASS =
  'inline-flex h-9 items-center rounded-lg border border-neutral-200 bg-white px-3 text-[13px] font-medium text-neutral-800 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/45'

export default function TooltipPage() {
  return (
    <ComponentDocPage
      slug="tooltip"
      eyebrow="Tooltip"
      title="Animated tooltip variants"
      description="Eight ways a hint can appear: fade, scale, slide, rise, blur, pop, grow, or lift. Install from @fossilui/react or @fossilui/tooltip. Hover, focus, or tap the trigger on touch."
      variants={{
        description: 'Each card wraps the same share button. Hover or focus to preview on desktop; tap on touch.',
        tag: 'Live from @fossilui/react and @fossilui/tooltip',
        items: TOOLTIP_VARIANTS,
        layout: 'compact',
        tileClassName: 'gap-3! p-3! sm:min-h-0 sm:gap-4! sm:p-4! md:p-4!',
        stageClassName: 'min-h-[4.5rem] items-center justify-center px-3 py-3.5 sm:min-h-[4.75rem] sm:px-4 sm:py-4',
        renderPreview: (item) => {
          const Tip = TOOLTIP_COMPONENTS[item.component]
          // Portal the tip so the stage stays short; matches default Tooltip usage.
          return (
            <Tip content="Copy link to clipboard" side="top" delayDuration={200}>
              <button type="button" className={TRIGGER_CLASS}>
                {TOOLTIP_DEMO_LABEL}
              </button>
            </Tip>
          )
        },
      }}
      importGuide={{
        description: 'Install the package you need, add the Tailwind @source snippet, then wrap your trigger with Tooltip or a named variant.',
        snippets: TOOLTIP_IMPORT_SNIPPETS,
        importCode: TOOLTIP_IMPORT_SNIPPET,
      }}
      whenToUse={{
        description: 'Tooltips add a short hint. Keep copy brief and prefer visible labels when space allows.',
        items: TOOLTIP_WHEN_TO_USE,
      }}
      configurator={<TooltipConfigurator />}
      api={{
        description: 'motion picks the bubble entrance. delayDuration controls hover and focus wait time.',
        props: TOOLTIP_PROPS,
        compatibility: TOOLTIP_MOTION_COMPATIBILITY,
        compatibilityDescription: 'Pick a motion that fits the control density. Placement flips when space is tight.',
      }}
      faq={{
        description: 'Delays, touch behavior, and content length.',
        items: TOOLTIP_FAQS,
      }}
    />
  )
}
