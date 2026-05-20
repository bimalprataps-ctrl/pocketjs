# Motion UI Example

Pocket Touch includes a runnable Motion UI example demonstrating the framework’s interaction engine.

Location:

```text
examples/motion-ui/
```

---

# Demonstrated Features

The Motion UI example showcases:

- drag gestures
- spring physics
- velocity tracking
- momentum movement
- rubber banding
- overscroll resistance
- elastic boundaries
- persistent transform state

---

# Core Interaction Chain

```text
drag → velocity → momentum → spring → snap
```

---

# Example APIs

## Drag Physics

```js
Pocket.drag(card, {
  axis: 'x',
  momentum: true,
  snapBack: true,
  min: -180,
  max: 180,
  resistance: 0.28,
  friction: 0.92,
  damping: 18,
  stiffness: 180
})
```

---

## Spring Motion

```js
Pocket.spring(card, {
  y: -40,
  scale: 1.05,
  damping: 16,
  stiffness: 180
})
```

---

# Purpose

This example exists to demonstrate Pocket Touch’s transition from:

```text
UI components
```

toward:

```text
mobile-native interaction systems
```

for the modern web.

The focus is:
- touch-first interaction
- cinematic motion
- physical movement
- native-feeling web experiences

---

# Related Examples

```text
examples/
  bottom-sheet/
  swipe-cards/
  gesture-lab/
  music-player/
```