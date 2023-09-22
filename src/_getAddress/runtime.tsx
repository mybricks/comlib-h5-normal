import * as Taro from "@tarojs/taro";


export default function ({ env, data, inputs, outputs }) {
  if (env.runtime) {
    inputs["get"]((val) => {
      if (!val?.longitude || !val?.latitude) {
        outputs["onFail"]?.({ errMsg: '不合法的经纬度信息' });
        return
      }
      const url = `https://apis.map.qq.com/ws/geocoder/v1/?key=${env?.apiKey ?? 'WDOBZ-7WZWL-NFJPE-EKBHS-PBEEK-U4FA5'}&location=${val?.latitude},${val?.longitude}&get_poi=0`
      Taro.request({
        url,
        success: (res) => {
          if (res.statusCode === 200 && res.data.status === 0) {
            const { result } = res.data ?? {}
            outputs['onSuccess']?.({
              name: result?.formatted_addresses?.recommend,
              address: result?.address,
              longitude: val.longitude,
              latitude: val.latitude,
              ...(result?.address_component ?? {}),
            })
          } else {
            outputs["onFail"]?.({ errMsg: res.data?.message ?? res.errMsg ?? '网络错误' });
          }
        },
        fail: ({ errMsg }) => {
          outputs["onFail"]?.({ errMsg });
        }
      });
    });
  }
}
