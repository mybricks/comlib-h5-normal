import React, { useCallback, useEffect, useMemo } from "react";
import { View, Button } from "@tarojs/components";
import { Input } from "brickd-mobile";
import css from "./style.less";
import cx from "classnames";
import * as Taro from "@tarojs/taro";

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

    // 设置禁用
    inputs["setDisabled"](() => {
      data.disabled = true;
    });

    // 设置启用
    inputs["setEnabled"](() => {
      data.disabled = false;
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
      case data.getPhoneNumberMethods === "customInput": {
        return {
          onClick: () => {
            console.log("点击了发送验证码", data.smsCountdown); 
            countDown();
            outputs["onCodeSend"](data.value);
          }
        }
      }

      default: {
        console.log("命中兜底逻辑");
        return null;
      }
    }
  }, [data.getPhoneNumberMethods, data.buttonText, env.runtime]);

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

  // const onGetPhoneNumber = useCallback(
  //   (e) => {
  //     if (!env.runtime) {
  //       return;
  //     }

  //     if (!!e.detail.errno) {
  //       //noop
  //       return;
  //     }

  //     const app = Taro.getApp();
  //     const status = app?.mybricks?.status || {};

  //     Taro.request({
  //       url: `${status.callServiceHost}/runtime/api/domain/service/run`,
  //       method: "POST",
  //       data: {
  //         projectId: status?.appid,
  //         fileId: status?.appid,
  //         serviceId: "getPhoneNumber",
  //         params: {
  //           code: e.detail.code,
  //         },
  //       },
  //       success: (res) => {
  //         if (
  //           res?.data?.code === 1 &&
  //           res.data.data &&
  //           res.data.data.phone_info
  //         ) {
  //           data.value = res.data.data.phone_info.phoneNumber;
  //           outputs["onChange"](data.value);
  //         } else {
  //           //noop
  //         }
  //       },
  //     });
  //   },
  //   [env.runtime, data.value]
  // );

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

  const onCodeChange = useCallback((e) => {
    let value = e.detail.value;
    parentSlot?._inputs["onCodeChange"]?.({
      id: props.id,
      name: props.name,
      value,
    });
    outputs["onCodeChange"](value);
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
        <Button
          className={cx("mybricks-getphonenumber-button", css.button)}
          {...openType}
        >
          {data.buttonText || "点击授权"}
        </Button>
      </View>
      {data.getPhoneNumberMethods === "customInput" && (
        <View className={css.phoneNumber} style={{ marginTop: "12px"}}>
          <Input onChange={onCodeChange} className={css.input} placeholder="请输入验证码" />
        </View>
      )}
    </View>
  );
}
