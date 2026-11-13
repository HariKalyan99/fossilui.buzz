import {
  BlurSelect,
  FadeSelect,
  PopSelect,
  RiseSelect,
  ScaleSelect,
  SlideDownSelect,
  SlideUpSelect,
  WipeSelect,
} from '@fossilui/react'
import { ComponentDocPage } from '../components/docs/ComponentDocPage'
import { SelectConfigurator } from '../components/select/SelectConfigurator'
import {
  SELECT_FAQS,
  SELECT_IMPORT_SNIPPET,
  SELECT_IMPORT_SNIPPETS,
  SELECT_ITEMS,
  SELECT_MOTION_COMPATIBILITY,
  SELECT_PROPS,
  SELECT_VARIANTS,
  SELECT_WHEN_TO_USE,
} from '../data/selectDocs'

const SELECT_COMPONENTS = {
  FadeSelect,
  ScaleSelect,
  SlideDownSelect,
  SlideUpSelect,
  BlurSelect,
  PopSelect,
  RiseSelect,
  WipeSelect,
}

export default function SelectPage() {
  return (
    <ComponentDocPage
      slug="select"
      eyebrow="Select"
      title="Animated select variants"
      description="Eight ways a listbox can appear: fade, scale, slide down, slide up, blur, pop, rise, or wipe. Install from @fossilui/react or @fossilui/select. The trigger shows the current value; arrow keys move the highlight."
      variants={{
        description: 'Each card uses the same framework options. Open the list to preview the motion.',
        tag: 'Live from @fossilui/react and @fossilui/select',
        items: SELECT_VARIANTS,
        layout: 'compact',
        tileClassName: 'gap-3! p-3! sm:min-h-0 sm:gap-4! sm:p-4! md:p-4!',
        stageClassName: 'min-h-[4.5rem] items-center justify-center px-3 py-3.5 sm:min-h-[4.75rem] sm:px-4 sm:py-4',
        renderPreview: (item) => {
          const Menu = SELECT_COMPONENTS[item.component]
          return (
            <Menu
              placeholder="Pick a framework"
              defaultValue="react"
              items={SELECT_ITEMS}
              className="max-w-full"
            />
          )
        },
      }}
      importGuide={{
        description: 'Install the package you need, add the Tailwind @source snippet, then import Select or a named variant.',
        snippets: SELECT_IMPORT_SNIPPETS,
        importCode: SELECT_IMPORT_SNIPPET,
      }}
      whenToUse={{
        description: 'Select picks one value from a list. The motion should confirm the panel opened, not compete with the form.',
        items: SELECT_WHEN_TO_USE,
      }}
      configurator={<SelectConfigurator />}
      api={{
        description: 'motion picks the entrance. value / onValueChange own the selection. duration, easing, and delay time the panel.',
        props: SELECT_PROPS,
        compatibility: SELECT_MOTION_COMPATIBILITY,
        compatibilityDescription: 'Pick a motion that matches how heavy the choice feels. Keyboard behavior is the same for all.',
      }}
      faq={{
        description: 'Selection, open state, and how Select differs from Dropdown.',
        items: SELECT_FAQS,
      }}
    />
  )
}
