import React, { useEffect, useMemo, useState } from "react";
import { View, Image } from "@tarojs/components";
import cx from "classnames";
import * as Taro from "@tarojs/taro";
import css from "./style.less";
import { isDesigner } from "../../../utils/env";
import menuButtonWhite from "../icons/menuButtonWhite";
import menuButtonBlack from "../icons/menuButtonBlack";
import { getNavigationHeight } from "../../../utils";

export default function (props) {
  let { env, data, slots } = props;

  /* 导航栏高度 */
  const navigationHeight = useMemo(() => {
    if (env.edit || env.runtime?.debug) {
      return {
        navigationHeight: 64,
        statusBarHeight: 20,
        titleBarHeight: 44,
      };
    } else {
      return getNavigationHeight();
    }
  }, [env.edit, env.runtime?.debug]);

  console.log("navigationHeight", navigationHeight);


  // 自定义导航栏
  return (
    <View
      className={css.customNavigation}
      style={{ ...data.customNavigation.style }}
    >
      {/* statusBar */}
      <View
        className={css.statusBarHeight}
        style={{ height: navigationHeight.statusBarHeight }}
      ></View>

      {/* titleBar 44 / 48 */}
      <View
        className={css.titleBar}
        style={{ height: navigationHeight.titleBarHeight }}
      >
        <View className={css.inner}>
          {data.customNavigation?.titleSlot ? (
            slots["titleSlot"]?.render({
              style: {
                ...(data.customNavigation?.titleSlotStyle || {}),
              }
            })
          ) : (
            <View className={css.titleText}>{data.title}</View>
          )}
        </View>
      </View>

      {/* <View
        className={css.main}
        style={{
          marginLeft: 375 - relativeRect.right,
          marginRight: 375 - relativeRect.right,
          height: 40, // 高度固定 40 px
        }}
      >
        {isDesigner(env) && (
          <Image
            className={css.right}
            src={
              data.navigationBarTextStyle === "white"
                ? menuButtonWhite
                : menuButtonBlack
            }
          />
        )}

        <View className={cx("mybricks-mainSlot", css.title)}>
          {slots["mainSlot"]?.render({
            style: {
              ...(data.customNavigation?.mainSlotStyle || {}),
            },
          })}
        </View>
      </View> */}
    </View>
  );
}
