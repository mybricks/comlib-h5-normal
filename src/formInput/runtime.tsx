import React, { useState, useCallback, useEffect, useMemo } from "react";
import { isNumber, isObject, isString, isEmpty } from "./../utils/core/type";
import { Input } from "brickd-mobile";
import css from "./style.less";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;

  useEffect(() => {
    inputs["setValue"]((val) => {
      switch (true) {
        case isEmpty(val): {
          data.value = "";
          break;
        }
        case isString(val) || isNumber(val):
          data.value = val;
          break;
        case isObject(val):
          data.value = val[data.name];
          break;
        default:
          break;
      }
    });

    inputs["getValue"]((val, outputRels) => {
      outputRels["returnValue"](data.value);
    });

    // 设置禁用
    inputs["setDisabled"](() => {
      data.disabled = true;
    });

    // 设置启用
    inputs["setEnabled"](() => {
      data.disabled = false;
    });
  }, []);

  const onChange = useCallback((e) => {
    let value = e.detail.value;
    data.value = value;

    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value,
    });
    
    outputs["onChange"](value);
  }, []);

  return (
    <Input
      className={css.input}
      value={data.value}
      type={data.type}
      placeholder={data.placeholder}
      onChange={onChange}
      disabled={data.disabled}
      clearable={data.clearable}
      cursorSpacing={28}
      cursor={data.value.length}
    />
  );
}
