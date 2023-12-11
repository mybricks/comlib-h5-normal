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

  const onGetPhoneNumber = useCallback(
    (e) => {
      if (!env.runtime) {
        return;
      }

      if (!!e.detail.errno) {
        //noop
        return;
      }

      const app = Taro.getApp();
      const status = app?.mybricks?.status || {};

      Taro.request({
        url: `${status.callServiceHost}/runtime/api/domain/service/run`,
        method: "POST",
        data: {
          projectId: status?.appid,
          fileId: status?.appid,
          serviceId: "getPhoneNumber",
          params: {
            code: e.detail.code,
          },
        },
        success: (res) => {
          if (
            res?.data?.code === 1 &&
            res.data.data &&
            res.data.data.phone_info
          ) {
            data.value = res.data.data.phone_info.phoneNumber;
            outputs["onChange"](data.value);
          } else {
            //noop
          }
        },
      });
    },
    [env.runtime, data.value]
  );

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

  return (
    <View className={css.phoneNumber}>
      <Input
        className={css.input}
        value={data.value}
        placeholder={data.placeholder}
        onChange={onChange}
        disabled={true}
      />
      <Button
        className={cx("mybricks-button", css.button)}
        openType="getPhoneNumber"
        onGetPhoneNumber={onGetPhoneNumber}
      >
        {data.buttonText || "点击授权"}
      </Button>
    </View>
  );
}
