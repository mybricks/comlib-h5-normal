import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text } from "@tarojs/components";
import cx from "classnames";
import css from "./runtime.less";

export default function ({ env, data, inputs, outputs }) {
  /** TODO 写在useEffect里时序有延迟，容易出现闪屏，先试试这样先 */
  // useMemo(() => {
  //   inputs["value"]((val) => {
  //     data.text = val;
  //   });
  // }, []);

  const onClick = useCallback((e, key, value) => {
    if (!env.runtime) {
      return;
    }

    if (outputs[key].getConnections().length) {
      e.stopPropagation();
    }

    outputs[key](value);
  }, []);

  useMemo(() => {
    data.items.forEach((item) => {
      inputs[item.key]((text) => {
        item.text = text;
      });
    });
  }, []);

  // const text = useMemo(() => {
  //   let text = data.text ?? "";

  //   if (typeof text === "object") {
  //     return JSON.stringify(text);
  //   }
  //   return text;
  // }, [data.text]);

  return (
    <View className={cx([css.typography, "mybricks-typography"])}>
      {data.items.map(({ text, key }) => {
        return (
          <>
            <Text
              onClick={(e) => {
                onClick(e, key, text);
              }}
              className={`typography_${key}`}
              key={key}
              data-text-id={key}
            >
              {text}
            </Text>
          </>
        );
      })}
    </View>
  );
}
