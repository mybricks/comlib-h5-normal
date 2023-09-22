import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (env.runtime) {
    inputs["scan"](() => {
      Taro.scanCode({
        onlyFromCamera: data.onlyFromCamera,
        success: ({ result, scanType, errMsg }) => {
          if (result) {
            outputs["onSuccess"]?.({ result, scanType });
          } else {
            outputs["onFail"]?.({});
          }
        },
        fail: ({ errMsg }) => {
          outputs["onFail"]?.({ errMsg });
        },
      });
    });
  }
}
