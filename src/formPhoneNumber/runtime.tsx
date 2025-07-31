import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { View, Button } from "@tarojs/components";
import { Input } from "brickd-mobile";
import css from "./style.less";
import cx from "classnames";
import * as Taro from "@tarojs/taro";
import { isEmpty, isString, isNumber, isObject } from "./../utils/type";
import useFormItemValue from "../utils/hooks/useFormItemValue.ts";
import { isH5 } from "../utils/env";

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
    inputs?.["setValue"]((val, outputRels) => {
      let result;

      switch (true) {
        case isEmpty(val): {
          result = "";
          break;
        }
        case isString(val) || isNumber(val):
          result = `${val}`;
          break;
        default:
          // 其他类型的值，直接返回
          return;
      }
      setValue(result);
      outputRels["setValueComplete"]?.(result); // 表单容器调用 setValue 时，没有 outputRels
    });

    /* 获取值 */
    inputs?.["getValue"]((val, outputRels) => {
      outputRels["returnValue"](getValue());
    });

    /* 重置值 */
    inputs?.["resetValue"]((val, outputRels) => {
      setValue("");
      outputRels["resetValueComplete"]?.("");
    });

    /* 设置标题 */
    inputs?.["setLabel"]?.((val) => {
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
    inputs?.["setPlaceholder"]((val) => {
      data.placeholder = val;
    });

    /* 设置禁用 */
    inputs?.["setDisabled"]?.((val, outputRels) => {
      data.disabled = !!val;
      outputRels["setDisabledComplete"]?.(data.disabled);
    });
  }, []);

  const openType = useMemo(() => {
    switch (true) {
      case data.getPhoneNumberMethods === "getPhoneNumber": {
        return {
          openType: "getPhoneNumber",
          onGetPhoneNumber: (e) => {
            e.stopPropagation();

            if (!!e.detail.errno) {
              outputs["getCodeFail"]({
                ...e.detail,
              });
            } else {
              outputs["getCodeSuccess"]({
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
            e.stopPropagation();

            if (!!e.detail.errno) {
              outputs["getCodeFail"]({
                ...e.detail,
              });
            } else {
              outputs["getCodeSuccess"]({
                ...e.detail,
              });
            }
          },
        };
      }
    }
  }, [data.getPhoneNumberMethods]);

  const onChange = useCallback((e) => {
    let value = e.detail.value;
    setValue(value);
  }, []);

  return (
    <View
      className={cx({
        [css.phoneNumber]: true,
        "mybricks-phoneNumber": !isH5(),
        "mybricks-h5PhoneNumber": isH5(),
      })}
    >
      <View className={css.inner}>
        <Input
          className={css.input}
          value={value}
          placeholder={data.placeholder}
          onChange={onChange}
          readonly={true}
        />
        <Button
          className={cx({
            [css.button]: true,
            [css.enabled]: !data.disabled,
            "mybricks-button": !data.disabled,
            [css.disabled]: data.disabled,
            "mybricks-button-disabled": data.disabled,
          })}
          {...openType}
        >
          {data.buttonText || "点击授权"}
        </Button>
      </View>
    </View>
  );
}
