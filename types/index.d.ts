export type PocketEvent<T = any> = {
  type: string;
  detail: T;
  target: HTMLElement;
};

export type PocketUnsubscribe = () => void;

export type PocketBaseInstance = {
  open(): void;
  close(): void;
  toggle(): void;
  destroy(): void;
  on(
    eventName: string,
    callback: (event: PocketEvent) => void
  ): PocketUnsubscribe;
  off(
    eventName: string,
    callback: (event: PocketEvent) => void
  ): void;
  el: HTMLElement;
};

export type ActionSheetAction = {
  label: string;
  destructive?: boolean;
  onClick?: () => void;
};

export type ActionSheetOptions = {
  title?: string;
  message?: string;
  actions?: ActionSheetAction[];
  cancelText?: string;
  closeOnOverlay?: boolean;
  openOnCreate?: boolean;
};

export type BottomSheetOptions = {
  trigger?: string | HTMLElement;
  sheet: string | HTMLElement;
  backdrop?: string | HTMLElement;
  snapPoints?: string[];
  initialSnap?: number;
};

export type ModalOptions = {
  title?: string;
  content?: string;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  openOnCreate?: boolean;
};

export type PullToRefreshOptions = {
  threshold?: number;
  maxDistance?: number;
  onRefresh?: () => Promise<void> | void;
  container?: Window | HTMLElement;
};

export type SwipeCard = {
  content: string;
};

export type SwipeCardsOptions = {
  container: string | HTMLElement;
  cards: SwipeCard[];
  threshold?: number;
  visibleCards?: number;
};

export type TabItem = {
  label: string;
  content?: string;
  icon?: string;
};

export type TabsOptions = {
  container: string | HTMLElement;
  tabs: TabItem[];
  active?: number;
  onChange?: (index: number, tab: TabItem) => void;
};

export type TabBarOptions = {
  items?: TabItem[];
  active?: number;
  onChange?: (index: number, item: TabItem) => void;
  container?: HTMLElement;
};

export type ToastOptions = {
  message?: string;
  duration?: number;
  position?: 'top' | 'bottom' | 'center' | string;
  closeOnClick?: boolean;
  autoClose?: boolean;
};

export type SwipeCardsInstance = PocketBaseInstance & {
  next(): void;
  previous(): void;
  goTo(index: number): void;
  cards: HTMLElement[];
};

export type TabsInstance = PocketBaseInstance & {
  next(): void;
  previous(): void;
  setActive(index: number): void;
};

export type BottomSheetInstance = PocketBaseInstance & {
  snap(index: number): void;
  backdropEl: HTMLElement | null;
  triggerEl: HTMLElement | null;
};

export function createActionSheet(
  options?: ActionSheetOptions
): PocketBaseInstance;

export function createBottomSheet(
  options: BottomSheetOptions
): BottomSheetInstance | null;

export function createModal(
  options?: ModalOptions
): PocketBaseInstance;

export function createPullToRefresh(
  options?: PullToRefreshOptions
): PocketBaseInstance & {
  refresh(): Promise<void> | void;
};

export function createSwipeCards(
  options: SwipeCardsOptions
): SwipeCardsInstance | null;

export function createTabBar(
  options?: TabBarOptions
): TabsInstance;

export function createTabs(
  options: TabsOptions
): TabsInstance | null;

export function createToast(
  options?: ToastOptions
): PocketBaseInstance;

declare const Pocket: {
  version: string;

  createActionSheet: typeof createActionSheet;
  createBottomSheet: typeof createBottomSheet;
  createModal: typeof createModal;
  createPullToRefresh: typeof createPullToRefresh;
  createSwipeCards: typeof createSwipeCards;
  createTabBar: typeof createTabBar;
  createTabs: typeof createTabs;
  createToast: typeof createToast;
};

export { Pocket };

export default Pocket;
