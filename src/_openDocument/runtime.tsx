import * as Taro from "@tarojs/taro";

const parseFileInfo = (url) => {
  try {
    // 解码URL中的中文字符
    const decodedUrl = decodeURIComponent(url);
    
    // 获取URL的最后一部分作为文件名
    const fileName = decodedUrl.split('/').pop();
    
    // 获取文件扩展名
    const fileExtension = fileName.split('.').pop().toLowerCase();
    
    return {
      fileName: fileName,          // 完整文件名
      extension: fileExtension,    // 文件扩展名
    };
  } catch (error) {
    console.error('URL解析失败:', error);
    return null;
  }
}

export default function ({ env, data, inputs, outputs }) {

  if (env.runtime) {
    inputs["url"]((path) => {
      // 判断是否为远程文件地址
      const isRemoteImage = path.startsWith('http://') || path.startsWith('https://');
      const fileInfo = parseFileInfo(path);

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
        // 远程地址，先下载
        Taro.downloadFile({
          url: path,
          filePath:`${Taro.env.USER_DATA_PATH}/${fileInfo?.fileName}`,
          success: (res) => {
            if (res.statusCode === 200) {
              console.log("下载成功",res);
              openDocument(res.filePath);
            } else {
              outputs["onFail"]();
            }
          },
          fail: () => {
            outputs["onFail"]();
          }
        });
      } else {
        // 本地地址，直接打开文件预览
        openDocument(path);
      }
    });
  }

}
