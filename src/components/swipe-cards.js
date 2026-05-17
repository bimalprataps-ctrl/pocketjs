export function createSwipeCards(options = {}) {
  const { container, cards = [] } = options

  const root = typeof container === 'string'
    ? document.querySelector(container)
    : container

  if (!root) return

  let activeIndex = cards.length - 1
  const history = []

  root.classList.add('pocket-swipe-root')

  root.innerHTML = cards.map((card, index) => `
    <div class="pocket-swipe-card" data-index="${index}">
      ${card.content}
    </div>
  `).join('')

  const cardElements = [...root.querySelectorAll('.pocket-swipe-card')]

  function layoutCards() {
    cardElements.forEach((card, index) => {
      const depth = activeIndex - index

      card.style.transition = '0.3s ease'

      if (depth < 0) {
        card.style.opacity = '0'
        card.style.pointerEvents = 'none'
        card.style.transform = 'translateX(1000px) rotate(20deg)'
        return
      }

      card.style.opacity = '1'
      card.style.zIndex = cards.length - depth
      card.style.pointerEvents = depth === 0 ? 'auto' : 'none'
      card.style.transform = `
        translateY(${depth * 34}px)
        scale(${1 - depth * 0.08})
      `
    })
  }

  function restorePreviousCard() {
    if (!history.length) {
      return false
    }

    activeIndex = history.pop()
    layoutCards()

    return true
  }

  layoutCards()

  cardElements.forEach((card, index) => {
    let startX = 0
    let currentX = 0
    let isDragging = false

    card.addEventListener('touchstart', (event) => {
      if (index !== activeIndex) return

      isDragging = true
      startX = event.touches[0].clientX
      currentX = startX
      card.style.transition = 'none'
    }, { passive: true })

    card.addEventListener('touchmove', (event) => {
      if (index !== activeIndex || !isDragging) return

      currentX = event.touches[0].clientX
      const diff = currentX - startX

      card.style.transform = `
        translateX(${diff}px)
        rotate(${diff * 0.05}deg)
      `
    }, { passive: true })

    card.addEventListener('touchend', () => {
      if (index !== activeIndex || !isDragging) return

      isDragging = false

      const diff = currentX - startX

      if (diff < -120) {
        card.style.transition = '0.35s ease'
        card.style.transform = 'translateX(-1000px) rotate(-20deg)'
        card.style.opacity = '0'

        history.push(activeIndex)
        activeIndex -= 1

        setTimeout(layoutCards, 250)
        return
      }

      if (diff > 120) {
        const restored = restorePreviousCard()

        if (!restored) {
          card.style.transition = '0.35s ease'
          card.style.transform = 'translateX(1000px) rotate(20deg)'
          card.style.opacity = '0'

          history.push(activeIndex)
          activeIndex -= 1

          setTimeout(layoutCards, 250)
        }

        return
      }

      layoutCards()
    }, { passive: true })
  })
}