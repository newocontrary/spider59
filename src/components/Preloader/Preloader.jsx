import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../utils/motion.js'
import LogoMark from '../Logo/LogoMark.jsx'
import './Preloader.css'

export default function Preloader() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const node = root.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let ready = reduced
    let pendingExit = false
    let dismissed = false
    let released = false

    document.documentElement.classList.add('is-intro-locked')
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    const announceHero = () => window.dispatchEvent(new Event('spider:intro-complete'))
    const removeIntentListeners = () => {
      window.removeEventListener('wheel', handleIntent)
      window.removeEventListener('touchmove', handleIntent)
      window.removeEventListener('scroll', handleIntent)
      window.removeEventListener('keydown', handleKey)
    }
    const release = () => {
      if (released) return
      released = true
      node.hidden = true
      document.documentElement.classList.remove('is-intro-locked')
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      window.dispatchEvent(new Event('spider:intro-release'))
      removeIntentListeners()
    }
    const dismiss = () => {
      if (dismissed) return
      if (!ready) {
        pendingExit = true
        return
      }
      dismissed = true
      announceHero()
      if (reduced) {
        release()
        return
      }
      gsap.to(node, { yPercent: -100, duration: 0.72, ease: 'power4.inOut', onComplete: release })
    }
    function handleIntent(event) {
      if (event.cancelable) event.preventDefault()
      if (event.type === 'scroll') window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      dismiss()
    }
    function handleKey(event) {
      if (['ArrowDown', 'PageDown', ' ', 'Enter'].includes(event.key)) {
        event.preventDefault()
        dismiss()
      }
    }

    window.addEventListener('wheel', handleIntent, { passive: false })
    window.addEventListener('touchmove', handleIntent, { passive: false })
    window.addEventListener('scroll', handleIntent, { passive: true })
    window.addEventListener('keydown', handleKey)

    if (reduced) {
      if (pendingExit) dismiss()
      return removeIntentListeners
    }

    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: () => { ready = true; if (pendingExit) dismiss() } })
        .from('.preloader__meta', { opacity: 0, y: 12, duration: 0.55 }, 0)
        .from('.preloader__name', { yPercent: 105, duration: 0.78 }, 0.08)
        .from('.preloader__subtitle', { y: 12, opacity: 0, duration: 0.45 }, 0.38)
        .fromTo('.preloader__mark', { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.42)
        .to('.preloader__mark .logo-mark__route', { strokeDashoffset: 0, duration: 0.62, ease: 'power2.inOut' }, 0.42)
        .to('.preloader__mark .logo-mark__branch', { strokeDashoffset: 0, duration: 0.34, stagger: 0.04, ease: 'power2.out' }, 0.66)
        .from('.preloader__mark .logo-mark__node', { opacity: 0, scale: 0.45, transformOrigin: 'center', duration: 0.28 }, 0.82)
        .to('.preloader__mark .logo-mark__node', { fill: '#ffffff', duration: 0.16, repeat: 1, yoyo: true }, 0.94)
        .to('.preloader__line i', { scaleX: 1, duration: 1.04, ease: 'power2.inOut' }, 0)
        .from('.preloader__prompt', { opacity: 0, y: 8, duration: 0.4 }, 0.82)
    }, node)
    return () => {
      removeIntentListeners()
      context.revert()
      document.documentElement.classList.remove('is-intro-locked')
    }
  }, [])

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader__meta"><span>Security agency</span><span>Perm / 59</span></div>
      <div className="preloader__brand">
        <span className="preloader__word">
          <strong className="preloader__name">SPIDER</strong>
          <small className="preloader__subtitle">Безопасность — прежде всего.</small>
        </span>
        <LogoMark className="preloader__mark" />
      </div>
      <p className="preloader__prompt">Scroll to enter <i aria-hidden="true">↓</i></p>
      <div className="preloader__line"><i /></div>
    </div>
  )
}
