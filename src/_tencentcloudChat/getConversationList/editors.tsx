import css from "./style.less";
export default {
  ":root": [
    {
      title: "SDKAPPID",
      description:
        "您可以在腾讯云即时通信 IM 控制台查看所有的 SDKAPPID，单击 创建新应用，可以创建新的 SDKAPPID。",
      type: "text",
      value: {
        get({ data }) {
          return data.SDKAPPID;
        },
        set({ data }, val) {
          data.SDKAPPID = isNaN(+val) ? "" : +val;
        },
      },
    },
    {
      title: "SECRETKEY",
      description: "",
      type: "text",
      value: {
        get({ data }) {
          return data.SECRETKEY;
        },
        set({ data }, val) {
          data.SECRETKEY = val;
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
