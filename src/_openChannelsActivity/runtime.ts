import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["openChannelsActivity"]((val) => {
    console.log('openChannelsActivity', val);
    Taro.openChannelsActivity({
      finderUserName: val.finderUserName,
      feedId: val.feedId,
      success: function(res) {
        console.log('接口调用成功', res);
        outputs["openChannelsActivitySuccess"]?.(res);
      },
      fail: function(err) {
        console.error('接口调用失败', err);
        outputs["openChannelsActivityFail"]?.(err);
      }
    });
  });

}
