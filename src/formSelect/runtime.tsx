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

  const onChange = useCallback(
    (index) => {
      console.log("onChange", index);
      setSelectIdx(+index);

      const value = data.options?.[index]?.value;

      parentSlot?._inputs["onChange"]?.({
        id: props.id,
        name: props.name,
        value,
      });
      outputs["onChange"](value);
    },
    [setSelectIdx]
  );

  const onCancel = useCallback(
    (e) => {
      const value = data.options?.[selectIndex]?.value;

      parentSlot?._inputs["onCancel"]?.({
        id: props.id,
        name: props.name,
        value,
      });
      outputs["onCancel"](value);
    },
    [selectIndex, data.options]
  );

  const selectItem = useMemo(() => {
    return data.options?.[selectIndex];
  }, [selectIndex, data.options]);

  const displayValue = useMemo(() => {
    return !!selectItem;
  }, [selectItem]);

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
    </>
  );
}
