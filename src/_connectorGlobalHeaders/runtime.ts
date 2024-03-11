import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs, onError }) {
  if (env.runtime) {
    //
    inputs["call"]((obj, outputRels) => {
      if (typeof obj === "object" && obj !== null && !Array.isArray(obj)) {
        Taro.setStorageSync("_MYBRICKS_GLOBAL_HEADERS_", obj);
      }
      outputRels["then"](obj);
      return;
    });
  }
}
