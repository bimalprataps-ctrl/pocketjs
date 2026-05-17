import './style.css'
import { Pocket } from './pocket.js'

document.querySelector('#app').innerHTML = `
  <main>
    <h1>PocketJS</h1>

    <button id="toastBtn">Show Toast</button>
    <button id="modalBtn">Show Modal</button>

    <div id="swipeDemo"></div>
  </main>
`

document.querySelector('#toastBtn').onclick = () => {
  Pocket.createToast({
    message: 'PocketJS is running'
  })
}

document.querySelector('#modalBtn').onclick = () => {
  Pocket.createModal({
    title: 'PocketJS Modal',
    content: '<p>Modal working properly.</p>'
  })
}

Pocket.createSwipeCards({
  container: '#swipeDemo',
  cards: [
    { content: 'Swipe me' },
    { content: 'PocketJS' },
    { content: 'Mobile UI' }
  ]
})

Pocket.createTabBar()