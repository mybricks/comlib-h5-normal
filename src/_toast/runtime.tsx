import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (env.runtime) {
    inputs["onTrigger"]((val) => {
    /** 动态输入 */
      if (data?.dynamic) {
        Taro.showToast({
          ...(typeof val === "string"
            ? {
                title: val,
              }
            : val),
          complete: () => {
            outputs["onComplete"]();
          },
        });
      } else { /** 非动态输入 */
        Taro.showToast({
          ...data,
          complete: () => {
            outputs["onComplete"]();
          },
        });
      }
    });

    // inputs["onDynamic"]((val) => {
    //   if (typeof val === "string") {
    //     val = {
    //       title: val,
    //     };
    //   }

    //   Taro.showToast({
    //     ...val,
    //     complete: () => {
    //       outputs["onComplete"]();
    //     },
    //   });
    // });
  }
}
