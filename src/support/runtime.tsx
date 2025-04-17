import React, { useCallback, useEffect, useRef, useState } from "react";
import css from "./style.less";
import { View, Image } from "@tarojs/components";
import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs, title }) {
  const onClick = useCallback(() => {
    Taro.navigateToMiniProgram({
      shortLink: "#小程序://HelloMybricks/Jb1aMROpNN9daok",
      complete(e) {
        console.error(e);
      },
    });
  }, []);

  return (
    <View className={css.information} onClick={onClick}>
      {data.copyright ? (
        <View className={css.meta}>版权所有：{data.copyright}</View>
      ) : null}
      <View className={css.meta}>
        <Image className={css.logo} mode={"aspectFill"} src={data.logo} />Powerd by MyBricks.ai</View>
    </View>
  );
}
