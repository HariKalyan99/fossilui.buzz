import { useEffect, useState } from 'react'

/**
 * @param {boolean | { delay?: number, icon?: import('react').ReactNode }} loading
 */
export function normalizeLoadingConfig(loading) {
  if (!loading) {
    return { active: false, delay: 0, icon: null }
  }
  if (loading === true) {
    return { active: true, delay: 0, icon: null }
  }
  return {
    active: true,
    delay: loading.delay ?? 0,
    icon: loading.icon ?? null,
  }
}

/**
 * @param {boolean | { delay?: number, icon?: import('react').ReactNode }} loading
 */
export function useLoadingState(loading) {
  const config = normalizeLoadingConfig(loading)
  const [visible, setVisible] = useState(config.delay === 0 && config.active)

  useEffect(() => {
    if (!config.active) {
      setVisible(false)
      return undefined
    }
    if (config.delay <= 0) {
      setVisible(true)
      return undefined
    }
    const timer = window.setTimeout(() => setVisible(true), config.delay)
    return () => window.clearTimeout(timer)
  }, [config.active, config.delay])

  return {
    ...config,
    visible: config.active && visible,
  }
}
