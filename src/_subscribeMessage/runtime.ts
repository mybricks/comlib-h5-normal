import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["on"](() => {
    Taro.requestSubscribeMessage({
      tmplIds: data.tempIds,
      success: () => {
        outputs["success"]();
      },
      fail: () => {
        outputs["fail"]();
      },
      complete: () => {
      },
    });
    
  });

}
