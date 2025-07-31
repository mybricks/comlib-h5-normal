import { useState, useEffect, useRef, useCallback } from "react";

const urlCache = new Map();

function getFinalUrl(url) {
  // 先检查缓存
  if (urlCache.has(url)) {
    console.log('从缓存中获取URL');
    return Promise.resolve(urlCache.get(url));
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // 不要真正下载资源，只需要头信息
    xhr.open('HEAD', url);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 400) {
          const finalUrl = xhr.responseURL;
          urlCache.set(url, finalUrl); // 存入缓存
          resolve(finalUrl);
        } else {
          reject(new Error('Request failed'));
        }
      }
    };

    xhr.onerror = function () {
      reject(new Error('Network error'));
    };

    xhr.send();
  });
}

/** 获取被重定向后的真正url */
export const useRedirectedImageUrl = (url, onSuccess) => {
  useEffect(() => {
    if (!url || new URL(url).host !== 'ai.mybricks.world') {
      return 
    }
    getFinalUrl(url).then((finalUrl) => {
      onSuccess(finalUrl)
    })
  }, [url])
}