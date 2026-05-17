export function createSwipeCards(options = {}) {
  const { container, cards = [] } = options

  const root = typeof container === 'string'
    ? document.querySelector(container)
    : container

  if (!root) return

  let activeIndex = cards.length - 1

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

      card.style.zIndex = index
      card.style.opacity = depth < 0 ? '0' : '1'
      card.style.transform = `
        scale(${1 - Math.max(depth, 0) * 0.04})
        translateY(${Math.max(depth, 0) * 10}px)
      `
    })
  }

  layoutCards()

  cardElements.forEach((card, index) => {
    let startX = 0
    let currentX = 0

    card.addEventListener('touchstart', (event) => {
      if (index !== activeIndex) return

      startX = event.touches[0].clientX
      card.style.transition = 'none'
    })

    card.addEventListener('touchmove', (event) => {
      if (index !== activeIndex) return

      currentX = event.touches[0].clientX
      const diff = currentX - startX

      card.style.transform = `
        translateX(${diff}px)
        rotate(${diff * 0.05}deg)
      `
    })

    card.addEventListener('touchend', () => {
      if (index !== activeIndex) return

      const diff = currentX - startX

      if (Math.abs(diff) > 120) {
        card.style.transition = '0.35s ease'
        card.style.transform = `
          translateX(${diff > 0 ? 1000 : -1000}px)
          rotate(${diff > 0 ? 20 : -20}deg)
        `
        card.style.opacity = '0'

        activeIndex -= 1
        setTimeout(layoutCards, 250)
      } else {
        card.style.transition = '0.35s ease'
        layoutCards()
      }
    })
  })
}