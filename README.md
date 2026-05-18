# PocketJS

PocketJS is a lightweight mobile interaction framework for building touch-first web interfaces.

It focuses on interaction patterns developers rebuild repeatedly across modern mobile UI:

- bottom sheets
- swipe cards
- modals
- pull to refresh
- tab bars
- tabs
- toast notifications
- layered mobile interactions

PocketJS is designed for:
- app-like web interfaces
- touch-first layouts
- mobile interaction systems
- lightweight browser UI
- native-feeling motion

---

## Installation

```bash
npm install pocketjs
```

Or use the CDN build:

```html
<script src="https://cdn.jsdelivr.net/gh/bimalprataps-ctrl/pocketjs@main/dist/pocket.iife.js"></script>
```

---

## Example

```js
Pocket.createToast({
  message: 'PocketJS loaded'
})
```

---

## Available Components

PocketJS currently includes:

```js
Pocket.createActionSheet()
Pocket.createBottomSheet()
Pocket.createModal()
Pocket.createPullToRefresh()
Pocket.createSwipeCards()
Pocket.createTabBar()
Pocket.createTabs()
Pocket.createToast()
```

---

## Development

Run locally:

```bash
npm install
npm run dev
```

Build production files:

```bash
npm run build
```

---

## Project Structure

```text
src/components/
src/core/
src/styles/
docs/
examples/
```

### Components

```text
src/components/
```

Contains:
- swipe cards
- bottom sheets
- modals
- pull to refresh
- tab bars
- tabs
- toast notifications

### Core

```text
src/core/
```

Contains:
- pointer engine
- animation engine
- spring physics
- velocity systems

---

## Documentation

PocketJS documentation includes:
- getting started
- installation
- CDN usage
- API reference
- component docs
- examples
- guides

---

## Vision

PocketJS is not trying to replace React, Vue, or Svelte.

It is an interaction layer for building touch-first, app-like web interfaces.