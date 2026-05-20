export function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max)
}

export function lerp(from, to, progress) {
  return from + (to - from) * progress
}

export function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}