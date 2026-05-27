import { useEffect, useMemo, useState } from 'react'
import { CodeEditor } from '../code/CodeEditor'
import { parseButtonSnippet } from './parseButtonSnippet'
import { cn } from '../../lib/cn'

export function ButtonPlayground({ title, description, defaultCode, className }) {
  const [code, setCode] = useState(defaultCode)
  const [debounced, setDebounced] = useState(defaultCode)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(code), 280)
    return () => window.clearTimeout(timer)
  }, [code])

  const parsed = useMemo(() => parseButtonSnippet(debounced), [debounced])
  const Preview = parsed.Component

  return (
    <article className={cn('card min-w-0 overflow-hidden', className)}>
      <div className="border-b border-neutral-200/80 px-4 py-4 sm:px-5 sm:py-5">
        <h3 className="text-[15px] font-medium text-neutral-900 sm:text-base">{title}</h3>
        {description ? (
          <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">{description}</p>
        ) : null}
      </div>

      <div className="grid min-w-0 md:grid-cols-2">
        <div className="min-w-0 border-b border-neutral-200/80 p-3 sm:p-4 md:border-b-0 md:border-r">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
            Code · editable
          </p>
          <CodeEditor
            value={code}
            onChange={setCode}
            minHeight="140px"
            className="max-h-[min(50vh,320px)] sm:max-h-[360px]"
          />
        </div>

        <div className="flex min-w-0 flex-col p-3 sm:min-h-[12rem] sm:p-4">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
            Preview
          </p>
          <div
            className={cn(
              'flex min-h-[9rem] flex-1 flex-col items-center justify-center rounded-lg',
              'overflow-y-visible border border-dashed border-neutral-200 bg-neutral-50/90 p-4 sm:min-h-[10rem] sm:p-6',
            )}
          >
            {parsed.error ? (
              <p className="max-w-xs px-2 text-center text-[13px] leading-relaxed text-amber-800">
                {parsed.error}
              </p>
            ) : (
              <div className="flex w-full max-w-full items-center justify-center overflow-x-auto overflow-y-hidden overscroll-x-contain px-1 py-2 [-webkit-overflow-scrolling:touch]">
                <Preview
                  {...parsed.props}
                  className={cn('max-w-full shrink-0', parsed.props?.className)}
                >
                  {parsed.children}
                </Preview>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
