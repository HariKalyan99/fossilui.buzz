import {
  SlidingPillNavbar,
  SlidingUnderlineNavbar,
  DotIndicatorNavbar,
  GrowUnderlineNavbar,
  TextRollNavbar,
  SpotlightNavbar,
  GlassFloatNavbar,
} from '@fossilui/react'
import { ComponentDocPage } from '../components/docs/ComponentDocPage'
import { NavbarConfigurator } from '../components/navbars/NavbarConfigurator'
import {
  NAVBAR_DEMO,
  NAVBAR_FAQS,
  NAVBAR_IMPORT_SNIPPET,
  NAVBAR_IMPORT_SNIPPETS,
  NAVBAR_MOTION_COMPATIBILITY,
  NAVBAR_PROPS,
  NAVBAR_VARIANTS,
  NAVBAR_WHEN_TO_USE,
} from '../data/navbarDocs'

const NAVBAR_COMPONENTS = {
  SlidingPillNavbar,
  SlidingUnderlineNavbar,
  DotIndicatorNavbar,
  GrowUnderlineNavbar,
  TextRollNavbar,
  SpotlightNavbar,
  GlassFloatNavbar,
}

const preventNavigation = (_link, event) => event.preventDefault()

export default function Navbars() {
  return (
    <ComponentDocPage
      slug="navbars"
      eyebrow="Navbars"
      title="Animated navbar variants"
      description="Hover and click every variant, then install from @fossilui/react or @fossilui/navbars, configure links, and copy examples into your app."
      variants={{
        description:
          'Hover and click the links to preview each indicator, then copy the standard Navbar snippet. Each bar is fully responsive.',
        tag: 'Live from @fossilui/react and @fossilui/navbars',
        items: NAVBAR_VARIANTS,
        layout: 'full',
        tileClassName: 'sm:min-h-0',
        stageClassName: 'min-h-[7.5rem] px-3 py-6 sm:min-h-[8.5rem] sm:px-5 sm:py-8',
        renderPreview: (item) => {
          const NavbarComp = NAVBAR_COMPONENTS[item.component]
          return (
            <div className="w-full">
              <NavbarComp
                {...NAVBAR_DEMO}
                className={item.component === 'GlassFloatNavbar' ? undefined : 'rounded-xl border'}
                onLinkClick={preventNavigation}
              />
            </div>
          )
        },
      }}
      importGuide={{
        description:
          'Install the package you need, add the matching Tailwind @source snippet, then import Navbar or a named variant.',
        snippets: NAVBAR_IMPORT_SNIPPETS,
        importCode: NAVBAR_IMPORT_SNIPPET,
      }}
      whenToUse={{
        description:
          'Navigation is seen on every page — choose motion that stays pleasant on the hundredth visit, not just the first.',
        items: NAVBAR_WHEN_TO_USE,
      }}
      configurator={<NavbarConfigurator />}
      api={{
        description:
          'All animated navbars share the same props. Extra attributes are forwarded to the <header> root.',
        props: NAVBAR_PROPS,
        compatibility: NAVBAR_MOTION_COMPATIBILITY,
        compatibilityDescription:
          'Use this matrix to pick a navbar that matches your layout. Indicator styles differ most in how much they draw the eye.',
      }}
      faq={{
        description: 'Common questions about routing, responsiveness, and styling for @fossilui navbars.',
        items: NAVBAR_FAQS,
      }}
    />
  )
}
