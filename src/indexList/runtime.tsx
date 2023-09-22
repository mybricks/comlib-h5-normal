import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "@tarojs/components";
import cx from "classnames";
import css from "./style.less";
import mock from "./mock";
import Taro from "@tarojs/taro";
import { IndexList as BrickdIndexList, Cell } from "brickd-mobile";
import { isDesigner } from "../utils/env";

// @ts-ignore
const isH5 = Taro.getEnv() === Taro.ENV_TYPE.WEB || Taro.getEnv() === 'Unknown';

export const IndexList = ({ env, data, inputs, outputs, slots }) => {
  const [dataSource, setDataSource] = useState(env.runtime ? [] : mock);

  useEffect(() => {
    inputs["setDataSource"]((val) => {
      setDataSource(val);
    });
  }, []);

  const onClickCell = useCallback((row) => {
    outputs["onClick"](row);
  }, []);

  const customizeCell = useCallback(({ key, title, value }) => {
    return (
      <View onClick={() => {
        onClickCell(value);
      }}>
        {slots["item"].render({
          inputValues: {
            itemData: { title, value },
            index: key,
          },
          key: key,
        })}
      </View>
    );
  }, [slots['item']]);

  const cell = useMemo(() => {
    if (data.useCustomizeCell) {
      return customizeCell;
    } else {
      return Cell;
    }
  }, [data.useCustomizeCell]);

  return (
    // React.Fragment > IndexList.Anchor + View, View > Cell 这个结构不可修改，去看下源代码就知道了，写的啥玩意
    <BrickdIndexList className={cx(css.indexList, { [css.edit]: isDesigner(env), [css.h5]: isH5 })}>
      {dataSource.map((row, index) => {
        return (
          <React.Fragment key={index}>
            {row.anchor ? (
              <BrickdIndexList.Anchor index={row.anchor}>{row.anchor}</BrickdIndexList.Anchor>
            ) : null}
            <View>
              {row.list.map((_row, _index) => {
                return (
                  cell({
                    key: _index,
                    title: _row.title,
                    value: _row.value,
                    onClick: () => {
                      onClickCell(_row.value);
                    }
                  })
                );
              })}
            </View>
          </React.Fragment>
        );
      })}
    </BrickdIndexList>
  );
}

export default IndexList
