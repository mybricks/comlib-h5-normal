import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Image } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";
import useFormItemValue from "../utils/hooks/useFormItemValue.ts";
import Item from "./runtime/Item";

export default function (props) {
  const { env, data, inputs, outputs, slots } = props;

  const defaultValue = useMemo(() => {
    if (env.edit) {
      return [data.options[0]?.value];
    }
    return data.defaultValue || [];
  }, [env.edit, data.options, data.defaultValue]);

  const [value, setValue, getValue] = useFormItemValue(defaultValue, (val) => {
    //
    let result = val;

    if (data.useMultiple) {
      // noop
    } else {
      result = val[0];
    }

    outputs["onChange"](result);
  });

  //
  const [ready, setReady] = useState(
    env.edit ? true : data.defaultRenderMode === "dynamic" ? false : true
  );

  useEffect(() => {
    inputs["setValue"]((val, outputRels) => {
      setValue(val);
      outputRels["setValueComplete"](val);
    });

    inputs["getValue"]((val, outputRels) => {
      let result = getValue();

      if (data.useMultiple) {
        // noop
      } else {
        result = result[0];
      }

      outputRels["returnValue"](result);
    });

    inputs["resetValue"]((val, outputRels) => {
      setValue("");
      outputRels["resetValueComplete"]("");
    });

    inputs["setOptions"]((val) => {
      if (Array.isArray(val)) {
        data.options = val;
        setReady(true);

        // 如果选项中有 selected 为 true 的项，则设置为当前值
        let selectedItems = val.filter((item) => item.selected);
        if (data.useMultiple) {
          setValue(selectedItems.map((item) => item.value));
        } else {
          setValue([selectedItems[selectedItems.length - 1]?.value]);
        }
      }
    });
  }, [data.useMultiple]);

  const onChange = useCallback(
    (val) => {
      if (!env.runtime) {
        return;
      }

      let _value = value.slice();
      let index = _value.indexOf(val);

      if (data.useMultiple) {
        // 多选模式
        if (index > -1) {
          _value.splice(index, 1);
        } else {
          _value.push(val);
        }
      } else {
        // 单选模式
        if (index > -1) {
          // noop
        } else {
          _value = [val];
        }
      }

      setValue(_value);
    },
    [value, data.useMultiple]
  );

  const options = useMemo(() => {
    return (ready && data.options) || [];
  }, [ready, data.options]);

  return (
    <View className={cx([css.checkList, "mybricks-checkList"])}>
      <View
        className={cx({
          [css.checkListTrack]: true,
          [css.checkListTrackWrap]: data.useWrap,
        })}
      >
        <View
          className={cx({
            [css.line]: !data.useWrap,
            [css.lines]: data.useWrap,
          })}
          style={{
            marginBottom: data.useWrap ? `-${data.gutter[0]}px` : 0,
            marginRight: data.useWrap ? `-${data.gutter[1]}px` : 0,
          }}
        >
          {options.map((item,index) => {
            let isSelected = value.includes(item.value);

            let style = {
              paddingRight: `${data.gutter[1]}px`,
            };

            if (data.useWrap) {
              style = {
                ...style,
                maxWidth: `${100 / data.column}%`,
                flexBasis: `${100 / data.column}%`,
                paddingBottom: `${data.gutter[0]}px`,
              };
            } else {
              style = {
                ...style,
                minWidth: `${data.itemMinWidth}px`,
              };
            }

            return (
              <View className={css.item} style={style}>
                <Item
                  {...props}
                  item={item}
                  isSelected={isSelected}
                  onChange={onChange}
                  index={index}
                />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
