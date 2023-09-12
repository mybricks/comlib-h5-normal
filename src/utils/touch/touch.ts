const getXYFromEvent = (
  event: any,
): {
  clientX: number;
  clientY: number;
  touchesLen: number; // 只有手机有，表明有几个触摸点
} => {
  if (event && event.touches && event.touches[0]) {
    return {
      clientX: event.touches[0].clientX,
      clientY: event.touches[0].clientY,
      touchesLen: event.touches.length,
    };
  }

  return {
    clientX: event.clientX,
    clientY: event.clientY,
    touchesLen: 1,
  };
};

export default class Touch {
  element;

  props = {};

  preV = { x: null, y: null };
  pinchStartLen = null;
  scale = 1;
  isSingleTap = false;
  isDoubleTap = false;
  delta: number | null = null;
  last: number | null = null;
  now: number | null = null;
  end: number | null = null;
  multiTouch = false;
  tapTimeout: any = null;
  longTapTimeout: any = null;
  afterLongTap: any = null;
  afterLongTapTimeout: any = null;
  singleTapTimeout: any = null;
  swipeTimeout: any = null;
  x1: number | null = null;
  x2: number | null = null;
  y1: number | null = null;
  y2: number | null = null;
  preTapPosition = { x: null, y: null };

  constructor(el, option: TOption) {
    this.element = typeof el == 'string' ? document.querySelector(el) : el;

    this.props = option;

    this.element.addEventListener('touchstart', this._handleTouchStart, false);
    this.element.addEventListener('touchmove', this._handleTouchMove, false);
    this.element.addEventListener('touchend', this._handleTouchEnd, false);
    this.element.addEventListener('touchcancel', this._handleTouchCancel, false);

    this.element.addEventListener('mousedown', this._handleTouchStart, false);
    this.element.addEventListener('mousemove', this._handleTouchMove, false);
    this.element.addEventListener('mouseup', this._handleTouchEnd, false);
    this.element.addEventListener('mouseleave', this._handleTouchCancel, false);

    // Disable taps after longTap
    this.afterLongTap = false;
    this.afterLongTapTimeout = null;
  }

  _emitEvent = (name, ...arg) => {
    if (this.props[name]) {
      this.props[name](...arg);
    }
  };

  _handleTouchStart = (evt) => {
    this._emitEvent('onTouchStart', evt);
    this.now = Date.now();
    const { clientX, clientY, touchesLen } = getXYFromEvent(evt);
    this.x1 = clientX;
    this.y1 = clientY;
    this.delta = this.now - (this.last || this.now);
    if (this.preTapPosition.x !== null && this.preTapPosition.y !== null) {
      this.isDoubleTap =
        this.delta > 0 &&
        this.delta <= 250 &&
        Math.abs(this.preTapPosition.x - this.x1) < 30 &&
        Math.abs(this.preTapPosition.y - this.y1) < 30;
    }
    this.preTapPosition.x = this.x1;
    this.preTapPosition.y = this.y1;
    this.last = this.now;

    if (touchesLen > 1) {
      this._cancelLongTap();
      this._cancelSingleTap();
    } else {
      this.isSingleTap = true;
    }
    this.longTapTimeout = setTimeout(() => {
      this._emitEvent('onLongTap', evt);
      this.afterLongTap = true;
      this.afterLongTapTimeout = setTimeout(() => {
        this.afterLongTap = false;
      }, 1000);
    }, 750);
  };

  _handleTouchMove = (evt) => {
    this._emitEvent('onTouchMove', evt);
    const preV = this.preV;
    const { clientX: currentX, clientY: currentY, touchesLen } = getXYFromEvent(evt);

    this.isSingleTap = false;
    this.isDoubleTap = false;
    if (touchesLen > 1) {
      // var v = { x: evt.touches[1].pageX - currentX, y: evt.touches[1].pageY - currentY };
      // if (preV.x !== null) {
      //   if (this.pinchStartLen > 0) {
      //     evt.center = {
      //       x: (evt.touches[1].pageX + currentX) / 2,
      //       y: (evt.touches[1].pageY + currentY) / 2,
      //     };
      //     evt.scale = evt.zoom = this.getLen(v) / this.pinchStartLen;
      //     this._emitEvent('onPinch', evt);
      //   }
      //   evt.angle = this.getRotateAngle(v, preV);
      //   this._emitEvent('onRotate', evt);
      // }
      // preV.x = v.x;
      // preV.y = v.y;
      this.multiTouch = true;
    } else {
      if (this.x2 !== null && this.y2 !== null) {
        evt.deltaX = currentX - this.x2;
        evt.deltaY = currentY - this.y2;
      } else {
        evt.deltaX = 0;
        evt.deltaY = 0;
      }
      // this._emitEvent('onPressMove', evt);
    }
    this._cancelLongTap();
    this.x2 = currentX;
    this.y2 = currentY;

    if (touchesLen > 1) {
      evt.preventDefault();
    }
  };

