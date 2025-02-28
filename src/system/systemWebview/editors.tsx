import entryPagePathEditor from "./editors/entryPagePath";
import MybricksNavigationEditor from "./editors/mybricks-navigation";

export default {
  ":root"({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [
      { ...entryPagePathEditor },
      {
        title: "导航栏",
        items: [
          {
            title: "导航栏背景颜色",
            type: "colorpicker",
            value: {
              get({ data }) {
                return data.navigationBarBackgroundColor;
              },
              set({ data }, value) {
                data.navigationBarBackgroundColor = value;
              },
            },
          },
          {
            title: "导航栏标题颜色",
            type: "radio",
            options: [
              {
                label: "黑色",
                value: "black",
              },
              {
                label: "白色",
                value: "white",
              },
            ],
            value: {
              get({ data }) {
                return data.navigationBarTextStyle;
              },
              set({ data }, value) {
                data.navigationBarTextStyle = value;
              },
            },
          },
          // {
          //   title: "导航栏标题文字内容",
          //   type: "text",
          //   value: {
          //     get({ data }) {
          //       return data.navigationBarTitleText;
          //     },
          //     set({ data }, value) {
          //       data.navigationBarTitleText = value;
          //     },
          //   },
          // },
          {
            title:
              "在非首页、非页面栈最底层页面或非tabbar内页面中的导航栏展示home键",
            type: "switch",
            value: {
              get({ data }) {
                return data.homeButton;
              },
              set({ data }, value) {
                data.homeButton = value;
              },
            },
          },
        ],
      },
      {
        title: "",
        items: [
          {
            title: "网页链接",
            type: "text",
            description:
              "可打开关联的公众号的文章，其它网页需登录小程序管理后台配置业务域名。",
            value: {
              get({ data }) {
                return data.url;
              },
              set({ data }, value: string) {
                data.url = value;
              },
            },
          },
        ],
      },
      {
        title: "事件",
        items: [
          {
            title: "网页加载成功时",
            type: "_event",
            options: {
              outputId: "onLoad",
            },
          },
          {
            title: "网页加载失败时",
            type: "_event",
            options: {
              outputId: "onError",
            },
          },
          {
            title: "网页向小程序 postMessage 时",
            type: "_event",
            options: {
              outputId: "onMessage",
            },
          },
        ],
      },
    ];
  },
};
