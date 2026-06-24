import { forwardRef } from 'react'
import { Navbar } from './Navbar.jsx'

export const MinimalNavbar = forwardRef((props, ref) => <Navbar ref={ref} variant="minimal" {...props} />)
export const CenteredNavbar = forwardRef((props, ref) => <Navbar ref={ref} variant="centered" {...props} />)
export const CtaNavbar = forwardRef((props, ref) => <Navbar ref={ref} variant="withCta" {...props} />)
export const ScrollBlurNavbar = forwardRef((props, ref) => <Navbar ref={ref} variant="scrollBlur" {...props} />)
export const BorderedNavbar = forwardRef((props, ref) => <Navbar ref={ref} variant="bordered" {...props} />)

const VARIANT_COMPONENTS = {
  minimal: MinimalNavbar,
  centered: CenteredNavbar,
  withCta: CtaNavbar,
  scrollBlur: ScrollBlurNavbar,
  bordered: BorderedNavbar,
}

export const NAVBAR_VARIANTS = /** @type {const} */ (Object.keys(VARIANT_COMPONENTS))

export const FossilNavbar = forwardRef(function FossilNavbar({ variant = 'minimal', ...props }, ref) {
  const Comp = VARIANT_COMPONENTS[variant] ?? MinimalNavbar
  return <Comp ref={ref} {...props} />
})
