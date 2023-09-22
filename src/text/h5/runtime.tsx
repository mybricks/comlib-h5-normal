import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text } from "./../../components-h5";
import cx from "classnames";
import css from "./../style.less";

export default function ({ env, data, inputs, outputs }) {
  /** TODO 写在useEffect里时序有延迟，容易出现闪屏，先试试这样先 */
  useMemo(() => {
    inputs["value"]((val) => {
      data.text = val;
    });
  }, [])

  const textCx = useMemo(() => {
    return cx({
      [css.text]: true,
      ["mybricks-text"]: true,
      [css["ellipsis-line"]]: !!data.ellipsis,
    });
  }, [data.ellipsis]);

  const style = useMemo(() => {
    if (data.ellipsis) {
      return { WebkitLineClamp: data.maxLines };
    } else {
      return {};
    }
  }, [data.ellipsis, data.maxLines]);

  const maxLines = useMemo(() => {
    if (data.ellipsis) {
      return { maxLines: data.maxLines };
    } else {
      return {}
    }
  }, [data.ellipsis, data.maxLines]);

  const onClick = useCallback(() => {
    if (!env.runtime) {
      return;
    }
    console.warn("onClick");
    outputs["onClick"](data.text);
  }, []);

  const onLongPress = useCallback(() => {
    if (!env.runtime) {
      return;
    }
    console.warn("onLongPress");
    outputs["onLongPress"](data.text);
  }, []);

  const text = useMemo(() => {
    let text = data.text ?? "";

    if (typeof text === "object") {
      return JSON.stringify(text);
    }
    return text;
  }, [data.text]);

  return (
    <View className={textCx} style={style} onClick={onClick} onLongPress={onLongPress}>
      {text}
    </View>
  );
}
