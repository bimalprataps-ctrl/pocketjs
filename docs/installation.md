Use this for:

```text
docs/installation.md
```

````md
# Installation

PocketJS can be installed using npm or loaded directly through a CDN.

The framework is designed for lightweight browser-based interaction systems and touch-first web interfaces.

---

## npm

Install PocketJS using npm:

```bash
npm install pocketjs
```

---

## Importing

PocketJS exports its components from:

```text
src/pocket.js
```

Example:

```js
import Pocket from 'pocketjs'
```

---

## CDN

Use PocketJS directly in the browser without a build step:

```html
<script src="https://cdn.jsdelivr.net/gh/bimalprataps-ctrl/pocketjs@main/dist/pocket.iife.js"></script>
```

PocketJS will be available globally as:

```js
Pocket
```

---

## Basic Example

```html
<button id="showToast">
  Show Toast
</button>

<script src="https://cdn.jsdelivr.net/gh/bimalprataps-ctrl/pocketjs@main/dist/pocket.iife.js"></script>

<script>
document.querySelector('#showToast').onclick = () => {

  Pocket.createToast({
    message: 'PocketJS loaded successfully'
  })

}
</script>
```

---

## Available Components

PocketJS currently includes:

```text
createActionSheet()
createBottomSheet()
createModal()
createPullToRefresh()
createSwipeCards()
createTabBar()
createTabs()
createToast()
```

---

## Development

Clone the repository:

```bash
git clone https://github.com/bimalprataps-ctrl/pocketjs
```

Move into the project:

```bash
cd pocketjs
```

Install dependencies:

```bash
npm install
```

Run development mode:

```bash
npm run dev
```

Build production files:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Project Structure

PocketJS is organized into:

```text
src/components/
src/core/
src/styles/
```

### Components

```text
src/components/
```

Contains UI components such as:
- swipe cards
- bottom sheets
- modals
- tabs
- toast notifications

### Core

```text
src/core/
```

Contains internal systems for:
- pointer handling
- animation
- spring physics
- velocity calculations

### Styles

```text
src/styles/
```

Contains component and motion styles.

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
- Getting Started
- CDN Usage
- API Reference
- Components
- Examples
````
