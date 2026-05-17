export function createTabs(options = {}) {
  const {
    container,
    tabs = [],
    active = 0,
    onChange = () => {}
  } = options

  const root = typeof container === 'string'
    ? document.querySelector(container)
    : container

  if (!root) return

  let activeIndex = active

  root.innerHTML = `
    <div class="pocket-tabs">
      ${tabs.map((tab, index) => `
        <button class="pocket-tab ${index === activeIndex ? 'active' : ''}" data-index="${index}">
          ${tab.label}
        </button>
      `).join('')}
    </div>

    <div class="pocket-tab-panel">
      ${tabs[activeIndex]?.content || ''}
    </div>
  `

  const buttons = root.querySelectorAll('.pocket-tab')
  const panel = root.querySelector('.pocket-tab-panel')

  buttons.forEach((button) => {
    button.onclick = () => {
      activeIndex = Number(button.dataset.index)

      buttons.forEach(btn => btn.classList.remove('active'))
      button.classList.add('active')

      panel.innerHTML = tabs[activeIndex]?.content || ''

      onChange(activeIndex, tabs[activeIndex])
    }
  })

  return {
    setActive(index) {
      buttons[index]?.click()
    }
  }
}