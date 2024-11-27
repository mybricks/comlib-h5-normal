import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Swiper, SwiperItem } from "./../components/swiper";
// import { Swiper } from "brickd-mobile";
import css from "./style.less";

function getDefaultCurrTabId(tabs) {
  if (tabs.length > 0) {
    return tabs[0]._id || "";
  }
  return "";
}

export default function (props) {
  const { env, data, inputs, outputs, style, slots } = props;
  // 当前选中的tab
  const [currentTabId, setCurrentTabId] = useState(
    getDefaultCurrTabId(data.items)
  );

  useEffect(() => {
    if (env.edit && data?.edit?.currentTabId) {
      setCurrentTabId(data.edit.currentTabId);
    }
  }, [env.edit, data?.edit?.currentTabId]);

  const current = useMemo(() => {
    return data.items.findIndex((t) => t._id === currentTabId);
  }, [currentTabId, data.items]);

  const onChange = useCallback(
    (e) => {
      if (env?.edit) {
        return;
      }
      const findItem = data.items[e.detail?.current];
      setCurrentTabId(findItem._id);
    },
    [data.items]
  );

  return (
    <Swiper
      {...props}
      style={{ height: style.height }}
      current={current}
      onChange={onChange}
      indicator={data.showIndicator ?? true}
      circular={data.circular ?? false}
    >
      {data.items.map((raw, index) => {
        return (
          <SwiperItem key={raw._id} className={css.swiperItem}>
            {slots[data.items_dynamic ? "item" : raw._id].render?.({
              inputValues: {
                itemData: raw,
                index: index,
              },
              key: raw._id,
            })}
          </SwiperItem>
        );
      })}
    </Swiper>
  );

  // return (
  //   <Swiper
  //     className={`${css.swiper} mybricks-swiper`}
  //     value={current}
  //     {...size}
  //     autoplay={false}
  //   >
  //     {data.items.map((raw, index) => {
  //       return (
  //         <Swiper.Item key={raw._id} className={css.swiperItem}>
  //           {slots[raw._id]?.render?.()}
  //         </Swiper.Item>
  //       );
  //     })}
  //     <Swiper.Indicator />
  //   </Swiper>
  // );
}
