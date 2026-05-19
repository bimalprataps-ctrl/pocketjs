export function createModal(options = {}) {
  const {
    title = '',
    content = '',
    closeOnOverlay = true,
    closeOnEscape = true,
    openOnCreate = true
  } = options;

  const listeners = new Map();
  let destroyed = false;
  let isOpen = false;

  const overlay = document.createElement('div');
  overlay.className = 'pocket-modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'pocket-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');

  modal.innerHTML = `
    <div class="pocket-modal-header">
      <h2>${title}</h2>
      <button class="pocket-modal-close" type="button" aria-label="Close modal">
        ✕
      </button>
    </div>

    <div class="pocket-modal-content">
      ${content}
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  const closeButton = modal.querySelector('.pocket-modal-close');

  function emit(eventName, detail = {}) {
    listeners.get(eventName)?.forEach((callback) => {
      callback({
        type: eventName,
        detail,
        target: modal
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

  function open() {
    if (destroyed || isOpen) return;

    isOpen = true;

    requestAnimationFrame(() => {
      overlay.classList.add('show');
      modal.classList.add('show');
    });

    emit('open');
  }

  function close() {
    if (destroyed || !isOpen) return;

    isOpen = false;

    overlay.classList.remove('show');
    modal.classList.remove('show');

    emit('close');

    setTimeout(() => {
      if (!isOpen && !destroyed) {
        destroy();
      }
    }, 250);
  }

  function toggle() {
    isOpen ? close() : open();
  }

  function handleOverlayClick(event) {
    if (closeOnOverlay && event.target === overlay) {
      close();
    }
  }

  function handleKeyDown(event) {
    if (closeOnEscape && event.key === 'Escape') {
      close();
    }
  }

  function destroy() {
    if (destroyed) return;

    destroyed = true;
    isOpen = false;

    closeButton?.removeEventListener('click', close);
    overlay.removeEventListener('click', handleOverlayClick);
    document.removeEventListener('keydown', handleKeyDown);

    listeners.clear();
    overlay.remove();

    emit('destroy');
  }

  closeButton?.addEventListener('click', close);
  overlay.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleKeyDown);

  if (openOnCreate) {
    open();
  }

  return {
    open,
    close,
    toggle,
    destroy,
    on,
    off,
    el: modal,
    overlayEl: overlay
  };
}