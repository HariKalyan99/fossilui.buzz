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

    // Prefer the requested side; if it cannot fit, flip top/bottom inside the preview.
    const triggerLocalTop = trigger.top - containerRect.top
    const triggerLocalBottom = trigger.bottom - containerRect.top
    const spaceAbove = triggerLocalTop - pad
    const spaceBelow = containerRect.height - triggerLocalBottom - pad
    if (side === 'top' || side === 'bottom') {
      const preferTop = side === 'top'
      const fitsPreferred = preferTop ? spaceAbove >= menu.height + offset : spaceBelow >= menu.height + offset
      const fitsFlip = preferTop ? spaceBelow >= menu.height + offset : spaceAbove >= menu.height + offset
      if (!fitsPreferred && fitsFlip) {
        top = preferTop
          ? triggerLocalBottom + offset
          : triggerLocalTop - menu.height - offset
      }
    }

    const maxLeft = containerRect.width - menu.width - pad
    const maxTop = containerRect.height - menu.height - pad
    left = Math.min(Math.max(pad, left), Math.max(pad, maxLeft))
    top = Math.min(Math.max(pad, top), Math.max(pad, maxTop))
    return { top, left, strategy: 'absolute' }
  }

  // Viewport: flip top/bottom when the preferred side does not fit.
  if (side === 'top' || side === 'bottom') {
    const spaceAbove = trigger.top - pad
    const spaceBelow = viewH - trigger.bottom - pad
    const preferTop = side === 'top'
    const fitsPreferred = preferTop ? spaceAbove >= menu.height + offset : spaceBelow >= menu.height + offset
    const fitsFlip = preferTop ? spaceBelow >= menu.height + offset : spaceAbove >= menu.height + offset
    if (!fitsPreferred && fitsFlip) {
      top = preferTop ? trigger.bottom + offset : trigger.top - menu.height - offset
      if (align === 'start') left = trigger.left
      else if (align === 'end') left = trigger.right - menu.width
      else left = trigger.left + trigger.width / 2 - menu.width / 2
    }
  }

  left = Math.min(Math.max(pad, left), Math.max(pad, viewW - menu.width - pad))
  top = Math.min(Math.max(pad, top), Math.max(pad, viewH - menu.height - pad))

  return { top, left, strategy: 'fixed' }
}
