import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";

export default function ({ env, data, slots, inputs, outputs }) {
  const [innputId, setInputId] = useState(data.defaultActiveId);
  const [bool, setBool] = useState();

  const activeId = useMemo(() => {
    if (env.edit) {
      return data._editSelectId_ ?? data.items?.[0]?.id;
    }
    return innputId;
  }, [data.items, data._editSelectId_, innputId]);

  console.error("activeId", activeId);

  /** TODO 写在useEffect里时序有延迟，容易出现闪屏，先试试这样先 */
  useMemo(() => {
    // 通过setValue来切换条件
    inputs["setValue"]?.((bool, relOutputs) => {
      const item = data.items.find((t) => t.title === bool);
      if (!item) {
        return;
      }
      setInputId(item.id);
      setBool(bool);
      relOutputs["setValueDone"]?.(bool);
    });

    //通过连线来切换条件
    data.items.forEach((item) => {
      inputs[item.id]?.((bool, relOutputs) => {
        setInputId(item.id);
        setBool(bool);
        relOutputs["changeDone"]?.(bool);
      });
    });
  }, [data.items]);

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
  const items = useMemo(() => {
    if (renderMode === "runtime") {
      return data.items.filter((item) => item.id === activeId);
    } else {
      return data.items;
    }
  }, [activeId, data.items, renderMode]);

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
            itemData: bool,
          },
        })}
      </View>

      <View className={cx([css.condition, "mybricks-condition"])}>
        {slots["condition_2"]?.render({
          inputValues: {
            itemData: bool,
          },
        })}
      </View>

      <View className={cx([css.condition, "mybricks-condition"])}>
        {slots["condition_3"]?.render({
          inputValues: {
            itemData: bool,
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
    >
      {items.map((item) => {
        return (
          <View
            className={cx([css.condition, "mybricks-condition"])}
            key={item.id}
            data-id={item.id}
          >
            {slots[item.id]?.render({
              inputValues: {
                itemData: bool,
              },
            })}
          </View>
        );
      })}
    </View>
  );
}
