import './style.css'
import { Pocket } from './pocket.js'

document.querySelector('#app').innerHTML = `
  <main>
    <h1>Pocket Touch</h1>

    <button id="toastBtn">Show Toast</button>
    <button id="modalBtn">Show Modal</button>

    <div id="swipeDemo"></div>
  </main>
`

document.querySelector('#toastBtn').onclick = () => {
  Pocket.createToast({
    message: 'Pocket Touch is running'
  })
}

document.querySelector('#modalBtn').onclick = () => {
  Pocket.createModal({
    title: 'Pocket Touch Modal',
    content: '<p>Modal working properly.</p>'
  })
}

Pocket.createSwipeCards({
  container: '#swipeDemo',
  cards: [
    { content: 'Swipe me' },
    { content: 'Pocket Touch' },
    { content: 'Mobile UI' }
  ]
})

Pocket.createTabBar()