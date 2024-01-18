import React, { useCallback, useMemo } from "react";
import cx from "classnames";
import css from "./style.less";
import { View } from "@tarojs/components";

export default ({ id, data, outputs, slots }) => {
  const onClick = useCallback((node) => {
    outputs?.[`click`]?.();
  }, []);

  return (
    <View className={css.layout} style={data.style} onClick={onClick}>
      {slots["content"].render({
        style: {
          width: "100%",
          height: "100%",
        },
      })}
    </View>
  );
};
