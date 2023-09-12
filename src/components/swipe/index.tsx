import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { useInterval, useNodeBoundingRect, useTouch } from './../../utils/hooks';
import { CarouselProps } from './type';

import css from './index.less';

const CarouselItem = ({ children, isActive, isAnimate, style = {}, ...others }: any) => {
  return (
    <div
      data-carousel-item={others['data-carousel-item']}
      className={`${css['carousel-item']} ${isActive ? css['carousel-item-active'] : ''} `}
      {...others}
      style={{
        ...style,
        transition: isAnimate ? 'transform 0.3s ease' : '',
      }}
    >
      {children}
    </div>
  );
};

const Carousel = ({ children, style, touchable = true, autoplay = false, onInit, onChange }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const carouselWrapperRef = useRef<HTMLDivElement>(null);

  const carouselItemRef = useRef<HTMLDivElement>(null);

  const count = useMemo(() => React.Children.count(children), [children]);

  const isInfinite = useMemo(() => count > 2, [count]);

  const [state, _setState] = useState({
    curIndex: 0,
    curAnimate: true,
  });
  const setState = (o: any) => _setState((c) => ({ ...c, ...o }));

  const { width } = useNodeBoundingRect(carouselItemRef);

  const { width: wrapperWidth, height } = useNodeBoundingRect(carouselWrapperRef);

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
        carouselRef.current.style.transition = 'all .3s cubic-bezier(0.165, 0.84, 0.44, 1)';
      } else {
        carouselRef.current.style.transition = '';
      }
      carouselRef.current.style.transform = `translate3d(-${
        (index + (isInfinite ? 2 : 0) + 0.5) * width - wrapperWidth / 2 + offset
      }px, 0, 0)`;
    },
    [carouselRef, width, wrapperWidth],
  );

  const slideToStep = useCallback(
    ({ step = 0, offset = 0 }) => {
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
        if (step > 0 && targetIdx < count) {
          // 移动至下一项
          moveCarouselItem({
            isInfinite,
            width,
            index: targetIdx,
            isAnimate: true,
          });
          setState({ curIndex: targetIdx, curAnimate: true });
        } else if (step > 0 && targetIdx >= count) {
          // 越界，移动至下一项，并在动画后将容器移到开头
          moveCarouselItem({
            isInfinite,
            width,
            index: targetIdx,
            isAnimate: true,
          });
          setState({ curIndex: targetIdx, curAnimate: true });

          // 偷梁换柱
          setTimeout(() => {
            moveCarouselItem({ isInfinite, width, index: 0, isAnimate: false });
            setState({ curIndex: 0, curAnimate: false });
          }, 300);
        } else if (step < 0 && targetIdx >= 0) {
          // 移动至上一项
          moveCarouselItem({
            isInfinite,
            width,
            index: targetIdx,
            isAnimate: true,
          });
          setState({ curIndex: targetIdx, curAnimate: true });
        } else if (step < 0 && targetIdx < 0) {
          // 越界，移动至上一项，并在动画后将容器移到结尾
          moveCarouselItem({
            isInfinite,
            width,
            index: targetIdx,
            isAnimate: true,
          });
          setState({ curIndex: targetIdx, curAnimate: true });

          // 偷梁换柱
          setTimeout(() => {
            moveCarouselItem({
              isInfinite,
              width,
              index: count - 1,
              isAnimate: false,
            });
            setState({ curIndex: count - 1, curAnimate: false });
          }, 300);
        }
      }
    },
    [width, state.curIndex, count, isInfinite],
  );

  // const moveTo = useCallback((index) => {
  //   moveCarouselItem({
  //     isInfinite,
  //     width,
  //     index,
  //     isAnimate: true,
  //   })
  // }, [width, isInfinite])

  // 初始化
  useEffect(() => {
    moveCarouselItem({ isInfinite, width, index: 0, isAnimate: false });
  }, [width, moveCarouselItem, isInfinite]);

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
    if (!touchable) return;
    touch.start(event);
  };

  const onTouchMove = (event: React.TouchEvent | TouchEvent | React.MouseEvent) => {
    if (!touchable) return;
    touch.move(event);

    if (!touch.getEvt().isSwiping) return;
    timmerClear();
    const { deltaX } = touch.getEvt();
    slideToStep({ offset: -deltaX });
  };

  const onTouchEnd = () => {
    if (!touchable || !touch.getEvt().isSwiping) return;
    const { deltaX, time } = touch.end();

    const moveLimit = (deltaX / width) * 1.8;

    slideToStep({ step: moveLimit > 1 ? -1 : moveLimit < -1 ? 1 : 0 });
    timmerPlay();
  };

  const infiniteList = useMemo(() => {
    const list: Array<any> = [];
    const arrChildren = React.Children.toArray(children);
    React.Children.forEach(children, (child, i) => {
      if (isInfinite && i === 0) {
        list.push(
          React.cloneElement(arrChildren[arrChildren.length - 2] as React.ReactElement, {
            isActive: state.curIndex === -2,
            isAnimate: state.curAnimate,
          }),
        );
        list.push(
          React.cloneElement(arrChildren[arrChildren.length - 1] as React.ReactElement, {
            isActive: state.curIndex === -1,
            isAnimate: state.curAnimate,
          }),
        );
      }

      list.push(React.cloneElement(child, { isActive: state.curIndex === i, isAnimate: state.curAnimate }));

      if (isInfinite && i === count - 1) {
        list.push(
          React.cloneElement(arrChildren[0] as React.ReactElement, {
            isActive: state.curIndex === arrChildren.length,
            isAnimate: state.curAnimate,
          }),
        );
        list.push(
          React.cloneElement(arrChildren[1] as React.ReactElement, {
            isActive: state.curIndex === arrChildren.length + 1,
            isAnimate: state.curAnimate,
          }),
        );
      }
    });
    return list.map((t, index) => (
      <div style={{ width: '100%', height: '100%' }} data-index={index} data-a={state.curIndex} ref={carouselItemRef}>
        {t}
      </div>
    ));
  }, [children, isInfinite, state.curIndex, state.curAnimate]);

  useEffect(() => {
    typeof onChange === 'function' && onChange(state.curIndex);
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
