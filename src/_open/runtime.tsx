import * as Taro from "@tarojs/taro";
import { ExtLinkype, OpenType } from "./types";
import { isObject } from "./../utils/core";

const runtimeEnv = () => {
  const isH5 =
    Taro.getEnv() === Taro.ENV_TYPE.WEB || Taro.getEnv() === "Unknown";
  if (isH5) {
    if (window.__wxjs_environment === "miniprogram") {
      return "IN_WEAPP";
    }
    if (/(MicroMessenger)/i.test(navigator.userAgent)) {
      return "IN_WEIXIN";
    }
    return Taro.ENV_TYPE.WEB;
  } else {
    return Taro.getEnv();
  }
};

export default function ({ env, data, inputs, outputs }) {
  if (env.runtime) {
    inputs["open"]((value) => {
      const validValue = isObject(value) ? value : {};
      const finalUrl = validValue?.url ?? data.url;

      const _env = runtimeEnv();
      switch (true) {
        case data.type === ExtLinkype.parent_open: {
          const params = {
            url: finalUrl,
            success: () => {
              outputs["onSuccess"]();
            },
            fail: () => {
              outputs["onFail"]();
            },
          };
          if (_env === "IN_WEAPP" && wx?.miniProgram) {
            if (data.openType === OpenType.redirect) {
              wx.miniProgram?.redirectTo?.(params);
            } else {
              wx.miniProgram?.navigateTo?.(params);
            }
          }
          break;
        }
        case data.type === ExtLinkype.parent_back: {
          if (_env === "IN_WEAPP" && wx?.miniProgram?.navigateBack) {
            wx.miniProgram.navigateBack({
              success: () => {
                outputs["onSuccess"]();
              },
              fail: () => {
                outputs["onFail"]();
              },
            });
          }
          break;
        }
        case data.type === ExtLinkype.web_open: {
          if (_env === Taro.ENV_TYPE.WEB && finalUrl) {
            if (data.openType === OpenType.redirect) {
              location.href = finalUrl;
              outputs["onSuccess"]();
            } else {
              window.open(finalUrl);
              outputs["onSuccess"]();
            }
          }
          break;
        }

        case data.type === ExtLinkype.miniapp_open: {
          Taro.navigateToMiniProgram({
            ...validValue,
            success(e) {
              outputs["onSuccess"](e);
            },
            fail(e) {
              outputs["onFail"](e);
            },
          });
          // if (_env === "IN_WEIXIN") {
          //   Taro.navigateToMiniProgram({
          //     ...validValue,
          //     success(e) {
          //       outputs["onSuccess"](e);
          //     },
          //     fail(e) {
          //       outputs["onFail"](e);
          //     },
          //   });
          // }
          break;
        }
        default:
          break;
      }
    });
  }
}
