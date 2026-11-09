import {
  BounceSwitch,
  CheckCheckbox,
  GlowRadio,
  GlowSwitch,
  PopCheckbox,
  PulseRadio,
  ScaleRadio,
  SlideSwitch,
} from '@fossilui/react'
import { ComponentDocPage } from '../components/docs/ComponentDocPage'
import { TogglesConfigurator } from '../components/toggles/TogglesConfigurator'
import {
  RADIO_ITEMS,
  TOGGLES_FAQS,
  TOGGLES_IMPORT_SNIPPET,
  TOGGLES_IMPORT_SNIPPETS,
  TOGGLES_MOTION_COMPATIBILITY,
  TOGGLES_PROPS,
  TOGGLES_VARIANTS,
  TOGGLES_WHEN_TO_USE,
} from '../data/togglesDocs'

const TOGGLE_COMPONENTS = {
  SlideSwitch,
  BounceSwitch,
  GlowSwitch,
  CheckCheckbox,
  PopCheckbox,
  ScaleRadio,
  PulseRadio,
  GlowRadio,
}

export default function TogglesPage() {
  return (
    <ComponentDocPage
      slug="toggles"
      eyebrow="Toggles"
      title="Switch, checkbox, and radio"
      description="Eight curated toggle variants — slide, bounce, and glow switches; check and pop checkboxes; scale, pulse, and glow radios. Install from @fossilui/react or the standalone packages."
      variants={{
        description: 'Switch and checkbox cards start on. Change a radio selection to preview the motion.',
        tag: 'Live from @fossilui/react and the standalone toggle packages',
        items: TOGGLES_VARIANTS,
        layout: 'compact',
        tileClassName: 'gap-3! p-3! sm:min-h-0 sm:gap-4! sm:p-4! md:p-4!',
        // overflow-visible keeps glow/pulse rings from clipping; height is content-driven per control type
        stageClassName:
          'min-h-0 items-center justify-center overflow-visible! px-3 py-3.5 sm:px-4 sm:py-4',
        renderPreview: (item) => {
          const Comp = TOGGLE_COMPONENTS[item.component]
          if (item.kind === 'radio') {
            return (
              <div className="flex w-full min-h-[6.75rem] items-center justify-center px-1 py-1 sm:min-h-[7.25rem]">
                <Comp defaultValue="pro" items={RADIO_ITEMS} className="w-full max-w-[13.5rem]" />
              </div>
            )
          }
          return (
            <div className="flex min-h-[3.5rem] w-full max-w-full items-center justify-center px-1">
              <Comp
                defaultChecked
                label={item.kind === 'checkbox' ? 'Send me product updates' : 'Airplane mode'}
                className="max-w-full"
              />
            </div>
          )
        },
      }}
      importGuide={{
        description: 'Install @fossilui/react or a single family package, add the Tailwind @source snippet, then import Switch, Checkbox, Radio, or a named variant.',
        snippets: TOGGLES_IMPORT_SNIPPETS,
        importCode: TOGGLES_IMPORT_SNIPPET,
      }}
      whenToUse={{
        description: 'Pick the control type for the decision, then a motion that matches how loud the confirm should feel.',
        items: TOGGLES_WHEN_TO_USE,
      }}
      configurator={<TogglesConfigurator />}
      api={{
        description: 'Three components, eight curated motions. duration, easing, and delay time every transition.',
        props: TOGGLES_PROPS,
        compatibility: TOGGLES_MOTION_COMPATIBILITY,
        compatibilityDescription: 'Quiet defaults for forms; pulse and glow when the pick should feel branded.',
      }}
      faq={{
        description: 'Grouping, packages, and when to prefer each control.',
        items: TOGGLES_FAQS,
      }}
    />
  )
}
