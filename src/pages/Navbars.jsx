import {
  FossilNavbar,
  MinimalNavbar,
  CenteredNavbar,
  CtaNavbar,
  ScrollBlurNavbar,
  BorderedNavbar,
} from '@fossilui/react'
import { FamilyDocPage } from '../components/docs/FamilyDocPage'
import {
  NAVBAR_FAQS,
  NAVBAR_IMPORT,
  NAVBAR_INSTALL_SNIPPET,
  NAVBAR_PROPS,
  NAVBAR_VARIANTS,
  NAVBAR_WHEN_TO_USE,
} from '../data/navbarDocs'

const COMPONENTS = {
  MinimalNavbar,
  CenteredNavbar,
  CtaNavbar,
  ScrollBlurNavbar,
  BorderedNavbar,
}

export default function Navbars() {
  return (
    <FamilyDocPage
      eyebrow="Navbars"
      title="Header layout variants"
      description="Responsive headers with CTA, centered nav, scroll blur, and mobile menus."
      importSnippet={NAVBAR_IMPORT}
      installSnippet={NAVBAR_INSTALL_SNIPPET}
      variants={NAVBAR_VARIANTS}
      components={COMPONENTS}
      variantsGridClassName="lg:grid-cols-2"
      variantCardClassName="min-h-[160px]"
      previewCellClassName="w-full items-stretch justify-start p-3"
      playgroundPreviewClassName="w-full items-stretch justify-start p-3"
      renderPreview={(item) => (
        <div className="w-full overflow-hidden rounded-lg border border-neutral-200 bg-white">
          <FossilNavbar variant={item.id} compact />
        </div>
      )}
      motionProp="variant"
      motionOptions={NAVBAR_VARIANTS.map((v) => ({ value: v.id, label: v.name }))}
      defaultMotion="minimal"
      buildMotionSnippet={(variant) => NAVBAR_VARIANTS.find((v) => v.id === variant)?.snippet ?? `<FossilNavbar variant="${variant}" />`}
      props={NAVBAR_PROPS}
      faqs={NAVBAR_FAQS}
      whenToUse={NAVBAR_WHEN_TO_USE}
    />
  )
}
