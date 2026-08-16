import { useEffect, useRef } from 'react'
import { getNetworkLayout } from './networkConfig.js'

const RED = '223,37,49'
const WHITE = '255,255,255'
const lerp = (from, to, amount) => from + (to - from) * amount
const pointFor = (value, nodes, center) => value === 'c' ? center : nodes[value]

function locateSignalPoint(path, nodes, center, progress, output) {
  let total = 0
  for (let index = 0; index < path.length - 1; index += 1) {
    const from = pointFor(path[index], nodes, center)
    const to = pointFor(path[index + 1], nodes, center)
    total += Math.hypot(to.x - from.x, to.y - from.y)
  }

  let distance = progress * total
  for (let index = 0; index < path.length - 1; index += 1) {
    const from = pointFor(path[index], nodes, center)
    const to = pointFor(path[index + 1], nodes, center)
    const length = Math.hypot(to.x - from.x, to.y - from.y)
    if (distance <= length) {
      const amount = distance / length
      output.x = lerp(from.x, to.x, amount)
      output.y = lerp(from.y, to.y, amount)
      return
    }
    distance -= length
  }

  const last = pointFor(path[path.length - 1], nodes, center)
  output.x = last.x
  output.y = last.y
}

function drawSignal(context, path, nodes, center, progress, head, tail) {
  locateSignalPoint(path, nodes, center, progress, head)
  locateSignalPoint(path, nodes, center, Math.max(0, progress - 0.055), tail)

  const source = pointFor(path[0], nodes, center)
  context.fillStyle = `rgba(${RED},0.9)`
  context.fillRect(source.x - 2, source.y - 2, 4, 4)
  context.strokeStyle = `rgba(${RED},0.55)`
  context.beginPath()
  context.moveTo(tail.x, tail.y)
  context.lineTo(head.x, head.y)
  context.stroke()
  context.fillRect(head.x - 1.75, head.y - 1.75, 3.5, 3.5)
}

