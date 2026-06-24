import { useMemo, useState } from 'react'
import { Button } from '@fossilui/react'
import { CodeEditor } from '../code/CodeEditor'
import { Select } from '../ui/Select'
import { CopySnippetButton } from './CopySnippetButton'
import { cn } from '../../lib/cn'

const MOTIONS = [
  'rollText',
  'staggerText',
  'slideFill',
  'shineSweep',
  'borderReveal',
  'iconSlide',
  'underlineGrow',
  'liftShadow',
  'letterSpacing',
  'skewFill',
]

const DEFAULT_LABEL = 'Get Started'
const DEFAULT_MOTION = 'liftShadow'

export function ButtonConfigurator() {
  const [motion, setMotion] = useState(DEFAULT_MOTION)

  const snippet = useMemo(
    () => `import { Button } from '@fossilui/react'

<Button motion="${motion}">
  ${DEFAULT_LABEL}
</Button>`,
    [motion],
  )

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
              'flex min-h-[9rem] items-center justify-center rounded-lg',
              'border border-dashed border-neutral-200 bg-neutral-50/90 p-6 sm:min-h-[10rem]',
            )}
          >
            <Button motion={motion} color="primary" variant="solid">
              {DEFAULT_LABEL}
            </Button>
          </div>
        </div>

        <div className="min-w-0 space-y-3 p-4 sm:p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">Snippet</p>
          <CodeEditor value={snippet} readOnly minHeight="140px" />
          <CopySnippetButton code={snippet} />
        </div>
      </div>
    </article>
  )
}
