import setSlotLayout from "../../../utils/setSlotLayout";

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
                } catch (e) {}
                break;
              case "custom":
                data.navigationStyle = "custom";
                slot.add("mainSlot", "导航栏标题区域");
                break;

              case "none":
                data.navigationStyle = "custom";
                try {
                  slot.remove("mainSlot");
                } catch (e) {}
                break;
            }
          },
        },
      },
      {
        ifVisible({ data }) {
          return data.useNavigationStyle === "none";
        },
        title: "显示导航栏标题",
        type: "switch",
        value: {
          get({ data }) {
            return data.showNavigationTextInNone;
          },
          set({ data }, value) {
            data.showNavigationTextInNone = value;
          },
        }
      },
      {
        ifVisible({ data }) {
          return data.useNavigationStyle === "default" || data.useNavigationStyle === "none";
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
        // binding: {
        //   with: 'data.navigationBarTitleText',
        //   scheme: {
        //     type: 'string'
        //   }
        // }
      },
      // {
      //   title: "显示小程序胶囊",
      //   type: "switch",
      //   description:"仅在编辑态下有效，真机小程序胶囊会一直显示",
      //   ifVisible({ data }: EditorResult<Data>) {
      //     return data.navigationStyle !== 'default';
      //   },
      //   value: {
      //     get({ data }) {
      //       if(data.showNavigationBarCapsule == undefined) return true
      //       return data.showNavigationBarCapsule ;
      //     },
      //     set({ data }, value) {
      //       data.showNavigationBarCapsule = value;
      //     },
      //   },
      // },
      {
        ifVisible({ data }) {
          return data.useNavigationStyle === "none";
        },
        title: "显示返回按钮",
        type: "switch",
        value: {
          get({ data }) {
            return data.showNavigationBackBtnInNone;
          },
          set({ data }, value) {
            data.showNavigationBackBtnInNone = value;
          },
        }
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
        // binding: {
        //   with: 'data.navigationBarBackgroundColor',
        //   scheme: {
        //     type: 'string'
        //   }
        // }
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
  ".mybricks-mainSlot": {
    title: "导航栏标题区域",
    items: [
      {
        title: "列布局",
        type: "layout",
        value: {
          get({ data, slots }) {
            const { mainSlotStyle = {} } = data.customNavigation;
            const slotInstance = slots.get("mainSlot");
            setSlotLayout(slotInstance, mainSlotStyle);
            return mainSlotStyle;
          },
          set({ data, slots }, val: any) {
            if (!data.customNavigation.mainSlotStyle) {
              data.customNavigation.mainSlotStyle = {};
            }
            data.customNavigation.mainSlotStyle = {
              ...data.customNavigation.mainSlotStyle,
              ...val,
            };
            const slotInstance = slots.get("mainSlot");
            setSlotLayout(slotInstance, val);
          },
        },
      },
    ],
  },
  ".mybricks-backIcon": {
    style: [
      {
        title: "样式",
        options: ["size"],
        target: ".mybricks-backIcon",
      },
    ],
    items: [
      {
        title: "自定义图标",
        type: "imageselector",
        options: {
          fileSizeLimit: 10,
          useBase64Only: true,
        },
        value: {
          get({ data }) {
            return data.customBackIcon;
          },
          set({ data }, value) {
            data.customBackIcon = value;
          },
        },
      },
    ],
  },
  ".mybricks-navTitle": {
    style: [
      {
        title: "样式",
        options: ["size","color"],
        target: ".mybricks-navTitle",
      },
    ],
    items: [
      {
        title: "自定义图标",
        type: "imageselector",
        options: {
          fileSizeLimit: 10,
          useBase64Only: true,
        },
        value: {
          get({ data }) {
            return data.customBackIcon;
          },
          set({ data }, value) {
            data.customBackIcon = value;
          },
        },
      },
    ],
  },
};
