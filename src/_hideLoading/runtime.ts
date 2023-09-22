import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["hideLoading"]((val) => {
    Taro.hideLoading({
      noConflict: true,
      complete: (e) => {
        outputs["afterHideLoading"](val);
      },
    });
  });
}
