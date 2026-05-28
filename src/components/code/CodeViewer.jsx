import { lazy, Suspense, useMemo } from 'react'
import { javascript } from '@codemirror/lang-javascript'
import { css as cssLang } from '@codemirror/lang-css'
import { html as htmlLang } from '@codemirror/lang-html'
import { json as jsonLang } from '@codemirror/lang-json'
import { kimbieDark } from './codeMirrorKimbieDark.js'
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
      <div className="flex h-full items-center justify-center bg-[#221a0f] text-sm text-[#a57a4c]">
        Select a file to view.
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center p-4">
          <DinoLoader compact />
        </div>
      }
    >
      <ReactCodeMirror
        value={file.code}
        height="100%"
        theme={kimbieDark}
        extensions={extensions}
        readOnly
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          highlightActiveLineGutter: true,
          foldGutter: true,
          autocompletion: false,
          searchKeymap: true,
        }}
        className={[
          'h-full text-[12px] sm:text-[13px]',
          '[&_.cm-editor]:border-0 [&_.cm-editor]:bg-[#221a0f] [&_.cm-editor]:outline-none',
          '[&_.cm-gutters]:border-0 [&_.cm-gutters]:bg-[#221a0f]',
          '[&_.cm-scroller]:h-full [&_.cm-scroller]:overflow-x-auto [&_.cm-scroller]:bg-[#221a0f]',
          '[&_.cm-content]:min-w-0 [&_.cm-content]:bg-[#221a0f]',
        ].join(' ')}
      />
    </Suspense>
  )
}
