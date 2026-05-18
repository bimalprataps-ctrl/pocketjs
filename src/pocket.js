import { createToast } from './components/toast.js'
import { createModal } from './components/modal.js'
import { createTabBar } from './components/tab-bar.js'
import { createSwipeCards } from './components/swipe-cards.js'
import { createBottomSheet } from './components/bottom-sheet.js'

export const Pocket = {
  createToast,
  createModal,
  createTabBar,
  createSwipeCards,
  createBottomSheet
}

if (typeof window !== 'undefined') {
  window.Pocket = Pocket
}