import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (env.runtime) {
    inputs["open"](() => {
      Taro.navigateToMiniProgram({
        shortLink: data.shortLink,
        success(e) {
          outputs["onSuccess"](e);
        },
        fail(e) {
          outputs["onFail"](e);
        },
      });
    });
  }
}
