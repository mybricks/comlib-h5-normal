import React, { useState, useCallback, useMemo, useEffect } from "react";
import { View, RootPortal } from "@tarojs/components";
import * as Taro from "@tarojs/taro";
import { ArrowRight } from "@taroify/icons";
import { isObject, isString, isNumber, isEmpty } from "./../utils/core/type";
import { polyfill_taro_picker } from "./../utils/h5-polyfill";
import dayjs from "dayjs";
import css from "./style.less";
import InputDisplay from "../components/input-display";
import useFormItemValue from "../utils/hooks/useFormItemValue.ts";
import cx from "classnames";
import Picker from "../components/taroify/datetime-picker";
import { createPortal } from "@tarojs/react";

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
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerVisible, setShowPickerVisible] = useState(false);
  const [value, setValue, getValue] = useFormItemValue(data.value, (val) => {
    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value: val,
    });
    outputs["onChange"](val);
  });
  const [valueInDate, setvalueInDate] = useState<Date | undefined>(undefined);

  const [targetElement, setTargetElement] = useState();

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
    setValue(data.value);
  }, [data.value]);

  useEffect(() => {
    //设置值
    inputs["setValue"]((val, rel) => {
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
      rel["setValueComplete"](val);
    });

    //重置值
    inputs["resetValue"]((val, rel) => {
      setValue(undefined);
      rel["resetValueComplete"](val);
    });

    //设置placeholder
    inputs["setPlaceholder"]((val) => {
      data.placeholder = val;
    });

    //设置禁用
    inputs["setDisabled"]((val) => {
      data.disabled = val;
    });

    //设置标题
    inputs["setLabel"]?.((val) => {
      if (!isString(val)) {
        return;
      }

      parentSlot?._inputs["setProps"]?.({
        id: props.id,
        name: props.name,
        value: {
          label: val,
        },
      });
    });
  }, []);

  useEffect(() => {
    //获取值
    inputs["getValue"]((val, rel) => {
      rel["returnValue"](value);
    });
  }, [value]);

  const onChange = useCallback((formatDate) => {
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
      dateTime = new Date(formatDate);
    }

    // 检查解析后的日期是否有效
    if (isNaN(dateTime.valueOf())) {
      console.error("Invalid date format:", formatDate);
      return;
    }

    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value: dateTime.valueOf(),
    });
    outputs["onChange"](dateTime.valueOf());
  }, []);

  const onConfirm = useCallback((e) => {
    console.log("onConfirm", e);
    setValue(e.valueOf());
    setShowPicker(false);
    outputs["onConfirm"](e.valueOf());
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

  const onShowPicker = () => {
    if (data.disabled) return;
    if (!isRelEnv && !env.edit) {
      Taro.showToast({
        title: "时间选择仅支持真机端",
        icon: "none",
        duration: 1000,
      });
      return;
    }
    setShowPicker(true);
  };

  useEffect(() => {
    if (!isRelEnv) return;

    // 先获取看有没有mybricks弹窗, 挂在弹窗上面
    const query = Taro.createSelectorQuery();
    query
      .select(".mybricks-overlay")
      .node()
      .exec((res) => {
        if (res[0]) {
          setTargetElement(res[0].node);
        } else {
          // 如果前面没有检测到mybricks弹窗，挂在root上面
          const query2 = Taro.createSelectorQuery();
          query2
            .select("#root")
            .node()
            .exec((res) => {
              if (res[0]) {
                setTargetElement(res[0].node);
              }
            });
        }
      });
  }, []);

  useEffect(() => {
    if (!value) return;
    setvalueInDate(new Date(value));
  }, [value]);

  const timePicker = useMemo(() => {
    return (
      <View
        onClick={() => setShowPicker(false)}
        className={cx({
          [css.popup_overlay]: true,
          [css.visible]: showPickerVisible,
        })}
      >
        <View
          className={css.popup_content}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Picker
            type={data.type}
            formatter={(type, val) => {
              if (type === "year") {
                return `${val}年`;
              }
              if (type === "month") {
                return `${val}月`;
              }
              if (type === "day") {
                return `${val}日`;
              }
              if (type === "hour") {
                return `${val}时`;
              }
              if (type === "minute") {
                return `${val}分`;
              }
              if (type === "second") {
                return `${val}秒`;
              }
              return val;
            }}
            onChange={onChange}
            onConfirm={(e) => {
              onConfirm(e);
            }}
            onCancel={() => {
              setShowPicker(false);
            }}
            defaultValue={valueInDate}
            min={new Date(range.min)}
            max={new Date(range.max)}
          >
            <Picker.Toolbar>
              <Picker.Button>取消</Picker.Button>
              <Picker.Title>{data.selectorTitle}</Picker.Title>
              <Picker.Button>确认</Picker.Button>
            </Picker.Toolbar>
          </Picker>
        </View>
      </View>
    );
  }, [
    range.min,
    range.max,
    valueInDate,
    showPickerVisible,
    data.type,
    data.selectorTitle,
  ]);

  //延时显示，用于整体弹窗渐显动画
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPickerVisible(showPicker);
    }, 100);

    return () => clearTimeout(timer);
  }, [showPicker]);

  const $popup = useMemo(() => {
    if (showPicker) {
      if (process.env.TARO_ENV === "weapp") {
        return <RootPortal>{timePicker}</RootPortal>;
      }

      if (process.env.TARO_ENV === "h5") {
        if (!targetElement) return null;
        return createPortal(<View>{timePicker}</View>, targetElement);
      }
    } else {
      return null;
    }
  }, [
    timePicker,
    showPicker,
    targetElement,
    process.env.TARO_ENV,
    showPickerVisible,
  ]);

  const timeDisplay = useCallback(
    (timestamp) => {
      if (!timestamp) return null;
      const date = new Date(timestamp);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      if (data.type == "date") {
        return `${year}年${month}月${day}日`;
      }
      if (data.type == "time") {
        return `${hours}时${minutes}分`;
      }
      if (data.type == "year-month") {
        return `${year}年${month}月`;
      }
      if (data.type == "date-hour") {
        return `${year}年${month}月${day}日 ${hours}时`;
      }
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    [data.type]
  );

  const normalView = useMemo(() => {
    return (
      <View className={cx(css.wrap)} key="normalView">
        <View onClick={onShowPicker} className={css.select}>
          <InputDisplay
            placeholder={data.placeholder}
            value={timeDisplay(value)}
            disabled={data.disabled}
          ></InputDisplay>
          <ArrowRight />
        </View>
        {$popup}
      </View>
    );
  }, [$popup, data.placeholder, value, data.disabled]);

  const slotsView = useMemo(() => {
    return (
      <View
        key="slotsView"
        className={css.slot_default_style}
        onClick={onShowPicker}
      >
        {slots?.["content"]?.render({
          style: {
            height: "100%",
          },
        })}
        {$popup}
      </View>
    );
  }, [$popup]);

  if (data.isSlot) {
    return slotsView;
  } else {
    return normalView;
  }
}
