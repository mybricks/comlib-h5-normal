import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["setClipboardData"]((val) => {

    //已经是字符串不用转换
    if (typeof val === 'string') {
      data.text = val;
    }
    //如果是数字，转成字符串
    if (typeof val === 'number') {
      data.text = val.toString();
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
