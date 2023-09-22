import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  // let 

  inputs["showTabBarRedDot"](() => {
    let params = {
      index: 0,
      success: () => { },
      fail: () => { },
      complete: () => { },
    };


    // 自定义导航栏
    env.showTabBarRedDot(params);
    // 默认导航栏
    // Taro.showTabBarRedDot()
  });
}
