import React, { useCallback, useState, useMemo, useEffect } from "react";
import { View, Image } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";
import Head from "./runtime/Head";
import Row from "./runtime/Row";

export default function ({ env, data, inputs, outputs, slots }) {
  const [status, setStatus] = useState(env.edit ? "ready" : "preview");

  // const [list, setList] = useState(env.edit || env?.runtime?.debug?.prototype ? [{}] : []);
  const [dataSource, setDataSource] = useState(new Array(10).fill({}));

  useEffect(() => {
    inputs["setDataSource"]((val) => {
      setDataSource(val);
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

  const tBody = useMemo(() => {
    // dataSource = env.edit ? [{}] : dataSource;

    return dataSource.map((item, index) => {
      return (
        <Row
          key={index}
          rowData={item}
          columns={data.columns}
          slots={slots}
        ></Row>
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
  }, [data.columns, dataSource]);

  //
  if (placeholder) {
    return placeholder;
  }

  return (
    <View className={css["table-wrapper"]}>
      <View className={css["table-track"]}>
        <View
          className={cx({
            [css.table]: true,
            "mybricks-table": true,
            [css.bordered]: data.bordered,
          })}
        >
          {data.hiddenTableHeader ? null : <Head columns={data.columns}></Head>}
          {tBody}
        </View>
      </View>
    </View>
  );
}
