import React, { useMemo, useState, useRef, useEffect } from "react";
import { View, ScrollView } from "@tarojs/components";
import css from "./runtime.less";
import cx from "classnames";
import useFormItemValue from "../utils/hooks/useFormItemValue.ts";
import { isObject, isString, isNumber, isEmpty } from "./../utils/type";

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

  const [scrollTop, setScrollTop] = useState(0);
  const itemHeight = 44; // 每个选项的高度
  const visibleItems = 5; // 可见的选项数量
  const middleIndex = Math.floor(visibleItems / 2); // 中间选项的索引
  const scrollViewRef = useRef(null);

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
      const newScrollTop = index * itemHeight;

      setScrollTop(newScrollTop);
      setTimeout(() => {
        scrollViewRef.current.scrollTo({ top: newScrollTop });
      }, 20);

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
          const newScrollTop = index * itemHeight;

          setScrollTop(newScrollTop);
          setTimeout(() => {
            scrollViewRef.current.scrollTo({ top: newScrollTop });
          }, 20);
        } else {
          // 如果没有选中的项，则设置第一个为选中项
          setValue(data.options[0]?.value);
        }
      }
    });
  }, [data.options, setScrollTop, setValue]);

  const handleScroll = (e) => {
    setScrollTop(e.detail.scrollTop);
  };

  const handleScrollEnd = () => {
    const index = Math.round(scrollTop / itemHeight);
    const newScrollTop = index * itemHeight;
    setScrollTop(newScrollTop);
    scrollViewRef.current.scrollTo({ top: newScrollTop, behavior: "smooth" });

    // 修改 value
    setValue(data.options[index]?.value);
  };

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
      return [{}, {}, ...result, {}, {}];
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
          scrollY
          className={css.scrollView}
          onScroll={handleScroll}
          onScrollEnd={handleScrollEnd}
          onScrollToLower={handleScrollEnd}
          onScrollToUpper={handleScrollEnd}
        >
          {options.map((option, index) => {
            const offsetIndex = Math.abs(
              index - Math.round(scrollTop / itemHeight)
            );
            let className = css.option;
            if (offsetIndex === middleIndex) {
              className = cx(css.option, css.selected);
            } else if (
              offsetIndex === middleIndex - 1 ||
              offsetIndex === middleIndex + 1
            ) {
              className = cx(css.option, css.nearSelected);
            } else if (
              offsetIndex === middleIndex - 2 ||
              offsetIndex === middleIndex + 2
            ) {
              className = cx(css.option, css.farSelected);
            }
            return (
              <View
                key={index}
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
