import React, { useCallback, useEffect, useRef } from "react";
import { View } from "@tarojs/components";
import * as Taro from "@tarojs/taro";
import css from "./style.less";
import cx from "classnames";
import { isH5 } from "../utils/env";

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
        id: `aaaa`,
      });
      setTimeout(()=>{
        env?.rootScroll.scrollTo?.({
          id: `#${id}`,
        });
      },50)

    });

    return () => {
      io.disconnect();
    };
  });

  return (
    <View style={{ position: "relative" }}>
      <View className={cx(css.anchor, "mybricks-anchor")}></View>
    </View>
  );
}
