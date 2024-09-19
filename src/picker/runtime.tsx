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
  const { id, env, data, inputs, outputs, slots } = props;

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

  const isTouching = useRef(false);
  const isScrolling = useRef(false);

  const [scrollToProps, setScrollToProps] = useState({
    scrollWithAnimation: false,
    scrollAnimationDuration: 0,
    scrollTop: 0,
  });

  const scrollTopRef = useRef(0);

  const itemHeight = 44; // 每个选项的高度

  const scrollTimeoutRef = useRef(null);
  const pauseHandleScrollEndRef = useRef(null);

  // 计算实际的 itemHeight
  const realItemHeight = useMemo(() => {
    const windowWidth = isDesigner(env)
      ? 375
      : Taro.getSystemInfoSync().windowWidth;
    let ratio = windowWidth / 375;
    return Number(itemHeight * ratio);
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
      const newScrollTop = index * realItemHeight;

      let randomNumber = getRandomNumber();
      scrollTopRef.current = newScrollTop + randomNumber;
      setScrollToProps((c) => ({
        ...c,
        scrollTop: newScrollTop + randomNumber,
      }));

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
        let checkedValue = val.filter((item) => {
          return item.checked;
        });
        let lastCheckedItem = checkedValue[checkedValue.length - 1];

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

            let randomNumber = getRandomNumber();
            scrollTopRef.current = newScrollTop + randomNumber;
            setScrollToProps((c) => ({
              ...c,
              scrollTop: newScrollTop + randomNumber,
            }));
          }, 0);
        } else {
          // 如果没有选中的项，则设置第一个为选中项
          setValue(data.options[0]?.value);
        }
      }
    });

    // 设置标题
    inputs["setTitle"]((val) => {
      data.title = val;
    });
  }, [data.options, setValue]);

  const handleTouchStart = () => {
    isTouching.current = true;
  };

  const handleTouchEnd = () => {
    console.error("触摸结束");
    isTouching.current = false;

    if (!isScrolling.current) {
      handleScrollEnd();
    }
  };

  /**
   * 处理滚动
   */
  const handleScroll = (e) => {
    console.log(
      "触发滚动",
      `当前值：${scrollTopRef.current}`,
      `目标值：${e.detail.scrollTop}`
    );

    isScrolling.current = true;

    scrollTopRef.current = e.detail.scrollTop + getRandomNumber();

    clearTimeout(scrollTimeoutRef.current);

    scrollTimeoutRef.current = setTimeout(() => {
      console.error("滚动结束");
      isScrolling.current = false;

      if (isTouching.current) {
        console.warn("正在触摸中，不处理滚动结束");
        return;
      }
      handleScrollEnd();
    }, 100);
  };

  const handleScrollEnd = () => {
    // 如果已经在处理滚动结束，则不处理
    if (pauseHandleScrollEndRef.current) {
      console.log("[handleScrollEnd]", "已经在处理滚动结束，则不处理");
      return;
    }
    pauseHandleScrollEndRef.current = true;

    const index = Math.round(scrollTopRef.current / realItemHeight);
    const newScrollTop = index * realItemHeight;

    // 修改 scrollTop
    scrollTopRef.current = newScrollTop + getRandomNumber();

    // 修改 value
    setValue(data.options[index]?.value);

    setTimeout(() => {
      console.log("[handleScrollEnd]", "结束处理");
      pauseHandleScrollEndRef.current = false;
    }, 0);
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
        <View
          className={cx([css.centerIndicator, "mybricks-centerIndicator"])}
        ></View>

        <ScrollView
          key={id}
          className={css.scrollView}
          scrollY
          enhanced={true}
          enablePassive={true}
          showScrollbar={false}
          // {...scrollToProps}
          scrollWithAnimation={false}
          scrollAnimationDuration={0}
          scrollTop={scrollTopRef.current}
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
            if (offsetIndex === 2) {
              className = cx(css.option, css.selected);
            } else if (offsetIndex === 1 || offsetIndex === 3) {
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
      </View>
    </View>
  );
}
