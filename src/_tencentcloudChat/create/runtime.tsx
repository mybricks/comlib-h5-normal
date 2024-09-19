import TencentCloudChat from "@tencentcloud/chat";
import TIMUploadPlugin from "tim-upload-plugin";
import TIMProfanityFilterPlugin from "tim-profanity-filter-plugin";
import { genUserSig } from "./utils/GenerateUserSig";

export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  let chat;

  inputs["create"](({ userID }, outputRels) => {
    if (typeof userID !== "string") {
      return;
    }

    /**
     * 初始化腾讯云聊天
     */
    chat = TencentCloudChat.create({
      SDKAppID: data.SDKAPPID,
      // proxyServer: data.proxyServer,
      // fileUploadProxy: data.fileUploadProxy,
      // fileDownloadProxy: data.fileDownloadProxy,
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
     * 监听事件
     */

    // 监听事件，如：
    chat.on(TencentCloudChat.EVENT.SDK_READY, function (event) {
      console.warn("SDK_READY", event);
      env.global['tencentcloudChat'] = chat;
      outputRels["onSDKReady"]();


      // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
      // event.name - TencentCloudChat.EVENT.SDK_READY
    });

    chat.on(TencentCloudChat.EVENT.MESSAGE_RECEIVED, function (event) {
      console.warn("MESSAGE_RECEIVED", event);
      outputRels["onMessageReceived"](event.data);
      // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
      // event.name - TencentCloudChat.EVENT.MESSAGE_RECEIVED
      // event.data - 存储 Message 对象的数组 - [Message]
    });

    chat.on(TencentCloudChat.EVENT.MESSAGE_MODIFIED, function (event) {
      // 收到消息被第三方回调修改的通知，消息发送方可通过遍历 event.data 获取消息列表数据并更新页面上同 ID 消息的内容
      // event.name - TencentCloudChat.EVENT.MESSAGE_MODIFIED
      // event.data - 存储被第三方回调修改过的 Message 对象的数组 - [Message]
    });

    chat.on(TencentCloudChat.EVENT.MESSAGE_REVOKED, function (event) {
      // 收到消息被撤回的通知。
      // event.name - TencentCloudChat.EVENT.MESSAGE_REVOKED
      // event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
    });

    chat.on(TencentCloudChat.EVENT.MESSAGE_READ_BY_PEER, function (event) {
      // SDK 收到对端已读消息的通知，即已读回执。
      // event.name - TencentCloudChat.EVENT.MESSAGE_READ_BY_PEER
      // event.data - event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isPeerRead 属性值为 true
    });

    chat.on(TencentCloudChat.EVENT.CONVERSATION_LIST_UPDATED, function (event) {
      console.warn("CONVERSATION_LIST_UPDATED", event);
      outputRels["onConversationListUpdated"](event.data);

      // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
      // event.name - TencentCloudChat.EVENT.CONVERSATION_LIST_UPDATED
      // event.data - 存储 Conversation 对象的数组 - [Conversation]
    });

    chat.on(TencentCloudChat.EVENT.GROUP_LIST_UPDATED, function (event) {
      // 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面
      // event.name - TencentCloudChat.EVENT.GROUP_LIST_UPDATED
      // event.data - 存储 Group 对象的数组 - [Group]
    });

    chat.on(TencentCloudChat.EVENT.PROFILE_UPDATED, function (event) {
      // 收到自己或好友的资料变更通知
      // event.name - TencentCloudChat.EVENT.PROFILE_UPDATED
      // event.data - 存储 Profile 对象的数组 - [Profile]
    });

    chat.on(TencentCloudChat.EVENT.BLACKLIST_UPDATED, function (event) {
      // 收到黑名单列表更新通知
      // event.name - TencentCloudChat.EVENT.BLACKLIST_UPDATED
      // event.data - 存储 userID 的数组 - [userID]
    });

    chat.on(TencentCloudChat.EVENT.SDK_NOT_READY, function (event) {
      console.warn("SDK_NOT_READY", event);
      outputRels["onSDKNotReady"]();
      // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
      // event.name - TencentCloudChat.EVENT.SDK_NOT_READY
    });

    chat.on(TencentCloudChat.EVENT.KICKED_OUT, function (event) {
      // 收到被踢下线通知
      // event.name - TencentCloudChat.EVENT.KICKED_OUT
      // event.data.type - 被踢下线的原因，例如 :
      //   - TencentCloudChat.TYPES.KICKED_OUT_MULT_ACCOUNT 多实例登录被踢
      //   - TencentCloudChat.TYPES.KICKED_OUT_MULT_DEVICE 多终端登录被踢
      //   - TencentCloudChat.TYPES.KICKED_OUT_USERSIG_EXPIRED 签名过期被踢
      //   - TencentCloudChat.TYPES.KICKED_OUT_REST_API(REST API kick 接口踢出。)
    });

    chat.on(TencentCloudChat.EVENT.NET_STATE_CHANGE, function (event) {
      // 网络状态发生改变
      // event.name - TencentCloudChat.EVENT.NET_STATE_CHANGE
      // event.data.state 当前网络状态，枚举值及说明如下：
      //   - TencentCloudChat.TYPES.NET_STATE_CONNECTED - 已接入网络
      //   - TencentCloudChat.TYPES.NET_STATE_CONNECTING - 连接中。很可能遇到网络抖动，SDK 在重试。接入侧可根据此状态提示“当前网络不稳定”或“连接中”
      //   - TencentCloudChat.TYPES.NET_STATE_DISCONNECTED - 未接入网络。接入侧可根据此状态提示“当前网络不可用”。SDK 仍会继续重试，若用户网络恢复，SDK 会自动同步消息
    });

    chat.on(TencentCloudChat.EVENT.FRIEND_LIST_UPDATED, function (event) {
      // 收到好友列表更新通知
      // event.name - TencentCloudChat.EVENT.FRIEND_LIST_UPDATED
      // event.data - 存储 Friend 对象的数组 - [Friend]
    });

    chat.on(
      TencentCloudChat.EVENT.FRIEND_APPLICATION_LIST_UPDATED,
      function (event) {
        // 收到好友申请列表更新通知
        // event.name - TencentCloudChat.EVENT.FRIEND_APPLICATION_LIST_UPDATED
        // friendApplicationList - 好友申请列表 - [FriendApplication]
        // unreadCount - 好友申请的未读数
        // const { friendApplicationList, unreadCount } = event.data;
        // 发送给我的好友申请（即别人申请加我为好友）
        // const applicationSentToMe = friendApplicationList.filter((friendApplication) => friendApplication.type === TencentCloudChat.TYPES.SNS_APPLICATION_SENT_TO_ME);
        // 我发送出去的好友申请（即我申请加别人为好友）
        // const applicationSentByMe = friendApplicationList.filter((friendApplication) => friendApplication.type === TencentCloudChat.TYPES.SNS_APPLICATION_SENT_BY_ME);
      }
    );

    chat.on(TencentCloudChat.EVENT.FRIEND_GROUP_LIST_UPDATED, function (event) {
      // 收到好友分组列表更新通知
      // event.name - TencentCloudChat.EVENT.FRIEND_GROUP_LIST_UPDATED
      // event.data - 存储 FriendGroup 对象的数组 - [FriendGroup]
    });

    /************
     * 开始登录
     ************/
    let userSig = genUserSig({
      SDKAPPID: data.SDKAPPID,
      SECRETKEY: data.SECRETKEY,
      EXPIRETIME: 7 * 24 * 60 * 60,
      userID: userID,
    });
    
    chat.login({ userID: userID, userSig: userSig });
  });
}
