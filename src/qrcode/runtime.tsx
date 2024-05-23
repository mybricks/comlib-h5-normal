import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Image } from "@tarojs/components";
// https://github.com/miaonster/taro-code
import { Barcode, QRCode } from "taro-code";
import { isString } from './../utils/core'
import css from "./style.less";

export default function ({ env, data, inputs, outputs, title, style }) {

  useMemo(() => {
    inputs['setValue']?.((val) => {
      if (isString(val)) {
        data.text = val;
      }
    })
  }, [])

  return (<>
    {
      data.mode === 'barcode' && <Barcode className={css.code} text={data.text}></Barcode>
    }
    {
      data.mode === 'qrcode' && <QRCode className={css.code} text={data.text}></QRCode>
    }
  </>);
}
