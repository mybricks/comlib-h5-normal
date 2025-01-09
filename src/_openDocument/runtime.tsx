import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {

  if (env.runtime) {
    inputs["url"]((imagePath) => {
      // 判断是否为远程文件地址
      const isRemoteImage = imagePath.startsWith('http://') || imagePath.startsWith('https://');

      const openDocument = (filePath) => {
        Taro.openDocument({
          filePath,
          showMenu: true,
          success: (res) => {
            console.warn(res);
            outputs["onSuccess"](res);
          },
          fail: (res) => {
            console.warn(res)
          }
        });
      };

      if (isRemoteImage) {
        // 远程图片地址，先下载图片
        Taro.downloadFile({
          url: imagePath,
          success: (res) => {
            if (res.statusCode === 200) {
              openDocument(res.tempFilePath);
            } else {
              outputs["onFail"]();
            }
          },
          fail: () => {
            outputs["onFail"]();
          }
        });
      } else {
        // 本地图片地址，直接打开文件预览
        openDocument(imagePath);
      }
    });
  }

}
