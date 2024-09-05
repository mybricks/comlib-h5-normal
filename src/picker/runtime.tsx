import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { View, ScrollView } from "@tarojs/components";
import css from "./runtime.less";
import cx from "classnames";
import useFormItemValue from "../utils/hooks/useFormItemValue.ts";
import { isObject, isString, isNumber, isEmpty } from "./../utils/type";
import { isH5, isDesigner } from "../utils/env";
import * as Taro from "@tarojs/taro";

function getRandomNumber() {
  return Number(Math.random() * 0.1 + 0.01);
}

export default function (props) {
  const { env, data, inputs, outputs, slots } = props;

  const defaultValue = useMemo(() => {
    if (env.edit) {
      return data.options[0]?.value;
    }
    return data.defaultRenderMode === "static"
      ? data.options[0]?.value ?? ""
      : "";
  }, [env.edit, data.options, data.defaultValue, data.defaultRenderMode]);

  const [value, setValue, getValue] = useFormItemValue(defaultValue, (val) => {
    //
    outputs["onChange"](val);
  });

  const [ready, setReady] = useState(data.defaultRenderMode === "static");

  const [isTouching, setIsTouching] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const [scrollTop, setScrollTop] = useState(0);
  const scrollTopRef = useRef(0);

  const itemHeight = 44; // 每个选项的高度
  const visibleItems = 5; // 可见的选项数量
  const middleIndex = Math.floor(visibleItems / 2); // 中间选项的索引
  const scrollViewRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const pauseHandleScrollEndRef = useRef(null);

  // 计算实际的 itemHeight
  const realItemHeight = useMemo(() => {
    const windowWidth = isDesigner(env)
      ? 375
      : Taro.getSystemInfoSync().windowWidth;
    let ratio = windowWidth / 375;
    return parseInt(itemHeight * ratio);
  }, [itemHeight]);

  useEffect(() => {
    /* 设置值 */
    inputs["setValue"]((val, outputRels) => {
      let result;

      switch (true) {
        case isEmpty(val): {
          result = "";
          break;
        }
        case isString(val) || isNumber(val):
          result = `${val}`;
          break;
        default:
          // 其他类型的值，直接返回
          return;
      }

      // 这里需要将列表滚动到指定的位置
      const index = data.options.findIndex((option) => option.value === result);
      if (index === -1) {
        return;
      }
      const newScrollTop = index * newItemHeight;

      pauseHandleScrollEndRef.current = true;
      scrollTopRef.current = newScrollTop;
      setScrollTop(newScrollTop + getRandomNumber());
      Taro.nextTick(() => {
        pauseHandleScrollEndRef.current = false;
      });

      setValue(result);
      outputRels["setValueComplete"]?.(result);
    });

    /* 获取值 */
    inputs["getValue"]((val, outputRels) => {
      outputRels["returnValue"](getValue());
    });

    /* 设置数据源 */
    inputs["setOptions"]((val) => {
      if (Array.isArray(val)) {
        data.options = val;
        setReady(true);

        // 如果选项中有 checked 为 true 的项，则设置为当前值
        let lastCheckedItem = val.findLast((item) => item.checked);
        if (lastCheckedItem) {
          setValue(lastCheckedItem.value);

          // 这里需要将列表滚动到指定的位置
          const index = data.options.findIndex(
            (option) => option.value === lastCheckedItem.value
          );
          if (index === -1) {
            return;
          }

          setTimeout(() => {
            const newScrollTop = index * realItemHeight;

            pauseHandleScrollEndRef.current = true;
            scrollTopRef.current = newScrollTop;
            setScrollTop(newScrollTop + getRandomNumber());
            Taro.nextTick(() => {
              pauseHandleScrollEndRef.current = false;
            });
          }, 0);
        } else {
          // 如果没有选中的项，则设置第一个为选中项
          setValue(data.options[0]?.value);
        }
      }
    });
  }, [data.options, setValue]);

  const handleScroll = (e) => {
    //
    if (pauseHandleScrollEndRef.current) return;

    scrollTopRef.current = e.detail.scrollTop;

    console.warn("onScroll");
    setIsScrolling(true); // 标记滚动状态

    // 清除之前的 timeout
    console.log("clearTimeout", scrollTimeoutRef.current);
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // 设置新的 timeout
    scrollTimeoutRef.current = setTimeout(() => {
      console.warn("stopScroll");
      setIsScrolling(false); // 清除滚动状态
    }, 200);
  };

  const handleScrollEnd = () => {
    const index = Math.round(scrollTopRef.current / realItemHeight);
    const newScrollTop = index * realItemHeight;

    pauseHandleScrollEndRef.current = true;
    scrollTopRef.current = newScrollTop;
    setScrollTop(newScrollTop + getRandomNumber());
    Taro.nextTick(() => {
      pauseHandleScrollEndRef.current = false;
    });

    // 修改 value
    setValue(data.options[index]?.value);
  };

  const handleTouchStart = useCallback(() => {
    setIsTouching(true); // 标记触摸状态
  }, []);

  const handleTouchEnd = useCallback(() => {
    console.warn("handleTouchEnd");

    setTimeout(() => {
      setIsTouching(false); // 清除触摸状态
    }, 200);
  }, []);

  useEffect(() => {
    if (!isScrolling && !isTouching) {
      Taro.nextTick(() => {
        handleScrollEnd();
      });
    }
  }, [isScrolling, isTouching]);

  const handleCancel = () => {
    // 处理取消操作
    outputs["onCancel"]();
  };

  const handleConfirm = (e) => {
    // 处理确认操作
    e.stopPropagation();
    outputs["onConfirm"](value);
  };

  const options = useMemo(() => {
    let result = [];
    if (env.edit) {
      result = data.options;
    } else {
      result = ready ? data.options : [];
    }

    if (result.length) {
      return [
        { value: Math.random() },
        { value: Math.random() },
        ...result,
        { value: Math.random() },
        { value: Math.random() },
      ];
    } else {
      return [];
    }
  }, [env.edit, ready, data.options]);

  return (
    <View className={css.picker}>
      {/* header */}
      <View className={css.header}>
        <View
          className={cx([css.cancel, "mybricks-cancel"])}
          onClick={handleCancel}
        >
          {data.cancelText}
        </View>
        <View className={cx([css.title, "mybricks-title"])}>{data.title}</View>
        <View
          className={cx([css.confirm, "mybricks-confirm"])}
          onClick={handleConfirm}
        >
          {data.confirmText}
        </View>
      </View>

      {/* content */}
      <View className={css.content}>
        <ScrollView
          ref={scrollViewRef}
          className={css.scrollView}
          scrollY
          enhanced={true}
          showScrollbar={false}
          enablePassive={true}
          scrollTop={scrollTop}
          onScroll={handleScroll}
          // onScrollEnd={handleScrollEnd}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          // onScrollToLower={handleScrollEnd}
          // onScrollToUpper={handleScrollEnd}
        >
          {options.map((option, index) => {
            const offsetIndex = Math.abs(
              index - Math.round(scrollTopRef.current / realItemHeight)
            );

            let className = css.option;
            if (offsetIndex === middleIndex) {
              className = cx(css.option, css.selected);
            } else if (
              offsetIndex === middleIndex - 1 ||
              offsetIndex === middleIndex + 1
            ) {
              className = cx(css.option, css.nearSelected);
            } else {
              className = cx(css.option, css.farSelected);
            }
            return (
              <View
                key={option.value + "_" + index}
                className={className}
                style={{ height: `${itemHeight}px` }}
              >
                {option.label ?? ""}
              </View>
            );
          })}
        </ScrollView>

        <View
          className={cx([css.centerIndicator, "mybricks-centerIndicator"])}
        ></View>
      </View>
    </View>
  );
}
