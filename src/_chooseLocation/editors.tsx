import React from "react";

export default {
  ":root": [
    // {
    //   title: "腾讯地图 API 密钥",
    //   type: "text",
    //   value: {
    //     get({ data }) {
    //       return data.apiKey;
    //     },
    //     set({ data }, value: string) {
    //       data.apiKey = value;
    //     },
    //   },
    // },
    {
      title: "说明",
      type: "editorRender",
      options: {
        render: (props) => {
          return (
            <div>
              <div>
                小程序需要自行申请「wx.getLocation」、「wx.chooseLocation」权限
              </div>
              <a
                target="_blank"
                href="https://developers.weixin.qq.com/community/develop/doc/0006e45df2cac030e6edf367c56001"
              >
                参考链接
              </a>
            </div>
          );
        },
      },
    },
  ],
};
