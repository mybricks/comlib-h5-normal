import TencentCloudChat from "@tencentcloud/chat";
import TIMUploadPlugin from "tim-upload-plugin";
import TIMProfanityFilterPlugin from "tim-profanity-filter-plugin";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  let chat;

  inputs["create"]((val, outputRels) => {
    /**
     * 初始化腾讯云聊天
     */
    chat = TencentCloudChat.create({
      SDKAppID: data.SDKAppID,
      proxyServer: data.proxyServer,
      fileUploadProxy: data.fileUploadProxy,
      fileDownloadProxy: data.fileDownloadProxy,
    });

    // 设置日志级别
    chat.setLogLevel(data.logLevel);

    // 注册腾讯云即时通信 IM 上传插件
    chat.registerPlugin({ "tim-upload-plugin": TIMUploadPlugin });

    // 注册腾讯云即时通信 IM 本地审核插件
    chat.registerPlugin({
      "tim-profanity-filter-plugin": TIMProfanityFilterPlugin,
    });

    /**
     * Ready
     */
    let onSdkReady = (event) => {
      console.log("onSdkReady", event);
      outputRels["createCompleted"](event);
    };
    chat.on(TencentCloudChat.EVENT.SDK_READY, onSdkReady);
  });
}
