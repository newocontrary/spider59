import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../utils/motion.js'
import LogoMark from '../Logo/LogoMark.jsx'
import './Preloader.css'

export default function Preloader() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const node = root.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      const hide = gsap.delayedCall(0.08, () => { node.hidden = true })
      return () => hide.kill()
    }
    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.preloader__mark', { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.22 }, 0)
        .to('.preloader__mark .logo-mark__route', { strokeDashoffset: 0, duration: 0.44, ease: 'power2.inOut' }, 0)
        .to('.preloader__mark .logo-mark__branch', { strokeDashoffset: 0, duration: 0.28, stagger: 0.025, ease: 'power2.out' }, 0.15)
        .from('.preloader__mark .logo-mark__node', { opacity: 0, scale: 0.7, transformOrigin: 'center', duration: 0.2 }, 0.28)
        .from('.preloader__name', { yPercent: 110, duration: 0.34 }, 0.38)
        .from('.preloader__descriptor', { y: 6, opacity: 0, duration: 0.28 }, 0.48)
        .to(node, { yPercent: -100, duration: 0.55, onComplete: () => { node.hidden = true } }, 0.8)
    }, node)
    return () => context.revert()
  }, [])

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader__brand">
        <LogoMark className="preloader__mark" />
        <span className="preloader__word">
          <strong className="preloader__name">SPIDER</strong>
          <small className="preloader__descriptor">Security</small>
        </span>
      </div>
    </div>
  )
}
