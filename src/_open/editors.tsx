import InstructionPanel from "../utils/InstructionPanel";
import { ExtOpenType } from './types'


const TypeOptions = [
  { label: "打开 | Web链接", value: ExtOpenType.web_open },
  { label: "打开 | 其它小程序", value: ExtOpenType.miniapp_open },
  { label: "打开 | 宿主小程序", value: ExtOpenType.parent_open },
  // { label: "返回 | 宿主小程序", value: ExtOpenType.parent_back },
]

export default {
  ":root": [
    {
      title: "",
      type: "select",
      options: TypeOptions,
      value: {
        get({ data }) {
          return data.type ?? ExtOpenType.web_open;
        },
        set({ data, setTitle }, value: string) {
          data.type = value;

          const result = TypeOptions.find(t => t.value === value);
          setTitle(result?.label)
        },
      },
    },
    {
      ifVisible({ data }) {
        return [ExtOpenType.parent_open].includes(data.type);
      },
      title: "目标页面链接",
      description: "宿主小程序的页面路径，形如 /pages/xxx/index",
      type: "text",
      options: {
        placeHolder: '宿主小程序的页面路径，形如 /pages/xxx/index',
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
        return [ExtOpenType.web_open].includes(data.type);
      },
      title: "目标链接",
      description: "目标链接，形如 https://www.mybricks.com",
      type: "text",
      options: {
        placeHolder: '目标链接，形如 https://www.mybricks.com',
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
