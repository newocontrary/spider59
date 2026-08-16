import { useLayoutEffect, useRef } from 'react'
import Logo from '../../components/Logo/Logo.jsx'
import { gsap } from '../../utils/motion.js'
import './Footer.css'

const footerLinks = [
  { label: 'Услуги', href: '#services' },
  { label: 'О компании', href: '#about' },
  { label: 'Контакты', href: '#contact' },
]

export default function Footer() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const context = gsap.context(() => {
      gsap.from('.footer__word', { y: 36, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.footer__word', start: 'top 92%', once: true } })
    }, root)
    return () => context.revert()
  }, [])

  return (
    <footer className="footer" ref={root} data-pointer-ambient>
      <span className="pointer-ambient__glow" aria-hidden="true" />
      <div className="container footer__top">
        <nav aria-label="Навигация в подвале">{footerLinks.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}</nav>
        <div className="footer__agency"><span><Logo markOnly /></span><p>Security agency<br />Пермь</p></div>
        <p>Unofficial portfolio concept</p>
      </div>
      <div className="footer__word" data-text="SPIDER" data-pointer-reveal aria-hidden="true">Spider</div>
      <div className="container footer__bottom">
        <p>© 2026 SPIDER</p>
        <p>Design &amp; Development — <a href="https://github.com/newocontrary" target="_blank" rel="noreferrer">Newocontrary</a></p>
      </div>
    </footer>
  )
}
