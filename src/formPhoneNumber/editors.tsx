export default {
  "@init": ({ style, data }) => {
    style.width = "100%";
    style.height = "auto";
  },
  "@resize": {
    options: ["width"],
  },
  ":root": {
    style: [
      {
        title: "输入框",
        options: ["border", "size", "padding", "background"],
        target({ id }) {
          return [".mybricks-phoneNumber", ".mybricks-h5PhoneNumber"];
        },
      },
      {
        title: "内容文本",
        options: ["font"],
        target({ id }) {
          return [
            `.mybricks-phoneNumber .taroify-input`,
            `.mybricks-h5PhoneNumber .taroify-input .taroify-native-input`,
          ];
        },
      },
      {
        title: "提示内容文本",
        options: ["font"],
        target({ id }) {
          return [
            `.mybricks-phoneNumber .taroify-input__placeholder`,
            `.mybricks-phoneNumber .taroify-input__placeholder--readonly`,
            `.mybricks-h5PhoneNumber .taroify-native-input::placeholder`,
          ];
        },
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "常规";
      cate0.items = [
        {
          title: "手机号获取方式",
          type: "radio",
          description: "实时验证仅微信小程序端支持",
          options: [
            { label: "实时验证", value: "getRealtimePhoneNumber" },
            { label: "快速验证", value: "getPhoneNumber" },
          ],
          value: {
            get({ data }) {
              return data.getPhoneNumberMethods;
            },
            set({ data, output }, value) {
              data.getPhoneNumberMethods = value;
            },
          },
        },
        {
          title: "提示内容",
          description: "该提示内容会在值为空时显示",
          type: "text",
          value: {
            get({ data }) {
              return data.placeholder;
            },
            set({ data }, value) {
              data.placeholder = value;
            },
          },
        },
        {
          title: "按钮文案",
          type: "text",
          value: {
            get({ data }) {
              return data.buttonText;
            },
            set({ data }, value) {
              data.buttonText = value;
            },
          },
        },
        {
          title: "事件",
          items: [
            {
              title: "获取动态令牌成功（仅支持真机）",
              type: "_event",
              options: {
                outputId: "getCodeSuccess",
              },
            },
            {
              title: "获取动态令牌失败（仅支持真机）",
              type: "_event",
              options: {
                outputId: "getCodeFail",
              },
            },
            {
              title: "当值变化",
              type: "_event",
              options: {
                outputId: "onChange",
              },
            },
          ],
        },
      ];
    },
  },

  ".mybricks-button": {
    title: "授权按钮",
    style: [
      {
        title: "授权按钮",
        options: ["size", "padding", "margin", "boxshadow"],
        target({ id }) {
          return [".mybricks-button", ".mybricks-button-disabled"];
        },
      },
      {
        title: "按钮启用时",
        options: ["font", "border", "background"],
        target: ".mybricks-button",
      },
      {
        title: "按钮禁用时",
        options: ["font", "border", "background"],
        target: ".mybricks-button-disabled",
      },
    ],
    items: [
      {
        title: "按钮文案",
        type: "text",
        value: {
          get({ data }) {
            return data.buttonText;
          },
          set({ data }, value) {
            data.buttonText = value;
          },
        },
      },
    ],
    "@dblclick": {
      type: "text",
      value: {
        get({data}) {
          return data.buttonText
        },
        set({ data, focusArea }, value) {
          data.buttonText = value
        }
      }
    }
  },
};
