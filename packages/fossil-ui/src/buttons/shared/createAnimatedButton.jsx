import { forwardRef } from 'react'
import { ButtonRoot } from './ButtonRoot.jsx'
import { prepareButtonProps } from './prepareButtonProps.js'
import { useLoadingState } from './normalizeLoading.js'

/**
 * Factory for animated buttons with shared Fossil / Ant Design-style props.
 *
 * @param {object} config
 * @param {string} config.displayName
 * @param {string} config.animationClassName
 * @param {boolean} [config.useAppearance=true]
 * @param {{ color?: string, variant?: string, type?: string }} [config.appearanceDefaults]
 * @param {(ctx: ReturnType<typeof prepareButtonProps>) => import('react').ReactNode} config.renderContent
 * @param {(ctx: ReturnType<typeof prepareButtonProps>) => import('react').ReactNode} [config.renderLoadingContent]
 * @param {string} [config.contentClassName]
 */
export function createAnimatedButton({
  displayName,
  animationClassName,
  useAppearance = true,
  appearanceDefaults,
  contentClassName,
  renderContent,
  renderLoadingContent,
}) {
  const Component = forwardRef(function AnimatedButton(props, ref) {
    const prepared = prepareButtonProps(props, {
      animationClassName,
      useAppearance,
      appearanceDefaults,
      contentClassName,
    })
    const loadingState = useLoadingState(prepared.loading)
    const isBusy = loadingState.visible

    const body =
      isBusy && renderLoadingContent ? renderLoadingContent(prepared) : renderContent(prepared)

    return (
      <ButtonRoot ref={ref} prepared={prepared}>
        {body}
      </ButtonRoot>
    )
  })
  Component.displayName = displayName
  return Component
}
