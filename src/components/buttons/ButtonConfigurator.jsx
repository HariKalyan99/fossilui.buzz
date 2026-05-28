import { useEffect, useMemo, useState } from 'react'
import { Mail } from 'lucide-react'
import { Button } from '@fossilui/react'
import { CodeEditor } from '../code/CodeEditor'
import { cn } from '../../lib/cn'
import { parseButtonSnippet } from './parseButtonSnippet'

const MOTIONS = [
  'rollText',
  'staggerText',
  'slideFill',
  'shineSweep',
  'borderReveal',
  'iconSlide',
  'underlineGrow',
  'liftShadow',
  'letterSpacing',
  'skewFill',
]

const COLORS = [
  'default',
  'primary',
  'secondary',
  'info',
  'teal',
  'cyan',
  'blue',
  'violet',
  'purple',
  'pink',
  'rose',
  'lime',
  'danger',
  'success',
  'warning',
]
const VARIANTS = ['solid', 'outlined', 'dashed', 'filled', 'text', 'link']
const SIZES = ['small', 'medium', 'large']
const SHAPES = ['default', 'round', 'circle']
const ICON_PLACEMENTS = ['start', 'end']
const DEFAULT_STATE = {
  label: 'Get Started',
  motion: 'liftShadow',
  color: 'primary',
  variant: 'solid',
  size: 'medium',
  shape: 'default',
  iconPlacement: 'start',
  loading: false,
  danger: false,
  ghost: false,
  block: false,
  disabled: false,
  withIcon: false,
}

const MOTION_RULES = {
  borderReveal: {
    allowVariant: false,
    allowColor: false,
    allowGhost: false,
    allowLoading: false,
    allowWithIcon: false,
    force: { variant: 'outlined', color: 'default', ghost: false },
  },
}

const SELECT_CLASS =
  'h-9 w-full min-w-0 rounded-md border border-neutral-200 bg-white px-2 text-[13px] text-neutral-800 outline-none transition-colors focus:border-indigo-300'

const NAMED_COMPONENT_MOTION_MAP = {
  RollTextButton: 'rollText',
  StaggerTextButton: 'staggerText',
  SlideFillButton: 'slideFill',
  ShineSweepButton: 'shineSweep',
  BorderRevealButton: 'borderReveal',
  IconSlideButton: 'iconSlide',
  UnderlineGrowButton: 'underlineGrow',
  LiftShadowButton: 'liftShadow',
  LetterSpacingButton: 'letterSpacing',
  SkewFillButton: 'skewFill',
}

