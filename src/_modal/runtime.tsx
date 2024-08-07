import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (env.runtime) {
    inputs["show"]((val) => {
      let param = {
        ...data,
        success: (res) => {
          if (res.confirm) {
            if (data.editable) {
              outputs["onConfirm"](res.content);
            } else {
              outputs["onConfirm"](val);
            }
          } else {
            outputs["onCancel"](val);
          }
        },
      };

      if (data.content) {
        param.content = data.content.replace(/\n/g, "\r\n");
      }

      Taro.showModal(param);
    });
  }
}
