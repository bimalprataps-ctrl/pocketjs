import './style.css'
import { Pocket } from './pocket.js'

document.querySelector('#app').innerHTML = `
  <main class="demo">

    <section class="iphone">

      <div class="statusbar">
        <span>9:41</span>
        <span>PocketJS</span>
      </div>

      <section class="intro">
        <p class="eyebrow">MOBILE INTERACTION FRAMEWORK</p>

        <h1>
          Native-feeling web apps.
        </h1>

        <p>
          PocketJS gives developers reusable mobile interactions like bottom sheets,
          swipe cards, and touch-first UI patterns.
        </p>

        <button id="openSheet">
          Open Bottom Sheet
        </button>
      </section>

      <section class="cards-section">
        <p class="section-label">Swipe Cards Demo</p>
        <div id="cards"></div>
      </section>

    </section>

  </main>
`

document.querySelector('#openSheet').onclick = () => {
  Pocket.createBottomSheet({
    title: 'iOS Bottom Sheet',
    text: 'This is a reusable PocketJS component. It includes overlay blur, native motion, close behavior, and drag-to-close interaction.'
  })
}

Pocket.createSwipeCards({
  mount: '#cards',

  cards: [
    {
      category: 'AUDIO',
      title: 'OxfordMind',
      text: 'Audio-first book learning built for the mobile era.'
    },

    {
      category: 'SOCIAL',
      title: 'ZeroFilter',
      text: 'A calm text-first social network for slower interaction.'
    },

    {
      category: 'LEARNING',
      title: 'LearnTok',
      text: 'Swipe-native educational experiences for the next generation.'
    }
  ]
})
