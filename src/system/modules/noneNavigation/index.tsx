import React, { useEffect, useMemo, useState } from "react";
import { View, Image } from "@tarojs/components";
import cx from "classnames";
import * as Taro from "@tarojs/taro";
import css from "./style.less";
import { isDesigner } from "../../../utils/env";
import menuButtonWhite from "../icons/menuButtonWhite";
import menuButtonBlack from "../icons/menuButtonBlack";
import backIconWhite from "../icons/backIconWhite";
import backIconBlack from "../icons/backIconBlack";

const defaultMenuButtonBoundingClientRect = {
  width: 87,
  height: 32,
  top: 48,
  right: 368,
  bottom: 80,
  left: 281,
};

export default function (props) {
  const { data, env } = props;

  const relativeRect = useMemo(() => {
    if (isDesigner(env)) {
      return defaultMenuButtonBoundingClientRect;
    } else {
      let boundingClientRect = Taro.getMenuButtonBoundingClientRect();
      let ratio = Taro.getSystemInfoSync().windowWidth / 375;

      return {
        width: boundingClientRect.width / ratio,
        height: boundingClientRect.height / ratio,
        top: boundingClientRect.top / ratio,
        right: boundingClientRect.right / ratio,
        bottom: boundingClientRect.bottom / ratio,
        left: boundingClientRect.left / ratio,
      };
    }
  }, []);

  const safeareaHeight = isDesigner(env)
    ? 44
    : relativeRect.top - (40 - relativeRect.height) / 2;

  // 隐藏导航栏
  return (
    <View className={css.noneNavigation}>
      <View
        className={css.safearea}
        style={{
          height: safeareaHeight,
        }}
      ></View>

      <View
        className={css.main}
        style={{
          marginLeft: 375 - relativeRect.right,
          marginRight: 375 - relativeRect.right,
          height: 40,
        }}
      >
        {/* tabbar 页面不渲染返回按钮 */}
        {(!data.useTabBar && data.showNavigationBackBtnInNone) ? (
          <View className={css.left}>
            <Image
              className={cx(css.backIcon, "mybricks-backIcon")}
              src={
                data.customBackIcon
                  ? data.customBackIcon
                  : data.navigationBarTextStyle === "white"
                    ? backIconWhite
                    : backIconBlack
              }
              onClick={(e) => {
                if (!env.runtime) {
                  return;
                } else if (env.runtime.debug) {
                  env.canvas.back(-1);
                } else if (env.runtime) {
                  Taro.navigateBack({
                    delta: 1,
                  });
                }
              }}
            />
          </View>
        ) : null}
        <View
          className={cx(css.title, "mybricks-navTitle")}
          style={{ color: data.navigationBarTextStyle }}
        >
          {data.showNavigationTextInNone ? data.navigationBarTitleText : ""}
        </View>

        {isDesigner(env) && (data.showNavigationBarCapsule == true || data.showNavigationBarCapsule == undefined) && (
          <Image
            className={css.right}
            src={
              data.navigationBarTextStyle === "white"
                ? menuButtonWhite
                : menuButtonBlack
            }
          />
        )}
      </View>
    </View>
  );
}
