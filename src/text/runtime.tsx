import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text } from "@tarojs/components";
import cx from "classnames";
import css from "./style.less";
import * as Taro from "@tarojs/taro";

export default function ({ id, env, data, style, inputs, outputs }) {
  const [ready, setReady] = useState(false);
  const [showTooltop, setShowTooltop] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const [timerId, setTimerId] = useState(null);
  const textRef = React.useRef(null);

  /** TODO 写在useEffect里时序有延迟，容易出现闪屏，先试试这样先 */
  useMemo(() => {
    inputs["value"]((val) => {
      data.text = val;
      setReady(true);
    });

    inputs["getValue"]?.((val, outputRels) => {
      if (!ready && data.useDynamic) {
        outputRels["onGetValue"]("");
      } else {
        outputRels["onGetValue"](data.text);
      }
    });
  }, [ready]);

  const textCx = useMemo(() => {
    return cx({
      [css.text]: true,
      ["mybricks-text"]: true,
      [id]: true,
    });
  }, [id, data.ellipsis]);

  const ellipsisCx = useMemo(() => {
    return cx({
      [css["ellipsis-line"]]: !!data.ellipsis,
    });
  }, [data.ellipsis]);

  const style = useMemo(() => {
    if (data.ellipsis) {
      return { WebkitLineClamp: data.maxLines };
    } else {
      return {};
    }
  }, [data.ellipsis, data.maxLines]);

  const maxLines = useMemo(() => {
    if (data.ellipsis) {
      return { maxLines: data.maxLines };
    } else {
      return {};
    }
  }, [data.ellipsis, data.maxLines]);

  const onClick = useCallback(() => {
    if (!env.runtime) {
      return;
    }

    outputs["onClick"](data.text);
  }, []);

  const onLongPress = useCallback(
    (e) => {
      if (!env.runtime) {
        return;
      }

      switch (data.useLongPress) {
        case "tooltip":
          // 长按提示 tooltip，松开手指后消失
          clearTimeout(timerId);
          // 动态获取 textRef 的位置

          if (
            Taro.getEnv() === Taro.ENV_TYPE.WEB ||
            Taro.getEnv() === "Unknown"
          ) {
            let rect = textRef.current.getBoundingClientRect();
            setTooltipStyle({
              width: rect.width,
              top: rect.top - 10,
              left: rect.left + rect.width / 2,
            });

            setShowTooltop(true);
          } else {
            let ratio = Taro.getSystemInfoSync().windowWidth / 375;

            const query = Taro.createSelectorQuery();
            query.selectAll(`.${id}`).boundingClientRect();

            query.exec((res) => {
              let targetReat = res[0].filter((item) => {
                return (
                  item.left <= e.currentTarget.x &&
                  item.right >= e.currentTarget.x &&
                  item.top <= e.currentTarget.y &&
                  item.bottom >= e.currentTarget.y
                );
              });

              setTooltipStyle({
                width: targetReat[0].width / ratio,
                top: targetReat[0].top / ratio - 10,
                left:
                  targetReat[0].left / ratio + targetReat[0].width / ratio / 2,
              });

              setShowTooltop(true);
            });
          }

          break;
        case "custom":
          outputs["onLongPress"](data.text);
          break;

        default:
          break;
      }
    },
    [data.useLongPress, timerId, id, textRef.current]
  );

  const onTouchEnd = useCallback(() => {
    let id = setTimeout(() => {
      setShowTooltop(false);
    }, 500);

    setTimerId(id);
  }, []);

  const text = useMemo(() => {
    let text = data.text ?? "";

    if (typeof text === "object") {
      return JSON.stringify(text);
    }

    return text;
  }, [data.text]);

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
        <View
          className={textCx}
          onClick={onClick}
          onLongPress={onLongPress}
          onTouchEnd={onTouchEnd}
        >
          {showTooltop ? (
            <View className={css.tooltip} style={tooltipStyle}>
              {text}
            </View>
          ) : null}
          <View ref={textRef} className={ellipsisCx} style={style}>
            {text}
          </View>
        </View>
      ) : null}
    </>
  );
}
