import { BUTTON_SEMANTIC_DOM } from './constants.js'

/**
 * @param {import('./constants.js').ButtonSemanticDOM} key
 * @param {Record<string, string> | ((info: { props: object }) => Record<string, string>) | undefined} classNames
 * @param {Record<string, import('react').CSSProperties> | ((info: { props: object }) => Record<string, import('react').CSSProperties>) | undefined} styles
 * @param {object} props
 */
export function resolveSemantic(classNames, styles, props) {
  const resolvedClassNames = {}
  const resolvedStyles = {}

  const classMap =
    typeof classNames === 'function' ? classNames({ props }) : classNames ?? {}
  const styleMap = typeof styles === 'function' ? styles({ props }) : styles ?? {}

  for (const key of BUTTON_SEMANTIC_DOM) {
    resolvedClassNames[key] = classMap[key] ?? ''
    resolvedStyles[key] = styleMap[key] ?? undefined
  }

  return { classNames: resolvedClassNames, styles: resolvedStyles }
}
