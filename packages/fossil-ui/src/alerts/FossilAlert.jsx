import { forwardRef } from 'react'
import { Alert } from './Alert.jsx'

export const InfoAlert = forwardRef((props, ref) => <Alert ref={ref} variant="info" {...props} />)
export const SuccessAlert = forwardRef((props, ref) => <Alert ref={ref} variant="success" {...props} />)
export const WarningAlert = forwardRef((props, ref) => <Alert ref={ref} variant="warning" {...props} />)
export const DangerAlert = forwardRef((props, ref) => <Alert ref={ref} variant="danger" {...props} />)

const VARIANT_COMPONENTS = {
  info: InfoAlert,
  success: SuccessAlert,
  warning: WarningAlert,
  danger: DangerAlert,
}

export const ALERT_VARIANTS = /** @type {const} */ (Object.keys(VARIANT_COMPONENTS))

export const FossilAlert = forwardRef(function FossilAlert({ variant = 'info', ...props }, ref) {
  const Comp = VARIANT_COMPONENTS[variant] ?? InfoAlert
  return <Comp ref={ref} {...props} />
})
