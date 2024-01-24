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
  const { data } = props;
  const safeareaHeight = 44;

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
          marginLeft: 7,
          marginRight: 7,
          height: 40,
        }}
      >
        <Image
          className={css.right}
          src={
            data.navigationBarTextStyle === "white"
              ? menuButtonWhite
              : menuButtonBlack
          }
        />
      </View>
    </View>
  );
}
