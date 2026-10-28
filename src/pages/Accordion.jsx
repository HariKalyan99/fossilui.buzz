import {
  BlurAccordion,
  FadeAccordion,
  HeightAccordion,
  PopAccordion,
  RiseAccordion,
  ScaleAccordion,
  SlideAccordion,
  WipeAccordion,
} from '@fossilui/react'
import { ComponentDocPage } from '../components/docs/ComponentDocPage'
import { AccordionConfigurator } from '../components/accordion/AccordionConfigurator'
import {
  ACCORDION_FAQS,
  ACCORDION_IMPORT_SNIPPET,
  ACCORDION_IMPORT_SNIPPETS,
  ACCORDION_ITEMS,
  ACCORDION_MOTION_COMPATIBILITY,
  ACCORDION_PROPS,
  ACCORDION_VARIANTS,
  ACCORDION_WHEN_TO_USE,
} from '../data/accordionDocs'

const ACCORDION_COMPONENTS = {
  HeightAccordion,
  FadeAccordion,
  SlideAccordion,
  RiseAccordion,
  ScaleAccordion,
  BlurAccordion,
  PopAccordion,
  WipeAccordion,
}

export default function AccordionPage() {
  return (
    <ComponentDocPage
      slug="accordion"
      eyebrow="Accordion"
      title="Accordion"
      description="Eight accordion shapes, not eight fades of the same list. Install from @fossilui/react or @fossilui/accordion."
      variants={{
        description: 'Each card is a different shape. Shipping starts open so the open state is visible.',
        tag: 'Live from @fossilui/react and @fossilui/accordion',
        items: ACCORDION_VARIANTS,
        layout: 'wide',
        tileClassName: 'sm:min-h-0',
        stageClassName: 'items-stretch justify-start px-3 py-4',
        renderPreview: (item) => {
          const Panel = ACCORDION_COMPONENTS[item.component]
          return <Panel defaultValue="shipping" items={ACCORDION_ITEMS} className="w-full" />
        },
      }}
      importGuide={{
        description: 'Install the package you need, add the matching Tailwind @source snippet, then import Accordion.',
        snippets: ACCORDION_IMPORT_SNIPPETS,
        importCode: ACCORDION_IMPORT_SNIPPET,
      }}
      whenToUse={{
        description: 'An accordion hides detail until someone asks for it. The height change should feel like the section opening, not a new page.',
        items: ACCORDION_WHEN_TO_USE,
      }}
      configurator={<AccordionConfigurator />}
      api={{
        description: 'motion is height. type and collapsible decide how many panels can be open. Timing props cover the panel and the chevron.',
        props: ACCORDION_PROPS,
        compatibility: ACCORDION_MOTION_COMPATIBILITY,
        compatibilityDescription: 'Height is the motion. Single and multiple change the open behavior, not the animation.',
      }}
      faq={{
        description: 'Open state, collapsed content, and when a tab set is the better fit.',
        items: ACCORDION_FAQS,
      }}
    />
  )
}
