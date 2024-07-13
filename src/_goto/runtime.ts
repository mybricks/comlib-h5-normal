import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["goto"]((val) => {
    /**
     * 自定义跳转逻辑
     */
    val = val || {};
    let path = val.path || data.path; // 跳转路径
    let params = val.params || data.params; // 跳转参数
    let action = val.action || data.action; // 跳转方式

    params = Object.keys(params ?? {})
      .map((key) => {
        let value = params[key];
        return `${key}=${value}`;
      })
      .join("&");

    let url = [path, params].filter((raw) => !!raw).join("?");

    switch (true) {
      case action === "navigateTo":
        console.log("navigateTo", url);
        Taro.navigateTo({
          url,
          fail() {
            // 跳转失败的时候，使用 switchTab 重试
            Taro.switchTab({
              url,
            });
          },
        });
        return;

      case action === "redirectTo":
        console.log("redirectTo", url);
        Taro.redirectTo({
          url,
          fail() {
            // 跳转失败的时候，使用 switchTab 重试
            Taro.switchTab({
              url,
            });
          },
        });
        return;
    }
  });
}
