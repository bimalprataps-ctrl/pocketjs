export function createToast(options = {}) {
  const {
    message = 'Pocket Touch toast',
    duration = 2500,
    position = 'bottom'
  } = options

  const toast = document.createElement('div')
  toast.className = `pocket-toast pocket-toast-${position}`
  toast.textContent = message

  document.body.appendChild(toast)

  requestAnimationFrame(() => {
    toast.classList.add('show')
  })

  setTimeout(() => {
    toast.classList.remove('show')
    setTimeout(() => toast.remove(), 300)
  }, duration)

  return toast
}