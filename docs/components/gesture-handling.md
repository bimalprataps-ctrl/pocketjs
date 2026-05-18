# Gesture Handling

PocketJS includes low-level gesture and pointer interaction systems for building touch-first interfaces across mobile and desktop devices.

The framework uses pointer events internally to support:
- dragging
- swiping
- touch movement
- layered interactions
- mobile gestures
- tactile UI behavior

PocketJS gesture systems are designed for fluid interaction and transform-based motion.

---

## Pointer Engine

PocketJS uses a lightweight internal pointer engine located in:

```text
src/core/pointer-engine.js
```

The gesture system powers:
- swipe cards
- bottom sheets
- pull to refresh
- draggable interfaces
- layered UI systems

---

## Supported Interactions

PocketJS gesture handling supports:
- pointer events
- touch interactions
- mouse dragging
- swipe movement
- drag gestures
- layered motion systems

The framework uses pointer events for cross-device compatibility.

---

## Swipe Interactions

Swipe gestures are used inside:
- swipe cards
- mobile navigation
- layered transitions
- onboarding systems

Example:

```js
Pocket.createSwipeCards({
  container: '#cards',
  cards: []
});
```

Users can:
- drag cards
- swipe left
- swipe right
- interact using touch or mouse

---

## Drag Interactions

Bottom sheets support vertical drag gestures.

Example:

```js
Pocket.createBottomSheet({
  trigger: '#openSheet',
  sheet: '#sheet'
});
```

Users can:
- drag upward
- drag downward
- snap between positions

---

## Pull Interactions

PocketJS also includes pull-based interaction systems through:

```text
src/components/pull-refresh.js
```

These interactions are useful for:
- mobile feeds
- refresh systems
- touch-first layouts
- app-like experiences

---

## Touch Behavior

PocketJS gesture systems are optimized for:
- phones
- tablets
- touch laptops
- modern browsers

The framework prioritizes:
- responsive movement
- smooth dragging
- physical interaction feel
- cinematic motion

---

## Recommended CSS

For gesture-driven surfaces:

```css
.interactive-surface {
  touch-action: none;
  user-select: none;
  will-change: transform;
}
```

This improves interaction smoothness and prevents unwanted browser gestures.

---

## Performance Notes

PocketJS gesture systems are designed around:
- transform-based movement
- hardware acceleration
- lightweight pointer tracking
- minimal layout recalculation

For best results:
- avoid heavy DOM trees
- minimize repaint-heavy effects
- isolate animated layers

---

## Core Files

Gesture systems are powered by:

```text
src/core/pointer-engine.js
src/core/velocity.js
src/core/spring-physics.js
```

These systems handle:
- interaction tracking
- motion velocity
- spring behavior
- physical movement calculations

---

## Related

- Swipe Cards
- Bottom Sheet
- Motion UI
- Pull To Refresh