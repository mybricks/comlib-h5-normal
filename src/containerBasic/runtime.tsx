import React, { useCallback } from "react";
import { View } from "@tarojs/components";
import css from "./style.less";

export default function ({ env, data, slots, inputs, outputs }) {
  const onClick = useCallback((ev) => {
    if (env.runtime) {
      outputs["onClick"]?.(true);
    }
  }, []);

  return (
    <View className={css.container} onClick={onClick} style={data?.style ?? {}}>
      {slots["content"].render({
        style: data.slotStyle,
      })}
    </View>
  );
}
