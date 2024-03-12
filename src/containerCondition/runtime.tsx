import React, { useCallback, useMemo, useState } from "react";
import { View } from "@tarojs/components";
import cx from "classnames";
import css from "./style.less";

export default function ({ env, data, slots, inputs, outputs }) {
  const [innputId, setInputId] = useState();

  const activeId = useMemo(() => {
    if (env.edit) {
      return data._editSelectId_ ?? data.items?.[0]?.id
    }
    return innputId
  }, [data.items, data._editSelectId_, innputId]);

  /** TODO 写在useEffect里时序有延迟，容易出现闪屏，先试试这样先 */
  useMemo(() => {

    // 通过setValue来切换条件
    inputs["setValue"]?.((bool, relOutputs) => {
      const item = data.items.find((t) => t.title === bool);
      if (!item) {
        return;
      }
      setInputId(item.id);
      relOutputs["changeDone"]?.(bool);
    });

    //通过连线来切换条件
    data.items.forEach((item) => {
      inputs[item.id]?.((bool, relOutputs) => {
        setInputId(item.id);
        relOutputs["changeDone"]?.(bool);
      });
    })
  }, [data.items]);

  return (
    <View className={css.condition}>
      {data.items.map((item) => {
        if (activeId !== item.id) {
          return null
        }
        return (
          <View className={css.content}>
            {slots[item.id]?.render({})}
          </View>
        );
      })}
    </View>
  );
}
