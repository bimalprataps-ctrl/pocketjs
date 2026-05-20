export function createModal(options = {}) {
  const {
    title = '',
    description = '',
    content = '',
    actions = []
  } = options

  document
    .querySelectorAll('.pocket-modal-overlay')
    .forEach((el) => el.remove())

  const overlay = document.createElement('div')
  overlay.className = 'pocket-modal-overlay'

  const modal = document.createElement('div')
  modal.className = 'pocket-modal'

  const actionsHtml = actions.length
    ? `
      <div class="pocket-modal-actions">
        ${actions
          .map(
            (action, index) => `
              <button
                type="button"
                data-pocket-modal-action="${index}"
                class="pocket-modal-action pocket-modal-action-${action.style || 'secondary'}"
              >
                ${action.label || 'OK'}
              </button>
            `
          )
          .join('')}
      </div>
    `
    : ''

  modal.innerHTML = `
    <button type="button" class="pocket-modal-close" aria-label="Close modal">
      ✕
    </button>

    <div class="pocket-modal-content">
      ${title ? `<h2>${title}</h2>` : ''}
      ${description ? `<p>${description}</p>` : ''}
      ${content || ''}
      ${actionsHtml}
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

  modal.querySelector('.pocket-modal-close')?.addEventListener('click', close)

  modal.querySelectorAll('.pocket-modal-action').forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.pocketModalAction)
      actions[index]?.onClick?.()
      close()
    })
  })

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) close()
  })

  return { close }
}