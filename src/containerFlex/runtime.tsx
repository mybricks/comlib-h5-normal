import React, { useCallback } from "react";
import { View } from "@tarojs/components";
import { Flex } from "brickd-mobile";
import cx from "classnames";
import css from "./style.less";

export default function ({ env, data, slots, inputs, outputs }) {
  return (
    <Flex
      gutter={data.gutter}
      direction={data.direction}
      wrap={data.wrap}
      justify={data.justify}
      align={data.align}
    >
      {data.items.map((item, index) => {
        return (
          <Flex.Item
            className={cx(css.item, "mybricks-item")}
            span={item.span}
            offset={item.offset}
            key={item.id}
          >
            {slots[item.id]?.render({
              style: {
                ...item.slotStyle,
              },
            })}
          </Flex.Item>
        );
      })}
    </Flex>
  );
}
