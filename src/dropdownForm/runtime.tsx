import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Image } from "@tarojs/components";
import { Popup } from "brickd-mobile";

import css from "./runtime.less";

export default ({ data, inputs, outputs }) => {
  const [items, setItems] = useState(data.cates);

  return (
    <div className={css.dropdown}>
      {
        (data.cates ?? []).map(item => (
          <div className={css.item}>
            {item.label}
            <div className={css.icon}></div>
          </div>
        ))
      }
    </div>
  )
}