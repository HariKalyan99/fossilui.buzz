import { forwardRef } from 'react'
import { Spinner } from './Spinner.jsx'

export const DefaultSpinner = forwardRef((props, ref) => <Spinner ref={ref} motion="default" {...props} />)
export const RingSpinner = forwardRef((props, ref) => <Spinner ref={ref} motion="ring" {...props} />)
export const DotsSpinner = forwardRef((props, ref) => <Spinner ref={ref} motion="dots" {...props} />)

export const SPINNER_MOTIONS = /** @type {const} */ (['default', 'ring', 'dots'])

export const FossilSpinner = forwardRef(function FossilSpinner({ motion = 'default', ...props }, ref) {
  if (motion === 'ring') return <RingSpinner ref={ref} {...props} />
  if (motion === 'dots') return <DotsSpinner ref={ref} {...props} />
  return <DefaultSpinner ref={ref} {...props} />
})
