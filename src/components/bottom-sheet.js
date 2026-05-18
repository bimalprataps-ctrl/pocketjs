// src/bottomSheet.js

export function createBottomSheet({
  trigger,
  sheet,
  backdrop,
  snapPoints = ['peek', 'middle', 'full']
}) {
  const triggerEl = document.querySelector(trigger);
  const sheetEl = document.querySelector(sheet);
  const backdropEl = backdrop
    ? document.querySelector(backdrop)
    : null;

  if (!triggerEl || !sheetEl) {
    console.warn('PocketJS BottomSheet: Missing trigger or sheet');
    return;
  }

  let current = 0;

  const states = {
    peek: 72,
    middle: 38,
    full: 0
  };

  function setTransform(percent) {
    sheetEl.style.transform = `translateY(${percent}%)`;
  }

  function applyState(index) {
    current = index;

    const key = snapPoints[index];

    const value = states[key] ?? 72;

    sheetEl.style.transition =
      'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)';

    setTransform(value);

    if (backdropEl) {
      if (index === 0) {
        backdropEl.style.opacity = '0';
        backdropEl.style.pointerEvents = 'none';
      } else {
        backdropEl.style.opacity = '1';
        backdropEl.style.pointerEvents = 'auto';
      }
    }
  }

  // -----------------------
  // OPEN BUTTON
  // -----------------------

  triggerEl.addEventListener('click', () => {
    current = (current + 1) % snapPoints.length;

    applyState(current);
  });

  // -----------------------
  // BACKDROP CLOSE
  // -----------------------

  if (backdropEl) {
    backdropEl.addEventListener('click', () => {
      current = 0;
      applyState(0);
    });
  }

  // -----------------------
  // DRAG
  // -----------------------

  let startY = 0;
  let deltaY = 0;
  let dragging = false;

  sheetEl.addEventListener('pointerdown', (e) => {
    dragging = true;

    startY = e.clientY;

    deltaY = 0;

    sheetEl.style.transition = 'none';

    sheetEl.setPointerCapture(e.pointerId);
  });

  sheetEl.addEventListener('pointermove', (e) => {
    if (!dragging) return;

    deltaY = e.clientY - startY;

    const base =
      current === 0
        ? states.peek
        : current === 1
          ? states.middle
          : states.full;

    const next = base + deltaY / 10;

    setTransform(next);
  });

  function endDrag() {
    if (!dragging) return;

    dragging = false;

    // Swipe UP
    if (deltaY < -60) {
      current = Math.min(current + 1, snapPoints.length - 1);
    }

    // Swipe DOWN
    if (deltaY > 60) {
      current = Math.max(current - 1, 0);
    }

    applyState(current);
  }

  sheetEl.addEventListener('pointerup', endDrag);
  sheetEl.addEventListener('pointercancel', endDrag);

  // -----------------------
  // INITIAL STYLES
  // -----------------------

  sheetEl.style.willChange = 'transform';
  sheetEl.style.touchAction = 'none';

  if (backdropEl) {
    backdropEl.style.transition = 'opacity 400ms ease';
    backdropEl.style.opacity = '0';
    backdropEl.style.pointerEvents = 'none';
  }

  // -----------------------
  // INITIAL STATE
  // -----------------------

  applyState(0);

  // -----------------------
  // PUBLIC API
  // -----------------------

  return {
    open() {
      current = 2;
      applyState(2);
    },

    close() {
      current = 0;
      applyState(0);
    },

    snap(index) {
      current = Math.max(
        0,
        Math.min(index, snapPoints.length - 1)
      );

      applyState(current);
    },

    destroy() {
      triggerEl.replaceWith(triggerEl.cloneNode(true));
      sheetEl.replaceWith(sheetEl.cloneNode(true));

      if (backdropEl) {
        backdropEl.replaceWith(backdropEl.cloneNode(true));
      }
    }
  };
}