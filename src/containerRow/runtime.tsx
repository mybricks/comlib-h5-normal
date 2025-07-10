import React, { useCallback } from "react";
import { View } from "@tarojs/components";
import cx from "classnames";
import css from "./style.less";

export default function ({ env, data, slots, inputs, outputs }) {
  return (
    <View
      style={{
        ...(data.slotStyle ?? {}),
        display: 'flex',
      }}
    >
      {data.items.map((item, index) => {
        // const style = {
        //   ...item.slotStyle,
        // }

        const widthLayout: any = {} 

        if (item.widthMode === 'auto') {
          widthLayout.flex = 1
        } else if (item.widthMode === 'fit-content') {
          widthLayout.width = 'fit-content'
        } else if (item.widthMode === 'number') {
          // widthLayout.width = item.width
        } else if (item.widthMode === 'percent') {
          widthLayout.width = `${item.width}%`
        }

        const slotStyle = {
          // ...style,
          width: item.widthMode === 'fit-content' ? 'fit-content' : '100%'
        }

        return (
          <View
            className={cx(css.item, "mybricks-item")}
            style={widthLayout}
            key={item.id}
          >
            {slots[item.id]?.render({
              style: slotStyle,
            })}
          </View>
        );
      })}
    </View>
  );
}
