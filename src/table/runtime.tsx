import React, { useCallback, useState, useMemo } from "react";
import { View, Image } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";

export default function ({ env, data, inputs, outputs, slots }) {
  const [list, setList] = useState([
    {
      name: "张三",
      age: 18,
      address: "北京",
      aaabbb: "aaa",
    },
    {
      name: "李四",
      age: 20,
      address: "上海",
      aaabbb: "bbb",
    },
    {
      name: "王五",
      age: 22,
      address: "广州",
      aaabbb: "ccc",
    },
  ]);

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
        width += column.width;
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
          className={cx([css.td, "mybricks-td"])}
          style={{ width: column.width }}
        >
          {column.title}
        </View>
      );
    });

    let body = list.map((item, index) => {
      return (
        <View className={css.tr}>
          {columns.map((column, index) => {
            return (
              <View
                className={cx([css.td, "mybricks-td"])}
                style={{ width: column.width }}
              >
                {item[column.key]}
              </View>
            );
          })}
        </View>
      );
    });

    return (
      <>
        <View className={cx([css.tr, css.thead])}>{head}</View>
        {body}
      </>
    );
  }, [data.columns, list]);

  const mainWidth = useMemo(() => {
    let width = 0;
    data.columns.forEach((column) => {
      if (!column.fixed) {
        width += column.width;
      }
    });
    return width;
  }, [data.columns]);

  const main = useMemo(() => {
    let columns = data.columns.filter((column) => {
      return !column.fixed;
    });

    return columns.map((column, index) => {
      return (
        <View
          className={cx([css.td, "mybricks-td"])}
          style={{ width: column.width }}
        >
          {column.title}
        </View>
      );
    });
  }, [data.columns]);

  const rightWidth = useMemo(() => {
    let width = 0;
    data.columns.forEach((column) => {
      if (column.fixed === "right") {
        width += column.width;
      }
    });
    return width;
  }, [data.columns]);

  const rightSide = useMemo(() => {
    let columns = data.columns.filter((column) => {
      return column.fixed === "left";
    });

    return columns.map((column, index) => {
      return (
        <View
          className={cx([css.td, "mybricks-td"])}
          style={{ width: column.width }}
        >
          {column.title}
        </View>
      );
    });
  }, [data.columns]);

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
