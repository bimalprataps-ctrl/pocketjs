export class VelocityTracker {
  constructor() {
    this.positions = []
  }

  add(position) {
    this.positions.push({
      position,
      time: performance.now()
    })

    if (this.positions.length > 5) {
      this.positions.shift()
    }
  }

  getVelocity() {
    if (this.positions.length < 2) {
      return 0
    }

    const first = this.positions[0]
    const last = this.positions[this.positions.length - 1]

    const deltaPosition = last.position - first.position
    const deltaTime = last.time - first.time

    if (deltaTime === 0) {
      return 0
    }

    return deltaPosition / deltaTime
  }

  reset() {
    this.positions = []
  }
}