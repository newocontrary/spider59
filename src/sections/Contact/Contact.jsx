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
      gsap.from('.contact__lead, .contact__action, .contact__data > div', { y: 24, opacity: 0, duration: 0.75, stagger: 0.07, ease: 'power3.out', scrollTrigger: { trigger: '.contact__body', start: 'top 82%', once: true } })
    }, root)
    return () => context.revert()
  }, [])

  return (
    <section className="contact" id="contact" ref={root} aria-labelledby="contact-title" data-pointer-ambient>
      <span className="pointer-ambient__glow" aria-hidden="true" />
      <span className="pointer-ambient__word" data-word="CONTACT" aria-hidden="true" />
      <div className="container contact__inner">
        <p className="eyebrow contact__eyebrow"><span>05</span> / Контакт</p>
        <div className="contact__body">
          <div className="contact__intro">
            <h2 className="contact__title" id="contact-title">
              <span className="contact__title-line"><span>Спокойствие</span></span>
              <span className="contact__title-line"><span>начинается</span></span>
              <span className="contact__title-line"><span>с защиты</span></span>
            </h2>
            <p className="contact__lead">Расскажите об объекте — отдел продаж подберёт оборудование, тариф и формат реагирования.</p>
            <Button className="contact__action" href="tel:+73422060899">Оставить заявку</Button>
          </div>
          <dl className="contact__data">
            <div><dt>Телефон / отдел продаж</dt><dd><a href="tel:+73422060899">+7 (342) 206-08-99</a></dd></div>
            <div><dt>Пульт 24 часа</dt><dd><a href="tel:+73422149988">+7 (342) 214-99-88</a></dd></div>
            <div><dt>Бухгалтерия</dt><dd><a href="tel:+73422075634">+7 (342) 207-56-34</a></dd></div>
            <div><dt>Email</dt><dd><a href="mailto:info@spider59.ru">info@spider59.ru</a></dd></div>
            <div className="contact__wide"><dt>Адрес</dt><dd><address>614023, г. Пермь, ул. Светлогорская, 19, 1 этаж</address></dd></div>
            <div className="contact__wide"><dt>Режим работы офиса</dt><dd>Пн–Чт: 9:00–18:00 · Пт: 9:00–17:00 · Сб–Вс: выходные</dd></div>
          </dl>
        </div>
      </div>
    </section>
  )
}
