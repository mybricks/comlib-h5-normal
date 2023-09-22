import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
} from "./../index";
import Carousel from './../carousel'
import { SwiperProps } from '@tarojs/components'
import css from "./index.less";

export function Swiper(props: SwiperProps) {
  const { current, style, children, className, indicator, ...extra } = props;
  return (
    <View className={`${css.wrapper} mybricks-swiper-wrapper ${className}`}>
      <Carousel
        {...extra}
        // className={`${css.swiper} mybricks-swiper`}
        style={style}
        current={current}
        indicatorDots={false}
      >
        {children}
      </Carousel>
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

export const SwiperItem = Carousel.Item
