import { SEARCH_DELIMIT, PARAM_DELIMIT, GLOBAL } from './constants';
import { stringify, parse, Params } from './querystring';
import * as util from './util';
import { Url } from './url';

/**
 * 参数合并规则
 */
export interface SetQueryStringOptions {
  /**
   * 如果replace=true，则将替换url中相同的参数，避免出现name=1&name=2这类情况。
   * 如果replace=false，则直接将params追加到当前url后。
   */
  replace: true;
}

/**
 * 设置url地址的querystring。
 * @param url 链接地址，如果url为null/undefined，则以当前页面url作为默认值。
 * @param params 参数对象。
 * @param options 设置参数合并规则，具体见参数合并规则。
 * @returns 设置后的url地址。
 */
export function setQuerystring(url: string, params: object, options?: SetQueryStringOptions): string;

/**
 * 设置url地址的querystring。
 * @param url 当前页面url。
 * @param params 参数对象。
 * @param options 设置参数合并规则，具体见参数合并规则。
 * @returns 设置后的url地址。
 */
export function setQuerystring(params: object, options?: SetQueryStringOptions): string;

/**
 * 设置url地址的querystring。
 * @param url 链接地址，如果url为null/undefined，则以当前页面url作为默认值。
 * @param params 参数对象。
 * @param options 设置参数合并规则，具体见参数合并规则。
 * @returns 设置后的url地址。
 */
export function setQuerystring(url: any, params: any, options?: SetQueryStringOptions): string {
  // get window href
  const href = GLOBAL.location.href;

  // normalize arguments
  if (util.isObject(url)) {
    options = params;
    params = url;
    url = href;
  }

  // set href if url is undefined/null
  if (util.isUndef(url)) {
    url = href;
  }

  // merge options
  options = util.merge(
    {
      replace: true,
    },
    options,
  );

  const instance = new Url(url as string);
  if (options!.replace) {
    // merge params if is replace
    instance.query = util.merge(instance.query || {}, params);
  } else {
    const search = stringify(params);
    if (search) {
      const delimit = instance.search.indexOf(SEARCH_DELIMIT) === -1 ? SEARCH_DELIMIT : PARAM_DELIMIT;
      instance.search += delimit + search;
    }
  }

  return instance.toString();
}

/**
 * 获取传入url地址的参数对象。
 * @param url 链接地址 如果url为null/undefined，则以当前页面url作为默认值，如果url为相对地址，不进行url规整化处理。
 * @returns 序列化后的参数对象。
 */
export function getQuerystring(url?: string): Params {
  if (util.isUndef(url)) {
    url = GLOBAL.location.href;
  }
  return parse(url!);
}

export const getUrlParam = (value: string) => new URL(location.href).searchParams.get(value) || '';
export { Url };

export const getIdcAvailUrl = (orgUrl) => {
  const localHostname = (location && location.hostname) || '';
  const BACKUP_IDC_DOMAIN = '.kwaigobuy.com';
  const backupIDCReg = new RegExp(BACKUP_IDC_DOMAIN.replace(/\./g, '\\.') + '$');
  const islocalKwaigobuy = backupIDCReg.test(localHostname);
  let url: any = '';

  const fillProtocol = (url) => {
    if (/^\/\//.test(url)) {
      return 'https:' + url;
    }
    return url;
  };

  const getIdcAvailHostname = (hostname) => {
    // @ts-ignore
    let domains = (window && window.DOMAINS) || '';
    let result = '' + domains[hostname];
    // 合法的 hostname 判断
    if (!/^(?:[\w\-]+\.)+\w{2,}$/.test(result)) {
      result = hostname;
    }
    return result;
  };

  try {
    url = new URL(fillProtocol(orgUrl));
  } catch {
    // 提供的 orgUrl 为非法 url，或浏览器环境不支持 URL 对象的，全都原样返回
    return orgUrl;
  }

  url.hostname = getIdcAvailHostname(url.hostname);

  // 兜底 idc 逃生。如果当前根域为 kwaigobuy 且 url.hostname 的根域为 kwaixiaodian
  // 时，强制切到 kwaigobuy 上来
  if (islocalKwaigobuy) {
    url.hostname = url.hostname.replace(/\.kwaixiaodian\.com$/, BACKUP_IDC_DOMAIN);
  }

  let result = url.toString();

  if (url.pathname === '/' && !/\/$/.test(orgUrl)) {
    return result.replace(/\/$/, '');
  }

  return result;
};
