import InstructionPanel from "../utils/InstructionPanel";
import { ExtLinkype, OpenType } from "./types";

const LinkOptions = [
  { label: "打开 | Web链接", value: ExtLinkype.web_open },
  { label: "打开 | 其它小程序", value: ExtLinkype.miniapp_open },
  { label: "打开 | 宿主小程序", value: ExtLinkype.parent_open },
  // { label: "返回 | 宿主小程序", value: ExtLinkype.parent_back },
];

const OpenTypes = [
  { label: "保留当前页面，打开新页面", value: OpenType.navigate },
  { label: "销毁当前页面，打开新页面", value: OpenType.redirect },
];

const Schema = {
  NormalOpen: {
    type: "object",
    properties: { url: { type: "string", title: "链接" } },
  },
  OtherMiniapp: {
    type: "object",
    properties: {
      appId: {
        type: "string",
        title: '要打开的小程序 appId'
      },
      path: {
        type: "string",
        title: '打开的页面路径'
      },
      extraData: {
        type: "object",
        title: "需要传递给目标小程序的数据"
      },
      envVersion: {
        type: "string",
      },
      shortLink: {
        type: "string",
        title: "小程序链接，当传递该参数后，可以不传 appId 和 path"
      }
    },
  },
};

function setInputSchema (input, { dynamic, type }) {
  if (dynamic) {
    input.get("open")?.setSchema(ExtLinkype.miniapp_open === type ? Schema.OtherMiniapp : Schema.NormalOpen);
  } else {
    input.get("open")?.setSchema({ type: "any" });
  }
}

export default {
  ":root": [
    {
      title: "",
      type: "select",
      options: LinkOptions,
      value: {
        get({ data }) {
          return data.type ?? ExtLinkype.web_open;
        },
        set({ data, input, setTitle }, value: string) {
          const isEquel = data.type == value;
          data.type = value;

          const result = LinkOptions.find((t) => t.value === value);
          setTitle(result?.label);

          if (!isEquel) {
            data.url = "";
          }

          setInputSchema(input, { dynamic: data.dynamic, type: data.type })
        },
      },
    },
    {
      ifVisible({ data }) {
        return [ExtLinkype.parent_open, ExtLinkype.web_open].includes(
          data.type
        );
      },
      title: "打开方式",
      type: "select",
      options: OpenTypes,
      value: {
        get({ data }) {
          return data.openType ?? OpenType.navigate;
        },
        set({ data }, value: string) {
          data.openType = value;
        },
      },
    },
    {
      ifVisible({ data }) {
        return [
          ExtLinkype.parent_open,
          ExtLinkype.web_open,
          ExtLinkype.miniapp_open,
        ].includes(data.type);
      },
      title: "使用动态参数",
      description: "开启将将使用输入项传来的数据",
      type: "switch",
      value: {
        get({ data }) {
          return data.dynamic;
        },
        set({ data, input }, value: boolean) {
          data.dynamic = value;
          setInputSchema(input, { dynamic: data.dynamic, type: data.type })
        },
      },
    },
    {
      ifVisible({ data }) {
        return [ExtLinkype.parent_open].includes(data.type) && !data.dynamic;
      },
      title: "目标页面链接",
      description: "宿主小程序的页面路径，形如 /pages/xxx/index",
      type: "text",
      options: {
        placeHolder: "宿主小程序的页面路径，形如 /pages/xxx/index",
      },
      value: {
        get({ data }) {
          return data.url;
        },
        set({ data }, value: string) {
          data.url = value;
        },
      },
    },
    {
      ifVisible({ data }) {
        return [ExtLinkype.web_open].includes(data.type) && !data.dynamic;
      },
      title: "目标链接",
      description: "目标链接，形如 https://www.mybricks.com",
      type: "text",
      options: {
        placeHolder: "目标链接，形如 https://www.mybricks.com",
      },
      value: {
        get({ data }) {
          return data.url;
        },
        set({ data }, value: string) {
          data.url = value;
        },
      },
    },
    // ...InstructionPanel({
    //   content: "动态参数的优先级高于静态配置。",
    //   links: [
    //     {
    //       title: "微信：打开另一个小程序",
    //       url: "https://developers.weixin.qq.com/miniprogram/dev/api/navigate/wx.navigateToMiniProgram.html",
    //     },
    //   ],
    // }),
  ],
};
