import React, { useRef } from 'react';

const getXYFromEvent = (event: any) => {
  if (event && event.touches && event.touches[0]) {
    return {
      clientX: event.touches[0].clientX,
      clientY: event.touches[0].clientY,
    };
  }

  return {
    clientX: event.clientX,
    clientY: event.clientY,
  };
};

const defaultEvt = {
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  time: 0,
  isSwiping: false,
};

export default () => {
  const evt = useRef({
    ...defaultEvt,
  });

  const reset = () => {
    evt.current = { ...defaultEvt };
  };

  const start = (event: React.TouchEvent | TouchEvent | React.MouseEvent) => {
    reset();
    evt.current.time = new Date().getTime();
    evt.current.startX = getXYFromEvent(event).clientX;
    evt.current.startY = getXYFromEvent(event).clientY;
  };

  const move = (event: React.TouchEvent | TouchEvent | React.MouseEvent) => {
    if (!evt.current.time) return;
    evt.current.deltaX = getXYFromEvent(event).clientX - evt.current.startX;
    evt.current.deltaY = getXYFromEvent(event).clientY - evt.current.startY;

    // 防止点击或者tap触发swipe
    if (Math.abs(evt.current.deltaX) > 30 || Math.abs(evt.current.deltaY) > 30) {
      evt.current.isSwiping = true;
    }
  };

  const end = () => {
    const tempDeltaX = evt.current.deltaX;
    const tempDeltaY = evt.current.deltaY;
    const timediff = new Date().getTime() - evt.current.time;
    reset();
    return {
      deltaX: tempDeltaX,
      deltaY: tempDeltaY,
      time: timediff,
    };
  };

  const getEvt = () => ({ ...evt.current });

  return {
    move,
    start,
    end,
    getEvt,
  };
};
