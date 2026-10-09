import {
  FocusGlowInput,
  FloatingLabelInput,
  UnderlineGrowInput,
  GradientBorderInput,
  IconPopInput,
  FillSweepInput,
  PlaceholderSlideInput,
  BorderDrawInput,
} from '@fossilui/react'
import { ComponentDocPage } from '../components/docs/ComponentDocPage'
import { cn } from '../lib/cn'
import { InputConfigurator } from '../components/inputs/InputConfigurator'
import {
  INPUT_DEMO,
  INPUT_FAQS,
  INPUT_IMPORT_SNIPPET,
  INPUT_IMPORT_SNIPPETS,
  INPUT_MOTION_COMPATIBILITY,
  INPUT_PROPS,
  INPUT_VARIANTS,
  INPUT_WHEN_TO_USE,
} from '../data/inputDocs'

const INPUT_COMPONENTS = {
  FocusGlowInput,
  FloatingLabelInput,
  UnderlineGrowInput,
  GradientBorderInput,
  IconPopInput,
  FillSweepInput,
  PlaceholderSlideInput,
  BorderDrawInput,
}

export default function Inputs() {
  return (
    <ComponentDocPage
      slug="inputs"
      eyebrow="Inputs"
      title="Animated input variants"
      description="Focus every variant, then install from @fossilui/react or @fossilui/inputs, configure props, and copy examples into your app."
      variants={{
        description: 'Click into each field to preview its focus animation, then copy the standard Input snippet.',
        tag: 'Live from @fossilui/react and @fossilui/inputs',
        items: INPUT_VARIANTS,
        tileClassName: 'sm:min-h-[220px]',
        stageClassName: 'min-h-[8.5rem] px-4 py-6 sm:min-h-[9.5rem] sm:px-5 sm:py-8',
        renderPreview: (item) => {
          const InputComp = INPUT_COMPONENTS[item.component]
          return (
            <InputComp
              className={cn(
                'w-full max-w-[260px] shrink-0',
                // Floating label has no label row above the field; offset it so fields line up across tiles.
                item.component === 'FloatingLabelInput' && 'pt-[25px]',
              )}
              label={INPUT_DEMO.label}
              type={INPUT_DEMO.type}
              placeholder={INPUT_DEMO.placeholder}
              autoComplete="off"
            />
          )
        },
      }}
      importGuide={{
        description:
          'Install the package you need, add the matching Tailwind @source snippet, then import Input or a named variant.',
        snippets: INPUT_IMPORT_SNIPPETS,
        importCode: INPUT_IMPORT_SNIPPET,
      }}
      whenToUse={{
        description:
          'Focus motion should confirm where the user is typing — subtle, consistent, and identical across a form.',
        items: INPUT_WHEN_TO_USE,
      }}
      configurator={<InputConfigurator />}
      api={{
        description:
          'All animated inputs share the same props. Native input attributes and refs are forwarded to the <input>.',
        props: INPUT_PROPS,
        compatibility: INPUT_MOTION_COMPATIBILITY,
        compatibilityDescription:
          'Use this matrix to pick combinations that look best. Some motions depend on a label, placeholder, or icon to be visible.',
      }}
      faq={{
        description: 'Common questions about forms, validation, and styling for @fossilui inputs.',
        items: INPUT_FAQS,
      }}
    />
  )
}
