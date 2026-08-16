import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../utils/motion.js'
import './Statement.css'

export default function Statement() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const context = gsap.context(() => {
      gsap.from('.statement__line > span', {
        yPercent: 110,
        duration: 1.05,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.statement__text', start: 'top 78%', once: true },
      })
      gsap.from('.statement__rule', { scaleX: 0, duration: 1.1, ease: 'power3.inOut', transformOrigin: 'left', scrollTrigger: { trigger: '.statement__text', start: 'top 80%', once: true } })
    }, root)
    return () => context.revert()
  }, [])

  return (
    <section className="statement" id="statement" ref={root} aria-labelledby="statement-title">
      <div className="container statement__inner">
        <div className="statement__meta"><span>—</span><i className="statement__rule" /></div>
        <h2 className="statement__text" id="statement-title">
          <span className="statement__line"><span>Ваша <em>безопасность</em></span></span>
          <span className="statement__line"><span>не должна зависеть</span></span>
          <span className="statement__line"><span>от случая.</span></span>
        </h2>
      </div>
    </section>
  )
}
