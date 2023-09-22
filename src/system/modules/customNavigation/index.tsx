import React, { useEffect, useMemo, useState } from "react";
import { View, Image } from "@tarojs/components";
import cx from "classnames";
import * as Taro from "@tarojs/taro";
import css from "./style.less";
import { isDesigner } from "../../../utils/env";
import menuButtonWhite from "../icons/menuButtonWhite";
import menuButtonBlack from "../icons/menuButtonBlack";

const defaultMenuButtonBoundingClientRect = {
  width: 87,
  height: 32,
  top: 48,
  right: 368,
  bottom: 80,
  left: 281
};

export default function (props) {
  let { env, data, slots } = props;

  // 获取菜单按钮的布局位置信息
  const menuButtonBoundingClientRect = isDesigner(env)
    ? defaultMenuButtonBoundingClientRect
    : Taro.getMenuButtonBoundingClientRect();

  // 自定义导航栏
  return (
    <View className={css.customNavigation} style={{ ...data.customNavigation.style }}>
      <View
        className={css.safearea}
        style={{ height: menuButtonBoundingClientRect.top - 4 }}
      ></View>
      <View
        className={css.main}
        style={{ height: menuButtonBoundingClientRect.height + 8 }}
      >
        <View
          className={css.left}
          style={{
            height: menuButtonBoundingClientRect.height,
            width: menuButtonBoundingClientRect.width,
            top: 4,
            left: 7,
            // left: 375 - menuButtonBoundingClientRect.right,
          }}
        >
          {slots["leftSlot"]?.render({
            style: env.edit
              ? {
                background: "transparent",
                minHeight: "auto",
                overflow: "hidden",
              }
              : {},
          })}
        </View>

        {/* 仅在设计器中展示 */}
        {isDesigner(env) && (
          <Image
            className={css.right}
            src={data.navigationBarTextStyle === "white" ? menuButtonWhite : menuButtonBlack}
          />
        )}

        <View className={css.title}>
          {slots["mainSlot"]?.render({
            style: env.edit
              ? {
                background: "transparent",
                minHeight: "auto",
                overflow: "hidden",
              }
              : {},
          })}
        </View>
      </View>
    </View>
  );

}
