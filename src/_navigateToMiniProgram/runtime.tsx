import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (env.runtime) {
    inputs["open"]((value) => {
      let newValue = {
        extraData: data.extraData,
      };

      if (data.useShortLink) {
        newValue["shortLink"] = data.shortLink;
      } else {
        newValue["appId"] = data.appId;
        newValue["path"] = data.path;
      }

      [
        "appId",
        "path",
        "extraData",
        "envVersion",
        "shortLink",
        "noRelaunchIfPathUnchanged",
      ].forEach((key) => {
        if (value[key]) {
          newValue[key] = value[key];
        }
      });

      console.warn("navigateToMiniProgram", newValue);
      return;

      Taro.navigateToMiniProgram({
        ...newValue,
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
