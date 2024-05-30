import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["hideToast"]((val) => {
    Taro.hideToast({
      noConflict: true,
      complete: () => {
        outputs["afterHideToast"](val);
      },
    });
  });
}
