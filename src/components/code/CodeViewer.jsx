import { lazy, Suspense, useMemo } from 'react'
import { javascript } from '@codemirror/lang-javascript'
import { css as cssLang } from '@codemirror/lang-css'
import { html as htmlLang } from '@codemirror/lang-html'
import { json as jsonLang } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
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
      <div className="flex h-full items-center justify-center text-sm text-neutral-500">
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
        theme={oneDark}
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
        className="h-full"
      />
    </Suspense>
  )
}
