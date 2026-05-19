import { createActionSheet } from './components/action-sheet.js';
import { createBottomSheet } from './components/bottom-sheet.js';
import { createModal } from './components/modal.js';
import { createPullToRefresh } from './components/pull-refresh.js';
import { createSwipeCards } from './components/swipe-cards.js';
import { createTabBar } from './components/tab-bar.js';
import { createTabs } from './components/tabs.js';
import { createToast } from './components/toast.js';

const version = '0.1.0';

const Pocket = {
  version,

  createActionSheet,
  createBottomSheet,
  createModal,
  createPullToRefresh,
  createSwipeCards,
  createTabBar,
  createTabs,
  createToast
};

export {
  version,
  Pocket,

  createActionSheet,
  createBottomSheet,
  createModal,
  createPullToRefresh,
  createSwipeCards,
  createTabBar,
  createTabs,
  createToast
};

export default Pocket;

if (typeof window !== 'undefined') {
  window.Pocket = Pocket;
}