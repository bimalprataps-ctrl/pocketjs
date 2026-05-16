export function createSwipeCards(config = {}) {
  const mount = document.querySelector(config.mount)

  if (!mount) {
    throw new Error('PocketJS: createSwipeCards requires a valid mount element.')
  }

  if (!config.cards || !Array.isArray(config.cards)) {
    throw new Error('PocketJS: createSwipeCards requires a cards array.')
  }

  let current = 0

  function render() {
    const item = config.cards[current]

    if (!item) {
      mount.innerHTML = `
        <div class="pocket-done">
          <strong>No more cards</strong>
          <span>Swipe stack complete.</span>
        </div>
      `
      return
    }

    mount.innerHTML = `
      <section class="pocket-card-wrap">

        <article class="pocket-card" id="pocketCard">

          <p class="pocket-card-eyebrow">
            ${item.category || 'CARD'}
          </p>

          <h2>
            ${item.title || 'Untitled'}
          </h2>

          <p>
            ${item.text || ''}
          </p>

        </article>

      </section>
    `

    const card = document.querySelector('#pocketCard')

    let startX = 0
    let currentX = 0
    let dragging = false

    card.addEventListener('pointerdown', (event) => {
      dragging = true
      startX = event.clientX
      card.style.transition = 'none'
      card.setPointerCapture?.(event.pointerId)
    })

    window.addEventListener('pointermove', (event) => {
      if (!dragging) return

      currentX = event.clientX - startX

      card.style.transform = `
        translateX(${currentX}px)
        rotate(${currentX * 0.04}deg)
      `
    })

    window.addEventListener('pointerup', () => {
      if (!dragging) return

      dragging = false
      card.style.transition = 'all .22s ease'

      if (Math.abs(currentX) > 120) {
        card.style.transform = `
          translateX(${currentX > 0 ? 600 : -600}px)
          rotate(${currentX * 0.06}deg)
        `

        setTimeout(() => {
          current++
          render()
        }, 220)
      } else {
        card.style.transform = `
          translateX(0)
          rotate(0deg)
        `
      }

      currentX = 0
    })
  }

  render()
}
