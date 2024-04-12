import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs, logger }) {
  if (!env.runtime) {
    return;
  }

  inputs["setStorage"]((props) => {
    try {
      Object.keys(props).forEach((key) => {
        Taro.setStorageSync(key, props[key]);
      });

      outputs["onSuccess"](props);
    } catch (e) {
      outputs["onFail"](props);
    }
  });
}
