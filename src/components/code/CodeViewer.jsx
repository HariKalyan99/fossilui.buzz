import { lazy, Suspense, useMemo } from 'react'
import { javascript } from '@codemirror/lang-javascript'
import { css as cssLang } from '@codemirror/lang-css'
import { html as htmlLang } from '@codemirror/lang-html'
import { json as jsonLang } from '@codemirror/lang-json'
import { quietlight, CODE_EDITOR_BG } from './codeMirrorTheme.js'
import DinoLoader from '../loader/DinoLoader'

const ReactCodeMirror = lazy(() => import('@uiw/react-codemirror'))

function getExtensions(lang) {
  switch (lang) {
    case 'javascript':
      return [javascript({ jsx: true })]
    case 'typescript':
      return [javascript({ jsx: true, typescript: true })]
    case 'css':
      return [cssLang()]
    case 'html':
      return [htmlLang()]
    case 'json':
      return [jsonLang()]
    default:
      return []
  }
}

export function CodeViewer({ file }) {
  const extensions = useMemo(() => getExtensions(file?.lang), [file?.lang])

  if (!file) {
    return (
      <div
        className="flex h-full items-center justify-center text-sm text-neutral-500"
        style={{ backgroundColor: CODE_EDITOR_BG }}
      >
        Select a file to view.
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div
          className="flex h-full items-center justify-center p-4"
          style={{ backgroundColor: CODE_EDITOR_BG }}
        >
          <DinoLoader compact />
        </div>
      }
    >
      <ReactCodeMirror
        value={file.code}
        height="100%"
        theme={quietlight}
        extensions={extensions}
        readOnly
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
          foldGutter: true,
          autocompletion: false,
          searchKeymap: true,
        }}
        className={[
          'h-full text-[12px] sm:text-[13px]',
          '[&_.cm-editor]:border-0 [&_.cm-editor]:outline-none [&_.cm-editor]:shadow-none',
          '[&_.cm-editor.cm-focused]:outline-none [&_.cm-editor.cm-focused]:shadow-none',
          '[&_.cm-scroller]:outline-none [&_.cm-content]:outline-none',
          '[&_.cm-gutters]:border-0',
          '[&_.cm-scroller]:h-full [&_.cm-scroller]:overflow-x-auto',
          '[&_.cm-content]:min-w-0',
        ].join(' ')}
      />
    </Suspense>
  )
}
