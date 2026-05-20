# Motion UI

Pocket Touch includes a lightweight motion engine for building native-feeling web interactions.

The system powers:

- spring animations
- drag gestures
- momentum movement
- velocity tracking
- rubber banding
- overscroll resistance
- elastic boundaries
- persistent transform state

---

# Core APIs

```js
Pocket.animate()
Pocket.spring()
Pocket.motion()
Pocket.drag()
```

---

# Spring Animations

```js
Pocket.spring(card, {
  y: -40,
  scale: 1.04,
  damping: 16,
  stiffness: 180
})
```

Spring animations create smooth physical transitions instead of rigid CSS easing.

Supported properties:

- `x`
- `y`
- `scale`
- `rotate`
- `opacity`

---

# Drag Physics

```js
Pocket.drag(card, {
  axis: 'x',
  momentum: true,
  snapBack: true,
  damping: 18,
  stiffness: 180
})
```

The drag engine supports:

- pointer tracking
- velocity tracking
- momentum decay
- spring return
- rubber banding
- elastic boundaries

---

# Elastic Boundaries

```js
Pocket.drag(card, {
  axis: 'x',
  min: -160,
  max: 160,
  resistance: 0.28
})
```

Pocket Touch includes overscroll resistance inspired by native mobile interfaces.

When dragging outside the boundary range:

```text
movement becomes increasingly resistant
```

before springing back into place.

---

# Momentum

```js
Pocket.drag(card, {
  momentum: true,
  friction: 0.92
})
```

Momentum movement uses velocity tracking and decay animation to create native-feeling interaction behavior.

Core interaction chain:

```text
drag → velocity → momentum → spring → snap
```

---

# Runnable Example

```text
examples/motion-ui/
```

The Motion UI example demonstrates:

- drag physics
- momentum
- spring movement
- rubber banding
- overscroll resistance
- persistent transforms

---

# Architecture

Core motion architecture:

```text
src/core/
  animation-engine.js
  decay.js
  drag.js
  element-state.js
  interpolate.js
  raf-loop.js
  rubberband.js
  spring.js
  velocity.js
```

Pocket Touch motion systems are framework agnostic and powered by pointer events and requestAnimationFrame.