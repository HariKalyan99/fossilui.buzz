import { forwardRef } from 'react'
import { ModalShell } from './ModalShell.jsx'

export function createModalVariant({ displayName, motion }) {
  const Component = forwardRef(function ModalVariant(props, ref) {
    return <ModalShell ref={ref} motion={motion} {...props} />
  })
  Component.displayName = displayName
  return Component
}
