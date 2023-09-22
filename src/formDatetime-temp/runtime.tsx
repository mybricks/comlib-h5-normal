import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Input, Popup, DatetimePicker } from "brickd-mobile";
import { View, Picker } from '@tarojs/components';
import { ArrowRight } from "@taroify/icons";
import { isObject, isString, isNumber, isEmpty } from "./../utils/core/type";
import dayjs from "dayjs";
import css from './style.less'


const FORMAT_MAP = {
  date: "YYYY-MM-DD",
  time: "HH:mm:ss",
  "year-month": "YYYY-MM",
  "month-day": "MM-DD",
  "date-hour": "YYYY-MM-DD HH",
  "date-minute": "YYYY-MM-DD HH:mm",
  "hour-minute": "HH:mm",
};

const LAST_TEN_YEAR = new Date(
  new Date().setFullYear(new Date().getFullYear() - 10)
);
const AFTER_TEN_YEAR = new Date(
  new Date().setFullYear(new Date().getFullYear() + 10)
);

export default function (props) {

  let _appendChild = document.body.appendChild;

  document.body.appendChild = (e) => {
    console.warn(e);
    _appendChild(e)
  }

  const { env, data, inputs, outputs, slots, parentSlot } = props;

  const [value, setValue] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    inputs["setValue"]((val) => {
      switch (true) {
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

  const onClick = useCallback(() => {
    if (env.runtime) {
      setValue(data.value ? new Date(data.value) : new Date());
      setOpen(true);
    }
  }, [env.runtime, data.value]);

  const onCancel = useCallback(() => {
    setOpen(false);
  }, []);

  const onConfirm = useCallback((date) => {
    console.error(date);
    console.error(date);
    console.error(date);
    return;
    let value = date.valueOf();
    console.warn("datatime", value)

    data.value = value;
    setOpen(false);

    parentSlot?._inputs['onChange']?.({ id: props.id, name: props.name, value })
    outputs["onChange"](value);
  }, []);

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
    return result;
  }, [data.min, data.max]);


  let state = {
    selector: ['美国', '中国', '巴西', '日本'],
    selectorChecked: '美国',
    timeSel: '12:01',
    dateSel: '2018-04-22'
  }

  return (
    <>
      <Picker mode='selector' range={['美国', '中国', '巴西', '日本']} onChange={() => { }}>
        <View className={css.select} onClick={onClick}>
          <Input
            readonly
            disabled={!displayValue}
            placeholder={data.placeholder}
            value={displayValue}
            style={{ flex: 1 }}
          />
          <ArrowRight />
        </View>
      </Picker>

    </>
  );
}
