import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (env.runtime) {
    inputs["showToast"]((val) => {
      /** 动态输入 */
      if (data?.dynamic) {
        Taro.showToast({
          ...(typeof val === "string"
            ? {
                title: val,
              }
            : val),
          complete: () => {
            outputs["afterShowToast"](val);
          },
        });
      } else {
        /** 非动态输入 */
        Taro.showToast({
          ...data,
          
          complete: () => {
            outputs["afterShowToast"](val);
          },
        });
      }
    });
  }
}
