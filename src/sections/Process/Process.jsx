import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../utils/motion.js'
import './Process.css'

const steps = [
  { number: '01', title: 'Сигнал', text: 'Датчик фиксирует событие и передаёт тревогу на пульт централизованного наблюдения.' },
  { number: '02', title: 'Мониторинг', text: 'Оператор проверяет событие и передаёт группе реагирования данные об объекте.' },
  { number: '03', title: 'Реагирование', text: 'Ближайший экипаж ГБР получает информацию и незамедлительно выезжает.' },
  { number: '04', title: 'Защита', text: 'На месте проводится осмотр объекта и принимаются необходимые меры.' },
]

export default function Process() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add('(min-width: 1024px)', () => {
        const steps = gsap.utils.toArray('.process__step')
        const counter = root.current.querySelector('.process__counter-current')
        let active = -1
        const setActive = (index) => {
          if (index === active) return
          active = index
          steps.forEach((step, stepIndex) => {
            step.classList.toggle('is-active', stepIndex === index)
            step.classList.toggle('is-past', stepIndex < index)
          })
          counter.textContent = String(index + 1).padStart(2, '0')
        }
        setActive(0)
        gsap.fromTo('.process__progress', { scaleX: 0 }, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=220%',
            pin: '.process__pin',
            pinSpacing: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(Math.min(3, Math.floor(self.progress * 4))),
          },
        })
      })
      media.add('(max-width: 1023px)', () => {
        gsap.from('.process__intro > *', { y: 28, opacity: 0, duration: 0.85, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.process__intro', start: 'top 84%', once: true } })
        gsap.from('.process__step', { y: 26, duration: 0.75, stagger: 0.09, ease: 'power3.out', scrollTrigger: { trigger: '.process__steps', start: 'top 84%', once: true } })
        gsap.fromTo('.process__progress', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.process__steps', start: 'top 78%', end: 'bottom 72%', scrub: 0.5 } })
      })
    }, root)
    return () => {
      media.revert()
      context.revert()
    }
  }, [])

  return (
    <section className="process" id="process" ref={root} aria-labelledby="process-title" data-pointer-ambient>
      <span className="pointer-ambient__glow" aria-hidden="true" />
      <span className="pointer-ambient__word" data-word="RESPONSE" aria-hidden="true" />
      <div className="process__pin">
        <div className="container process__layout">
          <div className="process__intro">
            <p className="eyebrow process__eyebrow"><span>03</span> / Как это работает</p>
            <h2 id="process-title">От сигнала<br />до защиты</h2>
            <p className="process__intro-note">Оборудование, оператор и экипаж работают как один последовательный сценарий.</p>
            <p className="process__counter" aria-hidden="true"><span className="process__counter-current">01</span> / 04</p>
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
      </div>
    </section>
  )
}
