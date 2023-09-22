import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs, logger }) {
  if (!env.runtime) {
    return;
  }

  inputs["getStorage"]((key) => {
    try {
      let value = Taro.getStorageSync(key);
      outputs["onSuccess"](value);
    } catch (e) {
      outputs["onFail"](e);
    }
  });
}
