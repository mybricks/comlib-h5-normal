export default {
  ".mybricks-navigation": {
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
      {
        title: "导航栏标题文字内容",
        type: "text",
        value: {
          get({ data }) {
            return data.navigationBarTitleText;
          },
          set({ data }, value) {
            data.navigationBarTitleText = value;
          },
        },
      },
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
};
