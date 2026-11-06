import {
  BlurDropdown,
  FadeDropdown,
  PopDropdown,
  RiseDropdown,
  ScaleDropdown,
  SlideDownDropdown,
  SlideUpDropdown,
  WipeDropdown,
} from '@fossilui/react'
import { ComponentDocPage } from '../components/docs/ComponentDocPage'
import { DropdownConfigurator } from '../components/dropdown/DropdownConfigurator'
import {
  DROPDOWN_FAQS,
  DROPDOWN_IMPORT_SNIPPET,
  DROPDOWN_IMPORT_SNIPPETS,
  DROPDOWN_ITEMS,
  DROPDOWN_MOTION_COMPATIBILITY,
  DROPDOWN_PROPS,
  DROPDOWN_VARIANTS,
  DROPDOWN_WHEN_TO_USE,
} from '../data/dropdownDocs'

const DROPDOWN_COMPONENTS = {
  FadeDropdown,
  ScaleDropdown,
  SlideDownDropdown,
  SlideUpDropdown,
  BlurDropdown,
  PopDropdown,
  RiseDropdown,
  WipeDropdown,
}

export default function DropdownPage() {
  return (
    <ComponentDocPage
      slug="dropdown"
      eyebrow="Dropdown"
      title="Animated menu variants"
      description="Eight ways a menu can appear: fade, scale, slide down, slide up, blur, pop, rise, or wipe. Install from @fossilui/react or @fossilui/dropdown. Arrow keys move the highlight while the menu is open."
      variants={{
        description: 'Each card uses the same four actions. Open the menu to preview the motion.',
        tag: 'Live from @fossilui/react and @fossilui/dropdown',
        items: DROPDOWN_VARIANTS,
        layout: 'compact',
        tileClassName: 'gap-3! p-3! sm:min-h-0 sm:gap-4! sm:p-4! md:p-4!',
        stageClassName: 'min-h-[4.5rem] items-center justify-center px-3 py-3.5 sm:min-h-[4.75rem] sm:px-4 sm:py-4',
        renderPreview: (item) => {
          const Menu = DROPDOWN_COMPONENTS[item.component]
          // Portal the menu (not contained) so cards stay compact; real installs do the same.
          return <Menu label="Actions" items={DROPDOWN_ITEMS} className="max-w-full" />
        },
      }}
      importGuide={{
        description: 'Install the package you need, add the Tailwind @source snippet, then import Dropdown or a named variant.',
        snippets: DROPDOWN_IMPORT_SNIPPETS,
        importCode: DROPDOWN_IMPORT_SNIPPET,
      }}
      whenToUse={{
        description: 'Dropdowns group infrequent actions. The motion should confirm the menu opened, not compete with the page.',
        items: DROPDOWN_WHEN_TO_USE,
      }}
      configurator={<DropdownConfigurator />}
      api={{
        description: 'motion picks the entrance. duration, easing, and delay time the panel on Dropdown and named variants.',
        props: DROPDOWN_PROPS,
        compatibility: DROPDOWN_MOTION_COMPATIBILITY,
        compatibilityDescription: 'Pick a motion that matches how heavy the action feels. Keyboard behavior is the same for all.',
      }}
      faq={{
        description: 'Open state, selection, and positioning.',
        items: DROPDOWN_FAQS,
      }}
    />
  )
}
