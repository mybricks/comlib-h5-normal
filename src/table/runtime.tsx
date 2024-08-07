import React, { useCallback, useState, useMemo, useEffect } from "react";
import { View } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";
import Head from "./runtime/Head";
import Row from "./runtime/Row";

export default function ({ env, data, inputs, outputs, slots }) {
  const [dataSource, setDataSource] = useState(env.edit ? [{}, {}, {}] : []);

  useEffect(() => {
    inputs["setDataSource"]((val) => {
      setDataSource(val);
    });
  }, []);

  //
  if (env.edit && !data.columns.length) {
    return <View className={css.placeholder}>请添加表格列</View>;
  }

  return (
    <View className={cx(css["table-wrapper"], "mybricks-table")}>
      <View className={css["table-track"]}>
        <View
          className={cx({
            [css.table]: true,
            [css.bordered]: data.bordered,
          })}
        >
          {/* thead */}
          {data.hiddenTableHeader ? null : (
            <Head columns={data.columns} data={data}></Head>
          )}

          {/* tbody */}
          {dataSource.map((item, index) => {
            return (
              <Row
                record={item}
                index={index}
                columns={data.columns}
                data={data}
                env={env}
                slots={slots}
                key={index}
              ></Row>
            );
          })}
        </View>
      </View>
    </View>
  );
}
