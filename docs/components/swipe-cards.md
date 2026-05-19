Use this for:

```text
docs/components/swipe-cards.md
```

````md
# Swipe Cards

Pocket Touch includes a lightweight swipe card component for building touch-first stacked interfaces.

Swipe cards are useful for:
- onboarding flows
- galleries
- media browsing
- stacked navigation
- app-like interactions
- mobile UI systems

The component is designed around pointer gestures and transform-based animation.

---

## API

```js
Pocket.createSwipeCards({
  container: '#cards',
  cards: []
});
```

---

## Basic Example

```html
<div id="cards"></div>

<script src="https://cdn.jsdelivr.net/gh/bimalprataps-ctrl/pocket-touch@main/dist/pocket.iife.js"></script>

<script>
Pocket.createSwipeCards({
  container: '#cards',

  cards: [
    {
      content: `
        <div class="card">
          <h2>Card One</h2>
        </div>
      `
    },

    {
      content: `
        <div class="card">
          <h2>Card Two</h2>
        </div>
      `
    },

    {
      content: `
        <div class="card">
          <h2>Card Three</h2>
        </div>
      `
    }
  ]
});
</script>
```

---

## Options

| Option | Type | Description |
|---|---|---|
| `container` | string | Target container element |
| `cards` | array | Array of card objects |

---

## Card Structure

Each card is passed as an object:

```js
{
  content: `
    <div class="card">
      Card Content
    </div>
  `
}
```

The `content` value accepts HTML strings.

---

## Swipe Behavior

Pocket Touch swipe cards support:
- pointer dragging
- touch gestures
- swipe momentum
- horizontal movement
- stacked card transitions

Users can:
- swipe left
- swipe right
- drag cards interactively

---

## Interaction Logic

The component internally tracks:
- active card index
- drag distance
- swipe thresholds
- transform animations

Cards animate using:
- translateX
- rotation
- opacity changes

---

## Recommended CSS

```css
#cards {
  position: relative;

  width: 320px;
  height: 520px;

  margin: 0 auto;
}

.card {
  position: absolute;

  inset: 0;

  border-radius: 28px;

  overflow: hidden;

  background: #ffffff;

  box-shadow:
    0 24px 80px rgba(0,0,0,0.12);

  user-select: none;
}
```

---

## Mobile-First Design

Swipe cards are optimized for:
- touch devices
- phones
- tablets
- mobile prototypes
- cinematic interfaces

The interaction system uses pointer events for cross-device compatibility.

---

## Notes

Pocket Touch swipe cards are intentionally lightweight and focused on interaction simplicity.

The component is best suited for:
- UI demos
- mobile concepts
- onboarding systems
- media interfaces
- app-style layouts

---

## Related

- Bottom Sheet
- Gesture Handling
- Motion UI
- Pull To Refresh
````
