import { useEffect, useMemo, useState } from 'react'
import { Card } from '@fossilui/react'
import { CodeEditor } from '../code/CodeEditor'
import { cn } from '../../lib/cn'
import { CARD_DEMO_IMAGE, CARD_DEMO_IMAGE_ALT } from '../../data/cardDemo'
import { parseCardSnippet } from './parseCardSnippet'

const MOTIONS = [
  'liftShadow',
  'borderGlow',
  'imageZoom',
  'shineSweep',
  'gradientShift',
  'scaleUp',
  'accentReveal',
  'tiltHover',
]

const ACCENTS = ['default', 'primary', 'violet', 'teal', 'rose']
const SIZES = ['compact', 'default', 'roomy']

const DEFAULT_STATE = {
  title: 'Fossil UI',
  tagline: 'Production-ready components for modern developers.',
  motion: 'liftShadow',
  accent: 'default',
  size: 'default',
  withMedia: true,
  interactive: true,
  href: '',
  imageSrc: CARD_DEMO_IMAGE,
  imageAlt: CARD_DEMO_IMAGE_ALT,
}

const SELECT_CLASS =
  'h-9 w-full min-w-0 rounded-md border border-neutral-200 bg-white px-2 text-[13px] text-neutral-800 outline-none transition-colors focus:border-indigo-300'

const NAMED_COMPONENT_MOTION_MAP = {
  LiftShadowCard: 'liftShadow',
  BorderGlowCard: 'borderGlow',
  ImageZoomCard: 'imageZoom',
  ShineSweepCard: 'shineSweep',
  GradientShiftCard: 'gradientShift',
  ScaleUpCard: 'scaleUp',
  AccentRevealCard: 'accentReveal',
  TiltHoverCard: 'tiltHover',
}

