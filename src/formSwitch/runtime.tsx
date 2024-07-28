import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View } from "@tarojs/components";
import { isObject, isString, isEmpty, isBoolean } from "./../utils/core/type";
import { Switch, Checkbox } from "brickd-mobile";
import cx from "classnames";

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
          data.value = !!val;
          break;
        case isObject(val):
          data.value = !!val[data.name];
          break;
        default:
          data.value = !!val;
          break;
      }
    });
  }, []);

  const onChange = useCallback((value) => {
    data.value = value;

    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value,
    });
    outputs["onChange"](value);
  }, []);

  const checkboxValue = useMemo(() => {
    if (data.value) {
      return ["active"];
    } else {
      return [];
    }
  }, [data.value]);

  const onChangeCheckbox = useCallback((value) => {
    if (value.includes("active")) {
      onChange(true);
    } else {
      onChange(false);
    }
  }, []);

  return (
    <>
      {data.type === "switch" || !data.type ? (
        <Switch
          style={{ marginLeft: "auto" }}
          value={data.value}
          size={24}
          checked={env.edit ? true : data.value}
          onChange={onChange}
        />
      ) : null}

      {data.type === "checkbox" ? (
        <Checkbox.Group value={checkboxValue} onChange={onChangeCheckbox}>
          <Checkbox
            className={cx({
              ["mybricks-inactive"]: !data.value,
              ["mybricks-active"]: !!data.value,
            })}
            name="active"
            shape="square"
          ></Checkbox>
        </Checkbox.Group>
      ) : null}
    </>
  );
}
