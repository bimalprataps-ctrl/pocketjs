# Motion APIs

Pocket Touch includes a lightweight motion engine for native-feeling web interactions.

---

## `Pocket.animate(target, options)`

Animates values using duration-based interpolation.

```js
Pocket.animate(card, {
  y: -40,
  scale: 1.04,
  duration: 420
})
```

### Options

| Option | Description |
|---|---|
| `x` | Horizontal movement |
| `y` | Vertical movement |
| `scale` | Scale transform |
| `rotate` | Rotation |
| `opacity` | Opacity |
| `duration` | Animation duration |
| `easing` | Easing function |

---

## `Pocket.spring(target, options)`

Animates values using spring physics.

```js
Pocket.spring(card, {
  y: 0,
  scale: 1,
  damping: 18,
  stiffness: 180
})
```

### Options

| Option | Description |
|---|---|
| `x` | Horizontal movement |
| `y` | Vertical movement |
| `scale` | Scale transform |
| `rotate` | Rotation |
| `opacity` | Opacity |
| `damping` | Spring damping |
| `stiffness` | Spring stiffness |
| `mass` | Spring mass |

---

## `Pocket.motion(target, options)`

Convenience wrapper for motion behavior.

```js
Pocket.motion(card, {
  y: 0,
  scale: 1,
  spring: true
})
```

If `spring: true` is provided, Pocket Touch uses spring physics automatically.

---

## `Pocket.drag(target, options)`

Adds drag physics and gesture tracking.

```js
Pocket.drag(card, {
  axis: 'x',
  momentum: true,
  snapBack: true,
  min: -160,
  max: 160,
  resistance: 0.28
})
```

### Options

| Option | Description |
|---|---|
| `axis` | `x` or `y` drag direction |
| `momentum` | Enables momentum movement |
| `snapBack` | Enables spring return |
| `min` | Minimum drag boundary |
| `max` | Maximum drag boundary |
| `resistance` | Rubber band resistance |
| `friction` | Momentum decay friction |
| `damping` | Spring damping |
| `stiffness` | Spring stiffness |

---

# Motion Architecture

Core motion systems:

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

Core interaction chain:

```text
drag → velocity → momentum → spring → snap
```