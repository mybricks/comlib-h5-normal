import css from "./style.less";
export default {
  ":root": [
    {
      title: "SDKAppID",
      description:
        "您可以在腾讯云即时通信 IM 控制台查看所有的 SDKAppID，单击 创建新应用，可以创建新的 SDKAppID。",
      type: "text",
      value: {
        get({ data }) {
          return data.SDKAppID;
        },
        set({ data }, val) {
          data.SDKAppID = val;
        },
      },
    },
    {
      title: "日志级别",
      type: "select",
      options: [
        { label: "普通级别", value: 0 },
        { label: "release 级别", value: 1 },
      ],
      value: {
        get({ data }) {
          return data.logLevel;
        },
        set({ data }, val) {
          data.logLevel = val;
        },
      },
    },
  ],
};
