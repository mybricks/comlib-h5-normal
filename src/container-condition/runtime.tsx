import React, { useCallback, useMemo, useState } from "react";
import cx from "classnames";
import css from "./style.less";

export default function ({ env, data, slots, inputs, outputs }) {
  const [innputId, setInputId] = useState();

  const activeId = useMemo(() => {
    if (env.edit) {
      return data._editSelectId_ ?? data.items?.[0]?.id
    }
    return innputId
  }, [data.items, data._editSelectId_, innputId]);

  /** TODO 写在useEffect里时序有延迟，容易出现闪屏，先试试这样先 */
  useMemo(() => {
    data.items.forEach(item => {
      inputs[item.id]?.((bool) => {
        setInputId(item.id)
      });
    })
  }, [data.items]);


  const onClick = useCallback(() => {
    outputs['onClick']?.()
  }, [])

  return (
    <div className={css.condition} onClick={onClick}>
      {data.items.map((item) => {
        if (activeId !== item.id) {
          return null
        }
        return (
          <div className={css.content}>
            {slots[item.id]?.render({
            })}
          </div>
        );
      })}
    </div>
  );
}
