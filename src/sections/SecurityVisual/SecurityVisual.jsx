import { useEffect, useRef } from 'react'
import LogoMark from '../../components/Logo/LogoMark.jsx'
import SecurityNetworkCanvas from './SecurityNetworkCanvas.jsx'
import './SecurityVisual.css'

export default function SecurityVisual() {
  const root = useRef(null)

  useEffect(() => {
    const section = root.current
    if (!section) return undefined

    const reveal = () => {
      if (section.classList.contains('security-visual--visible')) return
      if (section.getBoundingClientRect().top < window.innerHeight * 0.82) {
        section.classList.add('security-visual--visible')
        window.removeEventListener('scroll', reveal)
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) reveal()
    }, { threshold: 0.18 })

    observer.observe(section)
    window.addEventListener('scroll', reveal, { passive: true })
    reveal()
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', reveal)
    }
  }, [])

  return (
    <section className="security-visual" id="security-visual" ref={root} aria-labelledby="security-visual-title" data-pointer-ambient>
      <span className="pointer-ambient__glow" aria-hidden="true" />
      <div className="security-visual__network" aria-hidden="true">
        <SecurityNetworkCanvas />
        <div className="security-visual__mark">
          <LogoMark accent />
        </div>
      </div>

      <div className="container security-visual__inner">
        <div className="security-visual__copy">
          <p className="eyebrow security-visual__label">Security network</p>
          <h2 id="security-visual-title">Система<br />под контролем.</h2>
          <p className="security-visual__note">Контроль, мониторинг и реагирование работают как единая инфраструктура безопасности.</p>
        </div>
        <p className="security-visual__status" aria-hidden="true"><i /> Network active</p>
      </div>
    </section>
  )
}
