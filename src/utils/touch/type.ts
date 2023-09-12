interface SwipeEvent extends TouchEvent {
  direction: string;
}

interface TOption {
  onTouchStart?: (e: TouchEvent) => void;
  onTouchMove?: (e: TouchEvent) => void;
  onTouchEnd?: (e: TouchEvent) => void;
  onTouchCancel?: (e: TouchEvent) => void;
  onSwipe?: (e: SwipeEvent) => void;
  onTap?: (e: TouchEvent) => void;
  onLongTap?: (e: TouchEvent) => void;
  onDoubleTap?: (e: TouchEvent) => void;
}
