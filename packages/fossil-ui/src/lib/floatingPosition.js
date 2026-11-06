/**
 * @param {DOMRect} trigger
 * @param {{ width: number, height: number }} menu
 * @param {{ side?: 'top' | 'bottom' | 'left' | 'right', align?: 'start' | 'center' | 'end', offset?: number, contained?: boolean, containerRect?: DOMRect | null }} options
 */
export function computeFloatingPosition(trigger, menu, options = {}) {
  const {
    side = 'bottom',
    align = 'start',
    offset = 6,
    contained = false,
    containerRect = null,
  } = options

  const pad = 8
  const viewW = typeof window !== 'undefined' ? window.innerWidth : 1024
  const viewH = typeof window !== 'undefined' ? window.innerHeight : 768

  let top = 0
  let left = 0

  if (side === 'bottom') {
    top = trigger.bottom + offset
    if (align === 'start') left = trigger.left
    else if (align === 'end') left = trigger.right - menu.width
    else left = trigger.left + trigger.width / 2 - menu.width / 2
  } else if (side === 'top') {
    top = trigger.top - menu.height - offset
    if (align === 'start') left = trigger.left
    else if (align === 'end') left = trigger.right - menu.width
    else left = trigger.left + trigger.width / 2 - menu.width / 2
  } else if (side === 'left') {
    left = trigger.left - menu.width - offset
    top = trigger.top + trigger.height / 2 - menu.height / 2
  } else {
    left = trigger.right + offset
    top = trigger.top + trigger.height / 2 - menu.height / 2
  }

  if (contained && containerRect) {
    left -= containerRect.left
    top -= containerRect.top
    const maxLeft = containerRect.width - menu.width - pad
    const maxTop = containerRect.height - menu.height - pad
    left = Math.min(Math.max(pad, left), Math.max(pad, maxLeft))
    top = Math.min(Math.max(pad, top), Math.max(pad, maxTop))
    return { top, left, strategy: 'absolute' }
  }

  left = Math.min(Math.max(pad, left), Math.max(pad, viewW - menu.width - pad))
  top = Math.min(Math.max(pad, top), Math.max(pad, viewH - menu.height - pad))

  return { top, left, strategy: 'fixed' }
}
