import React, {
  useCallback,
  useEffect,
  useRef,
  useMemo,
  useState,
} from "react";
import css from "./../style.less";
import cx from "classnames";
import { View, SkeletonImage } from './../../components-h5'

export default function ({ env, data, inputs, outputs, title, style }) {
  const ele = useRef(null)
  const [h5PolyfillClass, setH5PolyfillClass]  = useState(css[''])

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
    outputs["onLoad"]();
  }, []);

  const onClick = useCallback(() => {
    if (!env.runtime) {
      return;
    }
    outputs["onClick"]();
  }, []);

  const onError = useCallback(() => {
    if (!env.runtime) {
      return;
    }
    outputs["onError"]();
  }, []);

  return (
    <View className={css.com} ref={ele}>
      <SkeletonImage
        useHtml={env.edit}
        skeleton={env.edit ? false : !!data?.loadSmooth}
        className={cx(css.image, h5PolyfillClass, "mybricks-image")}
        src={data.src}
        mode={data.mode}
        onClick={onClick}
        onLoad={onLoad}
        onError={onError}
        showMenuByLongpress={data.showMenuByLongpress ?? false}
      />
    </View>
  );
}
