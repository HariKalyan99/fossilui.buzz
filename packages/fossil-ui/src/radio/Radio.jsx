import { useId, useState } from 'react'
import { cn } from '../lib/cn.js'
import { splitMotionProps } from '../lib/animationTiming.js'
import { TOGGLE_COLORS, toggleAccent, toggleColorTokens } from '../toggles/colors.js'

export const RADIO_MOTIONS = ['scale', 'pulse', 'glow']

const TIMING =
  'delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,260ms)] ease-[var(--fossil-ease,var(--fossil-ease-out))] motion-reduce:transition-none'

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
 * @param {typeof RADIO_MOTIONS[number]} [props.motion]
 * @param {typeof TOGGLE_COLORS[number]} [props.color]
 * @param {Array<{ value: string, label: import('react').ReactNode, disabled?: boolean }>} [props.items]
 * @param {string} [props.value]
 * @param {string} [props.defaultValue]
 * @param {(value: string) => void} [props.onValueChange]
 * @param {boolean} [props.disabled]
 * @param {'vertical' | 'horizontal'} [props.orientation]
 */
export function Radio(props) {
  const { rest, style } = splitMotionProps(props)
  const {
    motion = 'scale',
    color,
    items = [],
    value,
    defaultValue,
    onValueChange,
    disabled = false,
    orientation = 'vertical',
    className,
    name: nameProp,
    ...dom
  } = rest

  const resolved = RADIO_MOTIONS.includes(motion) ? motion : 'scale'
  const accent = toggleColorTokens(color, resolved)
  const fallback = items.find((item) => !item.disabled)?.value ?? items[0]?.value
  const [current, setCurrent] = useControllable(value, defaultValue ?? fallback, onValueChange)
  const baseId = useId()
  const name = nameProp ?? baseId
  const enabled = items.filter((item) => !item.disabled)

  const onKeyDown = (event) => {
    if (!enabled.length) return
    const index = enabled.findIndex((item) => item.value === current)
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      const next = enabled[(index + 1 + enabled.length) % enabled.length]
      setCurrent(next.value)
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault()
      const next = enabled[(index - 1 + enabled.length) % enabled.length]
      setCurrent(next.value)
    } else if (event.key === 'Home') {
      event.preventDefault()
      setCurrent(enabled[0].value)
    } else if (event.key === 'End') {
      event.preventDefault()
      setCurrent(enabled[enabled.length - 1].value)
    }
  }

  return (
    <div
      role="radiogroup"
      aria-orientation={orientation}
      data-motion={resolved}
      data-color={toggleAccent(color, resolved)}
      onKeyDown={onKeyDown}
      className={cn(
        'flex max-w-full gap-2.5',
        orientation === 'horizontal' ? 'flex-row flex-wrap items-center' : 'flex-col items-start',
        disabled && 'opacity-50',
        className,
      )}
      style={style}
      {...dom}
    >
      {items.map((item) => {
        const selected = item.value === current
        const itemDisabled = disabled || item.disabled
        const optionId = `${baseId}-${item.value}`
        return (
          <label
            key={item.value}
            className={cn(
              'inline-flex max-w-full cursor-pointer items-center gap-2.5',
              itemDisabled && 'cursor-not-allowed opacity-50',
            )}
          >
            <button
              id={optionId}
              type="button"
              role="radio"
              name={name}
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              disabled={itemDisabled}
              onClick={() => {
                if (!itemDisabled) setCurrent(item.value)
              }}
              className={cn(
                'relative inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                'focus-visible:outline-none focus-visible:ring-2',
                accent.focusRing,
                TIMING,
                'transition-[border-color,background-color,box-shadow]',
                selected
                  ? cn('bg-white', accent.ring, resolved === 'glow' && accent.glowShadow)
                  : 'border-neutral-300 bg-white',
              )}
            >
              {resolved === 'pulse' && selected ? (
                <span
                  aria-hidden
                  className={cn(
                    'pointer-events-none absolute inset-[-3px] rounded-full border',
                    accent.pulseRing,
                    TIMING,
                    'animate-ping opacity-40 motion-reduce:animate-none',
                  )}
                />
              ) : null}
              <span
                aria-hidden
                className={cn(
                  'block h-2.5 w-2.5 rounded-full',
                  TIMING,
                  'transition-[transform,opacity,filter,clip-path,background-color]',
                  selected ? accent.dot : 'bg-neutral-900',
                  dotClass(resolved, selected),
                )}
              />
            </button>
            <span className="min-w-0 self-center text-[13px] font-medium leading-none text-neutral-800">
              {item.label}
            </span>
          </label>
        )
      })}
    </div>
  )
}

function dotClass(motion, selected) {
  switch (motion) {
    case 'pulse':
      return selected ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
    case 'glow':
      return selected ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
    case 'scale':
    default:
      return selected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
  }
}

export function ScaleRadio(props) {
  return <Radio {...props} motion="scale" />
}
export function PulseRadio(props) {
  return <Radio {...props} motion="pulse" />
}
export function GlowRadio(props) {
  return <Radio {...props} motion="glow" />
}
