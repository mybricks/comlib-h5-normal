import React, { useState, useCallback, useMemo, useEffect } from "react";
import { View } from "@tarojs/components";
import { ArrowRight } from "@taroify/icons";
import { Input, Picker } from "brickd-mobile";
import { isObject, isString, isNumber, isEmpty } from './../utils/core/type';
import css from './style.less'

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;
  const [selectIndex, setSelectIdx] = useState(data.value);
  // const [_value, _setValue] = useState(null);
  // const [open, setOpen] = useState(false);

  // const onClick = useCallback(() => {
  //   if (env.runtime) {
  //     _setValue(value);
  //     setOpen(true);
  //   }
  // }, [env.runtime, value]);

  // const onCancel = useCallback(() => {
  //   setOpen(false);
  // }, []);

  // const onConfirm = useCallback((values) => {
  //   let value = values[0];

  //   setValue(value);
  //   setOpen(false);

  //   parentSlot?._inputs['onChange']?.({ id: props.id, name: props.name, value })
  //   outputs["onChange"](value);
  // }, []);

  useEffect(() => {
    inputs["setValue"]((val) => {
      switch (true) {
        case isEmpty(val): {
          setSelectIdx('')
          break;
        }
        case isString(val) || isNumber(val):
          setSelectIdx(val);
          break;
        case isObject(val):
          setSelectIdx(val[data.name]);
          break;
        default:
          break;
      }
    });

    // 设置数据源
    inputs['setOptions']((val) => {
      if (Array.isArray(val)) {
        data.options = val;
      }
    });
  }, []);
  
  const onChange = useCallback((index) => {
    setSelectIdx(index)

    const value = data.options?.[index]?.value

    parentSlot?._inputs['onChange']?.({ id: props.id, name: props.name, value })
    outputs["onChange"](value);
  }, [])

  const selectItem = useMemo(() => {
    return data.options?.[selectIndex];
  }, [selectIndex, data.options])

  const displayValue = useMemo(() => {
    return !!selectItem
  }, [selectItem])

  return (
    <>
      <View className={css.wrap}>
        <Picker value={selectIndex} options={data.options} onChange={onChange}>
          <View className={css.select}>
            <Input
              readonly
              // align="right"
              disabled={!displayValue}
              placeholder={data.placeholder}
              value={selectItem?.value}
              style={{ flex: 1 }}
            />
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
