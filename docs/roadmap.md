# Pocket Touch Roadmap

Pocket Touch is evolving from a UI component library into a mobile-native interaction framework for the web.

The focus is:

- touch-first interaction
- cinematic motion systems
- spring physics
- gesture-driven interfaces
- native-feeling web experiences

---

# Completed

## Core Interaction Primitives

- Bottom sheets
- Swipe cards
- Modals
- Toasts
- Pull to refresh
- Tabs
- Tab bar
- Action sheet

---

## Motion Engine

Completed motion systems:

- RAF motion engine
- Interpolation utilities
- Spring physics
- Velocity tracking
- Momentum decay
- Drag gestures
- Persistent transform state
- Rubber banding
- Overscroll resistance
- Elastic boundaries

Core APIs:

```js
Pocket.animate()
Pocket.spring()
Pocket.motion()
Pocket.drag()
```

---

## Runnable Examples

Pocket Touch now includes runnable examples for:

```text
examples/
  motion-ui/
  bottom-sheet/
  swipe-cards/
  gesture-lab/
  music-player/
```

---

# In Progress

## Shared Motion Primitives

Planned primitives:

```text
fade
scale
lift
snap
sheet
drag
depth
parallax
```

Goal:

Create a consistent cinematic motion language across all Pocket Touch components.

---

# Next

## Snap Points

```js
Pocket.drag(card, {
  snapPoints: [-320, 0, 320]
})
```

This unlocks:

- Tinder-style cards
- bottom sheet states
- Apple Maps interactions
- layered interfaces

---

## Gesture Thresholds

Planned:

- swipe thresholds
- dismiss thresholds
- velocity thresholds
- directional locking

---

## Sheet Physics

Goal:

Create native-feeling bottom sheet systems powered by:

```text
drag → velocity → momentum → spring → snap
```

---

## Timeline API

Planned API:

```js
Pocket.timeline()
```

Goal:

Coordinate cinematic multi-element motion sequences.

---

## Component-Level Motion Integration

Integrate the motion engine directly into:

- bottom sheets
- swipe cards
- modals
- tabs
- future primitives

---

# Long-Term Direction

Pocket Touch is not aiming to become another traditional desktop UI framework.

The goal is:

```text
mobile-native interaction systems for the web
```

focused on:
- physical movement
- touch interaction
- cinematic motion
- native-feeling interfaces
- interaction-first architecture