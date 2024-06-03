import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  Taro.checkIsSupportFacialRecognition({
    checkAliveType: 2,
    success: (e) => {
      console.log("success", e);
    },
    fail: (e) => {
      console.log("fail", e);
    },
  });
}
