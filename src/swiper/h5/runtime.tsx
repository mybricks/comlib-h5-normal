import React, { useCallback, useEffect, useMemo, useState } from "react";
import cx from "classnames";
import { Swiper, SwiperItem, EmptyCom, Image } from "./../../components-h5";
import { isUndef } from "./../../utils/core";
import * as Taro from "@tarojs/taro";
import css from "./../style.less";

export default function ({ env, data, inputs, outputs, style }) {
  // 当前选中的tab
  const [current, setCurrent] = useState(0);

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
    if (item.customLink) {
      Taro.navigateTo({
        url: item.customLink,
        fail: () => {
          Taro.switchTab({
            url: item.customLink,
          });
        },
      });
      return;
    }
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
      circular={data.circular ?? true}
      {...extra}
    >
      {data.items.map((item, index) => {
        return (
          <SwiperItem
            key={item._id}
            className={css.swiperItem}
            onClick={() => {
              onClick({ item, index });
            }}
          >
            <Image
              className={css.thumbnail}
              mode="aspectFill"
              src={item.thumbnail}
            />
          </SwiperItem>
        );
      })}
    </Swiper>
  );
}
