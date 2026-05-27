/**
 * @typedef {import('./shared/constants.js').ButtonSemanticDOM} FossilButtonSemanticDOM
 * @typedef {import('./shared/constants.js').ButtonSize} FossilButtonSize
 * @typedef {import('./shared/constants.js').ButtonShape} FossilButtonShape
 * @typedef {import('./shared/constants.js').ButtonColor} FossilButtonColor
 * @typedef {import('./shared/constants.js').ButtonVariant} FossilButtonVariant
 * @typedef {import('./shared/constants.js').ButtonLegacyType} FossilButtonLegacyType
 * @typedef {import('./shared/constants.js').IconPlacement} FossilIconPlacement
 */

/**
 * Ant Design–style props shared by all Fossil animated buttons.
 *
 * @typedef {import('react').ButtonHTMLAttributes<HTMLButtonElement> & import('react').AnchorHTMLAttributes<HTMLAnchorElement> & {
 *   autoInsertSpace?: boolean
 *   block?: boolean
 *   classNames?: Partial<Record<FossilButtonSemanticDOM, string>> | ((info: { props: object }) => Partial<Record<FossilButtonSemanticDOM, string>>)
 *   color?: FossilButtonColor
 *   danger?: boolean
 *   disabled?: boolean
 *   ghost?: boolean
 *   href?: string
 *   htmlType?: 'submit' | 'reset' | 'button'
 *   icon?: import('react').ReactNode
 *   iconPlacement?: FossilIconPlacement
 *   loading?: boolean | { delay?: number, icon?: import('react').ReactNode }
 *   loadingIcon?: import('react').ReactNode
 *   shape?: FossilButtonShape
 *   size?: FossilButtonSize
 *   styles?: Partial<Record<FossilButtonSemanticDOM, import('react').CSSProperties>> | ((info: { props: object }) => Partial<Record<FossilButtonSemanticDOM, import('react').CSSProperties>>)
 *   target?: string
 *   type?: FossilButtonLegacyType
 *   variant?: FossilButtonVariant
 * }} FossilButtonProps
 */

export {}
