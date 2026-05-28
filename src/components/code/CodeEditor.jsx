import { lazy, Suspense, useMemo, useState } from 'react'
import { javascript } from '@codemirror/lang-javascript'
import { Check, Copy } from 'lucide-react'
import DinoLoader from '../loader/DinoLoader'
import { cn } from '../../lib/cn'
import { kimbieDark } from './codeMirrorKimbieDark.js'

const ReactCodeMirror = lazy(() => import('@uiw/react-codemirror'))

export function CodeEditor({
  value,
  onChange,
  className,
  minHeight = '140px',
  readOnly = false,
  showCopy = true,
}) {
  const extensions = useMemo(() => [javascript({ jsx: true })], [])
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div
      className={cn(
        'relative max-w-full overflow-hidden rounded-lg bg-[#221a0f]',
        className,
      )}
    >
      {showCopy ? (
        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? 'Copied to clipboard' : 'Copy code'}
          className={cn(
            'absolute right-2 top-2 z-10 inline-flex min-h-9 min-w-9 touch-manipulation items-center justify-center gap-1 rounded-md',
            'border border-[#a57a4c]/40 bg-[#5e452b]/80 px-2.5 py-1.5 text-[11px] font-medium text-[#d3af86]',
            'transition-colors hover:bg-[#5e452b] hover:text-[#e3b583] active:scale-[0.98]',
            'sm:min-h-0 sm:min-w-0',
          )}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      ) : null}
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-6" style={{ minHeight }}>
            <DinoLoader compact />
          </div>
        }
      >
        <ReactCodeMirror
          value={value}
          height="auto"
          minHeight={minHeight}
          theme={kimbieDark}
          extensions={extensions}
          onChange={readOnly ? undefined : onChange}
          readOnly={readOnly}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: true,
            highlightActiveLineGutter: true,
            foldGutter: false,
            autocompletion: true,
            bracketMatching: true,
            closeBrackets: true,
          }}
          className={cn(
            'max-w-full text-[12px] sm:text-[13px]',
            '[&_.cm-editor]:border-0 [&_.cm-editor]:bg-[#221a0f] [&_.cm-editor]:outline-none',
            '[&_.cm-gutters]:border-0 [&_.cm-gutters]:bg-[#221a0f]',
            '[&_.cm-scroller]:min-h-[inherit] [&_.cm-scroller]:overflow-x-auto [&_.cm-scroller]:bg-[#221a0f]',
            '[&_.cm-content]:min-w-0 [&_.cm-content]:bg-[#221a0f]',
            showCopy && 'pr-2 pt-10 sm:pt-2',
          )}
        />
      </Suspense>
    </div>
  )
}
