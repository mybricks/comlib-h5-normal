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
    if (data.columns.length) {
      return null;
    } else {
      return <View className={css.placeholder}>请添加列</View>;
    }
  }, [data.columns]);

  //
  const leftColumns = useMemo(() => {
    return data.columns.filter((column) => {
      return column.fixed === "left";
    });
  }, [data.columns]);

  const leftWidth = useMemo(() => {
    let width = 0;
    leftColumns.forEach((column) => {
      width += +column.width;
    });
    return width;
  }, [leftColumns]);

  const leftSide = useMemo(() => {
    let columns = [...leftColumns];

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
  }, [leftColumns, list, env.edit]);

  const mainColumns = useMemo(() => {
    return data.columns.filter((column) => {
      return !column.fixed;
    });
  }, [data.columns]);

  const mainWidth = useMemo(() => {
    let width = 0;
    mainColumns.forEach((column) => {
      width += +column.width;
    });
    return width;
  }, [mainColumns]);

  const main = useMemo(() => {
    let columns = [...mainColumns];

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
  }, [mainColumns, list]);

  const rightColumns = useMemo(() => {
    return data.columns.filter((column) => {
      return column.fixed === "right";
    });
  }, [data.columns]);

  const rightWidth = useMemo(() => {
    let width = 0;
    rightColumns.forEach((column) => {
      width += +column.width;
    });
    return width;
  }, [rightColumns]);

  const rightSide = useMemo(() => {
    let columns = [...rightColumns];

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
  }, [rightColumns, list]);

  // 排序后的 columns
  const orderedColumns = useMemo(() => {
    let leftColumns = data.columns.filter((column) => {
      return column.fixed === "left";
    });
    let rightColumns = data.columns.filter((column) => {
      return column.fixed === "right";
    });
    let mainColumns = data.columns.filter((column) => {
      return !column.fixed;
    });

    return [...leftColumns, ...mainColumns, ...rightColumns];
  }, [data.columns]);

  const tHead = useMemo(() => {
    return (
      <View className={cx([css.thead, "mybricks-thead"])}>
        <View className={cx([css.tr])}>
          {orderedColumns.map((column, index) => {
            let style = {};
            if (column.width !== "auto") {
              style.width = +column.width;
            } else {
              style.flex = 1;
            }

            return (
              <View
                data-id={column._id}
                className={cx([css.td, "mybricks-td"])}
                style={style}
              >
                {column.title}
              </View>
            );
          })}
        </View>
      </View>
    );
  }, [orderedColumns]);

  const tBody = useMemo(() => {
    return list.map((item, index) => {
      return <View className={css.tr}>dfdf</View>;
    });
  }, [list]);

  //
  if (placeholder) {
    return placeholder;
  }

  return (
    <View className={cx(css.table, "mybricks-table")}>
      {tHead}
      {tBody}
      {/* {leftColumns.length ? (
        <View className={css.leftSide} style={{ width: leftWidth }}>
          {leftSide}
        </View>
      ) : null}

      {mainColumns.length ? (
        <View className={css.main} style={{ width: mainWidth }}>
          {main}
        </View>
      ) : null}

      {rightColumns.length ? (
        <View className={css.rightSide} style={{ width: rightWidth }}>
          {rightSide}
        </View>
      ) : null} */}
    </View>
  );
}
