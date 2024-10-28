import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (env.runtime) {

    inputs["onSelect"]((val) => {
      Taro.chooseMessageFile({
        count: data.SelectCount,
        type: data.SelectType,
        success: function (res) {
          outputs["onComplete"]({
            ...res
          });
        }
      })
    });
  }
}
