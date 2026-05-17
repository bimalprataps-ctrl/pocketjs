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

      if (depth < 0) {
        card.style.opacity = '0'
        card.style.pointerEvents = 'none'
        card.style.transform = 'translateY(0) scale(1)'
        return
      }

      card.style.opacity = '1'
      card.style.zIndex = cards.length - depth
      card.style.pointerEvents = depth === 0 ? 'auto' : 'none'
      card.style.transition = '0.3s ease'

      card.style.transform = `
        translateY(${depth * 34}px)
        scale(${1 - depth * 0.08})
      `
    })
  }

  function restorePreviousCard() {
    if (!history.length) return

    const previousIndex = history.pop()
    activeIndex = previousIndex

    const card = cardElements[activeIndex]

    card.style.transition = 'none'
    card.style.opacity = '1'
    card.style.transform = 'translateX(-1000px) rotate(-20deg)'

    requestAnimationFrame(() => {
      card.style.transition = '0.35s ease'
      layoutCards()
    })
  }

  layoutCards()

  cardElements.forEach((card, index) => {
    let startX = 0
    let currentX = 0

    card.addEventListener('touchstart', (event) => {
      if (index !== activeIndex) return

      startX = event.touches[0].clientX
      currentX = startX
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

      if (diff > 120) {
        restorePreviousCard()
        return
      }

      if (diff < -120) {
        card.style.transition = '0.35s ease'
        card.style.transform = 'translateX(-1000px) rotate(-20deg)'
        card.style.opacity = '0'

        history.push(activeIndex)
        activeIndex -= 1

        setTimeout(layoutCards, 250)
        return
      }

      card.style.transition = '0.35s ease'
      layoutCards()
    })
  })
}