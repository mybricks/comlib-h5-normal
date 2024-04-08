import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (env.runtime) {
    inputs["call"](() => {
      Taro.getWeRunData({
        success: (res) => {
          console.warn(res);
          outputs["onSuccess"]({
            encryptedData: res.encryptedData,
            iv: res.iv,
          });
        },
        fail: (res) => {
          console.warn(res);

          switch (res.err_code) {
            // 用户未授权，需要引导用户授权
            case "-12006":
            case -12006:
              Taro.showModal({
                title: "提示",
                content: "请先授权获取微信运动数据",
                showCancel: true,
                confirmText: "去授权",
                cancelText: "取消",
                success: (res) => {
                  if (res.confirm) {
                    Taro.openSetting({
                      success: (res) => {
                        if (res.authSetting["scope.werun"]) {
                          // noop
                        } else {
                          outputs["onFail"]();
                        }
                      },
                    });
                  } else {
                    outputs["onFail"]();
                  }
                },
              });
              break;

            default:
              outputs["onFail"]();
              break;
          }
        },
      });
    });
  }
}
