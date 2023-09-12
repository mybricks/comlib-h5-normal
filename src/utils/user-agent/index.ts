import {
  ANDROID_REGEXP,
  IOS_REGEXP,
  MOBILE_REGEXP,
  APPLE_REGEXP,
  IPAD_REGEXP,
  IPHONE_REGEXP,
  QQ_REGEXP,
  WEI_XIN_REGEXP,
  WEI_XIN_WORK_REGEXP,
  WEI_BO_REGEXP,
  ALIPAY_REGEXP,
  MINI_PROGRAM_REGEXP,
  KS_APP_VERSION_REGEXP,
  KWAI_REGEXP,
  NEBULA_REGEXP,
  MERCHANTSHOP_REGEXP,
  KIM_REGEXP,
} from './regex';

const UA = navigator.userAgent.toLowerCase();

/**
 * 是否是移动端
 */
export function isMobile(): boolean {
  return MOBILE_REGEXP.test(UA);
}

/**
 * 是否是Android系统
 */
export function isAndroid(): boolean {
  return ANDROID_REGEXP.test(UA);
}

/**
 * 是否是iOS系统
 */
export function isIOS(): boolean {
  return IOS_REGEXP.test(UA);
}

/**
 * 是否是苹果产品系列
 */
export function isApple(): boolean {
  return APPLE_REGEXP.test(UA);
}

/**
 * 是否是iPhone
 */
export function isIphone(): boolean {
  return IPHONE_REGEXP.test(UA);
}

/**
 * 是否是iPad
 */
export function isIpad(): boolean {
  return IPAD_REGEXP.test(UA);
}

/**
 * 是否是QQ APP
 */
export function isQQ(): boolean {
  return QQ_REGEXP.test(UA);
}

/**
 * 是否是微信
 */
export function isWeiXin(): boolean {
  return WEI_XIN_REGEXP.test(UA) && !isWeiXinWork();
}

/**
 * 是否是企业微信
 */
export function isWeiXinWork(): boolean {
  return WEI_XIN_WORK_REGEXP.test(UA);
}

/**
 * 是否是微博
 */
export function isWeiBo(): boolean {
  return WEI_BO_REGEXP.test(UA);
}

/**
 * 获取快手、快手极速版、快手小店商家APP版本，返回版本号字符串，例如 5.5.1
 * @returns 版本号。 快手、快手极速版、快手小店商家返回 undefined
 */
export function getKSAppVersion(): string | undefined {
  let version: string | undefined;
  const match = UA.match(KS_APP_VERSION_REGEXP);

  if (match) {
    version = match[1];
  }
  return version;
}

/**
 * 判断是否在小程序环境
 */
export function isMiniProgram(): boolean {
  return window.__wxjs_environment === 'miniprogram' || MINI_PROGRAM_REGEXP.test(UA);
}

/**
 * 判断是否在支付宝环境
 */
export function isAlipay(): boolean {
  return ALIPAY_REGEXP.test(UA);
}

/**
 * 判断是否在快手环境
 */
export function isKwai(): boolean {
  return KWAI_REGEXP.test(UA);
}

/**
 * 判断是否在快手环境
 */
export function isNebula(): boolean {
  return NEBULA_REGEXP.test(UA);
}

/**
 * 判断是否在快手环境
 */
export function isMerchantshop(): boolean {
  return MERCHANTSHOP_REGEXP.test(UA);
}

/**
 * 判断是否在 Kim 环境
 */
export function isKim(): boolean {
  return KIM_REGEXP.test(UA);
}
