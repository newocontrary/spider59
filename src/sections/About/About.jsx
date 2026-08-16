import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../utils/motion.js'
import './About.css'

const stats = [
  { value: '24/7', label: 'Круглосуточный контроль' },
  { value: 'Private', label: 'Частные объекты' },
  { value: 'Business', label: 'Коммерческие объекты' },
]

export default function About() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const context = gsap.context(() => {
      gsap.from('.about__line > span', {
        yPercent: 105,
        duration: 1,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.about__title', start: 'top 82%', once: true },
      })
      gsap.from('.about__copy', { y: 24, opacity: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: '.about__copy', start: 'top 88%', once: true } })
      gsap.from('.about__stat', { y: 28, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.about__stats', start: 'top 87%', once: true } })
    }, root)
    return () => context.revert()
  }, [])

  return (
    <section className="about" id="about" ref={root} aria-labelledby="about-title">
      <div className="container about__grid">
        <p className="eyebrow about__eyebrow"><span>01</span> / О компании</p>
        <h2 className="about__title" id="about-title">
          <span className="about__line"><span>Спайдер —</span></span>
          <span className="about__line"><span>когда безопасность</span></span>
          <span className="about__line"><span>действительно <em>важна.</em></span></span>
        </h2>
        <p className="about__copy">Мы создаём комплексную систему защиты для частных лиц и бизнеса — от постоянного мониторинга до оперативного реагирования.</p>
        <div className="about__stats">
          {stats.map((stat) => (
            <div className="about__stat" key={stat.value}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
