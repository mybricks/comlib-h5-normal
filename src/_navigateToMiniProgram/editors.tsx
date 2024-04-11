import InstructionPanel from "../utils/InstructionPanel";

export default {
  ":root": [
    {
      title: "",
      type: "radio",
      options: [
        { label: "使用小程序链接", value: true },
        { label: "使用专业模式", value: false },
      ],
      value: {
        get({ data }) {
          return data.useShortLink;
        },
        set({ data }, value: string) {
          data.useShortLink = value;
        },
      },
    },
    {
      ifVisible({ data }) {
        return data.useShortLink;
      },
      title: "小程序链接",
      description: "链接可以通过【小程序菜单】->【复制链接】获取",
      type: "text",
      value: {
        get({ data }) {
          return data.shortLink;
        },
        set({ data }, value: string) {
          data.shortLink = value;
        },
      },
    },
    {
      ifVisible({ data }) {
        return !data.useShortLink;
      },
      title: "要打开的小程序 appId",
      description: "要打开的小程序 appId",
      type: "text",
      value: {
        get({ data }) {
          return data.appId;
        },
        set({ data }, value: string) {
          data.appId = value;
        },
      },
    },
    {
      ifVisible({ data }) {
        return !data.useShortLink;
      },
      title: "打开的页面路径",
      description: "打开的页面路径，如果为空则打开首页",
      type: "text",
      value: {
        get({ data }) {
          return data.path;
        },
        set({ data }, value: string) {
          data.path = value;
        },
      },
    },
    {
      title: "额外参数",
      description:
        "需要传递给目标小程序的数据，目标小程序可在 App.onLaunch()，App.onShow() 中获取打开小程序的 query",
      type: "map",
      value: {
        get({ data }) {
          return data.extraData || {};
        },
        set({ data }, value: string) {
          data.extraData = value;
        },
      },
    },

    ...InstructionPanel({
      content: "动态参数的优先级高于静态配置。",
      links: [
        {
          title: "微信：打开另一个小程序",
          url: "https://developers.weixin.qq.com/miniprogram/dev/api/navigate/wx.navigateToMiniProgram.html",
        },
      ],
    }),
  ],
};
