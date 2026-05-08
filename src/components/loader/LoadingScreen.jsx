import { Suspense, useEffect, useRef, useState } from 'react'
import { useGLTF, useProgress } from '@react-three/drei'
import DinoLoader from './DinoLoader'

const MODEL_URL = '/models/demon_trex.glb'

useGLTF.preload(MODEL_URL)

let modelAlreadyLoaded = false

function ModelTrigger({ onLoaded }) {
  useGLTF(MODEL_URL)
  useEffect(() => {
    onLoaded?.()
  }, [onLoaded])
  return null
}

export function LoadingScreen({ onReady }) {
  const { progress } = useProgress()
  const [display, setDisplay] = useState(0)
  const [exiting, setExiting] = useState(false)
  const progressRef = useRef(0)
  const doneRef = useRef(false)

  progressRef.current = progress

  useEffect(() => {
    // Safety timeout: never block the app for more than 30s.
    const safety = setTimeout(() => {
      doneRef.current = true
    }, 30000)
    return () => clearTimeout(safety)
  }, [])

  useEffect(() => {
    let raf = 0
    let displayed = 0
    let cancelled = false
    let exitTimer = null

    const tick = () => {
      if (cancelled) return
      const realTarget = doneRef.current
        ? 100
        : Math.min(95, progressRef.current)
      const diff = realTarget - displayed
      if (diff > 0) {
        displayed += Math.max(diff * 0.07, 0.18)
        if (displayed > realTarget) displayed = realTarget
      }
      const value = Math.min(100, Math.floor(displayed))
      setDisplay(value)

      if (doneRef.current && value >= 100) {
        setExiting(true)
        exitTimer = setTimeout(() => onReady?.(), 650)
        return
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      if (exitTimer) clearTimeout(exitTimer)
    }
  }, [onReady])

  const handleModelReady = () => {
    doneRef.current = true
    modelAlreadyLoaded = true
  }

  return (
    <div
      className={`loading-screen ${exiting ? 'is-exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading 3D model"
    >
      <Suspense fallback={null}>
        <ModelTrigger onLoaded={handleModelReady} />
      </Suspense>

      <div className="loading-screen__bg" aria-hidden="true" />

      <div className="loading-screen__content">
        <div className="loading-screen__counter">
          <span className="loading-screen__counter-value">
            {String(display).padStart(2, '0')}
          </span>
          <span className="loading-screen__counter-suffix">%</span>
        </div>
        <div className="loading-screen__bar" aria-hidden="true">
          <div
            className="loading-screen__bar-fill"
            style={{ transform: `scaleX(${display / 100})` }}
          />
        </div>
      </div>

      <div className="loading-screen__dock">
        <DinoLoader />
      </div>
      <span className="sr-only">
        "Demon Trex" (https://skfb.ly/oE6v8) by endlessvoidmc is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
      </span>
    </div>
  )
}

export function hasModelAlreadyLoaded() {
  return modelAlreadyLoaded
}

export default LoadingScreen
