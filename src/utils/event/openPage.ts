function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (let i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

function resolvePathname(to, from) {
  if (from === undefined) from = '';

  const toParts = (to && to.split('/')) || [];
  let fromParts = (from && from.split('/')) || [];

  const isToAbs = to && isAbsolute(to);
  const isFromAbs = from && isAbsolute(from);
  const mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  let hasTrailingSlash;
  if (fromParts.length) {
    const last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  let up = 0;
  for (let i = fromParts.length; i >= 0; i--) {
    const part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) fromParts.unshift('..');

  if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');

  let result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
}

/**
 * 打开新页面
 */
export default function openPage(url: string, yoda: any, openOnNewPage: boolean = true): void {
  if (openOnNewPage == false || /^kwai:\/\/.+/.test(url)) {
    location.href = url;
    return;
  }
  if (url[0] === '.') {
    url = resolvePathname(url, location.pathname);
  }
  if (url[0] === '/') {
    url = location.protocol + '//' + location.host + url;
  }
  if (yoda && yoda.kwai && yoda.kwai.loadUrlOnNewPage && url.indexOf('http') === 0) {
    yoda.kwai.loadUrlOnNewPage({
      url,
      type: 'back',
      ignoreHalfScreenDisplay: 1,
    });
  } else {
    location.href = url;
  }
}
