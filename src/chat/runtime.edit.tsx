import React, { useCallback, useEffect, useMemo, useState } from "react";
import Runtime from "./runtime";

export default function (props) {
  const extra = {
    messages: [
      {
        ID: "112",
        flow:"out",
        nick: "张三",
        avatar: "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
        payload:{
          text:"hello!"
        },
        type: "TIMTextElem"
      },
      {
        ID: "113",
        flow:"in",
        nick: "李四",
        avatar: "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
        payload:{
          text:"hello! MyFriend~"
        },
        type: "TIMTextElem"
      },
      {
        ID: "114",
        flow:"out",
        nick: "张三",
        avatar: "https://ali-ec.static.yximgs.com/udata/pkg/eshop/chrome-plugin-upload/2023-05-30/1685451722186.3a6d5fa5deb9456f.png",
        payload:{
          text:"hello!"
        },
        type: "TIMTextElem"
      },
    ],
    loginUserId: "zhangsan",
  };

  return <Runtime {...props} extra={extra} />;
}
