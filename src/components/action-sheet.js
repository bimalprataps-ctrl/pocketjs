export function createActionSheet(options = {}) {
  const {
    title = '',
    message = '',
    actions = [],
    cancelText = 'Cancel',
    closeOnOverlay = true,
    openOnCreate = true
  } = options;

  const listeners = new Map();

  let destroyed = false;
  let isOpen = false;

  const overlay = document.createElement('div');
  overlay.className = 'pocket-action-overlay';

  const sheet = document.createElement('div');
  sheet.className = 'pocket-action-sheet';
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-modal', 'true');

  sheet.innerHTML = `
    <div class="pocket-action-header">
      ${title ? `<h3>${title}</h3>` : ''}
      ${message ? `<p>${message}</p>` : ''}
    </div>

    <div class="pocket-action-list"></div>

    <button class="pocket-action-cancel" type="button">
      ${cancelText}
    </button>
  `;

  const list = sheet.querySelector('.pocket-action-list');
  const cancelButton = sheet.querySelector('.pocket-action-cancel');

  function emit(eventName, detail = {}) {
    listeners.get(eventName)?.forEach((callback) => {
      callback({
        type: eventName,
        detail,
        target: sheet
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
      sheet.classList.add('show');
    });

    emit('open');
  }

  function close() {
    if (destroyed || !isOpen) return;

    isOpen = false;

    overlay.classList.remove('show');
    sheet.classList.remove('show');

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

  function handleCancelClick() {
    emit('cancel');
    close();
  }

  function handleActionClick(action, index) {
    emit('select', {
      index,
      action
    });

    action.onClick?.();

    close();
  }

  function destroy() {
    if (destroyed) return;

    destroyed = true;
    isOpen = false;

    overlay.removeEventListener('click', handleOverlayClick);
    cancelButton?.removeEventListener('click', handleCancelClick);

    [...list.querySelectorAll('.pocket-action-button')].forEach((button) => {
      button.remove();
    });

    listeners.clear();

    overlay.remove();

    emit('destroy');
  }

  actions.forEach((action, index) => {
    const button = document.createElement('button');

    button.type = 'button';
    button.className = action.destructive
      ? 'pocket-action-button destructive'
      : 'pocket-action-button';

    button.textContent = action.label;

    button.addEventListener('click', () => {
      handleActionClick(action, index);
    });

    list.appendChild(button);
  });

  cancelButton?.addEventListener('click', handleCancelClick);
  overlay.addEventListener('click', handleOverlayClick);

  overlay.appendChild(sheet);
  document.body.appendChild(overlay);

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
    el: sheet,
    overlayEl: overlay
  };
}