import React, { useState, useCallback, useMemo, useEffect } from "react";
import { View } from "@tarojs/components";
import cx from "classnames";
import { ArrowRight } from "@taroify/icons";
import { Field, Input, AreaPicker } from "brickd-mobile";
import { isObject, isString, isEmpty } from "./../utils/core/type";
import css from "./style.less";
import * as Taro from "@tarojs/taro";
import InputDisplay from "../components/input-display";

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
          data.value = [];
          break;
        }
        case isString(val):
          data.value = [val];
          break;
        case Array.isArray(val):
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
  }, []);

  const onChange = useCallback((val) => {
    data.value = val;

    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value: val,
    });
    outputs["onChange"](val);
  }, []);

  const toast = () => {
    Taro.showToast({
      title: "地区选择仅支持小程序真机端",
      icon: "none",
      duration: 1000,
    });
  };

  const pickerEditTime = useMemo(() => {
    return (
      <View
        className={css.select}
        onClick={() => {
          toast();
        }}
      >
        <InputDisplay
          placeholder={data.placeholder}
          value={data.value.join("/")}
        ></InputDisplay>
        <ArrowRight />
      </View>
    );
  }, [data.value, data.placeholder]);

  const pickerRunTime = useMemo(() => {
    return (
      <AreaPicker level={data.level} value={data.value} onChange={onChange}>
        <View className={css.select}>
          <Input
            readonly
            // disabled={true}
            placeholder={data.placeholder}
            value={data.value.join("/")}
            style={{ flex: 1 }}
          />
          <ArrowRight />
        </View>
      </AreaPicker>
    );
  }, [data.value, data.placeholder]);

  return (
    <View className={css.wrap}>
      {isRelEnv ? pickerRunTime : pickerEditTime}
    </View>
  );
}
