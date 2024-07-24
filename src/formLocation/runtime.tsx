import React, { useState, useCallback, useMemo, useEffect } from "react";
import { View} from "@tarojs/components";
import cx from "classnames";
import { ArrowRight } from "@taroify/icons";
import { Field, Input, AreaPicker} from "brickd-mobile";
import { isObject, isString, isEmpty } from "./../utils/core/type";
import css from "./style.less";
import * as Taro from "@tarojs/taro";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;

  const isRelEnv = useMemo(() => {
    if (env.runtime.debug || env.edit) {
      return false;
    } else {
      return true;
    }
  }, [env]);

  useEffect(() => {
    //
    inputs["setValue"]((val) => {
      switch (true) {
        case isEmpty(val): {
          data.value = "";
          break;
        }
        case isString(val):
          data.value = val;
          break;
        case isObject(val):
          data.value = val[data.name];
          break;
        default:
          break;
      }
    });

    // 输入框类型
    inputs["changeType"]((val) => {
      data.type = val;
    });
  }, []);

  const onChangeText = useCallback((e) => {
    let value = e.detail.value;
    data.value = value;

    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value,
    });
    outputs["onChange"](value);
  }, []);

  const onChange = useCallback((val) => {
    let value = val.join("/");
    data.value = value;

    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value,
    });
    outputs["onChange"](value);
  }, []);

  const _value = useMemo(() => {
    return data.value.split("/");
  }, [data.value]);

  const toast = ()=>{
    Taro.showToast({
      title: '地区选择组件仅支持小程序端',
      icon: 'none',
      duration: 1000
    })
  }

  const pickerEditTime = useMemo(() => {
    return (<View className={css.select} onClick={()=>{toast()}}>
      <Input
        readonly
        disabled={!data.value}
        placeholder={data.placeholder}
        value={data.value}
        style={{ flex: 1 }}
      />
      <ArrowRight />
    </View>)

  }, [data])

  const pickerRunTime = useMemo(() => {
    return (<AreaPicker value={_value} onChange={onChange}>
      <View className={css.select}>
        <Input
          readonly
          disabled={!data.value}
          placeholder={data.placeholder}
          value={data.value}
          style={{ flex: 1 }}
        />
        <ArrowRight />
      </View>
    </AreaPicker>)

  }, [data,_value])

  return (
    <View className={css.wrap}>
      {data.type === "text" ? (
        <Input
          placeholder={data.placeholder}
          value={data.value}
          onChange={onChangeText}
        />
      ) : null}

      {data.type === "select" ? (
        isRelEnv ? pickerRunTime : pickerEditTime
      ) : null}
    </View>
  );
}
