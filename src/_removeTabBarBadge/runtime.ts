import * as Taro from "@tarojs/taro";
import { isEmpty, isObject, isUndef } from './../utils/core'

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["delete"]((val) => {
    let params = { index: data.index }
    if(!isUndef(val?.index)) {
      params = val;
    }
    env?.tabbar?.removeTabBarBadge?.({ index: parseFloat(params.index) - 1, }).then(() => {
      outputs["success"]?.(val);
    })
  });

}
