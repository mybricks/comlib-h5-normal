import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Swiper as _Swiper,
  SwiperItem,
  SwiperProps,
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import { polyfill_taro_swiper } from './../../utils/h5-polyfill'
import css from "./index.less";

polyfill_taro_swiper();

export function Swiper(props: SwiperProps) {
  const { current, style, children, className, indicator, ...extra } = props;
  return (
    <View className={`${css.wrapper} mybricks-swiper-wrapper ${className}`}>
      <_Swiper
        {...extra}
        // className={`${css.swiper} mybricks-swiper`}
        style={style}
        current={current}
        indicatorDots={false}
      >
        {children}
      </_Swiper>
      {indicator && (
        <View className={"indicators"}>
          {Array.from(children).map((raw, index) => {
            return (
              <View
                key={index}
                className={
                  current === index ? "indicator indicator-active" : "indicator"
                }
              ></View>
            );
          })}
        </View>
      )}
    </View>
  );
}

export { SwiperItem };
