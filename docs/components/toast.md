# Toast

Pocket Touch includes a lightweight toast component for displaying temporary notification messages.

Toasts are useful for:
- status messages
- interaction feedback
- confirmations
- alerts
- mobile notifications
- app-like UI systems

The component dynamically creates and removes toast elements automatically.

---

## API

```js
Pocket.createToast({
  message: 'Pocket Touch toast',
  duration: 2500,
  position: 'bottom'
});
```

---

## Basic Example

```html
<button id="showToast">
  Show Toast
</button>

<script src="https://cdn.jsdelivr.net/gh/bimalprataps-ctrl/pocket-touch@main/dist/pocket.iife.js"></script>

<script>
document.querySelector('#showToast').onclick = () => {

  Pocket.createToast({

    message: 'Saved successfully',

    duration: 2500,

    position: 'bottom'

  })

}
</script>
```

---

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `message` | string | `'Pocket Touch toast'` | Toast message |
| `duration` | number | `2500` | Display duration in milliseconds |
| `position` | string | `'bottom'` | Toast position |

---

## Positions

Pocket Touch currently supports position-based classes:

```js
position: 'bottom'
```

Generated class:

```html
pocket-toast-bottom
```

Additional positions can be styled through CSS.

---

## Behavior

Pocket Touch toasts:
- dynamically create a toast element
- append it to `document.body`
- animate into view
- automatically remove themselves after the duration expires

The component uses:

```js
requestAnimationFrame()
```

to trigger animation classes smoothly.

---

## Return Value

`createToast()` returns the generated toast element.

```js
const toast = Pocket.createToast({
  message: 'Hello'
});
```

---

## Generated Structure

Pocket Touch automatically creates:

```html
<div class="pocket-toast pocket-toast-bottom show">
  Saved successfully
</div>
```

The toast is appended to `document.body`.

---

## Recommended CSS

```css
.pocket-toast {
  position: fixed;

  left: 50%;

  transform:
    translateX(-50%)
    translateY(20px);

  padding: 14px 20px;

  border-radius: 999px;

  background: #111111;
  color: #ffffff;

  box-shadow:
    0 18px 48px rgba(0,0,0,0.18);

  opacity: 0;

  transition:
    opacity 220ms ease,
    transform 220ms ease;

  z-index: 9999;
}

.pocket-toast.show {
  opacity: 1;

  transform:
    translateX(-50%)
    translateY(0px);
}

.pocket-toast-bottom {
  bottom: 24px;
}
```

---

## Notes

Pocket Touch toasts are intentionally lightweight and designed for:
- mobile interfaces
- interaction feedback
- app-like experiences
- layered UI systems

The component automatically handles:
- DOM insertion
- visibility transitions
- timed removal

---

## Related

- Modal
- Action Sheet
- Tab Bar
- Bottom Sheet