import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["call"](() => {
    // mock
    if (env.runtime?.debug) {
      try {
        let result = data.mock;
        outputs["onComplete"](JSON.parse(decodeURIComponent(result)));
      } catch (e) {
        outputs["onComplete"]({ path: "", query: {}, scene: 0 });
      }
      return;
    }

    let router = Taro.getCurrentInstance()?.router;

    let path = router?.path || "";
    let query = router?.params || {};
    let scene = Taro.getEnterOptionsSync().scene || 0;

    // 兼容 H5 的 hash 模式，重置 path 和 query
    // const isH5 =
    //   Taro.getEnv() === Taro.ENV_TYPE.WEB ||
    //   Taro.getEnv() === "Unknown";

    // if (isH5) {
    //   let hash = window.location.hash.slice(1);

    //   //
    //   path = hash.split("?")[0];
    //   query = hash.split("?")[1] || "";

    //   if (query) {
    //     query = query.split("&").reduce((acc, curr) => {
    //       let [key, value] = curr.split("=");
    //       acc[key] = value;
    //       return acc;
    //     }, {});
    //   } else {
    //     query = {};
    //   }
    // }

    outputs["onComplete"]({ path, query, scene });
  });
}
