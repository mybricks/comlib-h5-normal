import React, { useState, useEffect, useCallback } from "react";
import { View } from "@tarojs/components";
import { isObject, isString, isEmpty, isBoolean } from './../utils/core/type';
import { Switch } from "brickd-mobile";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;

  useEffect(() => {
    inputs["setValue"]((val) => {
      switch (true) {
        case isEmpty(val): {
          data.value = false;
          break;
        }
        case isBoolean(val):
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

  const onChange = useCallback((value) => {
    data.value = value;

    parentSlot?._inputs['onChange']?.({ id: props.id, name: props.name, value })
    outputs["onChange"](value);
  }, []);

  return (
    <Switch
      style={{ marginLeft: "auto" }}
      value={data.value}
      size={24}
      checked={env.edit ? true : data.value}
      onChange={onChange}
    />
  );
}
