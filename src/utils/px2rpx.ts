import * as Taro from "@tarojs/taro";

export const px2rpx = (px: number) => {
  let ratio = Taro.getSystemInfoSync().windowWidth / 375;
  return px / ratio;
};

export default px2rpx;
