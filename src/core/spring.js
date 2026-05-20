import { addFrameLoop } from './raf-loop.js'

export function createSpring({
  from = 0,
  to = 0,
  stiffness = 180,
  damping = 18,
  mass = 1,
  restSpeed = 0.01,
  restDelta = 0.01,
  onUpdate,
  onComplete
}) {
  let value = from
  let velocity = 0
  let lastTime = performance.now()

  const stop = addFrameLoop((time) => {
    const delta = Math.min((time - lastTime) / 1000, 0.032)
    lastTime = time

    const force = -stiffness * (value - to)
    const dampingForce = -damping * velocity
    const acceleration = (force + dampingForce) / mass

    velocity += acceleration * delta
    value += velocity * delta

    onUpdate?.(value)

    const done =
      Math.abs(velocity) < restSpeed &&
      Math.abs(to - value) < restDelta

    if (done) {
      onUpdate?.(to)
      onComplete?.()
      stop()
    }
  })

  return { stop }
}