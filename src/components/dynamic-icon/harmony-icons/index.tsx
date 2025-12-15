import SystemIcons from "./icons";
import React from "react";
import { View } from "@tarojs/components";
import css from "./index.less";

export default function ({ size = 24, color = "#000", name, className = "" }) {
  return (
    <View
      class={`${css.hmIcon} ${className}`}
      style={{ fontSize: size, color }}
    >
      {SystemIcons[name] || SystemIcons["HM_plus"]}
    </View>
  );
}
