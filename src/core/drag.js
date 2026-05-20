import { VelocityTracker } from './velocity.js'
import { spring } from './animation-engine.js'
import { getElementState } from './element-state.js'
import { decay } from './decay.js'
import { rubberband } from './rubberband.js'

function getElement(target) {
  if (typeof target === 'string') {
    return document.querySelector(target)
  }

  return target
}

export function drag(target, options = {}) {
  const element = getElement(target)
  if (!element) return null

  const axis = options.axis ?? 'y'
  const state = getElementState(element)
  const tracker = new VelocityTracker()

  let startPointer = 0
  let startValue = 0
  let dragging = false
  let activeDecay = null

  function apply() {
    const x = state.x ?? 0
    const y = state.y ?? 0
    const scale = state.scale ?? 1
    const rotate = state.rotate ?? 0

    element.style.transform = `
      translate3d(${x}px, ${y}px, 0)
      scale(${scale})
      rotate(${rotate}deg)
    `
  }

  function springTo(value) {
    spring(element, {
      [axis]: value,
      damping: options.damping ?? 18,
      stiffness: options.stiffness ?? 180
    })
  }

  function snapToTarget() {
    if (options.min !== undefined && state[axis] < options.min) {
      springTo(options.min)
      return
    }

    if (options.max !== undefined && state[axis] > options.max) {
      springTo(options.max)
      return
    }

    if (options.snapBack === false) return

    springTo(options.to ?? 0)
  }

  function onPointerDown(event) {
    activeDecay?.stop?.()
    activeDecay = null

    dragging = true
    element.style.cursor = 'grabbing'
    element.setPointerCapture?.(event.pointerId)

    startPointer = axis === 'x' ? event.clientX : event.clientY
    startValue = state[axis] ?? 0

    tracker.reset()
    tracker.add(startPointer)
  }

  function onPointerMove(event) {
    if (!dragging) return

    const currentPointer = axis === 'x' ? event.clientX : event.clientY
    const delta = currentPointer - startPointer

    let nextValue = startValue + delta

    if (options.min !== undefined && options.max !== undefined) {
      nextValue = rubberband(
        nextValue,
        options.min,
        options.max,
        options.resistance ?? 0.35
      )
    }

    state[axis] = nextValue

    tracker.add(currentPointer)
    apply()

    options.onDrag?.({
      value: state[axis],
      velocity: tracker.getVelocity()
    })
  }

  function onPointerUp(event) {
    if (!dragging) return

    dragging = false
    element.style.cursor = 'grab'
    element.releasePointerCapture?.(event.pointerId)

    const velocity = tracker.getVelocity()

    options.onRelease?.({
      value: state[axis],
      velocity
    })

    if (options.momentum) {
      activeDecay = decay({
        from: state[axis],
        velocity,
        friction: options.friction ?? 0.92,

        onUpdate(value) {
          let nextValue = value

          if (options.min !== undefined && options.max !== undefined) {
            nextValue = rubberband(
              nextValue,
              options.min,
              options.max,
              options.resistance ?? 0.35
            )
          }

          state[axis] = nextValue
          apply()
        },

        onComplete() {
          activeDecay = null
          snapToTarget()
        }
      })

      return
    }

    snapToTarget()
  }

  element.style.touchAction = axis === 'x' ? 'pan-y' : 'pan-x'
  element.style.cursor = 'grab'

  element.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)

  return {
    destroy() {
      activeDecay?.stop?.()

      element.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }
}