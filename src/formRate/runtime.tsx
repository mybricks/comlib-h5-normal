import React, { useState, useCallback, useMemo, useEffect } from "react";
import { View } from "@tarojs/components";
import cx from "classnames";
import { isObject, isString, isNumber, isEmpty } from "./../utils/core/type";
import { Rate, Field } from "brickd-mobile";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;
  const [value, setValue] = useState("");

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
    inputs["setValue"]((val) => {
      switch (true) {
        case isEmpty(val): {
          setValue("");
          break;
        }
        case isString(val) || isNumber(val):
          setValue(val);
          break;
        case isObject(val):
          setValue(val[data.name]);
          break;
        default:
          break;
      }
    });

    inputs["setDisabled"]((val) => {
      data.disabled = !!val;
    });
  }, []);

  const onChange = useCallback((value) => {
    setValue(value);
    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value,
    });
    outputs["onChange"](value);
  }, []);

  return (
    // <Field label={data.label} name={data.name}>
    <Rate
      value={value}
      onChange={onChange}
      count={data.count}
      allowHalf={data.allowHalf}
      disabled={data.disabled}
    />
    // </Field>
  );
}
