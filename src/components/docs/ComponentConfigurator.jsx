import { useMemo, useState } from 'react'
import { CodeEditor } from '../code/CodeEditor'
import { cn } from '../../lib/cn'
import { parseComponentSnippet } from './parseComponentSnippet'

export const SELECT_CLASS =
  'h-9 w-full min-w-0 rounded-md border border-neutral-200 bg-white px-2 text-[13px] text-neutral-800 outline-none transition-colors focus:border-indigo-300'

/**
 * @typedef {object} ConfiguratorField
 * @property {string} key State key (usually the prop name).
 * @property {string} label
 * @property {'text' | 'select' | 'checkbox'} type
 * @property {string[]} [options] Select options.
 * @property {string} [placeholder]
 * @property {boolean} [wide] Span both columns.
 * @property {(state: Record<string, unknown>) => boolean} [disabledWhen]
 * @property {(propValue: unknown) => unknown} [fromProp] Convert a parsed prop back to control state.
 *
 * @typedef {object} ConfiguratorSchema
 * @property {string} wrapperName e.g. "Modal"
 * @property {Record<string, import('react').ComponentType>} componentMap Tag name -> component.
 * @property {Record<string, string>} namedMotions Named variant -> motion value.
 * @property {string[]} motions
 * @property {Record<string, unknown>} defaults Must include `motion`.
 * @property {ConfiguratorField[]} fields Non-motion controls.
 * @property {(state: Record<string, unknown>) => string} buildSnippet
 * @property {(state: Record<string, unknown>) => Record<string, unknown>} propsFromState Props for the wrapper.
 * @property {(args: { Component: import('react').ComponentType, props: Record<string, unknown>, previewKey: string }) => import('react').ReactNode} renderPreview
 * @property {'side' | 'below'} [previewPlacement] "below" gives wide components (navbars, heroes) the full width.
 * @property {string} [previewClassName]
 * @property {string} [description]
 */

function stateFromParsed(schema, parsed) {
  const { props, name } = parsed
  const next = { ...schema.defaults }

  for (const field of schema.fields) {
    const raw = props[field.key]
    const value = field.fromProp ? field.fromProp(raw) : raw
    if (field.type === 'checkbox') {
      next[field.key] = typeof value === 'boolean' ? value : schema.defaults[field.key]
    } else if (field.type === 'select') {
      next[field.key] = field.options.includes(value) ? value : schema.defaults[field.key]
    } else {
      next[field.key] = typeof value === 'string' ? value : ''
    }
  }

  const motion = name === schema.wrapperName ? props.motion : schema.namedMotions[name]
  next.motion = schema.motions.includes(motion) ? motion : schema.defaults.motion
  return next
}

function Field({ field, value, disabled, onChange }) {
  if (field.type === 'checkbox') {
    return (
      <label className="inline-flex min-h-9 items-center gap-2 rounded-md border border-neutral-200 px-2.5 py-1.5">
        <input
          type="checkbox"
          className="h-3.5 w-3.5 accent-indigo-600"
          checked={Boolean(value)}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="text-[12px] text-neutral-700">{field.label}</span>
      </label>
    )
  }

  return (
    <label className={cn('min-w-0 space-y-1.5', field.wide && 'md:col-span-2')}>
      <span className="text-[12px] font-medium text-neutral-600">{field.label}</span>
      {field.type === 'select' ? (
        <select
          value={String(value)}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={cn(SELECT_CLASS, disabled && 'opacity-60')}
        >
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          value={String(value ?? '')}
          disabled={disabled}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={cn(SELECT_CLASS, 'px-2.5', disabled && 'opacity-60')}
        />
      )}
    </label>
  )
}

