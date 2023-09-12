import back from './back';

/**
 * 关闭
 */
export default function close(yoda) {
  if (typeof yoda?.webview?.backOrClose === 'function') {
    yoda.webview.backOrClose().then((res) => {
      console.log('backOrClose');
    });
  } else {
    back(yoda);
  }
}
