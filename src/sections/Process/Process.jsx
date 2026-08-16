import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../utils/motion.js'
import './Process.css'

const steps = [
  { number: '01', title: 'Сигнал', text: 'Система фиксирует тревожное событие.' },
  { number: '02', title: 'Мониторинг', text: 'Сигнал поступает на контроль.' },
  { number: '03', title: 'Реагирование', text: 'Ситуация передаётся для оперативного реагирования.' },
  { number: '04', title: 'Защита', text: 'Объект остаётся под контролем системы безопасности.' },
]

export default function Process() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      gsap.from('.process__intro > *', { y: 28, opacity: 0, duration: 0.85, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.process__intro', start: 'top 84%', once: true } })
      gsap.from('.process__step', { y: 26, opacity: 0, duration: 0.75, stagger: 0.09, ease: 'power3.out', scrollTrigger: { trigger: '.process__steps', start: 'top 84%', once: true } })
      media.add('(min-width: 768px)', () => {
        gsap.fromTo('.process__progress', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.process__steps', start: 'top 78%', end: 'bottom 65%', scrub: 0.6 } })
      })
      media.add('(max-width: 767px)', () => {
        gsap.fromTo('.process__progress', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.process__steps', start: 'top 78%', end: 'bottom 72%', scrub: 0.5 } })
      })
    }, root)
    return () => {
      media.revert()
      context.revert()
    }
  }, [])

  return (
    <section className="process" id="process" ref={root} aria-labelledby="process-title">
      <div className="container">
        <div className="process__intro">
          <p className="eyebrow process__eyebrow"><span>03</span> / Как это работает</p>
          <h2 id="process-title">От сигнала<br />до реагирования</h2>
        </div>
        <div className="process__steps">
          <div className="process__track" aria-hidden="true"><i className="process__progress" /></div>
          {steps.map((step) => (
            <article className="process__step" key={step.number}>
              <span className="process__node" aria-hidden="true" />
              <span className="process__number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
