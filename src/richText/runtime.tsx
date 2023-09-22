import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, RichText } from "@tarojs/components";
import css from "./style.less";
import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs, slots }) {

  useEffect(() => {
    inputs["setDataSource"]((val) => {
      data.content = val;
    });
  }, []);

  const content = useMemo(() => {
    let result = decodeURIComponent(data.content);
    //遍历所有的图片标签，并将 src 属性覆盖到 alt 属性
    result = result.replace(/<img.*?(?:>|\/>)/gi, (match) => {
      let matchResult = match.match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i);
      let src = matchResult ? matchResult[1] : "";
      return match.replace(/<img/gi, `<img data-sid="${src}"`);
    });
    result = result.replace(/<img/gi, '<img class style="display: block; width: 100%; height: auto;"');
    return result;
  }, [data.content]);

  // 处理图片点击事件
  const handleImageTap = useCallback((e) => {
    console.warn(e);

    const imageUrls = content?.match(/<img.*?src="(.*?)"/g).map((item) => item.match(/src="(.*?)"/)[1]);

    if (imageUrls.length === 0) return;

    Taro.previewImage({
      urls: imageUrls,
    });
  }, [content])

  return (
    <View className={css.richtext}>
      <RichText className={"taro_html"} nodes={content} selectable={"selectable"} preview={"preview"} space={"nbsp"}/>
    </View>
  );
}
