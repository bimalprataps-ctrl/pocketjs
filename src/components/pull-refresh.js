export function createPullToRefresh(options = {}) {
  const container =
    typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

  if (!container) {
    console.warn('Pocket.createPullToRefresh: container not found');
    return null;
  }

  const threshold = options.threshold ?? 72;
  const resistance = options.resistance ?? 0.55;
  const maxPull = options.maxPull ?? 130;

  let startY = 0;
  let currentPull = 0;
  let dragging = false;
  let refreshing = false;

  const indicator = document.createElement('div');
  indicator.className = 'pocket-pull-refresh-indicator';
  indicator.innerHTML = '<span>↓ Pull down</span>';

  container.prepend(indicator);

  Object.assign(indicator.style, {
    height: '0px',
    overflow: 'hidden',
    display: 'grid',
    placeItems: 'center',
    transition: 'height 260ms cubic-bezier(0.16, 1, 0.3, 1)',
    fontSize: '11px',
    fontWeight: '900',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'rgba(0,0,0,0.55)'
  });

  function setPull(value) {
    currentPull = Math.max(0, Math.min(value, maxPull));
    indicator.style.height = `${currentPull}px`;

    if (refreshing) {
      indicator.innerHTML = '<span>↻ Refreshing</span>';
    } else if (currentPull >= threshold) {
      indicator.innerHTML = '<span>↑ Release to refresh</span>';
    } else {
      indicator.innerHTML = '<span>↓ Pull down</span>';
    }
  }

  function onPointerDown(event) {
    if (refreshing) return;
    if (container.scrollTop > 0) return;

    dragging = true;
    startY = event.clientY;
    container.setPointerCapture?.(event.pointerId);
  }

  function onPointerMove(event) {
    if (!dragging || refreshing) return;

    const diff = event.clientY - startY;

    if (diff <= 0) return;

    event.preventDefault();
    setPull(diff * resistance);
  }

  async function onPointerUp(event) {
    if (!dragging) return;

    dragging = false;
    container.releasePointerCapture?.(event.pointerId);

    if (currentPull >= threshold) {
      refreshing = true;
      setPull(threshold);

      if (typeof options.onRefresh === 'function') {
        await options.onRefresh();
      }

      indicator.innerHTML = '<span>✓ Updated</span>';

      window.setTimeout(() => {
        refreshing = false;
        setPull(0);
      }, 650);
    } else {
      setPull(0);
    }
  }

  container.style.overscrollBehavior = 'contain';
  container.style.touchAction = 'pan-y';

  container.addEventListener('pointerdown', onPointerDown);
  container.addEventListener('pointermove', onPointerMove);
  container.addEventListener('pointerup', onPointerUp);
  container.addEventListener('pointercancel', onPointerUp);
  container.addEventListener('lostpointercapture', onPointerUp);

  return {
    destroy() {
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointercancel', onPointerUp);
      container.removeEventListener('lostpointercapture', onPointerUp);
      indicator.remove();
    }
  };
}