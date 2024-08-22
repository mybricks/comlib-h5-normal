import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Field, Radio, Image } from "brickd-mobile";
import cx from "classnames";
import { isObject, isString, isEmpty, isNumber } from "./../utils/type";
import useFormItemValue from "../utils/hooks/useFormItemValue.ts";
import css from "./style.less";
import { View } from "@tarojs/components";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;

  const [ready, setReady] = useState(
    env.edit ? true : data.defaultRnderMode === "dynamic" ? false : true
  );

  const [value, setValue, getValue] = useFormItemValue(
    env.edit ? data.options[0]?.value : data.value,
    (val) => {
      //
      parentSlot?._inputs["onChange"]?.({
        id: props.id,
        name: props.name,
        value: val,
      });

      //
      outputs["onChange"](val);
    }
  );

  useEffect(() => {
    /* 设置值 */
    inputs["setValue"]((val, outputRels) => {
      let result;

      switch (true) {
        case isEmpty(val): {
          result = "";
          break;
        }
        case isString(val) || isNumber(val): {
          result = val;
          break;
        }
        default:
          // 其他类型的值，直接返回
          return;
      }

      setValue(result);
      outputRels["setValueComplete"]?.(result); // 表单容器调用 setValue 时，没有 outputRels
    });

    /* 获取值 */
    inputs["getValue"]((val, outputRels) => {
      outputRels["returnValue"](getValue());
    });

    /* 重置值 */
    inputs["resetValue"]((val, outputRels) => {
      setValue("");
      outputRels["resetValueComplete"]?.("");
    });

    /* 设置标题 */
    inputs["setLabel"]?.((val) => {
      if (!isString(val)) {
        return;
      }

      parentSlot?._inputs["setProps"]?.({
        id: props.id,
        name: props.name,
        value: {
          label: val,
        },
      });
    });

    /* 设置数据源 */
    inputs["setOptions"]((val) => {
      if (Array.isArray(val)) {
        data.options = val;
        setReady(true);
      }
    });

    /* 设置禁用 */
    inputs["setDisabled"]?.((val, outputRels) => {
      data.disabled = !!val;
      outputRels["setDisabledComplete"]?.(data.disabled);
    });
  }, [value]);

  const onChange = useCallback((value) => {
    if (!env.runtime) {
      return;
    }
    setValue(value);
  }, []);

  const options = useMemo(() => {
    return ready ? data.options : [];
  }, [ready, data.options]);

  return (
    <Radio.Group direction={data.direction} value={value} onChange={onChange}>
      {options.map((item) => {
        const restProps = {} as any;
        if (item.icon) {
          restProps.icon = <Image src={item.icon} />;
        }

        return (
          <Radio
            className={cx({
              ["mybricks-inactive"]: value != item.value,
              ["mybricks-active"]: value == item.value,
            })}
            name={item.value}
            {...restProps}
          >
            <View className={cx("mybricks-label", css.label)}>
              {item.label}
            </View>
            {item.brief ? (
              <View className={cx("mybricks-brief", css.brief)}>
                {item.brief}
              </View>
            ) : null}
          </Radio>
        );
      })}
    </Radio.Group>
  );
}
