import { forwardRef } from 'react'
import { CardRoot } from './CardRoot.jsx'
import { prepareCardProps } from './prepareCardProps.js'

/**
 * Factory for animated cards with shared Fossil card props.
 *
 * @param {object} config
 * @param {string} config.displayName
 * @param {string | ((props: import('react').HTMLAttributes<HTMLElement>) => string)} config.animationClassName
 * @param {(prepared: ReturnType<typeof prepareCardProps>) => import('react').ReactNode} config.renderContent
 */
export function createAnimatedCard({ displayName, animationClassName, renderContent }) {
  const Component = forwardRef(function AnimatedCard(props, ref) {
    const resolvedAnimationClassName =
      typeof animationClassName === 'function' ? animationClassName(props) : animationClassName

    const prepared = prepareCardProps(props, {
      animationClassName: resolvedAnimationClassName,
    })

    return (
      <CardRoot ref={ref} prepared={prepared}>
        {renderContent(prepared)}
      </CardRoot>
    )
  })
  Component.displayName = displayName
  return Component
}
