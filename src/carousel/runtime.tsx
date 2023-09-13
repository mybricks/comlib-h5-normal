import React, { useRef, useEffect, useCallback } from 'react';
import Carousel from './../components/carousel';
import Swipe from './../components/swipe';
import { SLIDER_TYPE } from './const';
// import { EVT_TYPE } from '../utils/event-editor/const';
// import handleEvent from '../utils/event-editor/handleEvent';
import { openPage } from '../utils/event';
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
    if (carouselRef.current && env.runtime === false) {
      (carouselRef.current as any)?.slideTo(data.slideIndex);
    }
  }, [data.slideIndex]);

  inputs['dataSource']((res) => {
    data.items = res;
    data.slideIndex = 0;
  });

  inputs['slideIndex']?.((index) => {
    data.slideIndex = index
  })

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

      // if (env.runtime) {
      //   if (item.evtType === EVT_TYPE.AUTHOR) {
      //     env
      //       .ajax(
      //         '/rest/h5/activity/traffic/c/delivery/resource/h5',
      //         {
      //           method: 'post',
      //           data: {
      //             pageCode: 'itemListPage',
      //             resource: [
      //               {
      //                 resourceCode: 'sellerList',
      //                 param: {
      //                   cursor: 0,
      //                   firstRequest: true,
      //                   idList: [+item.authorId],
      //                   pageCode: env.getPageCode(),
      //                 },
      //               },
      //             ],
      //           },
      //         },
      //         true,
      //       )
      //       .then((res) => {
      //         let list = res?.data?.sellerList?.extInfo?.list;
      //         let liveStatus = list.length ? list[0].liveStatus : false;
      //         if (liveStatus) {
      //           openPage(`kwai://live/play/~${item.authorId}`, env.yoda);
      //         } else {
      //           openPage(`kwai://profile/${item.authorId}`, env.yoda);
      //         }
      //       });
      //     return;
      //   }

      //   handleEvent({
      //     env,
      //     logger,
      //     evtType: item.evtType,
      //     jumpUrl: item.jumpUrl,
      //     customHandler: () => {
      //       const ouputFn = outputs[item.id];
      //       typeof ouputFn === 'function' && ouputFn(true);
      //     },
      //   });
      //   // const ouputFn = outputs[item.id];
      //   // typeof ouputFn === 'function' && ouputFn(true);
      // }
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

  if (data.type === SLIDER_TYPE.swipe) {
    return (
      <Swipe style={data.style} onInit={onInit} onChange={handleChange} {...configs}>
        {(data.items || []).map((item, index) => {
          return (
            <Swipe.Item
              key={`carousel_item_${index}`}
              data-carousel-item={index}
              // onClick={() => onClick(index)}
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
      onChange={handleChange}
    >
      {(data.items || []).map((item, index) => {
        return (
          <Carousel.Item
            key={`carousel_item_${index}`}
            data-carousel-item={index}
            // onClick={() => onClick(index)}
          >
            {/* {!item.url ? (
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
            )} */}
            {slots[item._id]?.render?.()}
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};
