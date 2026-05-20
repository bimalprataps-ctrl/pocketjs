// src/core/animation-engine.js

import { addFrameLoop } from './raf-loop.js'
import { clamp, lerp, easeOutCubic } from './interpolate.js'
import { createSpring } from './spring.js'
import { getElementState } from './element-state.js'

const ignoredKeys = new Set([
  'duration',
  'easing',
  'spring',
  'damping',
  'stiffness',
  'mass'
])

function getElement(target) {
  if (typeof target === 'string') {
    return document.querySelector(target)
  }

  return target
}

function readInitialValue(element, key) {
  if (key === 'opacity') {
    return Number(getComputedStyle(element).opacity) || 0
  }

  return 0
}

function applyMotion(element, values) {
  const x = values.x ?? 0
  const y = values.y ?? 0
  const scale = values.scale ?? 1
  const rotate = values.rotate ?? 0

  element.style.transform = `
    translate3d(${x}px, ${y}px, 0)
    scale(${scale})
    rotate(${rotate}deg)
  `

  if (values.opacity !== undefined) {
    element.style.opacity = values.opacity
  }
}

export function animate(target, options = {}) {
  const element = getElement(target)
  if (!element) return null

  const state = getElementState(element)

  const duration = options.duration ?? 420
  const easing = options.easing ?? easeOutCubic

  const from = {}
  const to = {}

  Object.keys(options).forEach((key) => {
    if (ignoredKeys.has(key)) return

    from[key] = state[key] ?? readInitialValue(element, key)
    to[key] = options[key]
  })

  const startTime = performance.now()

  const stop = addFrameLoop((time) => {
    const elapsed = time - startTime
    const progress = clamp(elapsed / duration)
    const eased = easing(progress)

    const current = { ...state }

    Object.keys(to).forEach((key) => {
      current[key] = lerp(from[key], to[key], eased)
      state[key] = current[key]
    })

    applyMotion(element, current)

    if (progress >= 1) {
      Object.keys(to).forEach((key) => {
        state[key] = to[key]
      })

      applyMotion(element, state)
      stop()
    }
  })

  return {
    stop
  }
}

export function spring(target, options = {}) {
  const element = getElement(target)
  if (!element) return null

  const state = getElementState(element)
  const springs = []

  Object.keys(options).forEach((key) => {
    if (ignoredKeys.has(key)) return

    const springInstance = createSpring({
      from: state[key] ?? readInitialValue(element, key),
      to: options[key],
      stiffness: options.stiffness ?? 180,
      damping: options.damping ?? 18,
      mass: options.mass ?? 1,

      onUpdate(value) {
        state[key] = value
        applyMotion(element, state)
      },

      onComplete() {
        state[key] = options[key]
        applyMotion(element, state)
      }
    })

    springs.push(springInstance)
  })

  return {
    stop() {
      springs.forEach((s) => s.stop())
    }
  }
}

export function motion(target, options = {}) {
  if (options.spring) {
    return spring(target, options)
  }

  return animate(target, options)
}