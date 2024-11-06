export const getParamsType = (propsTypeName: string = 'any') => `
declare interface Params {
  inputs: Record<string, Function>;
  outputs: Record<string, Function>;
  context: {
    React: typeof React;
  };
}
`

export async function requireScriptFromUrl(url) {
  return new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.src = url
    document.body.appendChild(el)
    el.onload = () => {
      resolve(true)
    }
    el.onerror = () => {
      reject(new Error(`加载${url}失败`))
    }
  })
}

interface AssetsDep {
  name: string,
  deps: {
    tag: 'script',
    url: string,
    library: string,
    fallbackUrls?: string[]
  }[]
}

export async function loadExternalAssetsDeps(deps: AssetsDep[]) {
  const loadPromises: Promise<void>[] = [];

  for (const asset of deps) {

    if (window[asset.name]) {
      loadPromises.push(Promise.resolve());
      continue
    }

    for (const dep of asset.deps) {
      const loadPromise = (async () => {
        try {
          await requireScriptFromUrl(dep.url);
        } catch (error) {
          let loaded = false;
          for (const fallbackUrl of (dep.fallbackUrls ?? [])) {
            try {
              await requireScriptFromUrl(fallbackUrl);
              loaded = true;
              break;
            } catch (fallbackError) {
              // @ts-ignore
              console.error(fallbackError.message);
            }
          }
          if (!loaded) {
            console.error(`load ${asset.name} failed for ${dep.url}`);
          }
        }
      })();
      loadPromises.push(loadPromise);
    }
  }

  await Promise.all(loadPromises);
}

/** 复制文本到粘贴板 */
export function copyToClipboard(text) {
  return new Promise((resolve, reject) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        resolve('Text copied to clipboard successfully!');
      }).catch((err) => {
        reject('Could not copy text: ' + err);
      });
    } else {
      // Fallback for browsers that do not support Clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (successful) {
          resolve('Text copied to clipboard successfully!');
        } else {
          reject('Copy command was unsuccessful');
        }
      } catch (err) {
        document.body.removeChild(textArea);
        reject('Oops, unable to copy: ' + err);
      }
    }
  });
}