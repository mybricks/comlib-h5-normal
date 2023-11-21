import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import css from "./style.less";
// import { Button, View } from "@tarojs/components";
import { ButtonType } from "./constant";
import cx from "classnames";
import { View, Text, Image } from "@tarojs/components";

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

  // const btnConfig = useMemo(() => {
  //   switch (true) {
  //     case data.type === ButtonType.Normal: {
  //       return {};
  //     }
  //     case data.type === ButtonType.GetPhoneNumber: {
  //       return {
  //         openType: "getphonenumber",
  //       };
  //     }
  //     default: {
  //       return {};
  //     }
  //   }
  // }, [data.type]);

  const useBeforeIcon = useMemo(() => {
    if (env.edit) {
      return data.useBeforeIcon;
    } else {
      return data.useBeforeIcon && data.beforeIconUrl;
    }
  }, [env, data.useBeforeIcon, data.beforeIconUrl]);

  const useAfterIcon = useMemo(() => {
    if (env.edit) {
      return data.useAfterIcon;
    } else {
      return data.useAfterIcon && data.afterIconUrl;
    }
  }, [env, data.useAfterIcon, data.afterIconUrl]);

  return (
    <View className={cx(css.button, "mybricks-button")} onClick={onClick}>
      {/* 前置 */}
      {useBeforeIcon ? (
        <Image
          className={cx("mybricks-beforeIcon", css.icon)}
          src={data.beforeIconUrl || data.placeholderIconUrl}
          mode="scaleToFill"
        />
      ) : null}

      <Text className={css.text}>{data.text}</Text>

      {/* 后置 */}
      {useAfterIcon ? (
        <Image
          className={cx("mybricks-afterIcon", css.icon)}
          src={data.afterIconUrl || data.placeholderIconUrl}
          mode="scaleToFill"
        />
      ) : null}
    </View>
  );
}
