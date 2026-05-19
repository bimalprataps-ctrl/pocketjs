Use this for:

```text
docs/components/bottom-sheet.md
```

````md
# Bottom Sheet

Pocket Touch includes a lightweight bottom sheet component for building mobile-style layered interfaces.

Bottom sheets are useful for menus, media controls, action panels, settings panels, and app-like navigation layers.

---

## API

```js
Pocket.createBottomSheet({
  trigger: '#openSheet',
  sheet: '#sheet',
  backdrop: '#backdrop',
  snapPoints: ['peek', 'middle', 'full']
});
```

---

## Basic Example

```html
<button id="openSheet">
  Open Sheet
</button>

<div id="backdrop"></div>

<div id="sheet">
  <h2>Bottom Sheet</h2>
  <p>This is a Pocket Touch bottom sheet.</p>
</div>

<script src="https://cdn.jsdelivr.net/gh/bimalprataps-ctrl/pocket-touch@main/dist/pocket.iife.js"></script>

<script>
  const sheet = Pocket.createBottomSheet({
    trigger: '#openSheet',
    sheet: '#sheet',
    backdrop: '#backdrop',
    snapPoints: ['peek', 'middle', 'full']
  });
</script>
```

---

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `trigger` | string | required | Element that opens or cycles the sheet |
| `sheet` | string | required | Bottom sheet element |
| `backdrop` | string | optional | Backdrop element behind the sheet |
| `snapPoints` | array | `['peek', 'middle', 'full']` | Sheet positions |

---

## Snap Points

Pocket Touch supports three built-in snap positions:

| Snap Point | Behavior |
|---|---|
| `peek` | Keeps the sheet mostly hidden |
| `middle` | Opens the sheet halfway |
| `full` | Opens the sheet near full height |

Example:

```js
Pocket.createBottomSheet({
  trigger: '#openSheet',
  sheet: '#sheet',
  snapPoints: ['peek', 'middle', 'full']
});
```

---

## Methods

`createBottomSheet()` returns a small controller object.

```js
const sheet = Pocket.createBottomSheet({
  trigger: '#openSheet',
  sheet: '#sheet'
});
```

### open()

Opens the sheet to the full snap position.

```js
sheet.open();
```

### close()

Closes the sheet back to the peek position.

```js
sheet.close();
```

### snap(index)

Moves the sheet to a specific snap index.

```js
sheet.snap(1);
```

### destroy()

Removes the active event listeners by replacing the connected elements.

```js
sheet.destroy();
```

---

## Touch Behavior

The bottom sheet supports pointer-based dragging.

Users can drag the sheet upward or downward to move between snap points.

The component uses:

- pointer events
- transform-based movement
- snap positions
- backdrop opacity changes
- mobile-friendly touch behavior

---

## Recommended CSS

```css
#backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.36);
  opacity: 0;
  pointer-events: none;
}

#sheet {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  min-height: 70vh;

  background: #ffffff;

  border-top-left-radius: 32px;
  border-top-right-radius: 32px;

  box-shadow: 0 -24px 80px rgba(0, 0, 0, 0.18);

  transform: translateY(72%);
  will-change: transform;
  touch-action: none;
}
```

---

## Notes

If the `trigger` or `sheet` selector cannot be found, Pocket Touch will warn in the console and stop initialization.

The bottom sheet is currently designed as a lightweight browser component, especially useful for mobile prototypes, demos, and app-like web interfaces.

---

## Related

- Swipe Cards
- Action Sheet
- Modal
- Pull To Refresh
````
