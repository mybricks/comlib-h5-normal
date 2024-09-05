import setSlotLayout from "../../utils/setSlotLayout";

export default {
  "@init": ({ style, data }) => {
    style.width = 375;
  },
  ":root"({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = "常规";
    cate0.items = [
      {
        title: "展示LOGO",
        type: "switch",
        value: {
          get: ({ data }) => {
            return data.useLogo;
          },
          set: ({ data }, value) => {
            data.useLogo = value;
          },
        },
      },
      {
        ifVisible({ data }) {
          return data.useLogo;
        },
        title: "LOGO地址",
        type: "imageSelector",
        value: {
          get: ({ data }) => {
            return data.logo;
          },
          set: ({ data }, value) => {
            data.logo = value;
          },
        },
      },

      {
        title: "自定义登录",
        type: "switch",
        value: {
          get: ({ data }) => {
            return data.useLoginSlot;
          },
          set: ({ data, slot }, value) => {
            data.useLoginSlot = value;

            if (value) {
              slot.add("loginSlot", "自定义登录");
            } else {
              slot.remove("loginSlot");
            }
          },
        },
      },
      {
        ifVisible({ data }) {
          return data.useLoginSlot;
        },
        title: "自定义登录插槽布局",
        type: "layout",
        value: {
          get({ data, slots }) {
            const { loginSlotStyle = {} } = data;
            const slotInstance = slots.get("loginSlot");
            setSlotLayout(slotInstance, loginSlotStyle);
            return loginSlotStyle;
          },
          set({ data, slots }, val: any) {
            if (!data.loginSlotStyle) {
              data.loginSlotStyle = {};
            }
            data.loginSlotStyle = {
              ...data.loginSlotStyle,
              ...val,
            };
            const slotInstance = slots.get("loginSlot");
            setSlotLayout(slotInstance, val);
          },
        },
      },
      // {
      //   title: "自定义登录成功后行为",
      //   type: "switch",
      //   value: {
      //     get: ({ data }) => {
      //       return data.myOnSuccess;
      //     },
      //     set: ({ data }, value) => {
      //       data.myOnSuccess = value;
      //     },
      //   },
      // },
      // {
      //   ifVisible({ data }) {
      //     return data.myOnSuccess;
      //   },
      //   title: "登录成功",
      //   type: "_event",
      //   options: {
      //     outputId: "onSuccess",
      //   },
      // },
      // {
      //   title: "登录失败",
      //   type: "_event",
      //   options: {
      //     outputId: "onFail",
      //   },
      // },

      // {
      //   title: '偷偷的upgrade',
      //   type: 'button',
      //   value: {
      //     set: ({ input, output }) => {
      //       if (!output.get('onSuccess')) {
      //         output.add('onSuccess', '登录成功', { type: 'any' })
      //       }

      //       if (!output.get('onFail')) {
      //         output.add('onFail', '登录失败', { type: 'any' })
      //       }
      //     }
      //   }
      // }
    ];
  },
  ".mybricks-logo": {
    title: "LOGO",
    items: [
      {
        title: "展示LOGO",
        type: "switch",
        value: {
          get: ({ data }) => {
            return data.useLogo;
          },
          set: ({ data }, value) => {
            data.useLogo = value;
          },
        },
      },
      {
        ifVisible({ data }) {
          return data.useLogo;
        },
        title: "LOGO地址",
        type: "imageSelector",
        value: {
          get: ({ data }) => {
            return data.logo;
          },
          set: ({ data }, value) => {
            data.logo = value;
          },
        },
      },
      {
        title: "样式",
        type: "style",
        options: {
          defaultOpen: true,
          items: ["size", "border"],
        },
        value: {
          get({ data }) {
            return data.logoStyle;
          },
          set({ data }, value) {
            data.logoStyle = value;
          },
        },
      },
    ],
  },
  ".mybricks-button": {
    title: "一键登录",
    style: [
      {
        title: "按钮",
        options: ["font", "border", "background"],
        initValue: {
          textAlign: "center",
        },
        target: ".mybricks-button",
      },
    ],
  },
  ".mybricks-exit": {
    title: "返回",
    style: [
      {
        title: "返回",
        options: ["font", "border", "background"],
        initValue: {
          textAlign: "center",
        },
        target: ".mybricks-exit",
      },
    ],
  },
};
