import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs, logger }) {
  if (!env.runtime) {
    return;
  }

  inputs["getStorage"]((key) => {
    let myKey = data.useDynamicKey ? key : data.key;

    if (!myKey || typeof myKey !== "string") {
      outputs["onComplete"](null);
      return;
    }

    try {
      let value = Taro.getStorageSync(myKey);
      outputs["onComplete"](value);
    } catch (e) {
      outputs["onComplete"](null);
    }
  });
}
