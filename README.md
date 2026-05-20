# Pocket Touch

![License](https://img.shields.io/badge/license-MIT-black)
![Status](https://img.shields.io/badge/status-active-white)
![Version](https://img.shields.io/badge/version-0.1.1-black)
![Built With](https://img.shields.io/badge/built%20with-Vite-646CFF)

A lightweight mobile interaction framework for bottom sheets, swipe cards, touch interactions, motion UI, and app-like web experiences across phones, tablets, and desktops.

Built for modern interaction design.

---

# Why Pocket Touch

Most web UI frameworks are still designed around desktop interaction patterns.

Pocket Touch is built differently.

Pocket Touch focuses on:

- touch-first interaction
- gesture-driven interfaces
- cinematic motion systems
- app-like navigation
- spring physics
- momentum movement
- elastic interaction systems
- mobile-native interaction patterns
- lightweight primitives
- modern web experiences

The goal is simple:

Build web experiences that feel native, fluid, and alive.

---

# Current Features

- Bottom sheets
- Swipe cards
- Modals
- Toasts
- Pull to refresh
- Tabs
- Tab bar
- Action sheet
- Motion UI demos
- Animated interactions
- Pointer-event interactions
- Touch gestures
- Velocity tracking
- Spring physics
- Momentum movement
- Rubber banding
- Overscroll resistance
- Drag physics
- Persistent transform state
- Mobile-first primitives
- Lightweight architecture
- CDN support
- Framework agnostic
- ESM/CommonJS builds
- TypeScript definitions

---

# Motion Engine

Pocket Touch includes a lightweight motion engine for native-feeling web interactions.

Core APIs:

```js
Pocket.animate()
Pocket.spring()
Pocket.motion()
Pocket.drag()
```

The motion system supports:

- velocity tracking
- spring animations
- drag gestures
- momentum movement
- rubber banding
- overscroll resistance
- persistent transform state
- elastic boundaries

Example:

```js
Pocket.drag(card, {
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
```

Core interaction chain:

```text
drag → velocity → momentum → spring → snap
```

---

# Runnable Examples

Pocket Touch includes runnable examples for:

```text
examples/
  motion-ui/
  bottom-sheet/
  swipe-cards/
  gesture-lab/
  music-player/
```

These examples demonstrate:

- motion systems
- gesture handling
- drag physics
- spring interactions
- touch-first UI patterns

---

# Installation

## NPM

```bash
npm install pocket-touch
```

## CDN

```html
<script src="https://cdn.jsdelivr.net/npm/pocket-touch/dist/pocket.iife.js"></script>
```

---

# Quick Example

```html
<div id="swipeDemo"></div>

<script src="https://cdn.jsdelivr.net/npm/pocket-touch/dist/pocket.iife.js"></script>

<script>
  Pocket.createSwipeCards({
    container: '#swipeDemo',
    cards: [
      {
        content: '<h2>Sheets</h2><p>Panels with depth and movement.</p>'
      },
      {
        content: '<h2>Cards</h2><p>Swipe interactions for modern interfaces.</p>'
      }
    ]
  });
</script>
```

---

# Motion Example

```js
Pocket.drag(card, {
  axis: 'x',
  momentum: true,
  snapBack: true,
  min: -160,
  max: 160,
  resistance: 0.28
})
```

---

# Roadmap

Completed:

- Core interaction primitives
- RAF motion engine
- Spring physics
- Velocity tracking
- Momentum decay
- Drag gestures
- Rubber banding
- Overscroll resistance
- Motion UI examples

Next:

- Snap points
- Gesture thresholds
- Shared motion primitives
- Sheet physics
- Timeline API
- Cinematic interaction choreography

---

# Philosophy

Pocket Touch is designed around a simple idea:

The future of the web is touch-first.

Interfaces should move with intention, react with physicality, and feel closer to native mobile systems than traditional desktop documents.

Pocket Touch provides lightweight interaction primitives that help developers build immersive web experiences without heavyweight frameworks.

---

# Links

- GitHub: https://github.com/bimalprataps-ctrl/pocket-touch
- npm: https://www.npmjs.com/package/pocket-touch

---

# License

MIT