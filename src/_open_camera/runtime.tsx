import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (env.runtime) {
    inputs["takePhotos"](() => {
      Taro.chooseImage({
        count: data.photoCount, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: data.selectMethodConfig, // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          // var tempFilePaths = res.tempFilePaths;
          // outputs["onSuccess"]?.(tempFilePaths);
          outputs["onSuccess"]?.(res);
        },
        fail: ({ errMsg }) => {
          outputs["onFail"]?.({ errMsg });
        },
      });
    });
  }
}
