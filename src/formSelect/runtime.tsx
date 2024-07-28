import React, { useState, useCallback, useMemo, useEffect } from "react";
import { View } from "@tarojs/components";
import { ArrowRight } from "@taroify/icons";
import { Input, Picker } from "brickd-mobile";
import { isObject, isString, isNumber, isEmpty } from "./../utils/core/type";
import css from "./style.less";
import InputDisplay from "../components/input-display";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;
  const [selectIndex, setSelectIdx] = useState(data.value);
  
  useEffect(() => {
    inputs["setValue"]((val) => {
      switch (true) {
        case isEmpty(val): {
          setSelectIdx("");
          break;
        }
        case isString(val) || isNumber(val):
          // 注意不要使用全等号
          let index = data.options.findIndex((item) => item.value == val);
          setSelectIdx(index);
          break;
        case isObject(val):
          let index = data.options.findIndex(
            (item) => item.value == val[data.name]
          );
          setSelectIdx(index);
          break;
        default:
          break;
      }
    });

    // 设置数据源
    inputs["setOptions"]((val) => {
      if (Array.isArray(val)) {
        data.options = val;
      }
    });
  }, []);

  const onChange = useCallback((index) => {
    setSelectIdx(index);

    const value = data.options?.[index]?.value;

    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value,
    });
    outputs["onChange"](value);
  }, []);

  const selectItem = useMemo(() => {
    return data.options?.[selectIndex];
  }, [selectIndex, data.options]);

  const displayValue = useMemo(() => {
    return !!selectItem;
  }, [selectItem]);

  return (
    <>
      <View className={css.wrap}>
        <Picker value={selectIndex} options={data.options} onChange={onChange}>
          <View className={css.select}>
            {/* <Input
              readonly
              // align="right"
              disabled={!displayValue}
              placeholder={data.placeholder}
              value={selectItem?.label}
              style={{ flex: 1 }}
            /> */}
            <InputDisplay
              placeholder={data.placeholder}
              value={selectItem?.label}
            ></InputDisplay>
            <ArrowRight />
          </View>
        </Picker>
      </View>
      {/* <Popup open={open} rounded placement="bottom" onClose={onCancel}>
        <Popup.Backdrop />
        <Picker
          value={_value}
          onCancel={onCancel}
          onConfirm={onConfirm}
        >
          <Picker.Toolbar>
            <Picker.Button>取消</Picker.Button>
            <Picker.Button>确认</Picker.Button>
          </Picker.Toolbar>
          <Picker.Column>
            {data.options.map((item, index) => {
              return (
                <Picker.Option value={item.value} key={index} disabled={item.disabled ?? false}>
                  {item.label}
                </Picker.Option>
              );
            })}
          </Picker.Column>
        </Picker>
      </Popup> */}
    </>
  );
}
