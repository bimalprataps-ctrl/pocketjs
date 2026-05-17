export function createPullToRefresh(options = {}) {
  const {
    threshold = 80,
    onRefresh = async () => {}
  } = options

  let startY = 0
  let distance = 0
  let isPulling = false

  const indicator = document.createElement('div')
  indicator.className = 'pocket-pull-refresh'
  indicator.textContent = 'Pull to refresh'
  document.body.appendChild(indicator)

  window.addEventListener('touchstart', (event) => {
    if (window.scrollY !== 0) return

    startY = event.touches[0].clientY
    isPulling = true
  })

  window.addEventListener('touchmove', (event) => {
    if (!isPulling) return

    distance = event.touches[0].clientY - startY

    if (distance <= 0) return

    indicator.classList.add('visible')
    indicator.style.transform = `translateX(-50%) translateY(${Math.min(distance, 100)}px)`

    indicator.textContent = distance > threshold
      ? 'Release to refresh'
      : 'Pull to refresh'
  })

  window.addEventListener('touchend', async () => {
    if (!isPulling) return

    if (distance > threshold) {
      indicator.textContent = 'Refreshing...'
      await onRefresh()
    }

    indicator.classList.remove('visible')
    indicator.style.transform = 'translateX(-50%) translateY(0px)'

    startY = 0
    distance = 0
    isPulling = false
  })

  return {
    destroy() {
      indicator.remove()
    }
  }
}