export function ButtonConfigurator() {
  const [label, setLabel] = useState(DEFAULT_STATE.label)
  const [motion, setMotion] = useState(DEFAULT_STATE.motion)
  const [color, setColor] = useState(DEFAULT_STATE.color)
  const [variant, setVariant] = useState(DEFAULT_STATE.variant)
  const [size, setSize] = useState(DEFAULT_STATE.size)
  const [shape, setShape] = useState(DEFAULT_STATE.shape)
  const [iconPlacement, setIconPlacement] = useState(DEFAULT_STATE.iconPlacement)
  const [loading, setLoading] = useState(DEFAULT_STATE.loading)
  const [danger, setDanger] = useState(DEFAULT_STATE.danger)
  const [ghost, setGhost] = useState(DEFAULT_STATE.ghost)
  const [block, setBlock] = useState(DEFAULT_STATE.block)
  const [disabled, setDisabled] = useState(DEFAULT_STATE.disabled)
  const [withIcon, setWithIcon] = useState(DEFAULT_STATE.withIcon)
  const [editableSnippet, setEditableSnippet] = useState('')
  const [snippetSource, setSnippetSource] = useState('controls')

  const rules = MOTION_RULES[motion] ?? {}
  const isCircle = shape === 'circle'
  const allowVariant = rules.allowVariant !== false
  const allowColor = rules.allowColor !== false
  const allowGhost = rules.allowGhost !== false
  const allowLoading = rules.allowLoading !== false
  const allowWithIcon = rules.allowWithIcon !== false

  const effectiveVariant = allowVariant ? variant : (rules.force?.variant ?? DEFAULT_STATE.variant)
  const baseColor = allowColor ? color : (rules.force?.color ?? DEFAULT_STATE.color)
  const effectiveDanger = danger && allowColor
  const effectiveColor = effectiveDanger ? 'danger' : baseColor
  const effectiveGhost = allowGhost ? ghost : (rules.force?.ghost ?? false)
  const effectiveLoading = allowLoading ? loading : false
  const effectiveWithIcon =
    (allowWithIcon ? withIcon : false) || isCircle
  const effectiveBlock = isCircle ? false : block
  const buttonLabel = (label || 'Button').trim() || 'Button'
  const previewChildren = isCircle ? '' : buttonLabel

  const previewProps = {
    motion,
    color: effectiveColor,
    variant: effectiveVariant,
    size,
    shape,
    iconPlacement,
    loading: effectiveLoading,
    danger: effectiveDanger,
    ghost: effectiveGhost,
    block: effectiveBlock,
    disabled,
    ...(effectiveWithIcon ? { icon: <Mail className="h-4 w-4" aria-hidden /> } : {}),
  }

  const snippet = useMemo(() => {
    const parts = [`motion="${motion}"`]
    if (effectiveColor !== 'default') parts.push(`color="${effectiveColor}"`)
    if (effectiveVariant !== 'solid') parts.push(`variant="${effectiveVariant}"`)
    if (size !== 'medium') parts.push(`size="${size}"`)
    if (shape !== 'default') parts.push(`shape="${shape}"`)
    if (iconPlacement !== 'start') parts.push(`iconPlacement="${iconPlacement}"`)
    if (effectiveDanger) parts.push('danger')
    if (effectiveGhost) parts.push('ghost')
    if (effectiveBlock) parts.push('block')
    if (disabled) parts.push('disabled')
    if (effectiveLoading) parts.push('loading')
    if (effectiveWithIcon) parts.push('icon={<Mail className="h-4 w-4" />}')

    const attrs = parts.length ? `\n  ${parts.join('\n  ')}` : ''
    const iconImport = effectiveWithIcon ? `import { Mail } from 'lucide-react'\n` : ''

    return `${iconImport}import { Button } from '@fossilui/react'\n\n<Button${attrs}\n>${isCircle ? '' : `\n  ${buttonLabel}\n`}</Button>`
  }, [
    motion,
    effectiveColor,
    effectiveVariant,
    size,
    shape,
    iconPlacement,
    effectiveDanger,
    effectiveGhost,
    effectiveBlock,
    disabled,
    effectiveLoading,
    effectiveWithIcon,
    isCircle,
    buttonLabel,
  ])

  useEffect(() => {
    if (snippetSource === 'controls') {
      setEditableSnippet(snippet)
    }
  }, [snippet, snippetSource])

  const parsedSnippet = useMemo(() => parseButtonSnippet(editableSnippet), [editableSnippet])

  useEffect(() => {
    if (snippetSource !== 'code' || parsedSnippet?.error) return

    const parsedProps = parsedSnippet.props ?? {}
    const parsedName = parsedSnippet.name
    const parsedMotion =
      parsedName === 'Button'
        ? parsedProps.motion
        : NAMED_COMPONENT_MOTION_MAP[parsedName]
    const nextMotion = MOTIONS.includes(parsedMotion) ? parsedMotion : DEFAULT_STATE.motion
    const nextColor = COLORS.includes(parsedProps.color) ? parsedProps.color : DEFAULT_STATE.color
    const nextVariant = VARIANTS.includes(parsedProps.variant) ? parsedProps.variant : DEFAULT_STATE.variant
    const nextSize = SIZES.includes(parsedProps.size) ? parsedProps.size : DEFAULT_STATE.size
    const nextShape = SHAPES.includes(parsedProps.shape) ? parsedProps.shape : DEFAULT_STATE.shape
    const nextIconPlacement = ICON_PLACEMENTS.includes(parsedProps.iconPlacement)
      ? parsedProps.iconPlacement
      : DEFAULT_STATE.iconPlacement

    setMotion(nextMotion)
    setColor(nextColor)
    setVariant(nextVariant)
    setSize(nextSize)
    setShape(nextShape)
    setIconPlacement(nextIconPlacement)
    setDanger(Boolean(parsedProps.danger))
    setGhost(Boolean(parsedProps.ghost))
    setBlock(Boolean(parsedProps.block))
    setDisabled(Boolean(parsedProps.disabled))
    setLoading(Boolean(parsedProps.loading))
    setWithIcon(Boolean(parsedProps.icon))
    setLabel(nextShape === 'circle' ? '' : (parsedSnippet.children || DEFAULT_STATE.label))
  }, [parsedSnippet, snippetSource])

  const applyDefaults = (nextMotion = DEFAULT_STATE.motion) => {
    setSnippetSource('controls')
    setLabel(DEFAULT_STATE.label)
    setMotion(nextMotion)
    setColor(DEFAULT_STATE.color)
    setVariant(DEFAULT_STATE.variant)
    setSize(DEFAULT_STATE.size)
    setShape(DEFAULT_STATE.shape)
    setIconPlacement(DEFAULT_STATE.iconPlacement)
    setLoading(DEFAULT_STATE.loading)
    setDanger(DEFAULT_STATE.danger)
    setGhost(DEFAULT_STATE.ghost)
    setBlock(DEFAULT_STATE.block)
    setDisabled(DEFAULT_STATE.disabled)
    setWithIcon(DEFAULT_STATE.withIcon)
  }

  const resetDefaults = () => {
    applyDefaults()
  }

  return (
    <article className="card min-w-0 overflow-hidden">
      <div className="border-b border-neutral-200/80 px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[15px] font-medium text-neutral-900 sm:text-base">Interactive configurator</h3>
          <button
            type="button"
            onClick={resetDefaults}
            className="inline-flex h-8 items-center rounded-md border border-neutral-200 bg-white px-3 text-[12px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Reset
          </button>
        </div>
        <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">
          Pick props from the panel or edit the code directly. Preview updates instantly from either source.
        </p>
      </div>

      <div className="grid min-w-0 gap-0 xl:grid-cols-[1.05fr_1fr]">
        <div className="min-w-0 border-b border-neutral-200/80 p-4 sm:p-5 xl:border-r xl:border-b-0">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
            Attributes
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            <label className="min-w-0 space-y-1.5">
              <span className="text-[12px] font-medium text-neutral-600">Label</span>
              <input
                value={label}
                onChange={(e) => {
                  setSnippetSource('controls')
                  setLabel(e.target.value)
                }}
                disabled={isCircle}
                className={cn(SELECT_CLASS, 'px-2.5')}
              />
            </label>

            <label className="min-w-0 space-y-1.5">
              <span className="text-[12px] font-medium text-neutral-600">Motion</span>
              <select value={motion} onChange={(e) => applyDefaults(e.target.value)} className={SELECT_CLASS}>
                {MOTIONS.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>

            <label className="min-w-0 space-y-1.5">
              <span className="text-[12px] font-medium text-neutral-600">Color</span>
              <select
                value={color}
                onChange={(e) => {
                  setSnippetSource('controls')
                  setColor(e.target.value)
                }}
                className={SELECT_CLASS}
                disabled={!allowColor}
              >
                {COLORS.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>

            <label className="min-w-0 space-y-1.5">
              <span className="text-[12px] font-medium text-neutral-600">Variant</span>
              <select
                value={effectiveVariant}
                onChange={(e) => {
                  setSnippetSource('controls')
                  setVariant(e.target.value)
                }}
                className={SELECT_CLASS}
                disabled={!allowVariant}
              >
                {VARIANTS.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>

            <label className="min-w-0 space-y-1.5">
              <span className="text-[12px] font-medium text-neutral-600">Size</span>
              <select
                value={size}
                onChange={(e) => {
                  setSnippetSource('controls')
                  setSize(e.target.value)
                }}
                className={SELECT_CLASS}
              >
                {SIZES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>

            <label className="min-w-0 space-y-1.5">
              <span className="text-[12px] font-medium text-neutral-600">Shape</span>
              <select
                value={shape}
                onChange={(e) => {
                  setSnippetSource('controls')
                  setShape(e.target.value)
                }}
                className={SELECT_CLASS}
              >
                {SHAPES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>

            <label className="min-w-0 space-y-1.5">
              <span className="text-[12px] font-medium text-neutral-600">Icon placement</span>
              <select
                value={iconPlacement}
                onChange={(e) => {
                  setSnippetSource('controls')
                  setIconPlacement(e.target.value)
                }}
                disabled={!effectiveWithIcon}
                className={SELECT_CLASS}
              >
                {ICON_PLACEMENTS.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { key: 'withIcon', label: 'With icon', value: withIcon, setter: setWithIcon },
              { key: 'loading', label: 'Loading', value: loading, setter: setLoading },
              { key: 'danger', label: 'Danger', value: danger, setter: setDanger },
              { key: 'ghost', label: 'Ghost', value: ghost, setter: setGhost },
              { key: 'block', label: 'Block', value: block, setter: setBlock },
              { key: 'disabled', label: 'Disabled', value: disabled, setter: setDisabled },
            ].map(({ key, label, value, setter }) => {
              const disabledByRules =
                (key === 'danger' && !allowColor) ||
                (key === 'ghost' && !allowGhost) ||
                (key === 'loading' && !allowLoading) ||
                (key === 'withIcon' && !allowWithIcon) ||
                (key === 'withIcon' && effectiveLoading) ||
                (key === 'loading' && effectiveWithIcon && !isCircle) ||
                (key === 'block' && isCircle)
              return (
              <label
                key={key}
                className={cn(
                  'inline-flex min-h-9 items-center gap-2 rounded-md border border-neutral-200 px-2.5 py-1.5',
                  disabledByRules && 'opacity-60',
                )}
              >
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 accent-indigo-600"
                  checked={value}
                  disabled={disabledByRules}
                  onChange={(e) => {
                    setSnippetSource('controls')
                    setter(e.target.checked)
                  }}
                />
                <span className="text-[12px] text-neutral-700">{label}</span>
              </label>
            )})}
          </div>
          {isCircle || !allowVariant || !allowColor || !allowLoading || !allowWithIcon ? (
            <p className="mt-3 text-[12px] text-neutral-500">
              Circle auto-enables icon and disables block. Some controls are disabled when the selected motion does not use them.
            </p>
          ) : null}
        </div>

        <div className="min-w-0 space-y-4 p-4 sm:p-5">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">Code</p>
          <CodeEditor
            value={editableSnippet}
            onChange={(value) => {
              setSnippetSource('code')
              setEditableSnippet(value)
            }}
            minHeight="160px"
          />
          {parsedSnippet?.error ? (
            <p className="text-[12px] text-amber-700">
              Snippet parse warning: {parsedSnippet.error}
            </p>
          ) : null}

          <p className="mb-2 mt-4 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
            Preview
          </p>
          <div
            className={cn(
              'flex min-h-[9rem] flex-col items-center justify-center rounded-lg',
              'overflow-y-visible border border-dashed border-neutral-200 bg-neutral-50/90 p-4 sm:min-h-[10rem] sm:p-6',
            )}
          >
            <div className={cn('flex w-full max-w-full items-center overflow-x-auto overflow-y-hidden px-1 py-2', effectiveBlock ? 'justify-stretch' : 'justify-center')}>
              {parsedSnippet?.error ? (
                <Button {...previewProps} className={cn('max-w-full shrink-0', effectiveBlock && 'w-full')}>
                  {previewChildren}
                </Button>
              ) : (
                <parsedSnippet.Component
                  {...parsedSnippet.props}
                  className={cn(
                    'max-w-full shrink-0',
                    parsedSnippet.props?.block && 'w-full',
                  )}
                >
                  {parsedSnippet.children}
                </parsedSnippet.Component>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
