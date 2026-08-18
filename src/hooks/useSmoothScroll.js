import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../utils/motion.js'

export function useSmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    let refreshFrame = 0

    const lenis = new Lenis({
      duration: coarsePointer ? 1 : 1.15,
      smoothWheel: !coarsePointer,
      syncTouch: false,
      touchMultiplier: 1,
    })
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
    const lockIntro = () => lenis.stop()
    const releaseIntro = () => {
      lenis.scrollTo(0, { immediate: true, force: true })
      lenis.start()
      ScrollTrigger.refresh()
    }
    const refreshLayout = () => {
      window.cancelAnimationFrame(refreshFrame)
      refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    }

    lenis.on('scroll', updateScroll)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    document.addEventListener('click', handleAnchor)
    window.addEventListener('spider:intro-lock', lockIntro)
    window.addEventListener('spider:intro-release', releaseIntro)
    window.addEventListener('orientationchange', refreshLayout)
    if (document.documentElement.classList.contains('is-intro-locked')) lenis.stop()

    return () => {
      lenis.off('scroll', updateScroll)
      gsap.ticker.remove(tick)
      document.removeEventListener('click', handleAnchor)
      window.removeEventListener('spider:intro-lock', lockIntro)
      window.removeEventListener('spider:intro-release', releaseIntro)
      window.removeEventListener('orientationchange', refreshLayout)
      window.cancelAnimationFrame(refreshFrame)
      lenis.destroy()
    }
  }, [])
}
