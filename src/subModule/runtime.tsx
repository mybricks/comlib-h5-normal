import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";

export default function ({ env, data, slots, inputs, outputs }) {
  const [state, setState] = useState(data.defaultState);

  console.error("!!!!!!~~~~~~~ env", env);

  // 组件的渲染状态
  const renderState = useMemo(() => {
    // 运行时，只展示所选的条件状态
    if (env.runtime) {
      return state;
    }

    // 如果组件不在画布中
    if (!isInCanvas) {
      return ""; //所有状态完全展开
    }

    // 如果组件在画布中，并且是搭建态，展示默认状态或第一个状态
    if (isInCanvas) {
      return "collapse";
    }

    // 如果组件在画布中，并且是运行态，展示默认状态或不展示
    return "show";
  }, [state]);

  useMemo(() => {
    // 通过setValue来切换条件
    inputs["switchState"]((val) => {
      const { state, data } = val;
      onSwitchState(state, data);
    });
  }, []);

  const onSwitchState = useCallback((state, data) => {
    setState(state);
  }, []);

  /**
   * 渲染模式
   *
   * 1. 编辑模式
   * 2. 运行模式
   */
  const renderMode = useMemo(() => {
    if (env.runtime) {
      return "runtime";
    } else {
      return "edit";
    }
  }, [env.runtime]);

  /**
   * 卡片状态
   */
  // const items = useMemo(() => {
  //   if (renderMode === "runtime") {
  //     return data.items.filter((item) => item.id === activeId);
  //   } else {
  //     return data.items;
  //   }
  // }, [activeId, data.items, renderMode]);

  const containerCx = useMemo(() => {
    return cx([
      {
        [css.container]: true,
        [css.edit]: renderMode === "edit",
        [css.runtime]: renderMode === "runtime",
      },
    ]);
  }, [renderMode]);

  return (
    <View className={containerCx}>
      <View className={cx([css.condition, "mybricks-condition"])}>
        {slots["condition_1"]?.render({
          inputValues: {
            itemData: "bool",
          },
        })}
      </View>

      <View className={cx([css.condition, "mybricks-condition"])}>
        {slots["condition_2"]?.render({
          inputValues: {
            itemData: "bool",
          },
        })}
      </View>

      <View className={cx([css.condition, "mybricks-condition"])}>
        {slots["condition_3"]?.render({
          inputValues: {
            itemData: "bool",
          },
        })}
      </View>
    </View>
  );

  return (
    <View
      className={cx([
        {
          [css.condition]: true,
          [css.edit]: renderMode === "edit",
          [css.runtime]: renderMode === "runtime",
        },
      ])}
    ></View>
  );
}
