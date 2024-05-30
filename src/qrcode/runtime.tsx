import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Image } from "@tarojs/components";
// https://github.com/miaonster/taro-code
// import { Barcode, QRCode } from "taro-code";
import { QRCode } from "taro-code";
import { isString } from "./../utils/core";
import css from "./style.less";

export default function ({ env, data, inputs, outputs, title, style }) {
  useMemo(() => {
    inputs["setValue"]?.((val) => {
      if (isString(val)) {
        data.text = val;
      }
    });
  }, []);

  return (
    <View className={css.code}>
      {/* {data.mode === "barcode" && <Barcode text={data.text}></Barcode>} */}

      {data.mode === "qrcode" && (
        <QRCode
          style={{ display: "block", width: "100%", height: "100%" }}
          mode={"widthFix"}
          text={data.text}
        ></QRCode>
      )}
    </View>
  );
}
