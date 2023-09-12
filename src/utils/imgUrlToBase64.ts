const urlToBase64 = (url: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // 如果图片支持跨域访问，这个设置是必要的
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL();
      resolve(dataURL);
    };
    img.onerror = (err) => {
      reject(err);
    };
    img.src = url;
  });

export default urlToBase64;
