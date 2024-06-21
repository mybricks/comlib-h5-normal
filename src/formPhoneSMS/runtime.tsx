import React, { useCallback, useEffect, useMemo } from "react";
import { View, Button } from "@tarojs/components";
import { Input } from "brickd-mobile";
import css from "./style.less";
import cx from "classnames";
import * as Taro from "@tarojs/taro";
import { isEmpty, isString, isNumber, isObject } from "./../utils/core/type";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;

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

    inputs["resetValue"]((val)=>{
      data.value = null;
    });
  }, []);

  const countDown = () => {
    if (!data.buttonAvailable) return
    let count = data.smsCountdown;
    let _buttonText = data.buttonText;
    const timer = setInterval(() => {
      count--;
      data.buttonText = `${count}s 后重试`;
      data.buttonAvailable = false
      if (count <= 0) {
        clearInterval(timer);
        data.buttonAvailable = true;
        data.buttonText = _buttonText;
      }
    }, 1000);
  }

  

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
      let value = e.detail.value;
      data.value = value;

      countDown();
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
          className={css.button}
          id="mybricks-getsms-button"
          onClick={onCodeSend}
        >
          {data.buttonText || "获取验证码"}
        </Button>
      </View>
    </View>
  );
}
