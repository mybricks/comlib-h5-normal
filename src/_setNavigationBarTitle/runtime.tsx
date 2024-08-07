import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs, logger }) {
  if (!env.runtime) {
    return;
  }
  
  inputs["setTitle"]((value) => {
    if (value && typeof value === "string") {
      Taro.setNavigationBarTitle({
        title: value,
      });
    }
  });
}