  _handleTouchCancel = (evt) => {
    this._emitEvent('onTouchCancel', evt);
    clearTimeout(this.singleTapTimeout);
    clearTimeout(this.tapTimeout);
    clearTimeout(this.longTapTimeout);
    clearTimeout(this.swipeTimeout);
  };

  _handleTouchEnd = (evt) => {
    this._emitEvent('onTouchEnd', evt);
    this.end = Date.now();
    this._cancelLongTap();

    const { touchesLen } = getXYFromEvent(evt);

    if (this.multiTouch === true && touchesLen < 2) {
      this._emitEvent('onMultipointEnd', evt);
    }

    evt.origin = [this.x1, this.y1];
    if (this.multiTouch === false) {
      if (
        (this.x2 && this.x1 && Math.abs(this.x1 - this.x2) > 30) ||
        (this.y2 && this.y1 && Math.abs(this.y1 - this.y2) > 30)
      ) {
        evt.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2);
        evt.distance = Math.abs(this.x1 - this.x2);
        this.swipeTimeout = setTimeout(() => {
          this._emitEvent('onSwipe', evt);
        }, 0);
      } else {
        if (this.afterLongTap) {
          clearTimeout(this.afterLongTapTimeout);
          this.afterLongTap = false;
        } else {
          this.tapTimeout = setTimeout(() => {
            this._emitEvent('onTap', evt);
            if (this.isDoubleTap) {
              this._emitEvent('onDoubleTap', evt);
              clearTimeout(this.singleTapTimeout);
              this.isDoubleTap = false;
            } else if (this.isSingleTap) {
              this.singleTapTimeout = setTimeout(() => {
                this._emitEvent('onSingleTap', evt);
              }, 250);
              this.isSingleTap = false;
            }
          }, 0);
        }
      }
    }

    this.preV.x = 0;
    this.preV.y = 0;
    this.scale = 1;
    this.pinchStartLen = null;
    this.x1 = this.x2 = this.y1 = this.y2 = null;
    this.multiTouch = false;
  };

  _cancelLongTap = () => {
    clearTimeout(this.longTapTimeout);
  };

  _cancelSingleTap = () => {
    clearTimeout(this.singleTapTimeout);
  };

  _swipeDirection = (x1, x2, y1, y2) => {
    if (!this.end || !this.now) {
      return 'Error';
    }

    if (Math.abs(x1 - x2) > 80 || Math.abs(y1 - y2) > 80 || this.end - this.now < 250) {
      return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : y1 - y2 > 0 ? 'Up' : 'Down';
    } else {
      return 'Nochange';
    }
  };

  cancelAll = () => {
    if (this.singleTapTimeout) clearTimeout(this.singleTapTimeout);
    if (this.tapTimeout) clearTimeout(this.tapTimeout);
    if (this.longTapTimeout) clearTimeout(this.longTapTimeout);
    if (this.swipeTimeout) clearTimeout(this.swipeTimeout);
  };

  destroy = () => {
    this.cancelAll();

    this.element.removeEventListener('touchstart', this._handleTouchStart, false);
    this.element.removeEventListener('touchmove', this._handleTouchMove, false);
    this.element.removeEventListener('touchend', this._handleTouchEnd, false);
    this.element.removeEventListener('touchcancel', this._handleTouchCancel, false);

    this.element.removeEventListener('mousedown', this._handleTouchStart, false);
    this.element.removeEventListener('mousemove', this._handleTouchMove, false);
    this.element.removeEventListener('mouseup', this._handleTouchEnd, false);
    this.element.removeEventListener('mouseleave', this._handleTouchCancel, false);
  };
}
