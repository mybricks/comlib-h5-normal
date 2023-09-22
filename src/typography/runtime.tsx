import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text } from "@tarojs/components";

export default function ({ env, data, inputs, outputs }) {
  /** TODO 写在useEffect里时序有延迟，容易出现闪屏，先试试这样先 */
  // useMemo(() => {
  //   inputs["value"]((val) => {
  //     data.text = val;
  //   });
  // }, []);

  const onClick = useCallback((ev) => {
    // if (!env.runtime) {
    //   return;
    // }
    // ev?.stopPropagation?.();
    // outputs["onClick"]({ text: data.text });
  }, []);


  useMemo(() => {
    data.items.forEach(item => {
      inputs[item.key]((text) => {
        item.text = text
      })
    })
  }, [])

  // const text = useMemo(() => {
  //   let text = data.text ?? "";

  //   if (typeof text === "object") {
  //     return JSON.stringify(text);
  //   }
  //   return text;
  // }, [data.text]);
 
  return (
    <View>
      {data.items.map(({ text, key }) => {
        return <Text onClick={onClick} className={`typography_${key}`} key={key} data-text-id={key}>{text}</Text>;
      })}
    </View>
  );
}
