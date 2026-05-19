export function createTabs(options = {}) {
  const {
    container,
    tabs = [],
    active = 0,
    onChange = () => {}
  } = options;

  const root =
    typeof container === 'string'
      ? document.querySelector(container)
      : container;

  if (!root) {
    console.warn('PocketJS Tabs: Missing container');
    return null;
  }

  const listeners = new Map();

  let activeIndex = active;
  let destroyed = false;

  root.innerHTML = `
    <div class="pocket-tabs" role="tablist">
      ${tabs
        .map(
          (tab, index) => `
            <button
              class="pocket-tab ${index === activeIndex ? 'active' : ''}"
              data-index="${index}"
              role="tab"
              aria-selected="${index === activeIndex}"
            >
              ${tab.label}
            </button>
          `
        )
        .join('')}
    </div>

    <div class="pocket-tab-panel" role="tabpanel">
      ${tabs[activeIndex]?.content || ''}
    </div>
  `;

  const buttons = [...root.querySelectorAll('.pocket-tab')];

  const panel = root.querySelector('.pocket-tab-panel');

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

  function render() {
    buttons.forEach((button, index) => {
      const isActive = index === activeIndex;

      button.classList.toggle('active', isActive);

      button.setAttribute(
        'aria-selected',
        isActive ? 'true' : 'false'
      );
    });

    panel.innerHTML =
      tabs[activeIndex]?.content || '';
  }

  function setActive(index) {
    if (destroyed) return;

    if (index < 0 || index >= tabs.length) return;

    activeIndex = index;

    render();

    onChange(activeIndex, tabs[activeIndex]);

    emit('change', {
      index: activeIndex,
      tab: tabs[activeIndex]
    });
  }

  function next() {
    setActive(
      Math.min(activeIndex + 1, tabs.length - 1)
    );
  }

  function previous() {
    setActive(
      Math.max(activeIndex - 1, 0)
    );
  }

  function open() {
    root.style.display = '';
    emit('open');
  }

  function close() {
    root.style.display = 'none';
    emit('close');
  }

  function toggle() {
    const hidden =
      getComputedStyle(root).display === 'none';

    hidden ? open() : close();
  }

  function handleClick(event) {
    const button = event.currentTarget;

    const index = Number(button.dataset.index);

    setActive(index);
  }

  function destroy() {
    if (destroyed) return;

    destroyed = true;

    buttons.forEach((button) => {
      button.removeEventListener('click', handleClick);
    });

    listeners.clear();

    root.innerHTML = '';

    emit('destroy');
  }

  buttons.forEach((button) => {
    button.addEventListener('click', handleClick);
  });

  render();

  return {
    open,
    close,
    toggle,
    next,
    previous,
    setActive,
    destroy,
    on,
    off,
    el: root,
    panelEl: panel,
    buttons
  };
}