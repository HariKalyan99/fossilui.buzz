import { forwardRef } from 'react'
import { cn } from '../../lib/cn.js'
import { DefaultLoadingIcon } from './DefaultLoadingIcon.jsx'
import { useLoadingState } from './normalizeLoading.js'

/**
 * @param {object} props
 * @param {ReturnType<import('./prepareButtonProps.js').prepareButtonProps>} props.prepared
 * @param {import('react').ReactNode} props.children
 */
export const ButtonRoot = forwardRef(function ButtonRoot({ prepared, children }, ref) {
  const {
    nativeProps,
    semantic,
    icon,
    iconPlacement,
    loading,
    loadingIcon,
    disabled,
    isLink,
    contentClassName,
  } = prepared

  const loadingState = useLoadingState(loading)
  const isBusy = loadingState.visible
  const isDisabled = disabled || isBusy

  const Comp = isLink ? 'a' : 'button'
  const { className, style, onClick, ...restNative } = nativeProps

  const iconWrapClass = cn(
    'inline-flex shrink-0 items-center justify-center leading-none',
    semantic.classNames.icon,
  )

  const iconNode = (node, placement) => {
    if (!node || iconPlacement !== placement) return null
    return (
      <span className={iconWrapClass} style={semantic.styles.icon} aria-hidden="true">
        {node}
      </span>
    )
  }

  const spinner = loadingIcon ?? <DefaultLoadingIcon className="text-current" />

  const contentNode = (
    <span
      className={cn(contentClassName, semantic.classNames.content)}
      style={semantic.styles.content}
    >
      {children}
    </span>
  )

  return (
    <Comp
      ref={ref}
      {...restNative}
      className={cn(className, isBusy && 'pointer-events-none')}
      style={style}
      onClick={isDisabled ? undefined : onClick}
      disabled={!isLink ? isDisabled || undefined : undefined}
      aria-busy={isBusy || undefined}
    >
      {isBusy ? (
        <>
          <span className={iconWrapClass} style={semantic.styles.icon} aria-hidden="true">
            {loadingState.icon ?? spinner}
          </span>
          {contentNode}
        </>
      ) : (
        <>
          {iconNode(icon, 'start')}
          {contentNode}
          {iconNode(icon, 'end')}
        </>
      )}
    </Comp>
  )
})
