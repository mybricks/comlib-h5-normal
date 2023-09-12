import { useUpdateEffect } from './hooks';
import { FormattedRes } from './hooks/useCountDown';

export function uuid(pre = 'u_', len = 6) {
  const seed = 'abcdefhijkmnprstwxyz0123456789',
    maxPos = seed.length;
  let rtn = '';
  for (let i = 0; i < len; i++) {
    rtn += seed.charAt(Math.floor(Math.random() * maxPos));
  }
  return pre + rtn;
}

export { useUpdateEffect };

export function deepCopy(obj: any, cache: any = []) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const hit: any = cache.filter((c: any) => c.original === obj)[0];
  if (hit) {
    return hit.copy;
  }
  const copy: any = Array.isArray(obj) ? [] : {};

  cache.push({
    original: obj,
    copy,
  });

  Object.keys(obj).forEach((key) => {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy;
}

export function getUrlFromBg(bgUrl) {
  let picUrl = '';
  if (bgUrl) {
    picUrl = bgUrl.replace(/url\((.*)\)$/g, '$1');
  }
  return picUrl;
}

export function throttle(fn, time = 300) {
  let timer;
  let firstTime = true;

  return function (...args) {
    const context = this;
    if (firstTime) {
      fn.apply(context, args);
      firstTime = false;
      return;
    }
    if (timer) {
      return false;
    }

    timer = setTimeout(function () {
      clearTimeout(timer);
      timer = null;
      fn.apply(context, args);
    }, time);
  };
}

export function debounce(fn, wait = 300) {
  let timer;
  return function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

/**
 * 获取url参数
 * @param key key
 * @returns   value/undefined
 */
export function getUrlParam(key: string): string | undefined {
  const searchAry: string[] = location.search.slice(1).split('&');

  for (let i = 0; i < searchAry.length; i++) {
    const kv = searchAry[i].split('=');
    if (kv[0] === key) {
      return kv[1];
    }
  }

  return;
}

const typeMap = {
  OBJECT: '[object Object]',
  ARRAY: '[object Array]',
  STRING: '[object String]',
  NUMBER: '[object Number]',
  FORMDATA: '[object FormData]',
  NULL: '[object Null]',
  UNDEFINED: '[object Undefined]',
  BOOLEAN: '[object Boolean]',
  FUNCTION: '[object Function]',
};

export function typeCheck(variable, type) {
  if (Array.isArray(type)) {
    let bool = false;
    for (let i = 0; i < type.length; i++) {
      if (typeCheck(variable, type[i])) {
        bool = true;
        break;
      }
    }
    return bool;
  } else {
    const checkType = /^\[.*\]$/.test(type) ? type : typeMap[type.toUpperCase()];
    return Object.prototype.toString.call(variable) === checkType;
  }
}

export function dateFormate(date: Date | number, fmt: string) {
  const d = new Date(date);
  const o = {
    'M+': d.getMonth() + 1, //月份
    'D+': d.getDate(), //日
    'h+': d.getHours(), //小时
    'm+': d.getMinutes(), //分
    's+': d.getSeconds(), //秒
    'q+': Math.floor((d.getMonth() + 3) / 3), //季度
    S: d.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return fmt;
}

// export const getFuncFromEvent = ({ evt, env }) => {
//   if (!evt) {
//     return () => {};
//   }

//   if (env.edit) {
//     return;
//   }

//   if (evt && evt.type === 'link') {
//     if (env?.yoda?.kwai) {
//       if (/^kwai:\/\/.+/.test(evt.value)) {
//         location.href = evt.value;
//       } else {
//         env.yoda.kwai.loadUrlOnNewPage({
//           url: evt.value,
//           type: 'back',
//         });
//       }
//     } else {
//       window.open(evt.value);
//     }
//   }
// };
export function wFormat(value: number) {
  if (typeof value === 'string') {
    value = +value;
  }
  if (value / 100000000 > 1) {
    const num = parseFloat((value / 100000000).toFixed(1));
    return num + '亿';
  } else if (value / 10000 > 1) {
    const num = parseFloat((value / 10000).toFixed(1));
    return num + '万';
  } else {
    return value;
  }
}

export function padZero(num: number | string, targetLength = 2): string {
  let str = num + '';
  while (str.length < targetLength) {
    str = '0' + str;
  }
  return str;
}

export function parseCountdown(formattedRes: FormattedRes) {
  const { days, hours, minutes, seconds } = formattedRes;
  const hoursStr = padZero(hours);
  const minutesStr = padZero(minutes);
  const secondsStr = padZero(seconds);
  if (days) {
    return days + '天' + [hoursStr, minutesStr, secondsStr].join(':');
  } else {
    return [hoursStr, minutesStr, secondsStr].join(':');
  }
}

// export function share(env, logger) {
//   if(env.kwai && env.kwai.share && typeof env.kwai.share === 'function') {
//     env?.kwai?.share();
//   } else {
//     logger.error("无法调起分享");
//   }
// }

// export function back(yoda: any) {
//   if ((window as any)._physicalBackCb) {
//     (window as any)._physicalBackCb();
//   } else {
//     if (yoda?.kwai?.popBack) {
//       yoda.kwai.popBack();
//     } else if (yoda?.kwai?.exitWebView) {
//       yoda.kwai.exitWebView();
//     } else {
//       history?.back();
//     }
//   }
// }

// export function close(yoda: any) {
//   if(yoda?.webview?.backOrClose) {
//     yoda?.webview?.backOrClose().then((res) => {
//       console.log('backOrClose');
//     });
//   } else {
//     back(yoda);
//   }
// }

// export {
//   event
// }

/**
 * 暂时只针对白名单 ali2.a.kwimgs.com 域名的图片进行处理
 * todo：提供公共的图片裁剪方法
 */
export function resizeImage(url: string, options = {}): string {
  const whitelist = ['ali2.a.kwimgs.com'];

  let a = parseUrl(url);
  if (whitelist.indexOf(a.hostname) === -1) {
    return url;
  }

  if (Object.keys(options).length === 0) {
    return url;
  }

  let params = Object.keys(options)
    .map((key) => {
      return `${key}_${options[key]}`;
    })
    .join(',');

  return `${url}?x-oss-process=image/resize,${params}`;

  function parseUrl(url) {
    let a = document.createElement('a');
    a.href = url;
    return a;
  }
}

/**
 * 将二维数组转为 csv 并下载
 */
export function downloadExcel(fileName, fileData) {
  let result = fileData
    .map((row) => {
      return row.join(',');
    })
    .join('\r\n');

  result = 'data:application/csv,' + encodeURIComponent(result);

  let elem = document.createElement('A');
  elem.setAttribute('href', result);
  elem.setAttribute('download', `${fileName}.csv`);
  document.body.appendChild(elem);
  elem.click();
  elem.remove();
}
