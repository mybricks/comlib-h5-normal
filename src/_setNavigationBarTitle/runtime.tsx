import * as Taro from "@tarojs/taro";
import { isH5 } from "../utils/env";

export default function ({ env, data, inputs, outputs, logger }) {
  if (!env.runtime) {
    return;
  }

  inputs["setTitle"]((value) => {
    if (value && typeof value === "string") {
      Taro.setNavigationBarTitle({
        title: value,
      });
    }
  });
}
