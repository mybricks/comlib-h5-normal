// 判断Android系统的正则
export const ANDROID_REGEXP = /(Android)\s+([\d.]+)/i;
// 判断iOS系统的正则
export const IOS_REGEXP = /\(i[^;]+;( U;)? cpu.+mac os x/i;
// 判断移动端正则
export const MOBILE_REGEXP = /AppleWebKit.*Mobile.*/i;
// 判断苹果产品系列正则
export const APPLE_REGEXP = /(iPhone|iPad|iPod|iOS|Mac OS X)/i;
// 判断iPad正则
export const IPAD_REGEXP = /(iPad).*OS\s([\d_]+)/i;
// 判断iPhone正则
export const IPHONE_REGEXP = /(iPhone\sOS)\s([\d_]+)/i;
// 判断QQ APP正则
export const QQ_REGEXP = /QQ\/([\d.]+)/i;
// 判断微信正则
export const WEI_XIN_REGEXP = /micromessenger/i;
// 判断企业微信正则
export const WEI_XIN_WORK_REGEXP = /wxwork\/.* MicroMessenger/i;
// 判断微博正则
export const WEI_BO_REGEXP = /WeiBo/i;
// 获取快手、快手极速版、快手小店商家、Kim版本号正则
export const KS_APP_VERSION_REGEXP = /(?:Kwai|ksNebula|Merchantshop)\/([\d.]+)/i;
// 判断支付宝正则
export const ALIPAY_REGEXP = /AlipayClient/i;
// 判断miniProgram正则
export const MINI_PROGRAM_REGEXP = /miniProgram/i;
// 判断快手正则
export const KWAI_REGEXP = /(Kwai\/)/i;
// 判断快手极速版正则
export const NEBULA_REGEXP = /ksNebula\//i;
// 判断快手小店商家正则
export const MERCHANTSHOP_REGEXP = /Merchantshop\//i;
// 判断 Kim 正则
export const KIM_REGEXP = /Kim\//i;
