import React, { useState, useCallback, useEffect, useMemo } from "react";
import cx from "classnames";
import css from "./style.less";
import { View } from "@tarojs/components";

export default ({ id, data, style, outputs, slots, env }) => {
  const onClick = useCallback((node) => {
    if (env.runtime) {
      outputs?.[`click`]?.();
    }
  }, []);

  return (
    <View className={css.layout} style={data.style} onClick={onClick}>
      {slots["content"].render({
        style: {
          ...data.layout,
          width: "100%",
          height: "100%",
        },
      })}
    </View>
  );
};
