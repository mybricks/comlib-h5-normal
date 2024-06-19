import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (env.runtime) {
    inputs["call"]((imagePath) => {
      // 判断是否为远程图片地址
      const isRemoteImage = imagePath.startsWith('http://') || imagePath.startsWith('https://');

      const saveImage = (filePath) => {
        Taro.saveImageToPhotosAlbum({
          filePath,
          success: (res) => {
            console.warn(res);
            
            Taro.showToast({
              title: "保存成功",
              icon: "none",
              duration: 1000
            });

            outputs["onSuccess"](res);
          },
          fail: (res) => {
            console.warn(res);

            switch (res.errno) {
              // 用户未授权，需要引导用户授权
              case 103: // 用户拒绝了授权
                Taro.showModal({
                  title: "提示",
                  content: "请先授权保存图片到相册",
                  showCancel: true,
                  confirmText: "去授权",
                  cancelText: "取消",
                  success: (res) => {
                    if (res.confirm) {
                      Taro.openSetting({
                        success: (res) => {
                          if (res.authSetting["scope.writePhotosAlbum"]) {
                            // 用户已授权，重新尝试保存图片
                            Taro.saveImageToPhotosAlbum({
                              filePath,
                              success: (res) => {
                                console.warn(res);

                                Taro.showToast({
                                  title: "保存成功",
                                  icon: "none",
                                  duration: 1000
                                });

                                outputs["onSuccess"](res);
                              },
                              fail: () => {
                                outputs["onFail"]();
                              }
                            });
                          } else {
                            outputs["onFail"]();
                          }
                        },
                        fail: () => {
                          outputs["onFail"]();
                        }
                      });
                    } else {
                      outputs["onFail"]();
                    }
                  },
                  fail: () => {
                    outputs["onFail"]();
                  }
                });
                break;

              default:
                outputs["onFail"]();
                break;
            }
          }
        });
      };

      if (isRemoteImage) {
        // 远程图片地址，先下载图片
        Taro.downloadFile({
          url: imagePath,
          success: (res) => {
            if (res.statusCode === 200) {
              saveImage(res.tempFilePath);
            } else {
              outputs["onFail"]();
            }
          },
          fail: () => {
            outputs["onFail"]();
          }
        });
      } else {
        // 本地图片地址，直接保存
        saveImage(imagePath);
      }
    });
  }
}