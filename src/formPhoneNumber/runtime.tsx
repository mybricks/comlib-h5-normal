import React, { useCallback, useMemo } from "react";
import { Input, View, Button } from "@tarojs/components";
import css from "./style.less";
import cx from "classnames";

export default function ({ env, data, inputs, outputs, slots }) {

  const onGetPhoneNumber = useCallback((e) => {
    if (!e?.detail?.code) {
      outputs?.onGetPhoneError?.(e?.detail?.errMsg);
    } else {
      outputs?.onGetPhoneSuccess?.(e?.detail?.code);
    }
  }, []);

  const onError = useCallback((e) => {
    outputs?.onGetPhoneError?.();
  }, [])

  return (
    <View className={css.formItem} style={{ ...data.formFieldStyle }}>
      <View className={css.label}>{data.label}</View>

      <View className={css.value}>
        <Input className={css.input} name={data.name} type={'number'} disabled={false} placeholder='' />
        <Button className={css.button} openType="getPhoneNumber" onGetPhoneNumber={onGetPhoneNumber} onError={onError}>{data.autoGetText ?? '自动填写'}</Button>
      </View>

    </View>
  );
}
