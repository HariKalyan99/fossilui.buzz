import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { useGsap } from '../../hooks/useGsap'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { principles } from '../../data/principles'

const ease = [0.16, 1, 0.3, 1]

export default function Philosophy({ index = '04' }) {
  const [active, setActive] = useState(0)

  const scope = useGsap((_, el) => {
    const list = el.querySelector('[data-principles]')
    el.querySelectorAll('[data-principle]').forEach((item, i) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => self.isActive && setActive(i),
      })
    })
    gsap.fromTo(
      el.querySelector('[data-progress]'),
      { scaleY: 0 },
      { scaleY: 1, ease: 'none', scrollTrigger: { trigger: list, start: 'top 55%', end: 'bottom 55%', scrub: true } },
    )
  })

  return (
    <section ref={scope} className="section-y relative bg-ink">
      <div className="container-x">
        <SectionHeading
          index={index}
          eyebrow="Training philosophy"
          title={['Four rules.', { accent: 'Zero noise.' }]}
          copy="The principles behind every program, every session and every coaching decision."
          id="philosophy-title"
        />

        <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-0 flex h-svh items-center py-24">
              <div className="relative aspect-[4/5] max-h-full w-full overflow-hidden bg-charcoal">
                {principles.map((p, i) => (
                  <motion.img
                    key={p.title}
                    src={p.image}
                    alt={i === active ? p.alt : ''}
                    aria-hidden={i !== active}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: p.position }}
                    className="absolute inset-0 size-full object-cover"
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.08 }}
                    transition={{ duration: 0.9, ease }}
                  />
                ))}
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent" />
                <div className="absolute right-6 bottom-6 left-6 flex items-end justify-between">
                  <motion.span
                    key={active}
                    aria-hidden="true"
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease }}
                    className="type-display text-7xl text-volt xl:text-8xl"
                  >
                    {String(active + 1).padStart(2, '0')}
                  </motion.span>
                  <span className="type-eyebrow pb-2 text-bone/70">/ {String(principles.length).padStart(2, '0')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-5 lg:col-start-8">
            <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 hidden w-px bg-bone/10 lg:block">
              <span data-progress className="absolute inset-0 origin-top bg-volt" />
            </span>

            <ol data-principles className="lg:py-[18vh]">
              {principles.map((p, i) => (
                <li
                  key={p.title}
                  data-principle
                  className={`border-t border-bone/10 py-10 transition-opacity duration-700 first:border-t-0 lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center lg:border-t-0 lg:py-0 lg:pl-12 ${
                    i === active ? 'lg:opacity-100' : 'lg:opacity-30'
                  }`}
                >
                  <div className="relative mb-8 aspect-[4/3] overflow-hidden bg-charcoal lg:hidden">
                    <img
                      src={p.image}
                      alt={p.alt}
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: p.position }}
                      className="absolute inset-0 size-full object-cover"
                    />
                  </div>
                  <span className="type-eyebrow text-volt">Principle {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="type-display mt-4 text-[clamp(1.75rem,3.2vw,3.4rem)] text-bone">{p.title}</h3>
                  <p className="mt-5 max-w-md text-lead leading-relaxed text-ash">{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
