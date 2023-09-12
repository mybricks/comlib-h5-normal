import * as util from '../util';
import { parse, stringify, Params } from '../querystring';
import { SEARCH_DELIMIT, GLOBAL } from '../constants';

interface AElement extends Element {
  [key: string]: any;
}

const QUERY_PROPERTY = 'query';
const NORMAL_PROPERTIES = ['hash', 'host', 'hostname', 'pathname', 'port', 'protocol'];
const QUERY_RELATED_PROPERTIES = ['href', 'search'];
const READONLY_PROPERTIES = ['origin'];

const defineProperty = Object.defineProperty;

// validate url property
function validate(name: string, value: string): boolean {
  if (name === QUERY_PROPERTY) {
    return util.isObject(value);
  }
  return util.isString(value) || util.isNumber(value);
}

function getSearch(query: object): string {
  // stringify query to search string
  const search = stringify(query);
  // always use query as search string
  return (search ? SEARCH_DELIMIT : '') + search;
}

function defineNormalProperties(instance: Url, element: AElement) {
  function handler(name: string) {
    defineProperty(instance, name, {
      get() {
        return element[name];
      },
      set(value) {
        if (!validate(name, value)) {
          return;
        }
        element[name] = value;
      },
      enumerable: true,
    });
  }
  NORMAL_PROPERTIES.forEach(handler);
}

function defineQueryProperty(instance: Url, element: AElement) {
  function handler(name: string) {
    defineProperty(instance, name, {
      get() {
        // set search property then normalize query
        instance.search = getSearch(element[name]);
        return element[name];
      },
      set(value) {
        if (!validate(name, value)) {
          return;
        }
        element[name] = value;
      },
      enumerable: true,
    });
  }
  handler(QUERY_PROPERTY);
}

function defineQueryRelatedProperties(instance: Url, element: AElement) {
  function handler(name: string) {
    defineProperty(instance, name, {
      get() {
        element.search = getSearch(element[QUERY_PROPERTY]);
        return element[name];
      },
      set(value) {
        if (!validate(name, value)) {
          return;
        }
        element[name] = value;
        // sync query from search
        element[QUERY_PROPERTY] = parse(element.search);
      },
      enumerable: true,
    });
  }
  QUERY_RELATED_PROPERTIES.forEach(handler);
}

function defineReadonlyProperties(instance: Url, element: AElement) {
  function handler(name: string) {
    defineProperty(instance, name, {
      get() {
        return element[name];
      },
      enumerable: true,
    });
  }
  READONLY_PROPERTIES.forEach(handler);
}

/**
 * Url类
 * ```
 * const url = new Url('https://www.kuaishou.com/')
 * // get url href
 * let href = url.href
 * // set url href
 * url.href = 'https://www.kuaishou.com/a.html'
 * console.log(url.host) // www.kuaishou.com
 * ```
 */
export class Url {
  /**
   * query 为参数对象，可修改或者追加参数，为了更好的兼容与容错，与URLSearchParams稍有不同，参数value序列化规则如下：
   *  1. 对于 null/undefined，参数设置无效。
   *  2. 对于空字符串，参数设置为空字符串。
   *  3. 对于数组，参数设置为name=array[0]&name=array[1]……。
   *  4. 其他类型均调用 encodeURIComponent 进行序列化。
   */
  public query!: Params;
  public search!: string;
  public hash!: string;
  public host!: string;
  public hostname!: string;
  public pathname!: string;
  public port!: string;
  public protocol!: string;
  public href!: string;
  /**
   * origin 为只读属性，不可修改。
   */
  public readonly origin!: string;
  private _element: AElement;
  /**
   * Url
   * @param url 链接地址，未传递使用当前页面链接，如果为相对地址，则会以当前页面url作为base url。
   */
  public constructor(url?: string) {
    // if url is empty then set default href
    if (util.isEmpty(url)) {
      url = GLOBAL.location.href;
    }

    // create element
    const element = (this._element = GLOBAL.document.createElement('A'));

    // refresh href
    element.href = url;

    // define normal properties
    defineNormalProperties(this, this._element);

    // define query related properties
    defineQueryRelatedProperties(this, this._element);

    // define query property
    defineQueryProperty(this, this._element);

    // define readonly properties
    defineReadonlyProperties(this, this._element);

    // refresh query
    this.href = element.href;
  }
  /**
   * toString方法，在String(instance)调用。
   * @returns href属性。
   */
  public toString(): string {
    return this.href;
  }
}
