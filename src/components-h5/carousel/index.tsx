import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { useInterval, useNodeBoundingRect } from './../../utils/hooks';
import useTouch from './useTouch';
import { CarouselProps, SLIDER_TYPE } from './type';
import css from './index.less';

const CarouselItem = ({ children, className, ...others }: any) => {
  return (
    <div data-carousel-item={others['data-carousel-item']} className={`${css['carousel-item']} ${className}`} {...others}>
      {children}
    </div>
  );
};

const Carousel = ({
  children,
  style,
  touchable = true,
  autoplay = false,
  indicatorDots = false,
  onInit,
  onChange,
  current = 0,
}: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const carouselWrapperRef = useRef<HTMLDivElement>(null);

  const isAnimating = useRef<boolean>(false);

  const count = useMemo(() => React.Children.count(children), [children]);

  const isInfinite = useMemo(() => count > 1, [count]);

  const [state, _setState] = useState({
    curIndex: current ?? 0,
  });
  const setState = (o: any) => _setState((c) => ({ ...c, ...o }));

  const { width, height } = useNodeBoundingRect(carouselWrapperRef);

  const moveCarouselItem = useCallback(
    ({ isInfinite, width, index, offset = 0, isAnimate = true }) => {
      if (!carouselRef.current || !carouselRef.current.style) {
        return;
      }
      if (width === 0) {
        // 防止因为width = 0 计算出 transform 失误造成闪屏
        return;
      }
      if (isAnimate) {
        // carouselRef.current.style.transition = 'all .4s cubic-bezier(0.165, 0.84, 0.44, 1)'
        carouselRef.current.style.transition = 'all .3s ease-in-out';
      } else {
        carouselRef.current.style.transition = '';
      }
      carouselRef.current.style.transform = `translate3d(-${(index + (isInfinite ? 1 : 0)) * width + offset}px, 0, 0)`;
    },
    [carouselRef],
  );

  const slideToStep = useCallback(
    ({ step = 0, offset = 0 }) => {
      if (count < 2) {
        return 1;
      }
      if (offset !== 0) {
        // 偏移
        moveCarouselItem({
          isInfinite,
          width,
          index: state.curIndex,
          offset,
          isAnimate: false,
        });
      } else if (step === 0) {
        // 偏移复位
        moveCarouselItem({
          isInfinite,
          width,
          index: state.curIndex,
          offset,
          isAnimate: true,
        });
      } else {
        // 切换轮播项
        let targetIdx = state.curIndex + step;
        isAnimating.current = true;
        if (step > 0 && targetIdx < count) {
          // 移动至下一项
          moveCarouselItem({
            isInfinite,
            width,
            index: targetIdx,
            isAnimate: true,
          });
          setState({ curIndex: targetIdx });
        } else if (step > 0 && targetIdx >= count) {
          // 越界，移动至下一项，并在动画后将容器移到开头
          moveCarouselItem({
            isInfinite,
            width,
            index: targetIdx,
            isAnimate: true,
          });
          setTimeout(() => {
            moveCarouselItem({ isInfinite, width, index: 0, isAnimate: false });
          }, 300);
          setState({ curIndex: 0 });
        } else if (step < 0 && targetIdx >= 0) {
          // 移动至上一项
          moveCarouselItem({
            isInfinite,
            width,
            index: targetIdx,
            isAnimate: true,
          });
          setState({ curIndex: targetIdx });
        } else if (step < 0 && targetIdx < 0) {
          // 越界，移动至上一项，并在动画后将容器移到结尾
          moveCarouselItem({
            isInfinite,
            width,
            index: targetIdx,
            isAnimate: true,
          });
          setTimeout(() => {
            moveCarouselItem({
              isInfinite,
              width,
              index: count - 1,
              isAnimate: false,
            });
          }, 300);
          setState({ curIndex: count - 1 });
        }
        setTimeout(() => {
          isAnimating.current = false;
        }, 200);
      }
    },
    [width, state.curIndex, count, isInfinite],
  );

  // const isFocus = useParentFocus({ isEdit: showIndexPicker, nodeRef: carouselWrapperRef })

  const moveTo = useCallback(
    (index) => {
      console.log(index);
      moveCarouselItem({
        isInfinite,
        width,
        index,
        isAnimate: true,
      });
    },
    [width, isInfinite],
  );

  // 初始化
  useEffect(() => {
    moveCarouselItem({ isInfinite, width, index: 0, isAnimate: false });
  }, [width, isInfinite]);

  const slideTo = useCallback(
    (index) => {
      moveCarouselItem({ isInfinite, width, index, isAnimate: false });
      setState({ curIndex: index });
    },
    [width, isInfinite],
  );

  useEffect(() => {
    typeof onInit === 'function' &&
      onInit({
        slideTo,
        ref: carouselWrapperRef,
      });
  }, [slideTo]);

  const autoSlide = useCallback(
    ({ step = 0 }) =>
      () =>
        slideToStep({ step }),
    [slideToStep],
  );

  const [timmerPlay, timmerClear] = useInterval(
    autoSlide({ step: autoplay?.reverseDirection ? -1 : 1 }),
    autoplay && isInfinite ? autoplay.delay || 3000 : null,
  );

  const touch = useTouch();

  const onTouchStart = (event: React.TouchEvent | TouchEvent | React.MouseEvent) => {
    if (!touchable || isAnimating.current) return;
    touch.start(event);
  };

  const onTouchMove = (event: React.TouchEvent | TouchEvent | React.MouseEvent) => {
    if (!touchable || isAnimating.current) return;
    touch.move(event);

    if (!touch.getEvt().isSwiping) return;
    timmerClear();
    const { deltaX } = touch.getEvt();
    slideToStep({ offset: -deltaX });
  };

  const onTouchEnd = (event) => {
    // event.preventDefault()
    // event.stopPropagation()
    if (!touchable || !touch.getEvt().isSwiping || isAnimating.current) return;
    const { deltaX, time } = touch.end();

    const offsetWLimit = width / 6; // 偏移阈值，超出阈值则认为滑动了，比如width / 5，可以认为第二个元素只露出了5/1的宽度即可以滑动过去
    const timeDeltaXLimit = 0.3; // 快速滑动的系数，比如100ms内25px，属于快速滑动

    // 判断是否超过设定阈值或者是否属于快速滑动
    const step =
      offsetWLimit < Math.abs(deltaX) || Math.abs(deltaX / time) > timeDeltaXLimit ? (deltaX > 0 ? -1 : 1) : 0;
    slideToStep({ step });
    timmerPlay();
  };

  const infiniteList = useMemo(() => {
    const list: Array<any> = [];
    const arrChildren = React.Children.toArray(children);
    React.Children.forEach(children, (child, i) => {
      if (isInfinite && i === 0) {
        list.push(React.cloneElement(arrChildren[arrChildren.length - 1] as React.ReactElement));
      }

      list.push(child);

      if (isInfinite && i === count - 1) {
        list.push(React.cloneElement(arrChildren[0] as React.ReactElement));
      }
    });
    return list;
  }, [children, isInfinite]);

  useEffect(() => {
    typeof onChange === 'function' && onChange({ detail: { current: state.curIndex } });
  }, [state.curIndex]);

  return (
    <div
      ref={carouselWrapperRef}
      className={css['carousel-wrapper']}
      style={style}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchCancel={onTouchEnd}
      onTouchEnd={onTouchEnd}
      onMouseDown={onTouchStart}
      onMouseMove={onTouchMove}
      onMouseLeave={onTouchEnd} // 解决拖出div边界的问题
      onMouseUp={onTouchEnd}
    >
      <div ref={carouselRef} className={css['carousel-container']}>
        {infiniteList}
      </div>
    </div>
  );
};

Carousel.Item = CarouselItem;

export default Carousel;
