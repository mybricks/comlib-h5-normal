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
          return [".mybricks-password", ".mybricks-h5Password"];
        },
      },
      {
        title: "内容文本",
        options: ["font"],
        target({ id }) {
          return [
            `.mybricks-password .taroify-input`,
            `.mybricks-h5Password .taroify-input .taroify-native-input`,
          ];
        },
      },
      {
        title: "提示内容文本",
        options: ["font"],
        target({ id }) {
          return [
            `.mybricks-password .taroify-input__placeholder`,
            `.mybricks-h5Password .taroify-native-input::placeholder`,
          ];
        },
      },
    ],
    items({ data, output, style }, cate0, cate1, cate2) {
      cate0.title = "常规";
      cate0.items = [
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
          title: "最大输入长度",
          description: "密码输入框最大输入长度",
          type: "number",
          value: {
            get({ data }) {
              return data.maxlength || 20;
            },
            set({ data }, value) {
              data.maxlength = value;
            },
          },
        },
        {},
        {
          title: "当值变化",
          type: "_event",
          options: {
            outputId: "onChange",
          },
        },
        {
          title: "当失去焦点",
          type: "_event",
          options: {
            outputId: "onBlur",
          },
        },
      ];
    },
  },
};
