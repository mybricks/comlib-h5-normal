export default {
  "@init": ({ style, data }) => {
    style.width = 350;
    style.height = 85;
  },
  "@resize": {
    options: ["width", "height"],
  },
  ":root": {
    style: [
      {
        title: "宫格间距",
        type: "InputNumber",
        options: [{ min: 0 }],
        value: {
          get({ data }) {
            return [data.gutter];
          },
          set({ data }, value) {
            data.gutter = value[0];
          },
        },
      },
      {
        title: "宫格样式配置",
        options: ["size", "font", "border", "background", "margin"],
        target: `#mybricks-input-item`,
      },
      {
        title: "描述文字配置",
        options: ["font"],
        target: `#mybricks-input-desc`,
      },
    ],
    items: ({ data, output, style }, cate0, cate1, cate2) => {
      cate0.title = "验证码宫格";
      cate0.items = [
        {
          title: "基础属性",
          items: [
            {
              title: "验证码位数",
              type: "InputNumber",
              options: [{ min: 1, max: 8 }],
              description: "输入的位数限制 1~8",
              value: {
                get({ data }) {
                  return [data.length];
                },
                set({ data }, value) {
                  data.length = value[0];
                },
              },
            },
            {
              title: "验证码倒数秒数",
              description: "验证码发送后倒数秒数",
              type: "InputNumber",
              options: [{ min: 1 }],
              value: {
                get({ data }) {
                  return [data.countdown];
                },
                set({ data }, value) {
                  data.countdown = value[0];
                },
              },
            },
            {
              title: "倒数文案",
              description: "验证码发送后，倒数秒数后显示的文案",
              type: "text",
              value: {
                get({ data }) {
                  return data.countDownText;
                },
                set({ data }, value) {
                  data.countDownText = value;
                },
              },
            },
            {
              title: "重试文案",
              description: "倒计时结束后，重新发送验证码的文案",
              type: "text",
              value: {
                get({ data }) {
                  return data.retryText;
                },
                set({ data }, value) {
                  data.retryText = value;
                },
              },
            },
            {
              title: "错误文案",
              description: "验证码输入错误时显示的文案",
              type: "text",
              value: {
                get({ data }) {
                  return data.errorText;
                },
                set({ data }, value) {
                  data.errorText = value;
                },
              },
            },
          ],
        },
        {
          title: "高级属性",
          items: [
            {
              title: "显示中间分割线",
              description: "验证码输入框中间显示分割符，只支持偶数的验证码位数",
              type: "switch",
              value: {
                get({ data }) {
                  return data.showLine;
                },
                set({ data }, value) {
                  data.showLine = value;
                },
              },
            },
          ],
        },
        {
          title: "事件",
          items: [
            {
              title: "当值变化",
              type: "_event",
              options: {
                outputId: "onChange",
              },
            },
            {
              title: "填满输入框时",
              type: "_event",
              options: {
                outputId: "onComplete",
              },
            },
            {
              title: "发送验证码",
              type: "_event",
              options: {
                outputId: "onSendSMS",
              },
            },
          ],
        },
      ];
    },
  },
  ".mybricks-desc": {
    "@dblclick": {
      type: "text",
      value: {
        get({ data }) {
          return data.retryText;
        },
        set({ data, focusArea }, value) {
          data.retryText = value;
        },
      },
    },
  },
};
