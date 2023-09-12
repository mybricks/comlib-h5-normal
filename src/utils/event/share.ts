import docCookie from '../cookie';
/**
 * 分享
 */
export default function share(env, logger?, shareParams?, cb?) {
  // env?.yoda?.ui?.showLoading('分享中...');
  if (typeof env?.yoda?.kwai.share === 'function') {
    if (shareParams?.subBiz) {
      // 自定义分享配置
      env.yoda.Kwai.share(
        {
          param: {
            shareContent: 'ACTIVITY',
            showSharePanel: true,
            shareObjectId: docCookie.getItem('ud'),
            ...shareParams,
          },
        },
        function (res) {
          typeof cb === 'function' && cb(res);
          // env?.yoda?.ui?.hideLoading();
        },
      );
    } else {
      // 页面默认分享配置
      env.kwai.share(
        {
          ...shareParams,
        },
        function (res) {
          typeof cb === 'function' && cb(res);
          // env?.yoda?.ui?.hideLoading();
        },
      );
    }
  } else {
    logger?.error('无法调起分享');
    // env?.yoda?.ui?.hideLoading();
  }
}
