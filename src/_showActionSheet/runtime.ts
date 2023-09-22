import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["showActionSheet"]((val) => {

    if (Array.isArray(val)) {
      data.itemList = val;
    }

    Taro.showActionSheet({
      itemList: data.itemList.map((item) => item.label).slice(0, 6)
    }).then(res => {
      // 点击按钮
      outputs['onSelect']({
        index: res.tapIndex,
        label: data.itemList[res.tapIndex].label,
        value: data.itemList[res.tapIndex].value,
      });
    }).catch((err) => {
      // 点击取消
      outputs['onCancel']();
    });
  });
}
