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
        const style = {
          ...item.slotStyle,
        }
        if (item.widthMode === 'auto') {
          style.flex = 1
        } else if (item.widthMode === 'fit-content') {
          style.width = 'fit-content'
        } else if (item.widthMode === 'number') {
          style.width = item.width
        } else if (item.widthMode === 'percent') {
          style.width = `${item.width}%`
        }

        const slotStyle = {
          ...style,
          width: style.width === 'fit-content' ? 'fit-content' : '100%'
        }

        return (
          <View
            className={cx(css.item, "mybricks-item")}
            style={style}
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
