import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (env.runtime) {
    inputs["showToast"]((val) => {
      /** 动态输入 */
      if (data?.dynamic) {
        console.log("动态输入",{...val,duration:val.duration === undefined || isNaN(val.duration) ? 1000 : typeof val.duration === "string" ? Number(val.duration) : val.duration});
        Taro.showToast({
          ...(typeof val === "string"
            ? {
                title: val,
                duration: 1000,
              }
            : {...val,duration:val.duration === undefined || isNaN(val.duration) ? 1000 : typeof val.duration === "string" ? Number(val.duration) : val.duration}),
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
