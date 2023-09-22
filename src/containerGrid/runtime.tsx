import React from "react"

import { View } from "@tarojs/components";

import { getColOutputId, getRowOutputId } from "./edit/util";

import css from "./css.less";

export default (props) => {
  const { data, outputs } = props;

  return (
    <View className={css.layout} style={data.style} onClick={() => outputs['click']?.(true)}>
      {data.rows.map((row) => {
        return (
          <Row
            key={row.id}
            row={row}
            props={props}
          />
        )
      })}
    </View>
  )
}

function Row({ row, props }) {
  const { outputs } = props;
  const cols = row.cols;

  /** 与响应式对象解耦，防止修改源对象 */
  const style = JSON.parse(JSON.stringify(row?.style ?? {}));
  if (row.height === 'auto') {
    style.flex = 1;
  } else if (typeof row.height === 'number') {
    style.height = row.height;
  }

  return (
    <View
      className={css.row}
      style={style}
      onClick={() => outputs[getRowOutputId(row?.id)]?.(true)}
    >
      {cols.map((col) => {
        return (
          <Col
            key={col.id}
            col={col}
            row={row}
            props={props}
          />
        )
      })}
    </View>
  )
}

function Col({ col, row, props }) {
  const { slots, data, outputs } = props;

  /** 与响应式对象解耦，防止下方修改源对象 */
  const style = JSON.parse(JSON.stringify(col?.style ?? {}));

  if (col.width === 'auto') {
    style.flex = 1;
  } else if (typeof col.width === 'number') {
    style.width = col.width;
  }

  /** 获取col的布局属性，优先级为col > row > data */
  const layoutStyle = {
    ...(data?.layout ?? {}),
    ...(row?.layout ?? {}),
    ...(col?.layout ?? {}),
  };

  return (
    <View
      className={css.col}
      style={style}
      onClick={() => outputs[getColOutputId(col?.id)]?.(true)}
    >
      {slots[col.id].render({ style: layoutStyle })}
    </View>
  )
}
