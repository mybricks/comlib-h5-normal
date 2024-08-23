import React, { useCallback, useEffect, useMemo, useState } from "react";
import Runtime from "./runtime";

export default function (props) {
  const extra = {
    defaultMessages: [
      {
        avatar: "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
        role: "assistant",
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
