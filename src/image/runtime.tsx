import React, {
  useCallback,
  useEffect,
  useRef,
  useMemo,
  useState,
} from "react";
import css from "./style.less";
import cx from "classnames";
import { View, Image } from "@tarojs/components";
import SkeletonImage from "./../components/skeleton-image";
import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs, title, style, extra }) {
  const ele = useRef(null);
  const [h5PolyfillClass, setH5PolyfillClass] = useState(
    css["h5-polyfill-aspectfill-width"]
  );

  useEffect(() => {
    if (data.mode !== "aspectFill") {
      return;
    }
    if (!ele.current && !ele.current.getBoundingClientRect) {
      return;
    }
    const { width, height } = ele.current.getBoundingClientRect?.() ?? {};
    setH5PolyfillClass(
      width > height
        ? css["h5-polyfill-aspectfill-width"]
        : css["h5-polyfill-aspectfill-height"]
    );
  }, [style.width, style.height, data.mode]);

  /** TODO 写在useEffect里时序有延迟，容易出现闪屏，先试试这样先 */
  useMemo(() => {
    inputs["setSrc"]((src) => {
      data.src = src;
    });
  }, []);

  const onLoad = useCallback(() => {
    if (!env.runtim) {
      return;
    }
    outputs["onLoad"](data.src);
  }, []);

  const onClick = useCallback(() => {
    if (!env.runtime) {
      return;
    }

    if (data.clickType === "previewImage") {
      Taro.previewImage({
        urls: [data.src],
        current: data.src,
      });
      return;
    }

    outputs["onClick"](data.src);
  }, [data.clickType, data.src]);

  const onError = useCallback(() => {
    if (!env.runtime) {
      return;
    }
    outputs["onError"](data.src);
  }, []);

  return (
    <View className={css.com} ref={ele}>
      <SkeletonImage
        skeleton={env.edit ? false : !!data?.loadSmooth}
        className={cx(css.image, h5PolyfillClass, "mybricks-image")}
        src={
          !!data.src ? data.src : extra?.imageUrl
        }
        mode={data.mode}
        onClick={onClick}
        onLoad={onLoad}
        onError={onError}
        showMenuByLongpress={data.showMenuByLongpress ?? false}  
        
        cdnCut="auto"
        cdnCutOption={{ width: style.width, height: style.height }}
      />
    </View>
  );
}
