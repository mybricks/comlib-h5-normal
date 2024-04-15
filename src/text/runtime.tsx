import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text } from "@tarojs/components";
import cx from "classnames";
import css from "./style.less";

export default function ({ env, data, style, inputs, outputs }) {
  const [ready, setReady] = useState(false);

  /** TODO 写在useEffect里时序有延迟，容易出现闪屏，先试试这样先 */
  useMemo(() => {
    inputs["value"]((val) => {
      data.text = val;
      setReady(true);
    });

    inputs["getValue"]?.((val, outputRels) => {
      if (ready) {
        outputRels["onGetValue"](data.text);
      } else {
        outputRels["onGetValue"]("");
      }
    });
  }, [ready]);

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
      return {};
    }
  }, [data.ellipsis, data.maxLines]);

  const onClick = useCallback(() => {
    if (!env.runtime) {
      return;
    }

    outputs["onClick"](data.text);
  }, []);

  const onLongPress = useCallback(() => {
    if (!env.runtime) {
      return;
    }

    outputs["onLongPress"](data.text);
  }, []);

  const text = useMemo(() => {
    let text = data.text ?? "";

    if (typeof text === "object") {
      return JSON.stringify(text);
    }

    return text;
  }, [data.text]);

  //
  const display = useMemo(() => {
    if (data.useDynamic && !ready && env.runtime) {
      return false;
    }
    return true;
  }, [data.useDynamic, env.runtime, ready]);

  return (
    <>
      {display ? (
        <View
          className={textCx}
          style={style}
          onClick={onClick}
          onLongPress={onLongPress}
        >
          {text}
        </View>
      ) : null}
    </>
  );
}
