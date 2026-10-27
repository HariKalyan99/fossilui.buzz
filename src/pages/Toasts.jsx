import { ToastProvider, useToast } from '@fossilui/react'
import { ComponentDocPage } from '../components/docs/ComponentDocPage'
import { DemoTrigger } from '../components/modals/DemoTrigger'
import { ToastConfigurator } from '../components/toasts/ToastConfigurator'
import {
  TOAST_DEMO,
  TOAST_FAQS,
  TOAST_IMPORT_SNIPPET,
  TOAST_IMPORT_SNIPPETS,
  TOAST_MOTION_COMPATIBILITY,
  TOAST_PROPS,
  TOAST_VARIANTS,
  TOAST_WHEN_TO_USE,
} from '../data/toastDocs'

function ShowToastButton({ label, payload }) {
  const { toast } = useToast()
  return <DemoTrigger onClick={() => toast(payload)}>{label}</DemoTrigger>
}

function ToastTile({ item }) {
  const payload = {
    title: item.title,
    description: item.motion === 'stack' ? 'Alex can join the workspace.' : TOAST_DEMO.description,
    tone: item.tone,
    duration: TOAST_DEMO.duration,
  }

  return (
    <ToastProvider motion={item.motion} contained>
      <ShowToastButton label={item.motion === 'stack' ? 'Add to stack' : 'Show toast'} payload={payload} />
    </ToastProvider>
  )
}

export default function Toasts() {
  return (
    <ComponentDocPage
      slug="toasts"
      eyebrow="Toasts"
      title="Animated toast variants"
      description="Eight ways a toast can arrive: slide, rise, drop, fade, scale, pop, blur, or a stack. Install from @fossilui/react or @fossilui/toasts, then call toast() from anywhere under the provider."
      variants={{
        description: 'The preview stays inside the card. Click again to add another, and hover a toast to pause its timer.',
        tag: 'Live from @fossilui/react and @fossilui/toasts',
        items: TOAST_VARIANTS,
        layout: 'wide',
        tileClassName: 'sm:min-h-0',
        stageClassName: 'min-h-[12.5rem] flex-col! items-center! justify-end! px-4 py-4 sm:min-h-[13rem]',
        renderPreview: (item) => <ToastTile item={item} />,
      }}
      importGuide={{
        description:
          'Install the package you need, add the matching Tailwind @source snippet, then wrap the app in ToastProvider and call toast().',
        snippets: TOAST_IMPORT_SNIPPETS,
        importCode: TOAST_IMPORT_SNIPPET,
      }}
      whenToUse={{
        description: 'A toast confirms something that already happened. It should never ask the user to make a decision.',
        items: TOAST_WHEN_TO_USE,
      }}
      configurator={<ToastConfigurator />}
      api={{
        description:
          'Motion and contained belong to ToastProvider. title, description, tone, and duration belong to the toast() argument.',
        props: TOAST_PROPS,
        compatibility: TOAST_MOTION_COMPATIBILITY,
        compatibilityDescription: 'Use one motion per provider. Mixing slide and stack in the same viewport is not supported.',
      }}
      faq={{
        description: 'Where the provider goes, calling toast() outside React, and dismissing from code.',
        items: TOAST_FAQS,
      }}
    />
  )
}
