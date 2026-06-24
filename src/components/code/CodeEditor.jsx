import { lazy, Suspense, useMemo, useState } from 'react'
import { javascript } from '@codemirror/lang-javascript'
import { Check, Copy } from 'lucide-react'
import DinoLoader from '../loader/DinoLoader'
import { cn } from '../../lib/cn'
import { quietlight, CODE_EDITOR_BG } from './codeMirrorTheme.js'

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
        'relative max-w-full overflow-hidden rounded-lg border border-neutral-200',
        className,
      )}
      style={{ backgroundColor: CODE_EDITOR_BG }}
    >
      {showCopy ? (
        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? 'Copied to clipboard' : 'Copy code'}
          className={cn(
            'absolute right-2 top-2 z-10 inline-flex min-h-9 min-w-9 touch-manipulation items-center justify-center gap-1 rounded-md',
            'border border-neutral-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-neutral-600',
            'transition-colors hover:bg-neutral-50 hover:text-neutral-900 active:scale-[0.98]',
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
          theme={quietlight}
          extensions={extensions}
          onChange={readOnly ? undefined : onChange}
          readOnly={readOnly}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: !readOnly,
            highlightActiveLineGutter: !readOnly,
            foldGutter: false,
            autocompletion: !readOnly,
            bracketMatching: true,
            closeBrackets: !readOnly,
          }}
          className={cn(
            'max-w-full text-[12px] sm:text-[13px]',
            '[&_.cm-editor]:border-0 [&_.cm-editor]:outline-none [&_.cm-editor]:shadow-none',
            '[&_.cm-editor.cm-focused]:outline-none [&_.cm-editor.cm-focused]:shadow-none',
            '[&_.cm-scroller]:outline-none [&_.cm-content]:outline-none',
            '[&_.cm-gutters]:border-0',
            '[&_.cm-scroller]:min-h-[inherit] [&_.cm-scroller]:overflow-x-auto',
            '[&_.cm-content]:min-w-0',
            showCopy && 'pr-2 pt-10 sm:pt-2',
          )}
        />
      </Suspense>
    </div>
  )
}