export default function SecurityNetworkCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const stage = canvas?.parentElement
    if (!canvas || !stage) return undefined

    const context = canvas.getContext('2d', { alpha: true })
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const state = {
      width: 0, height: 0, dpr: 1, layout: null, nodes: [], center: { x: 0, y: 0 },
      pointer: { x: 0, y: 0, active: false }, visible: false, frame: 0, start: performance.now(),
      signalHead: { x: 0, y: 0 }, signalTail: { x: 0, y: 0 },
    }

    const draw = (time, staticFrame = false) => {
      context.clearRect(0, 0, state.width, state.height)
      const elapsed = (time - state.start) / 1000

      for (const item of state.nodes) {
        let targetX = item.baseX
        let targetY = item.baseY
        let proximity = 0

        if (!reduceMotion && !staticFrame) {
          targetX += Math.sin(elapsed * 0.28 + item.phase) * (item.level === 1 ? 2.8 : 1.8)
          targetY += Math.cos(elapsed * 0.23 + item.phase * 1.3) * (item.level === 1 ? 2.2 : 1.4)

          if (finePointer && state.pointer.active && state.layout.radius) {
            const dx = targetX - state.pointer.x
            const dy = targetY - state.pointer.y
            const distance = Math.max(1, Math.hypot(dx, dy))
            proximity = Math.max(0, 1 - distance / state.layout.radius)
            const displacement = proximity * proximity * (item.level === 1 ? 13 : 9)
            targetX += (dx / distance) * displacement
            targetY += (dy / distance) * displacement
          }
        }

        item.x = staticFrame ? targetX : lerp(item.x, targetX, 0.075)
        item.y = staticFrame ? targetY : lerp(item.y, targetY, 0.075)
        item.proximity = lerp(item.proximity, proximity, 0.1)
      }

      context.lineWidth = 1
      for (const [from, to] of state.layout.links) {
        const a = pointFor(from, state.nodes, state.center)
        const b = pointFor(to, state.nodes, state.center)
        const primary = from === 'c' || to === 'c' || (state.nodes[from]?.level === 1 && state.nodes[to]?.level === 1)
        const near = Math.max(a.proximity || 0, b.proximity || 0)
        context.strokeStyle = `rgba(${WHITE},${(primary ? 0.16 : 0.075) + near * 0.1})`
        context.beginPath()
        context.moveTo(a.x, a.y)
        context.lineTo(b.x, b.y)
        context.stroke()
      }

      for (const item of state.nodes) {
        const size = item.level === 1 ? 4 : 2.5
        context.fillStyle = `rgba(${WHITE},${(item.level === 1 ? 0.5 : 0.28) + item.proximity * 0.28})`
        context.fillRect(item.x - size / 2, item.y - size / 2, size, size)
      }

      if (!reduceMotion && !staticFrame) {
        const cycle = (elapsed % 6.4) / 6.4
        if (cycle < 0.34) drawSignal(context, state.layout.signal, state.nodes, state.center, cycle / 0.34, state.signalHead, state.signalTail)
      } else {
        const source = pointFor(state.layout.signal[0], state.nodes, state.center)
        context.fillStyle = `rgba(${RED},0.88)`
        context.fillRect(source.x - 2, source.y - 2, 4, 4)
      }
    }

    const resize = () => {
      const bounds = stage.getBoundingClientRect()
      state.width = Math.max(1, bounds.width)
      state.height = Math.max(1, bounds.height)
      state.dpr = Math.min(window.devicePixelRatio || 1, 2)
      state.layout = getNetworkLayout(state.width)
      state.center.x = state.layout.center.x * state.width
      state.center.y = state.layout.center.y * state.height
      stage.style.setProperty('--network-center-x', `${state.layout.center.x * 100}%`)
      stage.style.setProperty('--network-center-y', `${state.layout.center.y * 100}%`)
      canvas.width = Math.round(state.width * state.dpr)
      canvas.height = Math.round(state.height * state.dpr)
      context.setTransform(state.dpr, 0, 0, state.dpr, 0, 0)
      state.nodes = state.layout.nodes.map((item) => ({ ...item, baseX: item.x * state.width, baseY: item.y * state.height, x: item.x * state.width, y: item.y * state.height, proximity: 0 }))
      draw(performance.now(), true)
    }

    const animate = (time) => {
      if (!state.visible || document.hidden || reduceMotion) {
        state.frame = 0
        return
      }
      draw(time)
      state.frame = requestAnimationFrame(animate)
    }

    const startAnimation = () => {
      if (!state.frame && state.visible && !document.hidden && !reduceMotion) state.frame = requestAnimationFrame(animate)
    }
    const onPointerMove = (event) => {
      if (!finePointer || event.pointerType === 'touch') return
      const bounds = stage.getBoundingClientRect()
      state.pointer.x = event.clientX - bounds.left
      state.pointer.y = event.clientY - bounds.top
      state.pointer.active = true
    }
    const onPointerLeave = () => { state.pointer.active = false }
    const onVisibility = () => {
      if (document.hidden && state.frame) cancelAnimationFrame(state.frame)
      if (document.hidden) state.frame = 0
      else startAnimation()
    }

    const resizeObserver = new ResizeObserver(resize)
    const viewObserver = new IntersectionObserver(([entry]) => {
      state.visible = entry.isIntersecting
      if (!state.visible && state.frame) cancelAnimationFrame(state.frame)
      if (!state.visible) state.frame = 0
      else startAnimation()
    }, { rootMargin: '20% 0px' })

    resizeObserver.observe(stage)
    viewObserver.observe(stage)
    stage.addEventListener('pointermove', onPointerMove, { passive: true })
    stage.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      if (state.frame) cancelAnimationFrame(state.frame)
      resizeObserver.disconnect()
      viewObserver.disconnect()
      stage.removeEventListener('pointermove', onPointerMove)
      stage.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" />
}
