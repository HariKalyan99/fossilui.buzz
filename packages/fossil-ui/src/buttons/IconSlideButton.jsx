import { forwardRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '../lib/cn.js'
import { ButtonRoot } from './shared/ButtonRoot.jsx'
import { prepareButtonProps } from './shared/prepareButtonProps.js'

/** Arrow (or custom icon) slides in from the left; label nudges slightly right. */
export const IconSlideButton = forwardRef(function IconSlideButton(props, ref) {
  const prepared = prepareButtonProps(props, {
    appearanceDefaults: { color: 'default', variant: 'filled' },
    animationClassName: cn(
      'overflow-hidden ring-1 ring-neutral-200 shadow-none',
      'transition-[box-shadow,ring-color] duration-300',
      'hover:ring-neutral-300 hover:shadow-[0_4px_14px_-4px_rgba(15,23,42,0.12)]',
    ),
  })

  const { formattedChildren, icon } = prepared
  const slideIcon = icon ?? <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />

  return (
    <ButtonRoot ref={ref} prepared={prepared}>
      <span
        className="flex w-0 -translate-x-1 items-center overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:w-4 group-hover:translate-x-0 group-hover:opacity-100"
        aria-hidden="true"
      >
        {slideIcon}
      </span>
      <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
        {formattedChildren}
      </span>
    </ButtonRoot>
  )
})

IconSlideButton.displayName = 'IconSlideButton'
