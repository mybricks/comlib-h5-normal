import React, { useState, useCallback, useEffect, useMemo } from "react";
import { isNumber, isObject, isString, isEmpty } from "../utils/type";
import useFormItemValue from "../utils/hooks/useFormItemValue.ts";
import { Input } from "brickd-mobile";
import { View } from "@tarojs/components";
import css from "./style.less";
import { isH5 } from "../utils/env";
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
    /* 设置值 */
    inputs["setValue"]((val, outputRels) => {
      let result;

      switch (true) {
        case isEmpty(val): {
          result = "";
          break;
        }
        case isString(val) || isNumber(val): {
          result = `${val}`;
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

    /* 设置提示内容 */
    inputs["setPlaceholder"]((val) => {
      data.placeholder = val;
    });

    /* 设置禁用 */
    inputs["setDisabled"]?.((val, outputRels) => {
      data.disabled = !!val;
      outputRels["setDisabledComplete"]?.(data.disabled);
    });
  }, []);

  const onChange = useCallback((e) => {
    let value = e.detail.value;
    setValue(value);
  }, []);

  const onBlur = useCallback((e) => {
    let value = e.detail.value;
    outputs["onBlur"](value);
  }, []);

  const $showCount = useMemo(() => {
    if(data.showCount){
      return <View className={css.showCount}>{data.maxlength == -1 ? value.length : `${value.length}/${data.maxlength}`}</View>
    }else{
      return null
    }

  }, [data.maxlength,data.showCount,value]);

  return (
    <View className={css.formItem}>
      <Input
        className={cx({
          [css.input]: !isH5(),
          "mybricks-input": !isH5(),
          "mybricks-h5Input": isH5(),
        })}
        value={value}
        type={data.type}
        placeholder={data.placeholder}
        onChange={onChange}
        disabled={data.disabled}
        clearable={data.clearable}
        cursorSpacing={28}
        cursor={value.length}
        onBlur={onBlur}
        maxlength={data.maxlength}
      />
      {$showCount}
    </View>
  );
}
