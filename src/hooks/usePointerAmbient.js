import { useEffect } from 'react'

export function usePointerAmbient() {
  useEffect(() => {
    const precisePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!precisePointer || reducedMotion) return undefined

    let activeSection = null
    const handlePointerMove = (event) => {
      const section = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-pointer-ambient]')
      if (!section) {
        activeSection?.classList.remove('is-pointer-active')
        activeSection = null
        return
      }

      if (activeSection !== section) {
        activeSection?.classList.remove('is-pointer-active')
        activeSection = section
        activeSection.classList.add('is-pointer-active')
      }

      const bounds = section.getBoundingClientRect()
      section.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`)
      section.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`)
      const localReveal = section.querySelector('[data-pointer-reveal]')
      if (localReveal) {
        const revealBounds = localReveal.getBoundingClientRect()
        localReveal.style.setProperty('--reveal-x', `${event.clientX - revealBounds.left}px`)
        localReveal.style.setProperty('--reveal-y', `${event.clientY - revealBounds.top}px`)
      }
    }
    const handlePointerLeave = () => {
      activeSection?.classList.remove('is-pointer-active')
      activeSection = null
    }

    document.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', handlePointerLeave)
    return () => {
      document.removeEventListener('pointermove', handlePointerMove)
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])
}
