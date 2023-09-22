import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (env.runtime) {
    inputs["call"]((val) => {
      let params = {
        urls: val.urls,
      };

      if (val.current) {
        params["current"] = val.current;
      }

      Taro.previewImage({
        ...params,
        success: () => {
          outputs["onSuccess"]();
        },
        fail: () => {
          outputs["onFail"]();
        },
      });
    });
  }
}
