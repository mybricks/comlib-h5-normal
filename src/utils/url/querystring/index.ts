import * as util from '../util';
import { PARAM_DELIMIT, PARAM_VALUE_DELIMIT } from '../constants';

const SEARCH_REGXP = /^[^\?#]*\?([^#]*)/;

function getSearch(url: string): string {
  let matchs: string[] | null;
  return (url && (matchs = url.match(SEARCH_REGXP)) && matchs[1]) || '';
}

// encodeURIComponent将空格转换为%20，浏览器、Java、Php均能转换为空格
// URLSearchParams、URL将空格转换为+，浏览器、Java、Php均能转换为空格
// 此处不遵循RFC-1738规范，依旧将空格转换为%20，为了兼容业务或者其他开源库处理参数时，未将+转换为空格，这种做法兼容性更友好
function encode(value: any): string {
  return encodeURIComponent(value);
}

// 遵循RFC-1738规范，将+转换为空格，%20同时也转换为空格
// 将Java、Php传递的+转换为对应的空格，兼容RFC-1738规范，前提是参数一定是编码过的，未编码的参数不符合参数处理规范。
function decode(value: any): string {
  return decodeURIComponent(value.replace(/\+/g, ' '));
}

export interface Params {
  [key: string]: string | string[];
}

/**
 * @ignore
 */
export function parse(url: string): Params {
  // get search string
  url = getSearch(url);

  // split params
  const parts = url.split(PARAM_DELIMIT);

  const params: Params = {};
  parts.forEach((param) => {
    // if param is empty
    if (!param) {
      return;
    }
    // split param value
    const splits = param.split(PARAM_VALUE_DELIMIT);
    let name = splits[0];

    // param is ?a=a=1&b=1
    // set param = '' if querystring is '?param'
    let value = splits.slice(1).join(PARAM_VALUE_DELIMIT) || '';

    if (name) {
      name = decode(name);
      value = decode(value);
      if (util.hasOwn(params, name)) {
        if (!util.isArray(params[name])) {
          params[name] = [params[name] as string];
        }
        // tslint:disable-next-line
        (params[name] as string[]).push(value);
      } else {
        params[name] = value;
      }
    }
  });
  return params;
}
/**
 * @ignore
 */
export function stringify(params: object): string {
  /* istanbul ignore next */
  if (!util.isObject(params)) {
    return '';
  }

  const search: string[] = [];
  util.forEach(params, (value, name) => {
    if (!util.isUndef(value)) {
      if (!util.isArray(value)) {
        value = [value];
      }

      name = encode(name);

      // normalize {name:array} param to name=array[0]&name=array[1]
      value.forEach((val: string) => {
        search.push(`${name}${PARAM_VALUE_DELIMIT}${encode(val)}`);
      });
    }
  });
  return search.join(PARAM_DELIMIT);
}
