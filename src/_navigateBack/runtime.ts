import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["navigateBack"]((val) => {
    let delta = data.delta;

    if (val?.delta) {
      delta = val.delta;
    }

    // todo
    // debug 时候的跳转

    //runtime
    Taro.navigateBack({
      delta: isNaN(parseInt(delta)) ? 1 : parseInt(delta),
    });
  });
}
