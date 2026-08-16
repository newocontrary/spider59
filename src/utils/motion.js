import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const motion = {
  duration: 1.05,
  ease: 'power3.out',
  stagger: 0.08,
}

export { gsap, ScrollTrigger }
