import * as Taro from "@tarojs/taro";

interface OpenProps {
  latitude: number,
  longitude: number,
  address?: string,
  name?: string,
  scale?: number
}

const getNumber = (target) => {
  const _result = parseFloat(target)
  return isNaN(_result) ? 0 : _result
}

export default function ({ env, data, inputs, outputs }) {
  if (env.runtime) {
    inputs["open"]((val: OpenProps) => {
      Taro.openLocation({
        latitude: getNumber(val?.latitude),
        longitude: getNumber(val?.longitude),
        address: val?.address,
        name: val?.name,
        scale: val?.scale ?? 10,
        success: ({ errMsg }) => {
          outputs["onSuccess"]?.(true);
        },
        fail: ({ errMsg }) => {
          outputs["onFail"]?.({ errMsg });
        },
      });
    });
  }
}
