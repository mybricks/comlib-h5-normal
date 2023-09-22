import Taro from "@tarojs/taro";

// @ts-ignore
const isH5 = Taro.getEnv() === Taro.ENV_TYPE.WEB || Taro.getEnv() === 'Unknown';

/**
 * @description Taro的动态适配rpx逻辑
 */
function adjustTaroStyle(style) {
  if (!style) {
    return {}
  }

  if (isH5) {
    return style
  }

  const taroStyle = {}

  const matchKeys = ['marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'paddingLeft', 'paddingRight', 'width', 'height', 'fontSize', 'lineHieght'];

  Object.keys(style).forEach(property => {
    const newVal = parseFloat(style[property])
    if (matchKeys.includes(property) && !isNaN(newVal) && style[property] !== '100%') {
      taroStyle[property] = Taro.pxTransform(newVal)
    } else {
      taroStyle[property] = style[property]
    }
  })
  return taroStyle
}

export const transformStyle = adjustTaroStyle