import { useState } from 'react'
import {
  BlurAlert,
  FadeAlert,
  PopAlert,
  RiseAlert,
  ScaleAlert,
  ShakeAlert,
  SlideAlert,
  SlideRightAlert,
} from '@fossilui/react'
import { ComponentDocPage } from '../components/docs/ComponentDocPage'
import { AlertConfigurator } from '../components/alerts/AlertConfigurator'
import { cn } from '../lib/cn'
import {
  ALERT_DEMO,
  ALERT_FAQS,
  ALERT_IMPORT_SNIPPET,
  ALERT_IMPORT_SNIPPETS,
  ALERT_MOTION_COMPATIBILITY,
  ALERT_PROPS,
  ALERT_VARIANTS,
  ALERT_WHEN_TO_USE,
} from '../data/alertDocs'

const ALERT_COMPONENTS = {
  SlideAlert,
  RiseAlert,
  SlideRightAlert,
  ShakeAlert,
  FadeAlert,
  ScaleAlert,
  PopAlert,
  BlurAlert,
}

function AlertTile({ item }) {
  const [replay, setReplay] = useState(0)
  const AlertComp = ALERT_COMPONENTS[item.component]

  return (
    <div className="flex w-full max-w-md flex-col items-stretch gap-3">
      <AlertComp
        key={replay}
        tone={item.tone}
        title={ALERT_DEMO.title}
        description={ALERT_DEMO.description}
        className="w-full"
      />
      <button
        type="button"
        onClick={() => setReplay((value) => value + 1)}
        className={cn(
          'self-center text-[12px] font-medium text-neutral-500 transition-colors hover:text-neutral-900',
        )}
      >
        Replay
      </button>
    </div>
  )
}

export default function Alerts() {
  return (
    <ComponentDocPage
      slug="alerts"
      eyebrow="Alerts"
      title="Animated alert variants"
      description="Inline notices that slide, shake, or fade. Install from @fossilui/react or @fossilui/alerts, pick a tone, and copy a ready-to-use example."
      variants={{
        description: 'Replay each entrance. Tone sets the color and icon — switch it in the configurator.',
        tag: 'Live from @fossilui/react and @fossilui/alerts',
        items: ALERT_VARIANTS,
        layout: 'compact',
        tileClassName: 'sm:min-h-[220px]',
        stageClassName: 'min-h-[8.5rem] px-4 py-6 sm:min-h-[9.5rem]',
        renderPreview: (item) => <AlertTile item={item} />,
      }}
      importGuide={{
        description: 'Install the package you need, add the matching Tailwind @source snippet, then import Alert or a named variant.',
        snippets: ALERT_IMPORT_SNIPPETS,
        importCode: ALERT_IMPORT_SNIPPET,
      }}
      whenToUse={{
        description: 'An alert stays in the layout. The motion should confirm the message, not compete with the form around it.',
        items: ALERT_WHEN_TO_USE,
      }}
      configurator={<AlertConfigurator />}
      api={{
        description:
          'motion is the animation name. The timing props map to the CSS animation properties and work on Alert and every named variant. The exit always plays once, using your duration and easing.',
        props: ALERT_PROPS,
        compatibility: ALERT_MOTION_COMPATIBILITY,
        compatibilityDescription: 'Pick the motion from how urgent the message is. Tone is independent and works with all three.',
      }}
      faq={{
        description: 'Dismiss behavior, the one-shot shake, and how alerts relate to toasts.',
        items: ALERT_FAQS,
      }}
    />
  )
}
