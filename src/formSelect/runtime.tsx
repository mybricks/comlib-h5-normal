import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { View } from "@tarojs/components";
import { ArrowRight } from "@taroify/icons";
import { Input, Picker } from "brickd-mobile";
import { isObject, isString, isNumber, isEmpty } from "./../utils/core/type";
import css from "./style.less";
import InputDisplay from "../components/input-display";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;
  const _valueCache = useRef(data.value);

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
          return;
      }

      _onChange(data.value);
    });

    // 设置数据源
    inputs["setOptions"]((val) => {
      if (Array.isArray(val)) {
        data.options = val;
      }
    });
  }, []);

  const onChange = useCallback((index) => {
    const value = data.options?.[index]?.value;
    data.value = value;

    _onChange(data.value);
  }, []);

  const onCancel = useCallback(() => {
    _onChange(data.value);
  }, [data.value, data.options]);

  const selectItem = useMemo(() => {
    let item = data.options.find((item) => {
      return item.value == data.value;
    });

    return (
      item || {
        label: data.value,
        value: data.value,
      }
    );
  }, [data.value, data.options]);

  const displayValue = useMemo(() => {
    return !!selectItem;
  }, [selectItem]);

  const selectIndex = useMemo(() => {
    return data.options.findIndex((item) => item.value == data.value);
  }, [data.value, data.options]);

  const _onChange = useCallback((value) => {
    if (value == _valueCache.current) {
      return;
    }
    _valueCache.current = value;

    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value,
    });

    outputs["onChange"](value);
  }, []);

  return (
    <>
      <View className={css.wrap}>
        <Picker
          value={selectIndex}
          options={data.options}
          onChange={onChange}
          onCancel={onCancel}
        >
          <View className={css.select}>
            <InputDisplay
              placeholder={data.placeholder}
              value={selectItem?.label}
            ></InputDisplay>
            <ArrowRight />
          </View>
        </Picker>
      </View>
    </>
  );
}
