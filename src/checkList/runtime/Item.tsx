import React, { useState, useCallback, useEffect, useMemo } from "react";
import { View, Image } from "@tarojs/components";
import css from "./item.less";
import cx from "classnames";

export default function (props) {
  const { env, data, inputs, outputs, slots,index } = props;
  const { item, isSelected, onChange } = props;

  let icon = useMemo(() => {
    return isSelected ? item.selectedIcon : item.icon;
  }, [isSelected, item]);

  return (
    <View
      data-index={index}
      className={cx({
        [css.item]: !isSelected,
        "mybricks-item": !isSelected,
        [css.itemSelected]: isSelected,
        "mybricks-item-selected": isSelected,
        ["mybricks-items"]: true
        // [css.vertical]: data.itemLayout === "vertical",
        // [css.horizontal]: data.itemLayout === "horizontal",
      })}
      style={{ 
        ...(data.itemLayoutStyle ?? {}),
        height: data.itemHeight ? data.itemHeight : "auto",
      }}
      onClick={(e) => {
        if (env.edit) {
          return;
        }

        e.stopPropagation();
        onChange(item.value);
      }}
    >
      {/* 图标 */}
      {icon && (
        <Image
          className={cx({
            [css.icon]: true,
            "mybricks-icon": true,
          })}
          src={icon}
        />
      )}

      {/* 文字 */}
      {item.label && (
        <View
          className={cx({
            [css.text]: true,
            "mybricks-text": !isSelected,
            "mybricks-text-selected": isSelected,
          })}
        >
          {item.label}
        </View>
      )}
    </View>
  );
}
