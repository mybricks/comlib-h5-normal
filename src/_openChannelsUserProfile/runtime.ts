import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["openChannelsUserProfile"]((val) => {
    Taro.openChannelsUserProfile({
      finderUserName: val.finderUserName,
      success: function(res) {
        outputs["openChannelsUserProfileSuccess"]?.(res);
      },
      fail: function(err) {
        outputs["openChannelsUserProfileFail"]?.(err);
      }
    });
  });

}
