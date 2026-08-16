import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../utils/motion.js'
import './Advantages.css'

const advantages = [
  { number: '01', title: 'Круглосуточный контроль', text: 'Система безопасности остаётся под наблюдением в любое время суток.' },
  { number: '02', title: 'Оперативное реагирование', text: 'Тревожные события передаются для дальнейшего реагирования.' },
  { number: '03', title: 'Комплексный подход', text: 'Охрана частных, коммерческих и специализированных объектов.' },
  { number: '04', title: 'Система безопасности', text: 'Мониторинг, охранные решения и контроль объединены в единую систему.' },
]

export default function Advantages() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const context = gsap.context(() => {
      gsap.from('.advantages__title-line > span', { yPercent: 110, duration: 1, stagger: 0.08, ease: 'power4.out', scrollTrigger: { trigger: '.advantages__title', start: 'top 82%', once: true } })
      gsap.from('.advantage', { y: 30, opacity: 0, duration: 0.8, stagger: 0.09, ease: 'power3.out', scrollTrigger: { trigger: '.advantages__list', start: 'top 86%', once: true } })
      gsap.to('.advantages__backdrop', { y: -34, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.7 } })
    }, root)
    return () => context.revert()
  }, [])

  return (
    <section className="advantages" id="advantages" ref={root} aria-labelledby="advantages-title">
      <div className="advantages__backdrop" aria-hidden="true">Security</div>
      <div className="container advantages__inner">
        <div className="advantages__intro">
          <p className="eyebrow advantages__eyebrow"><span>04</span> / Преимущества</p>
          <h2 className="advantages__title" id="advantages-title">
            <span className="advantages__title-line"><span>Защита,</span></span>
            <span className="advantages__title-line"><span>которой можно</span></span>
            <span className="advantages__title-line"><span>доверять.</span></span>
          </h2>
          <p className="advantages__lead">Комплексный подход к безопасности частных и коммерческих объектов.</p>
        </div>
        <div className="advantages__list">
          {advantages.map((item) => (
            <article className="advantage" key={item.number}>
              <span className="advantage__number">{item.number}</span>
              <span className="advantage__accent" aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
