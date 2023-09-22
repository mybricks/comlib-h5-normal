import React, { useCallback, useEffect, useRef } from "react";
import { View } from "@tarojs/components";
import * as Taro from "@tarojs/taro";
import css from "./style.less";
import cx from "classnames";

export default function ({ id, env, data, inputs, outputs }) {
  const io = Taro.createIntersectionObserver(Taro.getCurrentInstance().page);

  const connect = useCallback(() => {
    io.relativeToViewport().observe(`#${id} .mybricks-anchor`, (res) => {
      if (res.intersectionRatio > 0) {
        outputs["onExposure"]?.(res);
      } else {
        outputs["onUnexposure"]?.(res);
      }
    });
  }, []);

  useEffect(() => {
    Taro.nextTick(() => {
      connect();
    });

    inputs["scrollTo"](() => {

      env?.rootScroll.scrollTo?.({
        id: `#${id}`,
      })
      // Taro.pageScrollTo({
      //   selector: `#${id} .mybricks-anchor`,
      //   duration: 0,
      // });
    });

    return () => {
      io.disconnect();
    };
  });

  return <View className={cx(css.anchor, "mybricks-anchor")}></View>;
}
