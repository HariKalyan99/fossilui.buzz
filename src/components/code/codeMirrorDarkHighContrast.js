import { EditorView } from '@codemirror/view'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags } from '@lezer/highlight'

/** VS Code Dark High Contrast–inspired palette */
export const CODE_MIRROR_HC = {
  background: '#000000',
  foreground: '#ffffff',
  gutter: '#ffffff',
  gutterActive: '#ffffff',
  gutterMuted: '#b0b0b0',
  selection: '#008000',
  activeLine: '#0a0a0a',
  activeLineGutter: '#0a0a0a',
  cursor: '#ffffff',
  keyword: '#1aebff',
  string: '#ce9178',
  comment: '#7ca668',
  function: '#dcdcaa',
  variable: '#9cdcfe',
  number: '#b5cea8',
  type: '#569cd6',
  operator: '#ffffff',
  tag: '#569cd6',
  attribute: '#9cdcfe',
  heading: '#ffffff',
  invalid: '#f44747',
}

const darkHighContrastTheme = EditorView.theme(
  {
    '&': {
      color: CODE_MIRROR_HC.foreground,
      backgroundColor: CODE_MIRROR_HC.background,
    },
    '.cm-content': {
      caretColor: CODE_MIRROR_HC.cursor,
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: CODE_MIRROR_HC.cursor,
    },
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      {
        backgroundColor: CODE_MIRROR_HC.selection,
      },
    '.cm-activeLine': {
      backgroundColor: CODE_MIRROR_HC.activeLine,
    },
    '.cm-gutters': {
      backgroundColor: CODE_MIRROR_HC.background,
      color: CODE_MIRROR_HC.gutterMuted,
      border: 'none',
    },
    '.cm-activeLineGutter': {
      backgroundColor: CODE_MIRROR_HC.activeLineGutter,
      color: CODE_MIRROR_HC.gutterActive,
    },
    '.cm-lineNumbers .cm-gutterElement': {
      color: CODE_MIRROR_HC.gutterMuted,
    },
    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      border: 'none',
      color: CODE_MIRROR_HC.foreground,
    },
    '.cm-selectionMatch': {
      backgroundColor: 'rgba(0, 128, 0, 0.35)',
      outline: `1px solid ${CODE_MIRROR_HC.selection}`,
    },
    '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      outline: '1px solid #ffffff',
    },
  },
  { dark: true },
)

const darkHighContrastHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: CODE_MIRROR_HC.keyword },
  { tag: [tags.name, tags.deleted, tags.character, tags.propertyName, tags.macroName], color: CODE_MIRROR_HC.variable },
  { tag: [tags.function(tags.variableName), tags.labelName], color: CODE_MIRROR_HC.function },
  {
    tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)],
    color: CODE_MIRROR_HC.number,
  },
  { tag: [tags.definition(tags.name), tags.separator], color: CODE_MIRROR_HC.foreground },
  {
    tag: [
      tags.typeName,
      tags.className,
      tags.number,
      tags.changed,
      tags.annotation,
      tags.modifier,
      tags.self,
      tags.namespace,
    ],
    color: CODE_MIRROR_HC.type,
  },
  {
    tag: [
      tags.operator,
      tags.operatorKeyword,
      tags.url,
      tags.escape,
      tags.regexp,
      tags.link,
      tags.special(tags.string),
    ],
    color: CODE_MIRROR_HC.operator,
  },
  { tag: [tags.meta, tags.comment], color: CODE_MIRROR_HC.comment },
  { tag: tags.strong, fontWeight: 'bold' },
  { tag: tags.emphasis, fontStyle: 'italic' },
  { tag: tags.strikethrough, textDecoration: 'line-through' },
  { tag: tags.heading, fontWeight: 'bold', color: CODE_MIRROR_HC.heading },
  { tag: [tags.atom, tags.bool, tags.special(tags.variableName)], color: CODE_MIRROR_HC.number },
  { tag: [tags.processingInstruction, tags.string, tags.inserted], color: CODE_MIRROR_HC.string },
  { tag: [tags.tagName], color: CODE_MIRROR_HC.tag },
  { tag: [tags.attributeName], color: CODE_MIRROR_HC.attribute },
  { tag: tags.invalid, color: CODE_MIRROR_HC.invalid },
])

/** CodeMirror extension: editor chrome + syntax (Dark High Contrast). */
export const darkHighContrast = [darkHighContrastTheme, syntaxHighlighting(darkHighContrastHighlight)]
