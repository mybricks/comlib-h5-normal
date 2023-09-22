import Taro from "@tarojs/taro";


if (isH5) {
  if (!document?.body?.appendChild?._is_mybricks_desn_adapt_) {
    const oriAppend = document.body.appendChild;
    document.body.appendChild = (child: any) => {
      if (child?.className === 'weui-picker__overlay') {
        const root = document.getElementById("_mybricks-geo-webview_")?.shadowRoot.querySelector('class^=debugCanvas-')
        return root?.appendChild(child)
      }
      return oriAppend.call(document.body, child)
    }
    document.body.appendChild._is_mybricks_desn_adapt_ = true
  }
}

// @ts-ignore
const isH5 = Taro.getEnv() === Taro.ENV_TYPE.WEB || Taro.getEnv() === "Unknown";

const getDesnRootElement = () => {
  return document.getElementById("_mybricks-geo-webview_")?.shadowRoot
}

const getDesnDebugRootElement = () => {
  return getDesnRootElement()?.querySelector?.('[class^=debugCanvas-]')
}

export const polyfill_taro_picker = () => {
  if (!isH5) {
    return
  }

  if (!(window as any).mybrciks_taro_polyfill_taro_picker) {
    const oriAppend = document.body.appendChild;
    document.body.appendChild = (child: any) => {
      if (child?.className === 'weui-picker__overlay') {
        return getDesnDebugRootElement()?.appendChild(child)
      }
      return oriAppend.call(document.body, child)
    };
    (window as any).mybrciks_taro_polyfill_taro_picker = true;
  }
}

export const polyfill_taro_swiper = () => {
  if (!isH5) {
    return
  }

  if (!(window as any).mybrciks_taro_polyfill_taro_swiper) {
    // 设计器兼容 https://www.npmjs.com/package/swiper/v/6.8.0?activeTab=code 这个版本的swiper
    const oriQs = document.querySelectorAll;
    document.querySelectorAll = (selector: string) => {
      if (selector.indexOf(".taro-swiper-") > -1) {
        return getDesnRootElement()?.querySelectorAll(selector);
      }
      return oriQs.call(document, selector);
    };
    (window as any).mybrciks_taro_polyfill_taro_swiper = true;
  }
}



