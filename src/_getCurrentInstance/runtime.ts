import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  let params = {};

  if (env.runtime?.debug) {
    params = data.mock || "{}";
    outputs["result"](JSON.parse(decodeURIComponent(params)));
    return;
  } else {
    params = Taro.getCurrentInstance()?.router?.params || {};
  }

  console.log("获取路由参数 params", params);

  // inputs
  inputs["keys"]((keys) => {
    let result = {};

    // 静态的话，直接使用 data.keys
    if (!data.useDynamicKeys) {
      keys = data.keys.map((raw) => {
        return raw.key;
      });
    }

    keys.forEach((key) => {
      let value = params[key];
      try {
        value = decodeURIComponent(value);
      } catch (e) {}
      result[key] = value;
    });

    outputs["result"](result);
  });

  if (data.runImmediate) {
    let result = {};

    let keys = data.keys.map((raw) => {
      return raw.key;
    });

    keys.forEach((key) => {
      let value = params[key];
      try {
        value = decodeURIComponent(value);
      } catch (e) {}
      result[key] = value;
    });

    outputs["result"](result);
  }
}
