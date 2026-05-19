# Pocket Touch

![License](https://img.shields.io/badge/license-MIT-black)
![Status](https://img.shields.io/badge/status-active-white)
![Version](https://img.shields.io/badge/version-0.1.1-black)
![Built With](https://img.shields.io/badge/built%20with-Vite-646CFF)

A lightweight mobile interaction framework for bottom sheets, swipe cards, touch interactions, and app-like web experiences across phones, tablets, and desktops.

Built for modern interaction design.

---

## Why Pocket Touch

Most web UI frameworks are still designed around desktop interaction patterns.

Pocket Touch is built differently.

Pocket Touch focuses on:

- touch-first interaction
- gesture-driven interfaces
- cinematic movement
- lightweight primitives
- mobile-native interaction patterns
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
- Pointer-event interactions
- Mobile-first primitives
- Lightweight architecture
- CDN support
- Framework agnostic
- ESM/CommonJS builds
- TypeScript definitions

---

# Roadmap

- Motion UI system
- Spring physics engine
- Velocity tracking
- Advanced gesture utilities
- App-like navigation systems
- Interaction animation engine
- Native-feeling transitions
- Physics-based movement

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
