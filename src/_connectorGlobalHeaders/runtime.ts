import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs, onError }) {
  if (env.runtime) {

    inputs["call"]((obj, outputRels) => {
      if (data.dynamic == true || data.dynamic == void 0) {
        if (typeof obj === "object" && obj !== null && !Array.isArray(obj)) {
          Taro.setStorageSync("_MYBRICKS_GLOBAL_HEADERS_", obj);
          outputRels["then"](obj);
        }

      } else {
        if (typeof data.header === "object" && data.header !== null && !Array.isArray(data.header)) {
          Taro.setStorageSync("_MYBRICKS_GLOBAL_HEADERS_", data.header);
          outputRels["then"](data.header);
        }
      }

    });

  }
}
