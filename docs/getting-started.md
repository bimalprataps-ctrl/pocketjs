# Getting Started

PocketJS is a lightweight interaction framework for building touch-first web interfaces.

The framework provides browser components for:
- swipe cards
- bottom sheets
- modals
- pull to refresh
- tab bars
- tabs
- toast notifications
- mobile interaction systems

PocketJS is designed for:
- mobile UI
- app-like layouts
- touch-first interfaces
- layered interaction systems
- lightweight browser experiences

---

## Installation

Install PocketJS using npm:

```bash
npm install pocketjs
```

Or load it directly through the CDN build:

```html
<script src="https://cdn.jsdelivr.net/gh/bimalprataps-ctrl/pocketjs@main/dist/pocket.iife.js"></script>
```

---

## Your First Component

Create a simple toast notification:

```html
<button id="showToast">
  Show Toast
</button>

<script src="https://cdn.jsdelivr.net/gh/bimalprataps-ctrl/pocketjs@main/dist/pocket.iife.js"></script>

<script>
document.querySelector('#showToast').onclick = () => {

  Pocket.createToast({
    message: 'PocketJS is working'
  })

}
</script>
```

---

## Swipe Cards Example

```html
<div id="cards"></div>

<script>
Pocket.createSwipeCards({

  container: '#cards',

  cards: [
    {
      content: `
        <div class="card">
          Card One
        </div>
      `
    },

    {
      content: `
        <div class="card">
          Card Two
        </div>
      `
    }
  ]

})
</script>
```

---

## Bottom Sheet Example

```html
<button id="openSheet">
  Open Sheet
</button>

<div id="backdrop"></div>

<div id="sheet">
  Bottom Sheet Content
</div>

<script>
Pocket.createBottomSheet({

  trigger: '#openSheet',

  sheet: '#sheet',

  backdrop: '#backdrop',

  snapPoints: ['peek', 'middle', 'full']

})
</script>
```

---

## Available Components

PocketJS currently includes:

| Component | Description |
|---|---|
| Action Sheet | Mobile action menus |
| Bottom Sheet | Draggable layered sheets |
| Modal | Dynamic modal dialogs |
| Pull To Refresh | Mobile refresh interactions |
| Swipe Cards | Swipeable card stacks |
| Tab Bar | Mobile bottom navigation |
| Tabs | Switchable content panels |
| Toast | Lightweight notifications |

---

## Mobile-First Design

PocketJS is designed primarily for:
- touch devices
- mobile browsers
- tablets
- app-like web interfaces
- layered interaction systems

The framework focuses on lightweight browser-based interaction patterns.

---

## Core Architecture

PocketJS includes internal systems for:
- pointer interactions
- spring physics
- velocity calculations
- transform-based movement
- lightweight animation behavior

Core files:

```text
src/core/animation-engine.js
src/core/pointer-engine.js
src/core/spring-physics.js
src/core/velocity.js
```

---

## Browser Support

PocketJS supports modern browsers:

| Browser | Supported |
|---|---|
| Chrome | Yes |
| Safari | Yes |
| Firefox | Yes |
| Edge | Yes |
| iOS Safari | Yes |
| Android Chrome | Yes |

---

## Next Steps

Continue with:
- Installation
- CDN Usage
- API Reference
- Components
- Examples
- Guides