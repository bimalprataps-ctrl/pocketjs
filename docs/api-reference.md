Use this for:

```text
docs/api-reference.md
```

````md
# API Reference

Pocket Touch provides lightweight browser components for building touch-first, app-like web interfaces.

The current public API includes:

- `createActionSheet()`
- `createBottomSheet()`
- `createModal()`
- `createPullToRefresh()`
- `createSwipeCards()`
- `createTabBar()`
- `createTabs()`
- `createToast()`

---

## createActionSheet()

Creates a mobile-style action sheet.

```js
Pocket.createActionSheet(options)
```

Source:

```text
src/components/action-sheet.js
```

---

## createBottomSheet()

Creates a draggable bottom sheet with snap positions.

```js
const sheet = Pocket.createBottomSheet({
  trigger: '#openSheet',
  sheet: '#sheet',
  backdrop: '#backdrop',
  snapPoints: ['peek', 'middle', 'full']
})
```

Returns:

```js
{
  open,
  close,
  snap,
  destroy
}
```

Source:

```text
src/components/bottom-sheet.js
```

---

## createModal()

Creates a modal dynamically and appends it to `document.body`.

```js
const modal = Pocket.createModal({
  title: 'Pocket Touch',
  content: '<p>Hello from Pocket Touch.</p>'
})
```

Returns:

```js
{
  close
}
```

Source:

```text
src/components/modal.js
```

---

## createPullToRefresh()

Creates a mobile pull-to-refresh interaction.

```js
const refresh = Pocket.createPullToRefresh({
  threshold: 80,
  onRefresh: async () => {
    console.log('Refreshing...')
  }
})
```

Returns:

```js
{
  destroy
}
```

Source:

```text
src/components/pull-refresh.js
```

---

## createSwipeCards()

Creates a stack of swipeable cards.

```js
Pocket.createSwipeCards({
  container: '#cards',

  cards: [
    {
      content: '<div class="card">Card One</div>'
    }
  ]
})
```

Source:

```text
src/components/swipe-cards.js
```

---

## createTabBar()

Creates a mobile-style bottom tab bar and appends it to `document.body`.

```js
const tabBar = Pocket.createTabBar({
  items: [
    {
      label: 'Home',
      icon: '⌂'
    },
    {
      label: 'Search',
      icon: '⌕'
    }
  ],

  active: 0,

  onChange(index, item) {
    console.log(index, item)
  }
})
```

Returns:

```js
{
  destroy
}
```

Source:

```text
src/components/tab-bar.js
```

---

## createTabs()

Creates a tabbed content interface inside a container.

```js
const tabs = Pocket.createTabs({
  container: '#tabs',

  tabs: [
    {
      label: 'Home',
      content: '<p>Home content</p>'
    },
    {
      label: 'Profile',
      content: '<p>Profile content</p>'
    }
  ],

  active: 0,

  onChange(index, tab) {
    console.log(index, tab)
  }
})
```

Returns:

```js
{
  setActive
}
```

Source:

```text
src/components/tabs.js
```

---

## createToast()

Creates a temporary toast notification.

```js
const toast = Pocket.createToast({
  message: 'Saved successfully',
  duration: 2500,
  position: 'bottom'
})
```

Returns:

```js
HTMLDivElement
```

Source:

```text
src/components/toast.js
```

---

## Importing

Pocket Touch is available globally through the IIFE build:

```html
<script src="https://cdn.jsdelivr.net/gh/bimalprataps-ctrl/pocket-touch@main/dist/pocket.iife.js"></script>
```

Then use:

```js
Pocket.createToast({
  message: 'Hello Pocket Touch'
})
```

Pocket Touch also exports modules from:

```text
src/pocket.js
```

---

## Core Internals

Pocket Touch also includes internal systems for interaction and motion behavior:

```text
src/core/animation-engine.js
src/core/pointer-engine.js
src/core/spring-physics.js
src/core/utilities.js
src/core/velocity.js
```

These are part of the framework internals and should not be treated as public API unless they are officially exported.
````
