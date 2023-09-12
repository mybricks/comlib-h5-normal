import { isAndroid } from '@fangzhou/utils';

// 直播伴侣
function isInMate() {
  return /livemate\//i.test(navigator.userAgent);
}

const hasShopWeiget = () => {
  // 之前的电商挂件在安卓端会无法使用popBack，目前保证带挂件一定打开新页面，只能兼容一下了
  return !!new URL(location.href).searchParams.get('kwaishopTaskWidget');
};

export function rawBack(yoda: any) {
  let kwai = yoda?.kwai || yoda?.Kwai || {};
  if (isInMate()) {
    yoda.livemate.exitWebView();
  } else if (hasShopWeiget() && kwai.exitWebView && isAndroid) {
    kwai.exitWebView();
  } else if (kwai.popBack) {
    kwai.popBack();
  } else if (kwai.exitWebView) {
    kwai.exitWebView();
  } else {
    history?.back();
  }
}

/**
 * 返回
 */
export default function back(yoda: any) {
  if ((window as any)._physicalBackCb) {
    (window as any)._physicalBackCb();
  } else {
    rawBack(yoda);
  }
}
