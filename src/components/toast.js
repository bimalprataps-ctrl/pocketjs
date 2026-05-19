export function createToast(options = {}) {
  const {
    message = 'PocketJS toast',
    duration = 2500,
    position = 'bottom',
    closeOnClick = true,
    autoClose = true
  } = options;

  const listeners = new Map();

  let destroyed = false;
  let visible = false;
  let timeoutId = null;

  const toast = document.createElement('div');

  toast.className = `pocket-toast pocket-toast-${position}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');

  toast.textContent = message;

  document.body.appendChild(toast);

  function emit(eventName, detail = {}) {
    listeners.get(eventName)?.forEach((callback) => {
      callback({
        type: eventName,
        detail,
        target: toast
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
    if (destroyed || visible) return;

    visible = true;

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    emit('open');

    if (autoClose) {
      timeoutId = setTimeout(close, duration);
    }
  }

  function close() {
    if (destroyed || !visible) return;

    visible = false;

    clearTimeout(timeoutId);

    toast.classList.remove('show');

    emit('close');

    setTimeout(() => {
      if (!visible && !destroyed) {
        destroy();
      }
    }, 300);
  }

  function toggle() {
    visible ? close() : open();
  }

  function destroy() {
    if (destroyed) return;

    destroyed = true;

    clearTimeout(timeoutId);

    toast.removeEventListener('click', handleClick);

    listeners.clear();

    toast.remove();

    emit('destroy');
  }

  function handleClick() {
    if (closeOnClick) {
      close();
    }
  }

  toast.addEventListener('click', handleClick);

  open();

  return {
    open,
    close,
    toggle,
    destroy,
    on,
    off,
    el: toast
  };
}