import { useEffect, useRef } from 'react'
import { gsap } from '../../../utils/motion.js'
import ArrowUpRight from '../../icons/ArrowUpRight.jsx'
import './Button.css'

export default function Button({ children, variant = 'primary', href, className = '', magnetic = true, ...props }) {
  const contentRef = useRef(null)
  const classes = `button button--${variant} ${className}`.trim()

  useEffect(() => {
    const content = contentRef.current
    const button = content?.parentElement
    const precisePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!button || !magnetic || !precisePointer || reducedMotion) return undefined

    const moveX = gsap.quickTo(content, 'x', { duration: 0.35, ease: 'power3.out' })
    const moveY = gsap.quickTo(content, 'y', { duration: 0.35, ease: 'power3.out' })
    const handleMove = (event) => {
      const bounds = button.getBoundingClientRect()
      moveX(((event.clientX - bounds.left) / bounds.width - 0.5) * 8)
      moveY(((event.clientY - bounds.top) / bounds.height - 0.5) * 8)
    }
    const handleLeave = () => {
      moveX(0)
      moveY(0)
    }

    button.addEventListener('pointermove', handleMove, { passive: true })
    button.addEventListener('pointerleave', handleLeave)
    return () => {
      button.removeEventListener('pointermove', handleMove)
      button.removeEventListener('pointerleave', handleLeave)
      gsap.killTweensOf(content)
    }
  }, [magnetic])

  const content = (
    <span className="button__content" ref={contentRef}>
      <span>{children}</span><ArrowUpRight className="button__arrow" />
    </span>
  )

  return href ? <a className={classes} href={href} {...props}>{content}</a> : <button className={classes} {...props}>{content}</button>
}
