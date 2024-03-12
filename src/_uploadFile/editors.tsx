import React from "react";

export default {
  ":root": [
    {
      title: "上传接口地址",
      type: "text",
      value: {
        get({ data }) {
          return data.url;
        },
        set({ data }, value) {
          data.url = value;
        },
      },
    },
    {
      title: "文件对应的 key",
      description: "开发者在服务端可以通过这个 key 获取文件的二进制内容",
      type: "text",
      value: {
        get({ data }) {
          return data.name;
        },
        set({ data }, value) {
          data.name = value;
        },
      },
    },
    {
      title: "说明",
      type: "editorRender",
      options: {
        render: (props) => {
          return (
            <div>
              <div>
                请确认所填写的接口域名在文件上传白名单中
              </div>
              <a
                target="_blank"
                href="https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html"
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
