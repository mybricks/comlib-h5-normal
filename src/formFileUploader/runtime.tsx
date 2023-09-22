import React, { useState, useCallback, useMemo } from "react";
import { Input, View, Button, Textarea } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";

export default function ({ env, data, inputs, outputs, slots }) {

  const [line, setLine] = useState(1);


  const onLineChange = useCallback((e) => {
    const { height, heightRpx, lineHeight, lineCount } = e.detail;
    console.log(e);
    console.log(height, heightRpx, lineHeight, lineCount);
    setLine(lineCount);
  }, []);

  return (
    <View className={css.formField} style={{ ...data.formFieldStyle }}>

      <View className={css.label}>{data.label}</View>

      <View className={css.value}>
        {/* <Textarea
          className={css.textarea}
          style={{ ...textareaStyle }}
          name={data.name}
          placeholder={data.placeholder}
          onInput={onLineChange}
          showCount={"true"}
        ></Textarea> */}

        <Input
          // value={"卡拉的咖啡机副科级地方卡的饭卡放假啊放假啊饭卡饭卡都是卡空间发到空间发"}
          className={css.input}
          placeholderClass={css.placeholder}
          name={data.name}
          type={data.type}
          password={data.password}
          placeholder={data.placeholder}
        />
      </View>

    </View>
  );
}
