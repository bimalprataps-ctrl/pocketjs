export function createPullToRefresh(options = {}) {
  const {
    threshold = 80,
    maxDistance = 120,
    onRefresh = async () => {},
    container = window
  } = options;

  const listeners = new Map();

  let startY = 0;
  let distance = 0;
  let pulling = false;
  let refreshing = false;
  let destroyed = false;

  const indicator = document.createElement('div');

  indicator.className = 'pocket-pull-refresh';
  indicator.textContent = 'Pull to refresh';

  document.body.appendChild(indicator);

  function emit(eventName, detail = {}) {
    listeners.get(eventName)?.forEach((callback) => {
      callback({
        type: eventName,
        detail,
        target: indicator
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

  function setDistance(value) {
    distance = Math.min(value, maxDistance);

    indicator.style.transform =
      `translateX(-50%) translateY(${distance}px)`;
  }

  function reset() {
    indicator.classList.remove('visible');

    indicator.style.transform =
      'translateX(-50%) translateY(0px)';

    indicator.textContent = 'Pull to refresh';

    startY = 0;
    distance = 0;
    pulling = false;
    refreshing = false;

    emit('reset');
  }

  async function refresh() {
    if (refreshing || destroyed) return;

    refreshing = true;

    indicator.textContent = 'Refreshing...';

    emit('refreshstart');

    try {
      await onRefresh();

      emit('refresh');
    } catch (error) {
      emit('error', { error });
      console.error(error);
    }

    reset();
  }

  function handleTouchStart(event) {
    if (destroyed) return;

    if (window.scrollY !== 0) return;

    startY = event.touches[0].clientY;
    pulling = true;

    emit('pullstart');
  }

  function handleTouchMove(event) {
    if (!pulling || destroyed || refreshing) return;

    const currentY = event.touches[0].clientY;

    distance = currentY - startY;

    if (distance <= 0) return;

    indicator.classList.add('visible');

    setDistance(distance);

    indicator.textContent =
      distance > threshold
        ? 'Release to refresh'
        : 'Pull to refresh';

    emit('pull', { distance });
  }

  async function handleTouchEnd() {
    if (!pulling || destroyed) return;

    emit('pullend', { distance });

    if (distance > threshold) {
      await refresh();
      return;
    }

    reset();
  }

  function open() {
    indicator.classList.add('visible');
  }

  function close() {
    reset();
  }

  function toggle() {
    indicator.classList.contains('visible')
      ? close()
      : open();
  }

  function destroy() {
    if (destroyed) return;

    destroyed = true;

    container.removeEventListener('touchstart', handleTouchStart);
    container.removeEventListener('touchmove', handleTouchMove);
    container.removeEventListener('touchend', handleTouchEnd);

    listeners.clear();

    indicator.remove();
  }

  container.addEventListener('touchstart', handleTouchStart, {
    passive: true
  });

  container.addEventListener('touchmove', handleTouchMove, {
    passive: true
  });

  container.addEventListener('touchend', handleTouchEnd);

  return {
    open,
    close,
    toggle,
    refresh,
    destroy,
    on,
    off,
    el: indicator
  };
}