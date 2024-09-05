import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "@tarojs/components";
import css from "./style.less";
import * as Taro from "@tarojs/taro";
import RichText from "./../components/rich-text";

export default function ({ env, data, inputs, outputs, slots }) {
  const [ready, setReady] = useState(false);
  const [pxDelta, setPxDelta] = useState(1)

  //判断是否是真机运行态
  const isRelEnv = () => {
    if (env.runtime.debug || env.edit || env.edit === null) {
      return false;
    } else {
      return true;
    }
  };

  const calculatePxDelta = (windowWidth) => {
    return windowWidth / 375;
  };

  const handleResize = () => {
    if (isRelEnv()) {
      Taro.getSystemInfo().then((res) => {
        const { windowWidth } = res;
        const initialPxDelta = calculatePxDelta(windowWidth);
        setPxDelta(initialPxDelta);
      });
    } else {
      setPxDelta(1);
    }
  };

  useEffect(() => {
    handleResize()
    Taro.onWindowResize(handleResize);
    return () => {
      Taro.offWindowResize(handleResize);
    };
  }, [env]);


  useEffect(() => {
    inputs["setDataSource"]((val) => {
      data.content = val;

      setReady(true);
    });
  }, []);

  const fixMalformedURI = (str) => {
    try {
      return decodeURIComponent(str);
    } catch (e) {
      return str
        .split("%")
        .map((s, index) => {
          if (index === 0) return s;
          try {
            return decodeURIComponent("%" + s);
          } catch (e) {
            return "%" + s;
          }
        })
        .join("");
    }
  };

  function scalePxValues(richText, scaleFactor) {
    const pxRegex = /(\d+(\.\d+)?)px/g;
    return richText.replace(pxRegex, (match, p1) => {
        const newPxValue = parseFloat(p1) * scaleFactor;
        return `${newPxValue}px`;
    });
}

  const content = useMemo(() => {
    let result;

    try {
      result = decodeURIComponent(fixMalformedURI(data.content));
    } catch (e) {
      result = data.content;
    }

    //遍历所有的图片标签，并将 src 属性覆盖到 alt 属性
    result = result.replace(/<img.*?(?:>|\/>)/gi, (match) => {
      let matchResult = match.match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i);
      let src = matchResult ? matchResult[1] : "";
      return match.replace(/<img/gi, `<img data-sid="${src}"`);
    });
    result = result.replace(
      /<img/gi,
      '<img class style="display: block; width: 100%; height: auto;"'
    );

    result = scalePxValues(result, pxDelta);

    return result;
  }, [data.content,pxDelta]);

  // 处理图片点击事件
  // const handleImageTap = useCallback(
  //   (e) => {
  //     const imageUrls = content
  //       ?.match(/<img.*?src="(.*?)"/g)
  //       .map((item) => item.match(/src="(.*?)"/)[1]);
  //     if (imageUrls.length === 0) return;
  //     Taro.previewImage({
  //       urls: imageUrls,
  //     });
  //   },
  //   [content]
  // );

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
        <View className={css.richtext}>
          <RichText
            className={"taro_html"}
            selectable={"selectable"}
            content={content}
            imageMenuPrevent={false}
            imagePreview
          />
        </View>
      ) : null}
    </>
  );
}
