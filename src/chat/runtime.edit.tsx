import React, { useCallback, useEffect, useMemo, useState } from "react";
import Runtime from "./runtime";

export default function (props) {
  const extra = {
    messages: [
      {
        id: "a",
        userProfile: {
          userID: "zhangsan",
          nickname: "张三",
          avatar: "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
        },
        message: {
          type: "text",
          payload: { text: "Hello world!" },
          forShow: "Hello world!",
          timestamp: 1726642706,
        },
      },
      {
        id: "b",
        userProfile: {
          userID: "lisi",
          nickname: "李四",
          avatar: "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
        },
        message: {
          type: "text",
          payload: { text: "Hello world!" },
          forShow: "Hello world!",
          timestamp: 1726642706,
        },
      },
      {
        id: "c",
        userProfile: {
          userID: "zhangsan",
          nickname: "张三",
          avatar: "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
        },
        message: {
          type: "image",
          payload: { image: "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png" },
          forShow: "[图片]",
          timestamp: 1726642706,
        },
      },
      {
        id: "d",
        userProfile: {
          userID: "lisi",
          nickname: "李四",
          avatar: "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
        },
        message: {
          type: "image",
          payload: { image: "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png" },
          forShow: "[图片]",
          timestamp: 1726642706,
        },
      },
    ],
    loginUserId: "zhangsan",
  };

  return <Runtime {...props} extra={extra} />;
}
