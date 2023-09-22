import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs, logger }) {
  if (!env.runtime) {
    return;
  }

  inputs["get"](() => {
    // 仅在调试模式下使用mock数据
    if (env.runtime?.debug) {
      let userInfo = window?.__debug__?.userInfo || null;
      if (userInfo && userInfo.id) {
        outputs["onSuccess"](userInfo);
      } else {
        outputs["onFail"](null);
      }
      return;
    }

    // 从本地缓存中获取用户信息
    let userInfo = Taro.getStorageSync("userInfo");
    if (userInfo && userInfo.id) {
      outputs["onSuccess"](userInfo);
    } else {
      outputs["onFail"](null);
    }
  });

  if (data.runImmediate) {
    // 仅在调试模式下使用mock数据
    if (env.runtime?.debug) {
      let userInfo = window?.__debug__?.userInfo || null;
      if (userInfo && userInfo.id) {
        outputs["onSuccess"](userInfo);
      } else {
        outputs["onFail"](null);
      }
      return;
    }

    // 从本地缓存中获取用户信息
    let userInfo = Taro.getStorageSync("userInfo");
    if (userInfo && userInfo.id) {
      outputs["onSuccess"](userInfo);
    } else {
      outputs["onFail"](null);
    }
  }
}
