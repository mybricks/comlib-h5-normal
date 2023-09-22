import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs, logger }) {
  if (!env.runtime) {
    return;
  }

  inputs["setStorage"]((props) => {
    try {
      Taro.setStorageSync(props.key, props.value);
      outputs["onSuccess"](props);
    } catch (e) {
      outputs["onFail"](e);
    }
  });
}
