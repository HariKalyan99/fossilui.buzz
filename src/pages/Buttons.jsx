import { Mail } from 'lucide-react'
import {
  Button,
  RollTextButton,
  StaggerTextButton,
  SlideFillButton,
  ShineSweepButton,
  BorderRevealButton,
  IconSlideButton,
  UnderlineGrowButton,
  LiftShadowButton,
  LetterSpacingButton,
  SkewFillButton,
} from '@fossilui/react'
import { ButtonConfigurator } from '../components/buttons/ButtonConfigurator'
import { ComponentDocPage } from '../components/docs/ComponentDocPage'
import {
  BUTTON_MOTION_COMPATIBILITY,
  BUTTON_FAQS,
  BUTTON_IMPORT_SNIPPET,
  BUTTON_INSTALL_SNIPPET,
  BUTTON_PROPS,
  BUTTON_VITE_SNIPPET,
  BUTTON_TAILWIND_BUTTONS_SNIPPET,
  BUTTON_TAILWIND_REACT_SNIPPET,
  BUTTON_TAILWIND_SNIPPET,
  BUTTON_VARIANTS,
  WHEN_TO_USE,
} from '../data/buttonDocs'

const BUTTON_COMPONENTS = {
  Button,
  RollTextButton,
  StaggerTextButton,
  SlideFillButton,
  ShineSweepButton,
  BorderRevealButton,
  IconSlideButton,
  UnderlineGrowButton,
  LiftShadowButton,
  LetterSpacingButton,
  SkewFillButton,
}

/** Live preview props that differ from copy snippets (icon is React node). */
const VARIANT_PREVIEW_PROPS = {
  'outlined-icon': {
    color: 'primary',
    variant: 'outlined',
    icon: <Mail className="h-4 w-4 shrink-0" strokeWidth={2} />,
    iconPlacement: 'end',
  },
}

export default function Buttons() {
  return (
    <ComponentDocPage
      slug="buttons"
      eyebrow="Buttons"
      title="Animated button variants"
      description="Preview every variant, then install from @fossilui/react or @fossilui/buttons, configure props, and copy examples into your app."
      variants={{
        description:
          'Hover to preview each animation, then copy the standard Button motion snippet from any card.',
        tag: 'Live from @fossilui/react and @fossilui/buttons',
        items: BUTTON_VARIANTS,
        renderPreview: (item) => {
          const Btn = BUTTON_COMPONENTS[item.component]
          return (
            <Btn className="max-w-full shrink-0" {...VARIANT_PREVIEW_PROPS[item.id]}>
              {item.label}
            </Btn>
          )
        },
      }}
      importGuide={{
        description:
          'Install the package you need, add the matching Tailwind @source snippet (see FAQ), then import buttons or the example template.',
        snippets: [
          { label: 'Install', code: BUTTON_INSTALL_SNIPPET },
          { label: 'Vite', code: BUTTON_VITE_SNIPPET },
          { label: 'Tailwind — base', code: BUTTON_TAILWIND_SNIPPET },
          { label: 'Tailwind — @fossilui/react', code: BUTTON_TAILWIND_REACT_SNIPPET },
          { label: 'Tailwind — @fossilui/buttons', code: BUTTON_TAILWIND_BUTTONS_SNIPPET },
        ],
        importCode: BUTTON_IMPORT_SNIPPET,
      }}
      whenToUse={{
        description:
          'Pick an animation that matches intent — motion should clarify the action, not decorate every control.',
        items: WHEN_TO_USE,
      }}
      configurator={<ButtonConfigurator />}
      api={{
        description:
          'All animated buttons share the same props. Native button and anchor attributes are also supported.',
        props: BUTTON_PROPS,
        compatibility: BUTTON_MOTION_COMPATIBILITY,
        compatibilityDescription:
          'Use this matrix to pick combinations that look best. Some motions intentionally constrain certain attributes for cleaner visuals.',
      }}
      faq={{
        description: 'Common questions about installing, styling, and using @fossilui/react or @fossilui/buttons.',
        items: BUTTON_FAQS,
      }}
    />
  )
}
