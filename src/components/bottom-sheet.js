// src/components/bottom-sheet.js

export function createBottomSheet({
  trigger,
  sheet,
  backdrop,
  snapPoints = ['peek', 'middle', 'full'],
  initialSnap = 0
}) {
  const triggerEl =
    typeof trigger === 'string' ? document.querySelector(trigger) : trigger;

  const sheetEl =
    typeof sheet === 'string' ? document.querySelector(sheet) : sheet;

  const backdropEl =
    typeof backdrop === 'string' ? document.querySelector(backdrop) : backdrop || null;

  if (!sheetEl) {
    console.warn('PocketJS BottomSheet: Missing sheet element');
    return null;
  }

  const listeners = new Map();
  let current = clamp(initialSnap, 0, snapPoints.length - 1);
  let startY = 0;
  let deltaY = 0;
  let dragging = false;
  let destroyed = false;

  const states = {
    peek: 72,
    middle: 38,
    full: 0
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

  function emit(eventName, detail = {}) {
    const callbacks = listeners.get(eventName);
    if (!callbacks) return;

    callbacks.forEach((callback) => {
      callback({
        type: eventName,
        detail,
        target: sheetEl
      });
    });
  }

  function on(eventName, callback) {
    if (!listeners.has(eventName)) {
      listeners.set(eventName, new Set());
    }

    listeners.get(eventName).add(callback);

    return () => off(eventName, callback);
  }

  function off(eventName, callback) {
    listeners.get(eventName)?.delete(callback);
  }

  function getSnapValue(index) {
    const key = snapPoints[index];
    return states[key] ?? 72;
  }

  function setTransform(percent) {
    sheetEl.style.transform = `translateY(${percent}%)`;
  }

  function applyState(index) {
    if (destroyed) return;

    current = clamp(index, 0, snapPoints.length - 1);

    sheetEl.style.transition =
      'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)';

    setTransform(getSnapValue(current));

    if (backdropEl) {
      const isOpen = current > 0;
      backdropEl.style.opacity = isOpen ? '1' : '0';
      backdropEl.style.pointerEvents = isOpen ? 'auto' : 'none';
    }

    emit('snap', {
      index: current,
      snapPoint: snapPoints[current]
    });

    emit(current > 0 ? 'open' : 'close', {
      index: current,
      snapPoint: snapPoints[current]
    });
  }

  function open(index = snapPoints.length - 1) {
    applyState(index);
  }

  function close() {
    applyState(0);
  }

  function toggle() {
    current > 0 ? close() : open();
  }

  function snap(index) {
    applyState(index);
  }

  function handleTriggerClick() {
    toggle();
  }

  function handleBackdropClick() {
    close();
  }

  function handlePointerDown(event) {
    if (destroyed) return;

    dragging = true;
    startY = event.clientY;
    deltaY = 0;

    sheetEl.style.transition = 'none';
    sheetEl.setPointerCapture?.(event.pointerId);
  }

  function handlePointerMove(event) {
    if (!dragging || destroyed) return;

    deltaY = event.clientY - startY;

    const base = getSnapValue(current);
    const next = base + deltaY / 10;

    setTransform(clamp(next, 0, 100));
  }

  function handlePointerEnd() {
    if (!dragging || destroyed) return;

    dragging = false;

    if (deltaY < -60) {
      applyState(current + 1);
      return;
    }

    if (deltaY > 60) {
      applyState(current - 1);
      return;
    }

    applyState(current);
  }

  function destroy() {
    if (destroyed) return;

    destroyed = true;

    triggerEl?.removeEventListener('click', handleTriggerClick);
    backdropEl?.removeEventListener('click', handleBackdropClick);

    sheetEl.removeEventListener('pointerdown', handlePointerDown);
    sheetEl.removeEventListener('pointermove', handlePointerMove);
    sheetEl.removeEventListener('pointerup', handlePointerEnd);
    sheetEl.removeEventListener('pointercancel', handlePointerEnd);

    listeners.clear();

    sheetEl.style.transform = '';
    sheetEl.style.transition = '';
    sheetEl.style.willChange = '';
    sheetEl.style.touchAction = '';

    if (backdropEl) {
      backdropEl.style.opacity = '';
      backdropEl.style.pointerEvents = '';
      backdropEl.style.transition = '';
    }
  }

  triggerEl?.addEventListener('click', handleTriggerClick);
  backdropEl?.addEventListener('click', handleBackdropClick);

  sheetEl.addEventListener('pointerdown', handlePointerDown);
  sheetEl.addEventListener('pointermove', handlePointerMove);
  sheetEl.addEventListener('pointerup', handlePointerEnd);
  sheetEl.addEventListener('pointercancel', handlePointerEnd);

  sheetEl.style.willChange = 'transform';
  sheetEl.style.touchAction = 'none';

  if (backdropEl) {
    backdropEl.style.transition = 'opacity 400ms ease';
  }

  applyState(current);

  return {
    open,
    close,
    toggle,
    snap,
    destroy,
    on,
    off,
    el: sheetEl,
    backdropEl,
    triggerEl
  };
}