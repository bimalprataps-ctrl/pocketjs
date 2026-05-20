import { addFrameLoop } from './raf-loop.js'

export function decay({
  from = 0,
  velocity = 0,
  friction = 0.95,
  onUpdate,
  onComplete
}) {
  let value = from
  let currentVelocity = velocity * 16

  const stop = addFrameLoop(() => {
    currentVelocity *= friction
    value += currentVelocity

    onUpdate?.(value)

    if (Math.abs(currentVelocity) < 0.1) {
      onComplete?.()
      stop()
    }
  })

  return { stop }
}