# Tabs

Pocket Touch includes a lightweight tabs component for building switchable content interfaces.

Tabs are useful for:
- segmented interfaces
- settings layouts
- content switching
- dashboards
- app-like UI systems
- mobile navigation sections

The component dynamically renders tab buttons and content panels inside a container element.

---

## API

```js
Pocket.createTabs({
  container: '#tabs',
  tabs: [],
  active: 0,
  onChange: () => {}
});
```

---

## Basic Example

```html
<div id="tabs"></div>

<script src="https://cdn.jsdelivr.net/gh/bimalprataps-ctrl/pocket-touch@main/dist/pocket.iife.js"></script>

<script>
Pocket.createTabs({

  container: '#tabs',

  active: 0,

  tabs: [
    {
      label: 'Home',

      content: `
        <h2>Home</h2>
        <p>Welcome to Pocket Touch.</p>
      `
    },

    {
      label: 'Profile',

      content: `
        <h2>Profile</h2>
        <p>Touch-first interaction framework.</p>
      `
    }
  ],

  onChange(index, tab) {
    console.log(index, tab)
  }

});
</script>
```

---

## Options

| Option | Type | Description |
|---|---|---|
| `container` | string \| element | Root container |
| `tabs` | array | Array of tabs |
| `active` | number | Initial active tab |
| `onChange` | function | Runs when the active tab changes |

---

## Tab Structure

Each tab object uses:

```js
{
  label: 'Home',

  content: `
    <h2>Home</h2>
  `
}
```

| Property | Type | Description |
|---|---|---|
| `label` | string | Tab label |
| `content` | string | HTML content |

---

## Container

The component renders inside the provided container.

```js
Pocket.createTabs({
  container: '#tabs'
});
```

The container can be:
- a selector string
- a DOM element

---

## Active Tabs

Pocket Touch automatically handles:
- active state switching
- active classes
- content replacement
- callback execution

The active tab receives:

```html
active
```

class styling.

---

## onChange()

The `onChange()` callback runs when the active tab changes.

```js
onChange(index, tab) {
  console.log(index)
  console.log(tab)
}
```

Arguments:

| Argument | Description |
|---|---|
| `index` | Active tab index |
| `tab` | Active tab object |

---

## Return Value

`createTabs()` returns a controller object.

```js
const tabs = Pocket.createTabs({
  container: '#tabs',
  tabs: []
});
```

### setActive(index)

Programmatically activate a tab.

```js
tabs.setActive(1);
```

---

## Generated Structure

Pocket Touch automatically creates:

```html
<div class="pocket-tabs">

  <button class="pocket-tab active">
    Home
  </button>

</div>

<div class="pocket-tab-panel">

  Content

</div>
```

---

## Recommended CSS

```css
.pocket-tabs {
  display: flex;
  gap: 10px;

  margin-bottom: 20px;
}

.pocket-tab {
  border: none;

  padding: 12px 18px;

  border-radius: 999px;

  background: #f3f3f3;

  cursor: pointer;
}

.pocket-tab.active {
  background: #111111;
  color: #ffffff;
}

.pocket-tab-panel {
  padding: 24px;

  border-radius: 24px;

  background: #ffffff;

  box-shadow:
    0 16px 48px rgba(0,0,0,0.08);
}
```

---

## Notes

Pocket Touch tabs are designed for lightweight browser-based interfaces and touch-first layouts.

The component dynamically updates panel content using HTML strings.

---

## Related

- Tab Bar
- Modal
- Bottom Sheet
- Swipe Cards