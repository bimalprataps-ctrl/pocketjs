window.Pocket = {
  createBottomSheet(config = {}) {
    const sheetRoot = document.createElement('div')

    sheetRoot.innerHTML = `
      <div class="pocket-overlay"></div>

      <section class="pocket-sheet">
        <div class="pocket-handle"></div>
        <h2>${config.title || 'Pocket Sheet'}</h2>
        <p>${config.text || 'This is a PocketJS bottom sheet.'}</p>
        <button class="pocket-close">Done</button>
      </section>
    `

    document.body.appendChild(sheetRoot)

    const overlay = sheetRoot.querySelector('.pocket-overlay')
    const sheet = sheetRoot.querySelector('.pocket-sheet')
    const close = sheetRoot.querySelector('.pocket-close')

    function closeSheet() {
      sheet.style.transform = 'translateY(100%)'
      overlay.style.opacity = '0'
      setTimeout(() => sheetRoot.remove(), 220)
    }

    overlay.onclick = closeSheet
    close.onclick = closeSheet
  }
}