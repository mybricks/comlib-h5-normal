import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["call"](() => {
    /**
     * 调试环境中需要进行 mock
     */
    if (env.runtime?.debug) {
      if (!!data.useMock) {
        outputs["success"]({
          code: "mockCode",
        });
      } else {
        outputs["fail"]({
          errno: 999999,
          errMsg: "模拟失败输出",
        });
      }
      return;
    }

    /**
     * 正式环境中调用真实接口
     */
    let params = {};

    if (!!data.timeout) {
      params["timeout"] = data.timeout;
    }

    Taro.login({
      ...params,
      success: (res) => {
        if (res.code) {
          outputs["success"]({
            code: res.code,
          });
        } else {
          outputs["fail"]({
            ...res,
          });
        }
      },
      fail: (res) => {
        outputs["fail"]({
          ...res,
        });
      },
    });
  });
}
