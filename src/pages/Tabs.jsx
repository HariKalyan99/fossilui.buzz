import {
  DotTabs,
  FadeTabs,
  GlowTabs,
  GrowTabs,
  LiftTabs,
  OutlineTabs,
  PillTabs,
  UnderlineTabs,
} from '@fossilui/react'
import { ComponentDocPage } from '../components/docs/ComponentDocPage'
import { TabConfigurator } from '../components/tabs/TabConfigurator'
import {
  TAB_FAQS,
  TAB_IMPORT_SNIPPET,
  TAB_IMPORT_SNIPPETS,
  TAB_ITEMS,
  TAB_MOTION_COMPATIBILITY,
  TAB_PROPS,
  TAB_VARIANTS,
  TAB_WHEN_TO_USE,
} from '../data/tabDocs'

const TAB_COMPONENTS = {
  PillTabs,
  UnderlineTabs,
  DotTabs,
  GrowTabs,
  OutlineTabs,
  GlowTabs,
  LiftTabs,
  FadeTabs,
}

export default function TabsPage() {
  return (
    <ComponentDocPage
      slug="tabs"
      eyebrow="Tabs"
      title="Animated tab variants"
      description="Eight ways the selection can move: pill, underline, dot, grow, outline, glow, lift, or fade. Install from @fossilui/react or @fossilui/tabs, then move between panels with a click or the arrow keys."
      variants={{
        description: 'Each card is one motion on the same three tabs.',
        tag: 'Live from @fossilui/react and @fossilui/tabs',
        items: TAB_VARIANTS,
        layout: 'compact',
        tileClassName: 'sm:min-h-0',
        stageClassName: 'items-stretch justify-start px-4 py-5',
        renderPreview: (item) => {
          const Tab = TAB_COMPONENTS[item.component]
          return <Tab items={TAB_ITEMS} className="w-full" />
        },
      }}
      importGuide={{
        description: 'Install the package you need, add the matching Tailwind @source snippet, then import Tabs or a named variant.',
        snippets: TAB_IMPORT_SNIPPETS,
        importCode: TAB_IMPORT_SNIPPET,
      }}
      whenToUse={{
        description: 'Tabs keep peer content in one place. The motion should show where you are, not decorate the panel.',
        items: TAB_WHEN_TO_USE,
      }}
      configurator={<TabConfigurator />}
      api={{
        description: 'motion picks the indicator. duration, easing, and delay time the glide on Tabs and both named variants.',
        props: TAB_PROPS,
        compatibility: TAB_MOTION_COMPATIBILITY,
        compatibilityDescription: 'Pick the indicator from the surface it sits on. Keyboard behavior is the same for both.',
      }}
      faq={{
        description: 'Selection, keyboard behavior, and how tabs relate to the accordion.',
        items: TAB_FAQS,
      }}
    />
  )
}
