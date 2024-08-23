import * as Taro from "@tarojs/taro";
import { isH5 } from "../utils/env";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["chooseMedia"](() => {
    let params = {
      count: data.count,
      mediaType: data.mediaType,
      sourceType: isH5() ? ["album"] : data.sourceType,
      maxDuration: data.maxDuration,
      sizeType: data.sizeType,
      camera: data.camera,
    };

    console.log("params", params);

    Taro.chooseMedia({
      ...params,
      success(res) {
        outputs["onSuccess"](res);
      },
      fail(err) {
        outputs["onFail"](err);
      },
    });
  });
}
