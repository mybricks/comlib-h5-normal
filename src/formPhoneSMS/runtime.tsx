import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Button } from "@tarojs/components";
import { Input } from "brickd-mobile";
import css from "./style.less";
import cx from "classnames";
import * as Taro from "@tarojs/taro";
import { isEmpty, isString, isNumber, isObject } from "./../utils/core/type";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;
  const [buttonText , setButtonText] = useState(data.buttonText)

  useEffect(()=>{
    setButtonText(data.buttonText)
  },[data.buttonText])

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

    inputs["startCountDown"]((val)=>{
      countDown();
    })
  }, []);

  const countDown = () => {
    if (!data.buttonAvailable) return
    let count = data.smsCountdown;
    const timer = setInterval(() => {
      count--;
      setButtonText(`${count}s 后重试`)
      data.buttonAvailable = false
      if (count <= 0) {
        clearInterval(timer);
        data.buttonAvailable = true;
        setButtonText(data.buttonTextRetry)
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
          {buttonText}
        </Button>
      </View>
    </View>
  );
}
