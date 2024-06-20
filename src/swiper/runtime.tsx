import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Image } from "@tarojs/components";
import cx from "classnames";
import { Swiper, SwiperItem } from "./../components/swiper";
import EmptyCom from "../components/empty-com";
import SkeletonImage from "./../components/skeleton-image";
import { isUndef } from "./../utils/core";
import * as Taro from "@tarojs/taro";
import css from "./style.less";

export default function ({ env, data, inputs, outputs, style }) {
  // 当前选中的tab
  const [current, setCurrent] = useState(0);
  const [loadedImages, setLoadedImages] = useState([current, current + 1, data.items?.length ? (data.items?.length - 1) : 0]); // 默认加载第一个和最后一个图片

  useEffect(() => {
    if (env.edit && !isUndef(data?.edit?.current)) {
      setCurrent(data?.edit?.current);
    }
  }, [env.edit, data?.edit?.current]);

  useEffect(() => {
    inputs["setItems"]((val) => {
      data.items = val;
    });
  }, []);

  const onClick = useCallback(({ item, index }) => {
    // if (item.customLink) {
    //   Taro.navigateTo({
    //     url: item.customLink,
    //     fail: () => {
    //       Taro.switchTab({
    //         url: item.customLink,
    //       });
    //     },
    //   });
    //   return;
    // }
    outputs["onClick"]?.({ item, index });
  }, []);

  const showIndicator = useMemo(() => {
    return data.showIndicator ?? true;
  }, [data.showIndicator]);

  const extra = useMemo(() => {
    if (env.edit) {
      return {
        autoplay: false,
        duration: 0,
      };
    }
    return {
      autoplay: !env.edit && !!data.autoplay,
      interval: 5000,
      duration: data.duration ?? 500,
    };
  }, [env.edit, data.autoplay, data.duration]);

  const onChange = useCallback((e) => {
    if (env?.edit) {
      return;
    }
    setCurrent(e.detail?.current);
  }, []);

  useEffect(() => {
    setLoadedImages(c => {
      const newLoadedImages = new Set(c);
      if (current + 1 < data.items.length) {
        newLoadedImages.add(current + 1); // 预加载后面一张图片
        return Array.from(newLoadedImages)
      }
      return c
    });
  }, [current])

  if (env.runtime && !data.items.length) {
    return null;
  }

  if (env.edit && !data.items.length) {
    return <EmptyCom title="请配置幻灯片" />;
  }

  return (
    <Swiper
      className={css.swiper}
      style={{ height: style.height }}
      current={current}
      onChange={onChange}
      indicator={showIndicator}
      circular={env.edit ? false : data.circular}
      {...extra}
    >
      {data.items.map((item, index) => {
        // 搭建态下加载全部
        const shouldLoad = env.edit ? true : loadedImages.includes(index);
        return (
          <SwiperItem
            key={item._id}
            className={css.swiperItem}
            onClick={() => {
              onClick({ item, index });
            }}
          >
            <SkeletonImage
              className={css.thumbnail}
              mode="aspectFill"
              src={shouldLoad ? item.thumbnail : ''}
              nativeProps={{
                loading: "lazy",
                decoding: "async",
              }}
              cdnCut="auto"
              cdnCutOption={{ width: style.width, height: style.height }}
            />
          </SwiperItem>
        );
      })}
    </Swiper>
  );
}
