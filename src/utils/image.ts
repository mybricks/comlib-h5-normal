import { isNumber, isString } from './core'
import * as Taro from "@tarojs/taro";

const pixelRatio = Taro.getSystemInfoSync().pixelRatio;

// const getWidth = (w: number) => Math.round(w / 200) * 200;
const dpr = pixelRatio ?? window?.devicePixelRatio;
// const commonWidth = getWidth((window.screen.availWidth || document.body.clientWidth) * dpr);

// const isSupportWebp = (() => {
//   try {
//     return document.createElement('canvas').toDataURL('image/webp', 0.5).indexOf('data:image/webp') === 0;
//   } catch(err) {
//     return false;
//   }
// })()

// export function imageWebpProcess(url: string) {
//   return isSupportWebp ? url : ''
// }

// /**
//  * 给各个云存储的图片增加处理参数
//  */
// export function imageProcess(url: string, width: number) {
//   width = (width * dpr) | 0;
//   switch (true) {
//     case /https?:\/\/js/.test(url):
//       return imageProcessJs(url, width);
//     case /https?:\/\/ali/.test(url):
//       return imageProcessAli(url, width);
//     case /https?:\/\/tx/.test(url):
//       return imageProcessTx(url, width);
//     case /https?:\/\/p[0-9]\./.test(url): // 其他cdn，按cdn方的人来说是动态的，都支持阿里的参数
//       return imageProcessAli(url, width);
//     default:
//       return url;
//   }
// }

// /**
//  * 金山云 https://docs.ksyun.com/documents/886
//  * @param url
//  * @param width
//  */
// function imageProcessJs(url: string, width: number) {
//   width = width || commonWidth;
//   const pos = url.indexOf('@');
//   const base = url.slice(0, pos === -1 ? +Infinity : pos);

//   return base + '@base@tag=imgScale&m=1&w=' + width + '&q=85&interlace=1';
// }

// /**
//  * 阿里云 https://help.aliyun.com/document_detail/44687.html
//  * @param url
//  * @param width
//  */
// function imageProcessAli(url: string, width: number) {
//   width = width || commonWidth;
//   const pos = url.indexOf('?');
//   const base = url.slice(0, pos === -1 ? +Infinity : pos);

//   return base + '?x-oss-process=image/resize,w_' + width + '/format,jpg/interlace,1/quality,q_85';
// }

// /**
//  * 腾讯云 https://cloud.tencent.com/document/product/460/36540
//  * @param url
//  * @param width
//  */
// function imageProcessTx(url: string, width: number) {
//   width = width || commonWidth;
//   const pos = url.indexOf('?');
//   const base = url.slice(0, pos === -1 ? +Infinity : pos);

//   return base + '?imageView2/2/w/' + width + '/format/jpg/interlace/1/q/85';
// }

export enum IMAGE_MODE {
  ASPECTFILL = "aspectFill",
  OBJECTFIT = "objectFit",
  TOP = "top",
  LEFT = "left",
  RIGHT = "right",
  BOTTOM = "bottom",
  ASPECTFIT = "aspectFit",
  SCALETOFILL = "scaleToFill",
  WIDTHFIX = "widthFix",
  HEIGHTFIX = 'heightFix'
}

interface CdnCutOptions {
  quality?: number
}


interface CdnCutMeta {
  url: string
  width?: number
  height?: number
}

export function autoCdnCut ({
  url,
  width,
  height,
}: CdnCutMeta, options: CdnCutOptions) {
  const { quality = 85 } = options ?? {};
  if (!isString(url) || !url) {
    return url;
  }

  if (url.indexOf('https') === -1 || url.indexOf('assets.mybricks.world') === -1) {
    return url
  }
  let query = '?x-oss-process=image/resize,';

  if (isNumber(width)) {
    query+= `w_${(width * dpr).toFixed(0)}`
  } else if (isNumber(height)) {
    query+= `h_${(height * dpr).toFixed(0)}`
  }

  if (isNumber(quality)) {
    query+= `/quality,q_${quality}`
  }

  return `${url}${query}`
}