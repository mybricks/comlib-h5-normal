import React, {
  useCallback,
  useEffect,
  useRef,
  useMemo,
  useState,
} from "react";
import { View } from "@tarojs/components";
import css from "./style.less";
import { Divider } from "brickd-mobile";

export default function ({ env, data, inputs, outputs, title, style }) {
  return (
    <View className={css.imgWrapper}>
      <Divider></Divider>
    </View>
  );
}
