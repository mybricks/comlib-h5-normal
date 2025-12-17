import React, { useState, useCallback, useEffect } from "react";
import Taro from "@tarojs/taro";
import { isObject, isString, isNumber, isEmpty } from "./../utils/type";
import useFormItemValue from "../utils/hooks/useFormItemValue.ts";
import { Field, Stepper } from "brickd-mobile";
import cx from "classnames";
import css from "./style.less";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;

  const [value, setValue, getValue] = useFormItemValue(data.value, (val) => {
    //
    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value: val,
    });

    //
    outputs["onChange"](val);
  });

  useEffect(() => {
    parentSlot?._inputs["setProps"]?.({
      id: props.id,
      name: props.name,
      value: {
        visible: props.style.display !== "none",
      },
    });
  }, [props.style.display]);

  useEffect(() => {
    /* 设置值 */
    inputs["setValue"]((val, outputRels) => {
      let result;

      switch (true) {
        case isEmpty(val): {
          result = "";
          break;
        }
        case isString(val) || isNumber(val):
          result = isNaN(+val) ? "" : +val;
          break;
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

    /* 设置禁用 */
    inputs["setDisabled"]?.((val, outputRels) => {
      data.disabled = !!val;
      outputRels["setDisabledComplete"]?.(data.disabled);
    });
  }, [value]);

  const onChange = useCallback((val) => {
    setValue(val);
  }, []);

  return (
    <Stepper
      className={cx(css.stepper, {
        [css.h5Reset]: Taro.ENV_TYPE.WEB === Taro.getEnv(),
      })}
      step={data.step ?? 1}
      min={data.min ?? 0}
      max={data.max ?? Infinity}
      disabled={data.disabled}
      shape="circular"
      value={value ?? 0}
      onChange={onChange}
    ></Stepper>
  );
}
