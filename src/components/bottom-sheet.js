export function createBottomSheet(config = {}) {
  const sheetRoot = document.createElement('div')

  sheetRoot.innerHTML = `
    <div class="pocket-overlay"></div>

    <section class="pocket-sheet">
      <div class="pocket-handle"></div>

      <h2>${config.title || 'Pocket Sheet'}</h2>

      <p>
        ${config.text || 'This is a native-feeling iOS bottom sheet built with PocketJS.'}
      </p>

      <button class="pocket-close">
        Done
      </button>
    </section>
  `

  document.body.appendChild(sheetRoot)

  const overlay = sheetRoot.querySelector('.pocket-overlay')
  const sheet = sheetRoot.querySelector('.pocket-sheet')
  const close = sheetRoot.querySelector('.pocket-close')

  let startY = 0
  let currentY = 0
  let dragging = false

  function closeSheet() {
    sheet.style.transform = 'translateY(100%)'
    overlay.style.opacity = '0'

    setTimeout(() => {
      sheetRoot.remove()
    }, 220)
  }

  sheet.addEventListener('pointerdown', (event) => {
    dragging = true
    startY = event.clientY
    sheet.style.transition = 'none'
  })

  window.addEventListener('pointermove', (event) => {
    if (!dragging) return

    currentY = event.clientY - startY

    if (currentY > 0) {
      sheet.style.transform = `translateY(${currentY}px)`
    }
  })

  window.addEventListener('pointerup', () => {
    if (!dragging) return

    dragging = false
    sheet.style.transition = 'transform .22s ease'

    if (currentY > 120) {
      closeSheet()
    } else {
      sheet.style.transform = 'translateY(0)'
    }

    currentY = 0
  })

  overlay.onclick = closeSheet
  close.onclick = closeSheet
}
