import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Input, DatetimePicker } from "brickd-mobile";
import { View } from "@tarojs/components";
import { ArrowRight } from "@taroify/icons";
import { isObject, isString, isNumber, isEmpty } from "./../utils/core/type";
import { polyfill_taro_picker } from "./../utils/h5-polyfill";
import dayjs from "dayjs";
import css from "./style.less";

polyfill_taro_picker();

const FORMAT_MAP = {
  date: "YYYY-MM-DD",
  time: "hh:mm",
  "year-month": "YYYY-MM",
  year: "YYYY",
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

  //判断组件是否需要为可交互状态
  const comOperatable = useMemo(() => {
    if (env.edit) {
      return false;
    } else {
      return true;
    }
  }, [env.edit]);

  useEffect(() => {
    inputs["setValue"]((val) => {
      switch (true) {
        case isEmpty(val): {
          data.value = undefined;
          break;
        }
        case isString(val): {
          let value = dayjs(val).valueOf();
          data.value = isNaN(value) ? undefined : value;
          break;
        }

        case isNumber(val):
          data.value = val;
          break;

        case val instanceof Date:
          data.value = val.valueOf();
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
    return dayjs(data.value).format(FORMAT_MAP[data.type]) || "";
  }, [data.value, data.type]);

  const onChange = useCallback((formatDate) => {
    data.value = dayjs(formatDate).valueOf();

    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value: data.value,
    });
    outputs["onChange"](data.value);
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
    return {
      min: dayjs(result.min).format(FORMAT_MAP[data.type]),
      max: dayjs(result.max).format(FORMAT_MAP[data.type]),
    };
  }, [data.min, data.max, data.type]);

  //普通表单视图
  const normalView = useMemo(() => {
    return (
      <View className={css.wrap} key="normalView">
        {/* 防止在搭建态 点击调起日期选择 */}
        {comOperatable ? (
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
        ) : (
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
        )}
      </View>
    );
  }, [
    data.type,
    range.min,
    range.max,
    displayValue,
    data.placeholder,
    data.isSlot,
  ]);

  //切换为插槽视图
  const slotsView = useMemo(() => {
    return (
      <View className={css.slot_default_style} key="slotsView">
        {/* 防止在搭建态 点击调起日期选择 */}
        {comOperatable ? (
          <DatetimePicker
            type={data.type}
            value={displayValue}
            min={range.min}
            max={range.max}
            onChange={onChange}
          >
            {slots?.["content"]?.render({
              style: {
                position: "smart",
                height: "100%",
              },
            })}
          </DatetimePicker>
        ) : (
          slots?.["content"]?.render({
            style: {
              position: "smart",
              height: "100%",
            },
          })
        )}
      </View>
    );
  }, [data.type, range.min, range.max, displayValue, data.isSlot]);

  if (data.isSlot) {
    return slotsView;
  } else {
    return normalView;
  }
}
