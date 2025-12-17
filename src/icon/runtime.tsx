import React, { useCallback, useEffect, useMemo, useState } from "react";
import css from "./style.less";
import cx from "classnames";
import { View } from "@tarojs/components";
import DynamicIcon from "../components/dynamic-icon";

export default function ({ env, data, logger, slots, inputs, outputs, title }) {
  const onClick = useCallback((e) => {
    if (env.runtime) {
      if (outputs["onClick"].getConnections().length) {
        e.stopPropagation();
      }
      outputs["onClick"](true);
    }
  }, []);

  return (
    <View className={cx(css.icon, "mybricks-icon")} onClick={onClick}>
      <DynamicIcon
        name={data.icon}
        size={data.fontSize}
        color={data.fontColor}
      />
    </View>
  );
}
