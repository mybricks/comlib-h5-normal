import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import css from "./../style.less";
import cx from "classnames";
import { View, Text } from "./../../components-h5";

export default function ({ env, data, logger, slots, inputs, outputs, title }) {
  const onClick = useCallback((ev) => {
    if (env.runtime) {
      ev.stopPropagation();
      outputs["onClick"](true);
    }
  }, []);

  /** TODO 写在useEffect里时序有延迟，容易出现闪屏，先试试这样先 */
  useMemo(() => {
    inputs["buttonText"]((val: string) => {
      data.text = val;
    });
  }, []);

  return (
    <View className={cx(css.button, "mybricks-button")} onClick={onClick}>
      <Text className={css.text}>{data.text}</Text>
    </View>
  );
}
