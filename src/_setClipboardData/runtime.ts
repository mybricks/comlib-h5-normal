import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["setClipboardData"]((val) => {

    if (typeof val === 'string') {
      data.text = val;
    }

    Taro.setClipboardData({
      data: data.text,
      success: () => {
        outputs['onSuccess'](val);
      },
      fail: () => {
        outputs['onFail'](val);
      }
    });

  });
}
