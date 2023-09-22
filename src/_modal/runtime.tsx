import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (env.runtime) {
    inputs["show"]((val) => {
      Taro.showModal({
        ...data,
        success: (res) => {
          if (res.confirm) {
            outputs["onConfirm"](val);
          } else {
            outputs["onCancel"](val);
          }
        },
      });
    });
  }
}
