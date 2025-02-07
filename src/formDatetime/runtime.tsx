import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Input, DatetimePicker } from "brickd-mobile";
import { View } from "@tarojs/components";
import { ArrowRight, Cross } from "@taroify/icons";
import { isObject, isString, isNumber, isEmpty } from "./../utils/core/type";
import { polyfill_taro_picker } from "./../utils/h5-polyfill";
import dayjs from "dayjs";
import css from "./style.less";
import InputDisplay from "../components/input-display";
import useFormItemValue from "../utils/hooks/useFormItemValue.ts";
import cx from "classnames";

polyfill_taro_picker();

const FORMAT_MAP = {
  date: "YYYY-MM-DD",
  time: "HH:mm",
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

  const [value, setValue, getValue] = useFormItemValue(data.value, (val) => {
    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value: val,
    });
    outputs["onChange"](val);
  });

  //判断组件是否需要为可交互状态
  const comOperatable = useMemo(() => {
    if (env.edit) {
      return false;
    } else {
      return true;
    }
  }, [env.edit]);

  useEffect(() => {
    parentSlot?._inputs["setProps"]?.({
      id: props.id,
      name: props.name,
      value: {
        visible: props.style.display !== "none",
      },
    });
  }, [props.style.display]);

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

    inputs["resetValue"]((val, relOutputs) => {
      data.value = void 0;
      relOutputs["resetValueComplete"]("");
    });

    /* 设置禁用 */
    inputs["setDisabled"]?.((val, outputRels) => {
      data.disabled = !!val;
      outputRels["setDisabledComplete"]?.(data.disabled);
    });
  }, []);

  useEffect(() => {
    inputs["getValue"]((val, relOutputs) => {
      relOutputs["returnValue"](value);
    });
  }, [value]);

  const displayValue = useMemo(() => {
    if (!data.value) {
      return "";
    }
    return dayjs(data.value).format(FORMAT_MAP[data.type]) || "";
  }, [data.value, data.type]);

  useEffect(() => {
    setValue(data.value);
  }, [data.value]);

  const onChange = useCallback(
    (formatDate) => {
      // 检查输入的字符串是否是时间格式
      const timePattern = /^\d{2}:\d{2}$/;
      let dateTime;

      if (timePattern.test(formatDate)) {
        // 如果是时间格式，使用当前日期
        const currentDate = new Date();
        const [hours, minutes] = formatDate.split(":").map(Number);

        // 设置本地时间
        dateTime = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          hours,
          minutes
        );
      } else {
        // 否则，直接解析输入的日期时间字符串
        dateTime = new Date(dayjs(formatDate).toDate());
      }

      // 检查解析后的日期是否有效
      if (isNaN(dateTime.valueOf())) {
        console.error("Invalid date format:", formatDate);
        return;
      }

      if (data.type == "date" && data.outputType == "YYYY-MM-DD") {
        //日期选择，且格式为 YYYY-MM-DD
        let timestamp = dateTime.valueOf();
        let YMD = dayjs(timestamp).format("YYYY-MM-DD");
        data.value = YMD;
        setValue(YMD);
      } else {
        data.value = dateTime.valueOf();
        setValue(data.value);
      }
    },
    [data.type, data.outputType]
  );

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

    //格式为mm:ss,需要把年月日补齐,否则无法正确识别出区间
    if (data.type === "time") {
      return {
        min: dayjs(result.min).format("YYYY-MM-DD HH:mm"),
        max: dayjs(result.max).format("YYYY-MM-DD HH:mm"),
      };
    }

    return {
      min: dayjs(result.min).format(FORMAT_MAP[data.type]),
      max: dayjs(result.max).format(FORMAT_MAP[data.type]),
    };
  }, [data.min, data.max, data.type]);

  const clearSelect = useCallback((e) => {
    e.stopPropagation();
    data.value = void 0;
    outputs["onChange"](void 0);
  }, []);

  const RightBtn = useMemo(() => {
    if (!data.clearable) {
      return <ArrowRight />;
    }
    if (displayValue == "") {
      return <ArrowRight />;
    } else {
      return (
        <View onClick={clearSelect}>
          <Cross size="13" />
        </View>
      );
    }
  }, [data.clearable, displayValue]);

  //普通表单视图
  const normalView = useMemo(() => {
    return (
      <View className={cx(css.wrap, "mybricks-datetime")} key="normalView">
        {/* 防止在搭建态 点击调起日期选择 */}
        {comOperatable && !data.disabled ? (
          <DatetimePicker
            readonly={data.disabled}
            type={data.type}
            value={displayValue}
            min={range.min}
            max={range.max}
            onChange={onChange}
          >
            <View className={css.select}>
              <InputDisplay
                placeholder={data.placeholder}
                value={displayValue}
              ></InputDisplay>
              {RightBtn}
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
            {RightBtn}
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
      <View
        className={cx(css.slot_default_style, "mybricks-datetime")}
        key="slotsView"
      >
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
                height: "100%",
              },
            })}
          </DatetimePicker>
        ) : (
          slots?.["content"]?.render({
            style: {
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
