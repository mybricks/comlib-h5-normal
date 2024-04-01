import * as Taro from "@tarojs/taro";
import UploadOssHelper from "./utils/oss";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["upload"]((value) => {
    /**
     * 自定义
     */
    if (data.mode === "custom") {
      Taro.uploadFile({
        withCredentials: false,
        url: data.custom.url,
        filePath: value.filePath,
        name: data.custom.name,
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

          // 上传完成
          outputs["onSuccess"](uploadedFile);
        },
      });
      return;
    }

    /**
     * 阿里云 OSS
     */
    if (data.mode === "quick" && data.platform === "oss") {
      const ossHelper = new UploadOssHelper({
        accessKeyId: data.oss.accessKeyId,
        accessKeySecret: data.oss.accessKeySecret,
      });

      const params = ossHelper.createUploadParams();

      Taro.uploadFile({
        withCredentials: false,
        url: data.oss.host,
        filePath: value.filePath,
        name: "file",
        formData: {
          ...(value.formData || {}),

          policy: params.policy,
          OSSAccessKeyId: params.OSSAccessKeyId,
          signature: params.signature,
        },
        success(res) {
          if (res.statusCode === 204) {
            outputs["onSuccess"](`${data.oss.host}/${value.formData.key}`);
          } else {
            outputs["onFail"](res);
          }
        },
      });
      return;
    }
  });
}
