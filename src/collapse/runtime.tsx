import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text } from "@tarojs/components";
import { Collapse } from "brickd-mobile";
import cx from "classnames";
import css from "./style.less";

export default function ({ env, data, inputs, outputs, slots }) {
  const [value, setValue] = useState(data.defaultValue ? ["content"] : []);

  const onChange = useCallback(
    (value) => {
      if (env.edit) {
        return;
      }

      setValue(value);
    },
    [env.edit]
  );

  return (
    <Collapse
      style={data.style}
      className={css.taroCollapse}
      value={env.edit ? ["content"] : value}
      onChange={onChange}
    >
      <Collapse.Item title={data.title} value={"content"} bordered={false}>
        {slots[`content`].render?.()}
      </Collapse.Item>
    </Collapse>
  );
}
