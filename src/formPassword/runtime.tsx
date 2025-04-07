import React, { useCallback, useMemo, useState, useEffect } from "react";
import { isNumber, isObject, isString, isEmpty } from "./../utils/core/type";
import { View } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";
import { Input } from "brickd-mobile";
import { isH5 } from "../utils/env";
import cx from "classnames";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;

  const [value, setValue] = useState(data.value);
  const [paasword, setPassword] = useState(true);

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
    inputs["getValue"]((val, outputRels) => {
      outputRels["returnValue"](value);
    });
  }, [value]);

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

    // 设置禁用
    inputs["setDisabled"]?.(() => {
      data.disabled = true;
    });

    // 设置启用
    inputs["setEnabled"]?.(() => {
      data.disabled = false;
    });
  }, []);

  const buttonCx = useMemo(() => {
    return cx({
      [css.button]: true,
      [css.show]: !paasword,
      [css.hide]: paasword,
    });
  }, [paasword]);

  const onTogglePassword = useCallback(() => {
    setPassword(!paasword);
  }, [paasword]);

  const onChange = useCallback((e) => {
    let value = e.detail.value;
    setValue(value);

    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value,
    });
    outputs["onChange"](value);
  }, []);

  const onBlur = useCallback((e) => {
    let value = e.detail.value;
    outputs["onBlur"](value);
  }, []);

  return (
    <View
      className={cx({
        [css.password]: true,
        "mybricks-password": !isH5(),
        "mybricks-h5Password": isH5(),
      })}
    >
      <Input
        value={value}
        password={paasword}
        type={data.type}
        placeholder={data.placeholder}
        onChange={onChange}
        disabled={data.disabled}
        onBlur={onBlur}
        maxlength={data.maxlength || 20}
      />
      <View className={buttonCx} onClick={onTogglePassword}></View>
    </View>
  );
}
