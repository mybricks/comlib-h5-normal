import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text } from "@tarojs/components";
import { Collapse } from 'brickd-mobile'
import cx from 'classnames'
import css from "./style.less";

export default function ({ env, data, inputs, outputs, slots }) {
  const [value, setValue] = useState([])

  return <View>
    <Collapse style={data.style} className={css.taroCollapse} value={value} onChange={setValue}>
      {
        data.contents?.map?.(cont => {
          return <Collapse.Item key={cont.id} title={cont.title} value={cont.id} bordered={false}>
            { slots[`cont_${cont.id}`].render?.() }
          </Collapse.Item>
        })
      }
    </Collapse>
  </View>;
}
