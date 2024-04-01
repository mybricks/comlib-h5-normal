import React from "react";

export default {
  ":root": [
    {
      title: "上传设置",
      type: "radio",
      options: [
        { label: "自定义设置", value: "custom" },
        { label: "快捷设置", value: "quick" },
      ],
      value: {
        get({ data }) {
          return data.mode;
        },
        set({ data }, value) {
          data.mode = value;
        },
      },
    },

    {
      ifVisible({ data }) {
        return data.mode === "quick";
      },
      title: "快捷设置",
      type: "select",
      options: [{ label: "阿里云", value: "oss" }],
      value: {
        get({ data }) {
          return data.platform;
        },
        set({ data }, value) {
          data.platform = value;
        },
      },
    },

    /**
     * 自定义
     */
    {
      ifVisible({ data }) {
        return data.mode === "custom";
      },
      title: "上传接口地址",
      type: "text",
      value: {
        get({ data }) {
          return data.custom.url;
        },
        set({ data }, value) {
          data.custom.url = value;
        },
      },
    },
    {
      ifVisible({ data }) {
        return data.mode === "custom";
      },
      title: "文件对应的 key",
      description: "开发者在服务端可以通过这个 key 获取文件的二进制内容",
      type: "text",
      value: {
        get({ data }) {
          return data.custom.name;
        },
        set({ data }, value) {
          data.custom.name = value;
        },
      },
    },
    {
      ifVisible({ data }) {
        return data.mode === "custom";
      },
      title: "说明",
      type: "editorRender",
      options: {
        render: (props) => {
          return (
            <div>
              <div>请确认所填写的接口域名在文件上传白名单中</div>
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

    /**
     * 阿里云
     */
    {
      ifVisible({ data }) {
        return data.mode === "quick" && data.platform === "oss";
      },
      title: "Bucket 外网访问域名",
      type: "text",
      options: {
        placeholder: "注意需要以 https:// 开头",
      },
      value: {
        get({ data }) {
          return data.oss.host;
        },
        set({ data }, value) {
          data.oss.host = value;
        },
      },
    },
    {
      ifVisible({ data }) {
        return data.mode === "quick" && data.platform === "oss";
      },
      title: "accessKeyId",
      type: "text",
      value: {
        get({ data }) {
          return data.oss.accessKeyId;
        },
        set({ data }, value) {
          data.oss.accessKeyId = value;
        },
      },
    },
    {
      ifVisible({ data }) {
        return data.mode === "quick" && data.platform === "oss";
      },
      title: "accessKeySecret",
      type: "text",
      value: {
        get({ data }) {
          return data.oss.accessKeySecret;
        },
        set({ data }, value) {
          data.oss.accessKeySecret = value;
        },
      },
    },
    {
      ifVisible({ data }) {
        return data.mode === "quick" && data.platform === "oss";
      },
      title: "说明",
      type: "editorRender",
      options: {
        render: (props) => {
          return (
            <div>
              <div>请确认所填写的接口域名在文件上传白名单中</div>
              <a
                target="_blank"
                href="https://docs.mybricks.world/docs/miniprogram/best-practices/to-upload-aliyun-oss/"
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
