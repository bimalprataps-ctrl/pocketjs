export function createSwipeCards(options = {}) {
  const {
    container,
    cards = [],
    threshold = 100,
    visibleCards = 4
  } = options;

  const root =
    typeof container === 'string' ? document.querySelector(container) : container;

  if (!root || !cards.length) {
    console.warn('PocketJS SwipeCards: Missing container or cards');
    return null;
  }

  const listeners = new Map();

  let currentIndex = 0;
  let destroyed = false;
  let activeCard = null;
  let startX = 0;
  let currentX = 0;
  let dragging = false;

  root.classList.add('pocket-swipe-root');

  root.innerHTML = cards
    .map(
      (card, index) => `
        <div class="pocket-swipe-card" data-index="${index}">
          ${card.content}
        </div>
      `
    )
    .join('');

  const cardElements = [...root.querySelectorAll('.pocket-swipe-card')];

  function emit(eventName, detail = {}) {
    listeners.get(eventName)?.forEach((callback) => {
      callback({
        type: eventName,
        detail,
        target: root
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

  function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

  function layoutCards() {
    if (destroyed) return;

    cardElements.forEach((card, index) => {
      const depth = index - currentIndex;

      card.style.transition = '0.3s ease';

      if (depth < 0) {
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
        card.style.transform = 'translateX(-120%) rotate(-18deg)';
        card.style.zIndex = '0';
        return;
      }

      if (depth > visibleCards - 1) {
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
        card.style.transform = 'translateY(90px) scale(0.76)';
        card.style.zIndex = '0';
        return;
      }

      card.style.opacity = '1';
      card.style.zIndex = String(100 - depth);
      card.style.pointerEvents = depth === 0 ? 'auto' : 'none';
      card.style.transform = `
        translateY(${depth * 28}px)
        scale(${1 - depth * 0.06})
      `;
    });

    emit('change', {
      index: currentIndex,
      card: cards[currentIndex]
    });
  }

  function next() {
    if (destroyed) return;

    currentIndex = clamp(currentIndex + 1, 0, cards.length - 1);
    layoutCards();

    emit('next', {
      index: currentIndex,
      card: cards[currentIndex]
    });
  }

  function previous() {
    if (destroyed) return;

    currentIndex = clamp(currentIndex - 1, 0, cards.length - 1);
    layoutCards();

    emit('previous', {
      index: currentIndex,
      card: cards[currentIndex]
    });
  }

  function goTo(index) {
    if (destroyed) return;

    currentIndex = clamp(index, 0, cards.length - 1);
    layoutCards();
  }

  function open() {
    goTo(0);
  }

  function close() {
    goTo(cards.length - 1);
  }

  function toggle() {
    currentIndex < cards.length - 1 ? next() : open();
  }

  function handlePointerDown(event) {
    const card = event.currentTarget;
    const index = Number(card.dataset.index);

    if (destroyed || index !== currentIndex) return;

    activeCard = card;
    dragging = true;
    startX = event.clientX;
    currentX = startX;

    card.setPointerCapture?.(event.pointerId);
    card.style.transition = 'none';

    emit('dragstart', {
      index: currentIndex,
      card: cards[currentIndex]
    });
  }

  function handlePointerMove(event) {
    if (!dragging || destroyed || !activeCard) return;

    currentX = event.clientX;

    const diff = currentX - startX;

    activeCard.style.transform = `
      translateX(${diff}px)
      rotate(${diff * 0.05}deg)
    `;

    emit('drag', {
      index: currentIndex,
      card: cards[currentIndex],
      distance: diff
    });
  }

  function handlePointerEnd() {
    if (!dragging || destroyed || !activeCard) return;

    dragging = false;

    const diff = currentX - startX;
    const swipedLeft = diff < -threshold;
    const swipedRight = diff > threshold;

    if (swipedLeft && currentIndex < cards.length - 1) {
      activeCard.style.transition = '0.35s ease';
      activeCard.style.transform = 'translateX(-120%) rotate(-18deg)';
      activeCard.style.opacity = '0';

      emit('swipeleft', {
        index: currentIndex,
        card: cards[currentIndex]
      });

      currentIndex += 1;
      setTimeout(layoutCards, 220);
      activeCard = null;
      return;
    }

    if (swipedRight && currentIndex > 0) {
      emit('swiperight', {
        index: currentIndex,
        card: cards[currentIndex]
      });

      currentIndex -= 1;
      layoutCards();
      activeCard = null;
      return;
    }

    layoutCards();
    activeCard = null;
  }

  function destroy() {
    if (destroyed) return;

    destroyed = true;

    cardElements.forEach((card) => {
      card.removeEventListener('pointerdown', handlePointerDown);
      card.removeEventListener('pointermove', handlePointerMove);
      card.removeEventListener('pointerup', handlePointerEnd);
      card.removeEventListener('pointercancel', handlePointerEnd);
    });

    listeners.clear();
    root.classList.remove('pocket-swipe-root');
    root.innerHTML = '';
  }

  cardElements.forEach((card) => {
    card.addEventListener('pointerdown', handlePointerDown);
    card.addEventListener('pointermove', handlePointerMove);
    card.addEventListener('pointerup', handlePointerEnd);
    card.addEventListener('pointercancel', handlePointerEnd);
  });

  layoutCards();

  return {
    open,
    close,
    toggle,
    next,
    previous,
    goTo,
    destroy,
    on,
    off,
    el: root,
    cards: cardElements
  };
}