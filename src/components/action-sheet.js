export function createActionSheet(options = {}) {
  const {
    title = '',
    message = '',
    actions = [],
    cancelText = 'Cancel'
  } = options

  const overlay = document.createElement('div')
  overlay.className = 'pocket-action-overlay'

  const sheet = document.createElement('div')
  sheet.className = 'pocket-action-sheet'

  sheet.innerHTML = `
    <div class="pocket-action-header">
      ${title ? `<h3>${title}</h3>` : ''}
      ${message ? `<p>${message}</p>` : ''}
    </div>

    <div class="pocket-action-list"></div>

    <button class="pocket-action-cancel">
      ${cancelText}
    </button>
  `

  const list = sheet.querySelector('.pocket-action-list')

  actions.forEach((action) => {
    const button = document.createElement('button')
    button.className = action.destructive
      ? 'pocket-action-button destructive'
      : 'pocket-action-button'

    button.textContent = action.label

    button.onclick = () => {
      close()
      action.onClick?.()
    }

    list.appendChild(button)
  })

  function close() {
    overlay.classList.remove('show')
    sheet.classList.remove('show')

    setTimeout(() => {
      overlay.remove()
    }, 250)
  }

  sheet.querySelector('.pocket-action-cancel').onclick = close
  overlay.onclick = (event) => {
    if (event.target === overlay) close()
  }

  overlay.appendChild(sheet)
  document.body.appendChild(overlay)

  requestAnimationFrame(() => {
    overlay.classList.add('show')
    sheet.classList.add('show')
  })

  return {
    close
  }
}