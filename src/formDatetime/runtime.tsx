import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Input, DatetimePicker } from "brickd-mobile";
import { View } from '@tarojs/components';
import { ArrowRight } from "@taroify/icons";
import { isObject, isString, isNumber, isEmpty } from "./../utils/core/type";
import { polyfill_taro_picker } from './../utils/h5-polyfill'
import dayjs from "dayjs";
import css from './style.less'

polyfill_taro_picker()

const FORMAT_MAP = {
  date: "YYYY-MM-DD",
  time: "hh:mm",
  "year-month": "YYYY-MM",
  "year": "YYYY"
  // "month-day": "MM-DD",
  // "date-hour": "YYYY-MM-DD HH",
  // "date-minute": "YYYY-MM-DD HH:mm",
  // "hour-minute": "HH:mm",
};

const LAST_TEN_YEAR = new Date(
  new Date().setFullYear(new Date().getFullYear() - 10)
);
const AFTER_TEN_YEAR = new Date(
  new Date().setFullYear(new Date().getFullYear() + 10)
);

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;

  // const [value, setValue] = useState(new Date());
  // const [open, setOpen] = useState(false);


  // console.log('env.canvasElement', env.canvasElement)

  useEffect(() => {
    inputs["setValue"]((val) => {
      switch (true) {
        case isEmpty(val): {
          data.value = undefined;
          break;
        }
        case isString(val):
          data.value = dayjs(val).valueOf();
          // outputs["onChange"]({ name: data.name, value: data.value });
          break;

        case isNumber(val):
          data.value = val;
          // outputs["onChange"]({ name: data.name, value: data.value });
          break;

        case val instanceof Date:
          data.value = val.valueOf();
          // outputs["onChange"]({ name: data.name, value: data.value });
          break;

        case isObject(val):
          let _value = val[data.name];
          switch (true) {
            case typeof _value === "string":
              _value = dayjs(_value).valueOf();
              break;

            case typeof _value === "number":
              _value = _value;
              break;

            case _value instanceof Date:
              _value = _value.valueOf();
              break;
          }
          data.value = _value;
          // outputs["onChange"]({ name: data.name, value: data.value });
          break;
        default:
          break;
      }
    });
  }, []);

  const displayValue = useMemo(() => {
    if (!data.value) {
      return "";
    }
    return dayjs(data.value).format(FORMAT_MAP[data.type]);
  }, [data.value, data.type]);

  // const onClick = useCallback(() => {
  //   if (env.runtime) {
  //     setValue(data.value ? new Date(data.value) : new Date());
  //     setOpen(true);
  //   }
  // }, [env.runtime, data.value]);

  // const onCancel = useCallback(() => {
  //   setOpen(false);
  // }, []);

  // const onConfirm = useCallback((date) => {
  //   let value = date.valueOf();
  //   console.warn("datatime", value)

  //   data.value = value;
  //   setOpen(false);

  //   parentSlot?._inputs['onChange']?.({ id: props.id, name: props.name, value })
  //   outputs["onChange"](value);
  // }, []);

  const onChange = useCallback((formatDate) => {
    data.value = dayjs(formatDate).valueOf()

    parentSlot?._inputs['onChange']?.({ id: props.id, name: props.name, value: data.value })
    outputs["onChange"](data.value);
  }, [])

  const range = useMemo(() => {
    function format(input) {
      if (input === "now") {
        return new Date();
      } else {
        return new Date(input);
      }
    }

    let result = {
      min: isEmpty(data.min) ? LAST_TEN_YEAR : format(data.min),
      max: isEmpty(data.max) ? AFTER_TEN_YEAR : format(data.max),
    };
    return {
      min: dayjs(result.min).format(FORMAT_MAP[data.type]),
      max: dayjs(result.max).format(FORMAT_MAP[data.type]),
    };
  }, [data.min, data.max, data.type]);

  return (
    <>
      {/* <Field
        readonly
        label={data.label}
        name={data.name}
        rightIcon={<ArrowRight />}
        onClick={onClick}
      > */}
      <View className={css.wrap}>
        <DatetimePicker
          type={data.type}
          value={displayValue}
          min={range.min}
          max={range.max}
          onChange={onChange}
        >
          <View className={css.select}>
            <Input
              readonly
              disabled={!displayValue}
              placeholder={data.placeholder}
              value={displayValue}
              style={{ flex: 1 }}
            />
            <ArrowRight />
          </View>
        </DatetimePicker>
      </View>
      {/* </Field> */}
      {/* <Popup open={open} rounded placement="bottom" onClose={onCancel}>
        <DatetimePicker
          type={data.type}
          value={value}
          min={range.min}
          max={range.max}
          onCancel={onCancel}
          onConfirm={onConfirm}
        >
          <DatetimePicker.Toolbar>
            <DatetimePicker.Button>取消</DatetimePicker.Button>
            <DatetimePicker.Button>确认</DatetimePicker.Button>
          </DatetimePicker.Toolbar>
        </DatetimePicker>
      </Popup> */}
    </>
  );
}
