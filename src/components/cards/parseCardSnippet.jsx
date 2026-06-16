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
const STRING_PROPS = ['motion', 'title', 'description', 'accent', 'size', 'href', 'imageSrc', 'imageAlt']

/**
 * @param {string} str
 */
function stripJsxComments(str) {
  return str.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/\/\/[^\n]*/g, ' ')
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

    if (ch === '{') {
      let depth = 1
      i += 1
      while (i < code.length && depth > 0) {
        if (code[i] === '{') depth += 1
        if (code[i] === '}') depth -= 1
        i += 1
      }
      continue
    }

    if (ch === '>') return i
    i += 1
  }
  return -1
}

/**
 * @param {string} attrs
 */
function parseAttributes(attrs) {
  /** @type {Record<string, unknown>} */
  const props = {}

  const attrPattern =
    /([a-zA-Z][\w.-]*)(?:=(?:"([^"]*)"|'([^']*)'|\{([^}]*)\}))?/g

  let match
  while ((match = attrPattern.exec(attrs)) !== null) {
    const key = match[1]
    const value = match[2] ?? match[3] ?? match[4]

    if (BOOLEAN_PROPS.includes(key)) {
      props[key] = value === undefined ? true : value === 'true'
      continue
    }

    if (STRING_PROPS.includes(key) && value !== undefined) {
      props[key] = value.replace(/^['"]|['"]$/g, '')
    }
  }

  return props
}

/**
 * @param {string} code
 */
export function parseCardSnippet(code) {
  const cleaned = stripJsxComments(code).trim()
  if (!cleaned) return { error: 'Empty snippet' }

  const openMatch = cleaned.match(/<([A-Z][A-Za-z0-9]*)\s*([^>/]*)(?:\/>|>)/)
  if (!openMatch) return { error: 'No Card component found' }

  const name = openMatch[1]
  const Component = CARD_COMPONENT_MAP[name]
  if (!Component) return { error: `Unknown component: ${name}` }

  const attrsStart = openMatch.index + openMatch[0].indexOf(name) + name.length
  const tagEnd = findOpeningTagEnd(cleaned, attrsStart)
  if (tagEnd < 0) return { error: 'Malformed opening tag' }

  const attrs = cleaned.slice(attrsStart, tagEnd).trim()
  const isSelfClosing = cleaned[tagEnd] === '/' && cleaned[tagEnd + 1] === '>'

  let children = ''
  if (!isSelfClosing) {
    const closeTag = `</${name}>`
    const closeIndex = cleaned.lastIndexOf(closeTag)
    if (closeIndex > tagEnd) {
      children = cleaned.slice(tagEnd + 1, closeIndex).trim()
    }
  }

  const props = parseAttributes(attrs)
  if (name === 'Card' && !props.motion) {
    props.motion = 'liftShadow'
  }

  return {
    Component,
    name,
    props,
    children: children || undefined,
    error: null,
  }
}
