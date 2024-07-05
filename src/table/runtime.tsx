import React, { useCallback, useState, useMemo, useEffect } from "react";
import { View, Image } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";

export default function ({ env, data, inputs, outputs, slots }) {
  const [list, setList] = useState(
    env.edit || env?.runtime?.debug?.prototype ? [{}] : []
  );

  useEffect(() => {
    inputs["setList"]((val) => {
      setList(val);
    });
  }, []);

  const placeholder = useMemo(() => {
    if (env.runtime) {
      return null;
    }

    if (data.columns.length) {
      return null;
    } else {
      return <View className={css.placeholder}>请添加列</View>;
    }
  }, [env.runtime, data.columns]);

  const tHead = useMemo(() => {
    return (
      <View className={cx([css.tr, css.thead, "mybricks-thead"])}>
        {data.columns.map((column, index) => {
          let style = {};

          if (column.autoWidth) {
            style.flex = 1;
            style.minWidth = 12;
          } else {
            style.width = +column.width;
          }

          return (
            <View
              data-id={column._id}
              className={cx({
                [css.td]: true,
                "mybricks-td": true,
                [css.leftSticky]: column.fixed === "left",
                [css.rightSticky]: column.fixed === "right",
              })}
              style={style}
            >
              {column.title}
            </View>
          );
        })}
      </View>
    );
  }, [data.columns]);

  const tBody = useMemo(() => {
    list = env.edit ? [{}] : list;

    return list.map((item, listIndex) => {
      return (
        <View className={css.tr}>
          {data.columns.map((column, index) => {
            let style = {};

            if (column.autoWidth) {
              style.flex = 1;
              style.minWidth = 12;
            } else {
              style.width = +column.width;
            }

            return (
              <View
                className={cx({
                  [css.td]: true,
                  "mybricks-td": true,
                  [css.leftSticky]: column.fixed === "left",
                  [css.rightSticky]: column.fixed === "right",
                })}
                style={style}
              >
                {slots[column.id]?.render({
                  inputValues: {
                    columnData: item[column.dataIndex],
                    rowData: item,
                    index: index,
                  },
                })}
              </View>
            );
          })}
        </View>
      );
    });

    return (
      <View className={cx([css.tr])}>
        {data.columns.map((column, index) => {
          let style = {};
          if (column.autoWidth) {
            style.flex = 1;
          } else {
            style.width = +column.width;
          }

          return (
            <View
              data-id={column._id}
              className={cx({
                [css.td]: true,
                "mybricks-td": true,
                [css.leftSticky]: column.fixed === "left",
                [css.rightSticky]: column.fixed === "right",
              })}
              style={style}
            >
              {column.title}
            </View>
          );
        })}
      </View>
    );
  }, [data.columns, list]);

  //
  if (placeholder) {
    return placeholder;
  }

  return (
    <View
      className={cx({
        [css.table]: true,
        // "mybricks-table": true,
        [css.bordered]: data.bordered,
      })}
    >
      {data.hiddenTableHeader ? null : tHead}
      {tBody}
    </View>
  );
}
