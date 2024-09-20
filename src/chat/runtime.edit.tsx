import React, { useCallback, useEffect, useMemo, useState } from "react";
import Runtime from "./runtime";

export default function (props) {
  const extra = {
    defaultMessages: [
      {
        conversationID: "C2Cstuzhaoxing",
        unreadCount: 3,
        type: "C2C",
        lastMessage: {
          lastTime: 1726642706,
          lastSequence: 1458260001,
          fromAccount: "stuzhaoxing",
          type: "TIMTextElem",
          payload: { text: "Hello world!" },
          cloudCustomData: "",
          isRevoked: false,
          onlineOnlyFlag: false,
          nick: "",
          nameCard: "",
          version: 0,
          isPeerRead: false,
          revoker: null,
          messageForShow: "Hello world!",
        },
        _isInfoCompleted: false,
        peerReadTime: 0,
        groupAtInfoList: [],
        remark: "",
        isPinned: false,
        messageRemindType: "AcceptAndNotify",
        markList: [],
        customData: "",
        conversationGroupList: [],
        draftText: "",
        userProfile: {
          userID: "stuzhaoxing",
          nick: "",
          gender: "",
          birthday: 0,
          location: "",
          selfSignature: "",
          allowType: "AllowType_Type_AllowAny",
          language: 0,
          avatar: "",
          messageSettings: 0,
          adminForbidType: "AdminForbid_Type_None",
          level: 0,
          role: 0,
          lastUpdatedTime: 0,
          profileCustomField: [],
        },
        subType: "",
      },
      {
        recordId: "xxxxx",
        userProfile: {
          userID: "stuzhaoxing",
          nickname: "stuzhaoxing",
          avatar:
            "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
          role: "assistant",
        },
        message: {
          type: "text",
          payload: { text: "Hello world!" },
          timestamp: 1726642706,
          
          cloudCustomData: "",
          isRevoked: false,
          onlineOnlyFlag: false,
          nick: "",
          nameCard: "",
          version: 0,
          isPeerRead: false,
          revoker: null,
          messageForShow: "Hello world!",

          contentType: "text",
          content: "啊开发接口的飞机啊看大煞风景大法",
        },
      },
      {
        avatar:
          "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
        role: "user",
        contentType: "text",
        content: "啊开发接口的飞机啊看大煞风景大法",
      },
      {
        avatar:
          "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
        role: "assistant",
        contentType: "image",
        content:
          "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
      },
      {
        avatar:
          "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
        role: "user",
        contentType: "text",
        content: "啊开发接口的飞机啊看大煞风景大法",
      },
      {
        avatar:
          "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
        role: "user",
        contentType: "text",
        content: "啊开发接口的飞机啊看大煞风景大法",
      },
      {
        avatar:
          "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
        role: "assistant",
        contentType: "image",
        content:
          "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
      },
      {
        avatar:
          "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
        role: "user",
        contentType: "text",
        content: "啊开发接口的飞机啊看大煞风景大法",
      },
      {
        avatar:
          "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
        role: "user",
        contentType: "text",
        content: "啊开发接口的飞机啊看大煞风景大法",
      },
      {
        avatar:
          "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
        role: "assistant",
        contentType: "image",
        content:
          "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
      },
      {
        avatar:
          "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
        role: "user",
        contentType: "text",
        content: "啊开发接口的飞机啊看大煞风景大法",
      },
      {
        avatar:
          "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
        role: "user",
        contentType: "text",
        content: "啊开发接口的飞机啊看大煞风景大法",
      },
      {
        avatar:
          "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
        role: "assistant",
        contentType: "image",
        content:
          "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
      },
      {
        avatar:
          "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
        role: "user",
        contentType: "text",
        content: "啊开发接口的飞机啊看大煞风景大法",
      },
    ],
  };

  return <Runtime {...props} extra={extra} />;
}
