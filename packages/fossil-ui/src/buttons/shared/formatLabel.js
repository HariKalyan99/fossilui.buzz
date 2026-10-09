const CJK_PAIR = /([\u4e00-\u9fff\u3400-\u4dbf])([\u4e00-\u9fff\u3400-\u4dbf])/g

/**
 * Inserts a space between adjacent CJK characters in button labels when enabled.
 * @param {import('react').ReactNode} children
 * @param {boolean} [autoInsertSpace=true]
 */
export function formatLabel(children, autoInsertSpace = true) {
  if (!autoInsertSpace || children == null) return children
  if (typeof children !== 'string') return children
  return children.replace(CJK_PAIR, '$1 $2')
}

/**
 * @param {import('react').ReactNode} children
 */
export function labelToString(children) {
  if (children == null) return ''
  if (typeof children === 'string' || typeof children === 'number') return String(children)
  if (Array.isArray(children)) {
    return children.map((child) => labelToString(child)).join('')
  }
  return ''
}
