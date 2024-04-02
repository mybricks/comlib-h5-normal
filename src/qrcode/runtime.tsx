import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Image } from "@tarojs/components";
// https://github.com/miaonster/taro-code
import { Barcode, QRCode } from "taro-code";
import css from "./style.less";

export default function ({ env, data, inputs, outputs, title, style }) {
  const barcode = useMemo(() => {
    return <Barcode text={data.text}></Barcode>;
  }, [data.text]);

  const qrcode = useMemo(() => {
    return <QRCode text={data.text}></QRCode>;
  }, [data.text]);

  const code = useMemo(() => {
    switch (data.mode) {
      case "barcode":
        return barcode;

      case "qrcode":
      default:
        return qrcode;
    }
  }, [data.mode]);

  return code;
}
