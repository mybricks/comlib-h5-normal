import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (env.runtime) {
    inputs["open"]((val) => {
      Taro.chooseLocation({
        latitude: val?.latitude,
        longitude: val?.longitude,
        success: (res) => {
          outputs['onSuccess']?.({
            name: res.name,
            address: res.address,
            latitude: res.latitude,
            longitude: res.longitude
          })
        },
        fail: (err) => {
          outputs['onFail']?.(err)
        },
      });
    });
  }
}
