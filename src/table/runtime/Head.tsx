import React, { useCallback, useState, useMemo, useEffect } from "react";
import { View } from "@tarojs/components";
import cx from "classnames";
import css from "./head.less";

export default function ({ columns = [], data }) {
  //
  const useLeftSticky = useMemo(() => {
    if (data.columns.length > 1) {
      return data.useLeftSticky;
    }
    return false;
  }, [data.useLeftSticky, data.columns]);

  //
  const useRightSticky = useMemo(() => {
    if (data.columns.length > 1) {
      return data.useRightSticky;
    }
    return false;
  }, [data.useRightSticky, data.columns]);

  //
  const $columns = useMemo(() => {
    return columns.map((column, index) => {
      let style = {};

      if (column.autoWidth) {
        style.flex = 1;
        style.minWidth = +column.minWidth;
      } else {
        style.width = +column.width;
      }

      return (
        <View
          data-id={column._id}
          className={cx({
            [css.col]: true,
            "mybricks-col": true,
            [css.leftSticky]: useLeftSticky && index === 0,
            [css.rightSticky]: useRightSticky && index === columns.length - 1,
          })}
          style={{...style,backgroundColor:column.bgColor}}
        >
          {column.title}
        </View>
      );
    });
  }, [columns, useLeftSticky, useRightSticky]);

  return (
    <View
      className={cx({
        [css.thead]: true,
        "mybricks-thead": true,
        [css.sticky]: true,
        [css.bordered]: data.bordered,
      })}
    >
      {$columns}
    </View>
  );
}
