import React, { useCallback, useState, useMemo, useEffect } from "react";
import { View } from "@tarojs/components";
import cx from "classnames";
import css from "./row.less";
import text from "src/components-h5/text";

export default function ({
  record = {},
  index,
  columns = [],
  data,
  env,
  slots,
  outputs = {},
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

  const onClick = useCallback((params) => {
    outputs["onClickRow"]({ ...params });
  }, []);

  //
  const $columns = useMemo(() => {
    return columns.map((column, idx) => {
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
            [css.leftSticky]: useLeftSticky && idx === 0,
            [css.rightSticky]: useRightSticky && idx === columns.length - 1,
          })}
          style={style}
          onClick={(e) => {
            if (!env.runtime) {
              return;
            }
            e.stopPropagation();

            onClick({
              text: record[column.dataIndex],
              record: record,
              index: index,
            });
          }}
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
              style: {
                overflow: "hidden",
              }
            })}
        </View>
      );
    });
  }, [columns, useLeftSticky, useRightSticky]);

  return (
    <View
      className={cx({
        [css.row]: true,
        "mybricks-row": index % 2 === 0,
        "mybricks-row-double": index % 2 !== 0,
        [css.bordered]: data.bordered,
        ["disabled-area"]: env.edit && index > 0,
      })}
    >
      {$columns}
    </View>
  );
}
