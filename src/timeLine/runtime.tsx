import React, { useEffect, useMemo, useState } from "react";
import { View, Text } from "@tarojs/components";
import css from "./runtime.less";
import { uuid, debounce } from "../utils";
import cx from "classnames";
import { Direction } from "./constant";

const rowKey = "_itemKey";

const mockData: DsItem[] = [
  { [rowKey]: 1, index: 1 },
  { [rowKey]: 2, index: 2 },
  { [rowKey]: 3, index: 3 },
] as DsItem[];

interface DsItem {
  item: any;
  [rowKey]: string | number;
  index: number;
}

export default function ({ env, data, inputs, outputs, slots }) {
  const [dataSource, setDataSource] = useState<DsItem[]>(
    env.edit || env?.runtime?.debug?.prototype ? mockData : []
  );

  useMemo(() => {
    inputs["refreshDataSource"]((val) => {
      if (Array.isArray(val)) {
        const ds = val.map((item, index) => ({
          item,
          [rowKey]: data.rowKey === "" ? uuid() : item[data.rowKey] || uuid(),
          index: index,
        }));
        setDataSource(ds);
      }
    });
  }, []);

  const list = dataSource.map(
    ({ [rowKey]: key, index: index, item: item }, _idx) => {
      return (
        <View
          className={cx({
            [css.item]: true,
            ["disabled-area"]: env.edit && _idx > 0,
            [css.disabled_area]: env.edit && _idx > 0,
          })}
          key={key}
        >
          <View className={css.left_line}>
            <View
              className={cx({
                [css.line_top]: _idx > 0,
                [css.line_top_first]: _idx == 0 || data.line_spacing === true,
                // "mybricks-line": true,
              })}
              id="mybricks-line"
            ></View>

            <View
              className={cx(css.dot)}
              id="mybricks-dot"
            ></View>
            <View
              className={cx(css.line)}
              id="mybricks-line"
            ></View>
          </View>
          <View
            className={css.right_contant}
            style={{
              marginBottom: `${data.spacing}px`,
            }}
          >
            <View className={css.contant}>
              {/* 当前项数据和索引 */}
              {slots["item"].render({
                inputValues: {
                  itemData: item,
                  index: index,
                },
                key: key,
              })}
            </View>
          </View>
        </View>
      );
    }
  );

  return <View className={css.warrper}>{list}</View>;
}
