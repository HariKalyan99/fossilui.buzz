/**
 * Generic JSX snippet parser for the component configurators.
 * Reads literal props (strings, booleans, numbers, object/array literals) from the
 * first matching component tag and ignores runtime expressions like onClose={...}.
 */

function stripComments(code) {
  return code.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/[^\n]*/g, '$1')
}

/** Index of the brace that closes the one at `start`, skipping string contents. */
function findClosingBrace(src, start) {
  let depth = 0
  let quote = null
  for (let i = start; i < src.length; i += 1) {
    const ch = src[i]
    if (quote) {
      if (ch === '\\') i += 1
      else if (ch === quote) quote = null
      continue
    }
    if (ch === '"' || ch === "'" || ch === '`') quote = ch
    else if (ch === '{') depth += 1
    else if (ch === '}') {
      depth -= 1
      if (depth === 0) return i
    }
  }
  return -1
}

/** Index of the `>` ending an opening tag, skipping strings and `{...}` expressions. */
function findTagEnd(src, from) {
  for (let i = from; i < src.length; i += 1) {
    const ch = src[i]
    if (ch === '"' || ch === "'") {
      const end = src.indexOf(ch, i + 1)
      if (end === -1) return null
      i = end
    } else if (ch === '{') {
      const end = findClosingBrace(src, i)
      if (end === -1) return null
      i = end
    } else if (ch === '>') {
      return { index: i, selfClosing: src[i - 1] === '/' }
    }
  }
  return null
}

export function parseLiteral(expression) {
  const src = expression.trim()
  if (src === 'true') return true
  if (src === 'false') return false
  if (/^-?\d+(\.\d+)?$/.test(src)) return Number(src)
  if (/^(["'`])[\s\S]*\1$/.test(src) && !src.slice(1, -1).includes('${')) return src.slice(1, -1)
  if (!/^[[{]/.test(src)) return undefined

  const json = src
    .replace(/'((?:[^'\\]|\\.)*)'/g, (_, value) => JSON.stringify(value))
    .replace(/([{,]\s*)([A-Za-z_$][\w$]*)\s*:/g, '$1"$2":')
    .replace(/,\s*([}\]])/g, '$1')
  try {
    return JSON.parse(json)
  } catch {
    return undefined
  }
}

export function parseAttributes(src) {
  /** @type {Record<string, unknown>} */
  const props = {}
  let i = 0

  while (i < src.length) {
    const name = /^\s*([A-Za-z_$][\w$-]*)/.exec(src.slice(i))
    if (!name) {
      i += 1
      continue
    }
    i += name[0].length
    const key = name[1]

    const equals = /^\s*=\s*/.exec(src.slice(i))
    if (!equals) {
      props[key] = true
      continue
    }
    i += equals[0].length

    const ch = src[i]
    if (ch === '"' || ch === "'") {
      const end = src.indexOf(ch, i + 1)
      if (end === -1) break
      props[key] = src.slice(i + 1, end)
      i = end + 1
    } else if (ch === '{') {
      const end = findClosingBrace(src, i)
      if (end === -1) break
      const value = parseLiteral(src.slice(i + 1, end))
      if (value !== undefined) props[key] = value
      i = end + 1
    }
  }

  return props
}

/**
 * @param {string} code
 * @param {{ componentMap: Record<string, import('react').ComponentType>, wrapperName: string, defaultMotion: string }} options
 */
export function parseComponentSnippet(code, { componentMap, wrapperName, defaultMotion }) {
  const source = stripComments(code ?? '').trim()
  if (!source) {
    return { error: `Enter a ${wrapperName} JSX snippet to preview.` }
  }

  const names = Object.keys(componentMap).sort((a, b) => b.length - a.length)
  const tagMatch = new RegExp(`<(${names.join('|')})(?=[\\s/>])`).exec(source)
  if (!tagMatch) {
    return { error: `Include a component tag, e.g. <${wrapperName} motion="${defaultMotion}" />` }
  }

  const name = tagMatch[1]
  const attrStart = tagMatch.index + tagMatch[0].length
  const tagEnd = findTagEnd(source, attrStart)
  if (!tagEnd) {
    return { error: `Close the <${name}> tag to preview it.` }
  }

  const attrSource = source.slice(attrStart, tagEnd.selfClosing ? tagEnd.index - 1 : tagEnd.index)
  const props = parseAttributes(attrSource)
  if (name === wrapperName && !props.motion) props.motion = defaultMotion

  return { Component: componentMap[name], name, props, error: null }
}
