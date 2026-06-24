import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  CircleAlert,
  LayoutGrid,
  LayoutTemplate,
  LoaderCircle,
  Menu,
  Minus,
  MousePointerClick,
  Package,
  PanelTop,
  Tag as TagIcon,
  TextCursorInput,
} from 'lucide-react'
import { CodeEditor } from '../components/code/CodeEditor'
import { Section, SectionHeader } from '../components/ui/Section'
import { Button } from '../components/ui/Button'
import { Tag } from '../components/ui/Tag'
import {
  COMPONENT_FAMILIES,
  COMPONENT_INSTALL_SNIPPET,
  COMPONENT_STATS,
} from '../data/componentsHub'

const FAMILY_ICONS = {
  buttons: MousePointerClick,
  cards: LayoutGrid,
  modals: PanelTop,
  inputs: TextCursorInput,
  badges: TagIcon,
  alerts: CircleAlert,
  navbars: Menu,
  'hero-blocks': LayoutTemplate,
  separators: Minus,
  spinners: LoaderCircle,
}

const MotionLink = motion.create(Link)

const FamilyCard = function FamilyCard({ family, index, reduceMotion }) {
  const Icon = FAMILY_ICONS[family.id] ?? LayoutGrid

  return (
    <MotionLink
      to={family.href}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduceMotion ? { duration: 0 } : { delay: Math.min(index * 0.04, 0.28), duration: 0.4 }
      }
      className="card group card-hover relative flex min-h-[220px] flex-col overflow-hidden p-5 sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-100/80 via-white to-indigo-50/60" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="relative z-10 flex items-start justify-between gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50 text-indigo-700">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
        <Tag tone="accent">Live</Tag>
      </div>

      <div className="relative z-10 mt-5 flex flex-1 flex-col">
        <div className="flex items-center gap-2">
          <h3 className="text-[16px] font-medium tracking-tight text-neutral-900">{family.name}</h3>
          <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-700" />
        </div>
        <p className="mt-2 flex-1 text-[13px] leading-relaxed text-neutral-600">{family.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Tag>{family.variants} variants</Tag>
          <Tag tone="soft">@fossilui/react</Tag>
        </div>
      </div>
    </MotionLink>
  )
}

function FamilyGrid({ reduceMotion }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {COMPONENT_FAMILIES.map((family, index) => (
        <FamilyCard key={family.id} family={family} index={index} reduceMotion={reduceMotion} />
      ))}
    </div>
  )
}

export default function Components() {
  const reduceMotion = useReducedMotion()

  return (
    <Section className="overflow-x-clip pt-10 pb-16 sm:pt-12 md:pt-20 md:pb-24">
      <div className="min-w-0">
        <SectionHeader
          className="mb-6 sm:mb-8 md:mb-10"
          eyebrow="Components"
          title="Installable UI library for React"
          description="Browse live previews, copy snippets, and ship buttons, cards, modals, inputs, navbars, heroes, and more from @fossilui/react."
        />

        <div className="mb-8 flex flex-wrap items-center gap-2 sm:mb-10">
          <Tag tone="accent">Live from @fossilui/react</Tag>
          <Tag tone="soft">{COMPONENT_STATS.liveFamilies} families</Tag>
          <Tag tone="soft">{COMPONENT_STATS.liveVariants} variants</Tag>
        </div>

        <div className="mb-10 grid gap-3 sm:mb-12 sm:grid-cols-3 sm:gap-4">
          {[
            {
              label: 'Families',
              value: `${COMPONENT_STATS.liveFamilies} component groups`,
              icon: Package,
            },
            {
              label: 'Install',
              value: 'npm install @fossilui/react',
              icon: MousePointerClick,
            },
            {
              label: 'Variants',
              value: `${COMPONENT_STATS.liveVariants} live previews`,
              icon: LayoutTemplate,
            },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="card flex items-start gap-3 p-4 sm:p-5">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-700">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500">{label}</p>
                <p className="mt-1 text-[14px] font-medium text-neutral-900">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-10 sm:mb-12">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
                Component families
              </h2>
              <p className="mt-1 text-[13px] text-neutral-600">
                Open a family to preview variants and copy code.
              </p>
            </div>
            <Button as={Link} to="/docs" variant="ghost" size="md" className="shrink-0">
              Installation guide
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
          <FamilyGrid reduceMotion={reduceMotion} />
        </div>

        <div className="mb-10 sm:mb-12">
          <div className="card overflow-hidden">
            <div className="border-b border-neutral-200/80 px-4 py-4 sm:px-5 sm:py-5">
              <h2 className="text-[15px] font-medium text-neutral-900 sm:text-base">Quick install</h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-600">
                Add the package, point Tailwind at the library, then import components in your app.
              </p>
            </div>
            <div className="p-4 sm:p-5">
              <CodeEditor value={COMPONENT_INSTALL_SNIPPET} readOnly minHeight="120px" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button as={Link} to="/components/buttons" variant="primary" size="md">
            Browse buttons
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
          <Button as={Link} to="/components/inputs" variant="secondary" size="md">
            Browse inputs
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
          <Button as={Link} to="/templates" variant="ghost" size="md">
            View templates
          </Button>
        </div>
      </div>
    </Section>
  )
}
