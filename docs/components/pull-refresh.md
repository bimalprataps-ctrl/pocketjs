Great. Use this for:

```text
docs/components/pull-refresh.md
```

````md
# Pull To Refresh

Pocket Touch includes a lightweight pull-to-refresh component for mobile-first web interfaces.

It creates a refresh indicator, tracks vertical touch movement, and runs a custom refresh function when the user pulls past a threshold.

---

## API

```js
Pocket.createPullToRefresh({
  threshold: 80,
  onRefresh: async () => {}
});
```

---

## Basic Example

```html
<script src="https://cdn.jsdelivr.net/gh/bimalprataps-ctrl/pocket-touch@main/dist/pocket.iife.js"></script>

<script>
Pocket.createPullToRefresh({
  threshold: 80,

  onRefresh: async () => {
    console.log('Refreshing content...');
  }
});
</script>
```

---

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `threshold` | number | `80` | Pull distance required to trigger refresh |
| `onRefresh` | function | `async () => {}` | Function called after the pull threshold is passed |

---

## Behavior

Pull To Refresh only starts when the page is at the top.

```js
if (window.scrollY !== 0) return;
```

When the user pulls down:
- an indicator becomes visible
- the indicator moves with the touch gesture
- the text changes from `Pull to refresh` to `Release to refresh`
- once released past the threshold, `onRefresh()` runs

---

## Return Value

`createPullToRefresh()` returns a controller object.

```js
const refresh = Pocket.createPullToRefresh({
  onRefresh: async () => {
    await loadNewContent();
  }
});
```

### destroy()

Removes the refresh indicator from the page.

```js
refresh.destroy();
```

---

## Generated Element

Pocket Touch automatically creates this element:

```html
<div class="pocket-pull-refresh">
  Pull to refresh
</div>
```

The element is appended to `document.body`.

---

## Recommended CSS

```css
.pocket-pull-refresh {
  position: fixed;

  top: 0;
  left: 50%;

  transform: translateX(-50%) translateY(0px);

  padding: 10px 18px;

  border-radius: 999px;

  background: #ffffff;

  box-shadow: 0 12px 40px rgba(0,0,0,0.14);

  opacity: 0;
  pointer-events: none;

  transition:
    opacity 180ms ease,
    transform 180ms ease;

  z-index: 9999;
}

.pocket-pull-refresh.visible {
  opacity: 1;
}
```

---

## Notes

This component currently uses touch events, so it is mainly intended for mobile and touch devices.

The refresh indicator is created automatically. You do not need to add HTML manually.

---

## Related

- Gesture Handling
- Motion UI
- Swipe Cards
````
