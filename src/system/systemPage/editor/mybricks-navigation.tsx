export default {
  ".mybricks-navigation": {
    title: "导航栏",
    items: [
      {
        title: "导航栏样式",
        type: "select",
        options: [
          {
            label: "默认样式",
            value: "default",
          },
          {
            label: "自定义导航栏",
            value: "custom",
          },
          {
            label: "隐藏导航栏",
            value: "none",
          },
        ],
        value: {
          get({ data }) {
            return data.useNavigationStyle;
          },
          set({ data, slot }, value) {
            data.useNavigationStyle = value;

            switch (value) {
              case "default":
                data.navigationStyle = "default";
                try {
                  slot.remove("mainSlot");
                  slot.remove("leftSlot");
                } catch (e) { }
                break;
              case "custom":
                data.navigationStyle = "custom";
                slot.add("mainSlot", "导航栏主区域");
                slot.add("leftSlot", "导航栏左区域");
                break;

              case "none":
                data.navigationStyle = "custom";
                try {
                  slot.remove("mainSlot");
                  slot.remove("leftSlot");
                } catch (e) { }
                break;
            }
          },
        },
      },
      {
        ifVisible({ data }) {
          return data.useNavigationStyle === "default";
        },
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
        ifVisible({ data }) {
          return data.useNavigationStyle === "default";
        },
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
        ifVisible({ data }) {
          return data.useNavigationStyle === "default";
        },
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
      // {
      //   ifVisible({ data }) {
      //     return data.useNavigationStyle === "custom";
      //   },
      //   title: "开启主区域插槽",
      //   type: "switch",
      //   value: {
      //     get({ data }) {
      //       return data.useMainSlot;
      //     },
      //     set({ data }, value) {
      //       data.useMainSlot = value;
      //     },
      //   },
      // },
      // {
      //   ifVisible({ data }) {
      //     return data.useNavigationStyle === "custom";
      //   },
      //   title: "开启左区域插槽",
      //   type: "switch",
      //   value: {
      //     get({ data }) {
      //       return data.useLeftSlot;
      //     },
      //     set({ data }, value) {
      //       data.useLeftSlot = value;
      //     },
      //   },
      // },
      {
        ifVisible({ data }) {
          return data.useNavigationStyle === "custom";
        },
        title: "样式",
        type: "styleNew",
        options: ["background"],
        value: {
          get({ data }) {
            return data.customNavigation.style;
          },
          set({ data }, value) {
            data.customNavigation.style = value;
          },
        },
      },
    ],
  },
};
