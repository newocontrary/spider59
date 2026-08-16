import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../utils/motion.js'
import './Services.css'

const services = [
  { number: '01', title: 'Квартиры', description: 'Контроль безопасности жилого пространства.' },
  { number: '02', title: 'Частные дома', description: 'Защита территории и частной собственности.' },
  { number: '03', title: 'Бизнес', description: 'Системный подход к безопасности компании.' },
  { number: '04', title: 'Магазины и офисы', description: 'Контроль коммерческих помещений.' },
  { number: '05', title: 'Склады и объекты', description: 'Защита периметра и инфраструктуры.' },
  { number: '06', title: 'Охранные системы', description: 'Технические решения для постоянного мониторинга.' },
]

export default function Services() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const context = gsap.context(() => {
      gsap.from('.services__intro > *', { y: 28, opacity: 0, duration: 0.85, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.services__intro', start: 'top 84%', once: true } })
      gsap.from('.service-item', { y: 32, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out', scrollTrigger: { trigger: '.services__grid', start: 'top 86%', once: true } })
    }, root)
    return () => context.revert()
  }, [])

  return (
    <section className="services" id="services" ref={root} aria-labelledby="services-title">
      <div className="container">
        <div className="services__intro">
          <p className="eyebrow services__eyebrow"><span>02</span> / Услуги</p>
          <h2 id="services-title">Что мы<br />защищаем</h2>
          <p>Решения для частных лиц, бизнеса и объектов с повышенными требованиями к безопасности.</p>
        </div>
        <div className="services__grid">
          {services.map((service) => (
            <article className="service-item" key={service.number}>
              <span className="service-item__number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="service-item__arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
