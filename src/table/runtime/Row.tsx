import React, { useCallback, useState, useMemo, useEffect } from "react";
import { View } from "@tarojs/components";
import cx from "classnames";
import css from "./row.less";

export default function ({
  record = {},
  index,
  columns = [],
  data,
  env,
  slots,
}) {
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
        style.minWidth = column.minWidth || 90;
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
          style={style}
        >
          {column.type === "text" &&
            (record[column.dataIndex] ?? (env.edit ? column.title : ""))}
          {column.type === "slot" &&
            slots[column.id]?.render({
              inputValues: {
                text: record[column.dataIndex],
                record: record,
                index: index,
              },
            })}
        </View>
      );
    });
  }, [columns, useLeftSticky, useRightSticky]);

  return (
    <View
      className={cx({
        [css.row]: true,
        "mybricks-row": true,
        [css.bordered]: data.bordered,
        ["disabled-area"]: env.edit && index > 0,
      })}
    >
      {$columns}
    </View>
  );
}
