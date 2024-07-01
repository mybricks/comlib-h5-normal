import React, { useState, useCallback, useEffect, useMemo } from "react";
import cx from "classnames";
import css from "./style.less";
import { View, RootPortal } from "@tarojs/components";
import * as Taro from "@tarojs/taro";

export default ({ id, data, style, outputs, slots, env }) => {
  const isH5 = useMemo(() => {
    return Taro.getEnv() === Taro.ENV_TYPE.WEB || Taro.getEnv() === "Unknown";
  }, []);

  const ratio = useMemo(() => {
    if (isH5) {
      return 1;
    } else {
      return Taro.getSystemInfoSync().windowWidth / 375;
    }
  }, [isH5]);

  const _style = useMemo(() => {
    console.warn("style", JSON.parse(JSON.stringify(style)));

    let result = {
      ...style,
    };

    // 判断是否自定义导航栏
    const isCustomNavigation = data.navigationStyle === "custom";
    if (typeof style.top !== "undefined" && !!isCustomNavigation) {
      let boundingClientRect = Taro.getMenuButtonBoundingClientRect();

      let relativeRect = {
        width: boundingClientRect.width / ratio,
        height: boundingClientRect.height / ratio,
        top: boundingClientRect.top / ratio,
        right: boundingClientRect.right / ratio,
        bottom: boundingClientRect.bottom / ratio,
        left: boundingClientRect.left / ratio,
      };

      let customNavigationHeight =
        Math.round(relativeRect.top - (40 - relativeRect.height) / 2) + 40;

      result.top = style.top + customNavigationHeight;
    }

    if (typeof style.bottom !== "undefined") {
      let systemInfo = Taro.getSystemInfoSync();
      let bottomSafearea =
        (systemInfo.screenHeight - systemInfo.safeArea.bottom) / ratio;

      result.bottom = style.bottomAsFixed / ratio + bottomSafearea;
    }

    return result;
  }, [style, ratio, data.navigationStyle]);

  const onClick = useCallback((node) => {
    if (env.runtime) {
      // RootPortal 如何让点击后失去焦点
      outputs?.[`click`]?.();
    }
  }, []);

  const jsx = useMemo(() => {
    return (
      <View className={css.layout} style={data.style} onClick={onClick}>
        {slots["content"].render({
          style: {
            ...data.layout,
            width: "100%",
            height: "100%",
          },
        })}
      </View>
    );
  }, [_style, data.style, data.layout, slots["content"]]);

  if (isH5) {
    return jsx;
  }

  return (
    <RootPortal>
      <View className={"mycom"} style={_style}>
        {jsx}
      </View>
    </RootPortal>
  );
};
