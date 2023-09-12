export const cdnCut = ({
  url,
  width,
  height,
}: {
  url: string;
  width: number;
  height: number;
}): string => {
  if (!url || typeof url !== "string" || url.endsWith(".svg")) return url;

  let handledUrl = url;
  let flag = "";
  let reg;
  let spliceStr;

  if (handledUrl.indexOf("?") > 0) {
    flag = "&";
  } else {
    flag = "?";
  }
  if (
    handledUrl.indexOf("ali-ad") > -1 ||
    handledUrl.indexOf("ali-ec") > -1 ||
    handledUrl.indexOf("ali2.a.kwimgs.com") > -1 ||
    handledUrl.indexOf("kcdn.staging.kuaishou.com") ||
    handledUrl.indexOf("a.yximgs.com")
  ) {
    reg = /(x-oss-process)(.*)(interlace,1)/;
    spliceStr = `x-oss-process=image/resize,m_fill,w_${width * 3},h_${
      height * 3
    }/format,jpg/interlace,1`;
  } else if (url.indexOf("tx-ad") > -1 || url.indexOf("tx-ec") > -1) {
    reg = /(imageView2)(.*)(interlace\/1)/;
    spliceStr = `imageView2/1/w/${width * 3}/h/${
      height * 3
    }/format/jpg/interlace/1`;
  } else if (
    url.indexOf("s1.") > -1 ||
    url.indexOf("s2.") > -1 ||
    url.includes("f2.eckwai.com")
  ) {
    reg = /(x-oss-process)(.*)(quality,q_85)/;
    spliceStr = `x-oss-process=image/resize,w_${width * 3},h_${
      height * 3
    },m_lfit,limit_0/auto-orient,0/quality,q_85`;
  }
  if (reg && spliceStr) {
    if (reg.test(handledUrl)) {
      handledUrl = handledUrl.replace(reg, spliceStr);
    } else {
      handledUrl += `${flag}${spliceStr}`;
    }
  }

  return handledUrl;
};
