import React, { useState, useCallback, useEffect } from "react";
import Taro from '@tarojs/taro'
import { isObject, isString, isNumber, isEmpty } from './../utils/core/type';
import { Field, Stepper } from "brickd-mobile";
import cx from "classnames";
import css from "./style.less";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;

  useEffect(() => {
    inputs["setValue"]((val) => {
      switch (true) {
        case isEmpty(val): {
          data.value = val;
          break;
        }
        case isString(val) || isNumber(val):
          data.value = val;
          // outputs["onChange"]({ name: data.name, value: val });
          break;
        case isObject(val):
          data.value = val[data.name];
          // outputs["onChange"]({ name: data.name, value: val[data.name] });
          break;
        default:
          break;
      }
    });
  }, []);

  const onChange = useCallback((e) => {
    let value = e.detail.value;
    data.value = value;
    parentSlot?._inputs['onChange']?.({ id: props.id, name: props.name, value })
    outputs["onChange"](value);
  }, []);

  return (
    <Stepper
      className={cx(css.stepper, {[css.h5Reset]: Taro.ENV_TYPE.WEB === Taro.getEnv()})}
      step={data.step ?? 1}
      min={data.min ?? 0}
      max={data.max ?? Infinity}
      disabled={data.disabled}
      // style={{ marginLeft: "auto" }}
      shape="circular"
      size={24}
      value={data.value ?? 0}
      onChange={onChange}
    >
    </Stepper>
  );
}
