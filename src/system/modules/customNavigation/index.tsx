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
  left: 281,
};

export default function (props) {
  let { env, data, slots } = props;

  const safeareaHeight = isDesigner(env)
    ? 44
    : Taro.getMenuButtonBoundingClientRect().top - 4;

  // 自定义导航栏
  return (
    <View
      className={css.customNavigation}
      style={{ ...data.customNavigation.style }}
    >
      <View
        className={css.safearea}
        style={{
          height: safeareaHeight,
        }}
      ></View>

      <View
        className={css.main}
        style={{
          marginLeft: 7,
          marginRight: 7,
          height: 40,
        }}
      >
        {/* 
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
        */}

        {/* 仅在设计器中展示 */}
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
      </View>
    </View>
  );
}
