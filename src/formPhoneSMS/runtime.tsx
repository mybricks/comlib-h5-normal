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
import { isEmpty, isString, isNumber, isObject } from "./../utils/core/type";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;
  const [buttonText, setButtonText] = useState(data.buttonText);

  const timer = useRef(null);

  useEffect(() => {
    setButtonText(data.buttonText);
  }, [data.buttonText]);

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
          break;
      }
    });

    inputs["getValue"]((val, outputRels) => {
      outputRels["returnValue"](data.value);
    });

    inputs["resetValue"]((val) => {
      data.value = null;
    });

    inputs["startCountDown"]((val) => {
      countDown();
    });

    inputs["clearCountDown"](() => {
      clearInterval(timer.current);
      setButtonText(data.buttonTextRetry);
      data.buttonAvailable = true;
    });

    inputs["setButtonDisabled"](() => {
      data.buttonDisabled = true;
    });

    inputs["setButtonEnabled"](() => {
      data.buttonDisabled = false;
    });
  }, []);

  const countDown = useCallback(() => {
    if (!data.buttonAvailable) return;
    let count = data.smsCountdown;
    timer.current = setInterval(() => {
      count--;
      setButtonText(`${count}s 后重试`);
      data.buttonAvailable = false;
      if (count <= 0) {
        clearInterval(timer.current);
        data.buttonAvailable = true;
        setButtonText(data.buttonTextRetry);
      }
    }, 1000);
  }, [
    data.buttonAvailable,
    data.smsCountdown,
    data.buttonTextRetry,
    timer.current,
  ]);

  const onChange = useCallback((e) => {
    let value = e.detail.value;
    data.value = value;
    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value,
    });
    outputs["onChange"](value);
  }, []);

  const onCodeSend = useCallback((e) => {
    if (data.buttonDisabled) return;

    let value = e.detail.value;
    data.value = value;
    if (!data.buttonAvailable) return;
    outputs["onCodeSend"](value);
  }, []);

  return (
    <View className={css.outerPhoneNumber}>
      <View className={css.phoneNumber}>
        <Input
          className={css.input}
          value={data.value}
          placeholder={data.placeholder}
          onChange={onChange}
        />
        <Button
          className={cx({
            [css.button]: true,
            [css.buttonDisabled]: data.buttonDisabled,
            "mybricks-getsms-button": true
          })}
          onClick={onCodeSend}
        >
          {buttonText}
        </Button>
      </View>
    </View>
  );
}
