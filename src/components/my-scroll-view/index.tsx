import React, { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import { View } from "@tarojs/components";
import "./style.less";

const CustomScrollView = forwardRef((props, ref) => {
  const { children, onscroll, onscrollstart, onscrollend } = props;

  const [scrollTop, setScrollTop] = useState(0);
  const scrollContainerRef = useRef(null);
  const startYRef = useRef(0);
  const startScrollTopRef = useRef(0);
  const velocityRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  const isScrollingRef = useRef(false);

  const handleTouchStart = useCallback((e) => {
    startYRef.current = e.touches[0].clientY;
    startScrollTopRef.current = scrollTop;
    velocityRef.current = 0;
    lastMoveTimeRef.current = Date.now();
    isScrollingRef.current = true;
    onscrollstart && onscrollstart(e);
  }, [scrollTop, onscrollstart]);

  const handleTouchMove = useCallback((e) => {
    const currentY = e.touches[0].clientY;
    const deltaY = startYRef.current - currentY;
    const newScrollTop = startScrollTopRef.current + deltaY;

    const currentTime = Date.now();
    const deltaTime = currentTime - lastMoveTimeRef.current;
    velocityRef.current = deltaY / deltaTime;
    lastMoveTimeRef.current = currentTime;

    setScrollTop(newScrollTop);
    onscroll && onscroll({ scrollTop: newScrollTop });
  }, [onscroll]);

  const handleTouchEnd = useCallback(() => {
    const inertiaScroll = () => {
      const friction = 0.95;
      const newVelocity = velocityRef.current * friction;
      const newScrollTop = scrollTop + newVelocity * 16; // 16ms 是大约一帧的时间

      if (Math.abs(newVelocity) > 0.1) {
        setScrollTop(newScrollTop);
        velocityRef.current = newVelocity;
        requestAnimationFrame(inertiaScroll);
      } else {
        isScrollingRef.current = false;
        onscrollend && onscrollend();
      }
    };

    inertiaScroll();
  }, [scrollTop, onscrollend]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  useImperativeHandle(ref, () => ({
    setScrollTop: (value) => {
      setScrollTop(value);
      const container = scrollContainerRef.current;
      if (container) {
        container.scrollTop = value;
      }
    }
  }));

  return (
    <View
      ref={scrollContainerRef}
      className="custom-scroll-view"
      style={{ overflowY: "scroll", height: "100%" }} // 设置滚动容器的高度和滚动行为
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </View>
  );
});

export default CustomScrollView;