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

    outputs["onComplete"]({ path, query, scene });
  });
}
