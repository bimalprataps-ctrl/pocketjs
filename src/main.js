import './style.css'
import { Pocket } from './pocket.js'

document.querySelector('#app').innerHTML = `
  <main>
    <h1>Pocket Touch</h1>

    <button id="toastBtn">Show Toast</button>
    <button id="modalBtn">Show Modal</button>
    <button id="motionBtn">Test Motion</button>
    <button id="resetMotionBtn">Reset Motion</button>

    <div id="swipeDemo"></div>

    <div id="motionDemo">
      Drag Physics Demo
    </div>
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

Pocket.drag('#motionDemo', {
  axis: 'x',
  momentum: true,
  snapBack: true,
  min: -160,
  max: 160,
  resistance: 0.28,
  friction: 0.92,
  damping: 18,
  stiffness: 180
})

document.querySelector('#motionBtn').onclick = () => {
  Pocket.spring('#motionDemo', {
    y: -40,
    scale: 1.04,
    damping: 16,
    stiffness: 180
  })
}

document.querySelector('#resetMotionBtn').onclick = () => {
  Pocket.spring('#motionDemo', {
    y: 0,
    scale: 1,
    damping: 16,
    stiffness: 180
  })
}