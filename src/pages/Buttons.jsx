import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Section, SectionHeader } from '../components/ui/Section'
import { Tag } from '../components/ui/Tag'
import {
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
} from '../components/buttons'

const BUTTON_LABEL = 'Fossil UI'

const SHOWCASE = [
  {
    name: 'Roll text',
    description: 'Label rolls upward; a duplicate line slides into place.',
    Component: RollTextButton,
    label: BUTTON_LABEL,
  },
  {
    name: 'Stagger letters',
    description: 'Each character lifts with a short staggered delay.',
    Component: StaggerTextButton,
    label: BUTTON_LABEL,
  },
  {
    name: 'Slide fill',
    description: 'Accent background scales up from the bottom edge.',
    Component: SlideFillButton,
    label: BUTTON_LABEL,
  },
  {
    name: 'Shine sweep',
    description: 'A diagonal highlight sweeps across on hover.',
    Component: ShineSweepButton,
    label: BUTTON_LABEL,
  },
  {
    name: 'Border reveal',
    description: 'Hairlines grow from the center on the top and bottom.',
    Component: BorderRevealButton,
    label: BUTTON_LABEL,
  },
  {
    name: 'Icon slide',
    description: 'Arrow slides in from the left; label shifts slightly right.',
    Component: IconSlideButton,
    label: BUTTON_LABEL,
  },
  {
    name: 'Underline grow',
    description: 'Indigo underline expands from the center on hover.',
    Component: UnderlineGrowButton,
    label: BUTTON_LABEL,
  },
  {
    name: 'Lift shadow',
    description: 'Button rises with a soft indigo glow beneath it.',
    Component: LiftShadowButton,
    label: BUTTON_LABEL,
  },
  {
    name: 'Letter spacing',
    description: 'Tracking widens smoothly for an airy, editorial feel.',
    Component: LetterSpacingButton,
    label: BUTTON_LABEL,
  },
  {
    name: 'Skew fill',
    description: 'Skewed panel sweeps in from the left and inverts the text.',
    Component: SkewFillButton,
    label: BUTTON_LABEL,
  },
]

export default function Buttons() {
  return (
    <Section className="pt-12 md:pt-20">
      <Link
        to="/components"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-neutral-500 transition-colors hover:text-neutral-900"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        Components
      </Link>

      <SectionHeader
        className="mt-6 mb-10 md:mb-14"
        eyebrow="Buttons"
        title="Animated button variants"
        description="Ten hover-driven buttons built for Fossil UI. The grid adapts from one column on phones to three on desktop — copy the source and drop into your project."
      />

      <Tag tone="accent" className="mb-8 max-w-xl text-balance">
        Hover to preview
        <span className="font-normal normal-case tracking-normal text-indigo-600/80">
          {' '}
          · tap on touch devices
        </span>
      </Tag>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SHOWCASE.map((item, i) => {
          const Btn = item.Component
          return (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.45 }}
              className="card flex min-h-[200px] min-w-0 flex-col justify-between gap-6 p-4 sm:min-h-[220px] sm:gap-8 sm:p-6 md:p-7"
            >
              <motion.div
                className="flex min-h-[7.5rem] w-full min-w-0 flex-1 items-center justify-center overflow-x-auto overflow-y-hidden rounded-lg border border-dashed border-neutral-200/90 bg-neutral-50/80 px-2 py-8 sm:min-h-[8.5rem] sm:px-4 sm:py-10 [-webkit-overflow-scrolling:touch]"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <Btn className="max-w-none shrink-0 px-3 text-[13px] sm:px-5 sm:text-[14px]">
                  {item.label}
                </Btn>
              </motion.div>
              <motion.div className="space-y-1">
                <h3 className="text-[15px] font-medium text-neutral-900">{item.name}</h3>
                <p className="text-[12px] leading-relaxed text-neutral-500 sm:text-[13px]">
                  {item.description}
                </p>
              </motion.div>
            </motion.article>
          )
        })}
      </motion.div>
    </Section>
  )
}
