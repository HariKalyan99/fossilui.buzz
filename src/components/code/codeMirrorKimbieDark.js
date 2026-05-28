import { EditorView } from '@codemirror/view'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags } from '@lezer/highlight'

/** VS Code Kimbie Dark palette */
export const CODE_MIRROR_KIMBIE = {
  background: '#221a0f',
  foreground: '#d3af86',
  lineHighlight: '#5e452b',
  selection: 'rgba(132, 97, 61, 0.67)',
  gutter: '#a57a4c',
  gutterActive: '#adadad',
  cursor: '#d3af86',
  comment: '#a57a4c',
  keyword: '#98676a',
  variable: '#dc3958',
  function: '#8ab1b0',
  class: '#f06431',
  constant: '#f79a32',
  string: '#889b4a',
  regexp: '#7e602c',
  embedded: '#088649',
  operator: '#d3af86',
  invalid: '#dc3958',
}

const kimbieTheme = EditorView.theme(
  {
    '&': {
      color: CODE_MIRROR_KIMBIE.foreground,
      backgroundColor: CODE_MIRROR_KIMBIE.background,
    },
    '.cm-content': {
      caretColor: CODE_MIRROR_KIMBIE.cursor,
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: CODE_MIRROR_KIMBIE.cursor,
    },
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      {
        backgroundColor: CODE_MIRROR_KIMBIE.selection,
      },
    '.cm-activeLine': {
      backgroundColor: CODE_MIRROR_KIMBIE.lineHighlight,
    },
    '.cm-gutters': {
      backgroundColor: CODE_MIRROR_KIMBIE.background,
      color: CODE_MIRROR_KIMBIE.gutter,
      border: 'none',
    },
    '.cm-activeLineGutter': {
      backgroundColor: CODE_MIRROR_KIMBIE.lineHighlight,
      color: CODE_MIRROR_KIMBIE.gutterActive,
    },
    '.cm-lineNumbers .cm-gutterElement': {
      color: CODE_MIRROR_KIMBIE.gutter,
    },
    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      border: 'none',
      color: CODE_MIRROR_KIMBIE.foreground,
    },
    '.cm-selectionMatch': {
      backgroundColor: 'rgba(132, 97, 61, 0.45)',
      outline: `1px solid ${CODE_MIRROR_KIMBIE.gutter}`,
    },
    '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
      backgroundColor: 'rgba(211, 175, 134, 0.12)',
      outline: `1px solid ${CODE_MIRROR_KIMBIE.foreground}`,
    },
  },
  { dark: true },
)

const kimbieHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: CODE_MIRROR_KIMBIE.keyword },
  {
    tag: [tags.name, tags.deleted, tags.character, tags.propertyName, tags.macroName],
    color: CODE_MIRROR_KIMBIE.variable,
  },
  { tag: [tags.function(tags.variableName), tags.labelName], color: CODE_MIRROR_KIMBIE.function },
  {
    tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)],
    color: CODE_MIRROR_KIMBIE.constant,
  },
  { tag: [tags.definition(tags.name), tags.separator], color: CODE_MIRROR_KIMBIE.foreground },
  {
    tag: [
      tags.typeName,
      tags.className,
      tags.changed,
      tags.annotation,
      tags.modifier,
      tags.self,
      tags.namespace,
    ],
    color: CODE_MIRROR_KIMBIE.class,
  },
  {
    tag: [tags.number],
    color: CODE_MIRROR_KIMBIE.constant,
  },
  {
    tag: [
      tags.operator,
      tags.operatorKeyword,
      tags.url,
      tags.link,
      tags.special(tags.string),
    ],
    color: CODE_MIRROR_KIMBIE.operator,
  },
  {
    tag: [tags.escape, tags.regexp],
    color: CODE_MIRROR_KIMBIE.regexp,
  },
  { tag: [tags.meta, tags.comment], color: CODE_MIRROR_KIMBIE.comment, fontStyle: 'italic' },
  { tag: tags.strong, fontWeight: 'bold', color: CODE_MIRROR_KIMBIE.class },
  { tag: tags.emphasis, fontStyle: 'italic', color: CODE_MIRROR_KIMBIE.keyword },
  { tag: tags.strikethrough, textDecoration: 'line-through' },
  { tag: tags.heading, fontWeight: 'bold', color: CODE_MIRROR_KIMBIE.function },
  { tag: [tags.atom, tags.bool, tags.special(tags.variableName)], color: CODE_MIRROR_KIMBIE.constant },
  { tag: [tags.processingInstruction, tags.string, tags.inserted], color: CODE_MIRROR_KIMBIE.string },
  { tag: [tags.tagName], color: CODE_MIRROR_KIMBIE.variable },
  { tag: [tags.attributeName], color: CODE_MIRROR_KIMBIE.constant },
  { tag: tags.invalid, color: CODE_MIRROR_KIMBIE.invalid },
])

/** CodeMirror extension: editor chrome + syntax (Kimbie Dark). */
export const kimbieDark = [kimbieTheme, syntaxHighlighting(kimbieHighlight)]
