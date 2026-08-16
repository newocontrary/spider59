import { useLayoutEffect, useRef } from 'react'
import Button from '../../components/ui/Button/Button.jsx'
import { gsap } from '../../utils/motion.js'
import './Hero.css'

export default function Hero() {
  const root = useRef(null)
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const context = gsap.context(() => {
      const intro = gsap.timeline({ delay: 1.05, defaults: { ease: 'power4.out' } })
      intro
        .from('.hero__eyebrow', { y: 18, opacity: 0, duration: 0.7 })
        .from('.hero__title-line > span', { yPercent: 110, duration: 1.05, stagger: 0.1 }, '-=0.42')
        .from('.hero__description', { y: 24, opacity: 0, duration: 0.75 }, '-=0.58')
        .from('.hero__action', { y: 20, opacity: 0, duration: 0.7 }, '-=0.55')
        .from('.hero__index', { opacity: 0, duration: 0.6 }, '-=0.5')

      gsap.to('.hero__content', {
        yPercent: -4,
        opacity: 0.72,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
      })
    }, root)
    return () => context.revert()
  }, [])

  return (
    <section className="hero" id="top" ref={root} aria-labelledby="hero-title">
      <div className="hero__backdrop" aria-hidden="true">SPIDER</div>
      <div className="hero__network" aria-hidden="true"><i /><i /><i /><span /></div>
      <div className="container hero__inner hero__content">
        <p className="eyebrow hero__eyebrow">Охранное агентство <span /> Пермь</p>
        <h1 className="hero__title" id="hero-title">
          <span className="hero__title-line"><span>Безопасность</span></span>
          <span className="hero__title-line"><span>без компромиссов.</span></span>
        </h1>
        <div className="hero__footer">
          <p className="hero__description">Комплексная защита частных и коммерческих объектов.<br />Контроль, реагирование и безопасность 24/7.</p>
          <Button className="hero__action" href="#contact">Подключить охрану</Button>
          <p className="hero__index">00 <span>/</span> 05</p>
        </div>
      </div>
    </section>
  )
}
