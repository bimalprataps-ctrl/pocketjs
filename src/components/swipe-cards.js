export function createSwipeCards(options = {}) {
  const { container, cards = [] } = options

  const root = typeof container === 'string'
    ? document.querySelector(container)
    : container

  if (!root || !cards.length) return

  let currentIndex = 0

  root.classList.add('pocket-swipe-root')

  root.innerHTML = cards.map((card, index) => `
    <div class="pocket-swipe-card" data-index="${index}">
      ${card.content}
    </div>
  `).join('')

  const cardElements = [...root.querySelectorAll('.pocket-swipe-card')]

  function layoutCards() {
    cardElements.forEach((card, index) => {
      const depth = index - currentIndex

      card.style.transition = '0.3s ease'

      if (depth < 0) {
        card.style.opacity = '0'
        card.style.pointerEvents = 'none'
        card.style.transform = 'translateX(-120%) rotate(-18deg)'
        card.style.zIndex = '0'
        return
      }

      if (depth > 3) {
        card.style.opacity = '0'
        card.style.pointerEvents = 'none'
        card.style.transform = 'translateY(90px) scale(0.76)'
        card.style.zIndex = '0'
        return
      }

      card.style.opacity = '1'
      card.style.zIndex = String(100 - depth)
      card.style.pointerEvents = depth === 0 ? 'auto' : 'none'
      card.style.transform = `
        translateY(${depth * 28}px)
        scale(${1 - depth * 0.06})
      `
    })
  }

  layoutCards()

  cardElements.forEach((card, index) => {
    let startX = 0
    let currentX = 0
    let dragging = false

    card.addEventListener('pointerdown', (event) => {
      if (index !== currentIndex) return

      dragging = true
      startX = event.clientX
      currentX = startX

      card.setPointerCapture(event.pointerId)
      card.style.transition = 'none'
    })

    card.addEventListener('pointermove', (event) => {
      if (!dragging || index !== currentIndex) return

      currentX = event.clientX
      const diff = currentX - startX

      card.style.transform = `
        translateX(${diff}px)
        rotate(${diff * 0.05}deg)
      `
    })

    card.addEventListener('pointerup', () => {
      if (!dragging || index !== currentIndex) return

      dragging = false

      const diff = currentX - startX

      if (diff < -100 && currentIndex < cards.length - 1) {
        card.style.transition = '0.35s ease'
        card.style.transform = 'translateX(-120%) rotate(-18deg)'
        card.style.opacity = '0'

        currentIndex += 1
        setTimeout(layoutCards, 220)
        return
      }

      if (diff > 100 && currentIndex > 0) {
        currentIndex -= 1
        layoutCards()
        return
      }

      layoutCards()
    })
  })
}