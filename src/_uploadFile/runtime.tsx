import * as Taro from "@tarojs/taro";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["upload"]((value) => {
    // 前置校验
    if (!data.url) {
      outputs["onFail"]("请填写上传地址");
      return;
    }

    if (!data.name) {
      outputs["onFail"]("请填写文件对应的 key");
      return;
    }

    if (!Array.isArray(value?.filePaths)) {
      outputs["onFail"]("请上传文件");
      return;
    }

    // 已上传文件
    let uploadedFile = [];

    // 待上传文件数量
    let waitUploadCount = value.filePaths.length;

    value.filePaths.forEach((filePath) => {
      Taro.uploadFile({
        withCredentials: false,
        url: data.url,
        filePath: filePath,
        name: data.name,
        formData: {
          ...(value.formData || {}),
        },
        success(res) {
          // 接口返回的信息
          let data = res.data;

          if (data) {
            try {
              data = JSON.parse(data);
            } catch (err) {}
          }

          uploadedFile.push(data);

          // 上传完成
          if (uploadedFile.length === waitUploadCount) {
            outputs["onSuccess"](uploadedFile);
          }
        },
      });
    });
  });
}
