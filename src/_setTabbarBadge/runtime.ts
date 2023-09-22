import * as Taro from "@tarojs/taro";
import { isEmpty, isObject, isUndef } from './../utils/core'

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["show"]((val) => {
    let params = { index: data.index, text: data.text }
    if(!isUndef(val?.index) && !isUndef(val?.text)) {
      params = val;
    }
    env?.tabbar?.setTabBarBadge?.({ index: parseFloat(params.index) - 1, text: params.text }).then(() => {
      outputs["success"]?.(val);
    })
  });

}
