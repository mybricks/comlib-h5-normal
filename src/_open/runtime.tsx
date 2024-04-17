import * as Taro from "@tarojs/taro";
import { ExtOpenType } from './types'

const runtimeEnv = () => {
  const isH5 = Taro.getEnv() === Taro.ENV_TYPE.WEB || Taro.getEnv() === "Unknown";
  if (isH5) {
    if (window.__wxjs_environment === 'miniprogram') {
      return 'IN_WEAPP'
    }
    if (/(MicroMessenger)/i.test(navigator.userAgent)) {
      return 'IN_WEIXIN'
    }
    return Taro.ENV_TYPE.WEB
  } else {
    return Taro.getEnv();
  }
};

export default function ({ env, data, inputs, outputs }) {
  if (env.runtime) {
    inputs["open"]((value) => {

      const _env = runtimeEnv();
      switch (true) {
        case data.type === ExtOpenType.parent_open: {
          if (_env === 'IN_WEAPP' && wx?.miniProgram?.navigateTo && data.url) {
            wx.miniProgram.navigateTo({ url: data.url });
            outputs["onSuccess"]();
          }
          break;
        }
        case data.type === ExtOpenType.parent_back: {
          if (_env === 'IN_WEAPP' && wx?.miniProgram?.navigateBack) {
            wx.miniProgram.navigateBack()
            outputs["onSuccess"]();
          }
          break;
        }
        case data.type === ExtOpenType.web_open: {
          if (_env === Taro.ENV_TYPE.WEB && data.url) {
            window.open(data.url);
            outputs["onSuccess"]();
          }
          break;
        }

        case data.type === ExtOpenType.web_open: {
          if (_env === Taro.ENV_TYPE.WEB && data.url) {
            window.open(data.url)
            outputs["onSuccess"]();
          }
          break;
        }

        case data.type === ExtOpenType.miniapp_open: {
          if (_env === Taro.ENV_TYPE.WEB) {
            Taro.navigateToMiniProgram({
              success(e) {
                outputs["onSuccess"](e);
              },
              fail(e) {
                outputs["onFail"](e);
              },
            });
          }
          if (_env === 'IN_WEIXIN') {
            // TODO
          }
          break;
        }
        default:
          break;
      }
    });
  }
}