export function CardConfigurator() {
  const [title, setTitle] = useState(DEFAULT_STATE.title)
  const [tagline, setTagline] = useState(DEFAULT_STATE.tagline)
  const [motion, setMotion] = useState(DEFAULT_STATE.motion)
  const [accent, setAccent] = useState(DEFAULT_STATE.accent)
  const [size, setSize] = useState(DEFAULT_STATE.size)
  const [withMedia, setWithMedia] = useState(DEFAULT_STATE.withMedia)
  const [interactive, setInteractive] = useState(DEFAULT_STATE.interactive)
  const [href, setHref] = useState(DEFAULT_STATE.href)
  const [imageSrc, setImageSrc] = useState(DEFAULT_STATE.imageSrc)
  const [imageAlt, setImageAlt] = useState(DEFAULT_STATE.imageAlt)
  const [editableSnippet, setEditableSnippet] = useState('')
  const [snippetSource, setSnippetSource] = useState('controls')

  const cardTitle = (title || 'Card title').trim() || 'Card title'
  const cardTagline = (tagline || '').trim()

  const previewProps = {
    motion,
    title: cardTitle,
    description: cardTagline,
    accent,
    size,
    withMedia,
    interactive,
    imageSrc: withMedia && imageSrc.trim() ? imageSrc.trim() : undefined,
    imageAlt: imageAlt.trim(),
    ...(href.trim() ? { href: href.trim() } : {}),
  }

  const snippet = useMemo(() => {
    const parts = [`motion="${motion}"`]
    if (withMedia && imageSrc.trim()) {
      parts.push(`imageSrc="${imageSrc.trim()}"`)
      if (imageAlt.trim()) parts.push(`imageAlt="${imageAlt.trim()}"`)
    }
    parts.push(`title="${cardTitle}"`)
    if (cardTagline) parts.push(`description="${cardTagline}"`)
    if (accent !== 'default') parts.push(`accent="${accent}"`)
    if (size !== 'default') parts.push(`size="${size}"`)
    if (!withMedia) parts.push('withMedia={false}')
    if (!interactive) parts.push('interactive={false}')
    if (href.trim()) parts.push(`href="${href.trim()}"`)

    const attrs = parts.map((part) => `  ${part}`).join('\n')

    return `import { Card } from '@fossilui/react'\n\n<Card\n${attrs}\n/>`
  }, [motion, cardTitle, cardTagline, accent, size, withMedia, interactive, href, imageSrc, imageAlt])

  useEffect(() => {
    if (snippetSource === 'controls') {
      setEditableSnippet(snippet)
    }
  }, [snippet, snippetSource])

  const parsedSnippet = useMemo(() => parseCardSnippet(editableSnippet), [editableSnippet])

  useEffect(() => {
    if (snippetSource !== 'code' || parsedSnippet?.error) return

    const parsedProps = parsedSnippet.props ?? {}
    const parsedName = parsedSnippet.name
    const parsedMotion =
      parsedName === 'Card' ? parsedProps.motion : NAMED_COMPONENT_MOTION_MAP[parsedName]
    const nextMotion = MOTIONS.includes(parsedMotion) ? parsedMotion : DEFAULT_STATE.motion
    const nextAccent = ACCENTS.includes(parsedProps.accent) ? parsedProps.accent : DEFAULT_STATE.accent
    const nextSize = SIZES.includes(parsedProps.size) ? parsedProps.size : DEFAULT_STATE.size

    setMotion(nextMotion)
    setAccent(nextAccent)
    setSize(nextSize)
    setWithMedia(parsedProps.withMedia !== false)
    setInteractive(parsedProps.interactive !== false)
    setHref(typeof parsedProps.href === 'string' ? parsedProps.href : '')
    setImageSrc(
      typeof parsedProps.imageSrc === 'string' ? parsedProps.imageSrc : DEFAULT_STATE.imageSrc,
    )
    setImageAlt(
      typeof parsedProps.imageAlt === 'string' ? parsedProps.imageAlt : DEFAULT_STATE.imageAlt,
    )
    setTitle(typeof parsedProps.title === 'string' ? parsedProps.title : DEFAULT_STATE.title)
    setTagline(
      typeof parsedProps.description === 'string'
        ? parsedProps.description
        : DEFAULT_STATE.tagline,
    )
  }, [parsedSnippet, snippetSource])

  const applyDefaults = (nextMotion = DEFAULT_STATE.motion) => {
    setSnippetSource('controls')
    setTitle(DEFAULT_STATE.title)
    setTagline(DEFAULT_STATE.tagline)
    setMotion(nextMotion)
    setAccent(DEFAULT_STATE.accent)
    setSize(DEFAULT_STATE.size)
    setWithMedia(DEFAULT_STATE.withMedia)
    setInteractive(DEFAULT_STATE.interactive)
    setHref(DEFAULT_STATE.href)
    setImageSrc(DEFAULT_STATE.imageSrc)
    setImageAlt(DEFAULT_STATE.imageAlt)
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
            <label className="min-w-0 space-y-1.5 md:col-span-2">
              <span className="text-[12px] font-medium text-neutral-600">Title</span>
              <input
                value={title}
                onChange={(e) => {
                  setSnippetSource('controls')
                  setTitle(e.target.value)
                }}
                className={cn(SELECT_CLASS, 'px-2.5')}
              />
            </label>

            <label className="min-w-0 space-y-1.5 md:col-span-2">
              <span className="text-[12px] font-medium text-neutral-600">Description</span>
              <input
                value={tagline}
                onChange={(e) => {
                  setSnippetSource('controls')
                  setTagline(e.target.value)
                }}
                className={cn(SELECT_CLASS, 'px-2.5')}
              />
            </label>

            <label className="min-w-0 space-y-1.5 md:col-span-2">
              <span className="text-[12px] font-medium text-neutral-600">Image URL</span>
              <input
                value={imageSrc}
                onChange={(e) => {
                  setSnippetSource('controls')
                  setImageSrc(e.target.value)
                }}
                disabled={!withMedia}
                placeholder="/14.jpg"
                className={cn(SELECT_CLASS, 'px-2.5', !withMedia && 'opacity-60')}
              />
            </label>

            <label className="min-w-0 space-y-1.5 md:col-span-2">
              <span className="text-[12px] font-medium text-neutral-600">Image alt</span>
              <input
                value={imageAlt}
                onChange={(e) => {
                  setSnippetSource('controls')
                  setImageAlt(e.target.value)
                }}
                disabled={!withMedia}
                className={cn(SELECT_CLASS, 'px-2.5', !withMedia && 'opacity-60')}
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
              <span className="text-[12px] font-medium text-neutral-600">Accent</span>
              <select
                value={accent}
                onChange={(e) => {
                  setSnippetSource('controls')
                  setAccent(e.target.value)
                }}
                className={SELECT_CLASS}
              >
                {ACCENTS.map((v) => (
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
              <span className="text-[12px] font-medium text-neutral-600">Href (optional)</span>
              <input
                value={href}
                onChange={(e) => {
                  setSnippetSource('controls')
                  setHref(e.target.value)
                }}
                placeholder="https://fossilui.buzz"
                className={cn(SELECT_CLASS, 'px-2.5')}
              />
            </label>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              { key: 'withMedia', label: 'With media', value: withMedia, setter: setWithMedia },
              { key: 'interactive', label: 'Interactive', value: interactive, setter: setInteractive },
            ].map(({ key, label, value, setter }) => (
              <label
                key={key}
                className="inline-flex min-h-9 items-center gap-2 rounded-md border border-neutral-200 px-2.5 py-1.5"
              >
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 accent-indigo-600"
                  checked={value}
                  onChange={(e) => {
                    setSnippetSource('controls')
                    setter(e.target.checked)
                  }}
                />
                <span className="text-[12px] text-neutral-700">{label}</span>
              </label>
            ))}
          </div>
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
              'flex min-h-[12rem] flex-col items-center justify-center rounded-lg',
              'overflow-y-visible border border-dashed border-neutral-200 bg-neutral-50/90 p-4 sm:min-h-[14rem] sm:p-6',
            )}
          >
            <div className="flex w-full max-w-sm items-center justify-center px-1 py-2">
              {parsedSnippet?.error ? (
                <Card className="w-full max-w-full" {...previewProps} />
              ) : (
                <parsedSnippet.Component
                  {...parsedSnippet.props}
                  className="w-full max-w-full"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
