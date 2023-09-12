import React, { useRef, useEffect, useCallback } from 'react';
import Carousel from './../components/carousel';
import Swipe from './../components/swipe';
import { SLIDER_TYPE } from './const';
import { Data } from './types';


export default ({ env, data, inputs, outputs, title, slots, logger }: RuntimeParams<Data>) => {
  const carouselRef = useRef(null);
  const onInit = (carousel: any) => {
    carouselRef.current = carousel;
    carousel.ref.current.addEventListener('touchmove', (e) => {
      e.preventDefault();
    });
  };

  useEffect(() => {
    env.weblog.collect('SHOW', {
      action: 'OP_ACTIVITY_MODULE',
      params: {
        action_name: title,
      },
    });
  }, []);

  useEffect(() => {
    if (carouselRef.current && env.runtime === false) {
      (carouselRef.current as any)?.slideTo(data.slideIndex);
    }
  }, [data.slideIndex]);

  inputs['dataSource']((res) => {
    data.items = res;
    data.slideIndex = 0;
  });

  const configs =
    env.runtime === false
      ? {
          touchable: false,
          autoplay: false,
          showIndexPicker: true,
          items: data.items,
          env,
        }
      : {
          autoplay: data.autoplay,
          env,
        };

  const onClick = useCallback(
    (index) => {
      const item = data.items[index];


    },
    [env.runtime, data.items, title],
  );

  const handleChange = (index) => {
    outputs['onIndexChange'] &&
      outputs['onIndexChange']({
        index,
        item: data.items[index],
      });
  };

  // // 不允许yoda实现太离谱的右滑返回
  // useEffect(() => {
  //   env.yoda?.ui?.setSlideBackBehavior({ behavior: 'none' })
  // }, [env])

  if (data.type === SLIDER_TYPE.swipe) {
    return (
      <Swipe style={data.style} onInit={onInit} onChange={handleChange} {...configs}>
        {(data.items || []).map((item, index) => {
          return (
            <Swipe.Item
              key={`carousel_item_${index}`}
              data-carousel-item={index}
              onClick={() => onClick(index)}
              style={{ width: `${data.cardWidth || 160}px`, height: '100%', padding: '0px 0px' }}
            >
              <img
                style={{ width: '100%', height: '100%' }}
                src={item.url}
                alt="轮播图"
              />
            </Swipe.Item>
          );
        })}
      </Swipe>
    );
  }

  return (
    <Carousel
      style={data.style}
      onInit={onInit}
      pagination={data.pagination}
      dotStyle={data.dotStyle}
      dotActiveStyle={data.dotActiveStyle}
      dotOffset={data.dotOffset}
      dotColGap={data.dotColGap}
      {...configs}
    >
      {(data.items || []).map((item, index) => {

        return (
          <Carousel.Item key={`carousel_item_${index}`} data-carousel-item={index} onClick={() => onClick(index)}>
            {!item.url ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#F8F8F8',
                  width: '100%',
                  height: '100%',
                  fontSize: 13,
                }}
              >
                {env.runtime === false ? (
                  <div>
                    <p style={{ fontSize: 16, textAlign: 'center' }}>轮播图{index + 1}</p>
                    <p>请先配置图片地址</p>
                  </div>
                ) : (
                  <p>无内容</p>
                )}
              </div>
            ) : (
              <img
                style={{ width: '100%', height: '100%' }}
                src={item.url}
                alt="轮播图"
              />
            )}
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};
