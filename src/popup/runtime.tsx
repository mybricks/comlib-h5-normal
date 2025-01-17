import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "@tarojs/components";
import cx from "classnames";
import css from "./style.less";
import { isEdit, isDesigner } from "../utils/env";

export default function ({
  env,
  _env,
  data,
  inputs,
  outputs,
  slots,
  createPortal,
}) {
  const [show, setShow] = useState(env.edit ? true : false);

  const handleClose = useCallback(() => {
    _env?.currentScenes?.close?.();
    outputs?.["onClose"]?.();
    // setShow(false);
  }, [_env]);

  /** setup */
  useEffect(() => {
    // inputs["onShow"]?.(() => {
    //   setShow(true);
    // });
    // inputs["onHide"]?.(() => {
    //   setShow(false);
    // });

    return () => {
      // 销毁，但没有事件
      _env?.currentScenes?.close?.();
    };
  }, []);

  const popupCx = useMemo(() => {
    return cx({
      [css.popup]: true,
      [css.show]: true,
      // [css.show]: show,
      // [css.edit]: env.edit,
    });
  }, [show, env.edit]);

  const mainCx = useMemo(() => {
    return cx({
      [css.main]: true,
      [css.center]: data.position === "center",
      [css.top]: data.position === "top",
      [css.bottom]: data.position === "bottom",
      [css.left]: data.position === "left",
      [css.right]: data.position === "right",
      [css.empty]: slots["content"]?.size === 0,
    });
  }, [data.position, slots["content"]?.size]);

  const handleOverlayClick = useCallback(() => {
    if (data.maskClose) {
      _env?.currentScenes?.close?.();
      outputs?.["onClickOverlay"]?.();
    }
    // outputs?.['onClickOverlay']?.(true);
  }, [_env, data.maskClose]);

  const isInEdit = isEdit(env);
  const isInDesignerRuntime = isDesigner(env);

  /** hack style 设计器下面一些需要hack的样式 */
  const popupStyle = useMemo(() => {
    // if (isInDesignerRuntime) { // 在设计器里模拟不超过小程序header的效果
    //   return {
    //     position: 'absolute'
    //   }
    // }

    // return {};

    if (isInEdit) {
      /** 新场景需要一个宽高 */
      return {
        width: 375,
        height: 667,
        position: "relative",
      };
    }
    if (isInDesignerRuntime) {
      /** 设计器runtime时需要fixed会相对于更上层的元素 */
      return {
        // position: 'absolute',
        width: 375,
      };
    }
    return {};
  }, [isInEdit, isInDesignerRuntime]);

  let popupView = (
    <View className={popupCx} style={{ ...popupStyle }}>
      <View
        className={`${css.overlay} mybricks-overlay`}
        onClick={handleOverlayClick}
      ></View>
      <View className={mainCx}>
        <View
          className={cx({
            [css.content]: true,
            "mybricks-content": true,
          })}
        >
          {slots["content"]?.render?.({
            style: {
              ...(data.layout || {}),
            },
          })}
        </View>
        {data.position === "center" && data.visibleClose && (
          <View
            className={cx({
              [css.close]: true,
              "mybricks-close": true,
            })}
            onClick={handleClose}
          ></View>
        )}
      </View>
    </View>
  );

  return popupView;
}
