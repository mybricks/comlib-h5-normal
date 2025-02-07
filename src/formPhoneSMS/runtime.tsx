import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Button } from "@tarojs/components";
import { Input } from "brickd-mobile";
import css from "./style.less";
import cx from "classnames";
import * as Taro from "@tarojs/taro";
import useFormItemValue from "../utils/hooks/useFormItemValue.ts";
import { isEmpty, isString, isNumber, isObject } from "./../utils/type";
import { isH5 } from "../utils/env";
import cx from "classnames";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;

  const [value, setValue, getValue] = useFormItemValue(data.value, (val) => {
    //
    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value: val,
    });

    //
    outputs["onChange"](val);
  });

  //
  const timer = useRef(null);
  const countDownRef = useRef(null);

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
    /* 设置值 */
    inputs["setValue"]((val, outputRels) => {
      let result;

      switch (true) {
        case isEmpty(val): {
          result = "";
          break;
        }
        case isString(val) || isNumber(val): {
          result = `${val}`;
          break;
        }
        default:
          // 其他类型的值，直接返回
          return;
      }

      setValue(result);
      outputRels["setValueComplete"]?.(result); // 表单容器调用 setValue 时，没有 outputRels
    });

    /* 获取值 */
    inputs["getValue"]((val, outputRels) => {
      outputRels["returnValue"](getValue());
    });

    /* 重置值 */
    inputs["resetValue"]((val, outputRels) => {
      setValue("");
      outputRels["resetValueComplete"]?.("");
    });

    /* 设置标题 */
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

    /* 设置提示内容 */
    inputs["setPlaceholder"]((val) => {
      data.placeholder = val;
    });

    /* 清除倒计时 */
    inputs["clearCountDown"]((val) => {
      clearTimeout(timer.current);
      countDownRef.current = 0;
      data.buttonText = data.buttonTextRetry;
    });

    /* 设置禁用 */
    inputs["setDisabled"]?.((val, outputRels) => {
      data.disabled = !!val;
      outputRels["setDisabledComplete"]?.(data.disabled);
    });
  }, []);

  const countDown = useCallback(
    (cd, callback) => {
      countDownRef.current = cd;
      data.buttonText = `${cd}s 后重试`;

      if (typeof callback === "function") {
        callback();
      }

      timer.current = setTimeout(() => {
        countDownRef.current--;

        if (countDownRef.current > 0) {
          countDown(countDownRef.current);
        } else {
          data.buttonText = data.buttonTextRetry;
        }
      }, 1000);
    },
    [data.buttonTextRetry]
  );

  const onChange = useCallback((e) => {
    let value = e.detail.value;
    setValue(value);
  }, []);

  const onBlur = useCallback((e) => {
    let value = e.detail.value;
    outputs["onBlur"](value);
  }, []);

  const onCodeSend = useCallback(
    (e) => {
      if (!env.runtime) {
        return;
      }

      e.stopPropagation();

      // 禁用时不可点击
      if (data.disabled) {
        return;
      }

      // 倒计时中不可点击
      if (countDownRef.current > 0) {
        return;
      }

      // 发送验证码，并开始倒计时
      countDown(data.smsCountdown, () => {
        outputs["onCodeSend"]();
      });
    },
    [countDownRef.current]
  );

  return (
    <View
      className={cx({
        [css.phoneSMS]: true,
        "mybricks-phoneSMS": !isH5(),
        "mybricks-h5PhoneSMS": isH5(),
      })}
    >
      <Input
        className={css.input}
        value={value}
        placeholder={data.placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      <Button
        className={cx({
          [css.button]: true,
          [css.enabled]: !data.disabled && countDownRef.current <= 0,
          "mybricks-button": !data.disabled && countDownRef.current <= 0,
          [css.disabled]: data.disabled || countDownRef.current > 0,
          "mybricks-button-disabled": data.disabled || countDownRef.current > 0,
        })}
        onClick={onCodeSend}
      >
        {data.buttonText}
      </Button>
    </View>
  );
}