/** @param {{ schema: ConfiguratorSchema }} props */
export function ComponentConfigurator({ schema }) {
  const [state, setState] = useState(schema.defaults)
  const [code, setCode] = useState(() => schema.buildSnippet(schema.defaults))

  const parsed = useMemo(
    () =>
      parseComponentSnippet(code, {
        componentMap: schema.componentMap,
        wrapperName: schema.wrapperName,
        defaultMotion: schema.defaults.motion,
      }),
    [code, schema],
  )

  const updateControl = (key, value) => {
    const next = { ...state, [key]: value }
    setState(next)
    setCode(schema.buildSnippet(next))
  }

  const updateCode = (value) => {
    setCode(value)
    const result = parseComponentSnippet(value, {
      componentMap: schema.componentMap,
      wrapperName: schema.wrapperName,
      defaultMotion: schema.defaults.motion,
    })
    if (!result.error) setState(stateFromParsed(schema, result))
  }

  const reset = () => {
    setState(schema.defaults)
    setCode(schema.buildSnippet(schema.defaults))
  }

  const preview = parsed.error
    ? { Component: schema.componentMap[schema.wrapperName], props: schema.propsFromState(state) }
    : { Component: parsed.Component, props: parsed.props }
  // Only a motion/component switch remounts (and replays) the preview; prop edits update in place.
  const previewKey = `${parsed.name ?? schema.wrapperName}-${preview.props.motion ?? ''}`

  const selectFields = schema.fields.filter((field) => field.type !== 'checkbox')
  const checkboxFields = schema.fields.filter((field) => field.type === 'checkbox')
  const below = schema.previewPlacement === 'below'

  const previewPanel = (
    <div className={cn(below && 'border-t border-neutral-200/80 p-4 sm:p-5')}>
      <p
        className={cn(
          'mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400',
          below ? 'mt-0' : 'mt-4',
        )}
      >
        Preview
      </p>
      <div
        className={cn(
          'relative isolate flex min-h-[12rem] flex-col items-center justify-center rounded-lg',
          'overflow-hidden border border-dashed border-neutral-200 bg-neutral-50/90 p-4 sm:min-h-[14rem] sm:p-6',
          schema.previewClassName,
        )}
      >
        {schema.renderPreview({ ...preview, previewKey })}
      </div>
    </div>
  )

  return (
    <article className="card min-w-0 overflow-hidden">
      <div className="border-b border-neutral-200/80 px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[15px] font-medium text-neutral-900 sm:text-base">Interactive configurator</h3>
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-8 items-center rounded-md border border-neutral-200 bg-white px-3 text-[12px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Reset
          </button>
        </div>
        <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">
          {schema.description ??
            'Pick props from the panel or edit the code directly — including className and style. Preview updates instantly from either source.'}
        </p>
      </div>

      <div className="grid min-w-0 gap-0 xl:grid-cols-[1.05fr_1fr]">
        <div className="min-w-0 border-b border-neutral-200/80 p-4 sm:p-5 xl:border-r xl:border-b-0">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
            Attributes
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            <Field
              field={{ key: 'motion', label: 'Motion', type: 'select', options: schema.motions }}
              value={state.motion}
              onChange={(value) => updateControl('motion', value)}
            />
            {selectFields.map((field) => (
              <Field
                key={field.key}
                field={field}
                value={state[field.key]}
                disabled={field.disabledWhen?.(state)}
                onChange={(value) => updateControl(field.key, value)}
              />
            ))}
          </div>

          {checkboxFields.length ? (
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {checkboxFields.map((field) => (
                <Field
                  key={field.key}
                  field={field}
                  value={state[field.key]}
                  disabled={field.disabledWhen?.(state)}
                  onChange={(value) => updateControl(field.key, value)}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="min-w-0 space-y-4 p-4 sm:p-5">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">Code</p>
          <CodeEditor value={code} onChange={updateCode} minHeight="160px" />
          {parsed.error ? (
            <p className="text-[12px] text-amber-700">Snippet parse warning: {parsed.error}</p>
          ) : null}
          {below ? null : previewPanel}
        </div>
      </div>

      {below ? previewPanel : null}
    </article>
  )
}
