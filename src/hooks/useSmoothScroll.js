import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../utils/motion.js'

export function useSmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    const updateScroll = () => ScrollTrigger.update()
    const tick = (time) => lenis.raf(time * 1000)
    const handleAnchor = (event) => {
      const link = event.target.closest('a[href^="#"]')
      if (!link) return
      const target = document.querySelector(link.getAttribute('href'))
      if (!target) return
      event.preventDefault()
      lenis.scrollTo(target, { offset: 0, duration: 1.1 })
    }

    lenis.on('scroll', updateScroll)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    document.addEventListener('click', handleAnchor)

    return () => {
      lenis.off('scroll', updateScroll)
      gsap.ticker.remove(tick)
      document.removeEventListener('click', handleAnchor)
      lenis.destroy()
    }
  }, [])
}
