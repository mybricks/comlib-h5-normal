import React, { useCallback, useState, useMemo, useEffect } from "react";
import { View } from "@tarojs/components";
import cx from "classnames";
import css from "./head.less";

export default function ({ columns = [] }) {
  const $columns = useMemo(() => {
    return columns.map((column, index) => {
      let style = {};

      if (column.autoWidth) {
        style.flex = 1;
        style.minWidth = column.minWidth || 90;
      } else {
        style.width = +column.width;
      }

      return (
        <View
          data-id={column._id}
          className={cx({
            [css.td]: true,
            "mybricks-td": true,
            [css.leftSticky]: column.sticky === "left" || index === 0,
            [css.rightSticky]:
              column.sticky === "right" || index === columns.length - 1,
            [css.leftStickyShadow]: column.sticky === "left" || index === 0,
            [css.rightStickyShadow]:
              column.sticky === "right" || index === columns.length - 1,
          })}
          style={style}
        >
          {column.title}
        </View>
      );
    });
  }, [columns]);

  return <View className={cx(css.thead, css.sticky)}>{$columns}</View>;
}
