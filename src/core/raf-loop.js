const loops = new Set()
let rafId = null

function frame(time) {
  loops.forEach((loop) => loop(time))

  if (loops.size) {
    rafId = requestAnimationFrame(frame)
  } else {
    rafId = null
  }
}

export function addFrameLoop(loop) {
  loops.add(loop)

  if (!rafId) {
    rafId = requestAnimationFrame(frame)
  }

  return function stop() {
    loops.delete(loop)
  }
}