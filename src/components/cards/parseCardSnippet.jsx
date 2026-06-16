import {
  Card,
  LiftShadowCard,
  BorderGlowCard,
  ImageZoomCard,
  ShineSweepCard,
  GradientShiftCard,
  ScaleUpCard,
  AccentRevealCard,
  TiltHoverCard,
} from '@fossilui/react'

export const CARD_COMPONENT_MAP = {
  Card,
  LiftShadowCard,
  BorderGlowCard,
  ImageZoomCard,
  ShineSweepCard,
  GradientShiftCard,
  ScaleUpCard,
  AccentRevealCard,
  TiltHoverCard,
}

const BOOLEAN_PROPS = ['withMedia', 'interactive']

const STRING_PROPS = [
  'motion',
  'title',
  'description',
  'accent',
  'size',
  'href',
  'imageSrc',
  'imageAlt',
  'className',
]

/**
 * @param {string} expr
 */
function parseObjectLiteral(expr) {
  /** @type {Record<string, string | number>} */
  const result = {}
  const inner = expr.trim().replace(/^\{/, '').replace(/\}$/, '').trim()
  if (!inner) return result

  const pairRe = /([a-zA-Z_$][\w$-]*)\s*:\s*(?:"([^"]*)"|'([^']*)'|([\d.]+))/g
  let match
  while ((match = pairRe.exec(inner)) !== null) {
    const key = match[1]
    const value = match[2] ?? match[3] ?? Number(match[4])
    result[key] = value
  }

  return result
}

/**
 * @param {string} attrs
 * @param {string} key
 */
function parseJsxExpressionAttr(attrs, key) {
  const match = attrs.match(new RegExp(`${key}\\s*=\\s*\\{`))
  if (!match || match.index === undefined) return undefined

  let start = match.index + match[0].length - 1
  let depth = 0
  let inString = null

  for (let i = start; i < attrs.length; i++) {
    const ch = attrs[i]

    if (inString) {
      if (ch === '\\') {
        i += 1
        continue
      }
      if (ch === inString) inString = null
      continue
    }

    if (ch === '"' || ch === "'") {
      inString = ch
      continue
    }

    if (ch === '{') depth += 1
    else if (ch === '}') {
      depth -= 1
      if (depth === 0) {
        const expr = attrs.slice(start + 1, i).trim()
        return parseObjectLiteral(expr.startsWith('{') ? expr : `{${expr}}`)
      }
    }
  }

  return undefined
}

/**
 * @param {string} attrString
 */
function parseAttrs(attrString) {
  /** @type {Record<string, unknown>} */
  const props = {}
  const attrs = attrString.trim()

  for (const key of BOOLEAN_PROPS) {
    if (new RegExp(`(?:^|\\s)${key}(?:\\s|$|(?==))`).test(attrs)) {
      props[key] = true
      continue
    }

    const boolExpr = attrs.match(new RegExp(`${key}\\s*=\\s*\\{([^}]*)\\}`))
    if (boolExpr) {
      props[key] = boolExpr[1].trim() === 'true'
    }
  }

  for (const key of STRING_PROPS) {
    const quoted = attrs.match(new RegExp(`${key}\\s*=\\s*["']([^"']*)["']`))
    if (quoted) {
      props[key] = quoted[1]
    }
  }

  const style = parseJsxExpressionAttr(attrs, 'style')
  if (style && Object.keys(style).length > 0) {
    props.style = style
  }

  return props
}

/**
 * @param {string} code
 * @param {number} fromIndex
 */
function findOpeningTagEnd(code, fromIndex) {
  let i = fromIndex
  while (i < code.length) {
    const ch = code[i]

    if (ch === '"' || ch === "'") {
      const quote = ch
      i += 1
      while (i < code.length && code[i] !== quote) {
        if (code[i] === '\\') i += 1
        i += 1
      }
      i += 1
      continue
    }

    if (code.slice(i, i + 2) === '/*') {
      const close = code.indexOf('*/', i + 2)
      i = close === -1 ? code.length : close + 2
      continue
    }

    if (ch === '{') {
      let depth = 1
      i += 1
      while (i < code.length && depth > 0) {
        if (code[i] === '{') depth += 1
        else if (code[i] === '}') depth -= 1
        i += 1
      }
      continue
    }

    if (ch === '>') {
      const selfClosing = code[i - 1] === '/'
      return { index: i, selfClosing }
    }

    i += 1
  }

  return null
}

/**
 * @param {string} code
 */
function parseOpeningTag(code) {
  const open = code.match(/^<(Card|\w+Card)\s*/)
  if (!open) return null

  const name = open[1]
  const attrStart = open[0].length
  const tagEnd = findOpeningTagEnd(code, attrStart)
  if (!tagEnd) return null

  const attrString = stripJsxComments(
    code.slice(attrStart, tagEnd.selfClosing ? tagEnd.index - 1 : tagEnd.index),
  )
  const afterTag = code.slice(tagEnd.index + 1).trim()

  return { name, attrString, selfClosing: tagEnd.selfClosing, afterTag }
}

/**
 * @param {string} str
 */
function stripJsxComments(str) {
  return str.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/\/\/[^\n]*/g, ' ')
}

/**
 * Strip leading import lines so previews work on paste-ready snippets.
 * @param {string} code
 */
function extractJsxFromSnippet(code) {
  const tagIndex = code.search(/<(Card|\w+Card)\b/)
  if (tagIndex === -1) return code.trim()
  return code.slice(tagIndex).trim()
}

/**
 * Parse a small JSX snippet for live card previews.
 * @param {string} code
 */
export function parseCardSnippet(code) {
  const trimmed = code.trim()
  if (!trimmed) {
    return { error: 'Enter a card JSX snippet to preview.' }
  }

  const jsx = extractJsxFromSnippet(trimmed)
  const opening = parseOpeningTag(jsx)
  if (!opening) {
    return {
      error: 'Include a card component, e.g. <Card motion="liftShadow" title="Title" />',
    }
  }

  const { name, attrString, selfClosing } = opening
  const Component = CARD_COMPONENT_MAP[name]

  if (!Component) {
    return {
      error: `Unknown component "${name}". Try <Card motion="liftShadow" ... /> or LiftShadowCard.`,
    }
  }

  if (!selfClosing) {
    return { error: 'Use a self-closing card tag for the configurator, e.g. <Card ... />' }
  }

  const props = parseAttrs(attrString)
  if (name === 'Card' && !props.motion) {
    props.motion = 'liftShadow'
  }

  return { Component, name, props, error: null }
}
