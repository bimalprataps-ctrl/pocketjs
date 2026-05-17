export function createModal(options = {}) {
  const {
    title = '',
    content = ''
  } = options

  const overlay = document.createElement('div')
  overlay.className = 'pocket-modal-overlay'

  const modal = document.createElement('div')
  modal.className = 'pocket-modal'

  modal.innerHTML = `
    <div class="pocket-modal-header">
      <h2>${title}</h2>

      <button class="pocket-modal-close">
        ✕
      </button>
    </div>

    <div class="pocket-modal-content">
      ${content}
    </div>
  `

  overlay.appendChild(modal)
  document.body.appendChild(overlay)

  requestAnimationFrame(() => {
    overlay.classList.add('show')
    modal.classList.add('show')
  })

  function close() {
    overlay.classList.remove('show')
    modal.classList.remove('show')

    setTimeout(() => {
      overlay.remove()
    }, 250)
  }

  modal.querySelector('.pocket-modal-close').onclick = close

  overlay.onclick = (event) => {
    if (event.target === overlay) {
      close()
    }
  }

  return {
    close
  }
}