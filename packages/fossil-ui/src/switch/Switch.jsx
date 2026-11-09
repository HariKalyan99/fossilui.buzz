import { useId, useState } from 'react'
import { cn } from '../lib/cn.js'
import { splitMotionProps } from '../lib/animationTiming.js'

export const SWITCH_MOTIONS = ['slide', 'bounce', 'glow']

const TIMING =
  'delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,280ms)] ease-[var(--fossil-ease,var(--fossil-ease-out))] motion-reduce:transition-none'

function useControllable(value, defaultValue, onChange) {
  const [internal, setInternal] = useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : internal
  const setCurrent = (next) => {
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }
  return [current, setCurrent]
}

/**
 * @param {object} props
 * @param {typeof SWITCH_MOTIONS[number]} [props.motion]
 * @param {boolean} [props.checked]
 * @param {boolean} [props.defaultChecked]
 * @param {(checked: boolean) => void} [props.onCheckedChange]
 * @param {boolean} [props.disabled]
 * @param {import('react').ReactNode} [props.label]
 */
export function Switch(props) {
  const { rest, style } = splitMotionProps(props)
  const {
    motion = 'slide',
    checked,
    defaultChecked = false,
    onCheckedChange,
    disabled = false,
    label,
    className,
    id: idProp,
    ...dom
  } = rest

  const resolved = SWITCH_MOTIONS.includes(motion) ? motion : 'slide'
  const [on, setOn] = useControllable(checked, defaultChecked, onCheckedChange)
  const reactId = useId()
  const id = idProp ?? reactId

  return (
    <label
      className={cn(
        'inline-flex max-w-full cursor-pointer items-center gap-3',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      style={style}
      data-motion={resolved}
      {...dom}
    >
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={on}
        disabled={disabled}
        onClick={() => setOn(!on)}
        className={cn(
          'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border p-0.5',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/45',
          TIMING,
          'transition-[background-color,border-color,box-shadow]',
          on
            ? cn(
                'border-neutral-900 bg-neutral-900',
                resolved === 'bounce' &&
                  'translate-y-[-1px] border-neutral-800 bg-neutral-800 shadow-[0_4px_0_0_rgb(23,23,23)]',
                resolved === 'glow' && 'border-indigo-500 bg-indigo-500 shadow-[0_0_18px_rgba(99,102,241,0.45)]',
              )
            : cn(
                'border-neutral-300 bg-neutral-200',
                resolved === 'bounce' && 'shadow-[0_3px_0_0_rgb(163,163,163)]',
              ),
        )}
      >
        <span
          aria-hidden
          className={cn(
            'relative z-[1] block h-5 w-5 rounded-full bg-white shadow-sm',
            TIMING,
            'transition-[transform,opacity,filter,box-shadow]',
            thumbClass(resolved, on),
          )}
        />
      </button>
      {label ? (
        <span className="min-w-0 self-center text-[13px] font-medium leading-none text-neutral-800">
          {label}
        </span>
      ) : null}
    </label>
  )
}

function thumbClass(motion, on) {
  switch (motion) {
    case 'bounce':
      return cn(
        on ? 'translate-x-5 scale-110' : 'translate-x-0 scale-100',
        'ease-[var(--fossil-ease,var(--fossil-ease-spring))]',
      )
    case 'glow':
      return on
        ? 'translate-x-5 shadow-[0_0_12px_rgba(255,255,255,0.85)]'
        : 'translate-x-0'
    case 'slide':
    default:
      return on ? 'translate-x-5' : 'translate-x-0'
  }
}

export function SlideSwitch(props) {
  return <Switch {...props} motion="slide" />
}
export function BounceSwitch(props) {
  return <Switch {...props} motion="bounce" />
}
export function GlowSwitch(props) {
  return <Switch {...props} motion="glow" />
}
