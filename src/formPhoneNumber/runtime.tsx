import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { View, Button } from "@tarojs/components";
import { Input } from "brickd-mobile";
import css from "./style.less";
import cx from "classnames";
import * as Taro from "@tarojs/taro";
import { isEmpty, isString, isNumber, isObject } from "./../utils/core/type";

export default function (props) {
  const { env, data, inputs, outputs, slots, parentSlot } = props;

  const _valueCache = useRef(data.value);

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
          return;
      }

      _onChange(data.value);
    });

    inputs["getValue"]((val, outputRels) => {
      outputRels["returnValue"](data.value);
    });

    // 设置禁用
    inputs["setDisabled"](() => {
      data.disabled = true;
    });

    // 设置启用
    inputs["setEnabled"](() => {
      data.disabled = false;
    });

    inputs["resetValue"]((val) => {
      data.value = null;
      _onChange(data.value);
    });
  }, []);

  const openType = useMemo(() => {
    switch (true) {
      case data.getPhoneNumberMethods === "getPhoneNumber": {
        return {
          openType: "getPhoneNumber",
          onGetPhoneNumber: (e) => {
            if (!!e.detail.errno) {
              outputs["getPhoneNumberFail"]({
                ...e.detail,
              });
            } else {
              outputs["getPhoneNumberSuccess"]({
                ...e.detail,
              });
            }
          },
        };
      }

      case data.getPhoneNumberMethods === "getRealtimePhoneNumber": {
        return {
          openType: "getRealtimePhoneNumber",
          onGetRealtimePhoneNumber: (e) => {
            if (!!e.detail.errno) {
              outputs["getRealtimePhoneNumberFail"]({
                ...e.detail,
              });
            } else {
              outputs["getRealtimePhoneNumberSuccess"]({
                ...e.detail,
              });
            }
          },
        };
      }

      default: {
        // 命中兜底逻辑
        return null;
      }
    }
  }, [data.getPhoneNumberMethods, data.buttonText, env.runtime]);

  const onChange = useCallback((e) => {
    let value = e.detail.value;
    data.value = value;

    _onChange(value);
  }, []);

  const _onChange = useCallback((value) => {
    if (value == _valueCache.current) {
      return;
    }
    _valueCache.current = value;

    parentSlot?._inputs["onChange"]?.({
      id: props.id,
      name: props.name,
      value,
    });

    outputs["onChange"](value);
  }, []);

  return (
    <View className={css.outerPhoneNumber}>
      <View className={css.phoneNumber}>
        <Input
          className={css.input}
          value={data.value}
          placeholder={data.placeholder}
          onChange={onChange}
          disabled={
            data.getPhoneNumberMethods === "getRealtimePhoneNumber" ||
            data.getPhoneNumberMethods === "getPhoneNumber"
              ? true
              : false
          }
        />
        {data.getPhoneNumberMethods !== "customInput" && (
          <Button
            className={cx("mybricks-getphonenumber-button", css.button)}
            {...openType}
          >
            {data.buttonText || "点击授权"}
          </Button>
        )}
      </View>
    </View>
  );
}
