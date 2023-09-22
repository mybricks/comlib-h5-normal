import * as Taro from "@tarojs/taro";

interface getLocaltionProps {
  scale?: number
}

export default function ({ env, data, inputs, outputs }) {
  if (env.runtime) {
    inputs["get"]((val: getLocaltionProps) => {
      Taro.getLocation({
        type: 'gcj02', //返回可以用于 Taro.openLocation的经纬度
        isHighAccuracy: data?.isHighAccuracy ?? false,
        success: function ({ latitude, longitude }) {
          outputs["onSuccess"]?.({ latitude, longitude });
        },
        fail: ({ errMsg }) => {
          outputs["onFail"]?.({ errMsg });
        },
       })
    });
  }
}
