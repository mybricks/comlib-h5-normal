import * as Taro from "@tarojs/taro";

let app = Taro.getApp();

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["call"]((val, outputRels) => {
    let globalKey = `tencentcloudChat`;
    let chat = app?.globalData?.[globalKey] || null;

    if (!chat) {
      return;
    }

    if (!chat?.isReady()) {
      return;
    }

    console.log("sendMessage", val);
  });
}
