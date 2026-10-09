import {
  Card,
  LiftShadowCard,
  BorderGlowCard,
  ImageZoomCard,
  ShineSweepCard,
  GradientShiftCard,
  ScaleUpCard,
  AccentRevealCard,
  TiltHoverCard,
} from '@fossilui/react'
import { CardConfigurator } from '../components/cards/CardConfigurator'
import { ComponentDocPage } from '../components/docs/ComponentDocPage'
import {
  CARD_FAQS,
  CARD_IMPORT_SNIPPET,
  CARD_IMPORT_SNIPPETS,
  CARD_MOTION_COMPATIBILITY,
  CARD_PROPS,
  CARD_VARIANTS,
  WHEN_TO_USE,
} from '../data/cardDocs'
import { CARD_DEMO_PROPS } from '../data/cardDemo'

const CARD_COMPONENTS = {
  Card,
  LiftShadowCard,
  BorderGlowCard,
  ImageZoomCard,
  ShineSweepCard,
  GradientShiftCard,
  ScaleUpCard,
  AccentRevealCard,
  TiltHoverCard,
}

export default function Cards() {
  return (
    <ComponentDocPage
      slug="cards"
      eyebrow="Cards"
      title="Animated card variants"
      description="Preview every variant, then install from @fossilui/react or @fossilui/cards, configure props, and copy examples into your app."
      variants={{
        description: 'Hover to preview each animation, then copy the standard Card motion snippet from any card.',
        tag: 'Live from @fossilui/react and @fossilui/cards',
        items: CARD_VARIANTS,
        tileClassName: 'sm:min-h-[280px]',
        stageClassName: 'min-h-[11rem] px-3 py-5 sm:min-h-[12rem] sm:px-4 sm:py-6',
        renderPreview: (item) => {
          const CardComp = CARD_COMPONENTS[item.component]
          return (
            <CardComp
              className="w-full max-w-[260px] shrink-0"
              title={item.title}
              description={item.tagline}
              {...CARD_DEMO_PROPS}
            />
          )
        },
      }}
      importGuide={{
        description:
          'Install the package you need, add the matching Tailwind @source snippet, then import Card or a named variant.',
        snippets: CARD_IMPORT_SNIPPETS,
        importCode: CARD_IMPORT_SNIPPET,
      }}
      whenToUse={{
        description:
          'Pick a motion that matches intent — hover should clarify interactivity, not decorate every tile.',
        items: WHEN_TO_USE,
      }}
      configurator={<CardConfigurator />}
      api={{
        description:
          'All animated cards share the same props. Native div and anchor attributes are also supported.',
        props: CARD_PROPS,
        compatibility: CARD_MOTION_COMPATIBILITY,
        compatibilityDescription:
          'Use this matrix to pick combinations that look best. Some motions work better with media, links, or specific grid density.',
      }}
      faq={{
        description: 'Common questions about installing, styling, and using @fossilui/react cards.',
        items: CARD_FAQS,
      }}
    />
  )
}
