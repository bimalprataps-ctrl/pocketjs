# Modal

PocketJS includes a lightweight modal component for building layered dialog interfaces and focused interaction flows.

The modal component dynamically creates:
- overlay layers
- modal containers
- close interactions
- animated transitions

Designed for:
- mobile UI
- app-like interfaces
- alerts
- dialogs
- onboarding
- layered interaction systems

---

## API

```js
Pocket.createModal({
  title: 'PocketJS',
  content: `
    <p>
      Lightweight interaction framework.
    </p>
  `
});
```

---

## Basic Example

```html
<button id="openModal">
  Open Modal
</button>

<script src="https://cdn.jsdelivr.net/gh/bimalprataps-ctrl/pocketjs@main/dist/pocket.iife.js"></script>

<script>
document.querySelector('#openModal').onclick = () => {

  Pocket.createModal({

    title: 'PocketJS',

    content: `
      <p>
        Touch-first interaction framework.
      </p>
    `
  })

}
</script>
```

---

## Options

| Option | Type | Description |
|---|---|---|
| `title` | string | Modal title |
| `content` | string | Modal HTML content |

---

## Dynamic Rendering

PocketJS modals are dynamically inserted into the document body.

The component automatically creates:
- overlay
- modal container
- close button
- transition behavior

No manual modal HTML structure is required.

---

## Close Behavior

The modal can be closed by:
- clicking the close button
- clicking outside the modal