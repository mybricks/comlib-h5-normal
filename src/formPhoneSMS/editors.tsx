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
          return [".mybricks-phoneSMS", ".mybricks-h5PhoneSMS"];
        },
      },
      {
        title: "内容文本",
        options: ["font"],
        target({ id }) {
          return [
            `.mybricks-phoneSMS .taroify-input`,
            `.mybricks-h5PhoneSMS .taroify-input .taroify-native-input`,
          ];
        },
      },
      {
        title: "提示内容文本",
        options: ["font"],
        target({ id }) {
          return [
            `.mybricks-phoneSMS .taroify-input__placeholder`,
            `.mybricks-h5PhoneSMS .taroify-native-input::placeholder`,
          ];
        },
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
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
          title: "按钮文案",
          type: "text",
          ifVisible({ data }) {
            return !data.customInput;
          },
          value: {
            get({ data }) {
              return data.buttonText;
            },
            set({ data }, value) {
              return (data.buttonText = value);
            },
          },
        },
        {
          title: "重新获取文案",
          type: "text",
          ifVisible({ data }) {
            return !data.customInput;
          },
          value: {
            get({ data }) {
              return data.buttonTextRetry;
            },
            set({ data }, value) {
              return (data.buttonTextRetry = value);
            },
          },
        },
        {
          title: "验证码倒计时",
          type: "InputNumber",
          options: [{ min: 30 }],
          description: "单位：秒（最小值 30秒）",
          value: {
            get({ data }) {
              return [data.smsCountdown];
            },
            set({ data }, value) {
              data.smsCountdown = value[0];
            },
          },
        },
        {
          title: "事件",
          items: [
            {
              title: "点击获取验证码",
              type: "_event",
              options: {
                outputId: "onCodeSend",
              },
            },
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
          ],
        },
      ];
    },
  },
  ".mybricks-button": {
    title: "验证码按钮",
    style: [
      {
        title: "验证码按钮",
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
        ifVisible({ data }) {
          return !data.customInput;
        },
        value: {
          get({ data }) {
            return data.buttonText;
          },
          set({ data }, value) {
            return (data.buttonText = value);
          },
        },
      },
      {
        title: "重新获取文案",
        type: "text",
        ifVisible({ data }) {
          return !data.customInput;
        },
        value: {
          get({ data }) {
            return data.buttonTextRetry;
          },
          set({ data }, value) {
            return (data.buttonTextRetry = value);
          },
        },
      },
      {
        title: "验证码倒计时",
        type: "InputNumber",
        options: [{ min: 30 }],
        description: "单位：秒（最小值 30秒）",
        value: {
          get({ data }) {
            return [data.smsCountdown];
          },
          set({ data }, value) {
            data.smsCountdown = value[0];
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
