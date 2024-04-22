import React, { useCallback, useMemo, useState } from "react";
import { View } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";

export default function ({ slots }) {
  return (
    <>
      <View className={cx([css.condition, "condition_1"])}>
        {slots["condition_1"].render()}
      </View>
      <View className={cx([css.condition, "condition_2"])}>
        {slots["condition_2"].render()}
      </View>
      <View className={cx([css.condition, "condition_3"])}>
        {slots["condition_3"].render()}
      </View>
    </>
  );
}
