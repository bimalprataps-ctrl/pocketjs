const stateMap = new WeakMap()

export function getElementState(element) {
  if (!stateMap.has(element)) {
    stateMap.set(element, {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      opacity: 1
    })
  }

  return stateMap.get(element)
}