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
    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      gsap.from('.advantages__title-line > span', { yPercent: 110, duration: 1, stagger: 0.08, ease: 'power4.out', scrollTrigger: { trigger: '.advantages__title', start: 'top 82%', once: true } })

      media.add('(min-width: 1024px)', () => {
        const items = gsap.utils.toArray('.advantage')
        const activeNumber = root.current.querySelector('.advantages__active-number')
        let active = -1
        const setActive = (index) => {
          if (index === active) return
          active = index
          items.forEach((item, itemIndex) => {
            item.classList.toggle('is-active', itemIndex === index)
            item.classList.toggle('is-past', itemIndex < index)
          })
          activeNumber.textContent = advantages[index].number
          root.current.style.setProperty('--advantage-node-y', `${(index + 0.5) * 25}%`)
        }
        setActive(0)
        gsap.fromTo('.advantages__progress', { scaleY: 0 }, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.advantages__stage',
            start: 'top top',
            end: '+=145%',
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(Math.min(3, Math.floor(self.progress * 4))),
          },
        })
      })

      media.add('(max-width: 1023px)', () => {
        gsap.from('.advantage', { y: 28, opacity: 0, duration: 0.75, stagger: 0.09, ease: 'power3.out', scrollTrigger: { trigger: '.advantages__list', start: 'top 86%', once: true } })
      })
    }, root)
    return () => {
      media.revert()
      context.revert()
    }
  }, [])

  return (
    <section className="advantages" id="advantages" ref={root} aria-labelledby="advantages-title" data-pointer-ambient>
      <span className="pointer-ambient__glow" aria-hidden="true" />
      <span className="pointer-ambient__word" data-word="CONTROL" aria-hidden="true" />
      <div className="container advantages__stage">
        <div className="advantages__intro">
          <p className="eyebrow advantages__eyebrow"><span>04</span> / Преимущества</p>
          <h2 className="advantages__title" id="advantages-title">
            <span className="advantages__title-line"><span>Защита,</span></span>
            <span className="advantages__title-line"><span>которой можно</span></span>
            <span className="advantages__title-line"><span>доверять</span></span>
          </h2>
          <p className="advantages__lead">Комплексный подход к безопасности частных и коммерческих объектов.</p>
        </div>
        <div className="advantages__sequence">
          <div className="advantages__active-number" aria-hidden="true">01</div>
          <div className="advantages__rail" aria-hidden="true"><i className="advantages__progress" /><span className="advantages__node" /></div>
          <div className="advantages__list">
            {advantages.map((item) => (
              <article className="advantage" key={item.number}>
                <span className="advantage__number">{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
