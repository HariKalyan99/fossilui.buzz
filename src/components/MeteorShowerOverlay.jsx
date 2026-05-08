import { useEffect, useState } from 'react'

function makeBurst(x, y, targetX, targetY) {
  const dx = targetX - x
  const dy = targetY - y
  const baseAngle = (Math.atan2(dy, dx) * 180) / Math.PI
  const baseDistance = Math.max(80, Math.min(320, Math.hypot(dx, dy)))
  const count = 6
  const meteors = Array.from({ length: count }, (_, i) => ({
    id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 7)}`,
    delay: i * 65 + Math.random() * 55,
    distance: baseDistance * (0.36 + Math.random() * 0.24),
    angle: baseAngle + (Math.random() - 0.5) * 12,
    length: 16 + Math.random() * 10,
    duration: 420 + Math.random() * 220,
    offsetX: (Math.random() - 0.5) * 26,
    offsetY: (Math.random() - 0.5) * 14,
  }))
  return {
    id: crypto.randomUUID(),
    x,
    y,
    meteors,
  }
}

export function MeteorShowerOverlay() {
  const [bursts, setBursts] = useState([])

  useEffect(() => {
    let lastFireAt = 0
    const onPointerDown = (e) => {
      // Left click/tap only.
      if (e.button !== undefined && e.button !== 0) return
      const target = e.target
      if (!(target instanceof Element)) return
      // Meteor streaks are only active inside the hero section.
      const heroZone = target.closest('[data-hero-zone="true"]')
      if (!heroZone) return

      const now = performance.now()
      if (now - lastFireAt < 280) return
      lastFireAt = now

      // Aim towards the model center (desktop or mobile model zone).
      const modelZones = Array.from(
        document.querySelectorAll('[data-model-zone="true"]'),
      )
      const visibleZone =
        modelZones.find((el) => {
          const r = el.getBoundingClientRect()
          return r.width > 0 && r.height > 0
        }) || heroZone
      const modelRect = visibleZone.getBoundingClientRect()
      const targetX = modelRect.left + modelRect.width / 2
      const targetY = modelRect.top + modelRect.height / 2

      const burst = makeBurst(e.clientX, e.clientY, targetX, targetY)
      setBursts((prev) => [...prev.slice(-3), burst])

      // Remove finished burst.
      const maxDuration = Math.max(...burst.meteors.map((m) => m.delay + m.duration))
      window.setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== burst.id))
      }, maxDuration + 120)
    }

    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[70] overflow-hidden" aria-hidden="true">
      {bursts.map((burst) =>
        burst.meteors.map((m) => (
          <span
            key={m.id}
            className="meteor-streak"
            style={{
              left: `${burst.x + m.offsetX}px`,
              top: `${burst.y + m.offsetY}px`,
              width: `${m.length}px`,
              '--meteor-distance': `${m.distance}px`,
              '--meteor-angle': `${m.angle}deg`,
              animationDuration: `${m.duration}ms`,
              animationDelay: `${m.delay}ms`,
            }}
          />
        )),
      )}
    </div>
  )
}

