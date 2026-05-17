export function createTabBar(options = {}) {
  const {
    items = [
      { label: 'Home', icon: '⌂' },
      { label: 'Search', icon: '⌕' },
      { label: 'Profile', icon: '◉' }
    ],
    active = 0,
    onChange = () => {}
  } = options

  const bar = document.createElement('nav')
  bar.className = 'pocket-tab-bar'

  bar.innerHTML = items.map((item, index) => `
    <button class="pocket-tab-bar-item ${index === active ? 'active' : ''}" data-index="${index}">
      <span class="pocket-tab-bar-icon">${item.icon}</span>
      <span class="pocket-tab-bar-label">${item.label}</span>
    </button>
  `).join('')

  document.body.appendChild(bar)

  bar.querySelectorAll('.pocket-tab-bar-item').forEach((button) => {
    button.onclick = () => {
      bar.querySelectorAll('.pocket-tab-bar-item').forEach(btn => {
        btn.classList.remove('active')
      })

      button.classList.add('active')

      const index = Number(button.dataset.index)
      onChange(index, items[index])
    }
  })

  return {
    destroy() {
      bar.remove()
    }
  }
}