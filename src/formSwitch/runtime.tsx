import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View } from "@tarojs/components";
import { isObject, isString, isEmpty, isBoolean } from "../utils/type";
import useFormItemValue from "../utils/hooks/useFormItemValue.ts";
import { Switch, Checkbox } from "brickd-mobile";
import cx from "classnames";

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
      setValue(!!val);
      outputRels["setValueComplete"]?.(!!val); // 表单容器调用 setValue 时，没有 outputRels
    });

    /* 获取值 */
    inputs["getValue"]((val, outputRels) => {
      outputRels["returnValue"](getValue());
    });

    /* 重置值 */
    inputs["resetValue"]((val, outputRels) => {
      setValue(false);
      outputRels["resetValueComplete"]?.(false);
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

  const onChange = useCallback((value) => {
    setValue(value);
  }, []);

  const checkboxValue = useMemo(() => {
    if (value) {
      return ["active"];
    } else {
      return [];
    }
  }, [value]);

  const onChangeCheckbox = useCallback((value) => {
    if (value.includes("active")) {
      setValue(true);
    } else {
      setValue(false);
    }
  }, []);

  return (
    <>
      {data.type === "switch" || !data.type ? (
        <Switch
          style={{ marginLeft: "auto" }}
          value={value}
          size={24}
          checked={env.edit ? true : value}
          onChange={onChange}
        />
      ) : null}

      {data.type === "checkbox" ? (
        <Checkbox.Group value={checkboxValue} onChange={onChangeCheckbox}>
          <Checkbox
            className={cx({
              ["mybricks-inactive"]: !value,
              ["mybricks-active"]: !!value,
            })}
            name="active"
            shape="square"
          ></Checkbox>
        </Checkbox.Group>
      ) : null}
    </>
  );
}
