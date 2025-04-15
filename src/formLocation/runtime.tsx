import React, { useState, useCallback, useMemo, useEffect } from "react";
import { View } from "@tarojs/components";
import cx from "classnames";
import { ArrowRight } from "@taroify/icons";
import { Field, Input, AreaPicker } from "brickd-mobile";
import { isObject, isString, isEmpty } from "./../utils/core/type";
import css from "./style.less";
import * as Taro from "@tarojs/taro";
import InputDisplay from "../components/input-display";
import useFormItemValue from "../utils/hooks/useFormItemValue.ts";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;

  const [value, setValue, getValue] = useFormItemValue(data.value, (val) => {
    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value: val,
    });

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

    /* 设置禁用 */
    inputs["setDisabled"]?.((val, outputRels) => {
      data.disabled = !!val;
      outputRels["setDisabledComplete"]?.(data.disabled);
    });
  }, []);

  const onChange = useCallback((val) => {
    data.value = val;
    // parentSlot?._inputs["onChange"]?.({
    //   id: props.id,
    //   name: props.name,
    //   value: val,
    // });
    // outputs["onChange"](val);
  }, []);

  useEffect(() => {
    setValue(data.value);
  }, [data.value]);

  const toast = useCallback(() => {
    if (env.runtime.debug) {
      Taro.showToast({
        title: "地区选择仅支持小程序真机端",
        icon: "none",
        duration: 1000,
      });
    }
  }, [env]);

  const $view = useMemo(() => {
    if (isRelEnv) {
      //真机运行态
      return (
        <AreaPicker
          readonly={data.disabled}
          disabled={data.disabled}
          level={data.level}
          value={value}
          onChange={onChange}
        >
          {/* 非插槽视图 */}
          {!data.isSlot && (
            <View className={css.select}>
              <Input
                readonly
                // disabled={true}
                placeholder={data.placeholder}
                value={value.join("/")}
                style={{ flex: 1 }}
              />
              <ArrowRight />
            </View>
          )}
          {/* 插槽视图 */}
          {data.isSlot && (
            <View className={css.slot_style}>
              {slots?.["content"]?.render({
                style: {
                  // position: "smart",
                  height: "100%",
                },
              })}
            </View>
          )}
        </AreaPicker>
      );
    } else {
      //调试态
      return (
        <View>
          {/* 非插槽视图 */}
          {!data.isSlot && (
            <View
              className={cx(css.select,"mybricks-display")}
              onClick={() => {
                toast();
              }}
            >
              <InputDisplay
                placeholder={data.placeholder}
                value={value.join("/")}
              ></InputDisplay>
              <ArrowRight />
            </View>
          )}
          {/* 插槽视图 */}
          {data.isSlot && (
            <View
              className={css.slot_style}
              onClick={() => {
                toast();
              }}
            >
              {slots?.["content"]?.render({
                style: {
                  // position: "smart",
                  height: "100%",
                },
              })}
            </View>
          )}
        </View>
      );
    }
  }, [value, data.placeholder, isRelEnv, env, data.isSlot]);

  return (
    <View
      className={cx({
        [css.wrap]: true,
        "mybricks-formLocation": true,
        [css.slot_style]: data.isSlot,
      })}
    >
      {$view}
    </View>
  );
}
