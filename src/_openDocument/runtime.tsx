import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["chooseAddress"](() => {
    // debug 模式下，直接返回 mock 数据
    if (env.runtime?.debug) {
      outputs["onSuccess"]();
      return;
    }

    Taro.chooseAddress({
      success(res) {
        outputs["onSuccess"](res);
      },
      fail(err) {
        outputs["onFail"](err);
      },
    });
  });
}
