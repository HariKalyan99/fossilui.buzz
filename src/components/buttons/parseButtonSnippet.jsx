import { Mail } from 'lucide-react'
import {
  Button,
  RollTextButton,
  StaggerTextButton,
  SlideFillButton,
  ShineSweepButton,
  BorderRevealButton,
  IconSlideButton,
  UnderlineGrowButton,
  LiftShadowButton,
  LetterSpacingButton,
  SkewFillButton,
} from '@fossilui/react'

export const BUTTON_COMPONENT_MAP = {
  Button,
  RollTextButton,
  StaggerTextButton,
  SlideFillButton,
  ShineSweepButton,
  BorderRevealButton,
  IconSlideButton,
  UnderlineGrowButton,
  LiftShadowButton,
  LetterSpacingButton,
  SkewFillButton,
}

const BOOLEAN_PROPS = [
  'loading',
  'danger',
  'block',
  'ghost',
  'disabled',
  'autoInsertSpace',
  'icon',
]

const STRING_PROPS = [
  'motion',
  'size',
  'color',
  'variant',
  'href',
  'target',
  'iconPlacement',
  'shape',
  'htmlType',
  'type',
]

const PREVIEW_ICON = <Mail className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />

/**
 * @param {string} str
 */
function stripJsxComments(str) {
  return str.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/\/\/[^\n]*/g, ' ')
}

/**
 * Find end of opening tag `>` (ignores > inside strings, braces, comments).
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
  const open = code.match(/^<(Button|\w+Button)\s*/)
  if (!open) return null

  const name = open[1]
  const attrStart = open[0].length
  const tagEnd = findOpeningTagEnd(code, attrStart)
  if (!tagEnd) return null

  const attrString = stripJsxComments(code.slice(attrStart, tagEnd.selfClosing ? tagEnd.index - 1 : tagEnd.index))
  const afterTag = code.slice(tagEnd.index + 1).trim()

  return { name, attrString, selfClosing: tagEnd.selfClosing, afterTag }
}

function parseAttrs(attrString) {
  const props = {}
  const attrs = attrString.trim()

  for (const key of BOOLEAN_PROPS) {
    if (key === 'icon') {
      if (
        /(?:^|\s)icon\s*(?:\/>|>|$)/.test(attrs) ||
        /(?:^|\s)icon\s*=\s*["']?(?:true)?["']?/.test(attrs) ||
        /\bicon\s*=\s*\{/.test(attrs)
      ) {
        props.icon = PREVIEW_ICON
      }
      continue
    }

    if (new RegExp(`(?:^|\\s)${key}(?:\\s|$|(?==))`).test(attrs)) {
      props[key] = true
    }
  }

  for (const key of STRING_PROPS) {
    const m = attrs.match(new RegExp(`${key}\\s*=\\s*["']([^"']+)["']`))
    if (m) props[key] = m[1]
  }

  return props
}

/**
 * @param {string} raw
 */
function cleanLabel(raw) {
  return stripJsxComments(raw)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Strip leading import lines so previews work on paste-ready snippets.
 * @param {string} code
 */
function extractJsxFromSnippet(code) {
  const tagIndex = code.search(/<(Button|\w+Button)\b/)
  if (tagIndex === -1) return code.trim()
  return code.slice(tagIndex).trim()
}

/**
 * Parse a small JSX snippet for live button previews.
 * @param {string} code
 */
export function parseButtonSnippet(code) {
  const trimmed = code.trim()
  if (!trimmed) {
    return { error: 'Enter a button JSX snippet to preview.' }
  }

  const jsx = extractJsxFromSnippet(trimmed)
  const opening = parseOpeningTag(jsx)
  if (!opening) {
    return {
      error: 'Include a button component, e.g. <Button motion="liftShadow">Label</Button>',
    }
  }

  const { name, attrString, selfClosing, afterTag } = opening
  const Component = BUTTON_COMPONENT_MAP[name]

  if (!Component) {
    return {
      error: `Unknown component "${name}". Try <Button motion="liftShadow">...</Button> or LiftShadowButton.`,
    }
  }

  let childrenRaw = ''

  if (selfClosing) {
    childrenRaw = ''
  } else {
    const closeTag = new RegExp(`^([\\s\\S]*?)</${name}>\\s*$`)
    const bodyMatch = afterTag.match(closeTag)
    if (!bodyMatch) {
      return { error: `Close with </${name}> after the label.` }
    }
    childrenRaw = bodyMatch[1]
  }

  const props = parseAttrs(attrString)
  const children = cleanLabel(childrenRaw) || 'Button'

  return { Component, name, props, children, error: null }
}
