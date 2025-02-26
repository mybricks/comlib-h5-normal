import * as Taro from "@tarojs/taro";
import { useUpdateEffect } from "./hooks";

export function getNavigationLayout(env) {
  if (env?.edit) {
    return {
      // bottom: 56
      // height: 32
      // left: 281
      // right: 368
      // top: 24
      // width: 87
      navigationHeight: 0,
      statusBarHeight: 0,
      titleBarHeight: 0,
    };
  }

  let systemInfoSync = Taro.getSystemInfoSync();
  const ratio = systemInfoSync.windowWidth / 375; // 页面 px2rpx 比例

  let menuButtonBoundingClientRect = Taro.getMenuButtonBoundingClientRect();

  let system = (systemInfoSync.system || "").toLocaleLowerCase();
  console.log("systemInfoSync", systemInfoSync);

  const isIOS = system.indexOf("ios") > -1; // iOS title 高度 44px
  const isAndroid = system.indexOf("android") > -1; // Android title 高度 48px

  const statusBarHeight = systemInfoSync.statusBarHeight; // 状态栏高度

  let _statusBarHeight = Math.ceil(statusBarHeight / ratio);

  let _titleBarHeight;
  if (isIOS) {
    _titleBarHeight = Math.ceil(44 / ratio);
  } else if (isAndroid) {
    _titleBarHeight = Math.ceil(48 / ratio);
  } else {
    _titleBarHeight = Math.ceil(44 / ratio); // 调试态
  }

  return {
    navigationHeight: _statusBarHeight + _titleBarHeight,
    statusBarHeight: _statusBarHeight,
    titleBarHeight: _titleBarHeight,
  };
}

export function uuid(pre = "u_", len = 6) {
  const seed = "abcdefhijkmnprstwxyz0123456789",
    maxPos = seed.length;
  let rtn = "";
  for (let i = 0; i < len; i++) {
    rtn += seed.charAt(Math.floor(Math.random() * maxPos));
  }
  return pre + rtn;
}

export { useUpdateEffect };

export function deepCopy(obj: any, cache: any = []) {
  if (obj === null || typeof obj !== "object") {
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
  let picUrl = "";
  if (bgUrl) {
    picUrl = bgUrl.replace(/url\((.*)\)$/g, "$1");
  }
  return picUrl;
}

export function throttle(fn: Function, time = 300, ignoreLast = false) {
  let timer: NodeJS.Timeout | null = null;
  let firstTime = true;
  let lastArgs: any[] | null = null;

  const throttled = function (this: any, ...args: any[]) {
    if (firstTime) {
      fn.apply(this, args);
      firstTime = false;
      return;
    }

    if (timer) {
      if (!ignoreLast) {
        lastArgs = args;
      }
      return;
    }

    timer = setTimeout(() => {
      if (lastArgs && !ignoreLast) {
        fn.apply(this, lastArgs);
      }
      timer = null;
      lastArgs = null;
    }, time);

    fn.apply(this, args);
  };

  throttled.cancel = function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      lastArgs = null;
    }
  };

  return throttled;
}

// export function debounce(fn, wait = 300) {
//   let timer;
//   return function (...args) {
//     const context = this;
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       fn.apply(context, args);
//     }, wait);
//   };
// }

export function debounce(fn, delay, immediate = false) {
  let timer;
  let result;
  return function (...args) {
    if (timer) clearTimeout(timer);

    if (immediate) {
      // 如果timer存在，说明第二次调用的时候还没到delay时间，因为如果超过delay时间
      // timer会被赋值为null，所以这个时候我们不应该执行fn，应该重新设置一个定时器
      // 但如果是一次的时候，因为还没有设过定时器，所以这里timer会是undefined
      if (timer) {
        timer = setTimeout(() => (timer = null), delay);
      } else {
        result = fn.apply(this, args);
        return result;
      }
    } else {
      timer = setTimeout(() => fn.apply(this, args), delay);
    }
  };
}

/**
 * 获取url参数
 * @param key key
 * @returns   value/undefined
 */
export function getUrlParam(key: string): string | undefined {
  const searchAry: string[] = location.search.slice(1).split("&");

  for (let i = 0; i < searchAry.length; i++) {
    const kv = searchAry[i].split("=");
    if (kv[0] === key) {
      return kv[1];
    }
  }

  return;
}

const typeMap = {
  OBJECT: "[object Object]",
  ARRAY: "[object Array]",
  STRING: "[object String]",
  NUMBER: "[object Number]",
  FORMDATA: "[object FormData]",
  NULL: "[object Null]",
  UNDEFINED: "[object Undefined]",
  BOOLEAN: "[object Boolean]",
  FUNCTION: "[object Function]",
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
    const checkType = /^\[.*\]$/.test(type)
      ? type
      : typeMap[type.toUpperCase()];
    return Object.prototype.toString.call(variable) === checkType;
  }
}

export function dateFormate(date: Date | number, fmt: string) {
  const d = new Date(date);
  const o = {
    "M+": d.getMonth() + 1, //月份
    "D+": d.getDate(), //日
    "h+": d.getHours(), //小时
    "m+": d.getMinutes(), //分
    "s+": d.getSeconds(), //秒
    "q+": Math.floor((d.getMonth() + 3) / 3), //季度
    S: d.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (d.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
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
  if (typeof value === "string") {
    value = +value;
  }
  if (value / 100000000 > 1) {
    const num = parseFloat((value / 100000000).toFixed(1));
    return num + "亿";
  } else if (value / 10000 > 1) {
    const num = parseFloat((value / 10000).toFixed(1));
    return num + "万";
  } else {
    return value;
  }
}

export function padZero(num: number | string, targetLength = 2): string {
  let str = num + "";
  while (str.length < targetLength) {
    str = "0" + str;
  }
  return str;
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
  const whitelist = ["ali2.a.kwimgs.com"];

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
    .join(",");

  return `${url}?x-oss-process=image/resize,${params}`;

  function parseUrl(url) {
    let a = document.createElement("a");
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
      return row.join(",");
    })
    .join("\r\n");

  result = "data:application/csv," + encodeURIComponent(result);

  let elem = document.createElement("A");
  elem.setAttribute("href", result);
  elem.setAttribute("download", `${fileName}.csv`);
  document.body.appendChild(elem);
  elem.click();
  elem.remove();
}
