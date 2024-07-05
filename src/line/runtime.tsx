import React, { useMemo } from "react";
import css from "./runtime.less";
import { View } from "@tarojs/components";
import cx from "classnames";

export default function ({ data }) {
  return <View className={cx([css.line, "mybricks-line"])}></View>;
}
