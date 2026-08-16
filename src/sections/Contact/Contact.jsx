import { useLayoutEffect, useRef } from 'react'
import Button from '../../components/ui/Button/Button.jsx'
import { gsap } from '../../utils/motion.js'
import './Contact.css'

export default function Contact() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const context = gsap.context(() => {
      gsap.from('.contact__title-line > span', { yPercent: 110, duration: 1, stagger: 0.09, ease: 'power4.out', scrollTrigger: { trigger: '.contact__title', start: 'top 80%', once: true } })
      gsap.from('.contact__details > *', { y: 24, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.contact__details', start: 'top 84%', once: true } })
    }, root)
    return () => context.revert()
  }, [])

  return (
    <section className="contact" id="contact" ref={root} aria-labelledby="contact-title">
      <div className="contact__accent" aria-hidden="true" />
      <div className="container contact__grid">
        <p className="eyebrow contact__eyebrow"><span>05</span> / Контакт</p>
        <h2 className="contact__title" id="contact-title">
          <span className="contact__title-line"><span>Спокойствие</span></span>
          <span className="contact__title-line"><span>начинается</span></span>
          <span className="contact__title-line"><span>с защиты.</span></span>
        </h2>
        <div className="contact__details">
          <p className="contact__lead">Оставьте заявку — обсудим подходящее решение для вашего объекта.</p>
          <dl className="contact__data">
            <div><dt>Телефон</dt><dd><a href="tel:+73422060899">+7 (342) 206-08-99</a></dd></div>
            <div><dt>Город</dt><dd>Пермь</dd></div>
          </dl>
          <Button href="tel:+73422060899">Оставить заявку</Button>
        </div>
      </div>
    </section>
  )
}
