const getWidth = (w: number) => Math.round(w / 200) * 200;
const dpr = window.devicePixelRatio;
const commonWidth = getWidth((window.screen.availWidth || document.body.clientWidth) * dpr);

const isSupportWebp = (() => {
  try {
    return document.createElement('canvas').toDataURL('image/webp', 0.5).indexOf('data:image/webp') === 0;
  } catch(err) {
    return false;
  }
})()

export function imageWebpProcess(url: string) {
  return isSupportWebp ? url : ''
}

/**
 * 给各个云存储的图片增加处理参数
 */
export function imageProcess(url: string, width: number) {
  width = (width * dpr) | 0;
  switch (true) {
    case /https?:\/\/js/.test(url):
      return imageProcessJs(url, width);
    case /https?:\/\/ali/.test(url):
      return imageProcessAli(url, width);
    case /https?:\/\/tx/.test(url):
      return imageProcessTx(url, width);
    case /https?:\/\/p[0-9]\./.test(url): // 其他cdn，按cdn方的人来说是动态的，都支持阿里的参数
      return imageProcessAli(url, width);
    default:
      return url;
  }
}

/**
 * 金山云 https://docs.ksyun.com/documents/886
 * @param url
 * @param width
 */
function imageProcessJs(url: string, width: number) {
  width = width || commonWidth;
  const pos = url.indexOf('@');
  const base = url.slice(0, pos === -1 ? +Infinity : pos);

  return base + '@base@tag=imgScale&m=1&w=' + width + '&q=85&interlace=1';
}

/**
 * 阿里云 https://help.aliyun.com/document_detail/44687.html
 * @param url
 * @param width
 */
function imageProcessAli(url: string, width: number) {
  width = width || commonWidth;
  const pos = url.indexOf('?');
  const base = url.slice(0, pos === -1 ? +Infinity : pos);

  return base + '?x-oss-process=image/resize,w_' + width + '/format,jpg/interlace,1/quality,q_85';
}

/**
 * 腾讯云 https://cloud.tencent.com/document/product/460/36540
 * @param url
 * @param width
 */
function imageProcessTx(url: string, width: number) {
  width = width || commonWidth;
  const pos = url.indexOf('?');
  const base = url.slice(0, pos === -1 ? +Infinity : pos);

  return base + '?imageView2/2/w/' + width + '/format/jpg/interlace/1/q/85';
}