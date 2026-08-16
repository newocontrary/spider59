import { useLayoutEffect, useRef } from 'react'
import SystemIcon from '../../components/SystemIcon/SystemIcon.jsx'
import { gsap } from '../../utils/motion.js'
import './About.css'

const directions = [
  { icon: 'control', marker: '24/7 Control', title: 'Круглосуточный контроль', text: 'Постоянный мониторинг охраняемых объектов и тревожных событий.' },
  { icon: 'private', marker: 'Private', title: 'Частная безопасность', text: 'Защита квартир, частных домов и другого личного имущества.' },
  { icon: 'business', marker: 'Business', title: 'Безопасность бизнеса', text: 'Охранные решения для офисов, магазинов, складов и предприятий.' },
]

export default function About() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      gsap.from('.about__line > span', {
        yPercent: 105,
        duration: 1,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.about__title', start: 'top 82%', once: true },
      })
      gsap.from('.direction', { y: 28, opacity: 0, duration: 0.8, stagger: 0.09, ease: 'power3.out', scrollTrigger: { trigger: '.about__directions', start: 'top 86%', once: true } })
      media.add('(min-width: 1024px)', () => {
        const story = gsap.timeline({
          scrollTrigger: {
            trigger: '.about__story',
            start: 'top 10%',
            end: '+=85%',
            pin: true,
            pinSpacing: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        story
          .fromTo('.about__lead', { opacity: 0.38, y: 18 }, { opacity: 1, y: 0, duration: 0.3 })
          .fromTo('.about__copy', { opacity: 0.28, y: 18 }, { opacity: 1, y: 0, duration: 0.28 })
          .fromTo('.about__facts', { opacity: 0.22, y: 18 }, { opacity: 1, y: 0, duration: 0.32 })
      })
      media.add('(max-width: 1023px)', () => {
        gsap.from('.about__content > *', { y: 24, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.about__content', start: 'top 86%', once: true } })
      })
    }, root)
    return () => {
      media.revert()
      context.revert()
    }
  }, [])

  return (
    <section className="about" id="about" ref={root} aria-labelledby="about-title" data-pointer-ambient>
      <span className="pointer-ambient__glow" aria-hidden="true" />
      <span className="pointer-ambient__word" data-word="PROTECTION" aria-hidden="true" />
      <div className="container about__grid">
        <div className="about__story">
          <p className="eyebrow about__eyebrow"><span>01</span> / О компании</p>
          <div className="about__statement">
            <h2 className="about__title" id="about-title">
              <span className="about__line"><span>Спайдер —</span></span>
              <span className="about__line"><span>безопасность</span></span>
              <span className="about__line"><span>как <em>система.</em></span></span>
            </h2>
          </div>
          <div className="about__content">
            <p className="about__lead">Охранное агентство «Спайдер» работает на пермском рынке более 19 лет, объединяя техническую охрану, круглосуточный пульт и группы быстрого реагирования.</p>
            <p className="about__copy">Для каждого объекта формируется собственная схема защиты: оборудование фиксирует событие, оператор принимает сигнал, а ближайший экипаж получает данные для выезда.</p>
            <dl className="about__facts">
              <div><dt>Опыт</dt><dd>Более 19 лет работы</dd></div>
              <div><dt>Пульт</dt><dd>Контроль 24 часа</dd></div>
              <div><dt>ГБР</dt><dd>Прибытие 5–7 минут</dd></div>
            </dl>
          </div>
        </div>
        <div className="about__directions" aria-label="Направления защиты">
          <p className="eyebrow about__directions-label">Направления защиты</p>
          {directions.map((item, index) => (
            <article className="direction" key={item.marker}>
              <div className="direction__top"><SystemIcon type={item.icon} /><span>0{index + 1}</span></div>
              <p className="direction__marker">{item.marker}</p>
              <h3>{item.title}</h3>
              <p className="direction__text">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
