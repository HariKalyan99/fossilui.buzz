import { useMemo, useState } from 'react'
import { Card } from '@fossilui/react'
import { CodeEditor } from '../code/CodeEditor'
import { Select } from '../ui/Select'
import { CopySnippetButton } from '../buttons/CopySnippetButton'
import { CARD_DEMO_IMAGE, CARD_DEMO_IMAGE_ALT } from '../../data/cardDemo'
import { cn } from '../../lib/cn'

const MOTIONS = [
  'liftShadow',
  'borderGlow',
  'imageZoom',
  'shineSweep',
  'gradientShift',
  'scaleUp',
  'accentReveal',
  'tiltHover',
]

const DEFAULT_MOTION = 'liftShadow'
const DEFAULT_TITLE = 'Fossil UI'
const DEFAULT_DESCRIPTION = 'Production-ready components for modern developers.'

export function CardConfigurator() {
  const [motion, setMotion] = useState(DEFAULT_MOTION)

  const snippet = useMemo(
    () => `import { Card } from '@fossilui/react'

<Card
  motion="${motion}"
  imageSrc="${CARD_DEMO_IMAGE}"
  imageAlt="${CARD_DEMO_IMAGE_ALT}"
  title="${DEFAULT_TITLE}"
  description="${DEFAULT_DESCRIPTION}"
/>`,
    [motion],
  )

  const previewProps = {
    motion,
    imageSrc: CARD_DEMO_IMAGE,
    imageAlt: CARD_DEMO_IMAGE_ALT,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  }

  return (
    <article className="card min-w-0 overflow-hidden">
      <div className="border-b border-neutral-200/80 px-4 py-4 sm:px-5 sm:py-5">
        <h3 className="text-[15px] font-medium text-neutral-900 sm:text-base">Try a motion</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">
          Pick a motion, preview it below, then copy the starter snippet and adjust props in your app.
        </p>
      </div>

      <div className="grid min-w-0 gap-0 lg:grid-cols-2">
        <div className="min-w-0 border-b border-neutral-200/80 p-4 sm:p-5 lg:border-r lg:border-b-0">
          <label className="block max-w-xs space-y-1.5">
            <span className="text-[12px] font-medium text-neutral-600">Motion</span>
            <Select value={motion} onChange={(e) => setMotion(e.target.value)}>
              {MOTIONS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Select>
          </label>

          <p className="mb-2 mt-6 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
            Preview
          </p>
          <div
            className={cn(
              'flex min-h-[12rem] items-center justify-center rounded-lg',
              'border border-dashed border-neutral-200 bg-neutral-50/90 p-4 sm:min-h-[14rem] sm:p-6',
            )}
          >
            <Card key={motion} className="w-full max-w-[260px]" {...previewProps} />
          </div>
        </div>

        <div className="min-w-0 space-y-3 p-4 sm:p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">Snippet</p>
          <CodeEditor value={snippet} readOnly minHeight="180px" />
          <CopySnippetButton code={snippet} />
        </div>
      </div>
    </article>
  )
}
