import React, { useCallback, useState, useMemo, useEffect } from "react";
import { View, Image } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";

export default function ({ env, data, inputs, outputs, slots }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    inputs["setList"]((val) => {
      setList(val);
    });
  }, []);

  const placeholder = useMemo(() => {
    if (data.columns.length) {
      return null;
    } else {
      return <View className={css.placeholder}>请添加列</View>;
    }
  }, [data.columns]);

  //
  const leftWidth = useMemo(() => {
    let width = 0;
    data.columns.forEach((column) => {
      if (column.fixed === "left") {
        width += +column.width;
      }
    });
    return width;
  }, [data.columns]);

  const leftSide = useMemo(() => {
    let columns = data.columns.filter((column) => {
      return column.fixed === "left";
    });

    let head = columns.map((column, index) => {
      return (
        <View
          data-id={column._id}
          className={cx([css.td, "mybricks-td"])}
          style={{ width: +column.width }}
        >
          {column.title}
        </View>
      );
    });

    list = env.edit ? [{}] : list;
    let body = list.map((item, index) => {
      return (
        <View className={css.tr}>
          {columns.map((column, index) => {
            return (
              <View
                className={cx([css.td, "mybricks-td"])}
                style={{ width: +column.width }}
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
      <>
        <View className={cx([css.tr, css.thead, "mybricks-thead"])}>
          {head}
        </View>
        {body}
      </>
    );
  }, [data.columns, list, env.edit]);

  const mainWidth = useMemo(() => {
    let width = 0;
    data.columns.forEach((column) => {
      if (!column.fixed) {
        width += +column.width;
      }
    });
    return width;
  }, [data.columns]);

  const main = useMemo(() => {
    let columns = data.columns.filter((column) => {
      return !column.fixed;
    });

    let head = columns.map((column, index) => {
      return (
        <View
          data-id={column._id}
          className={cx([css.td, "mybricks-td"])}
          style={{ width: +column.width }}
        >
          {column.title}
        </View>
      );
    });

    list = env.edit ? [{}] : list;
    let body = list.map((item, index) => {
      return (
        <View className={css.tr}>
          {columns.map((column, index) => {
            return (
              <View
                className={cx([css.td, "mybricks-td"])}
                style={{ width: +column.width }}
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
      <>
        <View className={cx([css.tr, css.thead, "mybricks-thead"])}>
          {head}
        </View>
        {body}
      </>
    );
  }, [data.columns, list]);

  const rightWidth = useMemo(() => {
    let width = 0;
    data.columns.forEach((column) => {
      if (column.fixed === "right") {
        width += +column.width;
      }
    });
    return width;
  }, [data.columns]);

  const rightSide = useMemo(() => {
    let columns = data.columns.filter((column) => {
      return column.fixed === "right";
    });

    let head = columns.map((column, index) => {
      return (
        <View
          data-id={column._id}
          className={cx([css.td, "mybricks-td"])}
          style={{ width: +column.width }}
        >
          {column.title}
        </View>
      );
    });

    list = env.edit ? [{}] : list;
    let body = list.map((item, index) => {
      return (
        <View className={css.tr}>
          {columns.map((column, index) => {
            return (
              <View
                className={cx([css.td, "mybricks-td"])}
                style={{ width: +column.width }}
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
      <>
        <View className={cx([css.tr, css.thead, "mybricks-thead"])}>
          {head}
        </View>
        {body}
      </>
    );
  }, [data.columns, list]);

  //
  if (placeholder) {
    return placeholder;
  }

  return (
    <View className={cx(css.table, "mybricks-table")}>
      <View className={css.leftSide} style={{ width: leftWidth }}>
        {leftSide}
      </View>
      <View className={css.main} style={{ width: mainWidth }}>
        {main}
      </View>
      <View className={css.rightSide} style={{ width: rightWidth }}>
        {rightSide}
      </View>
    </View>
  );
}
