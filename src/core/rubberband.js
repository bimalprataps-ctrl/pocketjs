export function rubberband(value, min, max, resistance = 0.35) {
  if (value < min) {
    return min + (value - min) * resistance
  }

  if (value > max) {
    return max + (value - max) * resistance
  }

  return value
}