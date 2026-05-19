import { createActionSheet } from './action-sheet.js';
import { createBottomSheet } from './bottom-sheet.js';
import { createModal } from './modal.js';
import { createPullToRefresh } from './pull-refresh.js';
import { createSwipeCards } from './swipe-cards.js';
import { createTabBar } from './tab-bar.js';
import { createTabs } from './tabs.js';
import { createToast } from './toast.js';

export {
  createActionSheet,
  createBottomSheet,
  createModal,
  createPullToRefresh,
  createSwipeCards,
  createTabBar,
  createTabs,
  createToast
};

export const Pocket = {
  createActionSheet,
  createBottomSheet,
  createModal,
  createPullToRefresh,
  createSwipeCards,
  createTabBar,
  createTabs,
  createToast
};

if (typeof window !== 'undefined') {
  window.Pocket = Pocket;
}