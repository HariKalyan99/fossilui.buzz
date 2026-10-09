import {
  FadeUpHero,
  StaggerWordsHero,
  BlurRevealHero,
  ScaleInHero,
  LetterCascadeHero,
  GradientTextHero,
  SpotlightHero,
  TypewriterHero,
} from '@fossilui/react'
import { ComponentDocPage } from '../components/docs/ComponentDocPage'
import { HeroConfigurator } from '../components/heroes/HeroConfigurator'
import { ReplayableHero } from '../components/heroes/ReplayableHero'
import {
  HERO_DEMO,
  HERO_FAQS,
  HERO_IMPORT_SNIPPET,
  HERO_IMPORT_SNIPPETS,
  HERO_MOTION_COMPATIBILITY,
  HERO_PROPS,
  HERO_VARIANTS,
  HERO_WHEN_TO_USE,
} from '../data/heroDocs'

const HERO_COMPONENTS = {
  FadeUpHero,
  StaggerWordsHero,
  BlurRevealHero,
  ScaleInHero,
  LetterCascadeHero,
  GradientTextHero,
  SpotlightHero,
  TypewriterHero,
}

const TILE_PROPS = {
  ...HERO_DEMO,
  primaryHref: undefined,
  secondaryHref: undefined,
}

export default function Heroes() {
  return (
    <ComponentDocPage
      slug="heroes"
      eyebrow="Hero blocks"
      title="Animated hero sections"
      description="Watch every entrance, then install from @fossilui/react or @fossilui/heroes, configure copy, and drop a hero into your landing page."
      variants={{
        description:
          'Each hero animates when it scrolls into view. Use Replay to watch it again, then copy the standard Hero snippet.',
        tag: 'Live from @fossilui/react and @fossilui/heroes',
        items: HERO_VARIANTS,
        layout: 'wide',
        tileClassName: 'sm:min-h-0',
        stageClassName: 'block overflow-hidden p-0',
        renderPreview: (item) => (
          <ReplayableHero Component={HERO_COMPONENTS[item.component]} props={TILE_PROPS} />
        ),
      }}
      importGuide={{
        description:
          'Install the package you need, add the matching Tailwind @source snippet, then import Hero or a named variant.',
        snippets: HERO_IMPORT_SNIPPETS,
        importCode: HERO_IMPORT_SNIPPET,
      }}
      whenToUse={{
        description:
          'The hero sets the tone for the whole page — match its motion to your brand and keep headlines short enough to animate well.',
        items: HERO_WHEN_TO_USE,
      }}
      configurator={<HeroConfigurator />}
      api={{
        description:
          'All animated heroes share the same props. Extra attributes are forwarded to the <section> root.',
        props: HERO_PROPS,
        compatibility: HERO_MOTION_COMPATIBILITY,
        compatibilityDescription:
          'Use this matrix to pick a motion that suits your headline. Split-text motions work best with short titles.',
      }}
      faq={{
        description: 'Common questions about timing, accessibility, and styling for @fossilui heroes.',
        items: HERO_FAQS,
      }}
    />
  )
}
