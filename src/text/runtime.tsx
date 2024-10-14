import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { View, Text } from "@tarojs/components";
import cx from "classnames";
import css from "./style.less";
import * as Taro from "@tarojs/taro";

export default function ({ id, env, data, style, inputs, outputs }) {
  const [ready, setReady] = useState(false);
  const [showTooltop, setShowTooltop] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const [timerId, setTimerId] = useState(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [textDefaultWidth, setTextDefaultWidth] = useState(-1);
  const [textDefaultHeight, setTextDefaultHeight] = useState(-1);
  const [displayState, setDisplayState] = useState(data.displayState);

  // 兼容下之前的动态文本开关
  useEffect(() => {
    //老组件打开了动态文本渲染，则默认选中「隐藏」
    if (data.useDynamic) {
      setDisplayState("hidden");
      data.displayState = "hidden";
      data.useDynamic = false;
    }
  }, [data.useDynamic]);

  const displaySkeleton = useMemo(() => {
    if (displayState === "skeleton" && !ready && env.runtime) {
      return true;
    }
    return false;
  }, [displayState, env.runtime, ready]);

  /** TODO 写在useEffect里时序有延迟，容易出现闪屏，先试试这样先 */
  useMemo(() => {
    inputs["value"]((val) => {
      data.text = val;
      setReady(true);
    });

    inputs["getValue"]?.((val, outputRels) => {
      if (!ready && displayState === "hidden" && displayState === "skeleton") {
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

  const SkeletonCx = useMemo(() => {
    return cx({
      [css.skeleton]: displaySkeleton,
    });
  }, [displaySkeleton]);

  const textStyle = useMemo(() => {
    //隐藏文本但是保留占位，撑开骨骼图
    let common: any = {};
    if (displayState === "skeleton" && !ready && env.runtime) {
      common = {
        visibility: "hidden",
      };
    }
    if (displayState === "skeleton" && ready && env.runtime) {
      common = {
        visibility: "visible",
      };
    }
    if (data.ellipsis) {
      return { ...common, WebkitLineClamp: data.maxLines };
    } else {
      return { ...common };
    }
  }, [data.ellipsis, data.maxLines, ready, displayState]);

  const maxLines = useMemo(() => {
    if (data.ellipsis) {
      return { maxLines: data.maxLines };
    } else {
      return {};
    }
  }, [data.ellipsis, data.maxLines]);

  const onClick = useCallback((e) => {
    if (!env.runtime) {
      return;
    }
    // 当配置了单击事件，阻止事件冒泡
    if (outputs["onClick"].getConnections().length) {
      e.stopPropagation();
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
    [data.useLongPress, timerId, id, textRef.current, displaySkeleton]
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
    if (displayState === "hidden" && !ready && env.runtime) {
      return false;
    }
    return true;
  }, [displayState, env.runtime, ready]);

  return (
    <View>
      {display ? (
        <View
          className={textCx}
          onClick={onClick}
          onLongPress={onLongPress}
          onTouchEnd={onTouchEnd}
        >
          {showTooltop && !displaySkeleton ? (
            <View className={css.tooltip} style={tooltipStyle}>
              {text}
            </View>
          ) : null}
          <View className={SkeletonCx}>
            <View ref={textRef} className={ellipsisCx} style={textStyle}>
              {text}
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
}
